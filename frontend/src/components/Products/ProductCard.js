import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product, isAdmin}) => {
    // console.log(product)
  return (
    <div className='ProductCard flex flex-col'>

      {
        isAdmin && <>
            <input type="checkbox" checked={product.checked} />
        </>
      }

        <div>
      <img src={product.images.url} alt="" className='w-[19vw]'/>
        </div>


      <div>
        <h2>{product.title}</h2>
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
