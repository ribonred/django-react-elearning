import React from "react";
import ViewContainer from "../ui-container/viewContainer";
import { Descriptions, Tabs, Skeleton } from "antd";
import ImageView from '../component/image/imagePreview';
import TableView from './table/tableView';

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
    title: 'Jenis Proses',
    dataIndex: 'jenis_proses',
    sorter: true,
    search: true,
  },
  {
    title: 'Tangal Mulai',
    dataIndex: 'tanggal_mulai_proses',
  },
  {
    title: 'Tanggal Berakhir',
    dataIndex: 'tanggal_akhir_proses',
  },
]

const tableFieldBarangBukti = [
  {
    title: 'BB',
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
    title: 'Tap Sita',
    dataIndex: 'tap_sita',
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
  console.log('props isLoading', props.isLoading)
  if(!props.isLoading){
    return (
      <ViewContainer>
        <Descriptions title="LKN Info">
          <Descriptions.Item label="No. LKN">{noLkn}</Descriptions.Item>
          <Descriptions.Item label="Tanggal Dibuat">{tanggal_dibuat}</Descriptions.Item>
        </Descriptions>
          {props.lkn.penangkapan && props.lkn.penangkapan.map(data =>
            <div key={data.id} style={styles.detailBox}>
              <Descriptions title="Penangkapan">
                <Descriptions.Item label="SP KAP">{data.no_penangkapan}</Descriptions.Item>
                <Descriptions.Item label="Tanggal Penangkapan">{data.tanggal_penangkapan}</Descriptions.Item>
                <Descriptions.Item label="Masa Berakhir Penangkapan">{data.masa_berakhir_penangkapan}</Descriptions.Item>
                <div style={{borderTop: '1px dashed #6d6d6d'}}/>
              </Descriptions>
              {data.penangkapan_tersangka.map(tsk =>
                <div key={tsk.id} style={styles.penangkapanBox}>
                  <div style={styles.profilTersangkaBox}>
                    <div style={styles.fotoTersangkaBox}>
                    {
                      tsk.foto === null || tsk.foto === '' || tsk.foto === undefined ?
                      (<img alt='view' src='https://fisipwarmadewa.ac.id/wp-content/uploads/2016/11/No-image-found.jpg' style={styles.fotoTersangka}/>)
                      :
                      (
                        <ImageView photoSource={tsk.foto}>
                          <img alt='view' src={tsk.foto} style={styles.fotoTersangkaShow}/>
                        </ImageView>
                      )
                    }
                    </div>
                    <div style={{paddingTop: '10px', marginTop: '50px'}}>
                      <p style={styles.namaTersangka}>{tsk.nama_tersangka}</p>
                      <p style={styles.keteranganTersangka}>{tsk.jenis_kelamin.toUpperCase()}</p>
                      <p style={styles.keteranganTersangka}>{tsk.umur} Tahun</p>
                    </div>
                  </div>

                  <div style={styles.tabTersangka}>
                    <Tabs defaultActiveKey='1'>
                      <TabPane tab='Proses Tersangka' key='1'>
                        <div style={styles.detailBoxPenangkapan}>
                          <TableView
                            hideField={['id', 'proses_tersangka']}
                            path="proses tersangka"
                            isNotAllowTo={['view','edit','delete']}
                            tableField={tableFieldProses}
                            tableData={tsk.prosestersangka.map(data => {
                              return {
                                ...data,
                                jenis_proses: props.prosesIndex.find(item => item.id === data.jenis_proses).nama_proses,
                              }
                            })}
                          />
                        </div>
                      </TabPane>

                      <TabPane tab='Status Tersangka' key='2'>
                        <div style={styles.detailBoxPenangkapan}>
                        <TableView
                          hideField={['id', 'tersangka_id']}
                          path="status tersangka"
                          tableField={tableFieldStatus}
                          tableData={tsk.statustersangka}
                        />
                        </div>
                      </TabPane>

                      <TabPane tab='Barang Bukti Tersangka' key='3'>
                        <div style={styles.detailBoxPenangkapan}>
                        <TableView
                          hideField={['id']}
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
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center'
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
    width: '3cm',
    height: '3cm',
  },
  fotoTersangka: {
    width: '100%',
    height: '100%',
    borderRadius: '20px',
  },
  fotoTersangkaShow: {
    width: '100%',
    height: '100%',
    borderRadius: '20px',
    marginTop: '15px',
  },
  detailBoxPenangkapan: {
    height: '270px',
    overflowY: 'scroll'
  },
  namaTersangka: {
    fontSize: 16,
    textAlign: 'center',
    verticalAlign: 'middle',
    margin: 0,
    fontWeight: 'bold',
    fontFamily: 'Roboto'
  },
  keteranganTersangka: {
    fontSize: 12,
    textAlign: 'center',
    verticalAlign: 'middle',
    margin: 0
  },
  tabTersangka: {
    backgroundColor: 'white',
    width: '57vw',
    height: '42vh',
    marginLeft: '1vw',
    padding: '5px'
  }
}

export default LknViewView;
