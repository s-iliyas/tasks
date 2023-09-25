import { useEffect, useState } from "react";
import LeafletComponent from "./components/LeafletComponent";
import { Button, Drawer, Input } from "antd";
import getAddress from "./hooks/getAddress";
import getCoords from "./hooks/getCoords";

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [center, setCenter] = useState([]);

  let MIN_ACCEPTABLE_ACCURACY = 20; // Minimum accuracy in metres that is acceptable as an "accurate" position

  const positionHandler = async (position) => {
    if (position.coords.accuracy > MIN_ACCEPTABLE_ACCURACY) {
      const address = await getAddress(
        position.coords.latitude,
        position.coords.longitude
      );
      console.log(address);
      setState(address.state);
      setCountry(address.country);
      setShowForm(true);
    } else {
      setCenter([position.coords.latitude, position.coords.longitude]);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      positionHandler,
      function (error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.error("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.error("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            console.error("An unknown error occurred.");
            break;
        }
      },
      {
        timeout: 30000, // Report error if no position update within 30 seconds
        maximumAge: 30000, // Use a cached position up to 30 seconds old
        enableHighAccuracy: true, // Enabling high accuracy tells it to use GPS if it's available
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!navigator.geolocation) return;

  const handleSubmit = async () => {
    const latlng = await getCoords(
      address1 +
        "," +
        address2 +
        "," +
        city +
        "," +
        state +
        "," +
        country +
        "," +
        zipCode
    );
    setCenter(latlng);
    setShowForm(false);
  };

  return (
    <div>
      {center.length > 0 && <LeafletComponent userLocation={center} />}
      <Drawer
        title="Enter your location"
        placement={"bottom"}
        closable={false}
        onClose={() => {
          setShowForm(false);
        }}
        height={500}
        open={showForm}
      >
        <form style={{ height: "100%", flexWrap: "wrap" }}>
          <div style={{ margin: "2px" }}>
            <small>Address Line 1:</small>
            <Input
              name="address line 1"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
            />
          </div>
          <div style={{ margin: "2px" }}>
            <small>Address Line 2:</small>
            <Input
              name="address line 2"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
            />
          </div>
          <div style={{ margin: "2px" }}>
            <small>City:</small>
            <Input
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div style={{ margin: "2px" }}>
            <small>State:</small>
            <Input
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div style={{ margin: "2px" }}>
            <small>Country:</small>
            <Input
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div style={{ margin: "2px" }}>
            <small>Zip Code:</small>
            <Input
              name="zip"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
          <br />
          <Button
            style={{ margin: "2px" }}
            type="submit"
            onClick={handleSubmit}
          >
            Add Address
          </Button>
        </form>
      </Drawer>
    </div>
  );
};

export default App;
