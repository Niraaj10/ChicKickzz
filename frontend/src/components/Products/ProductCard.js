import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product, isAdmin}) => {
    console.log(product)
  return (
    <div className='ProductCard z-40 flex flex-col border border-black bg-white rounded-3xl p-3'>

      {
        isAdmin && <>
            <input type="checkbox" checked={product.checked} />
        </>
      }

          <div className='relative overflow-hidden rounded-2xl'>
          <div className='absolute bg-[#FFA52F] z-10 top-[-35px] left-[-25px] p-1 pr-2 rounded-2xl pl-8 pt-9 font-semibold text-[13px] ' >
            New 
          </div>

          <img src={product.images[0].url} alt="" className='w-[19vw] h-[42vh] rounded-2xl object-cover' loading='lazy'/>

          </div>


      <div>
        <h2>{product.title.toUpperCase()}</h2>
        {/* <span>₹ {product.price}.00</span> */}
        <p>{product.description}</p>
      </div>


      <div>
        <Link to={`detail/${product._id}`}>
        VIEW PRODUCT - ₹ {product.price}.00
        </Link>
      </div>
    </div>
  )
}

export default ProductCard
