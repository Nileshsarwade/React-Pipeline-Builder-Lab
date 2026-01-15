import BaseNode from './BaseNode';
import { useStore } from '../store';
import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [variables, setVariables] = useState([]);
  
  // Extract variables from text whenever it changes
  useEffect(() => {
    const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
    const matches = [];
    let match;
    while ((match = regex.exec(currText)) !== null) {
      if (!matches.includes(match[1])) matches.push(match[1]);
    }
    setVariables(matches);
  }, [currText]);

  // Dynamic height calculation
  const lines = currText.split('\n').length;
  const dynamicHeight = Math.max(80, lines * 22 + 50);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    updateNodeField(id, 'text', newText);
  };

  return (
    <BaseNode title="Text" selected={data.selected} style={{ minHeight: `${dynamicHeight}px` }} icon="📝">
      <textarea
        value={currText}
        onChange={handleTextChange}
        style={{ minHeight: '80px', resize: 'vertical' }}
        placeholder="Enter text like Hello {{input}} world or {{user.name}}..."
      />
      
      {/* Render handles for each variable found in the text */}
      {variables.map((variable, index) => (
        <Handle
          key={variable}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          className="handle-variable"
          title={variable}
        />
      ))}

      {/* Right output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="handle-output"
      />
    </BaseNode>
  );
};
