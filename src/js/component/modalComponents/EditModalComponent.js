import React, {Component} from 'react'
import {Button, Form, Input, Modal} from 'semantic-ui-react'
import MapComponent from '../MapComponent'
import "../../../css/style.css"


class EditModalComponent extends Component {
    state = {lng: 0, ltd: 0, name:''};

    componentWillReceiveProps(newProps) {
        newProps.stations.map(station => {
            if (newProps.selectedId === station.public_id){
                this.setState({lng:station.lang, ltd:station.latd, name:station.name})
            }
        });
    }

    changeLngLtd = (lng, ltd) => {
        this.setState({lng: lng, ltd: ltd});
    };

    setName = (e) => {
        this.setState({name:e.target.value})
    };

    render() {
        if (!this.props.stationFetched) {
            return (null)
        }
        const {lng, ltd, name} = this.state;
        return (
            <Modal size="large" open={this.props.open} onClose={this.props.onClose}>
                <Modal.Header>
                    İstasyon Düzenle
                </Modal.Header>
                <Modal.Content>
                    <h4 align="center">İstasyonunuza yeni isim verebilir, dilerseniz harita üzerinden yerini değiştirebilirsiniz.</h4>
                    <div id="modal-station-name--container">
                        <Form>
                            <Form.Field inline>
                                <Input type='text' placeholder='İstasyon ismi giriniz.' value={name}
                                       onChange={this.setName}/>
                            </Form.Field>
                        </Form>
                    </div>
                    <MapComponent
                        stationFetched={true}
                        stations={[{'id': 1, 'lang': lng, 'latd': ltd}]}
                        draggable={true}
                        onChange={this.changeLngLtd}
                    />
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.props.onClose} negative>
                        Vazgeç
                    </Button>
                    <Button positive icon='checkmark' labelPosition='right' content='Kaydet'
                            onClick={() => this.props.handleSave(name,this.props.selectedId,lng,ltd)}
                    />
                </Modal.Actions>
            </Modal>
        )
    }
}

export default EditModalComponent