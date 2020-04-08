import React, { useState } from 'react'
import { Form, Input } from 'antd'

const FormGroup = (props) => {
    const [componentSize, setComponentSize] = useState('medium');

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const FormList = props.formData.map((data) =>
        <Form.Item
          label={data.label}
          name={data.name}
          rules={[{ required: true, message: `Please input your ${data.name}!` }]}
        >
          <Input onInput={(e) => { props.onFormChange(data.fieldName, e) }}/>
        </Form.Item>
    );

    return (
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 18,
          }}
          layout="horizontal"
            initialValues={{
              size: componentSize,
            }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
        >
            {FormList}
            {props.children}
        </Form>
    );
};

export default FormGroup;
