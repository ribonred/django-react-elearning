import React from 'react'

import { Form, Button, DatePicker, Space, Spin, Descriptions } from 'antd';

import { Link } from 'react-router-dom';
import FormGroup from '../ui-container/formGroup';
import PageContainer from '../ui-container/pageContainer';
import history from '../route/history';
import moment from 'moment';
import ShowForm from './showform';

const formData = [
    {label: 'No. LKN', name: 'LKN', fieldName: 'LKN'},
    {label: 'Tanggal', name: 'Tanggal Dibuat', fieldName: 'tgl_dibuat', type:'date'},
]

const TersangkaForm = (props) => {
    return(
        <PageContainer header='EDIT DATA TERSANGKA'>
            {props.tersangkaTableData.length != 0 && (
                <div>
                    <ShowForm 
                    dataShow={props.dataShow}
                    tersangkaTableData={props.tersangkaTableData}
                    dataTersangka={props.dataTersangka}
                    >
                    </ShowForm>
                    <FormGroup
                        formData={formData}
                        defaultValue={props.defaultValue}
                        onFormChange={props.onFormChange}
                    >
                    </FormGroup>
                </div>
            )}
        </PageContainer>
    )
}

export default TersangkaForm;