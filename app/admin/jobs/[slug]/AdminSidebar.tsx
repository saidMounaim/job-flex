"use client";

import FormSubmitButton from "@/app/components/FormSubmitButton";
import { Job } from "@prisma/client";
import { useFormState } from "react-dom";
import { approveJob, deleteJob } from "../../actions";

interface AdminSidebarProps {
  job: Job;
}

export default function AdminSidebar({ job }: AdminSidebarProps) {
  const [formStateApprove, formActionApprove] = useFormState(
    approveJob,
    undefined,
  );
  const [formStateDelete, formActionDelete] = useFormState(
    deleteJob,
    undefined,
  );

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
          <form action={formActionApprove}>
            <input type="hidden" name="jobId" value={job.id} />
            <FormSubmitButton className="hove:bg-green-600 w-full bg-green-500">
              Approve
            </FormSubmitButton>
          </form>
          <p className="font-bold text-red-500">{formStateApprove?.error}</p>
        </>
      )}
      <>
        <form action={formActionDelete}>
          <input type="hidden" name="jobId" value={job.id} />
          <FormSubmitButton className="hove:bg-red-600 w-full bg-red-500">
            Delete
          </FormSubmitButton>
        </form>
        <p className="font-bold text-red-500">{formStateDelete?.error}</p>
      </>
    </aside>
  );
}
