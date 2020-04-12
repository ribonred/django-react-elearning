import React from 'react'
import { Form, Button, DatePicker, Space, TimePicker, Select, Upload, Input, InputNumber } from 'antd';
import { Link } from 'react-router-dom';
import FormGroup from '../ui-container/formGroup';
import PageContainer from '../ui-container/pageContainer';
import history from '../route/history';
import moment from 'moment';
import { UploadOutlined } from '@ant-design/icons';
import FormItem from 'antd/lib/form/FormItem';

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const formData = [
  {label: 'No. Penangkapan', name: 'no_penangkapan', fieldName: 'no_penangkapan'},
]

const formDataTersangka = [
  {label: 'Nama Tersangka', name: 'nama_tersangka', fieldName: 'nama_tersangka'},
  {label: 'Umur', name: 'umur', fieldName: 'umur'},
  {label: 'Keterangan', name: 'keterangan', fieldName: 'keterangan'},
]

const formDataBB = [
  {label: 'Nama Barang', name: 'nama_barang', fieldName: 'nama_barang'},
  {label: 'No. SP Sita', name: 'sp_sita', fieldName: 'sp_sita'},
]

const dateFormat = 'YYYY-MM-DD';
const { Option } = Select;

const imageProps = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  transformFile(file) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const canvas = document.createElement('canvas');
        const img = document.createElement('img');
        img.src = reader.result;
        img.onload = () => {
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          ctx.fillStyle = 'red';
          ctx.textBaseline = 'middle';
          ctx.fillText('Ant Design', 20, 20);
          canvas.toBlob(resolve);
        };
      };
    });
  },
};

const PenangkapanFormView = (props) => {
    return (
      <PageContainer header='FORM DATA PENANGKAPAN'>
        
        <div align="right" style={{ margin: '20px' }}>
          <Space>
            <Button style={{ fontWeight: 'bold', backgroundColor: 'green', borderColor: 'green' }} type="primary" htmlType="submit" onClick={() => { props.onsubmit() }}>Simpan</Button>
            <Button style={{ fontWeight: 'bold' }} type="danger" htmlType="submit">
              <Link to="/dashboard/lkn/buat">Kembali</Link>
            </Button>
          </Space>
        </div>
        
        <FormGroup
          formData={formData}
          onFormChange={props.onFormChange}
        >
        <Form.Item
          label="Tanggal Dibuat"
          rules={[{ message: 'Masukkan tanggal dan jam!' }]}
        >
          <DatePicker defaultValue={moment(new Date(), dateFormat)} format={dateFormat} onChange={(i, e) => props.onFormChange('tanggal_penangkapan', e)} />
          <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} onChange={(i, e) => props.onFormChange('jam_penangkapan', e)} />
        </Form.Item>
        {props.isSaved && (
        <Form.Item {...tailLayout}>
          <Button style={{ fontWeight: 'bold'}} type="primary" htmlType="submit" onClick={() => props.onClickTambahTersangka()}>
            + Tersangka dan Barang Bukti
          </Button>
        </Form.Item>
        )}
        </FormGroup>
        {props.isAddTersangka && (
        <PageContainer header='FORM DATA TERSANGKA'>
          <FormGroup formData={formDataTersangka}
          onFormChange={props.onFormTersangkaChange}
          >
          <Form.Item
            label="Jenis Kelamin"
            name="jenis_kelamin"
            rules={[{ message: 'Please input your gender!' }]}
          >
            <Select defaultValue="laki-laki" style={{ width: 120 }} onChange={(e) => { props.onFormTersangkaChange('jenis_kelamin', e)}}>
                <Option value="laki-laki">laki-laki</Option>
                <Option value="perempuan">perempuan</Option>
            </Select>
          </Form.Item>
          <FormItem
            label="Foto Tersangka"
            name="foto"
          >
            <Upload {...imageProps}>
              <Button>
                <UploadOutlined /> Upload
              </Button>
            </Upload>
          </FormItem>
          <Form.Item
            label="Status Penahanan"
            name="status_penahanan"
            rules={[{ message: 'Please input status_penahanan!' }]}
          >
            <Select defaultValue="A" style={{ width: 120 }} onChange={(e) => { props.onFormTersangkaChange('status_penahanan', e)}}>
                <Option value="A">Di Amankan</Option>
                <Option value="T">Di Tahan</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Rekam Jejak"
            name="rekam_jejak"
            rules={[{ message: 'Please input rekam_jejak!' }]}
          >
            <Select defaultValue="M" style={{ width: 120 }} onChange={(e) => { props.onFormTersangkaChange('rekam_jejak', e)}}>
                <Option value="M">Masuk</Option>
                <Option value="K">Keluar</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Tanggal dan waktu"
            rules={[{ message: 'Masukkan tanggal dan jam!' }]}
          >
            <DatePicker defaultValue={moment(new Date(), dateFormat)} format={dateFormat} onChange={(i, e) => props.onFormTersangkaChange('tanggal', e)} />
            <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} onChange={(i, e) => props.onFormTersangkaChange('waktu', e)} />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button style={{ fontWeight: 'bold'}} type="primary" htmlType="submit" onClick={() => props.onClickTambahBB()}>
              + Barang bukti
            </Button>
          </Form.Item>
          {props.isAddBB && (
          <PageContainer header='FORM DATA BARANG BUKTI'>
            <FormGroup
            formData={formDataBB}
            onFormChange={props.onFormBBChange}
            >
            <Form.Item
              label="Jenis Barang"
              name="jenis_barang"
              rules={[{ message: 'Please input status_penahanan!' }]}
            >
              <Select defaultValue="NARKOTIK" style={{ width: 120 }} onChange={(e) => { props.onFormBBChange('jenis_barang', e)}}>
                  <Option value="NARKOTIK">NARKOTIKA</Option>
                  <Option value="NON_NARKOTIK">NON_NARKOTIKA</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Tanggal dan waktu"
              rules={[{ message: 'Masukkan tanggal dan jam!' }]}
            >
              <DatePicker defaultValue={moment(new Date(), dateFormat)} format={dateFormat} onChange={(i, e) => props.onFormBBChange('tanggal_status', e)} />
              <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} onChange={(i, e) => props.onFormBBChange('waktu_status', e)} />
            </Form.Item>
            <Form.Item
              label="Keterangan"
              name="keterangan"
            >
              <Input onInput={(e) => { props.onFormBBChange('keterangan', e) }} type='keterangan'/>
            </Form.Item>
            <Form.Item
              label="Status Barang"
              name="status"
              rules={[{ message: 'Please input status_penahanan!' }]}
            >
              <Select defaultValue="M" style={{ width: 120 }} onChange={(e) => { props.onFormBBChange('status', e)}}>
                  <Option value="M">Masuk</Option>
                  <Option value="K">Keluar</Option>
              </Select>
            </Form.Item>
            <FormItem
            label="Jumlah Barang"
            name="jumlah"
            >
              <InputNumber min={0} step={0.1} onChange={(e) => { props.onFormBBChange('jumlah', e)}} />
            </FormItem>
            </FormGroup>
          </PageContainer>
          )}
          </FormGroup>
          <Button style={{ fontWeight: 'bold', backgroundColor: 'green', borderColor: 'green' }} type="primary" htmlType="submit" onClick={() => { props.onsubmitTersangka() }}>Selesai</Button>
        </PageContainer>
        )}
      </PageContainer>
    );
};

export default PenangkapanFormView;
