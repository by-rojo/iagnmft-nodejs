import he from 'he'
const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL

export const cleanHtmlString = (text: string, lineBreaks?: boolean) => {
  let replacedText = text
  if (lineBreaks) {
    //add periods to </p>
    replacedText = text.replace(/<\/p>/g, '.')
    //replace p tags with \r\n
    replacedText = replacedText.replace(/<p.*>/g, '\r\n')
    //replace !. ?. .. = .
    replacedText = replacedText.replace(/\!\.|\?\.|\.\./g, '.')
  }

  replacedText = replacedText.replace(/<[^>]*>/g, '')
  return he.decode(replacedText)
}

export const permalinkToRelativePath = (path: string): string => {
  return path.replace(HOST_URL || '', '')
}
