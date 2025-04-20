import { registerUserAction } from "@/actions/Auth.actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UploadButton from "@/components/UploadButton";
import React from "react";

const Register = async () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <form
        action={registerUserAction}
        className="bg-white w-full sm:wd-4/5 md:w-3/5 h-auto rounded-lg p-8 shadow-md space-y-3"
      >
        <div>
          <Label>Email</Label>
          <Input type="email" name="email" required />
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" name="password" required />
        </div>

        <UploadButton type="signup" />
      </form>
    </div>
  );
};

export default Register;
