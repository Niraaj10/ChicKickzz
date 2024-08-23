import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import Footer from '../footerr/Footer';

const ProductDetails = () => {
    const [proDetails, setProDetails] = useState([]);
    const params = useParams();

    const state = useContext(GlobalState)
    const [products] = state.productAPI.products;
    // console.log(state.userAPI)
    const addToCart = state.userAPI.addToCart;


    useEffect(() => {
        if (params) {
            products.forEach(pro => {
                if (pro._id === params.id) {
                    setProDetails(pro)
                }
            })
        }
    }, [params, products])

    console.log(proDetails.images)

    if (proDetails.length === 0) return null;

    // console.log(proDetails)
    return (
        <>
            <div className='ProductDetails mt-[140px]'>
                Product detaillllll

                <div className='flex gap-9 justify-between'>

                    <div className='basis-[70%] grid grid-cols-2 gap-7 rounded-[50px] overflow-hidden'>
                        {
                            proDetails.images.map(img => (
                                <img src={img.url} alt="" className='object-cover lg:w-[250vw] lg:h-[55vh] cursor-zoom-in hover:scale-110' />

                            ))
                        }
                    </div>

                    <div className='basis-[30%]'>
                        <div className='mt-10'>
                            <h6 className='text-4xl font-bold'>{proDetails.title.toUpperCase()}</h6>

                            <p className='mt-9'>{proDetails.description}</p>
                            {/* <p>{proDetails.content}</p> */}
                            {/* <p>Sold:{proDetails.sold}</p> */}
                        </div>


                        <div className='my-4'>
                            <div className='font-semibold pl-2 py-2'>SIZE</div>
                            <div className='flex gap-5'>
                                {
                                    proDetails.size.map(size => (
                                        <li className='list-none bg-white p-3 px-5 rounded-xl'>{size}</li>
                                    ))
                                }
                            </div>


                            <div className='my-3'>
                                <div className='font-semibold pl-2 py-2'>PRICE</div>
                                <div className='text-[#4A69E2] text-2xl font-bold'>
                                    ₹ {proDetails.price}.00
                                </div>
                            </div>

                                <div className='p-3 rounded-2xl bg-black text-white flex justify-center font-bold'>
                            <Link to='/cart' onClick={() => addToCart(proDetails)} >
                                ADD TO CART
                            </Link>
                                </div>

                            {/* <button onClick={() => addToCart(proDetails)}>Add to cart</button> */}
                        </div>
                    </div>
                </div>



                <Footer />
            </div>
        </>
    )
}

export default ProductDetails
