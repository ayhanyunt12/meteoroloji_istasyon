import React, {Component} from 'react'
import TemperatureGraphComponent from "../graphComponent/TemperatureGraphComponent";
import FeltTemperatureGraphComponent from "../graphComponent/FeltTemperatureGraphComponent"
import WindSpeedGraphComponent from "../graphComponent/WindSpeedGraphComponent"
import PrecipitationProbabilityGraphComponent from "../graphComponent/PrecipitationProbabilityGraphComponent"

class HourlyGraphComponent extends Component {

    render() {
        return (
            <div className="weather-graph-container">
                <div className="ui doubling stackable two column grid">
                    <div className="center aligned column">
                        <div className="segment weather-graph-container-segment">
                            <h3>Sıcaklık Grafiği</h3>
                            <TemperatureGraphComponent
                                stationData = {this.props.stationData}
                                index = {this.props.index}
                            />
                        </div>
                    </div>
                    <div className="center aligned column">
                        <div className="segment weather-graph-container-segment">
                            <h3>Hissedilen Sıcaklık Grafiği</h3>
                            <FeltTemperatureGraphComponent
                                stationData = {this.props.stationData}
                                index = {this.props.index}
                            />
                        </div>
                    </div>
                    <div className="center aligned column">
                        <div className="segment weather-graph-container-segment">
                            <h3>Rüzgar Hızı Grafiği</h3>
                            <WindSpeedGraphComponent
                                stationData = {this.props.stationData}
                                index = {this.props.index}
                            />
                        </div>
                    </div>
                    <div className="center aligned column">
                        <div className="segment weather-graph-container-segment">
                            <h3>Yağış Olasılığı Grafiği</h3>
                            <PrecipitationProbabilityGraphComponent
                                stationData = {this.props.stationData}
                                index = {this.props.index}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HourlyGraphComponent;