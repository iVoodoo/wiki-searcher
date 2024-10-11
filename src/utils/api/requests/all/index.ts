import { api } from '@utils/api/instance'

interface getAllMatchesParams {
  searchValue: string
  offset: number
}

type getAllMatchesConfig = AxiosRequestConfig<getAllMatchesParams>

export const getAllMatches = async ({ params, config }: getAllMatchesConfig) =>
  api.get<WikiMatches>('', {
    params: {
      action: 'query',
      format: 'json',
      prop: '',
      origin: '*',
      list: 'search',
      formatversion: '2',
      srsearch: params.searchValue,
      srlimit: '10',
      sroffset: params.offset,
      srinfo: 'totalhits',
      srprop: 'snippet'
    },
    ...config
  })
