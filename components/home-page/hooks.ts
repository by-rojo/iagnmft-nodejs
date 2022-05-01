import { useStaticPageContext } from '../../context/static-page-context'

const useStaticHomePageData = (): DefaultContext<HomePageStaticData> => {
  return useStaticPageContext<HomePageStaticData>()
}

export default useStaticHomePageData
