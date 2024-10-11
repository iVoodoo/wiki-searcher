import clsx from 'clsx'
import { ButtonHTMLAttributes, FC, ReactElement } from 'react'

import style from './Button.module.scss'

interface Button extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string
  icon?: ReactElement
}

export const Button: FC<Button> = ({ title, icon, className, ...props }) => {
  return (
    <button className={clsx(style.button, className)} type='button' {...props}>
      {title}
      {!!icon && <>{icon}</>}
    </button>
  )
}
