import React from 'react'

import { Form, Button, DatePicker, Space, Spin } from 'antd';

import { Link } from 'react-router-dom';
import FormGroup from '../ui-container/formGroup';
import PageContainer from '../ui-container/pageContainer';
import history from '../route/history';
import moment from 'moment';
import ShowForm from '../component/showform';

const StatusForm = (props) => {
    return(
        <PageContainer header='EDIT DATA TERSANGKA'>
            <ShowForm/>
        </PageContainer>
    )
}

export default StatusForm;