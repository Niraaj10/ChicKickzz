import React from 'react'
import logo from '../svg/Logo.svg'
import { FaFacebook, FaTwitter } from 'react-icons/fa6'
import { FaInstagram } from 'react-icons/fa'
import { FiYoutube } from 'react-icons/fi'


const Footer = () => {
    return (
        <>
            {/* Footer */}
            <footer className='Footerr mt-24 bg-[#4A69E2] rounded-t-[2rem] md:rounded-t-[3rem] lg:rounded-t-[3rem] h-[54vh] lg:h-[84vh] w-[90vw] mx-auto'>

                <div className='h-[14vh] lg:h-[44vh] '>
                    <div>

                    </div>

                    <div className='bgLogo relative'>

                        {/* <Link to='/'>
                            <div className='Logo flex items-center justify-center'>
                                <span className='text-[#4A69E2] text-[9vw] lg:text-[49px] font-extrabold'>Chic</span>
                                <img src={logo} alt="" className='w-[24vw] lg:w-[130px]' />
                            </div>
                        </Link> */}
                        <div className='Logo absolute top-[74px] left-[42px] lg:left-0 lg:top-[125px]  flex items-center justify-center opacity-90'>
                            <span className='text-white text-[14vw] lg:text-[18vw] font-extrabold '>Chic</span>
                            <img src={logo} alt="" className='w-[40vw] lg:w-[48vw] fill-white lg:mt-[-30px]' />
                        </div>
                    </div>
                </div>


                <div className='bg-black relative z-10 h-fit lg:h-[40vh] rounded-t-[2rem] md:rounded-t-[3rem] lg:rounded-t-[3rem] flex lg:flex-row flex-col lg:gap-32 pt-10 px-12'>

                        <div className='text-white  flex flex-col lg:flex-row lg:basis-[60%]'>
                            <div className='text-[#FFA52F] font-bold text-3xl mb-4'>About us</div>
                            <div>We are biggest hyperstore in the universe.</div>
                            <div>We got you all cover with our exclusive collection and latest drops</div>
                        </div>

                    <div className='text-white grid grid-cols-2 gap-3 lg:gap-0 lg:grid-cols-3 w-full justify-center my-5 lg:my-0'>

                        <ul>
                            <div className='text-[#FFA52F] font-bold text-xl mb-4'>Categories </div>
                            <li>Sneakers</li>
                            <li>Runners</li>
                            <li>Basketball</li>
                            <li>Outdoor</li>
                            <li>Golf</li>
                            <li>Hiking</li>
                        </ul>
                        <ul>
                            <div className='text-[#FFA52F] font-bold text-xl mb-4'>Company</div>
                            <li>About </li>
                            <li>Contact</li>
                            <li>Blogs</li>
                            <li></li>
                        </ul>
                        <ul>
                            <div className='text-[#FFA52F] font-bold text-xl mb-4'>Follow us</div>

                            <div className='flex gap-6'>
                            <li> <FaFacebook/> </li>
                            <li> <FaInstagram/> </li>
                            <li> <FaTwitter/> </li>
                            <li> <FiYoutube/> </li>
                            </div>
                        </ul>
                    </div>


                    {/* <div>
                        <img src={logo} alt="" className='w-[24vw] lg:w-[50vw] fill-white absolute top-[-20px] left-[318px] l z-0' />
                    </div> */}
                </div>

            </footer>

        </>
    )
}

export default Footer
