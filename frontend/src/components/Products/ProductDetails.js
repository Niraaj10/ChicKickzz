import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import { RiDeleteBin2Line } from 'react-icons/ri'
import Footer from '../footerr/Footer';
import axios from 'axios';

const ProductDetails = () => {
    const [proDetails, setProDetails] = useState([]);
    const params = useParams();

    const state = useContext(GlobalState)
    const [products] = state.productAPI.products;
    const [isAdmin] = state.userAPI.isAdmin;
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

    const deletePro = async (proId, proTitle) => {
        if (window.confirm(`You want to delete this product : ${proTitle}`)) {

            try {
                await axios.delete(`/api/products/${proId}`)
                console.log('Deleted : ' + proId)
                window.location.reload()
            } catch (error) {
                console.error('Error deleteing product:', error)
            }

        }
    }

    // console.log(proDetails.images)

    if (proDetails.length === 0) return null;

    // console.log(proDetails)
    return (
        <>
            <div className='ProductDetails mt-[140px]'>
                {/* Product detaillllll */}


                {
                    isAdmin ? <>

                        {/* <div>admin</div> */}

                        <div className='flex gap-12 mt-40'>


                            <div className='flex bg-white rounded-2xl p-4 flex-col gap-5 justify-between items-center'>

                                <div className=' mb-[-40px]'>
                                    {/* {
                                    proDetails.images.map(img => (
                                        <img src={img.url} alt="" className='object-cover lg:w-[250vw] lg:h-[55vh] ' />

                                    ))
                                } */}
                                    <img src={proDetails.images[0].url} alt="" className='w-[15vw] h-[30vh] rounded-2xl object-cover' loading='lazy' />
                                </div>

                                <div className=''>
                                    <div className='mt-10'>
                                        <h6 className='text-4xl font-bold'>{proDetails.title.toUpperCase()}</h6>

                                        <p className='mt-9'>{proDetails.description}</p>
                                        {/* <p>{proDetails.content}</p> */}
                                        {/* <p>Sold:{proDetails.sold}</p> */}
                                    </div>



                                    <div className='my-4'>
                                        <div className='font-semibold pl-2 py-2'>SIZE</div>
                                        <div className='flex gap-3'>
                                            {
                                                proDetails.size.map(size => (
                                                    <li className='list-none bg-gray-100 p-3 px-5 rounded-xl'>{size}</li>
                                                ))
                                            }
                                        </div>


                                        <div className='my-3 flex justify-between items-center'>
                                            <div className='flex flex-col'>

                                                <div className='font-semibold pl-2 py-2 '>PRICE</div>
                                                <div className='text-[#4A69E2] text-2xl font-bold'>
                                                    ₹ {proDetails.price}.00
                                                </div>
                                            </div>
                                            <div className='flex flex-col justify-end items-end'>

                                                <div className='font-semibold pl-2 py-2 '>SOLD</div>
                                                <div className='text-[#4A69E2] items-end text-2xl font-bold'>
                                                    {proDetails.sold}
                                                </div>
                                            </div>
                                        </div>

                                        <div>

                                            <div onClick={() => deletePro(proDetails._id, proDetails.title.toUpperCase())} className='bg-black flex justify-center items-center gap-1 text-white p-3 rounded-xl px-8'>
                                                DELETE <RiDeleteBin2Line className='mt-[-2px]' size={20} />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='IpdateForm  w-full bg-white rounded-2xl border border-black p-7'>

                                <form action="" className='grid grid-cols-2 gap-4 '>

                                    <div className='w-[25vw] flex flex-col gap-3'>
                                        <div className='font-semibold'>PRODUCT NAME / TITLE</div>
                                        <input type="text" placeholder={proDetails.title} className='outline rounded-md p-1' />
                                    </div>

                                    <div className='w-[25vw] flex flex-col gap-3'>
                                        <div className='font-semibold'>DESCRIPTION</div>
                                        <textarea name="ProDescription" id="" className='outline rounded-md p-1' placeholder={proDetails.description}>
                                            
                                        </textarea>
                                        
                                    </div>

                                    <div className='w-[25vw] flex flex-col gap-3'>
                                        <div className='font-semibold'>SIZE</div>
                                        <input type="text" placeholder={proDetails.size} className='outline rounded-md p-1' />
                                    </div>

                                    <div className='w-[25vw] flex flex-col gap-3'>
                                        <div className='font-semibold'>PRODUCT NAME</div>
                                        <input type="text" placeholder={proDetails.title} className='outline rounded-md p-1' />
                                    </div>

                                    <div className='w-[25vw] flex flex-col gap-3'>
                                        <div className='font-semibold'>PRODUCT NAME</div>
                                        <input type="text" placeholder={proDetails.title} className='outline rounded-md p-1' />
                                    </div>

                                    <div className='w-[25vw] flex flex-col gap-3'>
                                        <div className='font-semibold'>PRODUCT NAME</div>
                                        <input type="text" placeholder={proDetails.title} className='outline rounded-md p-1' />
                                    </div>

                                                                     

                                </form>
                            </div>


                        </div>

                    </> : <>

                        {/* <div>user</div> */}

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

                                    <button onClick={() => addToCart(proDetails)}>Add to cart</button>
                                </div>
                            </div>
                        </div>
                    </>
                }



                <Footer />
            </div>
        </>
    )
}

export default ProductDetails
