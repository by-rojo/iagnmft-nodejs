import React, { createContext, useCallback, useState, useRef } from 'react'
import { getProductsPublicAPI } from '../../api-factory/api/client/products'
import { DEFAULT_CATEGORY_PARAMS } from '../../constants'
import useStaticCategoryPageData from './hooks'

const DEFAULT_FILTER_VALUES = {
  maxPrice: 0,
  minPrice: 0,
}
const context = createContext<ProductListContext>({})
const { Provider } = context

export const ProductListContext: React.FC<
  React.PropsWithChildren<ProductListContextProps>
> = ({ children, pageStart: defaultPageStart = 1 }) => {
  const [filters, setFilters] = useState(DEFAULT_FILTER_VALUES)
  const [pageStart, setPageStart] = useState(defaultPageStart)
  const timeoutRef: React.MutableRefObject<NodeJS.Timeout | null> = useRef(null)
  const { products, category } = useStaticCategoryPageData()
  const [rows, setRows] = useState(products || [])

  //throttle this for filtering
  const loadProducts = useCallback(
    (page: number) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        getProductsPublicAPI({
          ...DEFAULT_CATEGORY_PARAMS,
          ...filters,
          page,
          category: category?.id,
        }).then((response) => {
          if (response && response.length > 0) {
            const newRows = page <= 1 ? [] : [...rows]

            response.forEach((item) => {
              newRows.push(item)
            })
            setRows(newRows)
            setPageStart(page)
          }
        })
      }, 500)
    },
    [category?.id, filters, rows]
  )
  return (
    <Provider
      value={{
        dispatch: {
          loadProducts,
          onFilterChange: (filter) => {
            const newFilters = { ...filters, ...filter }
            setFilters(newFilters)
            setPageStart(1)
            loadProducts(1)
          },
        },
        items: rows,
        pageStart,
        filters,
      }}
    >
      {children}
    </Provider>
  )
}

export default context
