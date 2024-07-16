"use client";

import { AuthService } from "@/services/auth";
import "./index.css";
import { Button, message } from "antd";

export default function Home() {
  const [messageApi, contextHolder] = message.useMessage();

  const getUser = () => {
    AuthService.getProfile().then(console.log);
  };

  const show = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };

  return (
    <>
      <p>Home page works</p>
      {contextHolder}

      <Button type="primary" onClick={() => show()}>
        Test
      </Button>
    </>
  );
}
