import React from 'react';
import { Button } from './ui/button';
import axios from 'axios';

type Props = {};

const GoPro = (props: Props) => {
  const handleSubscription = async () => {
    try {
      const response = await axios.get('/api/stripe');
      window.open(response.data.url, '_blank');
    } catch (error) {
      console.error('Error at GoPro: ', error);
    }
  };
  return (
    <Button
      className="mt-auto bg-yellow-500 hover:bg-yellow-400"
      onClick={handleSubscription}
    >
      To PRO
    </Button>
  );
};

export default GoPro;
