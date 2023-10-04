// Provider help with caching when fetching data from the server
'use client';
import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const Providers = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
