import React from 'react'
import { Button, Collapse } from 'antd';
import { PlusSquareOutlined, CloseOutlined } from '@ant-design/icons';
import FormGroup from '../../../ui-container/formGroup';
import FormStatusTersangka from './formStatusTersangka';
import FormBarangBukti from '../barang_bukti/formBarangBukti';

const { Panel } = Collapse;

const dropdown = ['laki-laki', 'perempuan'];
const formData = [
  {label: 'Nama Tersangka', name: 'Nama Tersangka', fieldName: 'nama_tersangka'},
  {label: 'Umur', name: 'Umur', fieldName: 'umur', type: 'number'},
  {label: 'Jenis Kelamin', name: 'Jenis Kelamin', fieldName: 'jenis_kelamin', dropdown: dropdown, type: 'select'},
  {label: 'Foto', name: 'foto', fieldName: 'foto', type: 'upload'}
]

export default class FormTersangka extends React.Component {
  state = {
    form:[{}]
  }

  componentDidMount(){
    window.scrollTo(0, 0);
  }

  componentDidUpdate(){
    window.scrollTo(0, 0);
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

  updateStatusTersangka = (statusForm, indexTersangka) => {
    const formStatus = this.state.form[indexTersangka];
    const form = this.state.form;
    formStatus.statustersangka = statusForm;
    form[indexTersangka] = formStatus;
    this.setState({form: form})
  }

  updateBarangBukti = (barangBuktiForm, indexBarangBukti) => {
    const formStatus = this.state.form[indexBarangBukti];
    const form = this.state.form;
    formStatus.barangbuktitersangka = barangBuktiForm;
    form[indexBarangBukti] = formStatus;
    this.setState({form: form})
  }

  onFormChange = (fieldName, e, index) => {
     const formObj = {...this.state.form[index]};
     const form = this.state.form;
     if(e!==null && e!==undefined && e!==''){
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
     }
  }

  render(){
      return (
        <Collapse style={{margin:'7px'}}>
          <Panel header="FORM DATA TERSANGKA" key="1">
            <Button type="primary" style={{margin:'10px'}} onClick={() => this.addStatus()} icon={<PlusSquareOutlined />}>
              Add Tersangka
            </Button>
            {this.state.form.map((data, index) => (
              data!==null && (
                <Collapse style={{margin:'10px'}} key={index}>
                  <Panel header={`Form Data Tersangka`} key={index}>
                    <Button type="danger" style={{margin:'10px'}} onClick={() => this.removeStatus(index)} icon={<CloseOutlined />}>
                      Hapus Form
                    </Button>
                    <FormGroup
                      formData={formData}
                      onFormChange={(fieldName, e) => this.onFormChange(fieldName, e, index)}
                    >
                    </FormGroup>
                    <FormStatusTersangka updateStatusTersangka={(statusForm) => this.updateStatusTersangka(statusForm, index)}/>
                    <FormBarangBukti updateBarangBukti={(barangBuktiForm) => this.updateBarangBukti(barangBuktiForm, index)}/>
                  </Panel>
                </Collapse>
              )
            ))}
          </Panel>
        </Collapse>
      );
  }
};
