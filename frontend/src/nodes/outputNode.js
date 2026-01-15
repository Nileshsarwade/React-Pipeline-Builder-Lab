import BaseNode from './BaseNode';
import { useStore } from '../store';
import { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const OutputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setCurrName(newName);
    updateNodeField(id, 'outputName', newName);
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setOutputType(newType);
    updateNodeField(id, 'outputType', newType);
  };

  return (
    <BaseNode title="Output" selected={data.selected} icon="📤">
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-value`}
      />
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
        <select value={outputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </label>
      {data.outputValue && (
        <div className="node-result-box">
          <strong>Result:</strong> {data.outputValue}
        </div>
      )}
    </BaseNode>
  );
}
