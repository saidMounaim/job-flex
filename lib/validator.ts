import { z } from "zod";
import { jobTypes, locationTypes } from "./job-types";

const requiredString = z.string().min(1);

const validImageFile = z
  .custom<File | undefined>()
  .refine(
    (file) =>
      !file ||
      (file instanceof File && file.type.startsWith("image/"),
      "Must be image file"),
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "Image must be less than 2MB");

const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).url().optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Email or url is required",
    path: ["applicationEmail"],
  });

const locationSchema = z
  .object({
    locationtype: requiredString.refine(
      (value) => locationTypes.includes(value),
      "Invalid location type",
    ),
    location: requiredString.max(100).optional(),
  })
  .refine(
    (data) =>
      !data.locationtype || data.locationtype === "Remote" || data.location,
    {
      message: "Location is required for on-site jobs",
      path: ["location"],
    },
  );

export const createJobSchema = z
  .object({
    title: requiredString.max(100, "Required"),
    type: requiredString.refine(
      (value) => jobTypes.includes(value),
      "Invalid job types",
    ),
    companyName: requiredString.max(100, "Required"),
    companyLogoUrl: validImageFile,
    description: requiredString.max(5000).optional(),
    salary: requiredString.max(9),
  })
  .and(applicationSchema)
  .and(locationSchema);

export type CreateJobValues = z.infer<typeof createJobSchema>;

export const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export type JobFilterValues = z.infer<typeof jobFilterSchema>;
