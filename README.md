# expense tracker

a full stack expense tracker web application built with react, flask and postgresql. users can register, securely log in using jwt authentication and manage their daily expenses with complete crud functionality.

## live demo

frontend: https://expense-tracker-spiritf0x.vercel.app

backend: https://expense-tracker-api-vpql.onrender.com

## features

* user registration and login using jwt authentication
* protected dashboard for authenticated users
* add new expenses
* edit existing expenses
* delete expenses
* expense summary showing total spent,total expenses and average expense
* recent expenses list
* persistent data storage using postgresql
* responsive and clean user interface

## tech stack

### frontend

* react
* vite
* axios
* react router dom
* css

### backend

* flask
* flask sqlalchemy
* flask jwt extended
* flask cors

### database

* postgresql

### deployment

* vercel
* render

## screenshots

### home page

<img width="397" height="335" alt="image" src="https://github.com/user-attachments/assets/080e56af-63d3-4efd-b2f3-e6e74095966d" />
<img width="381" height="365" alt="image" src="https://github.com/user-attachments/assets/06b6941a-46e6-4dd6-89a2-655b66accbf3" />


### dashboard

<img width="691" height="653" alt="image" src="https://github.com/user-attachments/assets/d734c9e9-3400-46fd-aa7c-23101f991bf1" />

### edit expense

<img width="709" height="652" alt="image" src="https://github.com/user-attachments/assets/c90df548-5533-4e84-81e2-96f311909337" />
<img width="702" height="649" alt="image" src="https://github.com/user-attachments/assets/05cf6146-ec5f-4ff3-ac4d-f88d7d3c5e82" />

## installation

### clone the repository

```bash
git clone https://github.com/spiritf0x469/expense-tracker.git
cd expense-tracker
```

### backend setup

```bash
cd backend
pip install -r requirements.txt
py app.py
```

### frontend setup

```bash
cd frontend
npm install
npm run dev
```

## project structure

```text
expense-tracker
├── backend
│   ├── routes
│   ├── models.py
│   ├── config.py
│   ├── app.py
│   └── requirements.txt
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── assets
│   ├── package.json
│   └── vite.config.js
```

## future improvements

* expense filtering by category
* monthly expense analytics
* charts and graphs
* search functionality
* expense export
* dark mode
