import React, {Component} from 'react'
import {Table} from "semantic-ui-react";

const getTableRows = (stationData, dayData) => stationData.data_1h.time.map((time, index) => {
    if (time.split(' ')[0] == dayData) {
        console.log('aa');
        return (
            <Table.Row key={index}>
                <Table.Cell>{time.split(' ')[1]}</Table.Cell>
                <Table.Cell>{stationData.data_1h.temperature[index]}</Table.Cell>
                <Table.Cell>{stationData.data_1h.felttemperature[index]}</Table.Cell>
                <Table.Cell>{stationData.data_1h.precipitation_probability[index]}</Table.Cell>
                <Table.Cell>{stationData.data_1h.windspeed[index]}</Table.Cell>
            </Table.Row>
        )
    }
});




class HourlyDataComponent extends Component {

    render() {
        let dayData = this.props.stationData.data_day.time[this.props.index].split(' ');
        return (
            <div className="hourly-data-table-container">
                <Table inverted textAlign="center">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Saat</Table.HeaderCell>
                            <Table.HeaderCell>Sıcaklık (°C)</Table.HeaderCell>
                            <Table.HeaderCell>Hissedilen Sıcaklık (°C)</Table.HeaderCell>
                            <Table.HeaderCell>Yağış Olasılığı (%)</Table.HeaderCell>
                            <Table.HeaderCell>Rüzgar Hızı (ms-1)</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {getTableRows(this.props.stationData, dayData)}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

export default HourlyDataComponent;