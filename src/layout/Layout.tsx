import { FC, PropsWithChildren } from 'react'

import { Header } from './header/Header'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className='container'>{children}</main>
    </>
  )
}
