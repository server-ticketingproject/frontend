import React from 'react';
import { SPACING } from '../../styles/spacing';

interface TextAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  placeholder = '',
  rows = 3,
  disabled = false,
  style = {},
  className = '',
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      style={{
        width: '100%',
        padding: `${SPACING.small}px ${SPACING.medium}px`,
        borderRadius: '4px',
        border: '1px solid #e5e7eb',
        fontSize: '14px',
        lineHeight: '1.5',
        transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        resize: 'vertical',
        minHeight: '80px',
        ...style,
      }}
      className={`focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
    />
  );
};

export default TextArea;
