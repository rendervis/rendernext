import React, { ButtonHTMLAttributes,MouseEvent } from 'react';
import cx from 'classnames';
import styles from './Button.module.scss';

type Size = 'sm' | 'md';
type ButtonKinds =  'primary'|'secondary'|'danger'|'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: ButtonKinds;
  size?: Size;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
}


const Button: React.FC<ButtonProps> = ({
  kind = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className,
  children,
  ...rest
}) => {


  const buttonClasses = cx(className, {
    [styles[`btn`]]: true,
    [styles[`btn--sm`]]: size === 'sm',
    [styles[`btn--md`]]: size === 'md',
    [styles[`btn--${kind}`]]: kind,
    [styles[`btn--disabled`]]: disabled,
  });

  return (
    <button
    data-cy={`button-action-${kind}`}
    onClick={onClick} className={buttonClasses} disabled={disabled} {...rest}>
      <span>{children}</span>
    </button>
  );
};

Button.displayName = 'Button';
export { Button };
export type { ButtonProps, Size, ButtonKinds };

