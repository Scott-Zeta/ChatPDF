'use client';
import React, { useState } from 'react';
import { Button } from './ui/button';
import axios from 'axios';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { RotatingLines } from 'react-loader-spinner';

type Props = { buttonClassName: string };

const ManageSubscription = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState('');
  const handleSubscription = async () => {
    try {
      const response = await axios.get('/api/stripe');
      setLink(response.data.url);
      window.open(response.data.url, '_blank');
      setOpen(false);
    } catch (error) {
      console.error('Error at HandleSubscription call: ', error);
    } finally {
      setOpen(false);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className={`${props.buttonClassName}`}
          onClick={handleSubscription}
        >
          Manage Your SubScription
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Manage your Pro Subscription</AlertDialogTitle>
          <div className="flex flex-col items-center">
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
            <AlertDialogDescription>Processing</AlertDialogDescription>
          </div>
        </AlertDialogHeader>

        <div className="flex flex-col items-center">
          <AlertDialogFooter>
            <Button
              variant="link"
              onClick={() => {
                if (link) {
                  window.open(link, '_blank');
                  setOpen(false);
                }
              }}
            >
              Click here if your browser did not redirect you automatically
            </Button>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ManageSubscription;
