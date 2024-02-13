import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Header, Segment, Grid, Button, Card, Form, Confirm, Modal, Icon } from 'semantic-ui-react';
import CreateUserForm from './CreateUserForm';
import UserCard from './UserCard';
import NotificationModal from './NotificationModal';
import Image3DViewer from './Image3DViewer';
import Loader from './Loader';
import './App.css';


const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});
  const [notificationOpen, setNotificationOpen] = useState(false); 
  const [notificationMessage, setNotificationMessage] = useState(''); 
  const [showConfirmDelete, setShowConfirmDelete] = useState(false); 
  const [deletingUserId, setDeletingUserId] = useState(null); 
  const [showCreateUserModal, setShowCreateUserModal] = useState(false); 
  const [showEditUserModal, setShowEditUserModal] = useState(false); 

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 5000);

    return () => clearTimeout(timer); 
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://users-crud.academlo.tech/users/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      setDeletingUserId(userId); 
      setShowConfirmDelete(true); 
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const confirmDeleteUser = async () => {
    try {
      await axios.delete(`https://users-crud.academlo.tech/users/${deletingUserId}`);
      fetchUsers();
      // Mostrar notificación
      showNotification('User deleted successfully.');
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setShowConfirmDelete(false); 
    }
  };

  const handleEditUser = (user) => {
    setEditedUserData(user);
    setEditingUserId(user.id);
    setShowEditUserModal(true);
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditedUserData({});
    setShowEditUserModal(false); 
  };

  const handleUpdateUser = async () => {
    try {
      if (editingUserId) {
        await axios.put(`https://users-crud.academlo.tech/users/${editingUserId}/`, editedUserData);
        
        fetchUsers();
        
        showNotification('User updated successfully.');
      } else {
        console.error('No user selected for editing.');
      }
      setEditingUserId(null);
      setEditedUserData({});
      setShowEditUserModal(false); 
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleCreateUser = async (newUserData) => {
    try {
      let imageUrl;
      switch (newUserData.gender) {
        case 'male':
          imageUrl = 'https://react.semantic-ui.com/images/avatar/large/matthew.png';
          break;
        case 'female':
          imageUrl = 'https://react.semantic-ui.com/images/avatar/large/molly.png';
          break;
        default:
          imageUrl = 'https://react.semantic-ui.com/images/wireframe/image.png';
      }
      const userDataWithImageUrl = { ...newUserData, image_url: imageUrl };
      await axios.post('https://users-crud.academlo.tech/users/', userDataWithImageUrl);
      fetchUsers();
     
      showNotification('User created successfully.');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleGenderChange = (gender) => {
    let imageUrl;
    switch (gender) {
      case 'male':
        imageUrl = 'https://react.semantic-ui.com/images/avatar/large/matthew.png';
        break;
      case 'female':
        imageUrl = 'https://react.semantic-ui.com/images/avatar/large/molly.png';
        break;
      default:
        imageUrl = 'https://react.semantic-ui.com/images/wireframe/image.png';
    }
    setEditedUserData({ ...editedUserData, gender: gender, image_url: imageUrl });
  };

  const showNotification = (message) => {
    setNotificationMessage(message);
    setNotificationOpen(true);
  };

  return (

    <>
    <Image3DViewer />
    <Container style={{ marginTop: '2rem' }}>
      
      
      {loading && <Loader />}
      <Header as='h1' style={{margin:'2rem'}}>User Management System</Header>

      
      <Button primary onClick={() => setShowCreateUserModal(true)} ><Icon name='plus square outline' /> Add new user</Button>
      
      
      <Modal open={showCreateUserModal} onClose={() => setShowCreateUserModal(false)} size='small'>
        <Modal.Header>Create User<Button onClick={() => setShowCreateUserModal(false)} color='red' floated='right'>
         <Icon name='close' /> Close</Button>
       </Modal.Header>
        <Modal.Content>
          <CreateUserForm onSubmit={handleCreateUser} />
        </Modal.Content>
        <Modal.Actions>
        
        </Modal.Actions>
      </Modal>

      {/* Modal edición usuario */}
      <Modal open={showEditUserModal} onClose={handleCancelEdit} size='small'>
        <Modal.Header>Edit User</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleUpdateUser}>
            <Form.Input
              label='First Name'
              name='first_name'
              value={editedUserData.first_name || ''}
              onChange={(e) => setEditedUserData({ ...editedUserData, first_name: e.target.value })}
            />
            <Form.Input
              label='Last Name'
              name='last_name'
              value={editedUserData.last_name || ''}
              onChange={(e) => setEditedUserData({ ...editedUserData, last_name: e.target.value })}
            />
            <Form.Input
              label='Email'
              name='email'
              value={editedUserData.email || ''}
              onChange={(e) => setEditedUserData({ ...editedUserData, email: e.target.value })}
            />
            <Form.Input
              label='Birthday'
              name='birthday'
              value={editedUserData.birthday || ''}
              onChange={(e) => setEditedUserData({ ...editedUserData, birthday: e.target.value })}
            />
            <Form.Select
              label='Gender'
              name='gender'
              value={editedUserData.gender || ''}
              options={[
                { key: 'male', text: 'Male', value: 'male' },
                { key: 'female', text: 'Female', value: 'female' },
                { key: 'other', text: 'Other', value: 'other' },
              ]}
              onChange={(e, { value }) => {
                setEditedUserData({ ...editedUserData, gender: value });
                handleGenderChange(value);
              }}
            />
            <Button type='submit'>Update</Button>
            <Button onClick={handleCancelEdit}>Cancel</Button>
          </Form>
        </Modal.Content>
      </Modal>

      <Grid columns={2} stackable>
        {users.map((user, index) => (
          <Grid.Column key={index} computer={8}>
            <Segment textAlign="center" style={{ background: 'linear-gradient(rgba(5, 7, 12, 0.05), rgba(38, 98, 250, 0.3))', border:"none", padding:"2rem",}}> 
              <Card.Group centered>
                <UserCard
                  user={user}
                  onDelete={handleDeleteUser}
                  onEdit={handleEditUser}
                />
              </Card.Group>
            </Segment>
          </Grid.Column>
        ))}
      </Grid>

      {/* modal de notificación */}
      <NotificationModal
        open={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        message={notificationMessage}
      />

      {/* Modal eliminar usuarios */}
      <Confirm
        open={showConfirmDelete}
        content="Are you sure you want to delete this user?"
        onCancel={() => setShowConfirmDelete(false)}
        onConfirm={confirmDeleteUser}
      />
    </Container>
     </>
  );
};

export default App;
