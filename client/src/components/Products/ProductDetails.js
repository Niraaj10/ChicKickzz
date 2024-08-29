import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import { RiDeleteBin2Line } from 'react-icons/ri'
import axios from 'axios';
import { useRef } from 'react';


const ProductDetails = () => {
    const SERVER_URL = 'https://chickickzz-3.onrender.com';
    const inputRef = useRef(null);
    const [imgPreviews, setImgPreviews] = useState([]);
    const [proDetails, setProDetails] = useState([]);
    const params = useParams();
    const [loading, setLoading] = useState(false);
    console.log(setLoading)

    const state = useContext(GlobalState)
    const [products] = state.productAPI.products;
    const [isAdmin] = state.userAPI.isAdmin;
    // console.log(state.userAPI)
    const addToCart = state.userAPI.addToCart;


    const updateImgPreviews = (pro) => {
        const imagePrev = pro?.images || [];
        setImgPreviews(imagePrev);
        // console.log(imgPreviews)
    };

    useEffect(() => {
        if (params) {
            products.forEach(pro => {
                if (pro._id === params.id) {
                    setProDetails(pro)
                    // setImgPreviews(proDetails.images)
                    // const imagePreviews = pro?.images || [];
                    // setImgPreviews(imagePreviews);
                    updateImgPreviews(pro)
                }
            })
        }
    }, [params, products])

    // const imagePrev = proDetails?.images || [];
    // setImgPreviews(imagePrev);
    // console.log(imgPreviews)


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
        // setImgPreviews((prevPreviews) =>
        //     prevPreviews.filter((_, index) => index !== ind)
        // );
        if (imgPreviews && imgPreviews.length > 0) {
            setImgPreviews((prevPreviews) =>
                prevPreviews.filter((_, index) => index !== ind)
            );
        }
    };

    // const remProImg = (ind) => {
    //     setProDetails((prevProDetails) => ({
    //         ...prevProDetails,
    //         images: prevProDetails.images.filter((img, index) => index !== ind)
    //     }));
    //     console.log(proDetails.images);

    // };

    const deletePro = async (proId, proTitle) => {
        if (window.confirm(`You want to delete this product : ${proTitle}`)) {

            try {
                await axios.delete(`${SERVER_URL}/api/products/${proId}`)
                console.log('Deleted : ' + proId)
                window.location.reload()
            } catch (error) {
                console.error('Error deleteing product:', error)
            }

        }
    }

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        // console.log(name, value)
        setProDetails({ ...proDetails, [name]: value })
    }


    const submitFrm = async (proId) => {
        // e.preventDefault();
        const imgs = await imgsUrl();
        // console.log(imgs)

        // if (imgs.length > 0) {
        //     setProDetails((prevDetails) => ({
        //         ...prevDetails,
        //         images: [...(prevDetails.images || []), ...imgs]
        //     }));
        // }

        let updatedDetails = { ...proDetails };

    if (imgs.length > 0) {
        updatedDetails = {
            ...updatedDetails,
            images: [...(updatedDetails.images || []), ...imgs]
        };
    }

        // setProDetails({...proDetails, images: imgPreviews})

        console.log(proDetails)


        try {

            // await new Promise((resolve) => {
            //     setProDetails((prevDetails) => {
            //         resolve(prevDetails);
            //     });
            // });

          await axios.put(`${SERVER_URL}/api/products/${proId}`, updatedDetails)  
          console.log('Product Updateed : ',proId)       
    
    
        } catch (error) {
          alert(error.response.data.msg)
          console.log(error)
        }   

    };



    const imgsUrl = async () => {
        // console.log(imgPreviews)
        // setLoading(true); 
        try {
            const formData = new FormData();
            let hasFiles = false;

            imgPreviews.forEach((item) => {
                if (item instanceof File) {
                    formData.append('files', item);
                    hasFiles = true; 
                }
            });

            if (hasFiles) {
                const res = await axios.post(`${SERVER_URL}/api/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
    
                
                console.log('Uploaded Files:', res.data);   
                // setLoading(false)             
                return res.data;
                
                // console.log(res)
            } else {
                alert('No files to upload.'); 
                return [];
            } 


        } catch (error) {
            console.error('Error uploading files:', error);
            return [];
        } 
    };



    // console.log(proDetails.images)

    if (proDetails.length === 0) return null;

    // console.log(proDetails)
    return (
        <>
            <div className='ProductDetails mt-[140px] relative'>
                {/* Product detaillllll */}

                {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                </div>
            )}

                {
                    isAdmin ? <>

                        {/* <div>admin</div> */}

                        <div className='flex flex-col lg:flex-row gap-12 mt-40'>


                            <div className='flex bg-white basis-[30%] rounded-2xl p-4 flex-col gap-5 justify-between items-center'>

                                <div className=' mb-[-40px]'>

                                    <img src={proDetails?.images[0]?.url} alt="" className='lg:w-[15vw] lg:h-[30vh] md:w-[15vw] md:h-[30vh] rounded-2xl object-cover' loading='lazy' />
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




                            <div className='IpdateForm basis-[70%] bg-white rounded-2xl p-7'>

                                <form action="" className='grid lg:grid-cols-2 gap-4 '>

                                    <div className='lg:w-[25vw] flex flex-col gap-3'>
                                        <div className='font-semibold'>PRODUCT NAME / TITLE</div>
                                        <input type="text" placeholder={proDetails.title} name='title' onChange={onChangeInput} className='outline rounded-md p-1' />
                                    </div>

                                    <div className='lg:w-[25vw] flex flex-col gap-3'>
                                        <div className='font-semibold'>DESCRIPTION</div>
                                        <textarea name="description" id="Description"  onChange={onChangeInput} className='outline rounded-md p-1' placeholder={proDetails.description}>

                                        </textarea>

                                    </div>

                                    <div className='lg:w-[25vw] flex flex-col gap-3'>
                                        <div className='font-semibold'>SIZE</div>

                                        {/* <input type="text" placeholder={proDetails.size} name='size' onChange={onChangeInput} className='outline rounded-md p-1' /> */}
                                        <input type="text" placeholder={proDetails.size} onChange={onChangeInput} className='outline rounded-md p-1' />

                                        {/* <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                                        <label for="vehicle1"> I have a bike</label> */}

                                    </div>

                                    <div className='lg:w-[25vw] flex flex-col gap-3'>
                                        <div className='font-semibold'>CATEGORY</div>
                                        <input type="text" placeholder={proDetails.category} name='category' onChange={onChangeInput} className='outline rounded-md p-1' />
                                    </div>

                                    <div className='lg:w-[25vw] flex flex-col gap-3'>
                                        <div className='font-semibold'>PRICE</div>
                                        <input type="text" placeholder={proDetails.price} onChange={onChangeInput} name='price' className='outline rounded-md p-1' />
                                    </div>

                                    <div className='lg:w-[25vw] flex flex-col gap-3'>
                                        <div className='font-semibold'>CONTENT</div>
                                        <input type="text" placeholder={proDetails.content} className='outline rounded-md p-1' name='content' onChange={onChangeInput}/>
                                    </div>


                                    <div className='flex flex-col gap-3 grid-cols-subgrid lg:w-[60vw]'>
                                        {/* <img src={proDetails.images[0].url} alt="" className='w-[15vw] h-[30vh] rounded-2xl object-cover' /> */}

                                        <div className='font-semibold '>
                                            IMAGES
                                        </div>


                                        <div>

                                            {/* <input type="file"/> */}
                                            <div className='flex lg:flex-row flex-col items-center gap-6'>

                                                <div
                                                    onClick={handleClick}
                                                    onDrop={handleDrop}
                                                    onDragOver={(e) => e.preventDefault()}
                                                    className="lg:w-[25vw] h-32 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer focus:outline-none focus:border-blue-500 flex hover:text-[#4A69E] items-center justify-center hover:border-[#4A69E2]"
                                                >
                                                    <input
                                                        ref={inputRef}
                                                        type="file"
                                                        multiple
                                                        onChange={handleChange} 
                                                        className="hidden"
                                                    />
                                                    <p className="text-gray-500 hover:text-[#4A69E2]">Drag & drop images, or click to select</p>
                                                </div>

                                                {imgPreviews.length > 0 && (
                                                    <div className="mt-4 grid lg:grid-cols-4 grid-cols-2 gap-4">
                                                        {imgPreviews.map((img, index) => (
                                                            <div
                                                                key={index}
                                                                className="relative w-24 h-24 border border-gray-300 rounded overflow-hidden"
                                                            >
                                                                {/* {console.log(img)} */}
                                                                {/* {console.log('img URL :', img.url)} */}
                                                                <img
                                                                    src={img instanceof File ? URL.createObjectURL(img) : img?.url}
                                                                    alt={`File Preview ${index + 1}`}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                                <div
                                                                    onClick={() => remImg(index)}
                                                                    className="absolute top-0 right-0 mt-1 mr-1 border border-black text-black rounded-full p-1 px-2 leading-none"
                                                                >
                                                                    &times;
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}


                                                {/* <div>
                                                    <div className='bg-black flex justify-center items-center gap-1 text-white  w-[6vw] p-3 rounded-xl px-3' onClick={imgsUrl}>
                                                        UPDATE
                                                    </div>
                                                </div> */}

                                            </div>

                                        </div>

                                    </div>




                                </form>

                                <div>

                                    <div className='bg-black flex justify-center items-center gap-1 text-white  lg:w-[15vw] p-3 rounded-xl px-8 mt-7' onClick={() => submitFrm(proDetails._id)}>
                                        UPDATE
                                    </div>
                                </div>
                            </div>


                        </div>

                    </> : <>

                        {/* <div>user</div> */}

                        <div className='flex lg:flex-row flex-col gap-5 lg:gap-9 justify-between'>

                            <div className='basis-[70%] lg:grid lg:grid-cols-2 lg:gap-7 rounded-[50px] lg:overflow-hidden flex overflow-scroll'>
                                {
                                    proDetails.images.map(img => (
                                        <img src={img?.url} alt="" className='object-cover lg:w-[250vw] lg:h-[55vh] cursor-zoom-in hover:scale-110' />

                                    ))
                                }
                            </div>

                            <div className='basis-[30%] px-6 lg:px-0 rounded-[40px] bg-white lg:bg-inherit'>
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

                                    {/* <button onClick={() => addToCart(proDetails)}>Add to cart</button> */}
                                </div>
                            </div>
                        </div>
                    </>
                }



                {/* <Footer /> */}
            </div>
        </>
    )
}

export default ProductDetails
