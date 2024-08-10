import React from 'react';

export default function JobLogs({ logs }) {
  return (
    <div className="job-logs">
      <h2>Job Logs</h2>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            {log.timestamp}: {log.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
