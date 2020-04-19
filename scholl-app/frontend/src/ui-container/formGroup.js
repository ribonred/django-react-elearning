import React, { useState } from 'react'
import { Form, Input, DatePicker } from 'antd'
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';

const FormGroup = (props) => {
    const [componentSize, setComponentSize] = useState('medium');
    const [form] = Form.useForm();
    const onFormLayoutChange = ({ size }) => {
      setComponentSize(size);
    };

    React.useEffect(() => {
      form.setFieldsValue(props.defaultValue || {});
    }, []);

    const FormList = props.formData.map((data) => {
      if(data.type === 'input' || data.type === null || data.type === undefined){
        return (
          <Form.Item
            key={data.fieldName}
            label={data.label}
            name={data.name}
            rules={[{ required: true, message: `Please input your ${data.name}!` }]}
          >
            <Input onInput={(e) => { props.onFormChange(data.fieldName, e) }} type={data.name}/>
          </Form.Item>
        )
      } else if(data.type === 'date'){
        const defaultDate = props.defaultValue && props.defaultValue[data.fieldName]
          ? moment(new Date(props.defaultValue[data.fieldName]), dateFormat) : moment(new Date(), dateFormat)
        return (
          <Form.Item
            key={data.fieldName}
            label={data.label}
            rules={[{ message: `Masukkan ${data.label} dibuat form!` }]}
          >
            <DatePicker defaultValue={defaultDate} onChange={(i, e) => props.onFormChange(data.fieldName, e)}/>
          </Form.Item>
        )
      }
      return <div />
    }
  );

    return (
        <Form
          form={form}
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
