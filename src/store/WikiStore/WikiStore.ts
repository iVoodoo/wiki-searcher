import { AxiosError } from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'

import { injectStores } from '@mobx-devtools/tools'
import { getAllMatches } from '@utils/api/requests/all'

class WikiStore {
  data: Match[] = []
  totalHits = 0
  loading = false
  error: string | null = null
  offset = 0

  constructor() {
    makeAutoObservable(this)
  }

  clearStore = () => {
    this.data = []
    this.totalHits = 0
    this.error = null
    this.offset = 0
  }

  fetchMoreWikiData = async (query: string) => {
    if (this.offset >= this.totalHits) {
      return
    }
    this.loading = true
    this.error = null

    try {
      const response = await getAllMatches({
        params: { offset: this.offset, searchValue: query }
      })

      runInAction(() => {
        this.data = [...this.data, ...response.data.query.search]
        this.offset += 10
      })
    } catch (error) {
      runInAction(() => {
        if (error instanceof AxiosError) {
          this.error = error.response?.data.message || 'Ошибка при поиске в Wiki по Вашему запросу'
        } else {
          this.error = 'Непредвиденная ошибка'
        }
      })
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }

  fetchWikiData = async (query: string) => {
    this.loading = true
    this.error = null
    try {
      const response = await getAllMatches({ params: { offset: this.offset, searchValue: query } })

      runInAction(() => {
        this.data = response.data.query.search
        this.totalHits = response.data.query.searchinfo.totalhits
        this.offset = 10
      })
    } catch (error) {
      runInAction(() => {
        if (error instanceof AxiosError) {
          this.error = error.response?.data.message || 'Ошибка при поиске в Wiki по Вашему запросу'
        } else {
          this.error = 'Непредвиденная ошибка'
        }
      })
    } finally {
      this.loading = false
    }
  }
}

const wikiStore = new WikiStore()
injectStores({ wikiStore })
export default wikiStore
