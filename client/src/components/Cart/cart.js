import React, { useContext } from 'react'
import axios from 'axios'
import { GlobalState } from '../../GlobalState'
import { Link } from 'react-router-dom'
import fire from '../img/fire.png'
import { RiDeleteBinLine } from 'react-icons/ri'

const Cart = () => {
  const state = useContext(GlobalState)
  const SERVER_URL = 'http://localhost:5000';
  const [cart, setCart] = state.userAPI.cart
  console.log(cart)


  const totalItems = cart.reduce((total, pro) => total + pro.quantity, 0);

  const tPrice = cart.reduce((total, pro) => total + pro.price * pro.quantity, 0);
  const calGST = (tPrice) => {
    const gstRate = 0.12; // 12% GST
    return tPrice * gstRate;
  };

  const TotalPriceWithGST = Math.floor(calGST(tPrice) + tPrice);
  console.log(TotalPriceWithGST)


  const handlePayment = async () => {
    try {
      const res = await axios.post(`${SERVER_URL}/api/payment/create`, { cart, TotalPriceWithGST },{
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(res.data);

      if (res && res.data.links && res.data.links[1].href) {
        window.location.href = res.data.links[1].href; 
      }

    } catch (error) {
      console.error("Payment error: ", error.response?.data || error);
    }
  };



  // const IncQnt = (proId) => {
  //   const updatedCart = cart.map(pro =>
  //     pro._id === proId
  //       ? { ...pro, quantity: pro.quantity + 1 }
  //       : pro
  //   );
  //   setCart(updatedCart);
  // };
  const IncQnt = (proId) => {
    // console.log(proId)    
    setCart(cart => cart.map(pro =>
      pro._id === proId
        ? { ...pro, quantity: pro.quantity + 1 }
        : pro
    ));
  };



  const DncQnt = (proId) => {
    const updatedCart = cart.map(pro =>
      pro._id === proId
        ? pro.quantity > 1
          ? { ...pro, quantity: pro.quantity - 1 }
          : pro // If quantity is 1, don't decrease it further
        : pro
    );
    setCart(updatedCart);
  };

  const removePr = (proId) => {
    const updatedCart = cart.filter(pro => pro._id !== proId);
    setCart(updatedCart);
  };



  return (
    <>
      <div className='Cart mt-[140px]'>

        <div className='mt-40 lg:mt-44 mx-5'>
          {/* <div className='text-3xl font-bold mt-16 '>Saving to celebrate</div> */}
          <div className='text-3xl font-bold mt-16 '>YOUR BAG</div>
          {/* <p>Enjoy up to 60% off thousands of style during the End of Year sale - while supplies last</p> */}
          <div className='text-sm font-semibold pl-5 text-gray-500'>ITEMS : {totalItems}</div>
        </div>

        <div className='flex flex-col-reverse lg:flex-row lg:mt-9 lg:mx-9 justify-center gap-11'>

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

                  <div className='flex flex-col  gap-7'>


                    {
                      cart.map(pro => (
                        <div key={pro._id} className='grid grid-cols-2 lg:flex lg:flex-row gap-2'>

                          <div className='lg:basis-[30%]'>
                            <Link to={`/products/${pro._id}`}>
                            <img src={pro.images[0].url} alt="" className='lg:w-[15vw] lg:h-[35vh] rounded-2xl object-cover' loading='lazy' />
                            </Link>
                          </div>

                          <div className='lg:basis-[70%] flex lg:flex-row flex-col'>

                            <div className='basis-[70%] flex flex-col justify-between mt-1 lg:my-6'>
                              <div className='text-xl font-bold'>{pro.title.toUpperCase()}</div>
                              <div>
                                <div className='hidden lg:block'>
                                  {pro.description}
                                </div>

                                <div className='mt-2 p-2 bg-[#f6f6f6] w-fit rounded-lg' onClick={() => removePr(pro._id)}>
                                  <RiDeleteBinLine size={22} color='gray' className='' />
                                </div>
                              </div>

                              {/* <div>
                            </div> */}
                            </div>

                            <div className='basis-[30%] flex flex-col justify-evenly lg:my-6 my-2 items-center'>
                              <div className='text-[#4A69E2] text-2xl font-bold'>₹ {pro.price}.00</div>

                              <div className='flex flex-col justify-center items-center gap-2 w-fit text-sm font-bold'>
                                Quantity
                                <div className='flex justify-center items-center border border-black rounded-lg'>
                                  <button className='p-1 font-bold text-xl rounded-lg px-3' onClick={() => IncQnt(pro._id)}>+</button>
                                  <div className='p-1 px-5 font-bold border border-r-black border-l-black h-full pt-2'>{pro.quantity}</div>
                                  <button className='p-1 font-bold text-xl rounded-lg px-3' onClick={() => DncQnt(pro._id)}>-</button>
                                </div>
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


          <div className='basis-[30%] relative px-6  p-9 '>
            <div className='sticky top-44'>

              <div className='text-2xl font-bold '>ORDER SUMMARY</div>
              {/* totallll : {calGST(tPrice)} */}

              <div className='px-4 mt-5 flex flex-col gap-3 justify-evenly'>

                <div className='flex justify-between '>
                  <div className=''>{totalItems} ITEMS</div>
                  <div>₹ {tPrice}.00</div>
                </div>

                <div className='flex justify-between '>
                  <div className=''>Delivery</div>
                  <div>Free</div>
                </div>

                <div className='flex justify-between'>
                  <div className=''>Sales Tax</div>
                  <div>GST:{calGST(tPrice).toFixed(2)}</div>
                </div>

                <div className='flex justify-between mt-5 border-t-gray-300 border-2 pt-3 text-lg font-bold '>
                  <div className=''>Total</div>
                  <div>{calGST(tPrice) + tPrice}</div>
                </div>

                {/* <button>CHECKOUT</button> */}
                <button onClick={handlePayment} className='bg-black font-bold text-white w-full p-3 rounded-xl '>BUY NOW</button>
              </div>
            </div>
          </div>


        </div>


        {/* <Footer /> */}

      </div>
    </>
  )
}

export default Cart
