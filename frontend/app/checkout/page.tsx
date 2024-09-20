"use client";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import CheckoutForm from "./CheckoutForm";

const Checkout = () => {
  return (
    <Container>
      <FormWrap>
          <CheckoutForm />
      </FormWrap>
    </Container>
  );
};

export default Checkout;
