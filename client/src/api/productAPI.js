import { useEffect, useState } from 'react'
import axios from 'axios'

const ProductAPI = () => {
  
  const SERVER_URL = 'https://chickickzz-3.onrender.com';
    const [products,setProducts]=useState([])

    const getProducts = async()=> {
        // const res = await axios.get('/api/products')
        const res = await axios.get(`${SERVER_URL}/api/products?sort=createdAt`)
        // console.log(res.data)
        // setProducts(res.data.products)
        setProducts(res.data)
    }

    useEffect(()=> {
        getProducts()
    },[])

  return {
    products : [products,setProducts]
  }
}

export default ProductAPI
