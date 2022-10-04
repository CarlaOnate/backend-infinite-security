import { DatePicker, Select, Space, TimePicker } from 'antd';
import React, { useState } from 'react';
const { Option } = Select;

const PickerWithType = ({ type, onChange }) => {
  if (type === 'time') return <TimePicker onChange={onChange} />;
  if (type === 'date') return <DatePicker onChange={onChange} />;
};

export const DateTimePicker = props => {
  const { onChange } = props;
  const [type, setType] = useState('time');

  return (
    <Space>
      <Select value={type} onChange={setType}>
        <Option value="time">Time</Option>
        <Option value="date">Date</Option>
      </Select>
      <PickerWithType type={type} onChange={onChange} />
    </Space>
  );
};