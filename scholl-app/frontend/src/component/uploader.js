import React from 'react';
import { FilePicker } from 'react-file-picker-preview';
import { Button } from 'antd';

class Uploader extends React.Component {
  state = {
    file: {},
    reset: {},
  }

  render() {
    return (
        <div>
        <Button type="dashed" size='large' style={{padding:10}}>
          <FilePicker
            className="button"
            maxSize={10}
            buttonText='Upload Files'
            extensions={["application/pdf", "image/jpeg", "image/png"]}
            onChange={(file) => {
              this.props.onFormChange(this.props.fieldName, file)
              this.setState({ file })
            }}
            onError={error => { alert("that's an error: " + error) }}
            onClear={() => this.setState({ file: {} })}
            triggerReset={this.state.reset}
          >
          </FilePicker>
        </Button>
      </div>
    );
  }
}

export default Uploader