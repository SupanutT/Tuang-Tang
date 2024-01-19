
'use client'
import { useState } from 'react';


export default function UploadImg(){

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>){
        const file = event.target.files && event.target.files[0];
        if(file) {
            setSelectedFile(file);
        }
    }

    async function handleFileUpload() {
        if(selectedFile){
            // Handle successful selectedFile from user
            const formData = new FormData();
            formData.append('image', selectedFile);

            try {
                const response = await fetch('http://44.196.234.22/api/bills', {
                    method: 'POST',
                    body: formData,
                });

                if(response.ok){
                    // Handle successful response from the backend
                    const data = await response.json();
                    console.log(response);
                }else{
                    // Handle error response from the backend
                    console.error('Error:', response.status, response.statusText);
                }
            } catch (error) {
                // Handle network errors
                console.log('Network error:', error);
            }
        }else{
            // User not upload file or selectedFile is not keep file change
            console.error('No file selected');
        }
    };

    return (
        <main className="mt-[100px] w-[100%] flex items-center justify-center flex-col">
            <div className="w-1/2 ">
                <form action="http://44.196.234.22/api/bills" method="POST" encType="multipart/form-data" className='flex flex-col justify-center items-center'>

                    <label htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-500 border-dashed rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300  ">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-20 h-20 mb-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">
                                    Click to upload
                                </span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                                SVG, PNG, JPG or GIF
                            </p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" name="image" onChange={handleFileChange}/>
                    </label>


                    <div className="w-1/5 mt-[30px] flex justify-center h-[50px] px-[15px] cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-full ">
                        <button className="text-base text-gray-600" type='button' onClick={handleFileUpload}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
