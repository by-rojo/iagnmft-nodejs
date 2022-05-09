import React from 'react'
import ProductList from './components/products-list'
import { ProductListContext } from './context'
const CategoryPage: React.FC = () => {
  return (
    <div>
      <ProductListContext>
        <ProductList />
      </ProductListContext>
    </div>
  )
}

export default CategoryPage
