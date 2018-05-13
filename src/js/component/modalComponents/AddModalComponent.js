import React, {Component} from 'react'
import {Button, Form, Input, Modal} from 'semantic-ui-react'
import LocationSearchComponent from '../locationSearchComponents/LocationSearchComponent'
import "../../../css/style.css"

let name = '';

class AddModalComponent extends Component {
    state = {lng: 0, ltd: 0};
    /**
     * when user select a new position to station in add modal
     * this function will be fired and set states
     * @param lng
     * @param ltd
     */
    changeLngLtd = (lng, ltd) => {
        this.setState({lng: lng, ltd: ltd});
    };

    setName = (e) => {
        name = e.target.value;
    };

    render() {
        if (!this.props.stationFetched) {
            return (null)
        }
        const {lng, ltd} = this.state;
        return (
            <Modal size="large" open={this.props.open} onClose={this.props.onClose}>
                <Modal.Header>
                    İstasyon Ekle
                </Modal.Header>
                <Modal.Content>
                    <div id="modal-station-name--container">
                        <Form>
                            <Form.Field inline>
                                <Input type='text' placeholder='İstasyon ismi giriniz.' onChange={this.setName}/>
                            </Form.Field>
                        </Form>
                    </div>

                    <h3 align="center">
                        <p>Aşağıdaki alana adres araması yapıp adresinizi seçin.</p>
                        <p>Daha hassas bir ayarlama için adres seçtikten sonra gelecek olan harita üzerindeki işaretçiyi
                            kaydırın.</p>
                    </h3>
                    <LocationSearchComponent onChange={this.changeLngLtd}/>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.props.onClose} negative>
                        Vazgeç
                    </Button>
                    <Button positive icon='checkmark' labelPosition='right' content='Kaydet'
                            onClick={() => this.props.handleSave(lng, ltd, name)}/>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default AddModalComponent