import axios from 'axios';
import React, { useState } from 'react';

const FileUploadComponent = () => {
    const SERVER_URL = 'https://chickickzz-1.onrender.com';
    const [imgPreviews, setImgPreviews] = useState([]); // Assuming imgPreviews is an array of File objects

    const handleFileChange = (e) => {
        setImgPreviews([...e.target.files]); // Update state with selected files
    };

    const imgsUrl = async () => {
        console.log(imgPreviews)
        try {
            const formData = new FormData();

            imgPreviews.forEach((file) => {
                formData.append('files', file); // 'files' should match the key expected by the backend
            });

            const res = await axios.post(`${SERVER_URL}/api/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(res)
            console.log('Uploaded Files:', res.data); // Logs the response from the backend
            return res.data; // Returns an array of objects with public_id and url

        } catch (error) {
            console.error('Error uploading files:', error);
            return [];
        }
    };

    const submitFrm = () => {
        imgsUrl();
    };

    // const remImg = (indexToRemove) => {
    //     setImgPreviews((prevPreviews) =>
    //       prevPreviews.filter((_, index) => index !== indexToRemove)
    //     );
    // };

    return (
        <div>
            <input type="file" multiple onChange={handleFileChange} />
            <button onClick={submitFrm}>Upload</button>


        </div>
    );
};

export default FileUploadComponent;
