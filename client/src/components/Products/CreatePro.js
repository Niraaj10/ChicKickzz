import React, { useRef } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

const CreatePro = () => {
    // const SERVER_URL = 'https://chickickzz-1.onrender.com';
    const SERVER_URL = 'http://localhost:5000';
    const inputRef = useRef(null);
    const [imgPreviews, setImgPreviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({
        title: '',
        price: '',
        description: '',
        content: '',
        images: [],
        size: [],
        category: ''
    });

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        // console.log(name, value)
        setProduct({ ...product, [name]: value })
    }

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


    const imgsUrl = async () => {
        // console.log(imgPreviews)
        try {
            const formData = new FormData();

            imgPreviews.forEach((file) => {
                formData.append('files', file);
            });

            const res = await axios.post(`${SERVER_URL}/api/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // console.log(res)
            // console.log('Uploaded Files:', res.data); 
            return res.data;


        } catch (error) {
            console.error('Error uploading files:', error);
            alert(error.response.data.msg);
            return [];
        }
    };

    const submitFrm = async () => {
        // e.preventDefault();
        setLoading(true);
        const imgs = await imgsUrl();
        // console.log(imgs)


        let updatedDetails = { ...product };
        if (imgs.length > 0) {
            updatedDetails = {
                ...updatedDetails,
                images: [...(updatedDetails.images || []), ...imgs]
            };
        }


        try {
            // await axios.post('/api/products', { ...product })
            await axios.post(`${SERVER_URL}/api/products`, updatedDetails )
            setLoading(false);

        } catch (error) {
            setLoading(false);
            alert(error.response.data.msg)
            console.log(error)
        }

    };


    return (
        <>
            <div className='CreatePro mt-[150px] relative'>
                {loading && (

                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className='bg-[#4A69E2] p-4 px-24 rounded-2xl'>
                        <CircularProgress  sx={{color: 'white'}} />
                        </div>

                    </div>

                )}
                <div className='IpdateForm  w-full bg-white rounded-2xl p-7'>

                    <form action="" className='grid grid-cols-2 gap-4 '>

                        <div className='w-[25vw] flex flex-col gap-3'>
                            <div className='font-semibold'>PRODUCT NAME / TITLE</div>
                            <input type="text" name='title' placeholder='Product Name' className='outline rounded-md p-1' onChange={onChangeInput} />
                        </div>

                        <div className='w-[25vw] flex flex-col gap-3'>
                            <div className='font-semibold'>DESCRIPTION</div>
                            <textarea name="description" id="Description" className='outline rounded-md p-1' placeholder='Description' onChange={onChangeInput}>

                            </textarea>

                        </div>

                        <div className='w-[25vw] flex flex-col gap-3'>
                            <div className='font-semibold'>SIZE</div>

                            <input type="text" placeholder='Size' name='size' className='outline rounded-md p-1' onChange={onChangeInput} />

                            {/* <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
        <label for="vehicle1"> I have a bike</label> */}

                        </div>

                        <div className='w-[25vw] flex flex-col gap-3'>
                            <div className='font-semibold'>CATEGORY</div>
                            <input type="text" placeholder='Category' name='category' className='outline rounded-md p-1' onChange={onChangeInput} />
                        </div>

                        <div className='w-[25vw] flex flex-col gap-3'>
                            <div className='font-semibold'>PRICE</div>
                            <input type="text" placeholder='Price' name='price' className='outline rounded-md p-1' onChange={onChangeInput} />
                        </div>

                        <div className='w-[25vw] flex flex-col gap-3'>
                            <div className='font-semibold'>CONTENT</div>
                            <input type="text" placeholder='Content' name='content' className='outline rounded-md p-1' />
                        </div>



                        <div className='flex flex-col gap-3 grid-cols-subgrid w-[70vw]'>
                            <div className='font-semibold'>Images</div>
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

                                {imgPreviews.length > 0 && (
                                    <div className="mt-4 grid grid-cols-4 gap-4">
                                        {imgPreviews.map((file, index) => (
                                            <div
                                                key={index}
                                                className="relative w-24 h-24 border border-gray-300 rounded overflow-hidden"
                                            >
                                                <img
                                                    src={URL.createObjectURL(file)}
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




                    </form>

                    <div className='mt-7'>

                        <div className='bg-black flex justify-center items-center gap-1 text-white  w-[15vw] p-3 rounded-xl px-8 cursor-pointer' onClick={() => submitFrm()}>
                            UPDATE
                        </div>
                    </div>
                </div>


                {/* <Footer /> */}
            </div>
        </>
    )
}

export default CreatePro



