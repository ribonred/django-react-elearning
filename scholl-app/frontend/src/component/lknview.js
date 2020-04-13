import React from 'react'
import ViewContainer from '../ui-container/viewContainer';
import { Link } from 'react-router-dom'

import { Descriptions, Button } from 'antd';


const LknViewView = (props) => {
    if(!props.lkn[0]){
        var noLkn = '';
        var tanggal_dibuat = '';
    } else{
        var noLkn = props.lkn[0].LKN;
        var tanggal_dibuat = props.lkn[0].tgl_dibuat;
    }
    return (
      <ViewContainer>
        <Descriptions title="LKN Info">
            <Descriptions.Item label="No. LKN">{noLkn}</Descriptions.Item>
            <Descriptions.Item label="Tanggal Dibuat">{tanggal_dibuat}</Descriptions.Item>
        </Descriptions>
        <Button style={{ fontWeight: 'bold' }} type="primary" htmlType="submit">
            <Link to="/dashboard/lkn/penangkapan/buat">Tambah Penangkapan</Link>
        </Button>
      </ViewContainer>
    );
};

export default LknViewView;