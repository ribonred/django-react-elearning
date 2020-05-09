import React from 'react'
import ViewContainer from '../ui-container/viewContainer';
import ImageViewer from '../component/image/imagePreview';

import { Descriptions } from 'antd';

class DescriptionView extends React.Component {
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
                    <Descriptions.Item key={data.label} label={data.label}>{data.value}</Descriptions.Item>
                )
            })
        }
        return (
            <ViewContainer>
                <Descriptions title={this.props.title}>
                    {DescriptionList}
                </Descriptions>
                {!this.props.hidePhoto && <ImageViewer photoSource={this.photoData}/>}
            </ViewContainer>
        )
    }
}

export default DescriptionView;