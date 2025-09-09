import React, { useCallback, useEffect, useRef, useState } from "react";
import "./styles.css";
import {
  YMap,
  YMapComponentsProvider,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapListener,
  YMapFeature,
  YMapCollection,
  YMapControls,
  YMapGeolocationControl,
  YMapZoomControl,
  YMapHint,
  YMapDefaultMarker,
  YMapContainer,
  YMapControlButton,
  YMapCustomClusterer,
  YMapMarker,
} from "ymap3-components";
import { location as LOCATION, features, apiKey, points } from "./helpers";

const MapLocation = ({ location }) => {
  return (
    <div className="map-info">
      <div className="map-info-header">Center</div>
      <div className="map-info-text">lat: {location.center[0].toFixed(2)}</div>
      <div className="map-info-text">long: {location.center[1].toFixed(2)}</div>
      <div className="map-info-header">Zoom</div>
      <div className="map-info-text">zoom: {location.zoom.toFixed(2)}</div>
    </div>
  );
};

function App() {
  const [location, setLocation] = useState(LOCATION);
  const ymap3Ref = useRef();

  const onUpdate = React.useCallback(({ location, mapInAction }) => {
    if (!mapInAction) {
      setLocation({
        center: location.center,
        zoom: location.zoom,
      });
    }
  }, []);

  const getHint = useCallback((object) => object?.properties?.hint, []);

  const zoomIn = useCallback(() => {
    setLocation((location) => {
      const newLocation = {
        ...location,
        zoom: location.zoom + 1,
      };

      return newLocation;
    });
  }, []);

  const zoomOut = useCallback(() => {
    setLocation((location) => {
      const newLocation = {
        ...location,
        zoom: location.zoom - 1,
      };

      return newLocation;
    });
  }, []);

  const marker = useCallback(
    (feature) => (
      <YMapDefaultMarker coordinates={feature.geometry.coordinates} />
    ),
    []
  );

  const cluster = useCallback(
    (coordinates, features) => (
      <YMapMarker coordinates={coordinates}>
        <span
          style={{
            borderRadius: "50%",
            background: "var(--primary-color)",
            color: "white",
            width: 42,
            height: 42,
            outline: "solid 3px var(--primary-color)",
            outlineOffset: "3px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {features.length}
        </span>
      </YMapMarker>
    ),
    []
  );

  return (
    <div className="App">
      {/* <MapLocation location={location} /> */}
      <YMapComponentsProvider apiKey={apiKey} lang="ru_RU">
        
          <YMap location={{ center: [30.3158, 59.9343], zoom: 12 }}>
            <YMapDefaultSchemeLayer />
            <YMapDefaultFeaturesLayer />
            <YMapMarker coordinates={[30.3158, 59.9343]} />
            <YMapZoomControl />
          </YMap>
       
      </YMapComponentsProvider>
    </div>
  );
}

export default App;
