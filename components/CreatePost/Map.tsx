import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useCallback, memo, useEffect } from "react";
import Input, { Modal } from "antd";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";

// Please be a decent human and don't abuse my Mapbox API token.
// If you fork this sandbox, replace my API token with your own.
// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const mapAccess = {
  mapboxApiAccessToken: process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN,
};

const Map = ({ isModalMapVisible, setIsModalMapVisible }) => {
  const [viewport, setViewport] = useState({});
  const [isFirstRender, setIsFirstRender] = useState(false);
  const mapRef = useRef();
  const handleViewportChange = useCallback((newViewport) => {
    if (newViewport) {
      setViewport(newViewport);
    }
  }, []);

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  useEffect(() => {
    if (isFirstRender && isModalMapVisible) {
      mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN;
      const map = new mapboxgl.Map({
        container: "map",
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: "mapbox://styles/mapbox/streets-v11",
        country: "vn",
        center: [10.762622, 70],
        zoom: 8,
      });

      // Add the control to the map.
      map?.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
        })
      );
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        })
      );
      
    }
    setIsFirstRender(true);
  }, [isFirstRender, isModalMapVisible]);
  const handleOk = () => {
    setIsModalMapVisible(false);
  };
  const handleCancel = () => {
    setIsModalMapVisible(false);
  };
  return (
    <Modal
      visible={isModalMapVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={700}
    >
      <div ref={mapRef} id="map" style={{ height: 500, width: "100%" }}></div>
    </Modal>
  );
};
export default memo(Map);
