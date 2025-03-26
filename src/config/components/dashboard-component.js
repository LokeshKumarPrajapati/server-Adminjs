import React from 'react';
import { Box, H2, Text, Card, CardHeader, CardContent, CardFooter } from '@adminjs/design-system';

const Dashboard = () => {
  return (
    <Box variant="grey" style={{ padding: '20px' }}>
      <H2 mb={4}>ZAVE Admin Dashboard</H2>
      
      <Box display="flex" flexDirection="row" gap={4}>
        <Card variant="white" width={1/3}>
          <CardHeader>
            <H2>Quick Stats</H2>
          </CardHeader>
          <CardContent>
            <Text>Total Customers: 1,234</Text>
            <Text>Total Orders: 567</Text>
            <Text>Total Revenue: $45,678</Text>
          </CardContent>
          <CardFooter>
            <Text fontSize="sm" color="grey">Updated today</Text>
          </CardFooter>
        </Card>

        <Card variant="white" width={1/3}>
          <CardHeader>
            <H2>Recent Activity</H2>
          </CardHeader>
          <CardContent>
            <Text>New Order #1234 received</Text>
            <Text>Vendor account created</Text>
            <Text>Product inventory updated</Text>
          </CardContent>
          <CardFooter>
            <Text fontSize="sm" color="grey">Last 24 hours</Text>
          </CardFooter>
        </Card>

        <Card variant="white" width={1/3}>
          <CardHeader>
            <H2>System Status</H2>
          </CardHeader>
          <CardContent>
            <Text>All systems operational</Text>
            <Text>Database: Connected</Text>
            <Text>Backup: Last run 2 hours ago</Text>
          </CardContent>
          <CardFooter>
            <Text fontSize="sm" color="grey">Real-time status</Text>
          </CardFooter>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;