import React from 'react';

const LETTER_NAMES = {
  I: 'Introverted', E: 'Extraverted',
  S: 'Observant', N: 'Intuitive',
  T: 'Thinking', F: 'Feeling',
  J: 'Judging', P: 'Prospecting',
};

// Four bars (one per axis) showing how strongly the person leans toward each letter.
// `rows` comes from axisBreakdown() in utils/scoring.
const AxisBars = ({ rows }) => (
  <div className="axis-bars">
    {rows.map(({ axis, low, high, letter, towardHigh, strength }) => (
      <div className="axis-row" key={axis}>
        <div className="axis-labels">
          <span className={letter === low ? 'axis-chosen' : ''}>{LETTER_NAMES[low]} ({low})</span>
          <span className={letter === high ? 'axis-chosen' : ''}>{LETTER_NAMES[high]} ({high})</span>
        </div>
        <div
          className="axis-track"
          role="img"
          aria-label={`${strength}% ${LETTER_NAMES[letter]}`}
        >
          <div
            className={`axis-fill ${letter === high ? 'axis-fill-high' : 'axis-fill-low'}`}
            style={{ width: `${strength}%` }}
          >
            <span className="axis-percent">{strength}%</span>
          </div>
        </div>
        <span className="visually-hidden">{100 - towardHigh}% {low}, {towardHigh}% {high}</span>
      </div>
    ))}
  </div>
);

export default AxisBars;
