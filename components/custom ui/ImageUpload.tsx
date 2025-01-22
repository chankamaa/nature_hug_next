import { CldUploadWidget } from 'next-cloudinary';
import { Plus } from 'lucide-react';

import { Button } from '../ui/button';
import Image from 'next/image';


interface ImageUploadProps {
    value: string[];
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, onRemove, value }) => {

    const onUpload = (result: any) => {
        console.log('Cloudinary Upload Result:', result);
        
        onChange(result.info.secure_url);
    }
    return (
        <div>
            <div className='mb-10 flex flex-wrap items-center gap-4'>
                {value.map((url) => (
                    <Image src={url} alt='collection' className='object-cover rounded-lg' width={600} height={600} />
                ))}
            </div>
            <CldUploadWidget uploadPreset="naturehug1125" onUpload={onUpload}>
                {({ open }) => {
                    console.log('Widget open function:', open);
                    return (
                        <Button onClick={() => open()} className='bg-grey-1 text-white'>
                            <Plus className='h-4 w-4 mr-2' />
                            Upload Image
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    )
}

export default ImageUpload
