import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DateSelector({ onSelection }) {
  const dates = Array(30).fill().map((_, i) => i + 1)
  const [date, setDate] = useState(1);

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
        <InputLabel id="date-selector-label">Day</InputLabel>
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