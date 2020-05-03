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
    display: 'flex',
    padding: '10px',
    justifyContent: 'center',
    alignItems: 'center'
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

const ViewContainer = (props) => {
  console.log('props view container', props)
    return (
    <div style={styles.container}>
          <Layout style={styles.innerLayout}>
            <Layout style={styles.contentLayout}>
              {props.children}
            </Layout>
          </Layout>
      </div>
    );
};

export default ViewContainer;
