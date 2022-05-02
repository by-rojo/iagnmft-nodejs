import React from 'react'
import BigGrid from '../../../big-grid'
import BigGridCard from '../../../big-grid-card'
import useStaticHomePageData from '../../hooks'

const TopProductsSection = () => {
  const { topProducts } = useStaticHomePageData()
  return (
    <section>
      <div className="container-fluid px-5">
        <h2 className="text-center mt-4 mb-2">Top Products</h2>
        <hr className="w-75 mb-2 mx-auto" />
      </div>
      <BigGrid>
        {topProducts?.map((product, index) => {
          return (
            <BigGridCard
              classNames={[
                'col-12',
                'col-md-6',
                'col-lg-4',
                'flex-column',
                'd-flex',
                'justify-content-between',
              ]}
              color={index % 2 === 0 ? 'light' : 'dark'}
              key={product.id}
              images={product.images}
              title={product.name.replace(/<[^>]*>/g, '')}
              description={product.short_description.replace(/<[^>]*>/g, '')}
            />
          )
        })}
      </BigGrid>
    </section>
  )
}

export default TopProductsSection
