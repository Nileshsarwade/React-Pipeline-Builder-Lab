import BaseNode from './BaseNode'; 
import { useStore } from '../store';

import { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const InputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setCurrName(newName);
    updateNodeField(id, 'inputName', newName);
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setInputType(newType);
    updateNodeField(id, 'inputType', newType);
  };

  return (
  <BaseNode title="Input" selected={data.selected} icon="📥">
    <label>
      Name:
      <input 
        type="text" 
        value={currName} 
        onChange={handleNameChange} 
      />
    </label>
    <label>
      Type:
      <select value={inputType} onChange={handleTypeChange}>
        <option value="Text">Text</option>
        <option value="File">File</option>
      </select>
    </label>
    <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />
  </BaseNode>
);


}
