import React from 'react';
import { Avatar, Badge, Button, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import history from '../route/history';

const { Text } = Typography;

export default class Profile extends React.Component {
  logout = () => {
    localStorage.setItem('token', '')
    history.push('/')
  };
  render(){
    return (
      <div style={{position:'absolute', right:45}}>
        <span className="avatar-item">
          <Badge dot>
            <Avatar size="large" shape="square" icon={<UserOutlined />} />
          </Badge>
        </span>
        <Text style={{padding:'10px'}} strong>{localStorage.getItem('user')}</Text>
          <Button
            size="small"
            style={{ margin: '0 16px', verticalAlign: 'middle' }}
            onClick={this.logout}
          >
            Logout
          </Button>
      </div>
    );
  }
};
