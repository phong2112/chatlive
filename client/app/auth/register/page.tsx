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

  const onSubmit = (data: any) => {
    const payload = JSON.parse(JSON.stringify(data));
    delete payload.repassword;
    AuthService.register(payload)
      .then(() => {
        openNotificationSuccess();
        router.push(AppRouter.Login);
      })
      .catch((err) => openNotificationError(err?.response?.data));
  };

  const openNotificationSuccess = () => {
    messageApi.success("Your account had been created successfully");
  };

  const openNotificationError = (err: any) => {
    messageApi.error(err?.error);
  };

  return (
    <div className="log-form">
      {contextHolder}

      <h2 style={{ marginBottom: "36px" }}>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col" style={{ gap: "36px" }}>
          <div className="flex flex-col" style={{ gap: "20px" }}>
            <div className="flex items-start gap-1 flex-col justify-center">
              <input
                type="text"
                title="username"
                placeholder="Username"
                {...register("username", {
                  required: ValidatorMessageConstants.REQUIRED("username"),
                  maxLength: {
                    value: ValidatorConstants.MAX_LENGTH_USERNAME,
                    message: ValidatorMessageConstants.MAX_LENGTH(
                      "username",
                      ValidatorConstants.MAX_LENGTH_USERNAME
                    ),
                  },
                  minLength: {
                    value: ValidatorConstants.MIN_LENGTH_USERNAME,
                    message: ValidatorMessageConstants.MIN_LENGTH(
                      "username",
                      ValidatorConstants.MIN_LENGTH_USERNAME
                    ),
                  },
                })}
              />
              {errors.username && (
                <Text type="danger">{errors?.username?.message as any}</Text>
              )}
            </div>

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

            <div className="flex items-start gap-1 flex-col justify-center">
              <input
                type="password"
                title="password"
                placeholder="Password"
                {...register("password", {
                  required: ValidatorMessageConstants.REQUIRED("password"),
                  minLength: {
                    value: ValidatorConstants.MIN_LENGTH_PASSWORD,
                    message: ValidatorMessageConstants.MIN_LENGTH(
                      "password",
                      ValidatorConstants.MIN_LENGTH_PASSWORD
                    ),
                  },
                  pattern: {
                    value: ValidatorConstants.PASSWORD_REGEX,
                    message:
                      ValidatorMessageConstants.PASSWORD_REGEX("password"),
                  },
                })}
              />
              {errors.password && (
                <Text type="danger">{errors?.password?.message as any}</Text>
              )}
            </div>

            <div className="flex items-start gap-1 flex-col justify-center">
              <input
                type="password"
                title="repassword"
                placeholder="En-enter Password"
                {...register("repassword", {
                  required: ValidatorMessageConstants.REQUIRED("repassword"),
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />

              {errors.repassword && (
                <Text type="danger">{errors?.repassword?.message as any}</Text>
              )}
            </div>
          </div>

          {isErrorVisible && (
            <Text type="danger">Wrong user information and password</Text>
          )}

          <button type="submit" className="btn">
            Register
          </button>

          <span className="text-center">
            Already have an account?{" "}
            <a
              className="cursor-pointer hover:underline"
              href={AppRouter.Login}
            >
              Login
            </a>
          </span>
        </div>
      </form>
    </div>
  );
}
