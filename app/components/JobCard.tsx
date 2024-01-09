import { Job } from "@prisma/client";
import Image from "next/image";
import companyLogoPlaceholder from "../../public/placeholder-company-logo.svg";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import { formatMoney, relativeDate } from "@/lib/utils";

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <article className="flex gap-6 border rounded-lg p-5 hover:bg-muted/60">
      <Image
        src={job.companyLogoUrl ? job.companyLogoUrl : companyLogoPlaceholder}
        width={100}
        height={100}
        alt={`${job.companyName} Logo`}
        className="rouded-lg self-center"
      />
      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium ">{job.title}</h2>
          <p className="text-muted-foreground">{job.companyName}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5 sm:hidden">
            <Briefcase size={16} className="shrink-0" />
            {job.type}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin size={16} className="shrink-0" />
            {job.locationtype}
          </p>
          <p className="flex items-center gap-1.5">
            <Globe2 size={16} className="shrink-0" />
            {job.location || "Wordlwide"}
          </p>
          <p className="flex items-center gap-1.5">
            <Banknote size={16} className="shrink-0" />
            {formatMoney(job.salary)}
          </p>
          <p className="flex items-center gap-1.5 sm:hidden">
            <Clock size={16} className="shrink-0" />
            {relativeDate(job.createdAt)}
          </p>
        </div>
      </div>
      <div className="hidden sm:flex flex-col shrink-0 items-end justify-between">
        <div className="border rounded- px-2 py-0.5 bg-slate-800 text-white text-sm">
          {job.type}
        </div>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Clock size={16} />
          {relativeDate(job.createdAt)}
        </span>
      </div>
    </article>
  );
};

export default JobCard;
