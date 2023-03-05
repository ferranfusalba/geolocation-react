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

interface Coordinates {
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number | null;
  longitude: number | null;
  speed: number | null;
}

function App() {
  const [currentCoords, setCurrentCoords] = useState<Coordinates>({
    accuracy: 0,
    altitude: 0,
    altitudeAccuracy: 0,
    heading: 0,
    latitude: 0,
    longitude: 0,
    speed: 0,
  });
  const [watchCoords, setWatchCoords] = useState<Coordinates>({
    accuracy: 0,
    altitude: 0,
    altitudeAccuracy: 0,
    heading: 0,
    latitude: 0,
    longitude: 0,
    speed: 0,
  });
  const [loadingCurrent, setLoadingCurrent] = useState(true);
  const [loadingWatch, setLoadingWatch] = useState(true);
  const options: PositionOptions = {
    enableHighAccuracy: true,
    maximumAge: 0,
  };

  useEffect(() => {
    function success(successCallback: GeolocationPosition) {
      setCurrentCoords(successCallback.coords);
      setLoadingCurrent(false);
    }
    
    function error(error: GeolocationPositionError) {
      console.log("error");
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  });

  useEffect(() => {
    function success(successCallbackWatch: GeolocationPosition) {
      setWatchCoords(successCallbackWatch.coords);
      setLoadingWatch(false);
    }
    
    function error(error: GeolocationPositionError) {
      console.log("error");
    }

    navigator.geolocation.watchPosition(success, error, options);
  });

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
                <td>altitude</td>
                <td>{currentCoords.altitude}</td>
              </tr>
              <tr>
                <td>altitudeAccuracy</td>
                <td>{currentCoords.altitudeAccuracy}</td>
              </tr>
              <tr>
                <td>heading</td>
                <td>{currentCoords.heading}</td>
              </tr>
              <tr>
                <td>latitude</td>
                <td>{currentCoords.latitude}</td>
              </tr>
              <tr>
                <td>longitude</td>
                <td>{currentCoords.longitude}</td>
              </tr>
              <tr>
                <td>speed (km/h)</td>
                <td>
                  {currentCoords.speed !== null
                    ? Math.round((currentCoords.speed * 3.6) * 100) / 100
                    : currentCoords.speed}
                </td>
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
                <td>altitude</td>
                <td>{watchCoords.altitude}</td>
              </tr>
              <tr>
                <td>altitudeAccuracy</td>
                <td>{watchCoords.altitudeAccuracy}</td>
              </tr>
              <tr>
                <td>heading</td>
                <td>{watchCoords.heading}</td>
              </tr>
              <tr>
                <td>latitude</td>
                <td>{watchCoords.latitude}</td>
              </tr>
              <tr>
                <td>longitude</td>
                <td>{watchCoords.longitude}</td>
              </tr>
              <tr>
                <td>speed (m/s)</td>
                <td>
                  {watchCoords.speed !== null
                    ? Math.round(watchCoords.speed * 100) / 100
                    : watchCoords.speed}
                </td>
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
