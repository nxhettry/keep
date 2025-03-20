"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

const LoadingButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      className="w-full text-white font-semibold py-2 px-4 rounded-md transition duration-200"
    >
      {pending ? "Getting Results ..." : "Show Results"}
    </Button>
  );
};

export default LoadingButton;
