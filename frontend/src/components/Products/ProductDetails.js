import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';

const ProductDetails = () => {
    const [proDetails, setProDetails] = useState([]);
    const params = useParams();

    const state = useContext(GlobalState)
    const [products] = state.productAPI.products

    useEffect(() => {
        if (params) {
            products.forEach(pro => {
                if (pro._id === params.id) {
                    setProDetails(pro)
                }
            })
        }
    }, [params, products])

    if (proDetails.length === 0) return null;

    console.log(proDetails)
    return (
        <>
            <div>
                Product detaillllll
                <div className='flex gap-5 justify-between px-52'>

                    <div>
                        <img src={proDetails.images.url} alt="" />
                    </div>

                    <div>
                        <div>
                            <h6>{proDetails.title}</h6>
                            <p>{proDetails.description}</p>
                            <p>{proDetails.content}</p>
                            <p>Sold:{proDetails.sold}</p>
                        </div>

                        <div>
                            <h5 className='text-red-500'>₹ {proDetails.price}.00</h5>
                            <Link to='/cart'>
                                Add to cart
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetails
