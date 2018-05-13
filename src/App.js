/* eslint-disable react/forbid-prop-types */
/* eslint react/prop-types: 0 */

import React from 'react';
import {connect} from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import {createStation, deleteStation, fetchStationData, fetchStations, updateStation} from "./js/actions/stationAction";
import WeatherReportComponent from "./js/component/WeatherReportComponent"
import MapComponent from "./js/component/MapComponent"
import StationTableComponent from "./js/component/StationTableComponent"

/**
 * for connect component to store
 * @param dispatch
 * @returns {{fetchUsers: function(): *, checkUser: function(*=, *=): *, fetchPosts: function(): *}}
 */
const mapDispatchToProps = dispatch => ({
    fetchStations: () => dispatch(fetchStations()),
    createStation: (lng, lat, name) => dispatch(createStation(lng, lat, name)),
    updateStation: (name, public_id, lng, ltd) => dispatch(updateStation(name, public_id, lng, ltd)),
    deleteStation: (public_id) => dispatch(deleteStation(public_id)),
    fetchStationData: (id) => dispatch(fetchStationData(id))
});

/**
 * for connect component to store
 * @param state
 */
const mapStateToProps = state => ({
    stationFetched: state.stations.fetched,
    stations: state.stations.stations,
    error: state.stations.error,
    dataFetched: state.stations.dataFetched,
    station_data: state.stations.station_data
});

const App = (props) => {
    /**
     * attribute of store
     */
    const {stationFetched, stations, error, dataFetched, station_data} = props;
    /**
     * actions of store
     */
    const {fetchStations, createStation, updateStation, deleteStation, fetchStationData} = props;

    /**
     * if users and posts didn't fetch then fetch them
     */
    if (!stationFetched) {
        fetchStations();
    }

    if (error) {
        alert("İstasyon isimleri eşsiz olmalıdır. Farklı bir istasyon ismi girerek tekrar deneyiniz.");
    }

    const handleSaveToDB = (lng, lat, name) => {
        createStation(lng, lat, name)
    };

    const handleUpdate = (name, id, lng, ltd) => {
        updateStation(name, id, lng, ltd)
    };

    const handleDelete = (public_id) => {
        deleteStation(public_id);
    };

    const handleShowStation = (id) => {
        fetchStationData(id);
    };

    return (
        <div className="ui stackable centered grid">
            <div className="two column row">
                <div className="seven wide column">
                    <div className="ui segment" id="map-container">
                        <h3 align="center">Harita Gösterimi</h3>
                        <MapComponent
                            isHome={true}
                            stationFetched={stationFetched}
                            stations={stations}
                            draggable={false}
                            onMarkerClick={(id) => handleShowStation(id)}
                        />
                    </div>
                </div>
                <div className="seven wide column">
                    <div className="ui segment chart-container">
                        <h3 align="center">Liste Gösterimi</h3>
                        <StationTableComponent
                            stations={stations}
                            stationFetched={stationFetched}
                            handleSaveToDB={(lng, lat, name) => handleSaveToDB(lng, lat, name)}
                            handleUpdate={(name, id, lng, ltd) => handleUpdate(name, id, lng, ltd)}
                            handleDelete={(public_id) => handleDelete(public_id)}
                            handleShowStation={(id) => handleShowStation(id)}
                            error={false}
                        />
                    </div>
                </div>
            </div>
            <div className="fourteen wide column">
                <div className="ui segment">
                    <WeatherReportComponent
                        dataFetched = {dataFetched}
                        stationData = {station_data}
                        stations={stations}
                    />
                </div>
            </div>
        </div>
    );
};
const WrappedComponent = connect(mapStateToProps, mapDispatchToProps)(App);
export default WrappedComponent;