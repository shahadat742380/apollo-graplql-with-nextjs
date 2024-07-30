"use client";

import { LOGIN_USER } from "@/graphql/schema/login";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
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

  const [LoginUser, { loading, error }] = useMutation(LOGIN_USER);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await LoginUser({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });

      console.log(data.login.token);

      if (data?.login?.token) {
        // Store the token in localStorage
        localStorage.setItem("token", data.login.token);

        // Optionally, show a success message or redirect
        alert("Login successful!"); // Or use a more sophisticated notification

        // Redirect to another page, e.g., the home page
        router.push("/");
      } else {
        alert("Login failed!");
      }
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl mt-5 text-center pt-5">Login Your Account</h1>

      <div className="w-5/12 mx-auto mt-20 mb-10 bg-slate-700 p-16 rounded">
        <form onSubmit={handleSubmit}>
          {/* Email  */}
          <label className=" flex items-center gap-2 mb-3">
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
              type="text"
              className="grow text-black p-2"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </label>
          {/* Password  */}
          <label className="input input-bordered flex items-center gap-2 mb-3">
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
              className="grow text-black p-2"
              name="password"
              onChange={handleChange}
            />
          </label>

          <button
            disabled={loading}
            className="bg-blue-700 text-white rounded-sm w-full py-3  mt-3"
          >
            {loading ? "Login..." : "Login"}
          </button>
          {error && <p className="text-red-500 mt-3">Error: {error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
