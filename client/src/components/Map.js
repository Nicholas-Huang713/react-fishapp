import React, {useState} from 'react';
import '../App.css';
import ReactMapGl, {GeolocateControl, Marker} from 'react-map-gl';

const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: 10
};

const fishStyle = {
  width: "40px",
  height: "auto"
}

function Map() {
  const [viewport, setViewport] = useState({
    latitude: 33.985736,
    longitude: -117.818969,
    zoom: 10,
    width: "100vw",
    height: "100vh"
  })
  const [markers, setMarkers] = useState([])
  const [draggable, setDraggable] = useState()
  const [events, setEvents] = useState({})
  const handleClick = (({lngLat: [longitude, latitude]}) => 
    setMarkers(markers => [{longitude, latitude}])); 
  


  return (
    <div>
      <ReactMapGl 
        // onClick={handleClick}
        {...viewport} mapboxApiAccessToken="pk.eyJ1Ijoibmh1YW5nNzEzIiwiYSI6ImNrOG9jOG1tZzE3bWszZm53enI2aDUza2QifQ.F2xJPRVWhz908h2nQhuTqg"
        mapStyle="mapbox://styles/nhuang713/ck8s1ki8t08fc1iqj0yerkni8"
          onViewportChange={viewport => {
            setViewport(viewport);
          }}
        
      >
      <GeolocateControl
        style={geolocateStyle}
        positionOptions={{enableHighAccuracy: true}}
        trackUserLocation={true}
        showUserLocation={false}
      />
      
      {markers.length
        ? markers.map((m, i) => ( 
            <Marker {...m} key={i}>
              <img style={fishStyle} src="https://cdn.iconscout.com/icon/premium/png-256-thumb/fish-1524088-1289766.png" alt="fish"/>
              {` ${m.longitude}, ${m.latitude}`}
            </Marker>
          ))
        : null}

      </ReactMapGl>
    </div>
  );
}

export default Map;
