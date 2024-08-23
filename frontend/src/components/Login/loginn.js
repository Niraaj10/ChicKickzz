import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const onChangeInput = (e) => {
    const {name,value} = e.target;
    setUser({...user,[name]:value})
  }

  const loginSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('/user/login',{...user})
      // console.log({...user})
      console.log(user)

      localStorage.setItem('Login User', true)

      window.location.href = '/'


    } catch (error) {
        alert(error.response.data.msg)
        console.log(error)
    }
  }


  return (
    <>
      <div className='Login mt-[140px]'>
      Loginnnn

        <form onSubmit={loginSubmit} className='flex flex-col gap-2'>
          <input type='email' value={user.email} name='email' placeholder='Email' required onChange={onChangeInput}/>
          <input type='password' value={user.password} name='password' placeholder='Password' required onChange={onChangeInput} />
          <button type='submit'>Login</button>
        </form>

        <div>
          New user 
          <Link to='/signup'>
          Signup
          </Link>
        </div>

      </div>
    </>
  )
}

export default Login
