import { useStaticPageContext } from '../../context/static-page-context'

const useStaticProductPageData = (): DefaultContext<ProductPageStaticData> => {
  return useStaticPageContext<ProductPageStaticData>()
}

export default useStaticProductPageData
