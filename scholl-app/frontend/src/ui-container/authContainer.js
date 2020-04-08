import React from 'react'
import { Row, Layout, Divider,Col } from 'antd';

const AuthContainer = (props) => {
    return (
    <div style={{flex:1, backgroundColor:'aqua'}}>
      <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
      </Divider>
      <Row gutter={[100,500]} justify="center" align="middle">
        <Col xs={{ span: 25, offset: 1 }} lg={{ span: 15, offset: 1 }}>
          <Layout style={{padding:'15px'}}>
            <Layout.Header
              style={{borderRadius:'5px',fontWeight:'bold',fontSize:'20px',color:'white',paddingBottom:'10px',backgroundColor:'#1892EA'}}>
              {props.header}
            </Layout.Header>
            {props.children}
          </Layout>
        </Col>
      </Row>
      <Layout.Footer style={{height:'500px'}}/>
      </div>
    );
};

export default AuthContainer;
