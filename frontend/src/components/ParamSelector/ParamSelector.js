import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';

const RESOURCE_ERROR = "Select at least 1 resource";
const PRESERVES_ERROR = "Select at least 1 preserve";

export default function ParamSelector({ onComputeMap }) {
  const [resourceState, setResourceState] = React.useState({
    oil: false,
    helium: false,
    metal: false,
    resource_ship: false,
  });

  const [preservesState, setPreservesState] = React.useState({
    algal: false,
    coral: false,
    species: false,
    preserve_ship: false,
  });

  const handleResourceChange = (event) => {
    setResourceState({
      ...resourceState,
      [event.target.name]: event.target.checked,
    });
  };

  const handlePreservesChange = (event) => {
    setPreservesState({
      ...preservesState,
      [event.target.name]: event.target.checked,
    });
  };

  const { oil, helium, metal, resource_ship } = resourceState;
  const { algal, coral, species, preserve_ship } = preservesState;
  const resource_error = [oil, helium, metal, resource_ship].filter((v) => v).length < 1;
  const preserves_error = [algal, coral, species, preserve_ship].filter((v) => v).length < 1;

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl
        required
        error={resource_error}
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
      >
        <FormLabel component="legend">Pick one resource</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={oil}
                onChange={handleResourceChange}
                name="oil" />
            }
            label="Oil"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={helium}
                onChange={handleResourceChange}
                name="helium" />
            }
            label="Helium"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={metal}
                onChange={handleResourceChange}
                name="metal" />
            }
            label="Metal"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={resource_ship}
                onChange={handleResourceChange}
                name="resource_ship" />
            }
            label="Ship"
          />
        </FormGroup>
        <FormHelperText>{RESOURCE_ERROR}</FormHelperText>
      </FormControl>

      <FormControl
        required
        error={preserves_error}
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
      >
        <FormLabel component="legend">Pick one preservation</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={algal}
                onChange={handlePreservesChange}
                name="algal" />
            }
            label="Algal"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={coral}
                onChange={handlePreservesChange}
                name="coral" />
            }
            label="Coral"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={species}
                onChange={handlePreservesChange}
                name="species" />
            }
            label="Species"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={preserve_ship}
                onChange={handlePreservesChange}
                name="preserve_ship" />
            }
            label="Ship"
          />
        </FormGroup>
        <FormHelperText>{PRESERVES_ERROR}</FormHelperText>
      </FormControl>

      <Button
        variant="contained"
        onClick={() => {
          onComputeMap(resourceState, preservesState);
        }}
      >Compute Map</Button>
    </Box>
  );
}