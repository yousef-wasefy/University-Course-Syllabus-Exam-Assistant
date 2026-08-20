# University Course Syllabus & Exam Assistant

*An AI assistant that answers syllabus questions, simulates GPA impact, and helps plan study time — grounded in each course's actual syllabus.*

This is **Project #5** from the **ConnectX Final Project Showcase**.

---

## Project Overview

The **University Course Syllabus & Exam Assistant** is an AI-powered assistant that helps students understand their course syllabi, see how upcoming grades affect their GPA, and plan study time for exams — with syllabus answers grounded in the actual syllabus documents rather than guessed.

### Problem It Solves

Throughout a semester, students juggle multiple course syllabi containing exam dates, grading breakdowns, attendance policies, and course rules. Important details are easy to miss or misremember, and manually working out GPA scenarios or a study plan across several exams is tedious and error-prone. This project addresses that by combining:

* A **retrieval-grounded** question-answering system, so answers about a course trace back to the actual syllabus text instead of being guessed by the model.
* Deterministic **GPA** and **study schedule** tools, so calculations are reliable instead of left to an LLM to compute freehand.
* **Multi-turn conversation memory**, so students can ask follow-up questions without repeating context.

### Required Capabilities

* Grounded Syllabus RAG
* GPA Impact Simulator
* Study Schedule Generator
* Multi-Turn Conversation Memory

---

## Main Features

| Feature | Description |
|---|---|
| **Grounded Syllabus RAG** | Answers student questions about a course using only content retrieved from that course's syllabus. |
| **GPA Impact Simulator** | Calculates how hypothetical grades affect a student's overall GPA using deterministic Python logic. |
| **Study Schedule Generator** | Produces a study plan based on course/exam information using deterministic Python logic. |
| **Multi-Turn Conversation Memory** | Keeps track of the conversation across multiple turns so follow-up questions retain context. |

### MVP Scope

The minimum viable product for this project is:

1. Ingest syllabus documents and build a FAISS index over them.
2. Answer syllabus questions grounded only in retrieved chunks.
3. Calculate GPA impact from user-supplied grades.
4. Generate a basic study schedule from course/exam information.
5. Retain conversation context across multiple turns within a session.

