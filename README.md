# Peng Flooring

Peng Flooring is an lead generation website aimed to direct traffic towards flooring contractors/remodel companies. 

---

## Overview

This repository includes:

1. **Frontend**: A Next.js application with server-side and client-side rendering.
2. **Backend**: Bun package manager. Gmail API configured through Cloudflare Workers/Functions, initially set up with Postgres + Docker.

---

## Quick Start:

### 1. Frontend

1. Get bun [https://bun.sh/]
2. `cd peng-flooring/`
3. update `env`  variables
4. Install dependencies: `bun install`
5. Run `bun dev`

### 2. Backend

1. Get bun [https://bun.sh/]
2. `cd backend/`
3. Update `env` variables
4. Install dependencies: `bun install`
5. Run `bun dev` (dev = hot reload, start for no hot reload)

### 4. Database

1. Get docker [https://docs.docker.com/engine/install/]
2. `cd backend/`
3. Run `docker-compose up -d`
4. Run `bun db:generate` (generate new DB code)
5. Run `bun db:migrate` (migrate DB schema changes)
6. Get pgweb [https://github.com/sosedoff/pgweb]
7. Run pgweb in another terminal to visualize database

---

## Development Workflow

### Steps for Contribution

1. Clone the repository

   - Clone the main repository to your local machine:
     ```bash
     git clone https://github.com/jasonpeng7/pngfloor.git
     ```

2. Create a new branch

   - Always create a feature or bugfix branch off the latest `main` branch:
     ```bash
     git checkout main
     git pull origin main
     git checkout -b [branch-name]
     ```

3. Make changes and commit

   - After implementing your feature or fix:
     ```bash
     git add .
     git commit -m "feat: add feature description"
     ```

4. Push and create a pull request

   - Push your branch to the remote repository and create a pull request on GitHub to merge into `main` branch:
     ```bash
     git push origin [branch-name]
     ```
     
6. Merging to `main`
   - After all changes in branch are approved and tested, they will be merged
     into the `main` branch for production deployment.

---

## Contributors

- Jason Peng
