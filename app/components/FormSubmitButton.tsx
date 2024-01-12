"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

const FormSubmitButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) => {
  const { pending } = useFormStatus();

  return (
    <Button {...props} type="submit" disabled={props.disabled || pending}>
      <span className="flex items-center justify-center gap-2">
        {pending && <Loader2 size={16} className="animate-spin" />}
        {props.children}
      </span>
    </Button>
  );
};

export default FormSubmitButton;
