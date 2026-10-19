import type { CSSProperties } from 'react';

interface IconProps {
  name: string;
  size?: number;
  filled?: boolean;
  className?: string;
  style?: CSSProperties;
  'aria-label'?: string;
}

const Icon = ({
  name,
  size = 24,
  filled = false,
  className = '',
  style,
  'aria-label': ariaLabel,
}: IconProps) => {
  return (
    <span
      className={`material-symbols-rounded select-none align-middle leading-none ${
        filled ? 'icon-fill' : ''
      } ${className}`}
      style={{ fontSize: size, ...style }}
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
    >
      {name}
    </span>
  );
};

export default Icon;
