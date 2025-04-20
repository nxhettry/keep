"use client";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

const UploadButton = ({ type }: { type: "login" | "signup" }) => {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full">
      {type === "login" && (pending ? "Logging in ..." : "Log in")}
      {type === "signup" && (pending ? "Signing up ..." : "Register")}
    </Button>
  );
};

export default UploadButton;
