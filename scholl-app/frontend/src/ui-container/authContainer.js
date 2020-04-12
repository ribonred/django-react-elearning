import React from 'react'
import { Row, Layout, Divider, Col } from 'antd';

const styles = {
  container: {
    flex: 1,
    backgroundImage: "url('https://bnn.go.id/konten/unggahan/2019/03/bnn-featured-1600x900.jpg')"
  },
  divider: {
    color: '#333',
    fontWeight: 'normal'
  },
  innerLayout: {
    padding: '15px',
  },
  contentLayout: {
    padding: '10px',
  },
  header: {
    borderRadius: '5px',
    fontWeight: 'bold',
    fontSize: '20px',
    color: 'white',
    paddingBottom: '10px',
    backgroundColor: '#1892EA',
  }
}

const AuthContainer = (props) => {
  return (
    <div style={styles.container}>
      <Divider orientation="left" style={styles.divider}>
      </Divider>
      <Row gutter={[100, 600]} justify="center" align="middle">
        <Col xs={{ span: 25, offset: 1 }} lg={{ span: 15, offset: 1 }}>
          <Layout style={styles.innerLayout}>
            <Layout.Header
              style={styles.header}>
              {props.header}
            </Layout.Header>
            <Layout style={styles.contentLayout}>
              {props.children}
            </Layout>
          </Layout>
        </Col>
      </Row>
      <Layout.Footer style={{ height: '500px' }} />
    </div>
  );
};

export default AuthContainer;
