import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface LineChartComponentProps {
  data?: {
    name: string;
    temp: number;
    humidity: number;
    pressure: number;
  }[];
}

class LineChartComponent extends PureComponent<LineChartComponentProps> {
  render() {
    const { data } = this.props;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={300}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: "Pressure", angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="humidity" stroke="#8884d8" activeDot={{ r: 16 }} />
          <Line type="monotone" dataKey="temp" stroke="#82ca9d" />
          
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default LineChartComponent;
