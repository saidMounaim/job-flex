import prisma from "../lib/prisma";
import JobCard from "./components/JobCard";
import JobFilterSidebar from "./components/JobFilterSidebar";

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
    <main className="mx-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5">
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-5xl">
          Developer jobs
        </h1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar />
        <div className="space-y-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>
    </main>
  );
}
