import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import './Modal.css'

export default function MyModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.closeModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.text}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.closeModal}>OK</Button>
      </Modal.Footer>
    </Modal>
  )
}