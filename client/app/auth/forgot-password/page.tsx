"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import {
  Button,
  NotificationArgsProps,
  Space,
  Typography,
  message,
} from "antd";
import { AuthService } from "@/services/auth";
import { useRouter } from "next/navigation";
import {
  AppRouter,
  ValidatorConstants,
  ValidatorMessageConstants,
} from "@/constants";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";

const { Text, Link } = Typography;
type NotificationPlacement = NotificationArgsProps["placement"];

export default function Register() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [isSucceed, setIsSucceed] = useState(false);

  const onSubmit = (data: any) => {
    const payload = JSON.parse(JSON.stringify(data));
    AuthService.forgotPassword({
      email: payload?.email,
    })
      .then(() => {
        setIsSucceed(true);
        openNotificationSuccess();
      })
      .catch((err) => openNotificationError(err?.response?.data));
  };

  const openNotificationSuccess = () => {
    messageApi.success("Verification code had been sent to your email");
  };

  const openNotificationError = (err: any) => {
    messageApi.error(err?.error);
  };

  return (
    <div className="log-form">
      {contextHolder}

      <h2 style={{ marginBottom: "36px" }}>Forgot password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!isSucceed && (
          <div className="flex flex-col" style={{ gap: "36px" }}>
            <div className="flex flex-col" style={{ gap: "20px" }}>
              <div className="flex items-start gap-1 flex-col justify-center">
                <input
                  type="text"
                  title="email"
                  placeholder="Email"
                  {...register("email", {
                    required: ValidatorMessageConstants.REQUIRED("email"),
                    pattern: {
                      value: ValidatorConstants.EMAIL_REGEX,
                      message: ValidatorMessageConstants.EMAIL,
                    },
                  })}
                />
                {errors.email && (
                  <Text type="danger">{errors?.email?.message as any}</Text>
                )}
              </div>
            </div>

            {isErrorVisible && (
              <Text type="danger">Wrong user information or email</Text>
            )}

            <button type="submit" className="btn">
              Submit
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
        )}

        {isSucceed && (
          <div className="flex flex-col items-center" style={{ gap: "36px" }}>
            <Text type="success">
              Verification code had been sent to your email
            </Text>
          </div>
        )}
      </form>
    </div>
  );
}
