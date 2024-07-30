// Register.tsx
"use client";

import { CREATE_USER } from "@/graphql/schema/user";
import { useMutation } from "@apollo/client";
import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [createUser, { loading, error }] = useMutation(CREATE_USER);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await createUser({
        variables: {
          userInput: formData,
        },
      });

      console.log(data);
      

       // Reset form data
       setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      });

      // Optionally, show a success message or redirect
      alert("Registration successful!"); // Or use a more sophisticated notification
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl text-white text-center pt-5 mt-5">
        Register Your Account
      </h1>
      <div className="w-5/12 mx-auto bg-slate-700 mt-20 mb-10 p-16 rounded">
        <form onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow text-black p-2 rounded-sm"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow text-black p-2 rounded-sm"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </label>

          {/* Email */}
          <label className="input input-bordered flex items-center gap-2 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              className="grow text-black p-2 rounded-sm"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          {/* Password */}
          <label className="flex items-center gap-2 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              placeholder="Password"
              className="grow text-black p-2 rounded-sm"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>

          <button
            type="submit"
            className="btn mt-3 w-full py-3 bg-blue-700"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
          {error && <p className="text-red-500 mt-3">Error: {error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
