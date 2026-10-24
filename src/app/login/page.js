"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import {
  AUTH_STORAGE_KEY,
  loggedIn,
  selectIsAuthReady,
  selectToken,
} from "@/store/authSlice";

const loginSchema = yup.object({
  username: yup.string().required("Username is required."),
  password: yup.string().required("Password is required."),
  remember: yup.boolean(),
});

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector(selectToken);
  const isAuthReady = useSelector(selectIsAuthReady);
  const [result, setResult] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { remember: false },
  });

  const onSubmit = async ({ username, password, remember }) => {
    setResult(null);

    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const body = await response.text();

      if (!response.ok) {
        throw new Error(body || "Login failed. Check your credentials.");
      }

      const data = JSON.parse(body);
      if (typeof data.token !== "string" || !data.token) {
        throw new Error("Login succeeded but the server did not return a token.");
      }

      if (remember) {
        window.localStorage.setItem(AUTH_STORAGE_KEY, data.token);
      } else {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
      }

      dispatch(loggedIn(data.token));
      router.push("/profile");
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

  if (!isAuthReady) {
    return (
      <section className="page-shell login-page">
        <p className="muted" role="status">Checking your login...</p>
      </section>
    );
  }

  if (token) {
    return (
      <section className="page-shell login-page">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR ACCOUNT</p>
            <h1>You&apos;re logged in</h1>
          </div>
        </div>
        <p className="muted">Use Logout in the navigation to sign out.</p>
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
