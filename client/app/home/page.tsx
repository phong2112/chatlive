"use client";

import { AuthService } from "@/services/auth";
import "./index.css";
import { Button, message } from "antd";

export default function Home() {
  const [messageApi, contextHolder] = message.useMessage();

  const getProfile = () => {
    AuthService.getProfile().then(console.log);
  };

  const show = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };

  const logout = () => {
    AuthService.logout();
  };

  const sendEmail = () => {};

  return (
    <>
      <p>Home page works</p>
      {contextHolder}

      <Button type="primary" onClick={() => show()}>
        Test
      </Button>

      <Button type="primary" onClick={() => getProfile()}>
        Get profile
      </Button>

      <Button type="primary" onClick={() => sendEmail()}>
        Get profile
      </Button>

      <Button type="primary" onClick={() => logout()}>
        Log out
      </Button>
    </>
  );
}
