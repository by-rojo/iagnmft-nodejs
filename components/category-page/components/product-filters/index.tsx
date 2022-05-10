import React, { useContext } from 'react'
import RangeSlider from '../../../range-slider'
import context from '../../context'

const ProductFilters: React.FC<ProductFilterProps> = () => {
  const { dispatch, filters } = useContext(context)
  return dispatch ? (
    <div>
      <form>
        <div className="row mb-3">
          <div className="col-12">
            <label>
              <strong>Order by</strong>
            </label>
            <div className="mt-2">
              <select
                name="orderby"
                defaultValue={filters?.orderBy}
                onChange={(event) => {
                  const [orderBy, order] = event.target.value.split(/ /g)
                  dispatch.onFilterChange({
                    orderBy,
                    order,
                  })
                }}
              >
                <option value="date desc">Oldest – Newest</option>
                <option value="date asc">Newest – Oldest</option>
                <option value="price asc">Min Price – Max Price</option>
                <option value="price desc">Max Price – Min Price</option>
                <option value="popularity desc">
                  Most popular – Least popular
                </option>
                <option value="popularity asc">
                  Least popular – Most popular
                </option>
                <option value="rating desc">
                  Highest Rating – Lowest Rating
                </option>
                <option value="rating asc">
                  Lowest Rating – Highest Rating
                </option>
              </select>
            </div>
          </div>
          <div className="col-6 my-4">
            {(filters?.maxPrice || 0) === 0 &&
            (filters?.minPrice || 0) === 0 ? (
              <label>Price Range: ∞</label>
            ) : (
              <label>
                <strong>Price Range:</strong> ${filters?.minPrice} – $
                {filters?.maxPrice === 0 ? '∞' : filters?.maxPrice}
              </label>
            )}
            <RangeSlider
              className="mt-2"
              allowCross={false}
              range
              min={0}
              max={1000}
              step={1}
              defaultValue={[0, 1000]}
              onChange={(value) => {
                if (typeof value !== 'object') return
                if (value[0] !== filters?.minPrice) {
                  dispatch.onFilterChange({
                    minPrice: value[0],
                  })
                } else if (value[1] !== filters?.maxPrice) {
                  dispatch.onFilterChange({
                    maxPrice: value[1] === 1000 ? 0 : value[1],
                  })
                }
              }}
            />
          </div>
        </div>
      </form>
    </div>
  ) : null
}

export default ProductFilters
