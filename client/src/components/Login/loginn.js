import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

const Login = () => {
  const SERVER_URL = 'https://chickickzz-1.onrender.com';
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }

  const loginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${SERVER_URL}/user/login`, { ...user })
      // console.log({...user})
      // console.log(user)

      const userId = res.data.userId;
      console.log(res)
      console.log(res.data)
      console.log(userId)

      localStorage.setItem('userId', userId);

      localStorage.setItem('Login User', true)

      // window.location.href = '/'


    } catch (error) {
      alert(error.response.data.msg)
      console.log(error)
    }
  }


  return (
    <>
      <div className='Login mt-[140px]'>
        {/* Loginnnn */}

        <div className='h-[50vh]  mx-auto flex gap-11 my-7 mt-3 rounded-3xl p-4'>

        <div className='basis-[50%] mx-auto py-1 md:px-12 lg:px-12'>
            <div className='text-2xl font-bold mb-5'>Login</div>

            <form onSubmit={loginSubmit} className='flex flex-col gap-5'>
              <input type='email' value={user.email} name='email' placeholder='Email' required onChange={onChangeInput} className='p-3 rounded-xl lg:mx-11' />
              <input type='password' value={user.password} name='password' placeholder='Password' required onChange={onChangeInput} className='p-3 rounded-xl lg:mx-11' />
              
              <button type='submit' className='my-6 p-3 rounded-xl lg:mx-11 bg-black text-white font-bold'>Login</button>
            </form>

            <div className='lg:mx-12 font-semibold flex flex-col'>
              New user??, do you want to create new account??? 
              <Link to='/signup' className='text-[#4A69E2] font-bold'>
                Signup
              </Link>
            </div>

          </div>


          <div className='bg-white hidden md:block lg:block basis-[50%] p-6 px-14 rounded-3xl'>
            <div className='text-3xl font-bold mb-4'>Join CHICKICKS Club Get Rewarded Today.</div>

            <div className='mb-7'>
              <div>As chickicks club member you get rewarded with what you love for doing what you love.
                Sign up today and receive immediate access to these Level 1 benefits:

                <ul className='list-disc pl-6 pt-1'> 
                  <li>Free shipping</li>
                  <li>A 15% off voucher for your next purchase</li>
                  <li>Access to members Only products and sales</li>
                  <li>Special offers, Discounts, promotions and many moree</li>
                </ul>
              </div>
            </div>

            <div className='bg-black text-white p-3 rounded-xl flex justify-between items-center'>
              JOIN THE CLUB
              <MdKeyboardDoubleArrowRight color='white' size={20}/>
            </div>

          </div>
        </div>


        {/* <Footer /> */}

      </div>
    </>
  )
}

export default Login
