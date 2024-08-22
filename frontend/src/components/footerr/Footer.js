import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../svg/Logo.svg'


const Footer = () => {
    return (
        <>
            {/* Footer */}
            <footer className='Footerr bg-[#4A69E2] rounded-t-[2rem] md:rounded-t-[3rem] lg:rounded-t-[3rem] h-[84vh] w-[90vw] mx-auto'>

                <div className='h-[34vh] '>
                    <div> 

                    </div>

                    <div className='bgLogo relative'>

                        {/* <Link to='/'>
                            <div className='Logo flex items-center justify-center'>
                                <span className='text-[#4A69E2] text-[9vw] lg:text-[49px] font-extrabold'>Chic</span>
                                <img src={logo} alt="" className='w-[24vw] lg:w-[130px]' />
                            </div>
                        </Link> */}
                        <div className='Logo absolute top-[-110px] left-[250px]  flex items-center justify-center opacity-80'>
                                <span className='text-white text-[25vw] font-extrabold'>Chic</span>
                                {/* <img src={logo} alt="" className='w-[24vw] lg:w-[130px]' /> */}
                        </div>
                    </div>
                </div>


                <div className='bg-black relative z-10 h-[50vh] rounded-t-[2rem] md:rounded-t-[3rem] lg:rounded-t-[3rem]'>
                    <div>

                    </div>


                    <div>
                        <img src={logo} alt="" className='w-[24vw] lg:w-[50vw] fill-white absolute top-[-20px] left-[318px] l z-0' />
                    </div>
                </div>

            </footer>

        </>
    )
}

export default Footer
