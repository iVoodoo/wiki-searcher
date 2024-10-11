import { observer } from 'mobx-react-lite'
import { useCallback, useState } from 'react'

import { Button } from '@components/Button'
import { Card } from '@components/Card'
import { SearchBar } from '@components/SearchBar'
import { Layout } from '@layout/Layout'
import wikiStore from '@store/WikiStore'

import style from './MainPage.module.scss'

export const MainPage = observer(() => {
  const [searchValue, setSearchValue] = useState('')
  const [searchFinished, setSearchFinished] = useState(false)

  const { data, totalHits, offset, loading, error, fetchWikiData, fetchMoreWikiData, clearStore } = wikiStore

  const onSearchClick = useCallback(
    (value: string) => {
      clearStore()
      fetchWikiData(value.trim())
      setSearchFinished(true)
    },
    [fetchWikiData, clearStore]
  )

  return (
    <Layout>
      <section className={style.wiki}>
        <SearchBar
          label='Поле для поиска информации в Wiki'
          placeholder='Введите значение для поиска'
          value={searchValue}
          onChange={setSearchValue}
          onSearch={onSearchClick}
        />
        {searchFinished && (
          <>
            {totalHits !== 0 ? (
              <div className={style.wiki__list}>
                {data.map((item) => (
                  <Card key={item.pageid} pageId={item.pageid} text={item.snippet} title={item.title} />
                ))}
              </div>
            ) : (
              !loading && <span className={style.wiki__response}>Не найдено</span>
            )}
          </>
        )}
        {loading && <span className={style.wiki__response}>Загрузка...</span>}
        {error && <p className={style.wiki__response_bad}>{error}</p>}
        {offset < totalHits && (
          <Button title='Загрузить ещё' onClick={() => fetchMoreWikiData(searchValue)} className={style.wiki__button} />
        )}
      </section>
    </Layout>
  )
})
