import React from 'react'
import BigGrid from '../../../big-grid'
import BigGridCard from '../../../big-grid-card'
import useStaticHomePageData from '../../hooks'

const TopProductsSection = () => {
  const { topProducts } = useStaticHomePageData()
  return (
    <section>
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
