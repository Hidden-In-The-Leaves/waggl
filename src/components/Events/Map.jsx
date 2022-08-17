import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";

export default function MapContainer() {
  const defaultAddress = "1600 Pennsylvania Ave NW, Washington DC";
  const [location, setLocation] = useState({ lat: 80.3036, lng: 25.9861 });
  const getLongLat = async () => {
    axios
      .get(
        `http://api.positionstack.com/v1/forward?access_key=668e77a4799ab05a22e61b5b4c091091&query=
        ${defaultAddress}`,
      )
      //         `http://api.positionstack.com/v1/forward?access_key=668e77a4799ab05a22e61b5b4c091091&query=1600 Pennsylvania Ave NW, Washington DC`
      .then((res) => {
        console.log(res);
        const latLong = res.data.data[0];
        setLocation({
          lat: Number(latLong.latitude),
          lng: Number(latLong.longitude),
        });
      });
  };

  useEffect(() => {
    console.log('useEffect works?');
    getLongLat();
  }, []);

  const mapStyles = {
    height: '300px',
    width: '90%',
    borderRadius: '10px',
    margin: 'auto',
  };

  return (
    <div>
      <LoadScript googleMapsApiKey="AIzaSyAfaj6aj4gxuycRj3EPk53hdaYVykgfrZ4">
        <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={location}>
          {location.lat && <Marker position={location} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
