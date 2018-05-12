import React, {Component} from 'react'
import {Button, Checkbox, Table} from 'semantic-ui-react'
import "./../../css/style.css"
import AddModalComponent from "./modalComponents/AddModalComponent";
import EditModalComponent from "./modalComponents/EditModalComponent"
import DeleteModalComponent from "./modalComponents/DeleteModalComponent"


class StationTableComponent extends Component {
    state = {openAddModal: false, openEditModal: false, openDeleteModal: false, selectedId: 0, selectedStation: -1};

    showAddModal = () => () => {
        this.setState({openAddModal: true});
    };

    showEditModal = (id) => () => {
        this.setState({openEditModal: true, selectedId: id});
    };

    showDeleteModal = (id) => () => {
        this.setState({openDeleteModal: true, selectedId: id});
    };

    close = () => this.setState({openAddModal: false, openEditModal: false, openDeleteModal: false});

    handleSave = (lng, lat, name) => {
        this.close();
        this.props.handleSaveToDB(lng, lat, name);
    };

    handleUpdate = (name, id, lng, ltd) => {
        this.close();
        this.props.handleUpdate(name, id, lng, ltd);
    };

    handleDelete = (id) => {
        this.close();
        this.props.handleDelete(id);
    };

    mapStations = (stations) => stations.map(station => {
        return (
            <Table.Row key={station.id}>
                <Table.Cell>
                    <input type="checkbox" name="stationCheckBox" data-value={station.id} id={station.id} onClick={this.handleCheckboxToggle} />
                </Table.Cell>
                <Table.Cell>{station.id}</Table.Cell>
                <Table.Cell>{station.name}</Table.Cell>
                <Table.Cell>
                    <Button positive icon='edit' onClick={this.showEditModal(station.public_id)}
                            labelPosition='right' content='Düzenle'/>
                </Table.Cell>
                <Table.Cell>
                    <Button negative icon='delete' onClick={this.showDeleteModal(station.public_id)}
                            labelPosition='right' content='Sil'/>
                </Table.Cell>
            </Table.Row>
        )

    });

    handleCheckboxToggle = (e) => {
        let id;
        if (!e.target.dataset.value) {
            /**
             * label'a tıklanmış
             */
            id = e.target.parentElement.dataset.value;
        } else {
            /**
             * div'e tıklanmış
             */
            id = e.target.dataset.value;
        }
        let myCheckbox = document.getElementsByName("stationCheckBox");
        Array.prototype.forEach.call(myCheckbox, function (el) {
            el.checked = false;
        });
        e.target.checked = true;
        this.props.handleShowStation(id);
    };

    render() {
        const {openAddModal, openEditModal, openDeleteModal, selectedId} = this.state;
        if (!this.props.stationFetched) {
            return (null)
        }
        return (
            <div>
                <Button id="add-station--button" onClick={this.showAddModal()} positive icon='add'
                        labelPosition='right' content='İstasyon Ekle'/>
                <div className="table-container">
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell/>
                                <Table.HeaderCell>Id</Table.HeaderCell>
                                <Table.HeaderCell>İsim</Table.HeaderCell>
                                <Table.HeaderCell>Düzenle</Table.HeaderCell>
                                <Table.HeaderCell>Sil</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.mapStations(this.props.stations)}
                        </Table.Body>
                    </Table>
                    <AddModalComponent
                        open={openAddModal}
                        onClose={this.close}
                        stationFetched={this.props.stationFetched}
                        handleSave={this.handleSave}
                    />
                    <EditModalComponent
                        open={openEditModal}
                        onClose={this.close}
                        stationFetched={this.props.stationFetched}
                        stations={this.props.stations}
                        selectedId={selectedId}
                        handleSave={this.handleUpdate}
                    />
                    <DeleteModalComponent
                        open={openDeleteModal}
                        onClose={this.close}
                        stationFetched={this.props.stationFetched}
                        selectedId={selectedId}
                        handleSave={this.handleDelete}
                    />
                </div>
            </div>

        )
    }
}

export default StationTableComponent