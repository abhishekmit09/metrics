# Live Metrics Dashboard

A full-stack TypeScript application that simulates and displays real-time service health metrics. The system consists of a Node.js backend (`backendAPI`) that streams live metrics and a React frontend (`metrics_ui`) that renders them in an interactive dashboard. A Dockerfile is included to containerize the entire application.

---

## 🚀 Overview

This project simulates multiple microservices (e.g., authentication, payments, notifications) and continuously emits live metrics:

* **CPU Usage (%)**
* **Memory Usage (%)**
* **Error Rate (%)**

The backend streams fresh metrics every second using **Server-Sent Events (SSE)**.
The frontend consumes this stream and renders a responsive real-time dashboard with color-coded alerts, charts, and service-specific details.

---

## 🏗️ Project Structure

```
root
│── backendAPI/      # Node.js + TypeScript backend
│── metrics_ui/      # React + TypeScript frontend
│── Dockerfile        # Single Dockerfile for full application
│── README.md
```

---

## 🧩 Tech Stack

### Backend

* **Node.js + Express** (TypeScript)
* **Server-Sent Events (SSE)** for real-time streaming
* **Modular architecture** for extending simulators & new metrics

### Frontend

* **React + TypeScript** (CRA)
* **Context API** for global state
* **Recharts** for charts
* **CSS** for consistent design

### DevOps / Infra

* **Docker** (multi-stage build)
* **GitHub** for version control

---

## ⚙️ Backend Features (`backendAPI`)

* Simulates metrics for **N services** (default: 5)
* Emits random metrics every second
* Endpoints:

### **GET `/config`**

Returns current configuration and allows adjusting service count.

### **GET `/metrics/stream`**

SSE endpoint that streams updated metrics every second.

* Stops streaming automatically when the client disconnects.
* Designed to easily add new metrics or service types.

---

## 🖥️ Frontend Features (`metrics_ui`)

### Dashboard UI

* Responsive grid layout of all services
* Each service card shows:

  * Name
  * CPU, Memory, Error Rate
  * Real-time alert indicator:

    * **🔴 Red**: CPU > 80% or errorRate > 5%
    * **🟡 Yellow**: CPU 60–80%
    * **🟢 Green**: Otherwise

### Detail View

* Click a service to view:

  * Line chart (last 30 seconds)
  * Rolling metric history

### Controls

* Add/Remove services dynamically
* Real-time updates with no visible lag

### Performance

* Memoized React components
* Efficient state storage and update batching
* Graceful reconnection logic for SSE

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone <github-repo-url>
cd <repo-folder>
```

---
📦 Installation & Setup
1. Clone the repository
git clone https://github.com/abhishekmit09/metrics
cd <repo-folder>
🛠️ Run Locally (Without Docker)
Backend
cd backendAPI
npm install
npm run dev

Backend starts at http://localhost:4000.

Frontend
cd metrics_ui
npm install
npm start

Frontend starts at http://localhost:3000 (CRA default).


🐳 Running with Docker

Make sure Docker is installed.

Build the image
docker build -t live-metrics-dashboard .
Run the container
docker run -p 4000:4000 -p 3000:3000 live-metrics-dashboard

Both the backend and frontend will now be available on your machine.