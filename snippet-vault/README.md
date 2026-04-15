# 1. Клонувати репозиторій

git clone <repo_url>

# 2. Перейти в проект

cd snippet-vault

# 3. Backend

cd backend
npm install
npm run start:dev

# 4. Frontend (в новому терміналі)

cd ../frontend
npm install
npm run dev
  

  Отримати всі снипети
GET http://localhost:3001/snippets
🔍 Пошук
GET http://localhost:3001/snippets?q=react
🏷️ Фільтр по тегу
GET http://localhost:3001/snippets?tag=js
➕ Створити
POST http://localhost:3001/snippets
Content-Type: application/json
{
  "title": "useEffect",
  "content": "React hook example",
  "tags": ["react"],
  "type": "note"
}
✏️ Оновити
PATCH http://localhost:3001/snippets/{id}
🗑️ Видалити
DELETE http://localhost:3001/snippets/{id}
🏗️ Як зробити білд
Backend
cd backend
npm run build
npm run start
Frontend
cd frontend
npm run build
npm run start
🚀 Продакшн запуск

👉 після білду:

backend: http://localhost:3001
frontend: http://localhost:3000
💡 Додатково
Frontend використовує Next.js + React Query + Axios
Backend — NestJS + MongoDB (Mongoose)
