import { JobFilterValues } from "@/lib/validator";
import prisma from "../lib/prisma";
import JobCard from "./components/JobCard";
import { Prisma } from "@prisma/client";

interface JobResultsProps {
  filterValues: JobFilterValues;
}

const JobResults = async ({
  filterValues: { q, type, location, remote },
}: JobResultsProps) => {
  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { location: { search: searchString } },
          { type: { search: searchString } },
          { locationtype: { search: searchString } },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationtype: "Remote" } : {},
      { approved: true },
    ],
  };

  const jobs = await prisma?.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobResults;
