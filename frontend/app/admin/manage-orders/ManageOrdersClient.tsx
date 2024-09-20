"use client";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import moment from "moment";
import { Order } from "@/Types";

interface ManageOrdersClientProps {
    orders: Order[];
};


const ManageOrdersClient: React.FC<ManageOrdersClientProps> = () => {
    const [orders] = useState<Order[]>([]);
    const router = useRouter();

    const handleDispatch = useCallback((id: string) => {
        axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}`, {
            id,
            deliveryStatus: "dispatched"
        }).then((res) => {
            toast.success('order Dispatched');
            router.refresh();
        }).catch((err) => {
            toast.error('Ooops! Something went wrong');
            console.log(err);
        });
    }, [router]);

    const handleDeliver = useCallback((id: string) => {
        axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}`, {
            id,
            deliveryStatus: "delivered"
        }).then((res) => {
            toast.success('order Delivered');
            router.refresh();
        }).catch((err) => {
            toast.error('Ooops! Something went wrong');
            console.log(err);
        });
    }, [router]);



    let rows: any = [];
    if (orders) {
        rows = orders.map(order => ({
            id: order.id,
            customer: order.user.name,
            amount: formatPrice(order.amount),
            paymentStatus: order.status,
            date: moment(order.createdAt).fromNow(),
            deliveryStatus: order.deliveryStatus,
          }));          
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'customer', headerName: 'Customer Name', width: 150 },
        {
            field: 'amount', headerName: 'Amount(KSH)', width: 130, renderCell: (params) => {
                return (
                    <div className="font-bold text-slate-800">{params.row.amount}</div>
                );
            }
        },

        {
            field: 'paymentStatus', headerName: 'Payment Status', width: 150, renderCell: (params) => {
                return (
                    <div>{params.row.paymentStatus === 'pending' ? (
                        <Status text="pending" icon={MdAccessTimeFilled} 
                        bg="bg-slate-200" color="text-slate-700" />

                    ) : params.row.paymentStatus === 'complete' ? (
                        <Status text="completed" icon={MdDone} 
                        bg="bg-green-200" color="text-green-700" />

                    ) : (
                    <></>
                    )}
                    </div>
                );
            }
        },
        
        {
            field: 'deliveryStatus', headerName: 'Delivery Status', width: 150, renderCell: (params) => {
                return (
                    <div>{params.row.deliveryStatus === 'pending' ? (
                        <Status text="pending" icon={MdAccessTimeFilled} 
                        bg="bg-slate-200" color="text-slate-700" />

                    ) : params.row.deliveryStatus === 'pending' ? (
                        <Status text="dispatched" icon={MdDeliveryDining} 
                        bg="bg-purple-200" color="text-purple-700" />

                    ) : params.row.deliveryStatus === 'delivered' ? (
                     <Status text="delivered" icon={MdDone} 
                     bg="bg-green-200" color="text-green-700" />
                    ) : <></>
                    }

                    
                    </div>
                );
            }
        },

        {
          field:"date",
          headerName:"Date",
          width: 130,
        },

        {
            field: 'action', headerName: 'Actions', width: 200, renderCell: (params) => {
                return (
                    <div className="flex justify-between gap-4 w-full">
                        <ActionBtn icon={MdDeliveryDining} onClick={() => {
                            handleDispatch(params.row.id);
                        }} />

                        <ActionBtn icon={MdDone} onClick={() => {
                            handleDeliver(params.row.id);
                        }} />
                        <ActionBtn icon={MdRemoveRedEye} onClick={() => {
                            router.push(`order/${params.row.id}`)
                        }} />
                    </div>
                );
            }
        },
    ];

    return (
        <div className="max-w-[1150px] text-xl">
            <div className="mb-4">
                <Heading title="Manage orders" center />
            </div>
            <div style={{ height: 600, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    );
}

export default ManageOrdersClient;
