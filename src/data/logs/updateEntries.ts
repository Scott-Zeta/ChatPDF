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
  {
    date: '14/11/2023',
    updates: [
      'Relocate the server to Singapore, performace should be hight improved',
      'Bug fix to updatelogs, prevent it from been reverse every time',
    ],
  },
  {
    date: '02/12/2023',
    updates: ['Fix the service sync issue might happen ocassionally'],
  },
  {
    date: '29/12/2023',
    updates: [
      'Refactor the PDF viewer, by switching to embed element. Not rely on Google service anymore.(Previous file might not be able to preview correctly)',
    ],
  },
  // ...more entries
];

export default updateLogEntries;
