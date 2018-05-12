import React, {Component} from 'react'
import {Button, Header, Icon, Modal} from 'semantic-ui-react'
import "../../../css/style.css"

class DeleteModalComponent extends Component {

    render() {
        if (!this.props.stationFetched) {
            return (null)
        }

        return (
            <Modal open={this.props.open} onClose={this.props.onClose} basic size='small'>
                <Header icon='industry' content='İstasyon Sil'/>
                <Modal.Content>
                    <p>Bu istasyonu ve tüm verilerini silmek istediğinize emin misiniz?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => this.props.handleSave(this.props.selectedId)}>
                        <Icon name='remove'/> Sil
                    </Button>
                    <Button color='green' inverted onClick={this.props.onClose}>
                        <Icon name='checkmark'/> Vazgeç
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default DeleteModalComponent