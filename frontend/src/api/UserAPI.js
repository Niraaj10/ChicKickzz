import axios from 'axios';
import React, { useEffect, useState } from 'react'

const UserAPI = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/info',{
                        headers: {Authorization: token}
                    })
                } catch (error) {
                    alert(error.response.data.msg)
                }
            }
            getUser()
        }
    }, [token]);


  return {
    isLogged: [isLogged, setIsAdmin],
    isAdmin: [isAdmin, setIsAdmin]
  }
}

export default UserAPI
