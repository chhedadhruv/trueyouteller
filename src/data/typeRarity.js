// Approximate share of the population for each type (commonly cited MBTI®-style
// survey estimates, rounded). Used for trading-card rarity, for fun.
export const TYPE_PREVALENCE = {
  ISFJ: 13.8, ESFJ: 12.3, ISTJ: 11.6, ISFP: 8.8, ESTJ: 8.7, ESFP: 8.5, ENFP: 8.1, ISTP: 5.4,
  INFP: 4.4, ESTP: 4.3, INTP: 3.3, ENTP: 3.2, ENFJ: 2.5, INTJ: 2.1, ENTJ: 1.8, INFJ: 1.5,
};

const TIERS = [
  { max: 2, id: 'legendary', label: 'Legendary', emoji: '🌟' },
  { max: 4, id: 'epic', label: 'Epic', emoji: '💎' },
  { max: 8.5, id: 'rare', label: 'Rare', emoji: '🔷' },
  { max: Infinity, id: 'common', label: 'Common', emoji: '⚪' },
];

export const rarityFor = (code) => {
  const percent = TYPE_PREVALENCE[code];
  return { percent, ...TIERS.find((tier) => percent <= tier.max) };
};

// Mini-quiz outcomes are bonus cards.
export const BONUS_TIER = { id: 'bonus', label: 'Bonus', emoji: '🎁' };
