import React from 'react'
import { List, Modal, Button } from 'antd';
import history from '../../route/history';

const buttonTitle = ['Sp Han Doc', 'Tap Han Doc', 'Surat Perpanjangan Han Doc', 'Statusbarangbukti', 'Sp Sita Doc', 'Tap Sita Doc', 'Tap Status Doc', 'Nomor Lab Doc']
export default class modalDescription extends React.Component {
    render() {
      let data = []
      let hideField = this.props.hideField || [];
      if(this.props.data){
        const values = Object.values(this.props.data);
        var keys = Object.keys(this.props.data);
        keys = keys.filter(
          function(e) {
            return this.indexOf(e) < 0;
          },
          hideField
        )
        data = keys.filter(item => (this.props.data[item] !==null && this.props.data[item] !=='no item')).map((char, index) => {
          return {
            title: char.split('_').map(substr => {
              return substr.charAt(0).toUpperCase() + substr.slice(1)
            }).join(' '),
            description: char === 'statusbarangbukti' ? 'status' : this.props.data[char]
          }
        })
      }
      return (
        <div style={{'padding': '15px'}}>
          <Modal
            title={this.props.formTitle}
            onCancel={() => this.props.hideModal()}
            visible={this.props.visible}
            footer={[]}
          >
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={<p><b>{item.title}</b></p>}
                      description={buttonTitle.indexOf(item.title) !== -1 && item.description 
                        ? <Button onClick={item.title === 'Statusbarangbukti' 
                            ? ()=> history.push(`/dashboard/barangbukti/${this.props.data.id}`) 
                              :()=>window.open(item.description)} type="primary">
                                {item.title === 'Statusbarangbukti' ? 'Buka Status Barang Bukti' : 'Buka Dokumen'}
                          </Button> : <p>{item.description || "tidak ada item"}</p>}
                    />
                  </List.Item>
                )}
              />
          </Modal>
        </div>
      );
    }
}
