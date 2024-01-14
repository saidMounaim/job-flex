"use client";

import FormSubmitButton from "@/app/components/FormSubmitButton";
import { Job } from "@prisma/client";
import { useFormState } from "react-dom";
import { approveJob } from "../../actions";

interface AdminSidebarProps {
  job: Job;
}

export default function AdminSidebar({ job }: AdminSidebarProps) {
  const [formState, formAction] = useFormState(approveJob, undefined);

  return (
    <aside className="flex w-[200px] flex-none flex-row items-center gap-2 md:flex-col md:items-stretch">
      {job.approved ? (
        <>
          <span className="font-semiBold text-center text-green-500">
            Approved
          </span>
        </>
      ) : (
        <>
          <form action={formAction}>
            <input type="hidden" name="jobId" value={job.id} />
            <FormSubmitButton className="hove:bg-green-600 w-full bg-green-500">
              Approve
            </FormSubmitButton>
          </form>
          <p className="font-bold text-red-500">{formState?.error}</p>
        </>
      )}
    </aside>
  );
}
