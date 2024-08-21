import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Signup = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const onChangeInput = (e) => {
    const {name,value} = e.target;
    setUser({...user,[name]:value})
  }

  const signupSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('/user/signup',{...user})
      // console.log({...user})
      // console.log(user)

      localStorage.setItem('Signup User', true)

      window.location.href = '/'


    } catch (error) {
        alert(error.response.data.msg)
        console.log(error)
    }
  }


  return (
    <>
      <div>
      Signupppp

        <form onSubmit={signupSubmit} className='flex flex-col gap-2'>
          <input type='text' value={user.name} name='name' placeholder='Name' required onChange={onChangeInput}/>

          <input type='email' value={user.email} name='email' placeholder='Email' required onChange={onChangeInput}/>
          
          <input type='password' value={user.password} name='password' placeholder='Password' required onChange={onChangeInput} />

          <button type='submit'>Create new User</button>
        </form>

        <div>
          already have an Account?? 
          <Link to='/login'>
           Loginnnn
          </Link>
        </div>

      </div>
    </>
  )
}

export default Signup
