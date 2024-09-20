"use client"
import { useEffect, useState } from 'react';
import Heading from '../components/Heading';
import { formatPrice } from '@/utils/formatPrice';
import { formatNumber } from '@/utils/formatNumber';

interface SummaryProps {}

type SummaryDataType = {
    [key: string]: {
      label: string;
      digit: number;
    };
};

const Summary: React.FC<SummaryProps> = () => {
    const [summaryData, setSummaryData] = useState<SummaryDataType>({
        sale: {
            label: 'Total Sale',
            digit: 0,
        },
        products: {
            label: 'Total Products',
            digit: 0,
        },
        orders: {
            label: 'Total Orders',
            digit: 0,
        },
        paidOrders: {
            label: 'Paid Orders',
            digit: 0,
        },
        unpaidOrders: {
            label: 'Unpaid Orders',
            digit: 0,
        },
        users: {
            label: 'Total Users',
            digit: 0,
        },
    });

    // Fetch data from the backend API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ordersSummaryRes, productsRes, usersRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/summary`),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/count`),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/count`),
                ]);
    
                const ordersSummary = await ordersSummaryRes.json();
                const productsCount = await productsRes.json();
                const usersCount = await usersRes.json();
    
                setSummaryData((prev) => {
                    let tempData = { ...prev };
    
                    tempData.sale.digit = ordersSummary.totalSales;
                    tempData.orders.digit = ordersSummary.totalOrders;
                    tempData.paidOrders.digit = ordersSummary.paidOrders;
                    tempData.unpaidOrders.digit = ordersSummary.unpaidOrders;
    
                    // Ensure the count property is correctly accessed
                    tempData.products.digit = productsCount.count || 0;
                    tempData.users.digit = usersCount.count || 0;
    
                    return tempData;
                });
            } catch (error) {
                console.error('Failed to fetch summary data:', error);
            }
        };
    
        fetchData();
    }, []);     

    const summaryKeys = Object.keys(summaryData);

    return (
        <div className='max-w-[1150px] m-auto'>
            <div className='mb-4 mt-8'>
                <Heading title='Statistics' center />
            </div>
            <div className='grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto'>
                {summaryKeys &&
                    summaryKeys.map((key) => (
                        <div
                            key={key}
                            className='rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition'
                        >
                            <div className='text-xl md:text-4xl font-bold'>
                                {summaryData[key].label === 'Total Sale' ? (
                                    <>{formatPrice(summaryData[key].digit)}</>
                                ) : (
                                    <>{formatNumber(summaryData[key].digit)}</>
                                )}
                            </div>
                            <div>{summaryData[key].label}</div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Summary;
