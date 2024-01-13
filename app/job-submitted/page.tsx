import React from "react";

const JobSumittedPage = () => {
  return (
    <main className="mx-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5">
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-5xl">
          Job submitted
        </h1>
        <p className="text-muted-foreground">
          Your job posting has been submitted and is pending approval.
        </p>
      </div>
    </main>
  );
};

export default JobSumittedPage;