> None of the above is implemented yet — the repository is currently at the scaffolding stage. See [Current Project Status](#current-project-status).

---

## Tech Stack

| Category | Technology |
|---|---|
| Language | Python |
| Backend framework | FastAPI |
| Data validation | Pydantic |
| LLM orchestration | LangChain |
| Agent / graph orchestration | LangGraph |
| Vector store | FAISS (`faiss-cpu`) |
| Embeddings | HuggingFace embeddings (`langchain-huggingface`) |
| LLM provider | Groq API (`langchain-groq`, `groq`) |
| PDF parsing | `pypdf` |
| Configuration | `python-dotenv` |
| Frontend | HTML, CSS, Vanilla JavaScript |

Exact package versions are pinned in [`requirements.txt`](./requirements.txt).

---

## Project Architecture

### Architecture Philosophy

Responsibilities are intentionally kept separate so each part of the system has one job:

```text
LLM       → reasoning and natural-language responses
RAG       → retrieving syllabus information
Tools     → deterministic calculations
FastAPI   → backend API
Frontend  → user interface
```

Keeping GPA and scheduling calculations in plain Python (instead of asking the LLM to compute them) keeps those results reliable and testable.

### Application Workflow

```text
Frontend
   ↓
FastAPI
   ↓
Assistant / Application Logic
   ├── Syllabus question → RAG
   ├── GPA request       → GPA Tool
   └── Study planning    → Study Schedule Tool
```

This describes the intended request path once the backend and frontend are implemented — see [Current Project Status](#current-project-status).

---

## Project Structure

```text
backend/
├── app/
│   ├── __init__.py
│   └── main.py
├── document_processing/
│   ├── __init__.py
│   ├── document_loader.py
│   └── chunker.py
├── rag/
│   ├── __init__.py
│   ├── embeddings.py
│   ├── vector_store.py
│   ├── retriever.py
│   └── rag_chain.py
├── tools/
│   ├── __init__.py
│   ├── gpa_calculator.py
│   └── study_schedule.py
├── memory/
│   ├── __init__.py
│   └── chat_memory.py
└── models/
    ├── __init__.py
    └── schemas.py

data/
├── raw/
│   └── syllabi/
└── processed/

vectorstore/
└── faiss_index/

frontend/
├── css/
│   └── style.css
├── js/
│   └── app.js
└── index.html

tests/
├── __init__.py
├── test_document_processing.py   # Teammate #2
├── test_rag.py                   # Teammate #1
├── test_tools.py                 # Teammate #3
└── test_api.py                   # Teammate #5

.env.example
.gitignore
README.md
requirements.txt
```

### Folder Responsibilities

| Folder | Responsibility |
|---|---|
| `backend/app/` | FastAPI application and backend entry point |
| `backend/document_processing/` | Loading, cleaning, and chunking syllabus documents |
| `backend/rag/` | Embeddings, FAISS indexing, retrieval, and the grounded RAG chain |
| `backend/tools/` | Deterministic GPA and study-schedule calculation tools |
| `backend/memory/` | Multi-turn conversation memory |
| `backend/models/` | Pydantic request/response data models |
| `data/raw/` | Original syllabus documents (e.g. `data/raw/syllabi/`) |
| `data/processed/` | Cleaned/chunked document data prepared for embedding |
| `vectorstore/faiss_index/` | Generated FAISS vector index files |
| `frontend/` | HTML/CSS/Vanilla JavaScript user interface |
| `tests/` | Project tests |

All folders above currently contain only scaffolding (empty `__init__.py` files or empty starter files) — see [Current Project Status](#current-project-status).

---

## Development Setup

Follow these steps to prepare the project on your local machine.

### 1. Install the Required Software

Before starting, make sure you have the following installed:

* Git
* Python
* pip
* An IDE or code editor such as:

  * PyCharm
  * Visual Studio Code

All team members should use the same Python version to avoid dependency conflicts.

Recommended Python version:

```text
Python 3.11.9
```

Avoid using Python 3.14 for this project because some AI and LangChain-related packages may not yet fully support it.

---

### 2. Check Python Installation

Open a terminal and run:

```bash
python --version
```

You should see something similar to:

```text
Python 3.11.9
```

If `python` does not work on your system, try:

```bash
python3 --version
```

---

### 3. Check Git Installation

Run:

```bash
git --version
```

You should see the installed Git version.

Example:

```text
git version 2.x.x
```

---

### 4. Clone the Repository

Choose a folder where you want to keep the project.

Open a terminal inside that folder and run:

```bash
git clone <repository-url>
```

Replace `<repository-url>` with the GitHub repository URL.

Example:

```bash
git clone https://github.com/USERNAME/REPOSITORY.git
```

Then enter the project folder:

```bash
cd <project-folder>
```

---

### 5. Create a Virtual Environment

Inside the project folder, run:

```bash
python -m venv .venv
```

This creates a virtual environment called:

```text
.venv
```

The virtual environment keeps the project's Python packages isolated from other Python projects on your computer.

---

### 6. Activate the Virtual Environment

#### Windows — Command Prompt

```bash
.venv\Scripts\activate
```

#### Windows — PowerShell

```powershell
.venv\Scripts\Activate.ps1
```

#### macOS / Linux

```bash
source .venv/bin/activate
```

After activation, you should see something similar to this at the beginning of your terminal:

```text
(.venv)
```

Example:

```text
(.venv) C:\Projects\syllabus-assistant>
```

---

### 7. Upgrade pip

After activating the virtual environment, run:

```bash
python -m pip install --upgrade pip
```

This ensures that the package installer is up to date.

---

### 8. Install Project Dependencies

Make sure the virtual environment is activated.

Then run:

```bash
pip install -r requirements.txt
```

This installs all Python packages required by the project.

Do not manually install different package versions unless the team agrees to update `requirements.txt`.

---

### 9. Create the Environment Variables File

The real `.env` file is not stored on GitHub because it may contain private API keys.

The repository contains:

```text
.env.example
```

Create your own `.env` file from it.

#### Windows — Command Prompt

```bash
copy .env.example .env
```

#### Windows — PowerShell

```powershell
Copy-Item .env.example .env
```

#### macOS / Linux

```bash
cp .env.example .env
```

You should now have:

```text
.env
.env.example
```

---

### 10. Configure Environment Variables

Open:

```text
.env
```

Add your own required API keys.

Example:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Do not put the real API key inside `.env.example`.

The `.env.example` file should only contain variable names or placeholder values.

Example:

```env
GROQ_API_KEY=
```

or:

```env
GROQ_API_KEY=your_groq_api_key_here
```

---

### 11. Never Commit the `.env` File

The `.env` file may contain private API keys.

Make sure `.gitignore` contains:

```gitignore
.env
```

Never run:

```bash
git add .env
```

The `.env.example` file should be committed because it tells teammates which environment variables are required.

---

### 12. Make Sure the Virtual Environment Is Ignored

The `.venv` folder should also not be uploaded to GitHub.

Make sure `.gitignore` contains:

```gitignore
.venv/
```

Every teammate creates their own virtual environment locally.

---

### 13. Recommended `.gitignore` Entries

The project should at least ignore:

```gitignore
# Virtual environment
.venv/

# Environment variables
.env

# Python cache
__pycache__/
*.py[cod]

# IDE files
.idea/
.vscode/

# Operating system files
.DS_Store
Thumbs.db
```

Note:

If the team wants to share VS Code workspace settings later, `.vscode/` can be removed from `.gitignore`.

---

### 14. Configure the Python Interpreter

Each teammate should make sure their IDE uses the Python interpreter from:

```text
.venv
```

Do not use the system Python interpreter for this project.

#### PyCharm

Go to:

```text
File
→ Settings
→ Project
→ Python Interpreter
```

Select the interpreter located inside:

```text
<project-folder>\.venv\Scripts\python.exe
```

On macOS/Linux:

```text
<project-folder>/.venv/bin/python
```

#### Visual Studio Code

Press:

```text
Ctrl + Shift + P
```

Search for:

```text
Python: Select Interpreter
```

Then select the interpreter from:

```text
.venv
```

---

### 15. Verify the Virtual Environment

Run:

```bash
python -c "import sys; print(sys.executable)"
```

The result should point to the `.venv` folder.

Windows example:

```text
C:\Projects\syllabus-assistant\.venv\Scripts\python.exe
```

macOS/Linux example:

```text
/home/user/syllabus-assistant/.venv/bin/python
```

---

### 16. Verify Installed Packages

Run:

```bash
pip list
```

You should see the packages installed from:

```text
requirements.txt
```

You can also run:

```bash
pip check
```

If everything is correct, it should show:

```text
No broken requirements found.
```

---

### 17. Environment Setup Is Complete

At this point, your local environment should contain:

```text
project-folder/
│
├── .venv/
├── .env
├── .env.example
├── .gitignore
├── requirements.txt
├── README.md
└── ...
```

Your machine is now ready for project development.

---

### 18. Starting Work After the Initial Setup

The previous setup only needs to be done once.

Every time you open the project again, you normally only need to activate the virtual environment.

#### Windows

```bash
.venv\Scripts\activate
```

#### macOS / Linux

```bash
source .venv/bin/activate
```

Then start working normally.

You do **not** need to recreate `.venv` or reinstall all dependencies every time.

---

### 19. Updating Dependencies

If another teammate adds a new Python package and updates:

```text
requirements.txt
```

Pull the latest changes:

```bash
git pull
```

Then activate your virtual environment and run:

```bash
pip install -r requirements.txt
```

This keeps all team members on the same dependencies.

---

### 20. Important Team Rules

* Always activate `.venv` before working with Python.
* Do not commit `.env`.
* Do not commit `.venv`.
* Do not share API keys through GitHub.
* Do not randomly change package versions.
* If a new dependency is required, update `requirements.txt`.
* Always pull the latest changes before starting new work.
* Use the Python version agreed upon by the team.
* PyCharm is not required; teammates may use any IDE.
* The project should work independently of the IDE being used.

---

## Running the Project

`backend/app/main.py` and the frontend files are currently empty scaffolding, so there is no runnable application yet.

Once the FastAPI app is implemented, the backend is expected to run as:

```bash
uvicorn backend.app.main:app --reload
```

executed from the project root, with the frontend served as static files alongside it. This section will be updated with the actual run instructions once `backend/app/main.py` defines the FastAPI application.

---

## Environment Variables

Environment variables are configured via a local `.env` file, created from `.env.example` (see [Development Setup](#development-setup), steps 9–11). Never commit real values.

| Variable | Required | Purpose |
|---|---|---|
| `GROQ_API_KEY` | Yes | API key for the Groq LLM, used by `langchain-groq` / `groq`. |

This is currently the only variable defined in `.env.example`. More may be added here as the RAG and backend features are implemented.

---

## API Documentation

`backend/app/main.py` does not yet define a FastAPI application or any routes, so there are currently **no API endpoints implemented**.

Once the backend is implemented (see [Team Responsibilities](#team-responsibilities), Teammate #5), this section will document each endpoint's method, path, request schema, and response schema based on the actual code in `backend/app/` and `backend/models/`.

---

## RAG Pipeline

`backend/rag/` currently contains only an empty `__init__.py`. The pipeline below describes the intended design, not yet-implemented behavior.

```text
Syllabus PDFs
     ↓
Document Loading
     ↓
Cleaning / Chunking
     ↓
HuggingFace Embeddings
     ↓
FAISS Vector Store
     ↓
Retriever
     ↓
Retrieved Context
     ↓
Groq LLM
     ↓
Grounded Answer
```

### Grounding & Safety Rules

The syllabus assistant must follow these rules:

* Syllabus-related answers must come only from retrieved syllabus content.
* The assistant must not invent syllabus information.
* It must never fabricate:
  * exam dates
  * grading percentages
  * attendance rules
  * course policies
* If the information cannot be found in the syllabus, the assistant should clearly state that the information is unavailable and recommend checking with the Teaching Assistant.
* Deterministic calculations such as GPA and study scheduling are handled by the Python tools in `backend/tools/`, not by the LLM.

---

## Tools

### GPA Impact Simulator

Calculates how hypothetical or upcoming grades affect a student's overall GPA. This is a deterministic Python calculation (not delegated to the LLM), intended to live in `backend/tools/`.

**Status:** Planned — not yet implemented (`backend/tools/` currently contains only an empty `__init__.py`).

### Study Schedule Generator

Generates a study schedule based on a student's courses and exam dates, using deterministic Python logic alongside the GPA tool in `backend/tools/`.

**Status:** Planned — not yet implemented.

---

## Conversation Memory

Maintains context across multiple turns of a conversation so the assistant can answer follow-up questions without the student repeating earlier context. Intended to live in `backend/memory/`.

**Status:** Planned — not yet implemented (`backend/memory/` currently contains only an empty `__init__.py`).

---

## Frontend

A plain HTML/CSS/Vanilla JavaScript interface that will communicate with the FastAPI backend once it is implemented.

Current files:

* `frontend/index.html` — starter HTML skeleton (no content yet)
* `frontend/css/style.css` — empty
* `frontend/js/app.js` — empty

**Status:** Not yet built.

---

## Testing

The `tests/` folder exists but is currently empty — no test files have been added yet. `pytest` is not yet listed in `requirements.txt`; add it (and update `requirements.txt`) when the team starts writing tests.

Planned areas to cover once the corresponding features are implemented:

* Unit tests for the GPA and study schedule tools (deterministic, so straightforward to test)
* Retrieval tests for the RAG pipeline
* API endpoint tests once `backend/app/main.py` defines routes

---

## Git Workflow

Recommended workflow for the team:

* Create a feature branch per task/feature instead of committing directly to `main`.
* Open a pull request and get at least one review before merging.
* Write clear, descriptive commit messages.
* Pull the latest `main` before starting new work to avoid conflicts.
* If a change adds a new package, update `requirements.txt` in the same pull request (see [Development Setup](#development-setup), step 19).
* Never commit `.env` or `.venv/` (see [Development Setup](#development-setup), steps 11–12).

---

## Team Responsibilities

| # | Focus Area | Responsible For | Main Folders |
|---|---|---|---|
| 1 | RAG | Embeddings, FAISS vector store, retrieval, RAG chain | `backend/rag/`, `vectorstore/` |
| 2 | Document Processing | Syllabus documents, document loading, text cleaning, chunking, preparing documents for RAG | `backend/document_processing/`, `data/` |
| 3 | AI Tools / Memory / Agent Integration | GPA calculator, study schedule generator, conversation memory, later AI/tool integration | `backend/tools/`, `backend/memory/` |
| 4 | Frontend | HTML, CSS, Vanilla JavaScript, communicating with FastAPI endpoints | `frontend/` |
| 5 | Backend | FastAPI, API endpoints, Pydantic request/response models, backend integration | `backend/app/`, `backend/models/` |

---

## Contributors

This project is built by a team of 5 students, with responsibilities as listed in [Team Responsibilities](#team-responsibilities) above.

<!-- Add team member names / GitHub handles here. -->

---

## Current Project Status

The repository is currently in the **initial scaffolding / planning stage**:

* Folder structure for backend, frontend, data, and vector store is in place.
* `requirements.txt` and the Python virtual environment are set up.
* `.env.example` documents the required `GROQ_API_KEY`.
* `backend/app/main.py` and the files under `backend/document_processing/`, `backend/rag/`, `backend/tools/`, `backend/memory/`, and `backend/models/` are empty `__init__.py` placeholders — no application logic has been written yet.
* `frontend/` contains only an empty HTML skeleton, empty CSS, and empty JavaScript.
* `tests/` is empty.
* No FAISS index has been generated yet (`vectorstore/faiss_index/` is empty), and no syllabus documents have been added yet (`data/raw/syllabi/` is empty).

None of the four core features (Grounded Syllabus RAG, GPA Impact Simulator, Study Schedule Generator, Multi-Turn Conversation Memory) are implemented yet.

---

## Future Improvements

Optional enhancements to consider once the MVP is complete:

* Support for multiple courses/syllabi at once
* Persistent (cross-session) conversation memory, e.g. backed by a database
* Deployment (containerization, hosting)
* Automated CI pipeline for tests
* Expanded automated test coverage
* Improved frontend UI/UX
