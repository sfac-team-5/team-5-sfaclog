import React from 'react';
import { Navigation } from '../components/Navigation/Navigation';
function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
}

export default layout;
