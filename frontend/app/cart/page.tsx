"use client"; 

import React, { Suspense } from "react";
import Container from "../components/Container";
import CartClient from "./CartClient";
import Loader from "../components/Loader";

const Cart = () => {
  return (
    <div className="pt-8">
      <Container>
        {/* Wrap CartClient with Suspense */}
        <Suspense fallback={<Loader/>}>
          <CartClient />
        </Suspense>
      </Container>
    </div>
  );
};

export default Cart;
