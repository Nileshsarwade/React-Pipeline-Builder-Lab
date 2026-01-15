import BaseNode from './BaseNode';
import { Handle, Position } from 'reactflow';
import { useState } from 'react';
import { useStore } from '../store';

export const ColorNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [color, setColor] = useState(data?.color || '#000000');

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    updateNodeField(id, 'color', newColor);
  };

  return (
    <BaseNode title="Color Picker" selected={data.selected} icon="🎨">
      <label style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        Color:
        <input type="color" value={color} onChange={handleColorChange} style={{ width: '40px', height: '30px', padding: '0', border: 'none', background: 'none', cursor: 'pointer' }} />
      </label>
      <div style={{ fontSize: '11px', color: '#a882ff' }}>
        Value: {color}
      </div>
      <Handle type="source" position={Position.Right} id={`${id}-color`} />
    </BaseNode>
  );
};