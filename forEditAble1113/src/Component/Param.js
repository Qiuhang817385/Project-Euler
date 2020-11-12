import React, { useState } from "react";
import { Form, Input, Icon, Button, Select, Row, Col } from "antd";

const { Option } = Select;

function Param (props) {
  console.log('props', props)
  const { params: { onChange, key } } = props;
  // const [checked, setChecked] = useState(false);
  // const [defaultValue, setDefaultValue] = useState(undefined);
  // const [defaultLabel, setDefaultLabel] = useState(undefined);

  const handleChangeSelect = (valueSelect) => {
    console.log("下拉选择", valueSelect);
    triggerChange({
      "item1": valueSelect
    }, key);
  };

  const handleInputChange = (valueInput) => {
    console.log("Input选择框", valueInput.target.value);
    triggerChange({
      "item2": valueInput.target.value
    }, key);
  };

  const triggerChange = (d1, d2) => {
    if (onChange) {
      onChange(
        ...d1, d2
      )
    }
  };

  return (
    <Form>
      <Row gutter={16}>
        <Col key={0} span={8}>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={handleChangeSelect}
            value={key.item1}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        </Col>
        <Col key={1} span={8}>
          <Input
            value={key.item2}
            placeholder="passenger name"
            style={{ width: "60%", marginRight: 8 }}
            onChange={handleInputChange}
          />
        </Col>
      </Row>
    </Form>
  );
}

export default Form.create({})(Param)