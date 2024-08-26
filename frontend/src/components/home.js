import React, { useContext } from 'react'
import { GlobalState } from '../GlobalState'
import Navbar from './Navbar'
import nikeShoe from '../assests/img/nikeShoeHome.jpg'
import { Link } from 'react-router-dom'
import Footer from './footerr/Footer'
import Products from './Products/products'
import fire from '../assests/img/fire.png'
import ProCret from './Products/ProCret'

const Home = () => {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin


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

                        <div>
                            <div className='text-[6vw] md:text-[4vw] lg:text-[4vw] font-bold mt-11 flex justify-center items-center mb-[-100px]'>
                                DON'T MISS OUT NEW DROPS <img src={fire} alt="" className='w-[10vw] ml-[-25px] rotate-12' />
                            </div>
                            <Products />
                        </div>
                    </>
                }


<div>
    <ProCret />
</div>

                <div>
                    <Footer />
                </div>

            </div>
        </>
    )
}

export default Home
