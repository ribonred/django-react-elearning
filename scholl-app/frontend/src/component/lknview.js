import React from "react";
import ViewContainer from "../ui-container/viewContainer";
import { Descriptions } from "antd";

const LknViewView = (props) => {
  let noLkn          = "";
  let tanggal_dibuat = "";
  let noPenangkapan  = "";
  let tglPenangkapan = "";
  let jamPenangkapan = "";

  if (!props.lkn[0]) {
    noLkn          = "";
    tanggal_dibuat = "";
  } else {
    noLkn = props.lkn[0].LKN;
    tanggal_dibuat = props.lkn[0].tgl_dibuat;
    noPenangkapan  = props.lkn[0].penangkapan[0].no_penangkapan;
    tglPenangkapan = props.lkn[0].penangkapan[0].tanggal_penangkapan;
    jamPenangkapan = props.lkn[0].penangkapan[0].jam_penangkapan;
  }
  console.log("props", props.lkn);

  return (
    <ViewContainer>
      <Descriptions title="LKN Info">
        <Descriptions.Item label="No. LKN">{noLkn}</Descriptions.Item>
        <Descriptions.Item label="Tanggal Dibuat">{tanggal_dibuat}</Descriptions.Item>
      </Descriptions>

      <Descriptions title="Penangkapan">
        <Descriptions.Item label="No. Penangkapan">{noPenangkapan}</Descriptions.Item>
        <Descriptions.Item label="Tanggal Penangkapan">{tglPenangkapan}</Descriptions.Item>
        <Descriptions.Item label="Jam Penangkapan">{jamPenangkapan}</Descriptions.Item>
      </Descriptions>
    </ViewContainer>
  );
};

export default LknViewView;
