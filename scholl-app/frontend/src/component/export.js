import React from 'react'
import { Table } from 'antd';

// const renderContent = (value, row, index) => {
//     const obj = {
//       children: value,
//       props: {},
//     };
//     if (index === 4) {
//       obj.props.colSpan = 0;
//     }
//     return obj;
//   };
  
//   const columns = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       render: (text, row, index) => {
//         if (index < 4) {
//           return <a>{text}</a>;
//         }
//         return {
//           children: <a>{text}</a>,
//           props: {
//             colSpan: 5,
//           },
//         };
//       },
//     },
//     {
//       title: 'Age',
//       dataIndex: 'age',
//       render: renderContent,
//     },
//     {
//       title: 'Home phone',
//       colSpan: 2,
//       dataIndex: 'tel',
//       render: (value, row, index) => {
//         const obj = {
//           children: value,
//           props: {},
//         };
//         if (index === 2) {
//           obj.props.rowSpan = 2;
//         }
//         // These two are merged into above cell
//         if (index === 3) {
//           obj.props.rowSpan = 0;
//         }
//         if (index === 4) {
//           obj.props.colSpan = 0;
//         }
//         return obj;
//       },
//     },
//     {
//       title: 'Phone',
//       colSpan: 0,
//       dataIndex: 'phone',
//       render: renderContent,
//     },
//     {
//       title: 'Address',
//       dataIndex: 'address',
//       render: renderContent,
//     },
//   ];
  
//   const data = [
//     {
//       key: '1',
//       name: 'John Brown',
//       age: 32,
//       tel: '0571-22098909',
//       phone: 18889898989,
//       address: 'New York No. 1 Lake Park',
//     },
//     {
//       key: '2',
//       name: 'Jim Green',
//       tel: '0571-22098333',
//       phone: 18889898888,
//       age: 42,
//       address: 'London No. 1 Lake Park',
//     },
//     {
//       key: '3',
//       name: 'Joe Black',
//       age: 32,
//       tel: '0575-22098909',
//       phone: 18900010002,
//       address: 'Sidney No. 1 Lake Park',
//     },
//     {
//       key: '4',
//       name: 'Jim Red',
//       age: 18,
//       tel: '0575-22098909',
//       phone: 18900010002,
//       address: 'London No. 2 Lake Park',
//     },
//     {
//       key: '5',
//       name: 'Jake White',
//       age: 18,
//       tel: '0575-22098909',
//       phone: 18900010002,
//       address: 'Dublin No. 2 Lake Park',
//     },
//   ];
//   const ah = <Table columns={columns} dataSource={data} bordered />;
  var eh = 'aku';
  var data = ['makan', 'minum']

  function insert(a) {
    let c = ""
    a.forEach(element => {
        console.log(element)
        c += "<th>"+"makan"+"</th>" 
    });
    var b = "<tr>" + c + "</tr>"
    console.log(b)
    return b
  }
  var ah = <tr><th>No. LKN</th><th>Nama Tersangka</th><th>Barang Bukti</th></tr>
const ExportView = (props) => {
    console.log(props.tableData);
    // console.log(data)
    // insert(ah);
    let inputStyle = {
        border: '1px solid black'
    };
    return (
        <body>
            <table className="form__table" style={{width:'100%', border: '1px solid black'}}>
                <thead>
                    <tr style={inputStyle}>
                        <th style={inputStyle}>No. Penangkapan</th>
                        <th style={inputStyle}>Tersangka</th>
                        <th style={inputStyle}>Barangbukti</th>
                    </tr>
                </thead>
                <tbody style={inputStyle}>
                {
                    props.tableData.map((penangkapan) => {
                    var span = penangkapan.penangkapan_tersangka.length;
                    var tersangkaLength = penangkapan.penangkapan_tersangka.length;
                    var tersangkas = penangkapan.penangkapan_tersangka;
                    return <tr rowSpan={span} style={inputStyle} className="form__table-row">
                        {penangkapan.no_penangkapan}

                        {tersangkaLength === 0 
                            ? <td style={inputStyle}></td>
                            : tersangkas.map((tersangka) => {
                                span = tersangka.barangbuktitersangka.length;
                                return <td rowSpan={span} style={inputStyle} className="form__table-col">
                                    {tersangka.nama_tersangka}
                                </td> 
                            })
                        }

                        {tersangkaLength === 0 
                            ? <td style={inputStyle}></td>
                            : tersangkas.map((tersangka) => {
                                span = tersangka.barangbuktitersangka.length;
                                var barangs = tersangka.barangbuktitersangka;
                                if(span === 0) {
                                    return <td style={inputStyle}>makan</td>
                                } else {
                                    let nama = ''
                                    barangs.map((barang) => {
                                        nama = barang.nama_barang
                                    })
                                    return <td style={inputStyle}>{nama}</td>
                                }
                            })
                        }
                           
                    </tr>
                    })
                }
                </tbody>
            </table>
        </body>
        // <Table columns={columns} dataSource={data} bordered />
        // <body>
        //     <table style={{width:'100%'}}>
                // <tr>
                // <th>No. LKN</th>
                // <td>Tersangka</td>
                // <td>Barang Bukti</td>
                // </tr>
                // <tr>
                // <th rowspan="3">123456</th>
                // <td rowspan="2">Agus</td>
                // <td>Sabu</td>
                // </tr>
                // <tr>
                // <td>Tembak</td>
                // </tr>
                // <tr>
                // <td>Agung</td>
                // <td>Pil Koplo</td>
                // </tr>
        //     </table>
        // </body> 
    );
};

export default ExportView;
