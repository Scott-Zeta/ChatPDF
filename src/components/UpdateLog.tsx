import React from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import updateLogEntries from '@/data/logs/updateEntries';

type Props = {};

const UpdateLog = (props: Props) => {
  const logs = [...updateLogEntries].reverse();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">Update Log</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Log</DialogTitle>
        </DialogHeader>
        <div className="h-96 border-dashed border-2 rounded-lg overflow-auto p-2">
          {logs.map((entry) => (
            <div className="mb-2" key={entry.date}>
              <h1 className="text-gray-800 font-semibold">{entry.date}</h1>
              <ul className="list-disc list-inside">
                {entry.updates.map((change) => (
                  <li className="text-sm" key={change}>
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateLog;
