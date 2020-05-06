import React, { Component } from "react";

class tableNew extends Component {    
  render() {
    console.log('table data', this.props.tableData)
    return (
      <div>
        <table>
            <tbody>
              <tr style={{backgroundColor: '#d8d8d8'}}>
                <th style={styles.tableContent}>No</th>
                {this.props.tableField.map(data => 
                <th style={styles.tableContent}>{data.title}</th>
                )}
                <th style={styles.tableContent}>Action</th>
             </tr>
            {this.props.tableData.map((item, index) => 
              <tr style={styles.hover}>
                  <th style={styles.tableContent}>{index+1}</th>
                  {this.props.tableField.map(data => {
                    if(data.link){
                      return (
                        <td style={styles.tableContent}>
                           <a>{item[data.dataIndex].substring(0, 20)}</a>
                        </td>
                      )
                    } else if(data.longText){
                        return (
                          <td style={{ width: "35%", padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd" }}>
                            {item[data.dataIndex].substring(0, 20).substring(0, 100)} ...
                          </td>
                        )
                    } else {
                        return (
                          <th style={styles.tableContent}>{item[data.dataIndex]}</th>
                        )
                    }
                 })}
                <td style={styles.tableContent}>
                 <a style={{ padding: "0 0 0 3px" }}>View</a>
                </td>
             </tr>  
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

const styles = {
  tableContent: {
    padding: "8px",
    width: "200px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  },
};

export default tableNew;
