import he from 'he'
const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL

export const cleanHtmlString = (text: string) => {
  return he.decode(text.replace(/<[^>]*>/g, ''))
}

export const permalinkToRelativePath = (path: string): string => {
  return path.replace(HOST_URL || '', '')
}
