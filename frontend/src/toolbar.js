// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='number' label='Number' />
                <DraggableNode type='date' label='Date' />
                <DraggableNode type='color' label='Color' />
                <DraggableNode type='toggle' label='Switch' />
                <DraggableNode type='file' label='File' />
                <DraggableNode type='note' label='Note' />
            </div>
        </div>
    );
};
