"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const authTokenKey = "shoply-auth-token";

const loginSchema = yup.object({
  username: yup.string().required("Username is required."),
  password: yup.string().required("Password is required."),
  remember: yup.boolean(),
});

export default function LoginPage() {
  const [result, setResult] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { remember: false },
  });

  useEffect(() => {
    try {
      setIsAuthenticated(Boolean(window.localStorage.getItem(authTokenKey)));
    } catch (error) {
      setResult({
        type: "error",
        message:
          error instanceof Error
            ? `Unable to restore your login: ${error.message}`
            : "Unable to restore your login.",
      });
    } finally {
      setIsCheckingAuth(false);
    }
  }, []);

  const onSubmit = async ({ username, password, remember }) => {
    setResult(null);

    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed. Check your credentials.");
      }

      if (typeof data.token !== "string" || !data.token) {
        throw new Error("Login succeeded but the server did not return a token.");
      }

      if (remember) {
        window.localStorage.setItem(authTokenKey, data.token);
      } else {
        window.localStorage.removeItem(authTokenKey);
      }

      setIsAuthenticated(true);
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

  if (isCheckingAuth) {
    return (
      <section className="page-shell login-page">
        <p className="muted" role="status">Checking your login...</p>
      </section>
    );
  }

  if (isAuthenticated) {
    return (
      <section className="page-shell login-page">
        <div className="section-heading">
            <div>
              <p className="eyebrow">YOUR ACCOUNT</p>
              <h1>You&apos;re logged in</h1>
            </div>
        </div>
      </section>
    );
  }

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
        <label className="remember-me">
          <input type="checkbox" {...register("remember")} />
          <span>Remember me</span>
        </label>
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
