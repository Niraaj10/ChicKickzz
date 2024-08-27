import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const ProductCard = ({ product, isAdmin }) => {
  console.log(product)

  const deletePro = async (proId, proTitle) => {
    if (window.confirm(`You want to delete this product : ${proTitle}`)) {
      
      try {
        await axios.delete(`/api/products/${proId}`)
        console.log('Deleted : ' + product._id)
        window.location.reload()
      } catch (error) {
        console.error('Error deleteing product:',error)
      }

    } 
  }

  



  return (
    <div className='ProductCard z-40 flex flex-col bg-white rounded-3xl p-3'>

      {
        isAdmin ? <>
          
          <div className='flex flex-col gap-2'>

            <div className='flex lg:flex-row md:flex-row flex-col'>
              <div className='relative overflow-hidden rounded-2xl'>
                {/* <div className='absolute bg-[#FFA52F] z-10 top-[-32px] left-[-25px] p-1 pr-2 rounded-2xl pl-8 pt-9 font-semibold text-[13px] ' >
              New
              </div> */}

                <img src={product.images[0].url} alt="" className='lg:w-[6vw] lg:h-[12vh] rounded-2xl object-cover' loading='lazy' />

              </div>


              <div className=' py-3 px-4 w-48'>
                <h2 className='text-lg font-bold'>{product.title.toUpperCase()}</h2>
                {/* <span>₹ {product.price}.00</span> */}
                {/* <p>{product.description}</p> */}
                <div className='text-gray-400'>
                  SOLD : {product.sold}
                </div>
              </div>
            </div>


            <div className='flex lg:flex-row flex-col lg:justify-center items-center gap-2'>
              <Link to={`/products/${product._id}`} className='bg-black text-white p-2 rounded-xl flex justify-center items-center gap-2 px-3 md:px-8 lg:px-8'>
                EDIT <FaRegEdit className='mt-[-2px]' size={20}/>
              </Link>
              <div onClick={() => deletePro(product._id, product.title.toUpperCase())} className='hidden bg-black lg:flex justify-center items-center gap-1 text-white  p-2 rounded-xl px-3 md:px-8 lg:px-8'>
                DELETE <RiDeleteBin2Line  className='mt-[-2px]' size={20}/>
              </div>
            </div>

            
          </div>

        </> : <>

          {/* <h2>user</h2> */}

          <div className='relative overflow-hidden rounded-2xl'>
            <div className='absolute bg-[#FFA52F] z-10 top-[-32px] left-[-25px] p-1 pr-2 rounded-2xl pl-8 pt-9 font-semibold text-[13px] ' >
              New
            </div>

            <img src={product.images[0].url} alt="" className='lg:w-[19vw] lg:h-[42vh] rounded-2xl object-cover' loading='lazy' />

          </div>


          <div className=' py-3 px-4'>
            <h2 className='text-lg font-bold'>{product.title.toUpperCase()}</h2>
            {/* <span>₹ {product.price}.00</span> */}
            {/* <p>{product.description}</p> */}
          </div>


          <div className='bg-black lg:text-base text-sm text-white p-2 flex  justify-center items-center  rounded-xl'>
            <Link to={`/products/${product._id}`} className='flex lg:flex-row flex-col'>
              VIEW PRODUCT - <div>₹ {product.price}.00</div>
            </Link>
          </div>

        </>
      }


    </div>
  )
}

export default ProductCard
