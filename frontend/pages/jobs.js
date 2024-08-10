import React, { useState, useEffect } from 'react';
import JobList from '../components/JobList';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      const res = await fetch('/api/jobs');
      const data = await res.json();
      setJobs(data);
    }
    fetchJobs();
  }, []);

  return (
    <div>
      <h1>Scheduled Jobs</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

/*export async function getServerSideProps() {
    const res = await fetch('http://localhost:8080/api/jobs'); // Assuming your backend is running on localhost:8080
    const jobs = await res.json();
  
    return {
      props: {
        jobs,
      },
    };
  }
  
  export default function Jobs({ jobs }) {
    return (
      <div>
        <h1>Scheduled Jobs</h1>
        <ul>
          {jobs.map((job, index) => (
            <li key={index}>{job.name}</li>
          ))}
        </ul>
      </div>
    );
  }
  */