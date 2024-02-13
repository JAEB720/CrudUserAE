import React, { useState } from 'react';
import { Form, Button, Select } from 'semantic-ui-react';

const CreateUserForm = ({ onSubmit, userToUpdate }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    birthday: '',
    gender: '',
  });

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    // Reinicia  el formulario 
    setFormData({
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      birthday: '',
      gender: '',
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        label='Email'
        name='email'
        type='email'
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Form.Input
        label='Password'
        name='password'
        type='password'
        value={formData.password}
        onChange={handleChange}
        required
      />
      <Form.Input
        label='First Name'
        name='first_name'
        value={formData.first_name}
        onChange={handleChange}
        required
      />
      <Form.Input
        label='Last Name'
        name='last_name'
        value={formData.last_name}
        onChange={handleChange}
        required
      />
      <Form.Input
        label='Birthday'
        name='birthday'
        type='date'
        value={formData.birthday}
        onChange={handleChange}
        required
      />
      <Form.Field
        control={Select}
        label='Gender'
        name='gender'
        options={[
          { key: 'male', text: 'Male', value: 'male' },
          { key: 'female', text: 'Female', value: 'female' },
          { key: 'other', text: 'Other', value: 'other' },
        ]}
        value={formData.gender}
        onChange={(e, { value }) => handleChange(e, { name: 'gender', value })}
        required
      />
      <Button type='submit' primary>{userToUpdate ? 'Update' : 'Create'}</Button>
    </Form>
  );
};

export default CreateUserForm;
