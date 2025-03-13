"use client";
import { signIn } from "next-auth/react";
import React from "react";

const Login = () => {
  return <button onClick={() => signIn()}>Sign In with Google</button>;
};

export default Login;
