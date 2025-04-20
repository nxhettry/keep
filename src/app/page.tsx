"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUserAction } from "@/actions/Auth.actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import UploadButton from "@/components/UploadButton";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await loginUserAction(new FormData(e.target as HTMLFormElement));

      router.push("/panel");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full sm:wd-4/5 md:w-3/5 h-auto rounded-lg p-8 shadow-md space-y-3"
      >
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <UploadButton type="login" />
      </form>
    </div>
  );
};

export default LoginForm;
