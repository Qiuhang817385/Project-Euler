import React from "react";
import { Form, Input, Icon, Button, Select, Row, Col } from "antd";

const { Option } = Select;

const Param = (props) => {
  const {
    params: { onChange, record },
  } = props;

  const handleChangeSelect = (valueSelect) => {
    console.log("下拉选择", valueSelect);
    // key 是下发下来的key 0 1 唯一标识
    triggerChange(
      {
        item1: valueSelect,
      },
      record.key
    );
  };

  const handleInputChange = (valueInput) => {
    triggerChange(
      {
        item2: valueInput.target.value,
      },
      record.key
    );
  };

  const triggerChange = (data, key) => {
    // data,key {item1: "jack"} 0
    if (onChange) {
      onChange({ ...data, key });
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
            value={record.item1}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        </Col>
        <Col key={1} span={8}>
          <Input
            value={record.item2}
            placeholder="passenger name"
            style={{ width: "60%", marginRight: 8 }}
            onChange={handleInputChange}
          />
        </Col>
      </Row>
    </Form>
  );
}

export default Form.create({})(Param);
