import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div style={{ width: '100%', height: '100vh', background: '#0b0617', display: 'flex', flexDirection: 'column' }}>
      <PipelineToolbar />
      <div style={{ flex: 1, width: '100%' }}><PipelineUI /></div>
      <SubmitButton />
    </div>
  );
}

export default App;
