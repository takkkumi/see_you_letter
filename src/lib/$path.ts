/* eslint-disable */
export const pagesPath = {
  about: {
    $url: (url?: { hash?: string }) => ({ pathname: '/about' as const, hash: url?.hash })
  },
  pastLetter: {
    $url: (url?: { hash?: string }) => ({ pathname: '/pastLetter' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
