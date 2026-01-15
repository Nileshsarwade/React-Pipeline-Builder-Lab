import BaseNode from "./BaseNode";
import { Handle, Position } from "reactflow";
import { useStore } from '../store';
import { useState } from 'react';

export const NumberNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [number, setNumber] = useState(data?.value || '');

  const handleNumberChange = (e) => {
    const newNumber = e.target.value;
    setNumber(newNumber);
    updateNodeField(id, 'value', newNumber);
  };

  return (
    <BaseNode title="Number" icon="🔢">
      <label>
        Number:
        <input type="number" placeholder="123" value={number} onChange={handleNumberChange} />
      </label>
      <Handle type="source" position={Position.Right} id={`${id}-value`} />
    </BaseNode>
  );
};
