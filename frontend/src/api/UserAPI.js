import axios from 'axios';
import React, { useEffect, useState } from 'react'

const UserAPI = (token) => {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/info',{
                        headers: {Authorization: token}
                    })

                    // console.log(res)

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                } catch (error) {
                    alert(error.response.data.msg)
                }
            }
            getUser()
        }
    }, [token]);


    const addToCart = (product) => {
        if(!isLogged) return alert("Please log in first");

        // console.log(cart)
        // const check = cart.every(pro => pro._id !== product._id);
        const check = cart.every(pro => pro._id !== product._id);

        if (check) {
            // setCart([...cart, {...product, quantity: 1}]);
            setCart([...cart, { ...product, quantity: 1 }]);
        } else {
            alert("This product has already been added to the cart.");
        }
    };




  return {
    isLogged: [isLogged, setIsAdmin],
    isAdmin: [isAdmin, setIsAdmin],
    cart : [cart, setCart],
    addToCart: addToCart,
  }
}

export default UserAPI
