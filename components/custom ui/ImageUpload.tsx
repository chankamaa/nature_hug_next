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

            {/* ✅ Fix: Ensure Image has a valid URL */}
            {url ? (
                <Image
                    src={url} 
                    alt={`Uploaded Image ${index}`}
                    className='object-cover rounded-lg'
                    width={200}  
                    height={200} 
                />
            ) : (
                <p className="text-gray-500">Image not found</p>
            )}
        </div>
    ))
) : (
    <p className="text-gray-500">No images uploaded yet</p>
)}

            </div>

            <CldUploadWidget
                uploadPreset="nattest"
                onSuccess={onUpload}
                options={{ multiple: true, maxFiles: 10 }}
            >
                {({ open }) => (
                    <Button type='button' onClick={() => open()} className='bg-blue-500 text-white flex items-center'>
                        <Plus className='h-5 w-5 mr-2' />
                        Upload Image
                    </Button>
                )}
            </CldUploadWidget>
        </div>
    );
};

export default ImageUpload;
