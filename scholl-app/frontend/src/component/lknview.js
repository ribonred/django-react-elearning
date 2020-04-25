import React from "react";
import ViewContainer from "../ui-container/viewContainer";
import { Descriptions, Tabs } from "antd";

const { TabPane } = Tabs

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

  if (!props.lkn[0]) {
    noLkn          = ""
    tanggal_dibuat = ""
  } else {
    noLkn = props.lkn[0].LKN
    tanggal_dibuat  = props.lkn[0].tgl_dibuat
    noPenangkapan   = props.lkn[0].penangkapan[0].no_penangkapan
    tglPenangkapan  = props.lkn[0].penangkapan[0].tanggal_penangkapan
    jamPenangkapan  = props.lkn[0].penangkapan[0].jam_penangkapan
    fotoTersangka   = props.lkn[0].penangkapan[0].penangkapan_tersangka[0].foto
    jenisKelamin    = props.lkn[0].penangkapan[0].penangkapan_tersangka[0].jenis_kelamin
    umur            = props.lkn[0].penangkapan[0].penangkapan_tersangka[0].umur
    namaTersangka   = props.lkn[0].penangkapan[0].penangkapan_tersangka[0].nama_tersangka
    
    // map array of object
    barangBukti     = props.lkn[0].penangkapan[0].penangkapan_tersangka[0].barangbuktitersangka
    prosesTsk       = props.lkn[0].penangkapan[0].penangkapan_tersangka[0].prosestersangka.map((data, i) => (
      <div>
        <div style={{display: 'flex', flexDirection: 'row', verticalAlign: 'center', padding: '10px 10px 2px'}}>
          <p style={{width: '9.58vw', margin: 0}}>{data.no_proses}</p>
          <p style={{margin: 0}}>{data.keterangan}</p>
        </div>
        <div style={{borderTop: '1px solid #6d6d6d', opacity: '0.1'}}/>
      </div>
    ))

    statusTsk       = props.lkn[0].penangkapan[0].penangkapan_tersangka[0].statustersangka.map((data,i) => (
      <div>
        <p>{data.waktu}</p>
      </div>
    ))
    
  }
  console.log("props", props.lkn)
  

  return (
    <ViewContainer>
      <Descriptions title="LKN Info">
        <Descriptions.Item label="No. LKN">{noLkn}</Descriptions.Item>
        <Descriptions.Item label="Tanggal Dibuat">{tanggal_dibuat}</Descriptions.Item>
      </Descriptions>

      <div style={styles.detailBox}>
        <Descriptions title="Penangkapan">
          <Descriptions.Item label="No. Penangkapan">{noPenangkapan}</Descriptions.Item>
          <Descriptions.Item label="Tanggal Penangkapan">{tglPenangkapan}</Descriptions.Item>
          <Descriptions.Item label="Jam Penangkapan">{jamPenangkapan}</Descriptions.Item>
          <div style={{borderTop: '1px dashed #6d6d6d'}}/>
        </Descriptions>

        <div style={styles.penangkapanBox}>
          {/* Kolom Profil Tersangka */}
          <div style={styles.profilTersangkaBox}>
            {/* Kolom Foto */}
            <div style={styles.fotoTersangkaBox}>
            { 
              fotoTersangka != null || fotoTersangka != '' || fotoTersangka != undefined ?
              (<img src={require('./../assets/no_picture.png')} style={styles.fotoTersangka}/>)
              :
              (<img src={{ uri: fotoTersangka }} style={styles.fotoTersangka}/>)
            }
            </div>
            {/* Kolom Deskripsi Foto */}
            <div style={{paddingTop: '10px'}}>
              <p style={{fontSize: 20, textAlign: 'center', verticalAlign: 'middle', margin: 0, fontWeight: 'bold', fontFamily: 'Roboto'}}>{namaTersangka.toUpperCase()}</p>
              <p style={{fontSize: 16, textAlign: 'center', verticalAlign: 'middle', margin: 0}}>{jenisKelamin.toUpperCase()}</p>
              <p style={{fontSize: 16, textAlign: 'center', verticalAlign: 'middle', margin: 0}}>{umur} Tahun</p>
            </div>
          </div>
          
          {/* Kolom Deskripsi Status Tersangka */}
          <div style={{backgroundColor: 'white', width: '100vw', height: '42vh', marginLeft: '1vw', padding: '5px'}}>
            <Tabs defaultActiveKey='1'>
              <TabPane tab='Proses Tersangka' key='1'>
                <div style={{display: 'flex', flexDirection: 'row', backgroundColor: '#f1f2f5', verticalAlign: 'center', padding: '10px'}}>
                  <div style={{width: '9.58vw'}}>
                    <p style={{margin: 0}}>No. Proses</p>
                  </div>
                  <div>
                    <p style={{margin: 0}}>Keterangan</p>
                  </div>
                </div>
                {prosesTsk}
              </TabPane>

              <TabPane tab='Status Tersangka' key='2'>

              </TabPane>

              <TabPane tab='Barang Bukti Tersangka' key='3'>

              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </ViewContainer>
  );
};

const styles = {
  detailBox: {
    backgroundImage: '#dedede',
    padding: '10px',
    boxShadow: '0px 0px 10px #dedede',
    opacity: '0,8'
  },
  penangkapanBox: {
    display: 'flex',
    flexDirection: 'row',
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
