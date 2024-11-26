"use client";

import { createAuthCookie } from "@/actions/auth.action";
import { LoginSchema } from "@/helpers/schemas";
import { LoginFormType } from "@/helpers/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const Login = () => {
  const router = useRouter();

  const initialValues: LoginFormType = {
    email: "admin@acme.com",
    password: "admin",
  };

  const handleLogin = useCallback(
    async (values: LoginFormType) => {
      // `values` contains email & password. You can use provider to connect user
      try {
        await createAuthCookie({
          name: values.email.split('@')[0],
          email: values.email,
          password: values.password
        });
        router.replace("/");
      } catch (error) {
        console.error('Login error:', error);
      }
    },
    [router],
  );

  return (
    <>
      <div className="text-center text-[25px] font-bold mb-6">Login</div>

      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <>
            <div className="flex flex-col w-1/2 gap-4 mb-4">
              <Input
                type="email"
                placeholder="Email"
                value={values.email}
                className={
                  !!errors.email && !!touched.email ? "is-invalid" : ""
                }
                onChange={handleChange("email")}
              />
              <Input
                placeholder="Password"
                type="password"
                value={values.password}
                className={
                  !!errors.password && !!touched.password ? "is-invalid" : ""
                }
                onChange={handleChange("password")}
              />
            </div>

            <Button
              onClick={() => handleSubmit()}
              variant="ghost"
              color="primary"
            >
              Login
            </Button>
          </>
        )}
      </Formik>

      <div className="font-light text-slate-400 mt-4 text-sm">
        Don&apos;t have an account ?{" "}
        <Link href="/register" className="font-bold">
          Register here
        </Link>
      </div>
    </>
  );
};
