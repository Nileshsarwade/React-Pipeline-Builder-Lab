# React Pipeline Builder Lab

A visual node-based automation tool built with React, React Flow, and FastAPI.

## Features

- **Drag & Drop Interface**: Easily create pipelines by dragging nodes.
- **Custom Nodes**: Includes Input, Output, Text, LLM, Number, Date, Color, Toggle, File, and Note nodes.
- **Real-time Logic**: Text nodes support variables (e.g., `{{input}}`) which dynamically create handles.
- **Backend Integration**: Python FastAPI backend for pipeline validation (DAG check) and execution.
- **Dark & Neon Theme**: Modern UI with glowing effects.

## Setup

### Prerequisites
- Node.js
- Python 3.x

### Frontend
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

### Backend
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `pip install fastapi uvicorn networkx`
3. Start the server: `python3 -m uvicorn main:app --reload --port 8000`

## Usage

1. Ensure both frontend (port 3000) and backend (port 8000) are running.
2. Drag nodes from the toolbar to the canvas.
3. Connect nodes to define logic.
4. Click **Submit** to validate the pipeline structure (checks for cycles).
5. Click **Run** to execute the pipeline logic.