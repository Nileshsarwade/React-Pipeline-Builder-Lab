import './styles/Base-node.css';

const icons = {
  customInput: '📥',
  llm: '🤖',
  customOutput: '📤',
  text: '📝',
  number: '🔢',
  date: '📅',
  color: '🎨',
  toggle: '🎚️',
  file: '📁',
  note: '🗒️'
};

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={`${type} base-node glow-node`}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          minWidth: '80px', 
          padding: '12px',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          flexDirection: 'column'
        }} 
        draggable
      >
          <div className="base-node-icon" style={{ margin: '0 0 8px 0' }}>
            {icons[type]}
          </div>
          <span style={{ color: '#e9d5ff' }}>{label}</span>
      </div>
    );
  };
  