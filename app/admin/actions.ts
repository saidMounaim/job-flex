"use server";

import { isAdmin } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import prisma from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import { del } from "@vercel/blob";

export async function approveJob(formData: FormData) {
  try {
    const jobId = parseInt(formData.get("jobId") as string);

    const user = await currentUser();

    if (!user || !isAdmin(user)) {
      throw new Error("Not autorized");
    }

    await prisma.job.update({ where: { id: jobId }, data: { approved: true } });

    revalidatePath("/");
  } catch (error: any) {
    let message = "Unexpected error";
    if (error) {
      message = error.message;
    }
    return { error: message };
  }
}

export async function deleteJob(formData: FormData) {
  try {
    const jobId = parseInt(formData.get("jobId") as string);

    const user = await currentUser();

    if (!user || !isAdmin(user)) {
      throw new Error("Not autorized");
    }

    const job = await prisma.job.findUnique({ where: { id: jobId } });

    if (job?.companyLogoUrl) {
      await del(job?.companyLogoUrl);
    }

    await prisma.job.delete({ where: { id: jobId } });

    revalidatePath("/");
  } catch (error: any) {
    let message = "Unexpected error";
    if (error) {
      message = error.message;
    }
    return { error: message };
  }
}
