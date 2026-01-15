import BaseNode from './BaseNode';
import { Handle, Position } from 'reactflow';
import { useState } from 'react';
import { useStore } from '../store';

export const ToggleNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [enabled, setEnabled] = useState(data?.enabled || false);

  const handleToggleChange = (e) => {
    const newEnabled = e.target.checked;
    setEnabled(newEnabled);
    updateNodeField(id, 'enabled', newEnabled);
  };

  return (
    <BaseNode title="Switch" selected={data.selected} icon="🎚️">
      <label style={{ flexDirection: 'row', alignItems: 'center', cursor: 'pointer' }}>
        <input 
          type="checkbox" 
          checked={enabled} 
          onChange={handleToggleChange}
          style={{ width: 'auto', marginRight: '8px' }}
        />
        {enabled ? 'On' : 'Off'}
      </label>
      <Handle type="target" position={Position.Left} id={`${id}-in`} />
      <Handle type="source" position={Position.Right} id={`${id}-out`} />
    </BaseNode>
  );
};