/* eslint-disable react/prop-types */
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import getAddress from "../hooks/getAddress";

const LeafletComponent = ({ userLocation }) => {
  const [center, setCenter] = useState(userLocation);
  const [dragged, setDragged] = useState(false);
  const [orgLocation, setOrgLocation] = useState("");
  const [newLocation, setNewLocation] = useState("");

  const getOrgAddress = async () => {
    const address = await getAddress(...userLocation);
    setOrgLocation(address.address);
  };

  useEffect(() => {
    getOrgAddress()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const centerIcon = new L.Icon({
    iconUrl: "/center.png",
    iconSize: [35, 35],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });

  const orgIcon = new L.Icon({
    iconUrl: "/circle.png",
    iconSize: [35, 35],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });

  return (
    <MapContainer
      center={center}
      dragging
      zoom={16}
      scrollWheelZoom={false}
      style={{
        height: "400px",
        width: "1220px",
        borderRadius: "6px",
        zIndex: 0,
      }}
    >
      <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {dragged && (
        <Marker key={"center"} position={center} icon={centerIcon} draggable>
          <Popup>{newLocation}</Popup>
        </Marker>
      )}
      <Marker position={userLocation} icon={orgIcon}>
        <Popup>{orgLocation}</Popup>
      </Marker>
      <MapEvents
        setCenter={setCenter}
        setDragged={setDragged}
        setNewLocation={setNewLocation}
      />
    </MapContainer>
  );
};

const MapEvents = ({ setCenter, setDragged, setNewLocation }) => {
  useMapEvents({
    drag: (e) => {
      setDragged(true);
      const newCenter = e.target.getCenter();
      setCenter([newCenter.lat, newCenter.lng]);
    },
    dragend: async (e) => {
      const newCenter = e.target.getCenter();
      const address = await getAddress(newCenter.lat, newCenter.lng);
      setNewLocation(address.address);
    },
  });
  return null;
};

export default LeafletComponent;
