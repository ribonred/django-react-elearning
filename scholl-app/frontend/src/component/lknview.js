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
                        <div style={styles.detailBoxPenangkapan}>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias iure amet dolor voluptatem ad totam dolorum! Eligendi ad nisi totam ut veniam qui ullam labore odit rerum et amet obcaecati, deleniti, optio voluptatibus atque explicabo molestias. Odio voluptas ipsam obcaecati expedita, modi consequatur odit aliquid non! Placeat impedit, vero voluptate unde odit repellat quod non in ipsam id repellendus dolor error maxime nam. Aspernatur mollitia ullam doloremque totam libero harum atque consequatur explicabo voluptas? Sunt dignissimos voluptates commodi delectus esse hic neque excepturi. Debitis tempore atque quos natus provident, numquam et nulla eaque excepturi veniam dolorem deleniti esse illo nemo a cum, nobis hic inventore sed. Animi pariatur recusandae veniam repellat iusto dolorem aperiam fuga, sunt quae, ipsam facilis consequatur ipsum eligendi facere tempora suscipit delectus id cum sit necessitatibus. Hic delectus qui eligendi sit, at quasi sequi numquam in animi perferendis libero, nobis reiciendis temporibus? Alias blanditiis totam optio earum quam veritatis, eum, praesentium fugiat, impedit officiis ducimus. Necessitatibus, quasi tempora? Nulla ad, recusandae sapiente quis modi hic rerum fugiat est quam porro beatae voluptas inventore, sint eum voluptatem dolorum corporis illum incidunt molestiae vitae itaque veniam debitis adipisci dolore. Deserunt doloribus nesciunt qui, totam labore voluptatum numquam ut! Obcaecati facere voluptatibus, deleniti ex fuga placeat ad quis distinctio officia repudiandae dignissimos ipsa voluptas dolore ullam nostrum molestias qui numquam consequatur ipsum? Autem pariatur harum, voluptates, ad esse nam saepe illo temporibus id consequatur rerum incidunt sed natus ipsa optio in quisquam provident odio impedit expedita! Illum modi similique consequatur vitae? Quis vel quam repellat, ut nesciunt tempore vero temporibus nulla consequatur neque libero praesentium culpa perspiciatis, excepturi recusandae ipsum itaque nam minus? Suscipit laudantium, recusandae hic repellat autem quae architecto corporis sit tempore beatae qui molestiae rem dolor numquam ullam incidunt delectus commodi libero, cumque in assumenda aut.
                          </p>
                        </div>
                      </TabPane>

                      <TabPane tab='Status Tersangka' key='2'>
                        <div style={styles.detailBoxPenangkapan}>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum id, enim explicabo doloremque pariatur ut aliquid qui veniam sit iusto dignissimos vero cum eaque natus, necessitatibus repellendus ducimus saepe veritatis quia. Laboriosam est eligendi sed odio quod libero consequuntur ab delectus repellat itaque magni eius veniam quos impedit nesciunt ratione alias dolores, doloribus possimus quidem facilis adipisci vero blanditiis labore. Nostrum repellat maxime sequi, nobis voluptas dolorem ea aliquam, quas eveniet praesentium saepe corporis hic sunt magni impedit fugit veritatis ducimus tempore autem minus! Sunt ut cumque expedita fugiat, alias esse dolor totam modi necessitatibus. Asperiores atque cupiditate, ipsa porro vitae maiores perspiciatis, aperiam non iure explicabo voluptates illo et quos fuga? Maxime distinctio, fuga eveniet error mollitia placeat pariatur totam fugiat aperiam repudiandae voluptatum eaque sunt accusamus veniam tenetur nemo quia quo reprehenderit sint beatae at rerum. Harum eos optio cupiditate. Veniam, nihil! Explicabo consequatur iure voluptate illum eaque, architecto assumenda cumque dolores aspernatur vitae, sequi reiciendis, ipsam ea suscipit omnis quia saepe quidem! Laudantium, ut. Cum dignissimos delectus sed eius autem laboriosam nihil asperiores quos excepturi nesciunt aperiam itaque repudiandae, qui reprehenderit corrupti! Iste, dicta deleniti minus aperiam ullam, id aut voluptatem maxime doloribus reprehenderit deserunt, ad odit. Aperiam aliquam ea commodi rerum molestiae nihil vel vero, odio hic? Deleniti, animi ipsum debitis velit voluptates possimus mollitia. Hic libero dolores itaque excepturi, officiis dolorum esse magni commodi voluptates possimus tempora cupiditate exercitationem non vero. Asperiores illo itaque, debitis quas adipisci totam maiores est perspiciatis quod. Laudantium commodi totam consequatur eos obcaecati nemo voluptatem dolore id! Illo fugiat rem sed, iusto nesciunt distinctio quos culpa. Molestias alias aut atque eius dolores mollitia velit iure tenetur autem ipsum voluptas, hic a laborum placeat excepturi amet quidem nostrum, porro architecto id quis eum illo ratione. Voluptas magni iste ipsum quasi blanditiis!
                          </p>
                        </div>
                      </TabPane>

                      <TabPane tab='Barang Bukti Tersangka' key='3'>
                        <div style={styles.detailBoxPenangkapan}>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque eveniet consequatur vitae ipsam aspernatur molestias? Ab veniam provident voluptatibus accusamus nostrum officia accusantium eaque vitae, optio porro fuga ipsum autem mollitia repellat officiis dolores quaerat aliquam. Tempora laboriosam perferendis quidem cupiditate minima esse laborum, ipsam voluptatum molestiae accusamus blanditiis, corporis numquam obcaecati fugiat, saepe aliquid quaerat quisquam sed tenetur dolore quibusdam iusto facilis nisi optio? Soluta, ullam! Ad vitae qui debitis nesciunt voluptatibus animi velit magni aliquid atque, excepturi similique ut quam recusandae pariatur adipisci sint quos totam quia laboriosam! Amet cumque a quae exercitationem animi. Rem deleniti illum sequi, nobis perferendis consequatur perspiciatis amet ex aliquid beatae eius hic animi asperiores vitae explicabo? Excepturi deserunt quo recusandae laudantium, accusamus aliquam quasi voluptate ut perspiciatis! Neque debitis nam quisquam earum maxime nisi vero dolores eum alias. Ipsam nisi, ipsa in nihil adipisci ullam officia obcaecati at dicta distinctio velit! Autem cupiditate laborum rerum. Facere optio quod ex omnis ratione aliquam dolores itaque quo reiciendis fugiat pariatur deleniti illo ipsa quidem consectetur eligendi iure dignissimos, deserunt natus eaque, consequatur doloremque? Nam at ut sit, voluptatibus ratione similique magnam ex. Amet fuga id iure molestias eius, reprehenderit aut quia, assumenda quas ex placeat libero quod consequatur voluptatibus ipsa! Blanditiis minus necessitatibus quod et, dicta porro voluptas id culpa laborum expedita! Autem dolorem, ut totam quaerat voluptates repellat corrupti, quo reiciendis aspernatur doloribus natus accusamus. A repellendus nam, voluptas nobis dignissimos aperiam nemo consequatur recusandae facere, necessitatibus eum quasi fugit mollitia, officiis omnis voluptatem consectetur velit doloremque facilis amet sapiente? Libero sint quaerat quam rem vero optio, expedita, ipsa earum soluta iste alias, reprehenderit provident veritatis beatae? Et, ipsam possimus adipisci illo odio, error magni excepturi ea eaque impedit distinctio fugit aut provident commodi veritatis ullam quibusdam in incidunt tenetur corrupti dolore quos.
                          </p>
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
