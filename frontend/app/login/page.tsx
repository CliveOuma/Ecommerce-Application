"use client";
import dynamic from 'next/dynamic';
import { Suspense } from "react";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import LoginForm from "./LoginForm";
import { ErrorBoundary } from "react-error-boundary";
import Loader from "../components/Loader";

const ErrorFallback = () => (
  <div className="text-red-600">
    Oops, something went wrong. Please try again.
  </div>
);

const Login = () => {
  return (
    <Container>
      <FormWrap>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<Loader/>}>
            <LoginForm />
          </Suspense>
        </ErrorBoundary>
      </FormWrap>
    </Container>
  );
};

export default Login;
