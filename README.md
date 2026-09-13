# SmartEdu-OS 🚀
> **SIH ID 26207 | Student Innovation**

Smart education is a concept that describes learning in the digital age. It enables learners to learn more effectively, efficiently, flexibly, and comfortably. **SmartEdu-OS** is an integrated full-stack platform designed to revolutionize digital learning through server-side routes, AI services, and robust modular architecture.

---

## 🌟 Key Features & Backend Architecture

Based on our updated full-stack structure (`server/` and `src/`), SmartEdu-OS offers comprehensive backend routes and modular integrations:

*   **⚙️ Backend API Routes (`server/routes/`):**
    *   **activity.js:** Tracks student engagement, study sessions, and platform metrics.
    *   **chat.js:** Powers interactive AI chat, Socratic dialogue, and tutoring assistants.
    *   **documents.js:** Handles verification, uploading, and management of study documents.
    *   **evaluate.js:** Processes knowledge checks, quizzes, and automated student assessments.
    *   **health.js:** Monitors API status, database connectivity, and system health.
    *   **parent.js:** Manages guardian access and student progress tracking for parents.
    *   **simulate.js:** Controls sandbox environments like cybersecurity simulations and virtual tools.
*   **🤖 AI & Core Services (`server/services/`):**
    *   **ollamaClient.js:** Integrates local LLM processing via Ollama for intelligent tutoring.
    *   **promptTemplates.js:** Structured prompt engineering frameworks for consistent AI responses.
    *   **index.js:** Core service orchestrator connecting backend middleware.

---

## 📂 Project Structure

```text
smartedu-os/
├── server/                 # Backend Node.js & Express server
│   ├── routes/             # API endpoints (activity, chat, documents, evaluate, health, parent, simulate)
│   └── services/           # Business logic & AI integration (ollamaClient, promptTemplates)
├── src/                    # Frontend source code & assets
├── public/                 # Static assets
└── README.md
