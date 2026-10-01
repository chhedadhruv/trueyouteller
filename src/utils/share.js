// Sharing helpers. jspdf is imported on demand so it never weighs down the initial page load.

export const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

// Native share sheet (mobile) with the image attached when supported.
// Returns false when the browser has no Web Share API, so the caller can show fallbacks.
export const nativeShare = async ({ title, text, url, file }) => {
  if (!navigator.share) return false;
  const data = { title, text, url };
  if (file && navigator.canShare?.({ files: [file] })) data.files = [file];
  try {
    await navigator.share(data);
  } catch (error) {
    if (error.name !== 'AbortError') throw error;
  }
  return true;
};

export const shareLinks = ({ text, url }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);
  return {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
    x: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };
};

export const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

// Text-based PDF of a personality profile (small, selectable text, no screenshots).
export const downloadProfilePdf = async ({ type, name, breakdown, url }) => {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const margin = 50;
  const width = doc.internal.pageSize.getWidth() - margin * 2;
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = margin;

  const ensureSpace = (needed) => {
    if (y + needed > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };
  const heading = (text, size = 16) => {
    ensureSpace(size * 2);
    y += size * 0.6;
    doc.setFont('helvetica', 'bold').setFontSize(size).setTextColor(91, 44, 111);
    doc.text(text, margin, y);
    y += size * 0.9;
  };
  const paragraph = (text) => {
    doc.setFont('helvetica', 'normal').setFontSize(11).setTextColor(44, 62, 80);
    for (const line of doc.splitTextToSize(text, width)) {
      ensureSpace(16);
      doc.text(line, margin, y);
      y += 15;
    }
    y += 4;
  };
  const list = (items) => items.forEach((item) => paragraph(`•  ${item}`));

  heading(`${name ? `${name}: ` : ''}${type.code} · ${type.name}`, 22);
  paragraph(type.description);
  paragraph(`Spirit animal: ${type.spiritAnimal}. ${type.reason}`);
  if (breakdown) {
    paragraph(breakdown.map((row) => `${row.letter} ${row.strength}%`).join('   ·   '));
  }

  heading('Personality overview');
  paragraph(type.personalityTraits);
  heading('Personal growth', 13);
  paragraph(type.personalGrowth);
  heading('Strengths', 13);
  list(type.strengthsWeaknesses.strengths);
  heading('Weaknesses', 13);
  list(type.strengthsWeaknesses.weaknesses);
  heading('What energizes you', 13);
  paragraph(type.whatEnergizesYou);
  heading('What drains you', 13);
  paragraph(type.whatDrainsYou);

  heading('Career insights');
  paragraph(type.careerInsights.careerPath);
  heading('Career ideas', 13);
  paragraph(type.careerInsights.careerIdeas.join(', '));
  heading('Workspace habits', 13);
  paragraph(type.careerInsights.workspaceHabits);

  heading('Relationships');
  paragraph(type.relationshipsConnections.yourRelationships);
  heading('Love language', 13);
  paragraph(type.relationshipsConnections.yourLoveLanguage);

  heading('Friendships');
  paragraph(type.socialCirclesFamilyLife.friendships.description);
  heading('Famous matches', 13);
  paragraph(type.culturalConnections.famousMatches.join(', '));

  y += 10;
  paragraph(`Take the free personality test at ${url}`);

  doc.save(`trueyouteller-${type.code.toLowerCase()}.pdf`);
};
