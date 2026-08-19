# University Course Syllabus & Exam Assistant

## Project Overview

<!-- Project description will be added here. -->

---

## Main Features

<!-- Main project features will be added here. -->

---

## Tech Stack

<!-- Technologies used in the project will be added here. -->

---

## Project Architecture

<!-- Project architecture will be documented here. -->

---

## Project Structure

<!-- Folder structure will be added here. -->

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

<!-- Backend and frontend run commands will be added once the applications are implemented. -->

---

## Environment Variables

<!-- Required environment variables will be documented here. -->

---

## API Documentation

<!-- FastAPI endpoints will be documented here. -->

---

## RAG Pipeline

<!-- Document loading, chunking, embeddings, FAISS, retrieval, and grounding will be documented here. -->

---

## Tools

### GPA Impact Simulator

<!-- Documentation will be added here. -->

### Study Schedule Generator

<!-- Documentation will be added here. -->

---

## Conversation Memory

<!-- Multi-turn conversation memory implementation will be documented here. -->

---

## Frontend

<!-- Frontend documentation will be added here. -->

---

## Testing

<!-- Testing instructions will be added here. -->

---

## Git Workflow

<!-- Branching, commits, and pull request workflow will be documented here. -->

---

## Team Responsibilities

<!-- Team member responsibilities will be added here. -->

---

## Contributors

<!-- Team members will be added here. -->

---

## Future Improvements

<!-- Optional improvements will be added here. -->
