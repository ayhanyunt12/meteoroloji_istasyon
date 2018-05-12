/* eslint-disable array-callback-return,react/jsx-closing-tag-location,react/forbid-prop-types */
import React from 'react';
import {compose, withProps} from 'recompose';
import {
    GoogleMap,
    Marker,
    withGoogleMap,
    withScriptjs,
} from 'react-google-maps';


const getMarker = (stations, draggable, onChange, onMarkerClick) => stations.map(station => {
    return (<Marker
        key={station.id}
        position={{
            lat: parseFloat(station.latd),
            lng: parseFloat(station.lang)
        }}
        draggable={draggable}
        onDragEnd={(e) => {
            onChange(e.latLng.lng(), e.latLng.lat())
        }}
        onClick={() => onMarkerClick(station.id)}
    />);

});

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAerE8NWgLqa8ZXNIChTqofG-uXxn0en0k&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `400px`}}/>,
        mapElement: <div style={{height: `100%`}}/>,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    (<GoogleMap
        defaultZoom={6}
        defaultCenter={{lat: 39.746345, lng: 35.392203}}
    >
        {getMarker(props.stations, props.draggable, props.onChange, props.onMarkerClick)}
    </GoogleMap>)
);

const MapComponent = (props) => {
    if (!props.stationFetched) {
        return null;
    }
    return (
        <MyMapComponent
            stations={props.stations}
            draggable={props.draggable}
            onChange={props.onChange}
            onMarkerClick={props.onMarkerClick}
        />
    )

};


export default MapComponent;