import BaseNode from './BaseNode';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import { useState } from 'react';

export const FileNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [fileName, setFileName] = useState(data?.fileName || '');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFileName = e.target.files[0].name;
      setFileName(newFileName);
      updateNodeField(id, 'fileName', newFileName);
    }
  };

  return (
    <BaseNode title="File Upload" selected={data.selected} icon="📁">
      <label>
        File:
        <input type="file" onChange={handleFileChange} />
      </label>
      {fileName && <div style={{ fontSize: '11px', color: '#a882ff', marginTop: '4px' }}>Selected: {fileName}</div>}
      <div style={{ fontSize: '11px', color: '#a882ff', fontStyle: 'italic' }}>
        Supports .txt, .pdf, .json
      </div>
      <Handle type="source" position={Position.Right} id={`${id}-file`} />
    </BaseNode>
  );
};