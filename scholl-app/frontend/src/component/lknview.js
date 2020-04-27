import React from "react";
import ViewContainer from "../ui-container/viewContainer";
import TableView from './table/tableFilterable';
import { Descriptions, Tabs, Skeleton, Layout } from "antd";

const { TabPane } = Tabs

const statusTersangkaTableField = [
  {
    title: 'No.LKN',
    dataIndex: 'LKN',
    sorter: true,
    search: true,
  },
  {
    title: 'Nama Penyidik',
    dataIndex: 'penyidik',
    sorter: true,
    search: true,
  },
  {
    title: 'Dibuat Pada',
    dataIndex: 'tgl_dibuat',
    sorter: true,
  }
]

const LknViewView = (props) => {
  let noLkn          = ""
  let tanggal_dibuat = ""
  let noPenangkapan  = ""
  let tglPenangkapan = ""
  let jamPenangkapan = ""
  let fotoTersangka  = ""
  let jenisKelamin   = ""
  let umur           = ""
  let namaTersangka  = ""
  let barangBukti    = ""
  let prosesTsk      = ""
  let statusTsk      = ""

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
                      fotoTersangka != null || fotoTersangka != '' || fotoTersangka != undefined ?
                      (<img src='https://f1.pngfuel.com/png/455/507/814/person-silhouette-man-drawing-male-profile-of-a-person-female-face-png-clip-art-thumbnail.png' style={styles.fotoTersangka}/>)
                      :
                      (<img src={{ uri: fotoTersangka }} style={styles.fotoTersangka}/>)
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
                        <Layout>
                        </Layout>
                      </TabPane>

                      <TabPane tab='Status Tersangka' key='2'>
                        
                      </TabPane>

                      <TabPane tab='Barang Bukti Tersangka' key='3'>
                        <Layout>

                        </Layout>
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
}

export default LknViewView;
