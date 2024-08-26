import React, { useContext } from 'react'
import { GlobalState } from '../../GlobalState'
import ProductCard from './ProductCard'
import { FiPlusCircle } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Products = () => {
  const state = useContext(GlobalState)
  const [productss] = state.productAPI.products
  const [isAdmin] = state.userAPI.isAdmin

  // console.log(state) 
  return (
    <>
      <div className='ProductList mt-[140px]'>

        <div>
          {/* Productsss */}
        </div>

        <div className=' flex gap-9 flex-wrap  justify-center '>

          {
            isAdmin && <>
          <div className='cursor-pointer bg-white p-6 px-10 rounded-3xl flex justify-center items-center'>
          <Link to='/products/create'>
            <div className=' bg-gray-200 rounded-3xl flex justify-center items-center p-9'>
              <FiPlusCircle size={45} />
            </div>
          </Link>
          </div>
            
            </>
          }


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
