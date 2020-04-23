import React from 'react'
import ViewContainer from '../ui-container/viewContainer';

import { Descriptions } from 'antd';


const LknViewView = (props) => {
    let noLkn=''
    let tanggal_dibuat='';
    if(!props.lkn[0]){
        noLkn = '';
        tanggal_dibuat = '';
    } else{
        noLkn = props.lkn[0].LKN;
        tanggal_dibuat = props.lkn[0].tgl_dibuat;
    }
    console.log('isi props', props)
    
    return (
      <ViewContainer>
        <Descriptions title="LKN Info">
            <Descriptions.Item label="No. LKN">{noLkn}</Descriptions.Item>
            <Descriptions.Item label="Tanggal Dibuat">{tanggal_dibuat}</Descriptions.Item>
        </Descriptions>
      </ViewContainer>
    );
};

export default LknViewView;
