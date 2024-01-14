import Link from "next/link";
import prisma from "../../lib/prisma";
import JobCard from "../components/JobCard";

const AdminPage = async () => {
  const jobsNoApprove = await prisma.job.findMany({
    where: { approved: false },
  });
  const jobsApprove = await prisma.job.findMany({
    where: { approved: true },
  });

  return (
    <main className="mx-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5">
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-5xl">
          Admin Dashboard
        </h1>
        <p className="text-2xl text-muted-foreground">Unapproved jobs</p>
      </div>
      <section className="flex flex-col gap-4">
        {jobsNoApprove.map((job) => (
          <Link key={job.id} href={`/admin/jobs/${job.slug}`}>
            <JobCard job={job} />
          </Link>
        ))}
        {jobsNoApprove.length <= 0 && (
          <p className="text-2xl text-muted-foreground">
            No Unapproved jobs found
          </p>
        )}
      </section>
      <div className="space-y-5">
        <p className="text-2xl text-muted-foreground">Approved jobs</p>
        <section className="flex flex-col gap-4">
          {jobsApprove.map((job) => (
            <Link key={job.id} href={`/admin/jobs/${job.slug}`}>
              <JobCard job={job} />
            </Link>
          ))}
          {jobsApprove.length <= 0 && (
            <p className="text-2xl text-muted-foreground">
              No approved jobs found
            </p>
          )}
        </section>
      </div>
    </main>
  );
};

export default AdminPage;
