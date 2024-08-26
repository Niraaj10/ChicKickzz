import React, { useRef } from 'react'
import Footer from '../footerr/Footer'

const CreatePro = () => {
    const inputRef = useRef(null);

    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        console.log(files[0]); // Handle the dropped file as needed
    };

    const handleClick = () => {
        inputRef.current.click();
    };

    return (
        <>
            <div className='CreatePro mt-[150px]'>
                <div className='IpdateForm  w-full bg-white rounded-2xl p-7'>

                    <form action="" className='grid grid-cols-2 gap-4 '>

                        <div className='w-[25vw] flex flex-col gap-3'>
                            <div className='font-semibold'>PRODUCT NAME / TITLE</div>
                            <input type="text" placeholder='Product Name' className='outline rounded-md p-1' />
                        </div>

                        <div className='w-[25vw] flex flex-col gap-3'>
                            <div className='font-semibold'>DESCRIPTION</div>
                            <textarea name="ProDescription" id="Description" className='outline rounded-md p-1' placeholder='Description'>

                            </textarea>

                        </div>

                        <div className='w-[25vw] flex flex-col gap-3'>
                            <div className='font-semibold'>SIZE</div>

                            <input type="text" placeholder='Size' className='outline rounded-md p-1' />

                            {/* <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
        <label for="vehicle1"> I have a bike</label> */}

                        </div>

                        <div className='w-[25vw] flex flex-col gap-3'>
                            <div className='font-semibold'>CATEGORY</div>
                            <input type="text" placeholder='Category' className='outline rounded-md p-1' />
                        </div>

                        <div className='w-[25vw] flex flex-col gap-3'>
                            <div className='font-semibold'>PRICE</div>
                            <input type="text" placeholder='Price' className='outline rounded-md p-1' />
                        </div>

                        <div className='w-[25vw] flex flex-col gap-3'>
                            <div className='font-semibold'>CONTENT</div>
                            <input type="text" placeholder='Content' className='outline rounded-md p-1' />
                        </div>


                        <div className='flex flex-col gap-3 grid-cols-subgrid w-[30vw]'>

                            <div>
                                <div className='font-semibold'>Images</div>
                                {/* <img src='' alt="" className='w-[15vw] h-[30vh] rounded-2xl object-cover' /> */}

                            </div>

                            <div>
                                {/* <input type="file" /> */}
                                {/* <input type="file" name="files[]" id="file" multiple className='' /> */}
                                <div
                                    onClick={handleClick}
                                    onDrop={handleDrop}
                                    onDragOver={(e) => e.preventDefault()}
                                    className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer focus:outline-none focus:border-blue-500 flex hover:text-[#4A69E] items-center justify-center hover:border-[#4A69E2]"
                                >
                                    <input
                                        ref={inputRef}
                                        type="file"
                                        onChange={(e) => console.log(e.target.files[0])} // Handle the selected file
                                        className="hidden"
                                    />
                                    <p className="text-gray-500 hover:text-[#4A69E2]">Drag & drop a Images, or click to select one</p>
                                </div>
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
