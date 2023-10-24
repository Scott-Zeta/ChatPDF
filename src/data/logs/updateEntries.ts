type LogEntry = {
  date: string;
  updates: string[];
};

const updateLogEntries: LogEntry[] = [
  {
    date: '18/10/2023',
    updates: ['Core function deployed'],
  },
  {
    date: '20/10/2023',
    updates: ['Implemented update log'],
  },
  {
    date: '22/10/2023',
    updates: ['Testing Stripe subscription'],
  },
  {
    date: '25/10/2023',
    updates: ['App UI improvements'],
  },
  // ...more entries
];

export default updateLogEntries;
