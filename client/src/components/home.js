import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../GlobalState'
import nikeShoe from '../assests/img/nikeShoeHome.jpg'
import { Link } from 'react-router-dom'
import Products from './Products/products'
import fire from '../assests/img/fire.png'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const Home = () => {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadingTimer = setTimeout(() => {
            setIsLoading(false);
        }, 5000);

        return () => clearTimeout(loadingTimer);
    }, []);

    return (
        <>
            {/* <Navbar /> */}

            <div className='Home mt-[140px]'>

                {/* Home */}

                {
                    isAdmin ? <>


                        <div>
                            <div className='text-[6vw] md:text-[4vw] lg:text-[4vw] font-bold mt-11 flex justify-center items-center mb-[-100px]'>
                                ALL PRODUCTS
                            </div>
                            <Products />
                        </div>

                    </> : <>

                        <div className='text-[27px] my-4 md:my-0 lg:my-0 md:mt-44 md:text-[50px] lg:text-[101px] flex justify-center items-center font-bold'>
                            {/* Step into luxury */}
                            GET HOOKED ON <span className='text-[#4A69E2] ml-2 md:ml-4 lg:ml-4'> KICKSSSS</span>
                        </div>

                        <div className='relative'>

                            <div className='absolute bottom-1 md:bottom-0 lg:bottom-0 left-5 md:left-16 lg:left-16 text-white w-[50vw] md:w-[32vw] lg:w-[32vw]'>
                                <div className='text-white text-[6vw] md:text-[4vw] lg:text-[4vw] font-bold'>NIKE AIR FORCE</div>

                                <p className='mt-[-10px] text-[13px] md:text-[16px] lg:text-[16px]'>The outdoors is for everyone—and this shoe is too. The classic AF-1 gets an adventurous refresh with utility lacing, durable materials and sturdy stitching. </p>

                                <Link to='/products'>
                                    <button className='bg-[#4A69E2] font-bold text-sm p-3 rounded-lg mb-5 mt-2'>VIEW DETAILS</button>
                                </Link>
                            </div>


                            <img src={nikeShoe} alt="" className='border h-[65vh]  md:h-[70vh] w-[90vw] lg:h-[70vh] object-cover mx-auto rounded-[2rem] md:rounded-[3rem] lg:rounded-[3rem]' />
                        </div>

                        <div className='flex flex-col'>
                            <div className='text-[6vw] md:text-[4vw] lg:text-[4vw] font-bold mt-11 flex justify-center items-center mb-[-100px]'>
                                DON'T MISS OUT NEW DROPS <img src={fire} alt="" className='w-[10vw] ml-[-25px] rotate-12' />
                            </div>


                            <div className=''>

                                {isLoading ? (
                                    <>
                                    <div className='mt-32 flex justify-center items-center gap-6'>

                                    <div className='w-32 lg:w-[25vw] z-40 flex flex-col bg-white rounded-3xl p-3'>
                                        {/* Skeleton Structure while loading */}
                                        <div className='flex flex-col gap-2'>
                                            <div className='flex lg:flex-row md:flex-row flex-col'>
                                                <div className='relative overflow-hidden rounded-2xl'>
                                                    <Skeleton  width='26vw' className='lg:w-[20vw] w-[6vw] h-[12vh] lg:h-[33vh] rounded-2xl object-cover' />
                                                </div>
                                            </div>

                                            <div className='flex lg:flex-row flex-col lg:justify-center items-center gap-2'>
                                                <Skeleton width='100px' height={40} />
                                                {isAdmin && <Skeleton width='100px' height={40} />}
                                            </div>
                                        </div>
                                    </div>

                                    
                                    <div className='w-32 lg:w-[25vw] z-40 flex flex-col bg-white rounded-3xl p-3'>
                                        {/* Skeleton Structure while loading */}
                                        <div className='flex flex-col gap-2'>
                                            <div className='flex lg:flex-row md:flex-row flex-col'>
                                                <div className='relative overflow-hidden rounded-2xl'>
                                                    <Skeleton  width='23vw' className='lg:w-[20vw] w-[6vw] h-[12vh] lg:h-[33vh] rounded-2xl object-cover' />
                                                </div>
                                            </div>

                                            <div className='flex lg:flex-row flex-col lg:justify-center items-center gap-2'>
                                                <Skeleton width='100px' height={40} />
                                                {isAdmin && <Skeleton width='100px' height={40} />}
                                            </div>
                                        </div>
                                    </div>

                                    
                                   
                                    </div>
                                    </>
                                ) : (
                                    <Products />
                                )}
                            </div>

                            {/* <Products /> */}
                        </div>
                    </>
                }


                {/* <div>
    <ProCret />
</div> */}

                <div>
                    {/* <Footer /> */}
                </div>

            </div>
        </>
    )
}

export default Home
