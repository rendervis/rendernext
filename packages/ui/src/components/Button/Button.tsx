import cn from 'classnames'
import React, {
  ButtonHTMLAttributes,
  JSXElementConstructor,
} from 'react'

import s from './Button.module.scss'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  Component?: string | JSXElementConstructor<any>
  width?: string | number
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    width,
    disabled = false,
    style = {},
    Component = 'button',
    ...rest
  } = props


  const rootClassName = cn(
    s.root,
    className
  )

  return (
    <Component
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style,
      }}
      {...rest}
    >
      {children}

    </Component>
  )
}

export {Button}
