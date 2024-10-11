import parse from 'html-react-parser'
import { FC, memo } from 'react'

import { WIKI_LINK_BY_ID } from '@utils/constants'

import style from './Card.module.scss'
type Card = {
  title: string
  text: string
  pageId: number
}

export const Card: FC<Card> = memo(({ title, text, pageId }) => {
  return (
    <article className={style.card}>
      <header className={style.card__header}>
        <a href={`${WIKI_LINK_BY_ID}${pageId}`} target='_blank' className={style.card__link}>
          <h2 className={style.card__title}>{title}</h2>
        </a>
      </header>
      <div className={style.card__body}>
        <div className={style.card__text}>
          <p>{parse(text)}</p>
        </div>
      </div>
    </article>
  )
})
