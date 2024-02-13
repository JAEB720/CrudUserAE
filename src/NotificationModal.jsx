import React from 'react';
import { Modal, Header, Button } from 'semantic-ui-react';

const NotificationModal = ({ open, onClose, message }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>Updated!</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>{message}</Header>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose} positive>
          OK
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default NotificationModal;
