import React from 'react'
import swal from '@sweetalert/with-react'
import { FrownOutlined } from '@ant-design/icons';


const MoodButton = ({ rating }) => (
  <button
    data-rating={rating}
    className="mood-btn"
  />
)

export default function networkIssueModal(){
  swal({
    text: "Some issue happening..., make sure you are connected and try again? \n\n Or check about your input before process",
    buttons: {
      cancel: "Close",
    },
    content: (
      <div>
        <FrownOutlined style={{fontSize:'40px', padding:'5px'}}/>
        <FrownOutlined style={{fontSize:'30px', padding:'5px'}}/>
        <FrownOutlined style={{fontSize:'20px', padding:'5px'}}/>
      </div>
    )
  })
}
