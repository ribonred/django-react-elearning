import React from "react";
import ViewContainer from "../ui-container/viewContainer";
import { Descriptions, Tabs, Skeleton, Layout } from "antd";
import TableView from "../component/table/tableFilterable"

const { TabPane } = Tabs

const tableFieldStatus = [
  {
    title: 'Status Penahanan',
    dataIndex: 'status_penahanan',
    sorter: true,
    search: true,
  },
  {
    title: 'Rekam Jejak',
    dataIndex: 'rekam_jejak',
    sorter: true,
    search: true,
  },
  {
    title: 'Keterangan',
    dataIndex: 'keterangan',
    sorter: true,
    search: true,
  },
  {
    title: 'Tanggal',
    dataIndex: 'tanggal',
    sorter: true,
    search: true,
  },
  {
    title: 'Waktu',
    dataIndex: 'waktu',
    sorter: true,
    search: true,
  }
]

const tableFieldProses = [
  {
    title: 'No Proses',
    dataIndex: 'no_proses',
    sorter: true,
    search: true,
  },
  {
    title: 'Jenis Proses',
    dataIndex: 'jenis_proses',
    sorter: true,
    search: true,
  },
  {
    title: 'Keterangan',
    dataIndex: 'keterangan',
    sorter: true,
    search: true,
  }
]

const tableFieldBarangBukti = [
  {
    title: 'Nama BB',
    dataIndex: 'nama_barang',
    sorter: true,
    search: true,
  },
  {
    title: 'Jenis BB',
    dataIndex: 'jenis_barang',
    sorter: true,
    search: true,
  },
  {
    title: 'SP Sita',
    dataIndex: 'sp_sita',
    sorter: true,
    search: true,
  },
  {
    title: 'Tap Status',
    dataIndex: 'tap_status',
    sorter: true,
    search: true,
  }
]

const LknViewView = (props) => {
  let noLkn          = ""
  let tanggal_dibuat = ""

  if (!props.lkn) {
    noLkn          = ""
    tanggal_dibuat = ""
  } else {
    noLkn = props.lkn.LKN
    tanggal_dibuat  = props.lkn.tgl_dibuat
  }

  if(props.lkn.penangkapan){
    return (
      <ViewContainer>
        <Descriptions title="LKN Info">
          <Descriptions.Item label="No. LKN">{noLkn}</Descriptions.Item>
          <Descriptions.Item label="Tanggal Dibuat">{tanggal_dibuat}</Descriptions.Item>
        </Descriptions>
          {props.lkn.penangkapan.map(data =>
            <div key={data.id} style={styles.detailBox}>
              <Descriptions title="Penangkapan">
                <Descriptions.Item label="No. Penangkapan">{data.no_penangkapan}</Descriptions.Item>
                <Descriptions.Item label="Tanggal Penangkapan">{data.tanggal_penangkapan}</Descriptions.Item>
                <Descriptions.Item label="Jam Penangkapan">{data.jam_penangkapan}</Descriptions.Item>
                <div style={{borderTop: '1px dashed #6d6d6d'}}/>
              </Descriptions>
              {data.penangkapan_tersangka.map(tsk =>
                <div key={tsk.id} style={styles.penangkapanBox}>
                  <div style={styles.profilTersangkaBox}>
                    <div style={styles.fotoTersangkaBox}>
                    {
                      tsk.photo !== null || tsk.photo !== '' || tsk.photo !== undefined ?
                      (<img alt='view' src='https://f1.pngfuel.com/png/455/507/814/person-silhouette-man-drawing-male-profile-of-a-person-female-face-png-clip-art-thumbnail.png' style={styles.fotoTersangka}/>)
                      :
                      (<img alt='view' src={{ uri: tsk.photo }} style={styles.fotoTersangka}/>)
                    }
                    </div>
                    <div style={{paddingTop: '10px'}}>
                      <p style={{fontSize: 16, textAlign: 'center', verticalAlign: 'middle', margin: 0, fontWeight: 'bold', fontFamily: 'Roboto'}}>{tsk.nama_tersangka}</p>
                      <p style={{fontSize: 12, textAlign: 'center', verticalAlign: 'middle', margin: 0}}>{tsk.jenis_kelamin.toUpperCase()}</p>
                      <p style={{fontSize: 12, textAlign: 'center', verticalAlign: 'middle', margin: 0}}>{tsk.umur} Tahun</p>
                    </div>
                  </div>

                  <div style={{backgroundColor: 'white', width: '100vw', height: '42vh', marginLeft: '1vw', padding: '5px'}}>
                    <Tabs defaultActiveKey='1'>
                      <TabPane tab='Proses Tersangka' key='1'>
                        <div style={styles.detailBoxPenangkapan}>
                          <TableView
                            path="proses tersangka"
                            isNotAllowTo={['view','edit','delete']}
                            tableField={tableFieldProses}
                            tableData={tsk.prosestersangka}
                          />
                        </div>
                      </TabPane>

                      <TabPane tab='Status Tersangka' key='2'>
                        <div style={styles.detailBoxPenangkapan}>
                        <TableView
                          path="status tersangka"
                          isNotAllowTo={['view','edit','delete']}
                          tableField={tableFieldStatus}
                          tableData={tsk.statustersangka}
                        />
                        </div>
                      </TabPane>

                      <TabPane tab='Barang Bukti Tersangka' key='3'>
                        <div style={styles.detailBoxPenangkapan}>
                        <TableView
                          path="barang bukti"
                          isNotAllowTo={['view','edit','delete']}
                          tableField={tableFieldBarangBukti}
                          tableData={tsk.barangbuktitersangka}
                        />
                        </div>
                      </TabPane>
                    </Tabs>
                </div>
              </div>
              )}
            </div>
          )}
      </ViewContainer>
    )
  }

  return (
    <Skeleton active />
  )
};

const styles = {
  detailBox: {
    backgroundImage: '#dedede',
    padding: '10px',
    boxShadow: '0px 0px 10px #dedede',
    opacity: '0,8',
    margin: '20px',
  },
  penangkapanBox: {
    display: 'flex',
    marginTop: '15px',
    flexDirection: 'row',
    width: '75vw'
  },
  profilTersangkaBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: '10px',
    borderRadius: '20px 20px 0px 0px',
    height: '42vh'
  },
  fotoTersangkaBox: {
    width: '5cm',
    height: '6cm',
  },
  fotoTersangka: {
    width: '100%',
    height: '100%',
    borderRadius: '20px',
  },
  detailBoxPenangkapan: {
    height: '270px',
    overflowY: 'scroll'
  }
}

export default LknViewView;
