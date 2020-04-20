import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Collapse } from 'antd';
import { PlusSquareOutlined, CloseOutlined } from '@ant-design/icons';
import FormGroup from '../../../ui-container/formGroup';
import FormStatusBarangBukti from './formStatusBarangBukti';
import PageContainer from '../../../ui-container/pageContainer';

const { Panel } = Collapse;

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const formData = [
  {label: 'nama_barang', name: 'Nama Barang', fieldName: 'nama_barang'},
  {label: 'sp_sita', name: 'SP Sita', fieldName: 'sp_sita'},
  {label: 'tap_status', name: 'Tap Status', fieldName: 'tap_status'},
  {label: 'jenis_barang', name: 'Jenis Barang', fieldName: 'jenis_barang'},
]

export default class FormBarangBukti extends React.Component {
  state = {
    form:[{}]
  }

  addStatus = () => {
    const forms = this.state.form
    forms.push({})
    this.setState({form: forms})
  }

  removeStatus = (removedIndex) => {
    const forms = this.state.form;
    delete forms[removedIndex]
    this.setState({form: forms});
  }

  updateStatusBarangBukti = (statusForm, indexTersangka) => {
    const formStatus = this.state.form[indexTersangka];
    const form = this.state.form;
    formStatus.statusbarangbukti = statusForm;
    form[indexTersangka] = formStatus;
    this.setState({form: form})
  }

  onFormChange = (fieldName, e, index) => {
     const formObj = {...this.state.form[index]};
     const form = this.state.form;
     if(!e.target){
         formObj[fieldName] = e
         form[index] = formObj
         this.setState({
             form: form,
         })
     } else {
         formObj[fieldName] = e.target.value
         form[index] = formObj
         this.setState({
            form: form,
         })
     }
     this.props.updateBarangBukti(form)
  }

  render(){
      return (
        <Collapse style={{margin:'7px'}}>
          <Panel header="FORM BARANG BUKTI" key="1">
            <Button type="primary" style={{margin:'10px'}} onClick={() => this.addStatus()} icon={<PlusSquareOutlined />}>
              Add Barang Bukti
            </Button>
            {this.state.form.map((data, index) => (
              data!==null && (
                <Collapse style={{margin:'10px'}} key={index}>
                  <Panel header={`Form Data Barang Bukti`} key={index}>
                    <Button type="danger" style={{margin:'10px'}} onClick={() => this.removeStatus(index)} icon={<CloseOutlined />}>
                      Hapus Form
                    </Button>
                    <FormGroup
                      formData={formData}
                      onFormChange={(fieldName, e) => this.onFormChange(fieldName, e, index)}
                    >
                      <FormStatusBarangBukti updateStatusBarangBukti={(statusForm) => this.updateStatusBarangBukti(statusForm, index)}/>
                    </FormGroup>
                  </Panel>
                </Collapse>
              )
            ))}
          </Panel>
        </Collapse>
      );
  }
};
