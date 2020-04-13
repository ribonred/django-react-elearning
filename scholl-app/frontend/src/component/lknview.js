import React from 'react'
import ViewContainer from '../ui-container/viewContainer';

import { Descriptions } from 'antd';


const LknViewView = (props) => {
    console.log('aaaa',props.lkn)
    return (
      <ViewContainer>
          <Descriptions title="LKN Info">
            <Descriptions.Item label="No. LKN">{props.lkn.LKN}</Descriptions.Item>
            <Descriptions.Item label="Tanggal Dibuat">{props.lkn.tanggal_dibuat}</Descriptions.Item>
        </Descriptions>,
      </ViewContainer>
    );
};

export default LknViewView;