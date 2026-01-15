import BaseNode from './BaseNode';
import { useStore } from '../store';
import { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const NoteNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [note, setNote] = useState(data?.note || '');

  const handleNoteChange = (e) => {
    const newNote = e.target.value;
    setNote(newNote);
    updateNodeField(id, 'note', newNote);
  };

  return (
    <BaseNode title="Note" selected={data.selected}>
      <Handle type="target" position={Position.Left} id={`${id}-in`} />
      <textarea 
        value={note}
        onChange={handleNoteChange}
        placeholder="Add a note..."
        className="note-textarea"
      />
      <Handle type="source" position={Position.Right} id={`${id}-out`} />
    </BaseNode>
  );
};