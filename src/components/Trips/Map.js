import React from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import { useMemo } from "react";

const TripMap = props => {
  const { multiple = false, travelMap = null } = props;

  const center = useMemo(() => {
    if (multiple) {
      return {
        lat: travelMap[0].coordinates[1],
        lng: travelMap[0].coordinates[0]
      };
    } else {
      return {
        lat: props.center[1],
        lng: props.center[0]
      };
    }
  }, [props, multiple, travelMap]);

  return (
    <div className="map-block ml20 mr20">
      {multiple ? (
        <GoogleMapReact
          bootstrapURLKeys={{ key: props.ApiKey }}
          defaultCenter={center}
          defaultZoom={props.zoom}
          options={{ fullscreenControl: false }}
        >
          {travelMap &&
            travelMap.map((co, i) => {
              return (
                <Marker
                  key={i}
                  lat={co.coordinates[1]}
                  lng={co.coordinates[0]}
                />
              );
            })}
        </GoogleMapReact>
      ) : (
          <GoogleMapReact
            bootstrapURLKeys={{ key: props.ApiKey }}
            defaultCenter={center}
            defaultZoom={props.zoom}
          >
            <Marker lat={center.lat} lng={center.lng} />
          </GoogleMapReact>
        )}
    </div>
  );
};

export default TripMap;
