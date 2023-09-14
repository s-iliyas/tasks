/* eslint-disable react/prop-types */

import { Drawer } from "antd";
import { useState } from "react";

const LocationForm = ({ openForm }) => {
  const [open, setOpen] = useState(openForm);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      title="Basic Drawer"
      placement={"bottom"}
      closable={false}
      onClose={onClose}
      open={open}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};

export default LocationForm;
