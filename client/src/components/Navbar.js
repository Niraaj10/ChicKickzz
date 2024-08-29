import React, { useContext } from 'react'
import logo from '../assests/svg/Logo.svg'
import fire from '../assests/img/fire.png'
import { Link } from 'react-router-dom'
import { FaUser } from 'react-icons/fa6'
import { FaSearch } from 'react-icons/fa'
import { GlobalState } from '../GlobalState'
import axios from 'axios'
import { HiOutlineLogout } from 'react-icons/hi'
import { AiOutlineAppstore, AiOutlineAppstoreAdd } from 'react-icons/ai'
// import { Link } from 'react-router-dom'


const Navbar = () => {
    const SERVER_URL = 'https://chickickzz-1.onrender.com';
    const state = useContext(GlobalState)
    // console.log(state)

    const [isLogged, setIsLogged] = state.userAPI.isLogged
    const [isAdmin, setIsAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart;
    // const totalItems = cart.reduce((total, product) => total + product.quantity, 0);

    // console.log(isLogged)


    // const adminRoutes = () => {
    //     return (
    //         <>
    //             <li><Link to='/addProduct'>Add Product</Link></li>
    //             <li><Link to='/category'>Categories</Link></li>
    //         </>
    //     )
    // }

    const loggedRoutes = () => {
        return (
            <>
                {/* <li><Link to='/history'>History</Link></li> */}
                <Link to='/' onClick={logoutUser}>
                    {/* logout */}
                    <HiOutlineLogout size={26} />
                </Link>
            </>
        )
    }


    const logoutUser = async () => {
        await axios.get(`${SERVER_URL}/user/logout`)

        localStorage.clear()
        setIsAdmin(false)
        setIsLogged(false)
    }


    return (
        <>
            <nav className='Navbar fixed top-0 z-50 w-[92vw] flex justify-between items-center my-6 p-6 py-4 bg-white rounded-3xl boxShadow mb-4' >

                <div>
                    {/* <TiThMenu size={25} className='lg:hidden md:hidden' /> */}
                    <Link to='/products'>
                    {
                        isAdmin ? <>
                        {/* <IoMdAddCircle size={25} className='lg:hidden md:hidden' /> */}
                        <AiOutlineAppstoreAdd size={25} className='lg:hidden md:hidden' />
                        </> : <>
                        <AiOutlineAppstore size={25} className='lg:hidden md:hidden' />
                        </>
                    }
                    </Link>

                    {/* {isAdmin && adminRoutes} */}

                    <div className='hidden lg:block md:block'>
                        <Link to='/products' className='flex justify-center items-center font-bold'>
                            New Drops <img src={fire} alt="" className='w-[34px] ml-[-5px] mt-[-4px]' />
                        </Link>
                    </div>
                </div>

                <Link to='/'>
                    <div className='Logo flex items-center justify-center'>
                        <span className='text-[#4A69E2] text-[9vw] lg:text-[49px] font-extrabold'>Chic</span>
                        <img src={logo} alt="" className='w-[24vw] lg:w-[130px]' />
                    </div>
                </Link>

                <div className='flex justify-between gap-2 md:gap-7 lg:gap-7 items-center'>
                    {/* <Link to='/search' className='hidden lg:block md:block'> */}
                    <Link to='/products'className='hidden lg:block md:block'>
                        <div className='flex justify-center items-center'>
                            <FaSearch size={18} />
                        </div>
                    </Link>

                    {
                        isLogged ? loggedRoutes() : (
                            <Link to="/login">
                                <FaUser size={20} className='' />
                            </Link>
                        )
                    }



                    {
                        isAdmin ? '' : (
                            <Link to="/cart">
                                <div className='bg-[#FFA52F] p-0 px-2 rounded-full'>
                                    {/* {cart.length} */}
                                    {cart.reduce((total, product) => total + product.quantity, 0)}
                                </div>
                            </Link>
                        )
                    }


                </div>

            </nav>
        </>
    )
}

export default Navbar
