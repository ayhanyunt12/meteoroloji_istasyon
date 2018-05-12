export default function reducer(state = {
    stations: {
        id: null,
        public_id: null,
        name: null,
        lang: null,
        latd: null
    },
    station_data: {
        units: {
            time: null,
            temperature: null,
            windspeed: null,
            precipitation_probability: null,
            pressure: null,
            relativehumidity: null,
            precipitation: null,
            winddirection: null,
            predictability: null
        },
        data_1h: {
            time: [],
            temperature: [],
            felttemperature: [],
            windspeed: [],
            precipitation_probability: []
        },
        data_day: {
            time: [],
            temperature_max: [],
            temperature_min: [],
            precipitation_probability:[],
            precipitation:[],
            windspeed_max:[],
            windspeed_mean:[],
            windspeed_min:[],
            relativehumidity_max:[],
            relativehumidity_min:[],
            relativehumidity_mean:[]
        }
    },
    fetching: false,
    fetched: false,
    error: null,
    dataFetched: false
}, action) {
    switch (action.type) {
        case "FETCH_STATIONS": {
            return {...state, fetching: true}
        }
        case "FETCH_STATIONS_REJECTED": {
            return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_STATIONS_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                stations: action.payload,
            }
        }
        case "CREATE_STATION": {
            return {...state, error: null}
        }
        case "CREATE_STATION_REJECTED": {
            return {...state, error: action.payload}
        }
        case "CREATE_STATION_FULFILLED": {
            return {
                ...state,
                stations: state.stations.concat(action.payload)
            }
        }
        case "UPDATE_STATION": {
            return {...state, error: null}
        }
        case "UPDATE_STATION_REJECTED": {
            return {...state, error: action.payload}
        }
        case "UPDATE_STATION_FULFILLED": {
            const public_id = action.payload.public_id;
            const newStations = [...state.stations];
            const stationToUpdate = newStations.findIndex(station => station.public_id === public_id);
            newStations[stationToUpdate].name = action.payload.name;
            newStations[stationToUpdate].lang = action.payload.lang;
            newStations[stationToUpdate].latd = action.payload.latd;
            return {
                ...state,
                stations: newStations,
            };
        }
        case "DELETE_STATION": {
            return {...state, error: null}
        }
        case "DELETE_STATION_REJECTED": {
            return {...state, error: action.payload}
        }
        case "DELETE_STATION_FULFILLED": {
            return {
                ...state,
                stations: state.stations.filter(station => station.public_id !== action.payload.public_id),
            }
        }
        case "FETCH_STATION_DATA": {
            return {...state, fetching: true}
        }
        case "FETCH_STATION_DATA_REJECTED": {
            return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_STATION_DATA_FULFILLED": {
            return {
                ...state,
                fetching: false,
                dataFetched: true,
                station_data: action.payload,
            }
        }
        default : {
            break;
        }
    }
    return state
}
