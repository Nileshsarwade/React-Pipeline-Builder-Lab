from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import networkx as nx

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.post("/pipelinesparse")
def parse_pipeline(data: PipelineData):
    nodes = data.nodes
    edges = data.edges
    
    G = nx.DiGraph()
    for node in nodes:
        G.add_node(node['id'])
    for edge in edges:
        G.add_edge(edge['source'], edge['target'])
        
    is_dag = nx.is_directed_acyclic_graph(G)
    
    return {
    "numnodes": len(nodes),
    "numedges": len(edges),
    "isdag": is_dag
}

@app.post("/pipelines/execute")
def execute_pipeline(data: PipelineData):
    nodes = {node['id']: node for node in data.nodes}
    edges = data.edges
    
    # 1. Build Graph
    G = nx.DiGraph()
    for node in data.nodes:
        G.add_node(node['id'])
    for edge in edges:
        G.add_edge(edge['source'], edge['target'])
    
    # 2. Topological Sort (Execution Order)
    try:
        execution_order = list(nx.topological_sort(G))
    except nx.NetworkXUnfeasible:
        return {"status": "error", "message": "Cycle detected"}
    
    # 3. Execute Nodes
    node_outputs = {}
    final_outputs = {}
    
    for node_id in execution_order:
        # Skip if node_id is not in the nodes dictionary (handles phantom nodes from edges)
        if node_id not in nodes:
            continue

        node = nodes[node_id]
        node_type = node['type']
        
        # Gather inputs
        inputs = [node_outputs[edge['source']] for edge in edges if edge['target'] == node_id and edge['source'] in node_outputs]
        input_text = " ".join([str(i) for i in inputs]) if inputs else ""

        # Process Node Logic
        if node_type == 'customInput':
            node_outputs[node_id] = node['data'].get('inputName', 'Input')
        elif node_type == 'text':
            node_outputs[node_id] = node['data'].get('text', '')
        elif node_type == 'number':
            node_outputs[node_id] = node['data'].get('value', 0)
        elif node_type == 'date':
            node_outputs[node_id] = node['data'].get('date', '')
        elif node_type == 'color':
            node_outputs[node_id] = node['data'].get('color', '#000000')
        elif node_type == 'toggle':
            node_outputs[node_id] = 'On' if node['data'].get('enabled', False) else 'Off'
        elif node_type == 'file':
            node_outputs[node_id] = node['data'].get('fileName', 'No file selected')
        elif node_type == 'note':
            node_outputs[node_id] = node['data'].get('note', '')
        elif node_type == 'llm':
            node_outputs[node_id] = f"🤖 AI Response to: '{input_text}'"
        elif node_type == 'customOutput':
            final_outputs[node_id] = input_text
            
    return {"status": "success", "outputs": final_outputs}