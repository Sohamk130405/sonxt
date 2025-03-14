"use client";
import { signIn } from "next-auth/react";
import React from "react";
import Button from "./Button";

const Login = () => {
  return (
    <Button
      type="button"
      title="Sign in with google"
      LeftIcon={"/google.png"}
      handleClick={() => signIn()}
    />
  );
};

export default Login;
