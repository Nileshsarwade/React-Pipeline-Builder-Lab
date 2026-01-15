import BaseNode from './BaseNode';
import { Handle, Position } from 'reactflow';

export const LLMNode = ({ id, data }) => {

  return (
    <BaseNode title="LLM" selected={data.selected} icon="🤖">
      <div className="node-flex-column">
        <div style={{ position: 'relative' }}>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-system`}
            style={{ top: '50%', left: '-22px' }}
          />
          <span style={{ fontSize: '12px', color: '#e9d5ff' }}>System</span>
        </div>
        <div style={{ position: 'relative' }}>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-prompt`}
            style={{ top: '50%', left: '-22px' }}
          />
          <span style={{ fontSize: '12px', color: '#e9d5ff' }}>Prompt</span>
        </div>
      </div>
      <div style={{ marginTop: '10px', color: '#e9d5ff', fontSize: '12px', textAlign: 'right' }}>
        <span>Response</span>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
      />
    </BaseNode>
  );
}
