import React, { createContext, useCallback, useState, useRef } from 'react'
import { getProductsPublicAPI } from '../../api-factory/api/client/products'
import { DEFAULT_CATEGORY_PARAMS } from '../../constants'
import useStaticCategoryPageData from './hooks'

const DEFAULT_FILTER_VALUES: ProductListContext['filters'] = {
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
  const [hasMore, setHasMore] = useState(true)

  //throttle this for filtering
  const loadProducts = useCallback(
    (page: number, newFilters?: ProductListContext['filters']) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        getProductsPublicAPI({
          ...DEFAULT_CATEGORY_PARAMS,
          ...(newFilters ?? filters),
          page,
          category: newFilters?.category ?? category?.id,
        })
          .then((response) => {
            if (response && response.length > 0) {
              const newRows = page <= 1 ? [] : [...rows]
              response.forEach((item) => {
                newRows.push(item)
              })
              setRows(newRows)
              setPageStart(page)
              setHasMore(
                newRows.length > 0 &&
                  newRows.length !== rows.length &&
                  response.length >= DEFAULT_CATEGORY_PARAMS.perPage
              )
            } else {
              setHasMore(false)
            }
          })
          .catch((e) => {
            console.error(e)
            setHasMore(false)
          })
      }, 500)
    },
    [category?.id, filters, rows]
  )
  return (
    <Provider
      value={{
        hasMore: hasMore,
        dispatch: {
          loadProducts,
          onFilterChange: (filter) => {
            const newFilters = { ...filters, ...filter }
            setFilters(newFilters)
            loadProducts(1, newFilters)
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
