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

const Button = () => {


  return <button>hello</button>;
}

export {Button}
