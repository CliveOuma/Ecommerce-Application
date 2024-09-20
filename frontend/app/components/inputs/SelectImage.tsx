import { ImageType } from "@/app/admin/add-products/AddProduct";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface SelectImageProps {
    item?: ImageType;
    handleFileChange: (value: File) => void;
}

const SelectImage: React.FC<SelectImageProps> = ({ item, handleFileChange }) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            handleFileChange(acceptedFiles[0]);
        }
    }, [handleFileChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div
            {...getRootProps()}
            className="border-2 p-2 cursor-pointer border-slate-400 border-dashed text-sm font-normal items-center text-slate-400 flex justify-center"
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the image here...</p>
            ) : (
                <p>+ Image</p>
            )}
        </div>
    );
};

export default SelectImage;
