import { Descriptions } from 'antd';
import React from 'react'

const ShowForm = (props) => {
    // const FormList = props.formData.map((data) =>
    //     <Form.Item
    //       key={data.fieldName}
    //       label={data.label}
    //       name={data.name}
    //       rules={[{ required: true, message: `Please input your ${data.name}!` }]}
    //     >
    //       <Input onInput={(e) => { props.onFormChange(data.fieldName, e) }} type={data.name}/>
    //     </Form.Item>
    // );

    return (
        <Descriptions title="User Info">
            <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
            <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
            <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
            <Descriptions.Item label="Remark">empty</Descriptions.Item>
            <Descriptions.Item label="Address">
            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item>
        </Descriptions>
    );
    
};

export default ShowForm;