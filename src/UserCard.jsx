import React, { useState, useEffect } from 'react';
import { Card, Button, Image, Form, Select, Icon } from 'semantic-ui-react';

const UserCard = ({ user, onDelete, onEdit, isEditing }) => {
  const [imageUrl, setImageUrl] = useState(user.image_url);
  const [isHoveredEdit, setIsHoveredEdit] = useState(false);
  const [isHoveredDelete, setIsHoveredDelete] = useState(false);
  const [isHoveredCard, setIsHoveredCard] = useState(false);

  useEffect(() => {
    setImageUrl(user.image_url);
  }, [user.image_url]);

  const handleChange = (e, { value }) => {
    setImageUrl(value);
  };

  const handleSubmit = () => {
    onEdit({ ...user, image_url: imageUrl });
  };

  return (
    <Card
      onMouseEnter={() => setIsHoveredCard(true)}
      onMouseLeave={() => setIsHoveredCard(false)}
      style={{
        WebkitTransform: isHoveredCard ? 'scale(1.1)' : 'scale(1)',
        msTransform: isHoveredCard ? 'scale(1.1)' : 'scale(1)',
        transform: isHoveredCard ? 'scale(1.1)' : 'scale(1)',
        transition: 'transform 0.3s ease',
      }}
    >
      <Image src={imageUrl} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{user.first_name} {user.last_name}</Card.Header>
        <Card.Meta>
          <Icon name='mail' />
          {user.email}
        </Card.Meta>
        <Card.Description>
          <Icon name='birthday cake' />
          Birthday: {user.birthday}
        </Card.Description>
        {isEditing && (
          <Form onSubmit={handleSubmit}>
            <Form.Input
              label="Image URL"
              name="image_url"
              value={imageUrl}
              onChange={handleChange}
            />
            <Select
              label="Gender"
              name="gender"
              options={[
                { key: 'male', text: 'Male', value: 'male' },
                { key: 'female', text: 'Female', value: 'female' },
                { key: 'other', text: 'Other', value: 'other' },
              ]}
              onChange={(e, { value }) => {
                switch (value) {
                  case 'male':
                    setImageUrl('https://react.semantic-ui.com/images/avatar/large/matthew.png');
                    break;
                  case 'female':
                    setImageUrl('https://react.semantic-ui.com/images/avatar/large/molly.png');
                    break;
                  case 'other':
                    setImageUrl('https://react.semantic-ui.com/images/wireframe/image.png');
                    break;
                  default:
                    setImageUrl('');
                }
              }}
            />
            <Button type="submit" color="green" icon labelPosition='left'>
              <Icon name='save' /> Save
            </Button>
          </Form>
        )}
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button
            basic color='green'
            onMouseEnter={() => setIsHoveredEdit(true)}
            onMouseLeave={() => setIsHoveredEdit(false)}
            style={{
              WebkitTransform: isHoveredEdit ? 'scale(1)' : 'scale(0.9)',
              msTransform: isHoveredEdit ? 'scale(1)' : 'scale(0.9)',
              transform: isHoveredEdit ? 'scale(1)' : 'scale(0.9)',
              transition: 'transform 0.3s ease',
            }}
            onClick={() => onEdit(user)}
          >
            <Icon name='edit' /> Edit
          </Button>
          <Button
            basic color='red'
            onMouseEnter={() => setIsHoveredDelete(true)}
            onMouseLeave={() => setIsHoveredDelete(false)}
            style={{
              WebkitTransform: isHoveredDelete ? 'scale(1)' : 'scale(0.9)',
              msTransform: isHoveredDelete ? 'scale(1)' : 'scale(0.9)',
              transform: isHoveredDelete ? 'scale(1)' : 'scale(0.9)',
              transition: 'transform 0.3s ease',
            }}
            onClick={() => onDelete(user.id)}
          >
            <Icon name='trash' /> Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default UserCard;
