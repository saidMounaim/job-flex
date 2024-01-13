import Link from "next/link";
import prisma from "../../lib/prisma";
import JobCard from "../components/JobCard";

const AdminPage = async () => {
  const jobs = await prisma.job.findMany({ where: { approved: false } });

  return (
    <main className="mx-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5">
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-5xl">
          Admin Dashboard
        </h1>
        <p className="text-2xl text-muted-foreground">Unapproved jobs</p>
      </div>
      <section className="flex flex-col gap-4">
        {jobs.map((job) => (
          <Link key={job.id} href={`/admin/jobs/${job.slug}`}>
            <JobCard job={job} />
          </Link>
        ))}
        {jobs.length <= 0 && (
          <p className="text-2xl text-muted-foreground">No Unapproved jobs</p>
        )}
      </section>
    </main>
  );
};

export default AdminPage;
