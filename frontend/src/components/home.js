import React from 'react'
import Navbar from './Navbar'
import nikeShoe from '../assests/img/nikeShoeHome.jpg'

const home = () => {
    return (
        <>
            {/* <Navbar /> */}

            <div className='Home mt-[140px]'>
                {/* Home */}
                <div className='text-[27px] my-4 md:mt-44 md:text-[50px] lg:text-[101px] flex justify-center items-center font-bold'>
                    {/* Step into luxury */}
                    GET HOOKED ON <span className='text-[#4A69E2] ml-2 md:ml-4 lg:ml-4'> KICKSSSS</span>
                </div>

                <div className='relative'>

                    <div className='absolute bottom-1 md:bottom-0 lg:bottom-0 left-5 md:left-16 lg:left-16 text-white w-[50vw] md:w-[32vw] lg:w-[32vw]'>
                        <div className='text-white text-[6vw] md:text-[4vw] lg:text-[4vw] font-bold'>NIKE AIR FORCE</div>
                        <p className='mt-[-10px] text-[13px] md:text-[16px] lg:text-[16px]'>The outdoors is for everyone—and this shoe is too. The classic AF-1 gets an adventurous refresh with utility lacing, durable materials and sturdy stitching. </p>
                    </div>

                    <img src={nikeShoe} alt="" className='border h-[65vh]  md:h-[70vh] w-[90vw] lg:h-[70vh] object-cover mx-auto rounded-[2rem] md:rounded-[3rem] lg:rounded-[3rem]' />
                </div>

            </div>
        </>
    )
}

export default home
