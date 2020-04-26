import React from 'react'
import { createpenangkapan, getpenangkapan, editpenangkapan } from '../../../reduxActions/dashboard'
import { connect } from 'react-redux';
import MainForm from '../../../ui-container/mainFormContainer';
import { get_token } from '../../../helper/requestHelper';

const formData = [
  {label: 'No Penangkapan', name: 'No Penangkapan', fieldName: 'no_penangkapan'},
  {label: 'Tanggal Penangkapan', name: 'Tanggal Penangkapan', fieldName: 'tanggal_penangkapan', type: 'date'},
  {label: 'Jam Penangkapan', name: 'Jam Penangkapan', fieldName: 'jam_penangkapan', type: 'time'},
]

class FormPenangkapan extends React.Component {
  state = {
    form:{},
    isLoading: false,
    isCreated: false,
    isDataChange: false,
    isError: false,
  }

  componentDidMount(){
    if(this.props.penangkapanID){
      this.props.dispatch(getpenangkapan(get_token(),this.props.penangkapanID))
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.penangkapanSelectedData !== prevProps.penangkapanSelectedData){
      this.getDefaultForm()
    }
  }

  getDefaultForm = () => {
     this.setState({form: this.props.penangkapanSelectedData}, () => this.setState({ isDataChange: true}))
  }

  onsubmit = () => {
    const additionalField = this.props.penangkapanID ? {} : { no_lkn: this.props.LKNID }
    this.setState ({
      form: {
        ...this.state.form,
        ...additionalField
      }
    }, async() => {
      this.setState({isLoading:true})
      let result;
      if(this.props.penangkapanID){
        result = await this.props.dispatch(editpenangkapan(get_token(), this.state.form, this.props.penangkapanID))
      } else if(this.props.LKNID){
        result = await this.props.dispatch(createpenangkapan(get_token(), this.state.form))
      }
      if(result === 'error'){
        this.setState({ isError: true })
        setTimeout(() => {
          this.setState({ isError: false })
        }, 200);
      } else {
        this.setState({ isCreated: true})
        setTimeout(() => {
          this.setState({ isCreated: false })
        }, 200);
      }
      this.setState({isLoading:false})
    })
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
        <MainForm
          title={this.props.penangkapanID ? 'Edit Form Penangkapan' : 'Edit Form Penangkapan'}
          messageTitle='Penangkapan'
          isError={this.state.isError}
          isDataChange={this.props.type === 'create' ? true : this.state.isDataChange}
          defaultValue={this.state.form}
          isCreated={this.state.isCreated}
          isLoading={this.state.isLoading}
          onFormChange={this.onFormChange}
          formData={formData}
          onsubmit={this.onsubmit}
        />
      );
  }
};

function mapStateToProps(state) {
  const { dashboard } = state
  return {
    penangkapanSelectedData: dashboard.penangkapanSelectedData,
  }
}

export default connect(mapStateToProps)(FormPenangkapan)
