import { formatMoney, relativeDate } from "@/lib/utils";
import { Job } from "@prisma/client";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Markdown from "./Markdown";

interface JobDetailsProps {
  job: Job;
}

const JobDetails = ({
  job: {
    title,
    type,
    locationtype,
    location,
    companyName,
    description,
    companyLogoUrl,
    applicationEmail,
    applicationUrl,
    salary,
    createdAt,
  },
}: JobDetailsProps) => {
  return (
    <section className="w-full grow space-y-5">
      <div className="flex items-center gap-3">
        {companyLogoUrl && (
          <Image
            src={companyLogoUrl}
            width={100}
            height={100}
            alt={title}
            className="rounded-xl"
          />
        )}
      </div>
      <div className="">
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="font-semiBold">
            {applicationUrl ? (
              <Link
                href={new URL(applicationUrl).origin}
                className="text-green-500 hover:underline"
              >
                {companyName}
              </Link>
            ) : (
              <span>{companyName}</span>
            )}
          </p>
        </div>
        <div className="mt-2 text-muted-foreground">
          <p className="flex items-center gap-1.5">
            <Briefcase size={16} className="shrink-0" />
            {type}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin size={16} className="shrink-0" />
            {locationtype}
          </p>
          <p className="flex items-center gap-1.5">
            <Globe2 size={16} className="shrink-0" />
            {location || "Wordlwide"}
          </p>
          <p className="flex items-center gap-1.5">
            <Banknote size={16} className="shrink-0" />
            {formatMoney(salary)}
          </p>
          <p className="flex items-center gap-1.5">
            <Clock size={16} className="shrink-0" />
            {relativeDate(createdAt)}
          </p>
        </div>
        <div className="mt-3">
          {description && <Markdown>{description}</Markdown>}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
