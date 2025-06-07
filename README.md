# Application Usage Guide

- ## Getting Started

Follow these steps to clone, set up, and run the project

### 1. Clone the repository

```bash
git clone <your-repo-url>
```

### 2. Install dependencies

```bash
npm install
```

### 3. .env file
Файл .env залитий на гітхаб з моїми значеннями змінних для полегшення перевірки та для доступу до моєї хмарної бази даних Cloud MongoDB. Там є також і пошта з паролем для відправки пошти при аутентифікації.

### 4. Data Base
Якщо не вийде під'єднатись до моєї хмарної бази даних, то в корні проєкту є її дамп в директорії /dump 

### 5. Run the project
```bash
npm run start
```

- ## Postman endpoints

### 1. Postman collection
Import related postman collection from directory /postman
File: NodeJS_Test_Clinics.postman_collection.json

### 2. Postman environment
Import and set required environment from directory /postman
File: node-lessons.postman_environment.json

### 3. Use created user with admin role to have access for endpoints with root:admin
Можна або логінитись наявними адмінами (user1@gmail.com, Pa$$word1), або вручну змінити поле role на значення admin