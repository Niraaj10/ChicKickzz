import React, { useContext } from 'react'
import { GlobalState } from '../../GlobalState'
import { Link } from 'react-router-dom'
import fire from '../img/fire.png'

const Cart = () => {
  const state = useContext(GlobalState)
  const [cart, setCart] = state.userAPI.cart

  const totalItems = cart.reduce((total, pro) => total + pro.quantity, 0);

  const tPrice = cart.reduce((total, pro) => total + pro.price * pro.quantity, 0);
  const calGST = (tPrice) => {
    const gstRate = 0.12; // 12% GST
    return tPrice * gstRate;
  };


  console.log(cart)



  return (
    <>
      <div className='Cart mt-[140px]'>

        <div className='mt-44 mx-5'>
          {/* <div className='text-3xl font-bold mt-16 '>Saving to celebrate</div> */}
          <div className='text-3xl font-bold mt-16 '>YOUR BAG</div>
          {/* <p>Enjoy up to 60% off thousands of style during the End of Year sale - while supplies last</p> */}
          <div className='text-sm font-semibold pl-5 text-gray-500'>ITEMS : {totalItems}</div>
        </div>

        <div className='flex mt-9 mx-9 justify-center gap-11'>

          <div className='bg-white basis-[70%] p-7 px-9 rounded-3xl'>
            {
              cart.length === 0 ? <>
                <div className='h-[40vh] flex flex-col gap-8 justify-center items-center'>
                  <div className='text-4xl font-bold'>YOUR BAG IS EMPTY

                    <p className='text-sm font-normal mt-1 mx-4'>Please add Products to your bag</p>
                  </div>

                  <Link to='/products' className='flex justify-center items-center font-bold bg-black text-white p-4 px-8 rounded-2xl'>
                    New Drops <img src={fire} alt="" className='w-[34px] ml-[-5px] mt-[-4px]' />
                  </Link>
                </div>

              </>

                : <>
                  <div className='flex flex-col gap-7'>


                    {
                      cart.map(pro => (
                        <div className='flex gap-2'>

                          <div className='basis-[30%]'>
                            <img src={pro.images[0].url} alt="" className='w-[15vw] h-[35vh] rounded-2xl object-cover' loading='lazy' />
                          </div>

                          <div className='basis-[45%] flex flex-col justify-between my-6'>
                            <div className='text-xl font-bold'>{pro.title.toUpperCase()}</div>
                            <div>{pro.description}</div>
                          </div>

                          <div className='basis-[25%] flex flex-col justify-evenly my-6 items-center'>
                            <div className='text-[#4A69E2] text-2xl font-bold'>₹ {pro.price}.00</div>

                            <div className='flex flex-col justify-center items-center gap-2 w-fit text-sm font-bold'>
                              Quantity
                              <div className='flex justify-center items-center border border-black rounded-lg'>
                                <button className='p-1 font-bold text-xl rounded-lg px-3'>+</button>
                                <div className='p-1 px-5 font-bold border border-r-black border-l-black h-full pt-2'>{pro.quantity}</div>
                                <button className='p-1 font-bold text-xl rounded-lg px-3'>-</button>
                              </div>
                            </div>
                          </div>

                        </div>
                      ))
                    }
                  </div>
                </>
            }

          </div>

          <div className='basis-[30%] relative px-6  p-9'>
            

          </div>


        </div>

      </div>
    </>
  )
}

export default Cart
