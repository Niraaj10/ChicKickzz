import React from 'react'
import Navbar from './Navbar'
import nikeShoe from '../assests/img/nikeShoeHome.jpg'

const home = () => {
    return (
        <>
            {/* <Navbar /> */}

            <div className='Home relative mt-[140px]'>
                {/* Home */}
                <div className='text-[120px] mt-[-10px] flex justify-center items-center font-bold'>
                {/* Step into luxury */}
                GET HOOKED ON <span className='text-[#4A69E2]'>KICKS</span>
                </div>

                <img src={nikeShoe} alt="" className='border w-[90vw] h-[70vh] object-cover mx-auto rounded-[3rem]'/>
                
            </div>
        </>
    )
}

export default home
