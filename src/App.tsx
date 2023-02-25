import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from 'styled-components'

const StyledTable = styled.table`
  tbody {
    tr {
      td:nth-child(1) {
        text-align: end;
        padding-right: .25rem;
      }
      td:nth-child(2) {
        text-align: start;
        padding-left: .25rem;
      }
    }
  }
`

function App() {
  interface Coordinates {
    accuracy: number;
    latitude: number;
    longitude: number;
  }

  const [coords, setCoords] = useState<Coordinates>({
    accuracy: 0,
    latitude: 0,
    longitude: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.watchPosition((position) => {
      console.log("position", position);
      setCoords(position.coords);
      setLoading(false);
    });
  }, []);

  loading === false ? console.log("coords", coords) : console.log("Loading...");

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {!loading ? (
          <StyledTable>
            <tbody>
              <tr>
                <td>accuracy</td>
                <td>{coords.accuracy}</td>
              </tr>
              <tr>
                <td>latitude</td>
                <td>{coords.latitude}</td>
              </tr>
              <tr>
                <td>longitude</td>
                <td>{coords.longitude}</td>
              </tr>
            </tbody>
          </StyledTable>
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  );
}

export default App;
