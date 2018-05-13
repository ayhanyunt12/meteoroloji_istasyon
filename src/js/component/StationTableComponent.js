import React, {Component} from 'react'
import {Button, Checkbox, Table} from 'semantic-ui-react'
import "./../../css/style.css"
import AddModalComponent from "./modalComponents/AddModalComponent";
import EditModalComponent from "./modalComponents/EditModalComponent"
import DeleteModalComponent from "./modalComponents/DeleteModalComponent"


class StationTableComponent extends Component {
    /**
     *
     * @type {{openAddModal: boolean, openEditModal: boolean, openDeleteModal: boolean, selectedId: number, selectedStation: number}}
     */
    state = {openAddModal: false, openEditModal: false, openDeleteModal: false, selectedId: 0, selectedStation: -1};

    /**
     * when user click 'İstasyon Ekle' button this function will be fired
     * this function set openAddModal state to true and modal will be opened
     * @returns {function()}
     */
    showAddModal = () => () => {
        this.setState({openAddModal: true});
    };

    /**
     * when user click 'Düzenle' button this function will be fired
     * this function set openEditModal state to true and modal will be opened
     * @param id    indicate which station will be edited
     * @returns {function()}
     */
    showEditModal = (id) => () => {
        this.setState({openEditModal: true, selectedId: id});
    };

    /**
     * when user click 'Sil' button this function will be fired
     * this function set openDeleteModal state to true and modal will be opened
     * @param id    indicate which station will be deleted
     * @returns {function()}
     */
    showDeleteModal = (id) => () => {
        this.setState({openDeleteModal: true, selectedId: id});
    };

    /**
     * when user close any of the modal this function will be fired
     * @returns {void|*}
     */
    close = () => this.setState({openAddModal: false, openEditModal: false, openDeleteModal: false});

    /**
     * when user click 'Kaydet' button in add modal this function will be fired
     * and call handleSave that comes from props
     * @param lng   longitude value of station
     * @param lat   latitude value of station
     * @param name  name value of station
     */
    handleSave = (lng, lat, name) => {
        this.close();
        this.props.handleSave(lng, lat, name);
    };

    /**
     * when user click 'Kaydet' button in edit modal this function will be fired
     * and call handleUpdate that comes from props
     * @param name  new name value of station
     * @param id    indicate which station will be updated
     * @param lng   new longitude value of station
     * @param ltd   new latitude value of station
     */
    handleUpdate = (name, id, lng, ltd) => {
        this.close();
        this.props.handleUpdate(name, id, lng, ltd);
    };

    /**
     * When user click 'Sil' button in delete modal this function will be fired
     * and call handleDelete that comes from props
     * @param id    indicate which station will be deleted
     */
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

    /**
     * this function will be fired when user selects a checkbox from table
     * we need to unchecked all checkbox and check the clicked one
     * @param e
     */
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