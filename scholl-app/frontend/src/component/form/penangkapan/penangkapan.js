import React from 'react'
import FormGroup from '../../../ui-container/formGroup';
import PageContainer from '../../../ui-container/pageContainer';
import FormTersangka from '../tersangka/formTersangka';

const formData = [
  {label: 'No Penangkapan', name: 'No Penangkapan', fieldName: 'no_penangkapan'},
  {label: 'Tanggal Penangkapan', name: 'Tanggal Penangkapan', fieldName: 'tanggal_penangkapan', type: 'date'},
  {label: 'Jam Penangkapan', name: 'Jam Penangkapan', fieldName: 'jam_penangkapan', type: 'time'},
]

export default class FormPenangkapan extends React.Component {
  state = {
    form:{}
  }

  onFormChange = (fieldName, e) => {
     const formObj = {...this.state.form};
     if(e!==null && e!==undefined && e!==''){
       if(!e.target){
           formObj[fieldName] = e
           this.setState({
               form: formObj,
           })
       } else {
           formObj[fieldName] = e.target.value
           this.setState({
              form: formObj,
           })
       }
     }
  }

  render(){
      return (
        <PageContainer header='FORM PENANGKAPAN'>
          <FormGroup
            formData={formData}
            onFormChange={this.onFormChange}
          />
          <FormTersangka formPenangkapan={this.state.form} noLkn={this.props.noLkn}/>
        </PageContainer>
      );
  }
};
