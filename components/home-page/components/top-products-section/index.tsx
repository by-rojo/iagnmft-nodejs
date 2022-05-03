import React from 'react'
import BigGrid from '../../../big-grid'
import BigGridCard from '../../../big-grid-card'
import useStaticHomePageData from '../../hooks'

const TopProductsSection = () => {
  const { topProducts } = useStaticHomePageData()
  return (
    <section>
      <div className="container-fluid px-5">
        <h2 className="text-center my-5 pt-2">Top Products</h2>
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
              externalUrl={product.external_url}
              internalUrl={product.permalink}
              title={product.name}
              description={product.short_description}
            />
          )
        })}
      </BigGrid>
    </section>
  )
}

export default TopProductsSection
