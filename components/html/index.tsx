import parse from 'html-react-parser'

const Html: React.FC<{ content?: string }> = ({ content }) => {
  return content ? <>{parse(content)}</> : null
}

export default Html
