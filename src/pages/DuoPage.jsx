import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { PERSONALITY_TYPES } from '../data/personalityTypes';
import { pairSlug } from '../data/compatibility';
import { buildDuoReport } from '../data/duoReport';
import { addEntry } from '../firebase/social';
import { getAnimalImage } from '../utils/images';
import { clearPendingJoin, isOwned } from '../utils/storage';
import { useEntries, useSharedDoc } from '../utils/useShared';
import { track } from '../utils/analytics';
import { buildMeta, SITE_URL } from '../utils/seo';
import ShareLinkBox from '../components/ShareLinkBox';
import SocialStatus from '../components/SocialStatus';
import JoinPanel from '../components/JoinPanel';
import '../styles/TypePages.css';
import '../styles/Social.css';

export const meta = () =>
  buildMeta({
    title: 'Couple & Best Friend Personality Report | TrueYouTeller',
    description: 'See how your two personality types fit together: how you fight, make up, plan and have fun.',
    path: '/play',
    noindex: true,
  });

const Person = ({ name, type }) => (
  <div className="compat-type">
    <img src={getAnimalImage(PERSONALITY_TYPES[type].spiritAnimal)} alt="" width="110" height="110" />
    <span className="compat-type-code">{name}</span>
    <span className="compat-type-name">
      {type} · {PERSONALITY_TYPES[type].name}
    </span>
  </div>
);

const DuoPage = () => {
  const { id } = useParams();
  const { status, doc: duo } = useSharedDoc('duos', id);
  const partners = useEntries('duos', id, 'partner', status === 'ready');
  const [owner, setOwner] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => setOwner(isOwned('duos', id)), [id]);

  if (status !== 'ready') return <SocialStatus status={status} what="report" />;

  const partner = partners?.[0];
  const couple = duo.mode === 'couple';
  const label = couple ? 'couple report' : 'best friend report';

  const join = async ({ name, type }) => {
    setBusy(true);
    setError('');
    try {
      await addEntry('duos', id, 'partner', { name, type }, 'b');
      clearPendingJoin();
      track('social_answer', { kind: 'duos' });
    } catch (err) {
      console.error(err);
      setError('Someone already completed this report, or something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const report =
    partner && buildDuoReport({ mode: duo.mode, a: { name: duo.aName, type: duo.aType }, b: { name: partner.name, type: partner.type } });

  return (
    <div className="container section social-page compat-page">
      <span className="play-emoji" aria-hidden="true">{couple ? '💑' : '👯'}</span>
      <h1 className="page-title">
        {partner ? `${duo.aName} & ${partner.name}` : couple ? 'Couple report' : 'Best friend report'}
      </h1>

      {partners === null ? (
        <p className="page-loading">Loading…</p>
      ) : report ? (
        <>
          <div className="compat-pair">
            <Person name={duo.aName} type={duo.aType} />
            <div className="compat-score" style={{ '--score': report.score }} role="img" aria-label={`${report.score}% match`}>
              <span className="compat-score-number">{report.score}%</span>
              <span className="compat-score-tier">
                {report.tier.emoji} {report.tier.label}
              </span>
            </div>
            <Person name={partner.name} type={partner.type} />
          </div>
          <div className="duo-sections">
            {report.sections.map((section) => (
              <section key={section.title} className="social-panel duo-section">
                <h2>
                  <span aria-hidden="true">{section.emoji}</span> {section.title}
                </h2>
                <p>{section.text}</p>
              </section>
            ))}
          </div>
          <div className="quiz-result-actions">
            <Link to={`/compatibility/${pairSlug(duo.aType, partner.type)}`} className="btn btn-primary">
              Full {duo.aType} & {partner.type} compatibility
            </Link>
            <Link to="/play" className="btn">Play another game</Link>
          </div>
        </>
      ) : owner ? (
        <>
          <p className="types-intro">
            Send this link to your {couple ? 'partner' : 'best friend'}. Your joint report appears here as soon as they
            join.
          </p>
          <ShareLinkBox
            url={`${SITE_URL}/duo/${id}`}
            kind="duos"
            title={couple ? 'Our couple personality report' : 'Our best friend personality report'}
            text={couple ? "Let's see how our personalities fit together 💑" : "Let's get our best friend personality report 👯"}
          />
          <p className="mirror-waiting">Waiting for them to join…</p>
        </>
      ) : (
        <div className="social-panel">
          <p>
            <strong>{duo.aName}</strong> ({duo.aType}) invited you to a {label}. Join with your type to unlock it.
          </p>
          {error && <p className="form-error" role="alert">{error}</p>}
          <JoinPanel label={`the ${label}`} returnPath={`/duo/${id}`} onJoin={join} busy={busy} />
        </div>
      )}
    </div>
  );
};

export default DuoPage;
