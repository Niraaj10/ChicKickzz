import React, { useContext } from 'react'
import { GlobalState } from '../../GlobalState'
import ProductCard from './ProductCard'

const Products = () => {
  const state = useContext(GlobalState)
  const [productss] = state.productAPI.products
  const [isAdmin] = state.userAPI.isAdmin

  // console.log(state)
  return (
    <>
      <div className='ProductList '>

        <div>
          Productsss
        </div>

        <div className=' flex gap-9 flex-wrap  justify-center '>
          {
            productss.map(pro => {
              return <ProductCard key={pro._id} product={pro} isAdmin={isAdmin} />
            })
          }
        </div>

      </div>
    </>
  )
}

export default Products
