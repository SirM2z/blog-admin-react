import React from 'react';
import User from './User';
import { UserProvider } from './context';

export default function() {
  return (
    <UserProvider>
      <User />
    </UserProvider>
  )
};
