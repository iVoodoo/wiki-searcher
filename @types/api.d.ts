type Currency = {
  name: string
  symbol: string
}

type Name = {
  name: string
  symbol: string
}

type Match = {
  ns: number
  title: string
  pageid: number
  snippet: string
}

interface WikiMatches {
  batchcomplete: true
  continue: {
    sroffset: number
    continue: string
  }
  query: {
    searchinfo: {
      totalhits: number
    }
    search: Match[]
  }
}
