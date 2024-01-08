import prisma from "../lib/prisma";

async function getJobs() {
  const jobs = await prisma?.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });
  return jobs;
}

export default async function Home() {
  const jobs = await getJobs();

  return (
    <>
      <h1>Welcome</h1>
    </>
  );
}
