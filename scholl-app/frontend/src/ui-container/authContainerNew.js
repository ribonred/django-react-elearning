import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import Background from "../assets/background.png";

const authContainerNew = (props) => {
  return (
    <div style={styles.container}>
      <img
        alt='BNN'
        src={require("../assets/bnn_bintang_fix_max.png")}
        style={styles.image}
      />
      <div style={styles.box}>
        <Form style={{ padding: "10px", marginTop: '5px' }}>
          <p
            style={{
              margin: 0,
              paddingLeft: "10px",
              color: "#000000",
              fontSize: 15,
            }}
          >
            Username
          </p>
          <Input
            placeholder="Masukan Username"
            style={{ borderRadius: "5px" }}
            onChange={(event) => props.onFormChange('username', event)}
          />
          <p
            style={{
              margin: "10px 0 0 0",
              paddingLeft: "10px",
              color: "#000000",
              fontSize: 15,
            }}
          >
            Password
          </p>
          <Input.Password
            placeholder="Masukan Password"
            style={{ borderRadius: "5px" }}
            onChange={(event) => props.onFormChange('password', event)}
          />
        </Form>

        <div style={{display: 'flex', justifyContent: 'space-between', padding: '0 15px 10px 15px'}}>
          <Checkbox style={{color: '#000000'}}>Ingat saya</Checkbox>
        </div>

        <div>
          <Button type='primary' style={{marginLeft: '15px', borderRadius: '5px'}} onClick={()=>props.onsubmit()}>Login</Button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundImage: `url(${Background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "100vh",
    width: "100vw",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: "20%",
    width: "auto",
    display: "block",
  },
  box: {
    backgroundColor: "white",
    height: "16em",
    width: "25em",
    borderRadius: "10px",
    marginTop: "10px",
    display: "block",
    opacity: "0.7",
    boxShadow: '0px 0px 10px #181818'
  },
  center: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
};

export default authContainerNew;
