import { cache } from "react";
import prisma from "../../../lib/prisma";
import { notFound } from "next/navigation";

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

  return <div>{job.title}</div>;
};

export default JobDetailsPage;
