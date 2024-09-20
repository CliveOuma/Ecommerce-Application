import { useState, useCallback } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { MdCached, MdClose, MdDelete, MdEdit, MdDone } from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Product } from "@/Types";
import Image from "next/image";

interface ManageProductsClientProps {
    products: Product[];
    onDelete: (id: string) => void;
}

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({ products: initialProducts, onDelete }) => {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>(initialProducts);

    const handleDelete = useCallback(async (id: string, images: any[]) => {
        const token = localStorage.getItem("token");
    
        if (!token) {
            toast.error('Authentication token is missing. Please log in.');
            return;
        }
    
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            toast.success('Product deleted successfully');
            setProducts((prevProducts) => prevProducts.filter(product => product._id !== id));
            onDelete(id);
        } catch (err) {
            toast.error('Failed to delete product');
            console.log(err);
        }
    }, [onDelete]);

    const handleToggleStock = useCallback(async (id: string, inStock: boolean) => {
        const token = localStorage.getItem("token");
        
        if (!token) {
            toast.error('Authentication token is missing. Please log in.');
            return;
        }
    
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, 
            { inStock: !inStock },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success('Product status changed');
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === id ? { ...product, inStock: !inStock } : product
                )
            );
        } catch (err) {
            toast.error('Oops! Something went wrong');
        }
    }, []);    

    const handleEdit = (id: string) => {
        router.push(`/edit-product/${id}`);
    };

    const rows = products.map((product) => ({
        id: product._id,
        name: product.name,
        price: formatPrice(product.price),
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
        description: product.description, 
        images: product.images,
    }));

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 120 },
        { field: 'name', headerName: 'Name', width: 140 },
        {
            field: 'price', headerName: 'Price (KSH)', width: 140, renderCell: (params) => (
                <div className="font-bold text-slate-800">{params.row.price}</div>
            )
        },
        { field: 'category', headerName: 'Category', width: 120 },
        {
            field: 'description', headerName: 'Description', width: 180, renderCell: (params) => (
                <div className="truncate max-w-full text-gray-600">{params.row.description}</div>
            )
        },
        {
            field: 'inStock', headerName: 'In Stock', width: 120, renderCell: (params) => (
                <div>{params.row.inStock === true ? (
                    <Status text="in stock" icon={MdDone} bg="bg-teal-200" color="text-teal-700" />
                ) : (
                    <Status text="out of stock" icon={MdClose} bg="bg-rose-200" color="text-rose-700" />
                )}
                </div>
            )
        },
        {
            field: 'images',
            headerName: 'Image',
            width: 100,
            renderCell: (params) => {
              console.log(params.row.images);
              return (
                <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
                  {params.row.images && params.row.images.length > 0 ? (
                    <Image
                      src={params.row.images[0].url}
                      alt={params.row.name}
                      width={48} 
                      height={48} 
                      className=" object-cover rounded"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </div>
              );
            }
          },           
        {
            field: 'action', headerName: 'Actions', width: 180, renderCell: (params) => (
                <div className="flex pt-3 gap-3 w-full">
                    <ActionBtn icon={MdCached} onClick={() => {
                        handleToggleStock(params.row.id, params.row.inStock);
                    }} />
                    <ActionBtn icon={MdDelete} onClick={() => {
                        handleDelete(params.row.id, params.row.images);
                    }} />
                </div>
            )
        },
    ];

    return (
        <div className="max-w-[1150px] text-xl">
            <div className="mb-4">
                <Heading title="Manage Products" center />
            </div>
            <div style={{ height: 800, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={(row) => row.id}  
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 25,
                            },
                        },
                    }}
                    pageSizeOptions={[25]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    sx={{
                        "& .header-cell": {
                            backgroundColor: "#f9fafb",
                            fontWeight: "bold",
                        },
                        "& .MuiDataGrid-viewport": {
                            width: 'auto',
                        },
                        "& .data-cell": {
                            padding: '8px',
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default ManageProductsClient;
