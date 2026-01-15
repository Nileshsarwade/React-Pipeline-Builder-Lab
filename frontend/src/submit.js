import { useStore } from './store';
import { shallow } from 'zustand/shallow';

// Define API URL (can be moved to .env later: process.env.REACT_APP_API_URL)
const API_URL = 'http://localhost:8000';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
    reset: state.reset,
    updateNodeField: state.updateNodeField,
});

export const SubmitButton = () => {
    const { nodes, edges, reset, updateNodeField } = useStore(selector, shallow);

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${API_URL}/pipelinesparse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`Backend error: ${response.status}`);
            }

            const data = await response.json();

            alert(
                `Pipeline Analysis:\n\n` +
                `Number of Nodes: ${data.numnodes}\n` +
                `Number of Edges: ${data.numedges}\n` +
                `Is DAG: ${data.isdag}`
            );
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert('Failed to submit pipeline.');
        }
    };

    const handleRun = async () => {
        try {
            const response = await fetch(`${API_URL}/pipelines/execute`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            });

            const data = await response.json();
            
            if (data.status === 'success') {
                // Update output nodes with results
                Object.entries(data.outputs).forEach(([nodeId, value]) => {
                    updateNodeField(nodeId, 'outputValue', value);
                });
                alert('Pipeline Executed Successfully! Check Output Nodes.');
            } else {
                alert(`Execution Failed: ${data.message}`);
            }
        } catch (error) {
            console.error('Error running pipeline:', error);
            alert(`Failed to run pipeline.\nError: ${error.message || 'Unknown error'}\n\nMake sure the backend server is running on port 8000.`);
        }
    };

    const handleReset = () => {
        reset();
    };

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px', gap: '20px'}}>
            <button
                type="button"
                onClick={handleSubmit}
                style={{
                    background: 'linear-gradient(135deg, #3b1d7a 0%, #1a0d38 100%)',
                    border: '1px solid #a882ff',
                    borderRadius: '12px',
                    color: '#e9d5ff',
                    padding: '12px 30px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 0 15px rgba(168, 130, 255, 0.4)',
                    transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 25px rgba(168, 130, 255, 0.8)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 15px rgba(168, 130, 255, 0.4)'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
                Submit
            </button>
            <button
                type="button"
                onClick={handleRun}
                style={{
                    background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                    border: '1px solid #818cf8',
                    borderRadius: '12px',
                    color: '#e0e7ff',
                    padding: '12px 30px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 0 15px rgba(99, 102, 241, 0.4)',
                    transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 25px rgba(99, 102, 241, 0.8)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 15px rgba(99, 102, 241, 0.4)'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
                Run
            </button>
            <button
                type="button"
                onClick={handleReset}
                style={{
                    background: 'transparent',
                    border: '1px solid #ff6b6b',
                    borderRadius: '12px',
                    color: '#ff6b6b',
                    padding: '12px 30px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 0 15px rgba(255, 107, 107, 0.2)',
                    transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 107, 107, 0.6)'; e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.background = 'rgba(255, 107, 107, 0.1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 107, 107, 0.2)'; e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'transparent'; }}
            >
                Reset
            </button>
        </div>
    );
}
