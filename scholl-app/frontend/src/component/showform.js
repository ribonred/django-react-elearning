import { Descriptions, Form } from 'antd';
import React from 'react'

const ShowForm = (props) => {
    const DescriptionList = props.dataShow.map((data) => {
        return <Descriptions.Item label={data.label}>{data.value}</Descriptions.Item>    
    })

    return (
        <Descriptions title="User Info">
            {DescriptionList}
        </Descriptions>
    );
    
};

export default ShowForm;