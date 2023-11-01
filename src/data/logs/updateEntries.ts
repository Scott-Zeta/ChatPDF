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
  {
    date: '27/10/2023',
    updates: ['Add delete chat function, remove any relative data', 'Bug fix'],
  },
  {
    date: '30/10/2023',
    updates: [
      'Improve the UI interaction and feedback when deleting a chat',
      'synchronization bug fix',
    ],
  },
  {
    date: '31/10/2023',
    updates: ['Fix the ChatList update problem'],
  },
  {
    date: '01/11/2023',
    updates: ['Fix Document preview 204 blank page problem'],
  },
  // ...more entries
];

export default updateLogEntries;
