import axios from 'axios'

import { WIKI_API } from '@utils/constants'

export const api = axios.create({
  baseURL: WIKI_API
})
