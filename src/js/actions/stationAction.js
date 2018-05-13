import axios from "axios";

//const localUrl = "http://172.104.135.186:5000";
const localUrl = "http://127.0.0.1:5000";

export function fetchStations() {
    return function (dispatch) {
        dispatch({type: "FETCH_STATIONS"});
        const url = localUrl + '/stations';
        axios.get(url)
            .then((response) => {
                dispatch({type: "FETCH_STATIONS_FULFILLED", payload: response.data})
            })
            .catch((err) => {
                dispatch({type: "FETCH_STATIONS_REJECTED", payload: err})
            })
    }
}

export function createStation(lng, lat, name) {
    return function (dispatch) {
        dispatch({type: "CREATE_STATION"});
        const url = localUrl + '/station';
        axios.post(url, {
            name: name,
            lang: lng,
            latd: lat
        }).then((response) => {
            dispatch({type: "CREATE_STATION_FULFILLED", payload: response.data})
        }).catch((err) => {
            dispatch({type: "CREATE_STATION_REJECTED", payload: err})
        })
    }
}

export function updateStation(name, public_id, lng, ltd) {
    return function (dispatch) {
        dispatch({type: "UPDATE_STATION"});
        const url = localUrl + '/station';
        axios.put(url, {
            name: name,
            public_id: public_id,
            lang: lng,
            latd: ltd
        }).then((response) => {
            dispatch({
                type: "UPDATE_STATION_FULFILLED",
                payload: {name: name, public_id: public_id, lang: lng, latd: ltd}
            })
        }).catch((err) => {
            dispatch({type: "UPDATE_STATION_REJECTED", payload: err})
        })
    }
}

export function deleteStation(public_id) {
    return function (dispatch) {
        const url = localUrl + "/station/" + public_id;
        dispatch({type: "DELETE_STATION"});

        axios.delete(url, {
            public_id: public_id
        }).then((response) => {
            dispatch({
                type: "DELETE_STATION_FULFILLED",
                payload: {public_id: public_id}
            })
        }).catch((err) => {
            dispatch({type: "DELETE_STATION_REJECTED", payload: err})
        })
    }
}

export function fetchStationData(id) {
    return function (dispatch) {
        const url = localUrl + "/station/" + id;
        dispatch({type: "FETCH_STATION_DATA"});

        axios.get(url)
            .then((response) => {
                dispatch({type: "FETCH_STATION_DATA_FULFILLED", payload: response.data})
            })
            .catch((err) => {
                dispatch({type: "FETCH_STATION_DATA_REJECTED", payload: err})
            })
    }
}

