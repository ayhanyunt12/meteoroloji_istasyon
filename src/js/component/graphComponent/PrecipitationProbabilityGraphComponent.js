import React, {Component} from 'react'
import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const createTemperatureData = (stationData, dayData) => {
    let data = [];
    stationData.data_1h.time.map((time,index) => {
        let splittedTime = time.split(' ');
        if (splittedTime[0] == dayData){
            let hourTime = splittedTime[1];
            let precipitation_probability = stationData.data_1h.precipitation_probability[index];
            data.push({name: hourTime, precipitation_probability:precipitation_probability});
        }
    });
    return data;
};


class PrecipitationProbabilityGraphComponent extends Component {

    render() {
        let dayData = this.props.stationData.data_day.time[this.props.index].split(' ');
        return (
            <ResponsiveContainer width='90%' height='90%' aspect={4.0/3.0}>
                <LineChart
                    data={
                        createTemperatureData(this.props.stationData,dayData)
                    }
                >
                    <XAxis dataKey="name"/>
                    <YAxis dataKey="precipitation_probability" label={{ value: "Yağış Olasılığı (%)", position: 'insideLeft', angle:-90}}/>
                    <Tooltip unit="°C"/>
                    <Line type="monotone" dataKey="precipitation_probability" stroke="#ffffff" activeDot={{r: 8}}/>
                </LineChart>
            </ResponsiveContainer>
        )
    }
}

export default PrecipitationProbabilityGraphComponent;