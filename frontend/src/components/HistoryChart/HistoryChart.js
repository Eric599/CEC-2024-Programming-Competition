import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';

import Title from '../Title';

const historyURL = "http://localhost:5000/get-history";
const dateURL = "http://localhost:5000/get-dates";

export default function HistoryChart() {
  const theme = useTheme();

  const [chartData, setChartData] = useState([]);

  const fetchData = () => {
    axios
      .get(dateURL)
      .then((resp1) => {
        const dates = resp1.data
          .map(val => parseInt(val))
          .sort(function (a, b) { return a - b });

        let data = [];
        dates
          .forEach(date => {
            axios
              .get(`${historyURL}?day=${date}`)
              .then((resp2) => {
                data.push({ date: date, nAlerts: resp2.data })
              })
          });

        console.log(data)

        setChartData(data);
      })
      .catch((err) => {
        console.log(err)
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Title>Grid Alerts vs. Date</Title>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        <LineChart
          dataset={chartData}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              label: 'Day',
              scaleType: 'point',
              dataKey: 'date',
              tickNumber: 1,
              tickLabelStyle: theme.typography.body2,
            },
          ]}
          yAxis={[
            {
              label: 'Number of Alert Grids',
              labelStyle: {
                ...theme.typography.body1,
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2,
              tickNumber: 3,
            },
          ]}
          series={[
            {
              dataKey: 'nAlerts',
              showMark: false,
              color: theme.palette.primary.light,
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
            [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translateX(-25px)',
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}
