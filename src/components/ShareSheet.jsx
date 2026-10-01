import React, { useEffect, useState } from 'react';
import { FaWhatsapp, FaXTwitter, FaFacebook, FaLink, FaDownload, FaFilePdf, FaShareNodes } from 'react-icons/fa6';
import { copyText, downloadBlob, downloadProfilePdf, nativeShare, shareLinks } from '../utils/share';
import { drawShareCard } from '../utils/shareCard';
import { awardBadge } from '../utils/badges';
import { track } from '../utils/analytics';
import { SITE_URL } from '../utils/seo';

// Share actions for a result: native share (with image) where available, otherwise
// WhatsApp / X / Facebook / copy link, plus image and PDF downloads.
const ShareSheet = ({ type, name, breakdown, url, isOwner }) => {
  const shared = (method) => {
    awardBadge('sharer');
    track('share', { method, content_type: 'personality_result', item_id: type.code });
  };
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => setCanNativeShare(typeof navigator.share === 'function'), []);

  useEffect(() => {
    if (!status) return undefined;
    const timer = setTimeout(() => setStatus(''), 3000);
    return () => clearTimeout(timer);
  }, [status]);

  const text = isOwner
    ? `I'm ${type.code} (${type.name}) and my spirit animal is the ${type.spiritAnimal}! What's your personality type?`
    : `${name ? `${name} is` : 'Meet'} ${type.code} (${type.name}). What's your personality type?`;
  const links = shareLinks({ text, url });
  const filename = `trueyouteller-${type.code.toLowerCase()}.png`;

  const withBusy = async (method, task) => {
    setBusy(true);
    try {
      await task();
      shared(method);
    } catch (error) {
      console.error(error);
      setStatus('Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const handleNativeShare = () =>
    withBusy('native', async () => {
      const blob = await drawShareCard({ type, name, breakdown });
      const file = blob && new File([blob], filename, { type: 'image/png' });
      await nativeShare({ title: `${type.code} · ${type.name}`, text, url, file });
    });

  const handleDownloadImage = () =>
    withBusy('story_image', async () => {
      downloadBlob(await drawShareCard({ type, name, breakdown }), filename);
      setStatus('Image downloaded! Post it to your story 📸');
    });

  const handleDownloadPdf = () =>
    withBusy('pdf', async () => {
      await downloadProfilePdf({ type, name, breakdown, url: SITE_URL });
    });

  const handleCopy = async () => {
    const copied = await copyText(url);
    setStatus(copied ? 'Link copied!' : 'Could not copy. Long-press the address bar instead.');
    if (copied) shared('copy_link');
  };

  return (
    <section className="share-sheet" aria-labelledby="share-heading">
      <h2 id="share-heading">{isOwner ? 'Share your result' : 'Share this result'}</h2>
      <div className="share-buttons">
        {canNativeShare && (
          <button type="button" className="btn btn-primary share-btn" onClick={handleNativeShare} disabled={busy}>
            <FaShareNodes aria-hidden="true" /> Share
          </button>
        )}
        <a className="btn share-btn share-whatsapp" href={links.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => shared('whatsapp')}>
          <FaWhatsapp aria-hidden="true" /> WhatsApp
        </a>
        <a className="btn share-btn" href={links.x} target="_blank" rel="noopener noreferrer" onClick={() => shared('x')}>
          <FaXTwitter aria-hidden="true" /> X
        </a>
        <a className="btn share-btn" href={links.facebook} target="_blank" rel="noopener noreferrer" onClick={() => shared('facebook')}>
          <FaFacebook aria-hidden="true" /> Facebook
        </a>
        <button type="button" className="btn share-btn" onClick={handleCopy}>
          <FaLink aria-hidden="true" /> Copy link
        </button>
        <button type="button" className="btn share-btn" onClick={handleDownloadImage} disabled={busy}>
          <FaDownload aria-hidden="true" /> Story image
        </button>
        <button type="button" className="btn share-btn" onClick={handleDownloadPdf} disabled={busy}>
          <FaFilePdf aria-hidden="true" /> PDF profile
        </button>
      </div>
      <p className="share-status" role="status">{busy ? 'Preparing…' : status}</p>
    </section>
  );
};

export default ShareSheet;
