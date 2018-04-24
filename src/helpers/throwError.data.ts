import enumObjectKeys from './enumObjectKeys'

export const ERRORS = {
  LOGIN001: 'The daemon couldn\'t start.',
  LOGIN002: 'The wallet couldn\'t start.',
}

export const ERROR = enumObjectKeys<keyof typeof ERRORS>(ERRORS)
