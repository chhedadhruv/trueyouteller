import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { PERSONALITY_TYPES } from '../data/personalityTypes';
import { getCompatibility, pairSlug } from '../data/compatibility';
import { AVENGERS_TWIN, FRIENDS_TWIN, roleFor, TEMPERAMENTS } from '../data/groupRoles';
import { addEntry } from '../firebase/social';
import { clearPendingJoin, getAnswer, isOwned, rememberAnswer } from '../utils/storage';
import { useEntries, useSharedDoc } from '../utils/useShared';
import { track } from '../utils/analytics';
import { buildMeta, SITE_URL } from '../utils/seo';
import ShareLinkBox from '../components/ShareLinkBox';
import SocialStatus from '../components/SocialStatus';
import JoinPanel from '../components/JoinPanel';
import '../styles/Social.css';

export const meta = () =>
  buildMeta({
    title: 'Group Personality Room | TrueYouTeller',
    description: 'Join the room with your personality type and see your group\'s personality map.',
    path: '/play',
    noindex: true,
  });

const MAX_GRID = 10;

// 2x2 map: x = Introvert..Extravert, y = Thinking..Feeling. Members in the same
// quadrant are spread out so their avatars don't overlap.
const QuadrantMap = ({ members }) => {
  const buckets = {};
  return (
    <div className="quadrant-map" role="img" aria-label="Group map: introverts left, extraverts right, thinkers top, feelers bottom">
      <span className="quadrant-label q-left">Introverts</span>
      <span className="quadrant-label q-right">Extraverts</span>
      <span className="quadrant-label q-top">Thinkers</span>
      <span className="quadrant-label q-bottom">Feelers</span>
      {members.map((member) => {
        const key = member.type[0] + member.type[2];
        const n = (buckets[key] = (buckets[key] ?? -1) + 1);
        const x = (member.type[0] === 'E' ? 62 : 12) + (n % 3) * 11;
        const y = (member.type[2] === 'F' ? 60 : 12) + Math.floor(n / 3) * 13;
        return (
          <span
            key={member.id}
            className="quadrant-avatar"
            style={{ left: `${x}%`, top: `${y}%` }}
            title={`${member.name} · ${member.type}`}
          >
            <span aria-hidden="true">{PERSONALITY_TYPES[member.type].emoji}</span>
            <span className="quadrant-avatar-name">{member.name}</span>
          </span>
        );
      })}
    </div>
  );
};

const scoreClass = (score) => (score >= 90 ? 'great' : score >= 75 ? 'good' : 'growth');

const RoomInsights = ({ members }) => {
  const missing = TEMPERAMENTS.filter((t) => !members.some((m) => t.test(m.type)));
  const grid = members.slice(0, MAX_GRID);

  return (
    <>
      <section className="social-panel" aria-labelledby="room-map">
        <h2 id="room-map">Group map</h2>
        <QuadrantMap members={members} />
      </section>

      <section className="social-panel" aria-labelledby="room-roles">
        <h2 id="room-roles">Who's who</h2>
        <div className="table-scroll">
          <table className="room-table">
            <thead>
              <tr>
                <th scope="col">Member</th>
                <th scope="col">Type</th>
                <th scope="col">Role</th>
                <th scope="col">FRIENDS</th>
                <th scope="col">Avengers</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => {
                const role = roleFor(m.type);
                return (
                  <tr key={m.id}>
                    <th scope="row">{m.name}</th>
                    <td>
                      <Link to={`/types/${m.type.toLowerCase()}`}>{m.type}</Link>
                    </td>
                    <td title={role.blurb}>
                      {role.emoji} {role.name}
                    </td>
                    <td>{FRIENDS_TWIN[m.type]}</td>
                    <td>{AVENGERS_TWIN[m.type]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="social-panel" aria-labelledby="room-balance">
        <h2 id="room-balance">Group balance</h2>
        <ul className="temperament-list">
          {TEMPERAMENTS.map((t) => {
            const count = members.filter((m) => t.test(m.type)).length;
            return (
              <li key={t.id} className={count ? '' : 'temperament-missing'}>
                {t.emoji} {t.name}: <strong>{count}</strong>
              </li>
            );
          })}
        </ul>
        {missing.length > 0 && (
          <ul className="room-gaps">
            {missing.map((t) => (
              <li key={t.id}>
                <strong>No {t.name}.</strong> {t.gap}
              </li>
            ))}
          </ul>
        )}
      </section>

      {grid.length >= 2 && (
        <section className="social-panel" aria-labelledby="room-compat">
          <h2 id="room-compat">Compatibility grid</h2>
          <div className="table-scroll">
            <table className="compat-grid">
              <thead>
                <tr>
                  <td />
                  {grid.map((m) => (
                    <th key={m.id} scope="col">{m.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {grid.map((row) => (
                  <tr key={row.id}>
                    <th scope="row">{row.name}</th>
                    {grid.map((col) => {
                      if (col.id === row.id) return <td key={col.id} className="compat-self">–</td>;
                      const { score } = getCompatibility(row.type, col.type);
                      return (
                        <td key={col.id} className={`compat-cell ${scoreClass(score)}`}>
                          <Link to={`/compatibility/${pairSlug(row.type, col.type)}`}>{score}%</Link>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {members.length > MAX_GRID && <p className="play-privacy">Showing the first {MAX_GRID} members.</p>}
        </section>
      )}
    </>
  );
};

const RoomPage = () => {
  const { id } = useParams();
  const { status, doc: room } = useSharedDoc('rooms', id);
  const members = useEntries('rooms', id, 'members', status === 'ready');
  const [owner, setOwner] = useState(false);
  const [joined, setJoined] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setOwner(isOwned('rooms', id));
    setJoined(Boolean(getAnswer('rooms', id)));
  }, [id]);

  if (status !== 'ready') return <SocialStatus status={status} what="room" />;

  const join = async ({ name, type }) => {
    setBusy(true);
    setError('');
    try {
      await addEntry('rooms', id, 'members', { name, type });
      rememberAnswer('rooms', id, true);
      clearPendingJoin();
      track('social_answer', { kind: 'rooms' });
      setJoined(true);
    } catch (err) {
      console.error(err);
      setError('Could not join the room. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container section social-page room-page">
      <span className="play-emoji" aria-hidden="true">{room.emoji}</span>
      <h1 className="page-title">{room.name}</h1>
      <p className="types-intro">
        {members ? `${members.length} ${members.length === 1 ? 'member' : 'members'}` : 'Loading members…'} · a group
        personality room
      </p>

      {(owner || joined) && (
        <ShareLinkBox
          url={`${SITE_URL}/room/${id}`}
          kind="rooms"
          title={`Join ${room.name}`}
          text={`Join "${room.name}" ${room.emoji} and let's map our group's personalities!`}
        />
      )}

      {!joined && (
        <div className="social-panel">
          <h2>Join this room</h2>
          {error && <p className="form-error" role="alert">{error}</p>}
          <JoinPanel label={`"${room.name}"`} returnPath={`/room/${id}`} onJoin={join} busy={busy} />
        </div>
      )}

      {members && members.length > 0 && <RoomInsights members={members} />}
      {members && members.length === 0 && <p className="mirror-waiting">Nobody has joined yet. Be the first!</p>}
    </div>
  );
};

export default RoomPage;
