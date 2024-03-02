import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { HeatMapGrid } from 'react-grid-heatmap'
import DateSelector from '../DateSelector'

const baseURL = "http://localhost:5000/get-by-date";

/**
 * The below color calculation code has been taken from the following
 * 
 * https://stackoverflow.com/questions/17525215/calculate-color-values-from-green-to-red
 * http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
 *
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb (h, s, l) {
  var r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
}

// convert a number to a color using hsl
function numberToColorHsl (i) {
  // as the function expects a value between 0 and 1, and red = 0° and green = 120°
  // we convert the input to the appropriate hue value
  if (i <= 0) i = 1;
  var hue = i * 1.2 / 360;
  // we convert hsl to rgb (saturation 100%, lightness 50%)
  var rgb = hslToRgb(hue, 1, 0.5);
  // we format to css value and return
  const str = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
  return str;
}

const parseLocationStr = (loc) => {
  // Location strings are in the format
  // A1 A2 A3 ...
  // B1 B2
  // C1
  // ...

  // Returns the UTF character code of the letter
  // at index 0 and subtracts 65 to normalize around 0.
  const rowIdx = loc.charCodeAt(0) - 65;

  // Returns an array of all integer values
  // in the location string, this will be our column.
  const colNums = loc.match(/\d+/g);

  return [rowIdx, (colNums) ? parseInt(colNums[0]) : -1]
}

const displayCellData = (cell) => {
  return `Location: ${cell['SK'].split('#')[1]}\n\tTemperature: ${cell['temp']}\n\tAir Quality Index: ${cell['aqi']}\n\tpH: ${cell['ph']}\n\tHumididty: ${cell['humidity']}`
}

export default function GridMap({ gridMapData }) {
  const [xLabels, setXLabels] = useState([]);
  const [yLabels, setYLabels] = useState([]);
  const [graphDate, setGraphDate] = useState('');
  const [graphData, setGraphData] = useState([]);
  const [cellData, setCellData] = useState([]);

  const processGraphData = (data) => {
    let xLabelArr = [];
    let yLabelArr = [];

    let locStr, locChars, letter, number;

    // Perform an initial first pass to populate
    // the label arrays.
    data
      .forEach(entry => {
        locStr = entry['SK'].split('#')[1]
        locChars = locStr.split('')
        letter = locChars[0];
        number = locChars[1];

        // Populate the label arrays
        if (!yLabelArr.includes(letter)) {
          yLabelArr.push(letter);
        }

        if (!xLabelArr.includes(number)) {
          xLabelArr.push(number);
        }
      });

    // Sort label arrays so they are in the proper order
    setXLabels(xLabelArr.sort(function (a, b) { return a - b }));
    setYLabels(yLabelArr.sort());

    // Once we know the dimensions of the map,
    // we can start populating each cell's data
    let dataArr = new Array(yLabelArr.length)
      .fill(0)
      .map(() =>
        new Array(xLabelArr.length)
          .fill(0)
      );

    let cellDataArr = new Array(yLabelArr.length)
      .fill(0)
      .map(() =>
        new Array(xLabelArr.length)
          .fill(0)
      );

    let alertGrids = [];

    // Iterate through the data again to place each
    // cell's data into their respective location.
    data
      .forEach(entry => {
        const location = entry['SK'].split('#')[1];
        const idx = parseLocationStr(location);
        if (idx[0] < 0 || idx[1] < 0) return;

        const agroScore = parseInt(entry['agroScore']);
        if (agroScore >= 150) alertGrids.push(location);
        dataArr[idx[0]][idx[1]] = agroScore;
        cellDataArr[idx[0]][idx[1]] = entry;
      })

    // Store the new graph and cell data
    setGraphData(dataArr);
    setCellData(cellDataArr);
  }
  
  return (
    <React.Fragment>
      {graphDate ? (
        <HeatMapGrid
          data={graphData}
          xLabels={xLabels}
          yLabels={yLabels}
          cellRender={(x, y, value) => (
            <div title={`Cell ${cellData[x][y]['SK'].split('#')[1]}: Agro Score ${cellData[x][y]['agroScore']}`}>{value}</div>
          )}
          xLabelsStyle={index => ({
            color: index % 2 ? "transparent" : "#777",
            fontSize: ".65rem"
          })}
          yLabelsStyle={() => ({
            fontSize: ".65rem",
            textTransform: "uppercase",
            color: "#777"
          })}
          cellStyle={(_x, _y, ratio) => ({
            background: `${numberToColorHsl(150 - graphData[_x][_y])}`,
            fontSize: ".7rem",
            color: `rgb(0, 0, 0, 1)`
          })}
          cellHeight="1.5rem"
          xLabelsPos="bottom"
          onClick={(x, y) => alert(`${displayCellData(cellData[x][y])}`)}
        />
      ) : (
        <p>Please select a date or upload new data.</p>
      )}
    </React.Fragment>
  )
}
