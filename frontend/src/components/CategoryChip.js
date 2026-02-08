// CategoryChip component for visual category display on result screen
// Shows icon, label, and accent color for instant context
import React from 'react';
import { getCategoryDetails } from '../utils/categoryConfig';

export default function CategoryChip({ value }) {
  if (!value) return null;
  const { icon, label, color } = getCategoryDetails(value);
  return (
    <span
      className="category-chip"
      style={{
        background: color + '22',
        color,
        borderRadius: '16px',
        padding: '0.25em 0.75em',
        fontWeight: 500,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5em',
        marginBottom: '0.5em',
        fontSize: '1em',
      }}
      aria-label={`Category: ${label}`}
    >
      <span style={{ fontSize: '1.2em' }}>{icon}</span> {label}
    </span>
  );
}
