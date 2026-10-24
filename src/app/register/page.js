"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const API_URL = "https://jsonplaceholder.typicode.com/users";

const fields = [
  { name: "firstName", label: "First name", autoComplete: "given-name" },
  { name: "lastName", label: "Last name", autoComplete: "family-name" },
  { name: "age", label: "Age", type: "number", autoComplete: "off" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  {
    name: "password",
    label: "Password",
    type: "password",
    autoComplete: "new-password",
  },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
];

const nameRule = (label) =>
  yup
    .string()
    .trim()
    .required(`${label} is required.`)
    .min(4, `${label} must be at least 4 characters.`)
    .max(20, `${label} must be at most 20 characters.`);

const registerSchema = yup.object({
  firstName: nameRule("First name"),
  lastName: nameRule("Last name"),
  age: yup
    .number()
    .typeError("Age is required.")
    .integer("Age must be a whole number.")
    .min(13, "Age must be at least 13.")
    .max(120, "Age must be at most 120.")
    .required("Age is required."),
  email: yup
    .string()
    .trim()
    .required("Email is required.")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Email format is invalid."),
  password: yup
    .string()
    .required("Password is required.")
    .min(6, "Password must be at least 6 characters.")
    .max(12, "Password must be at most 12 characters.")
    .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least 1 lowercase letter.")
    .matches(/[0-9]/, "Password must contain at least 1 number."),
  phone: yup
    .string()
    .trim()
    .required("Phone is required.")
    .matches(/^\d+$/, "Phone must contain only digits.")
    .min(10, "Phone must be at least 10 digits.")
    .max(100, "Phone must be at most 100 digits."),
});

const defaultValues = {
  firstName: "",
  lastName: "",
  age: "",
  email: "",
  password: "",
  phone: "",
};

export default function RegisterPage() {
  const [result, setResult] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(registerSchema), defaultValues });

  const onSubmit = async (values) => {
    setResult(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(`Error ${response.status}`);
      const data = await response.json();

      setResult({
        type: "success",
        message: `Registration successful! ID: ${data.id}`,
      });
      reset(defaultValues);
    } catch {
      setResult({
        type: "error",
        message: "Registration failed. Please try again.",
      });
    }
  };

  return (
    <section className="page-shell login-page">
      <div className="section-heading">
        <div>
          <p className="eyebrow">YOUR ACCOUNT</p>
          <h1>Register</h1>
        </div>
      </div>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        {fields.map((field) => (
          <div className="login-field" key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              id={field.name}
              type={field.type ?? "text"}
              autoComplete={field.autoComplete}
              aria-invalid={Boolean(errors[field.name])}
              aria-describedby={
                errors[field.name] ? `${field.name}-error` : undefined
              }
              {...register(field.name)}
            />
            {errors[field.name] && (
              <p className="login-error" id={`${field.name}-error`}>
                {errors[field.name].message}
              </p>
            )}
          </div>
        ))}
        <button
          className="button dark-button login-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Register"}
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
