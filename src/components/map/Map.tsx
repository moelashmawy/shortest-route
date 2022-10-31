import { useState } from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Sphere,
  Marker,
  Line
} from "react-simple-maps";
import { GEO_URL } from "../../constants";
import { CitiesType } from "../../types/cities";

export const Map = ({ citiesCordinates }: { citiesCordinates: CitiesType }) => {
  const [showName, setShowName] = useState("");

  const markers: {
    markerOffset: number;
    name: string;
    coordinates: [number, number];
  }[] = citiesCordinates.map(([name, lat, lon]) => ({
    markerOffset: 15,
    name: name,
    coordinates: [lon, lat]
  }));

  return (
    <ComposableMap projection="geoEqualEarth" width={1600}>
      <ZoomableGroup center={[0, 0]} zoom={1}>
        <Sphere id="1" fill="white" stroke="#000" strokeWidth={2} />

        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                fill="#EAEAEC"
                stroke="#D6D6DA"
                key={geo.rsmKey}
                geography={geo}
              />
            ))
          }
        </Geographies>

        {markers.map(({ name, coordinates, markerOffset }) => (
          <Marker
            width={2}
            key={name}
            coordinates={coordinates}
            onMouseEnter={() => setShowName(name)}
            onMouseLeave={() => setShowName("")}
          >
            <circle r={1} fill="#F00" stroke="#000" strokeWidth={1} />

            {showName === name && (
              <text
                textAnchor="middle"
                y={markerOffset}
                style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
              >
                {name}
              </text>
            )}
          </Marker>
        ))}

        {markers.map((mark, idx) => {
          const from = mark.coordinates;
          const to = markers[idx + 1]?.coordinates;

          if (to) {
            return (
              <Line
                from={from}
                to={to}
                stroke="#FF5533"
                strokeWidth={0.5}
                strokeLinecap="round"
              />
            );
          }
        })}
      </ZoomableGroup>
    </ComposableMap>
  );
};
