import React, { useRef } from 'react'
import Footer from '../footerr/Footer'
import { useState } from 'react';

const CreatePro = () => {
    const inputRef = useRef(null);
    const [imgPreviews, setImgPreviews] = useState([]);
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
        console.log(name, value)
        setProduct({ ...product, [name]: value })
    }

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        const fileURLs = files.map((file) => URL.createObjectURL(file));
        setImgPreviews((prevPreviews) => [...prevPreviews, ...fileURLs]);
    };

    const handleChange = (e) => {
        const files = Array.from(e.target.files);
        const fileURLs = files.map((file) => URL.createObjectURL(file));
        setImgPreviews((prevPreviews) => [...prevPreviews, ...fileURLs]);
    };

    const handleClick = () => {
        inputRef.current.click();
    };

    const remImg = (indexToRemove) => {
        setImgPreviews((prevPreviews) =>
          prevPreviews.filter((_, index) => index !== indexToRemove)
        );
      };


    return (
        <>
            <div className='CreatePro mt-[150px]'>
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

                            <div>
                                <div className='font-semibold'>Images</div>
                                {/* <img src='' alt="" className='w-[15vw] h-[30vh] rounded-2xl object-cover' /> */}

                            </div>

                            <div className='flex gap-5 justify-start items-center '>
                                {/* <input type="file" /> */} 
                                {/* <input type="file" name="files[]" id="file" multiple className='' /> */}
                                <div
                                    onClick={handleClick}
                                    onDrop={handleDrop}
                                    onDragOver={(e) => e.preventDefault()}
                                    className="w-[25vw] h-32 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer focus:outline-none focus:border-blue-500 flex hover:text-[#4A69E] items-center justify-center hover:border-[#4A69E2]"
                                >
                                    <input
                                        ref={inputRef}
                                        type="file"
                                        onChange={handleChange} // Handle the selected file
                                        className="hidden"
                                    />
                                    <p className="text-gray-500 hover:text-[#4A69E2]">Drag & drop a Images, or click to select one</p>
                                </div>


                                {imgPreviews.length > 0 && (
                                    <div className="mt-4 grid grid-cols-4 gap-4">
                                    {imgPreviews.map((preview, index) => (
                                      <div
                                        key={index}
                                        className="relative w-24 h-24 border border-gray-300 rounded overflow-hidden"
                                      >
                                        <img
                                          src={preview}
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

                        <div className='bg-black flex justify-center items-center gap-1 text-white  w-[15vw] p-3 rounded-xl px-8'>
                            UPDATE
                        </div>
                    </div>
                </div>


                <Footer />
            </div>
        </>
    )
}

export default CreatePro
