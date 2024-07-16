"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { AuthProxyService } from "@/proxy/auth";
import { message, Space, Typography } from "antd";
import { AuthService } from "@/services/auth";
import { useRouter } from "next/navigation";
import { AppRouter } from "@/constants";

const { Text, Link } = Typography;

export default function Login() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

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

    AuthService.signIn(formData)
      .then((data) => {
        openNotificationSuccess();
        router.push(AppRouter.Home);
      })
      .catch((err) => {
        openNotificationError(err?.response?.data);
        setIsErrorVisible(true);
      });
  };

  const openNotificationSuccess = () => {
    messageApi.success("Login successfully");
  };

  const openNotificationError = (err: any) => {
    messageApi.error(err?.error);
  };

  return (
    <div className="log-form">
      <h2 style={{ marginBottom: "36px" }}>Login</h2>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col" style={{ gap: "18px" }}>
          <div className="flex flex-col" style={{ gap: "14px" }}>
            <div className="flex items-start	gap-1 flex-col justify-center">
              <input
                name="username"
                type="text"
                title="username"
                placeholder="Username or email"
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

            {isErrorVisible && (
              <Text type="danger">Wrong user information and password</Text>
            )}
          </div>

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
            Don't have an account?{" "}
            <a
              className="cursor-pointer hover:underline"
              href={AppRouter.Register}
            >
              Register
            </a>
          </span>
        </div>
      </form>
    </div>
  );
}
