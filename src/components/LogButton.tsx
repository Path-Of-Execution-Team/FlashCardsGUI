'use client';

import { logToLoki } from '@/helpers/logToLoki';

import CustomButton from './CustomButton';

const LogButton = () => {
  const handleClick = async () => {
    logToLoki({
      level: 'error',
      msg: 'This is a test log message',
      additionalInfo: 'This is some additional information for the log',
    });
  };

  return <CustomButton onClick={handleClick}>Logs</CustomButton>;
};

export default LogButton;
