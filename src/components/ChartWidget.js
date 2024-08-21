import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Failed', value: 1689 },
  { name: 'Warning', value: 681 },
  { name: 'Not Available', value: 36 },
  { name: 'Passed', value: 7253 },
];

const COLORS = ['#FF0000', '#FFA500', '#808080', '#00FF00'];

const ChartWidget = () => (
  <Card style={{ height: '200px' }}>
    <CardContent>
      <Typography variant="h6">Risk Assessment</Typography>
      <PieChart width={180} height={180}>
        <Pie
          data={data}
          cx={90}
          cy={90}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </CardContent>
  </Card>
);

export default ChartWidget;
