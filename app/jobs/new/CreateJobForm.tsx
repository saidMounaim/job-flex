"use client";

import LocationInput from "@/app/components/LocationInput";
import RichTextEditor from "@/app/components/RichTextEditor";
import LoadingButton from "@/app/components/LoadingButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "@/components/ui/select";
import { jobTypes } from "@/lib/job-types";
import { createJobSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { draftToMarkdown } from "markdown-draft-js";
import { useForm } from "react-hook-form";
import * as z from "zod";

const CreateJobForm = () => {
  const form = useForm<z.infer<typeof createJobSchema>>({
    resolver: zodResolver(createJobSchema),
  });

  function onSubmit(values: z.infer<typeof createJobSchema>) {
    console.log(values);
  }

  return (
    <main className="mx-auto my-10 max-w-3xl space-y-10 pb-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-5xl">
          Find your perfect developer
        </h1>
        <p className="text-muted-foreground">
          Get your job posting seen by thousands of job seeker.
        </p>
      </div>
      <div className="space-y-6 rounded-lg border p-4">
        <div>
          <h2 className="font-semiBold ">Job details</h2>
          <p className="text-muted-foreground">
            provide a job description and details
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g Backend developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select {...field} defaultValue="">
                      <option value="" hidden>
                        Select an option
                      </option>
                      {jobTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyLogoUrl"
              render={({ field: { value, ...fieldValues } }) => (
                <FormItem>
                  <FormLabel>Company logo</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      {...fieldValues}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        fieldValues.onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Office location</FormLabel>
                  <FormControl>
                    <LocationInput
                      onLocationSelected={field.onChange}
                      ref={field.ref}
                    />
                  </FormControl>
                  {form.watch("location") && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          form.setValue("location", "", {
                            shouldValidate: true,
                          })
                        }
                      >
                        <X size={20} />
                      </button>
                      <span className="text-muted-foreground">
                        {form.watch("location")}
                      </span>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-3">
              <Label htmlFor="applicationEmail">How to apply</Label>
              <div className="flex items-center justify-between gap-2">
                <FormField
                  control={form.control}
                  name="applicationEmail"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <Input
                          type="email"
                          id="applicationEmail"
                          placeholder="Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="applicationUrl"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="Website"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            form.trigger("applicationEmail");
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label onClick={() => form.setFocus("description")}>
                    Description
                  </Label>
                  <FormControl>
                    <RichTextEditor
                      onChange={(draft) =>
                        field.onChange(draftToMarkdown(draft))
                      }
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton type="submit" loading={form.formState.isSubmitting}>
              Submit
            </LoadingButton>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default CreateJobForm;
