"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const loginSchema = yup.object({
  username: yup.string().required("Username is required."),
  password: yup.string().required("Password is required."),
});

export default function LoginPage() {
  const [result, setResult] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (credentials) => {
    setResult(null);

    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed. Check your credentials.");
      }

      setResult({ type: "success", message: "Login successful." });
    } catch (error) {
      setResult({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to complete login. Please try again.",
      });
    }
  };

  return (
    <section className="page-shell login-page">
      <div className="section-heading">
        <div>
          <p className="eyebrow">YOUR ACCOUNT</p>
          <h1>Login</h1>
        </div>
      </div>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="login-field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            aria-invalid={Boolean(errors.username)}
            aria-describedby={errors.username ? "username-error" : undefined}
            {...register("username")}
          />
          {errors.username && (
            <p className="login-error" id="username-error">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="login-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : undefined}
            {...register("password")}
          />
          {errors.password && (
            <p className="login-error" id="password-error">
              {errors.password.message}
            </p>
          )}
        </div>
        <button className="button dark-button login-submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
          <span aria-hidden="true">→</span>
        </button>
        {result && (
          <p
            className={`login-result ${result.type}`}
            role={result.type === "error" ? "alert" : "status"}
          >
            {result.message}
          </p>
        )}
      </form>
    </section>
  );
}
