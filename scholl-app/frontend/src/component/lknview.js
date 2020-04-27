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
  console.log('props', props.lkn)
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

    // error ndek props.lkn.penangkapan[0], soale aku ga ngerti ngopo kok ndek tek ku moco iku sebagai object duduk array, please advice mas
    // noPenangkapan   = props.lkn.penangkapan[0].no_penangkapan
    // tglPenangkapan  = props.lkn.penangkapan[0].tanggal_penangkapan
    // jamPenangkapan  = props.lkn.penangkapan[0].jam_penangkapan
    // fotoTersangka   = props.lkn.penangkapan[0].penangkapan_tersangka[0].foto
    // jenisKelamin    = props.lkn.penangkapan[0].penangkapan_tersangka[0].jenis_kelamin
    // umur            = props.lkn.penangkapan[0].penangkapan_tersangka[0].umur
    // namaTersangka   = props.lkn.penangkapan[0].penangkapan_tersangka[0].nama_tersangka

    // // map array of object
    // barangBukti     = props.lkn.penangkapan[0].penangkapan_tersangka[0].barangbuktitersangka
    // prosesTsk       = props.lkn.penangkapan[0].penangkapan_tersangka[0].prosestersangka.map((data, i) => (
    //   <div>
    //     <div style={{display: 'flex', flexDirection: 'row', verticalAlign: 'center', padding: '10px 10px 2px'}}>
    //       <p style={{width: '9.58vw', margin: 0}}>{data.no_proses}</p>
    //       <p style={{margin: 0}}>{data.keterangan}</p>
    //     </div>
    //     <div style={{borderTop: '1px solid #6d6d6d', opacity: '0.1'}}/>
    //   </div>
    // ))

    // statusTsk       = props.lkn.penangkapan[0].penangkapan_tersangka[0].statustersangka.map((data,i) => (
    //   <div>
    //     <p>{data.waktu}</p>
    //   </div>
    // ))

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
                    <Tabs style={{overflow: 'unset'}} defaultActiveKey='1'>
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
    // width: '70vw'
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
  overflowY: {
    'overflow-y':'scroll',
  },
  fotoTersangka: {
    width: '100%',
    height: '100%',
    borderRadius: '20px',
  },
}

export default LknViewView;
