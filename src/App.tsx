import React, { useEffect, useState } from "react";
import "./App.scss";
import styled from "styled-components";

const StyledTable = styled.table`
  tbody {
    tr {
      td:nth-child(1) {
        text-align: end;
        padding-right: 0.25rem;
      }
      td:nth-child(2) {
        text-align: start;
        padding-left: 0.25rem;
      }
    }
  }
`;

function App() {
  interface Coordinates {
    accuracy: number;
    latitude: number;
    longitude: number;
  }

  const [currentCoords, setCurrentCoords] = useState<Coordinates>({
    accuracy: 0,
    latitude: 0,
    longitude: 0,
  });
  const [watchCoords, setWatchCoords] = useState<Coordinates>({
    accuracy: 0,
    latitude: 0,
    longitude: 0,
  });
  const [loadingCurrent, setLoadingCurrent] = useState(true);
  const [loadingWatch, setLoadingWatch] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((currentPosition) => {
      console.log("getCurrentPosition", currentPosition);
      setCurrentCoords(currentPosition.coords);
      setLoadingCurrent(false);
    });
  });

  useEffect(() => {
    navigator.geolocation.watchPosition((watchPosition) => {
      console.log("watchPosition", watchPosition);
      setWatchCoords(watchPosition.coords);
      setLoadingWatch(false);
    });
  });

  loadingCurrent === false
    ? console.log("currentCoords", currentCoords)
    : console.log("Loading...");

  return (
    <div className="App">
        {!loadingCurrent ? (
          <div>
            <p>getCurrentPosition</p>
            <StyledTable>
              <tbody>
                <tr>
                  <td>accuracy</td>
                  <td>{currentCoords.accuracy}</td>
                </tr>
                <tr>
                  <td>latitude</td>
                  <td>{currentCoords.latitude}</td>
                </tr>
                <tr>
                  <td>longitude</td>
                  <td>{currentCoords.longitude}</td>
                </tr>
              </tbody>
            </StyledTable>
          </div>
        ) : (
          <p>Loading Current...</p>
        )}
        <br />
        {!loadingWatch ? (
          <div>
            <p>watchPosition</p>
            <StyledTable>
              <tbody>
                <tr>
                  <td>accuracy</td>
                  <td>{watchCoords.accuracy}</td>
                </tr>
                <tr>
                  <td>latitude</td>
                  <td>{watchCoords.latitude}</td>
                </tr>
                <tr>
                  <td>longitude</td>
                  <td>{watchCoords.longitude}</td>
                </tr>
              </tbody>
            </StyledTable>
          </div>
        ) : (
          <p>Loading Watch...</p>
        )}
    </div>
  );
}

export default App;
