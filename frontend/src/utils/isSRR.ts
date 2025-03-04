export const isSSR = (): boolean => typeof window === "undefined";

/*
console.log("Running in SSR?", isSSR());

import { isSSR } from './path-to-your-file';

if (isSSR()) {
  console.log("This is running in SSR mode!");
} else {
  console.log("This is running in the browser.");
}

const MyComponent: React.FC = () => {
  if (isSSR()) {
    return <div>Loading...</div>; // Show loading indicator during SSR
  }

  return <div>Client-side rendering is happening!</div>;
};


import { useEffect, useState } from 'react';
import { isSSR } from './path-to-your-file';

const Component = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (!isSSR()) {
      setIsClient(true);  // Set state to true when on the client
    }
  }, []);

  if (isSSR()) {
    return <div>Server-side rendering...</div>;
  }

  if (isClient) {
    return <div>Client-side rendering is complete!</div>;
  }

  return <div>Loading...</div>;
};




*/