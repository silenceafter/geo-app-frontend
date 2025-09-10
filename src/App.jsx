import React, { useCallback, useEffect, useRef, useState, useMemo, useContext } from "react";
import "./styles.css";
/*import {
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
  YMapClusterer,
  YMapMarker,
} from "ymap3-components";*/

/*import {
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
  YMapClusterer,
  YMapMarker,
} from "ymap3-components";*/

import { apiKey, YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapMarker,
  YMapZoomControl, YMapContainer,
reactify, YMapClusterer, clusterByGrid, YMapHint, YMapHintContext } from "./helpers";

// Словарь названий
const NAMES = {
  'адмиралтейская': 'Адмиралтейская',
  'невский проспект': 'Невский проспект',
  'чёрная речка': 'Чёрная речка',
  'купчино': 'Купчино',
  'приморская': 'Приморская',
  'петроградская': 'Петроградская',
};

// Функция для подсветки при наведении
function useHover() {
  const [hoveredId, setHoveredId] = useState(null);
  return {
    hoveredId,
    onMouseOver: (id) => setHoveredId(id),
    onMouseOut: () => setHoveredId(null),
  };
}

function MyHint() {
  const ctx = React.useContext(YMapHintContext);
  return <div className="my-hint">{ctx && ctx.hint}</div>;
}

function App() {
  const [mounted, setMounted] = useState(false);
  const { hoveredId, onMouseOver, onMouseOut } = useHover();
  const [hoverMarkers, setHoverMarkers] = useState({});

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!apiKey) {
    return <div>Ошибка: API-ключ не задан</div>;
  }

  // Функция отрисовки метки
  const marker = (feature) => {
    if (!feature?.geometry?.coordinates) return null;

    const id = feature.id;
    const isHovered = hoveredId === id;

    return (
      <YMapMarker 
        key={feature.id} 
        coordinates={feature.geometry.coordinates} 
        onMouseOver={() => markerMouseOver(id)}
        onMouseOut={() => markerMouseOut(id)} 
      >
        <div
          className="marker-container"
                   
          style={{
            cursor: 'pointer',
          }}
        >
          <div
            className={`marker-text ${hoverMarkers[id] ? 'visible' : 'hidden'}`}
            style={{
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.2s',
              backgroundColor: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold',
              position: 'absolute',
              top: '-28px',
              whiteSpace: 'nowrap',
            }}
          >
            {NAMES[feature.id]}
          </div>
          <div
            className="marker"
            style={{
              width: '16px',
              height: '16px',
              background: isHovered ? 'red' : 'blue',
              borderRadius: '50%',
              border: '2px solid white',
              transition: 'background 0.2s',
            }}
          />
        </div>
      </YMapMarker>
    );
  };

  // Функция отрисовки кластера
  const cluster = (coordinates, clusterFeatures) => (
    <YMapMarker coordinates={coordinates}>
      <div
        style={{
          background: 'red',
          color: 'white',
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 'bold',
          boxShadow: '0 0 4px rgba(0,0,0,0.4)',
        }}
      >
        {clusterFeatures.length}
      </div>
    </YMapMarker>
  );

  const features = [
    { type: 'Feature', id: 'адмиралтейская', geometry: { type: 'Point', coordinates: [30.3158, 59.9343] }, properties: { name: 'marker', description: '' } },
    { type: 'Feature', id: 'невский проспект', geometry: { type: 'Point', coordinates: [30.3200, 59.9400] }, properties: { name: 'marker', description: '' } },
    { type: 'Feature', id: 'чёрная речка', geometry: { type: 'Point', coordinates: [30.248967, 59.983375] }, properties: { name: 'marker', description: '' } },
    { type: 'Feature', id: 'купчино', geometry: { type: 'Point', coordinates: [30.3800, 59.8900] }, properties: { name: 'marker', description: '' } },
    { type: 'Feature', id: 'приморская', geometry: { type: 'Point', coordinates: [30.1900, 59.9500] }, properties: { name: 'marker', description: '' } },
    { type: 'Feature', id: 'петроградская', geometry: { type: 'Point', coordinates: [30.3000, 59.9600] }, properties: { name: 'marker', description: '' } },
  ];

  const gridSizedMethod = useMemo(() => clusterByGrid({gridSize: 64}), []);
  const getHint = useCallback((object) => object && object.properties && object.properties.hint, []);

  const markerMouseOver = useCallback((id) => {
    console.log('Наведение на:', id);
    setHoverMarkers((state) => ({
        ...state,
        [id]: true
    }));
}, []);

const markerMouseOut = useCallback((id) => {
    setHoverMarkers((state) => ({
        ...state,
        [id]: false
    }));
}, []);

  return (
    <div className="App">
      {/*<MapLocation location={{center: [30.3158, 59.9343], zoom: 12}} />*/}
    
        {mounted && (
          
            <YMap location={{ center: [30.3158, 59.9343], zoom: 12 }} showScaleInCopyrights={true}>
              <YMapDefaultSchemeLayer />
              <YMapDefaultFeaturesLayer />

              <YMapClusterer marker={marker} cluster={cluster} method={ gridSizedMethod } features={features} />

              <YMapHint hint={getHint}>
                123
              </YMapHint>
              {/*<YMapMarker coordinates={[reactify.useDefault([30.3158, 59.9343])]} />
              <YMapMarker coordinates={reactify.useDefault([59.983375, 30.248967])} draggable={true}  />*/}
            </YMap>

        )}

    </div>
  );
}

export default App;
