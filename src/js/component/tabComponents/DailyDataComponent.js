import React, {Component} from 'react';
import {Tab} from "semantic-ui-react";
import navigation from '../../../images/navigation.png'

class DailyDataComponent extends Component {
    render() {
        const stationData = this.props.stationData;
        const index = this.props.index;
        return (
            <Tab.Pane attached={false} className="tab-pane-container">
                <div className="weather-flexbox-container">
                    <h3 align="center" className="weather-flexbox-info-header">Sıcaklık Bilgileri</h3>
                    <div className="weather-flexbox-info-container">
                        <div className="ui stackable centered grid weather-flexbox-info-grid">
                            <div className="ui centered aligned four wide column">
                                <div className="ui segment">
                                    Minimum sıcaklık: {stationData.data_day.temperature_min[index]} °C
                                </div>
                            </div>
                            <div className="ui centered aligned four wide column">
                                <div className="ui segment">
                                    Maximum sıcaklık: {stationData.data_day.temperature_max[index]} °C
                                </div>
                            </div>
                            <div className="ui centered aligned four wide column">
                                <div className="ui segment">
                                    Ortalama sıcaklık: {((stationData.data_day.temperature_min[index] + stationData.data_day.temperature_max[index])/2).toFixed(2)} °C
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="weather-flexbox-container">
                    <h3 align="center" className="weather-flexbox-info-header">Rüzgar Bilgileri</h3>
                    <div className="weather-flexbox-info-container">
                        <div className="ui stackable centered grid weather-flexbox-info-grid">
                            <div className="ui centered aligned four wide column">
                                <div className="ui segment">
                                    Minimum rüzgar hızı: {stationData.data_day.windspeed_min[index]} km/h
                                    <img src={navigation} className="vertical-align-img"/>
                                </div>
                            </div>
                            <div className="ui centered aligned four wide column">
                                <div className="ui segment">
                                    Maximum rüzgar hızı: {stationData.data_day.windspeed_max[index]} km/h
                                    <img src={navigation} className="vertical-align-img"/>
                                </div>
                            </div>
                            <div className="ui centered aligned four wide column">
                                <div className="ui segment">
                                    Ortalama rüzgar hızı: {stationData.data_day.windspeed_mean[index]} km/h
                                    <img src={navigation} className="vertical-align-img"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="weather-flexbox-container">
                    <h3 align="center" className="weather-flexbox-info-header">Nem Bilgileri</h3>
                    <div className="weather-flexbox-info-container">
                        <div className="ui stackable centered grid weather-flexbox-info-grid">
                            <div className="ui centered aligned four wide column">
                                <div className="ui segment">
                                    Minimum nem: {stationData.data_day.relativehumidity_min[index]} %
                                </div>
                            </div>
                            <div className="ui centered aligned four wide column">
                                <div className="ui segment">
                                    Maximum nem: {stationData.data_day.relativehumidity_max[index]} %
                                </div>
                            </div>
                            <div className="ui centered aligned four wide column">
                                <div className="ui segment">
                                    Ortalama nem: {stationData.data_day.relativehumidity_mean[index]} %
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="weather-flexbox-container">
                    <h3 align="center" className="weather-flexbox-info-header">Yağış Bilgileri</h3>
                    <div className="weather-flexbox-info-container">
                        <div className="ui stackable centered grid weather-flexbox-info-grid">
                            <div className="ui centered aligned four wide column">
                                <div className="ui segment">
                                    Yağış olasılığı: {stationData.data_day.precipitation_probability[index]} %
                                </div>
                            </div>
                            <div className="ui centered aligned four wide column">
                                <div className="ui segment">
                                    Yağış miktarı: {stationData.data_day.precipitation[index]} mm
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Tab.Pane>
        )
    }
}

export default DailyDataComponent;