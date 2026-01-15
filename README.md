# React Pipeline Builder Lab

A **personal learning project** built to explore visual workflow builders, reusable React architecture, and basic backend graph validation.

This project focuses on understanding how node-based systems work using **React Flow** on the frontend and **FastAPI + NetworkX** on the backend.

---

## 🚀 Features

- **Visual Drag & Drop Interface**
  - Create pipelines by adding and connecting nodes on a canvas.

- **Reusable Node Architecture**
  - Common logic and styling handled by a `BaseNode` component.
  - Implemented nodes:
    - Input, Output, Text, LLM, Number
    - Date, Color, Toggle, File, Note

- **Dynamic Text Node Logic**
  - Text nodes support variables like `{{input}}`.
  - Variables are detected using regex and generate dynamic connection handles.
  - Node height auto-resizes based on content.

- **Backend DAG Validation**
  - FastAPI backend validates pipelines.
  - Uses NetworkX to ensure the graph is a **Directed Acyclic Graph (DAG)**.
  - Prevents invalid cyclic workflows.

- **Dark + Neon UI Theme**
  - Custom CSS styling with glowing effects.
  - Styled background and controls for a modern look.

---

## 🧱 Tech Stack

- **Frontend:** React, React Flow, CSS
- **Backend:** Python, FastAPI, NetworkX
- **Architecture Focus:** Reusability, clean abstractions, and learning-oriented design

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js
- Python 3.x

---

### Frontend Setup
```bash
cd frontend
npm install
npm start
