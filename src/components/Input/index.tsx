import React from 'react';
import { SPACING } from '../../styles/spacing';
import COLORS from '../../styles/colors';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  style?: React.CSSProperties;
}

export default function Input({ style, ...props }: InputProps) {
  return (
    <input
      style={{
        padding: `${SPACING.small}px ${SPACING.medium}px`,
        borderRadius: '4px',
        border: `1px solid ${COLORS.border}`,
        fontSize: '14px',
        width: '100%',
        boxSizing: 'border-box',
        ...style,
      }}
      {...props}
    />
  );
}
