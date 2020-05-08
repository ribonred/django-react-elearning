import React, { Component } from "react";
import { Descriptions, Button } from "antd";

class modalDetailsView extends Component {
  render() {
    return (
      <div style={{ left: "12.5%", top: "25%", position: "absolute" }}>
        <div style={styles.displayBox}>
          <div style={{ width: "100%", marginBottom: "10px" }}>
            <table style={{ width: "100%" }}>
              <tr style={{ backgroundColor: "#8c8b8a", textAlign: "center" }}>
                <th style={styles.tableContent}>Nama Barang Bukti</th>
                <th style={styles.tableContent}>SP Sita</th>
                <th style={styles.tableContent}>TAP Sita</th>
                <th style={styles.tableContent}>Jenis Barang Bukti</th>
                <th style={styles.tableContent}>Nomor Lab</th>
              </tr>

              <tr>
                <td style={styles.tableContent}>Kokain</td>
                <td style={styles.tableContent}>019274128402938</td>
                <td style={styles.tableContent}>102931237161293</td>
                <td style={styles.tableContent}>Narkotika</td>
                <td style={styles.tableContent}>19182370-1283-uiq-9102831</td>
              </tr>
            </table>
          </div>

          <Descriptions title="Basis Data Status">
            <Descriptions.Item label="Jumlah">300 Gram</Descriptions.Item>
            <Descriptions.Item label="Status">Masuk</Descriptions.Item>
            <Descriptions.Item label="Tanggal">17-09-2021</Descriptions.Item>
            <Descriptions.Item label="Waktu">14:23</Descriptions.Item>
          </Descriptions>
          <div style={{ borderTop: "1px solid #8c8b8a" }} />

          <div style={{ height: "37%", overflowY: "scroll" }}>
            <Descriptions title="TAP Status">
              <Descriptions.Item>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                totam saepe aperiam quibusdam, rem possimus ducimus. Totam earum
                non commodi sunt magnam a, quas necessitatibus eum facilis
                veniam atque, expedita quod itaque repellendus molestiae. Sed
                quos maxime quam qui! Eveniet dolorum dolores vel dicta culpa
                accusantium asperiores, perferendis officia doloremque natus,
                eligendi obcaecati fugiat consequatur voluptate sint tempore!
                Iure, tempora, doloribus, cumque tenetur suscipit officia
                sapiente eaque ipsa molestiae voluptas atque. Odit magni
                voluptatum sint natus iure eos maiores quae illo, nam deserunt,
                animi hic labore. Amet, sequi explicabo ducimus repudiandae
                ratione quaerat iure debitis mollitia, nemo natus beatae nulla,
                quas minima sit repellendus tenetur nesciunt inventore unde.
                Provident commodi fugiat aut, dolorum, alias veniam distinctio
                quae quam dolorem quos blanditiis delectus praesentium
                consectetur molestias quibusdam est dolore. Facere cupiditate
                itaque id recusandae sit magni aliquid, perspiciatis ab delectus
                iusto exercitationem accusamus ut iste, eius reiciendis porro
                consectetur. Tempore, sunt obcaecati? Quam et cupiditate
                excepturi quidem eaque corporis, quibusdam vel, delectus ipsam,
                saepe exercitationem quae molestias! Iste mollitia modi
                repellendus libero omnis, saepe accusantium numquam odio velit
                unde, nisi placeat non perspiciatis odit. Culpa architecto id,
                blanditiis, natus aliquam possimus ad dignissimos itaque
                voluptates maxime recusandae error, facere rerum odit.
              </Descriptions.Item>
            </Descriptions>
          </div>

          <Button style={styles.button}>Close</Button>
        </div>
      </div>
    );
  }
}

const styles = {
  displayBox: {
    display: "flex",
    flexDirection: "column",
    width: "75vw",
    height: "50vh",
    boxShadow: "0px 0px 10px #8c8b8a",
    backgroundColor: "#dedede",
    border: "1px solid #dedede",
    borderRadius: "0 0 10px 10px",
  },
  tableContent: {
    padding: "8px",
    textAlign: "center",
    borderBottom: "1px solid #8c8b8a",
  },
  button: {
    height: "40px",
    borderRadius: "10px",
    width: "100%",
    color: "red",
    right: 0,
    bottom: 0,
    position: "absolute",
  },
};

export default modalDetailsView;
