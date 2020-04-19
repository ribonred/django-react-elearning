import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Collapse } from 'antd';
import { PlusSquareOutlined, CloseOutlined } from '@ant-design/icons';
import FormGroup from '../../../ui-container/formGroup';
import FormStatusTersangka from './formStatusTersangka';
import PageContainer from '../../../ui-container/pageContainer';

const { Panel } = Collapse;

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const formData = [
  {label: 'No penangkapan id', name: 'No penangkapan id', fieldName: 'no_penangkapan_id'},
  {label: 'nama_tersangka', name: 'Nama Tersangka', fieldName: 'nama_tersangka'},
  {label: 'Umur', name: 'Umur', fieldName: 'umur'},
  {label: 'Jenis Kelamin', name: 'Jenis Kelamin', fieldName: 'jenis_kelamin'},
  {label: 'Foto', name: 'foto', fieldName: 'foto'}
]

export default class FormTersangka extends React.Component {
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

  updateStatusTersangka = (statusForm, indexTersangka) => {
    console.log('indexTersangka', indexTersangka)
    const formStatus = this.state.form[indexTersangka];
    const form = this.state.form;
    formStatus.statustersangka = statusForm;
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
  }

  render(){
      return (
        <Collapse >
          <Panel header="FORM DATA TERSANGKA" key="1">
            <Button type="primary" style={{margin:'10px'}} onClick={() => this.addStatus()} icon={<PlusSquareOutlined />}>
              Add Status Tersangka
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
                      <FormStatusTersangka updateStatusTersangka={(statusForm) => this.updateStatusTersangka(statusForm, index)}/>
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
