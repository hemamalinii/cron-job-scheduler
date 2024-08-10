import React from 'react';
import Link from 'next/link';
import styles from './JobCard.module.css';

export default function JobCard({ job }) {
  return (
    <div className={styles['job-card']}>
      <h3>{job.name}</h3>
      <p>{job.description}</p>
      <p>Status: {job.status}</p>
      <div className={styles.actions}>
        <Link href={`/jobs/edit/${job.id}`}>
          <a>Edit</a>
        </Link>
        <button onClick={() => deleteJob(job.id)}>Delete</button>
      </div>
    </div>
  );
}


async function deleteJob(jobId) {
  try {
    const response = await fetch(`/api/jobs/${jobId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      alert('Job deleted successfully');
      // Optionally refresh the page or remove the job from the list in the UI
    } else {
      alert('Failed to delete job');
    }
  } catch (error) {
    console.error('Error deleting job:', error);
    alert('Error deleting job');
  }
}
