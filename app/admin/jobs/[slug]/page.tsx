import { cache } from "react";
import prisma from "../../../../lib/prisma";
import { notFound } from "next/navigation";
import JobDetails from "@/app/components/JobDetails";
import AdminSidebar from "./AdminSidebar";

interface PageProps {
  params: {
    slug: string;
  };
}

const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({ where: { slug } });

  if (!job) notFound();

  return job;
});

const JobDetailsPage = async ({ params: { slug } }: PageProps) => {
  const job = await getJob(slug);

  return (
    <main className="mx-auto my-10 flex max-w-5xl flex-col items-center gap-5 md:flex-row md:items-start">
      <JobDetails job={job} />
      <AdminSidebar job={job} />
    </main>
  );
};

export default JobDetailsPage;
