import BaseNode from './BaseNode';
import { Handle, Position } from 'reactflow';
import { useState } from 'react';
import { useStore } from '../store';

export const DateNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [date, setDate] = useState(data?.date || '');

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    updateNodeField(id, 'date', newDate);
  };

  return (
    <BaseNode title="Date" selected={data.selected} icon="📅">
      <label>
        Date:
        <input type="date" value={date} onChange={handleDateChange} />
      </label>
      <Handle type="source" position={Position.Right} id={`${id}-date`} />
    </BaseNode>
  );
};