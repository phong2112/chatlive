"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import "./index.css";
import { AuthProxyService } from "@/proxy/auth";
import { Space, Typography } from "antd";

const { Text, Link } = Typography;

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = (event: FormEvent) => {
    event?.preventDefault();

    AuthProxyService.signIn(formData)
      .then((data) => console.log(data))
      .catch((err) => setIsErrorVisible(true));
  };

  return (
    <div className="log-form">
      <h2 style={{ marginBottom: "36px" }}>Login</h2>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col" style={{ gap: "20px" }}>
          <div className="flex flex-col" style={{ gap: "36px" }}>
            <div className="flex items-start	gap-1 flex-col justify-center">
              <input
                name="username"
                type="text"
                title="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-start	gap-1 flex-col justify-center">
              <input
                name="password"
                type="password"
                title="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {isErrorVisible && (
            <Text type="danger">Wrong user information and password</Text>
          )}

          <div className="flex justify-between text-sm">
            <div className="flex gap-2">
              <input type="checkbox" id="vehicle1" name="rememberMe" value="" />
              <label>Remember me</label>
            </div>

            <a className="forgot" href="#">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="btn">
            Login
          </button>

          <span className="text-center">
            Don't have an account? <a href="#">Register</a>
          </span>
        </div>
      </form>
    </div>
  );
}
