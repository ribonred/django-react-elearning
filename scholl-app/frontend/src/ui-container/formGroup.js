import React, { useState } from 'react'
import { Form, message, TimePicker, Input, InputNumber, DatePicker, Select, Upload, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';

const { Option } = Select;
const { TextArea } = Input;

const FormGroup = (props) => {
    const [componentSize, setComponentSize] = useState('medium');
    const [form] = Form.useForm();
    const onFormLayoutChange = ({ size }) => {
      setComponentSize(size);
    };

    const uploadProps = {
      name: 'fileList',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
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
          ? moment(new Date(props.defaultValue[data.fieldName]), dateFormat) : ''
        return (
          <Form.Item
            key={data.fieldName}
            label={data.label}
            rules={[{ required: true, message: `Masukkan ${data.label} dibuat form!` }]}
          >
            <DatePicker defaultValue={defaultDate} onChange={(i, e) => props.onFormChange(data.fieldName, e)}/>
          </Form.Item>
        )
      } else if(data.type === 'select'){
        return (
          <Form.Item
            key={data.fieldName}
            label={data.label}
            rules={[{ required: true, message: `Masukkan ${data.label} dibuat form!` }]}
          >
            <Select
              style={{ width: 200 }}
              placeholder={`pilih ${data.label}`}
              onChange={(e) => props.onFormChange(data.fieldName, e)}
            >
              {data.dropdown.map((opsi) =>
                <Option key={opsi} value={opsi}>{opsi}</Option>
              )}
            </Select>
          </Form.Item>
        )
      } else if(data.type === 'number'){
        return (
          <Form.Item
            key={data.fieldName}
            label={data.label}
            name={data.name}
            rules={[{ required: true, message: `Masukkan field ${data.name}!` }]}
          >
              <InputNumber onChange={(e) => { props.onFormChange(data.fieldName, e) }} />
          </Form.Item>
        )
      } else if(data.type === 'upload'){
        return (
          <Form.Item
            key={data.fieldName}
            label={data.label}
            rules={[{ required: true, message: `Masukkan field ${data.name}!` }]}
          >
            <Upload {...uploadProps}>
              <Button>
                <UploadOutlined />
              </Button>
            </Upload>
          </Form.Item>
        )
      } else if(data.type === 'time'){
        return (
          <Form.Item
            key={data.fieldName}
            label={data.label}
            rules={[{ required: true, message: `Masukkan field ${data.name}!` }]}
          >
            <TimePicker onChange={(i,e) => props.onFormChange(data.fieldName, e)}/>
          </Form.Item>
        )
      } else if(data.type === 'area'){
        return (
          <Form.Item
            key={data.fieldName}
            label={data.label}
            rules={[{ required: true, message: `Masukkan field ${data.name}!` }]}
          >
            <TextArea onChange={(e) => props.onFormChange(data.fieldName, e)} rows={5} />
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
            span: 12,
          }}
          wrapperCol={{
            span: 20,
          }}
          layout="vertical"
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
