import React, { useState } from 'react'
import { Form, Dropdown, TimePicker, Input, InputNumber, DatePicker, Select, Button } from 'antd'
import Uploader from '../component/uploader';
import moment from 'moment';

const dateFormat = 'DD-MM-YYYY';

const { Option } = Select;
const { TextArea } = Input;


const FormGroup = (props) => {
    const [componentSize, setComponentSize] = useState('medium');
    const [form] = Form.useForm();
    const onFormLayoutChange = ({ size }) => {
      setComponentSize(size);
    };

    const onSubmit = () => {
      props.onSubmit();
      setTimeout(() => { form.resetFields() }, 2000);
    }

    React.useEffect(() => {
      form.setFieldsValue(props.defaultValue || {});
    }, [props.defaultValue, form]);

    const FormList = props.formData.map((data) => {
      if(data.type === 'input' || data.type === null || data.type === undefined){
        return (
          <Form.Item
            key={data.fieldName}
            label={data.label}
            name={data.fieldName}
            value={props.defaultValue && props.defaultValue[data.fieldName]}
            rules={[{ required: true, message: `Please input your ${data.name}!` }]}
          >
              <Input onInput={(e) => { props.onFormChange(data.fieldName, e) }} type={data.name}/>
          </Form.Item>
        )
      } else if(data.type === 'date'){
        var defaultDate = '';
        if (props.defaultValue && props.defaultValue[data.fieldName]){
          var dateParts = props.defaultValue[data.fieldName].split("-");
          var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
          defaultDate = moment(dateObject);
        } else {
          defaultDate = null;
        }

        return (
          <Form.Item
            key={data.fieldName}
            label={data.label}
            rules={[{ required: true, message: `Masukkan ${data.label} dibuat form!` }]}
          >
            <DatePicker value={defaultDate} defaultValue={defaultDate} format={dateFormat} onChange={(i, e) => props.onFormChange(data.fieldName, e)}/>
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
              allowClear
              disabled={data.disabled}
              style={{ width: 200 }}
              value={props.defaultValue && props.defaultValue[data.fieldName]}
              placeholder={`pilih ${data.label}`}
              defaultValue={props.defaultValue && props.defaultValue[data.fieldName]
                ? props.defaultValue[data.fieldName] : null}
              onChange={(e) => props.onFormChange(data.fieldName, e)}
            >
              {data.dropdown.map((opsi) =>
                <Option key={opsi.value} value={opsi.value}>{opsi.name}</Option>
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
              <InputNumber min={0} onChange={(e) => { props.onFormChange(data.fieldName, e) }} />
          </Form.Item>
        )
      } else if(data.type === 'upload'){
        return (
          <Form.Item
            key={data.fieldName}
            label={data.label}
            rules={[{ required: true, message: `Masukkan field ${data.name}!` }]}
          >
            <Uploader fieldName={data.fieldName} onFormChange={props.onFormChange}/>
          </Form.Item>
        )
      } else if(data.type === 'time'){
        return (
          <Form.Item
            key={data.fieldName}
            label={data.label}
            rules={[{ required: true, message: `Masukkan field ${data.name}!` }]}
          >
            <TimePicker defaultValue={props.defaultValue && props.defaultValue[data.fieldName] ? moment(props.defaultValue[data.fieldName], 'HH:mm:ss') : ''} onChange={(i,e) => props.onFormChange(data.fieldName, e)}/>
          </Form.Item>
        )
      } else if(data.type === 'area'){
        return (
          <Form.Item
            key={data.fieldName}
            label={data.label}
            rules={[{ required: true, message: `Masukkan field ${data.name}!` }]}
          >
            <TextArea defaultValue={props.defaultValue && props.defaultValue[data.fieldName]} onChange={(e) => props.onFormChange(data.fieldName, e)} rows={5} />
          </Form.Item>
        )
      } else if(data.type === 'disabled'){
        return (
          <Form.Item
            key={data.fieldName}
            label={data.label}
            rules={[{ required: true, message: `Masukkan field ${data.name}!` }]}
          >
            <Dropdown.Button disabled>
              {data.value}
            </Dropdown.Button>
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
          onFinish={onSubmit}
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
            {props.onSubmit && (
              <Button type='primary' onClick={onSubmit}>
                submit
              </Button>
            )}
        </Form>
    );
};

export default FormGroup;
