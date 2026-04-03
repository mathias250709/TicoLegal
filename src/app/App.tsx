import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from 'sonner';
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
      <SpeedInsights />
    </>
  );
}