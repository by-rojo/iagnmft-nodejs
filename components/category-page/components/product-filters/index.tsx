import React, { useContext } from 'react'
import context from '../../context'

const ProductFilters: React.FC<ProductFilterProps> = () => {
  const { dispatch, filters } = useContext(context)
  return dispatch ? (
    <div>
      <form>
        <div>
          <label>Min Price</label>
          <input
            type="range"
            name="minPrice"
            onChange={(event) => {
              dispatch.onFilterChange({
                minPrice: parseFloat(event.target.value),
                orderBy: 'price',
              })
            }}
            defaultValue={filters?.minPrice}
            min={0}
            max={1000}
          />
          {(filters?.minPrice || 0) > 0 && <label>${filters?.minPrice}</label>}
        </div>
        <div>
          <label>Max Price</label>
          <input
            type="range"
            name="maxPrice"
            onChange={(event) => {
              dispatch.onFilterChange({
                maxPrice: parseFloat(event.target.value),
                orderBy: 'price',
              })
            }}
            defaultValue={filters?.maxPrice}
            min={0}
            max={1000}
          />
          {(filters?.maxPrice || 0) > 0 && <label>${filters?.maxPrice}</label>}
        </div>

        <div>
          <label>Order by</label>
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
            <option value="popularity asc">Least popular – Most popular</option>
            <option value="rating desc">Highest Rating – Lowest Rating</option>
            <option value="rating asc">Lowest Rating – Highest Rating</option>
          </select>
        </div>
      </form>
    </div>
  ) : null
}

export default ProductFilters
