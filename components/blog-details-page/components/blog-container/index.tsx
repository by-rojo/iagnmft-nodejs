import useBlog from '../../../../api-factory/api/client/products/use-blog'
import { cleanHtmlString } from '../../../../utils'

const BlogContainer: React.FC = () => {
  const blog = useBlog()
  return (
    <div>
      <article
        dangerouslySetInnerHTML={{ __html: blog?.content?.rendered || '' }}
      />
    </div>
  )
}

export default BlogContainer
