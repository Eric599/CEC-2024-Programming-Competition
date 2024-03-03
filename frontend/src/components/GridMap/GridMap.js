import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { HeatMapGrid } from 'react-grid-heatmap'
import DateSelector from '../DateSelector'

const DATE_URL = "http://localhost:5000/api/get-day";

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
function hslToRgb(h, s, l) {
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
function numberToColorHsl(i) {
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

const GRID_ROWS = 100;
const GRID_COLS = 100;

export default function GridMap() {
  const [xLabels, setXLabels] = useState([]);
  const [yLabels, setYLabels] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [displayMap, setDisplayMap] = useState(true)

  const [day, setDay] = useState(1);

  const processGraphData = (data) => {
    setXLabels(Array(GRID_COLS).fill().map((_, i) => i));
    setYLabels(Array(GRID_ROWS).fill().map((_, i) => i));

    // Once we know the dimensions of the map,
    // we can start populating each cell's data


    /*let cellDataArr = new Array(GRID_ROWS)
      .fill(0)
      .map(() =>
        new Array(GRID_COLS)
          .fill(0)
      );*/

    // Set the data array as the world array
    let dataArr = data["world"]; //.map((x) => parseInt(x));

    // Set the position of the rig in the world array
    var rigStr = data["computed_map"].replace("[", "").replace("]", "");
    var rigPos = rigStr.split(",").map(Number)
    //var rigPos = data["computed_map"].map((x) => parseInt(x))
    //console.log(typeof(rigPos[1]))
    dataArr[rigPos[0]][rigPos[1]] = 150;

    console.log(dataArr)


    // Iterate through the data again to place each
    // cell's data into their respective location.
    /*data
      .forEach(entry => {
        // const location = entry['SK'].split('#')[1];
        // const idx = parseLocationStr(location);
        // if (idx[0] < 0 || idx[1] < 0) return;

        // const agroScore = parseInt(entry['agroScore']);
        dataArr[idx[0]][idx[1]] = 0;
        //cellDataArr[idx[0]][idx[1]] = entry;
      })*/

    // Store the new graph and cell data
    setGraphData(dataArr);
    // setCellData(cellDataArr);
  }

  useEffect(() => {
    if (day) {
      axios
        .get(`${DATE_URL}?day=${day}`)
        .then((response) => {
          processGraphData(response.data);
          setDisplayMap(true);
        });
    }
  }, [day, setDisplayMap])

  return (
    <React.Fragment>
      <DateSelector onSelection={setDay} />
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {displayMap ? (
          <HeatMapGrid
            data={graphData}
            xLabels={xLabels}
            yLabels={yLabels}
            cellRender={(x, y, value) => (
              <div title={`Cell ${x}, ${y}`}>{value}</div>
            )}
            xLabelsStyle={() => ({
              color: "transparent",
              fontSize: ".25rem"
            })}
            yLabelsStyle={() => ({
              color: "transparent",
              fontSize: ".25rem"
            })}
            cellStyle={(_x, _y, ratio) => ({
              background: `${numberToColorHsl(150 - (graphData[_x][_y] * 50))}`,
              fontSize: ".1rem",
              color: `rgb(0, 0, 0, 1)`
            })}
            cellHeight="0.65rem"
            xLabelsPos="bottom"
            square
          />
        ) : (
          <p>Please select a day or compute using new parameters.</p>
        )}
      </div>
    </React.Fragment>
  )
}
