import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const baseURL = "http://localhost:5000/get-dates";

export default function DateSelector({ onSelection }) {
  const [dates, setDates] = useState([]);
  const [date, setDate] = useState('');

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        const numberDates = response.data.map(val => parseInt(val));
        setDates(numberDates.sort(function (a, b) { return a - b }));
        if (dates.length > 0) {
          updateDate(dates[0])
        }
      })
      .catch(() => {
        setDates([]);
      });
  }, []);

  const updateDate = (newDate) => {
    setDate(newDate);
    onSelection(newDate);
  }

  const handleChange = (event) => {
    updateDate(event.target.value)
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="date-selector-label">Date</InputLabel>
        <Select
          labelId="date-selector-label"
          id="date-selector"
          value={date}
          onChange={handleChange}
          label="Date"
        >
          {dates
            ?.map(d => (
              <MenuItem value={d} key={d}>{d}</MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}