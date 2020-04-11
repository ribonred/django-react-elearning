import React from 'react'
import { Layout } from 'antd';

const styles = {
  container:{
    flex:1
  },
  innerLayout: {
    padding: '15px',
  },
  contentLayout: {
    padding: '10px',
  } ,
  header: {
    borderRadius:'5px',
    fontWeight:'bold',
    fontSize:'20px',
    color:'white',
    paddingBottom:'10px',
    backgroundColor:'#1892EA',
    align:'center',
  }
}

const PageContainer = (props) => {
    return (
    <div style={styles.container}>
          <Layout style={styles.innerLayout}>
            <Layout.Header
              style={styles.header}>
              {props.header}
            </Layout.Header>
            <Layout style={styles.contentLayout}>
              {props.children}
            </Layout>
          </Layout>
      </div>
    );
};

export default PageContainer;
