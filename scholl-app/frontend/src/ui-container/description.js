import React from 'react'
import ViewContainer from '../ui-container/viewContainer';
import { Descriptions } from 'antd';

const DescriptionView = (props) => {
    console.log('props description', props)
    var DescriptionList = ''
    if(props.data) {
        DescriptionList = props.data.map((data) => {
            return (
            <Descriptions.Item label={data.label}>{data.value}</Descriptions.Item>
            )
        })
    }

    return (
        <ViewContainer>
            <Descriptions title={props.title} >
                {DescriptionList}
            </Descriptions>
        </ViewContainer>
    )
}

export default DescriptionView;