import React, { useEffect } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { Plus, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import Image from 'next/image';

interface ImageUploadProps {
    value: string[];
    onChange: (value: string[]) => void;
    onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value = [], onChange, onRemove }) => {
    useEffect(() => {
        console.log("📸 ImageUpload Value Updated:", value);
    }, [value]);

    const onUpload = (result: any) => {
        if (result.event === "success") {
            const uploadedImages = result.info.files
                ? result.info.files.map((file: any) => file.uploadInfo.secure_url) // ✅ Handles multiple images
                : [result.info.secure_url]; // ✅ Handles single image

            onChange([...value, ...uploadedImages]); // ✅ Append new images
        }
    };


    return (
        <div>
            <div className='mb-10 flex flex-wrap items-center gap-4'>
            {value && value.length > 0 ? (
    value.map((url, index) => (
        <div key={index} className='relative w-[200px] h-[200px]'>
            <div className='absolute top-0 ring-0 z-10'>
                <Button onClick={() => onRemove(url)} size="sm" className='bg-red-500 text-white'>
                    <Trash className='h-4 w-4'/>
                </Button>
            </div>


                {value.map((url) => (
                    <div key={url} className='relative w-[200px] h-[200px]'>
                        <div className='absolute top-0 ring-0 z-10'> 
                            <Button onClick={()=> onRemove(url)} size="sm" className='bg-red-1 text-white'>
                                <Trash className='h-4 w-4'/>
                            </Button>
                        </div>
                        <Image src={url} alt="collection" className="object-cover rounded-lg" fill sizes="(max-width: 768px) 100vw, 200px" />

                    </div>
                ))}


            </div>
            <CldUploadWidget uploadPreset="nattest" options={{ multiple: true}} onSuccess={onUpload}>
                {({ open }) => {
                    return (
                        <Button onClick={() => open()} className='bg-grey-1 text-white'>
                            <Plus className=' h-4 w-4 mr-2' />
                            Upload Image
                        </Button>
                    );
                }}

            </CldUploadWidget>
        </div>
    );
};

export default ImageUpload;
