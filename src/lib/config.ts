export const environment = process.env.NODE_ENV || 'development'
export const isDev = environment === 'development'
export const isServer = typeof window === 'undefined'
export const isSafari =
  !isServer && /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

export const title = 'Bankless AI Search'
export const description =
  'Search across the Bankless Podcast using an advanced semantic search index powered by OpenAI.'
export const domain = 'bankless-ai.vercel.app'

export const author = 'LiveTheLifeTV'
export const twitter = 'livethelifetv'
export const twitterUrl = `https://twitter.com/${twitter}`
export const githubRepoUrl =
  'https://github.com/unbanksytv/'
export const githubSponsorsUrl =
  'https://github.com/sponsors/transitive-bullshit'
export const copyright = `Copyright 2022 ${author}`
export const madeWithLove = 'Made with ❤️ in Paris'

export const port = process.env.PORT || '3000'
export const prodUrl = `https://${domain}`
export const url = isDev ? `http://localhost:${port}` : prodUrl

export const apiBaseUrl =
  isDev || !process.env.VERCEL_URL ? url : `https://${process.env.VERCEL_URL}`

// these must all be absolute urls
export const socialImageUrl = `${url}/social.jpg`

// ---

export const openaiEmbeddingModel = 'text-embedding-ada-002'
