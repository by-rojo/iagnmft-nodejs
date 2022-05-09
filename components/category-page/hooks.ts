import { useStaticPageContext } from '../../context/static-page-context'

const useStaticCategoryPageData =
  (): DefaultContext<CategoryPageStaticData> => {
    return useStaticPageContext<CategoryPageStaticData>()
  }

export default useStaticCategoryPageData
