import * as React from 'react';
import { Button } from 'antd';
import Viewer from 'react-viewer';

const ImageView = (props) => {
  const [ visible, setVisible ] = React.useState(false);
  return (
    <div>
      <Button type="primary" disabled={!props.photoSource} onClick={() => { setVisible(true); } }>
        <b>Lihat Foto</b>
      </Button>
      {props.children}
      <Viewer
      visible={visible}
      onClose={() => { setVisible(false); } }
      images={[{src: props.photoSource || 'https://unsplash.it/800/300?image=1', alt: 'Image Preview'}]}
      />
    </div>
  );
}

export default ImageView;