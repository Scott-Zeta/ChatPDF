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

type Props = {};

const GoPro = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [link, setLink] = useState('');
  const handleSubscription = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/stripe');
      setLink(response.data.url);
      window.open(response.data.url, '_blank');
      setIsLoading(false);
      setOpen(false);
    } catch (error) {
      console.error('Error at GoPro: ', error);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="mt-auto bg-yellow-500 hover:bg-yellow-400">
          To PRO
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Upgrade to PRO</AlertDialogTitle>
          {isLoading ? (
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
          ) : (
            <AlertDialogDescription>
              By selecting Continue, you will be guide to a new page to
              subscribe the PRO plan. (This is just a demo, you will not be
              charged)
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        {isLoading ? (
          <div className="flex flex-col items-center">
            <AlertDialogFooter>
              <Button
                variant="link"
                onClick={() => {
                  if (link) {
                    window.open(link, '_blank');
                    setIsLoading(false);
                    setOpen(false);
                  }
                }}
              >
                Click here if your browser did not redirect you automatically
              </Button>
            </AlertDialogFooter>
          </div>
        ) : (
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={handleSubscription}>Continue</Button>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GoPro;
