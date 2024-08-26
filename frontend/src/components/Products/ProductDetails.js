import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import { RiDeleteBin2Line } from 'react-icons/ri'
import Footer from '../footerr/Footer';
import axios from 'axios';
import { useRef } from 'react';

const ProductDetails = () => {
    const inputRef = useRef(null);
    const [imgPreviews, setImgPreviews] = useState([]);
    const [proDetails, setProDetails] = useState([]);
    const params = useParams();

    const state = useContext(GlobalState)
    const [products] = state.productAPI.products;
    const [isAdmin] = state.userAPI.isAdmin;
    // console.log(state.userAPI)
    const addToCart = state.userAPI.addToCart;


    useEffect(() => {
        if (params) {
            products.forEach(pro => {
                if (pro._id === params.id) {
                    setProDetails(pro)
                    // setImgPreviews(proDetails.images)
                    const imagePreviews = pro?.images || [];
                    setImgPreviews(imagePreviews);
                }
            })
        }
    }, [params, products])


    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        setImgPreviews((prevPreviews) => [...prevPreviews, ...files]);
    };

    const handleChange = (e) => {
        const files = Array.from(e.target.files);
        setImgPreviews((prevPreviews) => [...prevPreviews, ...files]);
    };

    const handleClick = () => {
        inputRef.current.click();
    };

    const remImg = (ind) => {
        setImgPreviews((prevPreviews) =>
            prevPreviews.filter((_, index) => index !== ind)
        );
    };

    const remProImg = (ind) => {
        setProDetails((prevProDetails) => ({
            ...prevProDetails,
            images: prevProDetails.images.filter((img, index) => index !== ind)
        }));
        console.log(proDetails.images);
        
    };

    const deletePro = async (proId, proTitle) => {
        if (window.confirm(`You want to delete this product : ${proTitle}`)) {

            try {
                await axios.delete(`/api/products/${proId}`)
                console.log('Deleted : ' + proId)
                window.location.reload()
            } catch (error) {
                console.error('Error deleteing product:', error)
            }

        }
    }


    
    const imgsUrl = async () => {
        // console.log(imgPreviews)
        try {
            const formData = new FormData();

            imgPreviews.forEach((file) => {
                formData.append('files', file); 
            });

            const res = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // console.log(res)
            // console.log('Uploaded Files:', res.data); 
            return res.data; 


        } catch (error) {
            console.error('Error uploading files:', error);
            return [];
        }
    };


    const submitFrm = async () => {
        const imgs = await imgsUrl();
        // console.log(imgs)  




    };

    // console.log(proDetails.images)

    if (proDetails.length === 0) return null;

    // console.log(proDetails)
    return (
        <>
            <div className='ProductDetails mt-[140px]'>
                {/* Product detaillllll */}


                {
                    isAdmin ? <>

                        {/* <div>admin</div> */}

                        <div className='flex gap-12 mt-40'>


                            <div className='flex bg-white basis-[30%] rounded-2xl p-4 flex-col gap-5 justify-between items-center'>

                                <div className=' mb-[-40px]'>
                                    {/* {
                                    proDetails.images.map(img => (
                                        <img src={img.url} alt="" className='object-cover lg:w-[250vw] lg:h-[55vh] ' />

                                    ))
                                } */}
                                    <img src={proDetails?.images[0].url} alt="" className='w-[15vw] h-[30vh] rounded-2xl object-cover' loading='lazy' />
                                </div>

                                <div className=''>
                                    <div className='mt-10'>
                                        <h6 className='text-4xl font-bold'>{proDetails.title.toUpperCase()}</h6>

                                        <p className='mt-9'>{proDetails.description}</p>
                                        {/* <p>{proDetails.content}</p> */}
                                        {/* <p>Sold:{proDetails.sold}</p> */}
                                    </div>



                                    <div className='my-4'>
                                        <div className='font-semibold pl-2 py-2'>SIZE</div>
                                        <div className='flex gap-3'>
                                            {
                                                proDetails.size.map(size => (
                                                    <li className='list-none bg-gray-100 p-3 px-5 rounded-xl'>{size}</li>
                                                ))
                                            }
                                        </div>


                                        <div className='my-3 flex justify-between items-center'>
                                            <div className='flex flex-col'>

                                                <div className='font-semibold pl-2 py-2 '>PRICE</div>
                                                <div className='text-[#4A69E2] text-2xl font-bold'>
                                                    ₹ {proDetails.price}.00
                                                </div>
                                            </div>
                                            <div className='flex flex-col justify-end items-end'>

                                                <div className='font-semibold pl-2 py-2 '>SOLD</div>
                                                <div className='text-[#4A69E2] items-end text-2xl font-bold'>
                                                    {proDetails.sold}
                                                </div>
                                            </div>
                                        </div>

                                        <div>

                                            <div onClick={() => deletePro(proDetails._id, proDetails.title.toUpperCase())} className='bg-black flex justify-center items-center gap-1 text-white p-3 rounded-xl px-8'>
                                                DELETE <RiDeleteBin2Line className='mt-[-2px]' size={20} />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='IpdateForm basis-[70%] bg-white rounded-2xl border border-black p-7'>

                                <form action="" className='grid grid-cols-2 gap-4 '>

                                    <div className='w-[25vw] flex flex-col gap-3'>
                                        <div className='font-semibold'>PRODUCT NAME / TITLE</div>
                                        <input type="text" placeholder={proDetails.title} className='outline rounded-md p-1' />
                                    </div>

                                    <div className='w-[25vw] flex flex-col gap-3'>
                                        <div className='font-semibold'>DESCRIPTION</div>
                                        <textarea name="ProDescription" id="" className='outline rounded-md p-1' placeholder={proDetails.description}>

                                        </textarea>

                                    </div>

                                    <div className='w-[25vw] flex flex-col gap-3'>
                                        <div className='font-semibold'>SIZE</div>

                                        <input type="text" placeholder={proDetails.size} className='outline rounded-md p-1' />

                                        {/* <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                                        <label for="vehicle1"> I have a bike</label> */}

                                    </div>

                                    <div className='w-[25vw] flex flex-col gap-3'>
                                        <div className='font-semibold'>CATEGORY</div>
                                        <input type="text" placeholder={proDetails.category} className='outline rounded-md p-1' />
                                    </div>

                                    <div className='w-[25vw] flex flex-col gap-3'>
                                        <div className='font-semibold'>PRICE</div>
                                        <input type="text" placeholder={proDetails.price} className='outline rounded-md p-1' />
                                    </div>

                                    <div className='w-[25vw] flex flex-col gap-3'>
                                        <div className='font-semibold'>CONTENT</div>
                                        <input type="text" placeholder={proDetails.content} className='outline rounded-md p-1' />
                                    </div>


                                    <div className='flex flex-col gap-3 grid-cols-subgrid w-[60vw]'>
                                        {/* <img src={proDetails.images[0].url} alt="" className='w-[15vw] h-[30vh] rounded-2xl object-cover' /> */}

                                        <div className='font-semibold '>
                                            IMAGES
                                        </div>

                                        <div>
                                        {proDetails.images.length > 0 && (
                                                    <div className="mt-4 grid grid-cols-4 gap-4">
                                                        {proDetails.images.map((img, index) => (
                                                            <div
                                                                key={index}
                                                                className="relative w-24 h-24 border border-gray-300 rounded overflow-hidden"
                                                            >
                                                                <img
                                                                    src={img.url}
                                                                    alt={`File Preview ${index + 1}`}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                                <button
                                                                    onClick={() => remProImg(index)}
                                                                    className="absolute top-0 right-0 mt-1 mr-1 border border-black text-black rounded-full p-1 px-2 leading-none"
                                                                >
                                                                    &times;
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                        </div>

                                        <div>

                                            {/* <input type="file"/> */}
                                            <div className='flex gap-6'>

                                                <div
                                                    onClick={handleClick}
                                                    onDrop={handleDrop}
                                                    onDragOver={(e) => e.preventDefault()}
                                                    className="w-[25vw] h-32 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer focus:outline-none focus:border-blue-500 flex hover:text-[#4A69E] items-center justify-center hover:border-[#4A69E2]"
                                                >
                                                    <input
                                                        ref={inputRef}
                                                        type="file"
                                                        multiple
                                                        onChange={handleChange} // Handle the selected file
                                                        className="hidden"
                                                    />
                                                    <p className="text-gray-500 hover:text-[#4A69E2]">Drag & drop images, or click to select</p>
                                                </div>

                                                {proDetails.images.length > 0 && (
                                                    <div className="mt-4 grid grid-cols-4 gap-4">
                                                        {proDetails.images.map((img, index) => (
                                                            <div
                                                                key={index}
                                                                className="relative w-24 h-24 border border-gray-300 rounded overflow-hidden"
                                                            >
                                                                <img
                                                                    src={img.url}
                                                                    alt={`File Preview ${index + 1}`}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                                <button
                                                                    onClick={() => remImg(index)}
                                                                    className="absolute top-0 right-0 mt-1 mr-1 border border-black text-black rounded-full p-1 px-2 leading-none"
                                                                >
                                                                    &times;
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                        </div>

                                    </div>




                                </form>

                                <div>

                                    <div className='bg-black flex justify-center items-center gap-1 text-white  w-[15vw] p-3 rounded-xl px-8 mt-7'>
                                        UPDATE
                                    </div>
                                </div>
                            </div>


                        </div>

                    </> : <>

                        {/* <div>user</div> */}

                        <div className='flex gap-9 justify-between'>

                            <div className='basis-[70%] grid grid-cols-2 gap-7 rounded-[50px] overflow-hidden'>
                                {
                                    proDetails.images.map(img => (
                                        <img src={img.url} alt="" className='object-cover lg:w-[250vw] lg:h-[55vh] cursor-zoom-in hover:scale-110' />

                                    ))
                                }
                            </div>

                            <div className='basis-[30%]'>
                                <div className='mt-10'>
                                    <h6 className='text-4xl font-bold'>{proDetails.title.toUpperCase()}</h6>

                                    <p className='mt-9'>{proDetails.description}</p>
                                    {/* <p>{proDetails.content}</p> */}
                                    {/* <p>Sold:{proDetails.sold}</p> */}
                                </div>



                                <div className='my-4'>
                                    <div className='font-semibold pl-2 py-2'>SIZE</div>
                                    <div className='flex gap-5'>
                                        {
                                            proDetails.size.map(size => (
                                                <li className='list-none bg-white p-3 px-5 rounded-xl'>{size}</li>
                                            ))
                                        }
                                    </div>


                                    <div className='my-3'>
                                        <div className='font-semibold pl-2 py-2'>PRICE</div>
                                        <div className='text-[#4A69E2] text-2xl font-bold'>
                                            ₹ {proDetails.price}.00
                                        </div>
                                    </div>

                                    <div className='p-3 rounded-2xl bg-black text-white flex justify-center font-bold'>
                                        <Link to='/cart' onClick={() => addToCart(proDetails)} >
                                            ADD TO CART
                                        </Link>
                                    </div>

                                    <button onClick={() => addToCart(proDetails)}>Add to cart</button>
                                </div>
                            </div>
                        </div>
                    </>
                }



                <Footer />
            </div>
        </>
    )
}

export default ProductDetails
