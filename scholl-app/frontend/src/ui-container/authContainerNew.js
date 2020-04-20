import React, { Component } from 'react'
import { Row, Layout, Divider, Col } from 'antd';
import Background from '../assets/background.png'

const authContainerNew = (props) => {
    return (
      <div style={styles.container}>
          <img src={require('../assets/bnn_bintang_fix_max.png')} style={styles.image}/>
          <div style={styles.box}>
          
          </div>
      </div>
    )
}

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      backgroundImage: `url(${Background})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      height: '100vh',
      width: '100vw',
      alignItems: 'center',
      justifyContent: 'center'
    },
    image: {
      height: '20%',
      width: '12%',
      display: 'block',
    },
    box: {
      backgroundColor: 'white',
      height: '15em',
      width: '25em',
      borderRadius: '10px',
      marginTop: '10px',
      display: 'block',
    },
    center: {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
}

export default authContainerNew;