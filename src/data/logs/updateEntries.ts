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
  {
    date: '05/11/2023',
    updates: ['Add the user guide'],
  },
  {
    date: '08/11/2023',
    updates: [
      'Limit Every user can only have 3 chats at the same time, to restrict the AWS upload',
    ],
  },
  {
    date: '09/11/2023',
    updates: [
      'Limit Every user can only send 20 messages every 24 hours, to restrict the API call',
    ],
  },
  // ...more entries
];

export default updateLogEntries;
