import Logo from '@assets/logo.svg?react'

import style from './Header.module.scss'

export const Header = () => {
  return (
    <header className={`${style.header} container`}>
      <div className={style.header__inner}>
        <Logo className={style.header__logo} />
        <h1 className={style.header__title}>Wiki-searcher</h1>
      </div>
    </header>
  )
}
