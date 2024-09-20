"use client"; 

import Container from "@/app/components/Container";
import ManageOrdersClient from "./ManageOrdersClient";
import { Order } from "@/Types";
import axios from "axios";
import Loader from "@/app/components/Loader";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";

const ManageOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setError(null); // Clear previous error state
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`);
        console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.dismiss();
        setError("Failed to fetch orders");
        toast.error("An error occurred while fetching orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); // Empty dependency array to run effect only once when component mounts

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center mt-10">Error: {error}</div>;
  }

  return (
    <div className="pt-8">
      <Container>
      <Suspense fallback={<Loader />}>
      <ManageOrdersClient orders={orders} />
      </Suspense>;
      </Container>
    </div>
  );
};

export default ManageOrders;
