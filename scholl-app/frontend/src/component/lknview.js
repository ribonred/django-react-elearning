import React from 'react'
import ViewContainer from '../ui-container/viewContainer';

import { Descriptions } from 'antd';


const LknViewView = (props) => {
    return (
      <ViewContainer>
          <Descriptions title="LKN Info">
            <Descriptions.Item label="No. LKN">Zhou Maomao</Descriptions.Item>
            <Descriptions.Item label="Tanggal Dibuat">1810000000</Descriptions.Item>
        </Descriptions>,
      </ViewContainer>
    );
};

export default LknViewView;