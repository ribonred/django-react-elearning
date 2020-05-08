import React, { Component } from "react";

class tableNew extends Component {
  render() {
    return (
      <div>
        <table>
          <tr style={{backgroundColor: '#d8d8d8'}}>
            <th style={styles.tableContent}>No</th>
            <th style={styles.tableContent}>Jenis Proses</th>
            <th style={styles.tableContent}>SP. HAN</th>
            <th style={styles.tableContent}>
              TAP. HAN / Surat Perpanjangan HAN
            </th>
            <th style={styles.tableContent}>Keterangan</th>
            <th style={styles.tableContent}>Actions</th>
          </tr>

          <tr>
            <td style={styles.tableContent}>1</td>
            <td style={styles.tableContent}>Pengadilan Satu</td>
            <td style={styles.tableContent}>
              <a>{"02913764012801299857".substring(0, 20)}</a>
            </td>
            <td style={styles.tableContent}>
              <a>{"12093093482923904225".substring(0, 20)}</a>
            </td>
            <td style={{ width: "35%", padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>
              {"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid odio, quod ut autem nesciunt aperiam dolores natus iste cum. Tempora, exercitationem aut! Rem et veniam natus beatae at ducimus dolorum sint! Corporis odit nostrum maiores quasi veritatis eligendi, officiis corrupti cupiditate nulla. Accusantium iste autem minima vero excepturi debitis, necessitatibus pariatur architecto ratione adipisci inventore consequatur quisquam, animi dignissimos voluptates!".substring(0, 100)} ...
            </td>
            <td style={styles.tableContent}>
              <a style={{ padding: "0 3px 0 0" }}>Edit</a>
              <a style={{ padding: "0 0 0 3px" }}>View</a>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

const styles = {
  tableContent: {
    padding: "8px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  },
};

export default tableNew;
