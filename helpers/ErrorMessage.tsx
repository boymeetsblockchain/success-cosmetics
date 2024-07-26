import { AlertCircleIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const ErrorMessage = ({ message }:{message:string}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="text-destructive flex items-center gap-x-3 text-sm">
      {message}
      <AlertCircleIcon/>
    </div>
  );
};

export default ErrorMessage;
