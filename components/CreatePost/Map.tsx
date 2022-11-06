import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useCallback, memo } from "react";
import { render } from "react-dom";
import MapGL from "react-map-gl";
import Geocoder from 'react-mapbox-gl-geocoder';
import Input from 'antd';

// Please be a decent human and don't abuse my Mapbox API token.
// If you fork this sandbox, replace my API token with your own.
// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const mapAccess = {
    mapboxApiAccessToken: process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN
}

const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) =>{
        if(newViewport){
            setViewport(newViewport)
        }
    },
    []
  );

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    [handleViewportChange]
  );

  const queryParams = {
    country: 'vn',
    language: 'vn'
}
const mapStyle = {
    width: '100%',
    height: 600
}
  return (
    <div style={{ height: "100vh" }}>
        <Geocoder
                    {...mapAccess} onSelected={handleViewportChange} viewport={viewport} hideOnSelect={true}
                    queryParams={queryParams} initialInputValue={""}
                    
                />
        <MapGL
                    {...mapAccess} {...viewport} {...mapStyle}
                    onViewportChange={(newViewport) => setViewport(newViewport)}
                />
    </div>
  );
};
export default memo(Map)