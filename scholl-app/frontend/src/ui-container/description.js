import React from 'react'
import ViewContainer from '../ui-container/viewContainer';
import ImageViewer from '../component/image/imagePreview';
import ModalDescription from '../component/modal/modalDescription';

import { Descriptions, Button } from 'antd';

class DescriptionView extends React.Component {
    state = {
        visible: false,
    }
    photoData=null;
    render(){
        var DescriptionList = ''
        if(this.props.data) {
            DescriptionList = this.props.data.map((data) => {
                if(data.label === 'Foto'){
                  this.photoData=data.value
                  return (
                    <div key={data.label}/>
                  )
                }
                return (
                    <Descriptions.Item key={data.label} label={data.label}>{data.value || 'no item'}</Descriptions.Item>
                )
            })
        }
        return (
            <ViewContainer>
                <Descriptions title={this.props.title}>
                    {DescriptionList}
                </Descriptions>
                {!this.props.hidePhoto && <ImageViewer photoSource={this.photoData}/>}
                {this.props.showDocument && 
                <Button onClick={() => {this.setState({visible: true})}} type="primary"><b>Lihat Dokumen</b></Button>
                }
                <ModalDescription
                    visible={this.state.visible}
                    data={this.props.dataDokumen}
                    hideModal={() => this.setState({visible: false})}
                />
            </ViewContainer>
        )
    }
}

export default DescriptionView;