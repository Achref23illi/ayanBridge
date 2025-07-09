import React from 'react';
import DashboardLayout from '../dashboard/DashboardLayout';
import Home from '../dashboard/Home';

const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout>
      <Home />
    </DashboardLayout>
  );
};

export default DashboardPage; 