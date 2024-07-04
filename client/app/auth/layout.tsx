import "./index.css";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="layout-wrapper">{children}</div>;
}
