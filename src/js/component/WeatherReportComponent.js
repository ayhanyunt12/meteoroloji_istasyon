import React, {Component} from 'react';
import {Icon, Tab} from "semantic-ui-react";
import "./../../css/weather.css"
import sun from '../../images/sun.png';
import cloudy from '../../images/cloudy.png'
import raining from '../../images/raining.png'
import snowflake from '../../images/snowflake.png'
import DailyDataComponent from './tabComponents/DailyDataComponent'
import HourlyDataComponent from './tabComponents/HourlyDataComponent'
import HourlyGraphComponent from "./tabComponents/HourlyGraphComponent"

const getPanes = (props, index) => {
    let paneArray = [];
    paneArray.push({
            menuItem: 'Günlük veriler',
            render: () =>
                <DailyDataComponent
                    stationData={props.stationData}
                    index={index}
                />
        }
    );
    paneArray.push({
            menuItem: 'Saatlik veriler',
            render: () =>
                <HourlyDataComponent
                    stationData={props.stationData}
                    index={index}
                />
        }
    );
    paneArray.push({
            menuItem: 'Grafikler',
            render: () =>
                <HourlyGraphComponent
                    stationData={props.stationData}
                    index={index}
                />
        }
    );
    return paneArray;
};

const getImage = (stationData, index) => {
    /**
     * for temperatures
     */
    if (((parseFloat(stationData.data_day.temperature_min[index]) + parseFloat(stationData.data_day.temperature_max)) / 2).toFixed(2) >= 20) {
        return (
            <img src={sun}/>
        )
    } else if (((parseFloat(stationData.data_day.temperature_min[index]) + parseFloat(stationData.data_day.temperature_max)) / 2).toFixed(2) < -10) {
        return (
            <img src={snowflake}/>
        )
    }   else {
        /**
         * for raining
         */
        if (parseFloat(stationData.data_day.precipitation_probability[index]) > 70) {
            return (
                <img src={raining}/>
            )
        }
        else {
            return (
                <img src={cloudy}/>
            )
        }
    }

};


class WeatherReportComponent extends Component {
    constructor(props) {
        super();
        this.state = {
            index: 0
        };
    }

    handleIconClick = (e) => {
        let maxSize = this.props.stationData.data_day.time.length;
        if (e.target.dataset.value === 'increase') {
            if (this.state.index != (maxSize - 1)) {
                this.setState({index: this.state.index + 1})
            }
        } else {
            if (this.state.index != 0) {
                this.setState({index: this.state.index - 1})
            }
        }
    };

    render() {
        if (!this.props.dataFetched || this.props.stations.length === 0) {
            return (
                <h3 align="center">
                    <p>Görüntülemek istediğiniz istasyonu seçmek için;</p>
                    <p>Haritadan kırmızı işarete tıklayınız.</p>
                    <p>Veya listeden istasyon seçiniz.</p>
                </h3>
            )
        }
        const stationData = this.props.stationData;
        const {
            index
        } = this.state;

        return (
            <div className="weather-report-top-container">
                <div className="weather-flexbox ui segment">
                    <div className="weather-flexbox-logo-container">
                        {getImage(stationData, index)}
                    </div>
                    <div className="weather-flexbox-temperature-container">
                        <p>{((stationData.data_day.temperature_max[index] + stationData.data_day.temperature_min[index]) / 2).toFixed(2)} °C</p>
                    </div>
                    <div className="weather-flexbox-day-container">
                        <Icon name='chevron left' inverted size='large' data-value="decrease"
                              className="change-day-icon decrease-day" onClick={this.handleIconClick}/>
                        <p>{stationData.data_day.time[index]}</p>
                        <Icon name='chevron right' inverted size='large' data-value="increase"
                              className="change-day-icon increase-day" onClick={this.handleIconClick}/>
                    </div>
                </div>
                <div className="weather-report-tab-container">
                    <Tab menu={{secondary: true, pointing: true}} panes={getPanes(this.props, index)}/>
                </div>
            </div>
        )
    }
}

export default WeatherReportComponent;