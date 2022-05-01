import { createContext, ReactElement, useContext } from 'react'

const defaultContext: DefaultContext<{}> = {}
const context = createContext(defaultContext)

const { Provider } = context

type Props<DataItem> = {
  data: DefaultContext<DataItem>
  children: ReactElement
}

export const StaticPageContext = <DataItem extends object>({
  data,
  children,
}: Props<DataItem>) => {
  return <Provider value={data}>{children}</Provider>
}

export function useStaticPageContext<DataItem>(): DefaultContext<DataItem> {
  return useContext(context)
}

export default context
