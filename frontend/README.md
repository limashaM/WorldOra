# Worldora (af-2-limashaM)

A modern React application built with React, MongoDB, REST Countries API, and a full testing setup(Jest).

### Project Links

- Live Demo:* https://worldora.dynac.space/
- GitHub Repo (Course Submission):* https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-limashaM
- GitHub Repo (Personal/Public):* https://github.com/limashaM/WorldOra

---

## Features

- Search, filter, and sort countries
- Add/remove favorites 
- User authentication 
- Region and language filters
- Country detail view
- Unit and integration testing with Jest
- Responsive UI with Tailwind CSS

---

## Tech Stack

| Category      | Tools Used                          |
| ------------- | ----------------------------------- |
| Framework     | React                      |
| Styling       | Tailwind CSS                        |                     
| Routing       | React Router DOM (v7)               |
| Notifications | React Toastify                      |
| Testing       | Jest                                |
| Hosting       | Vercel                              |
| API           | REST Countries API                  |

---

## ⚙ Setup Instructions

### Prerequisites

- Node.js (version 18+)
- npm

## Development

bash
npm start


Runs locally at: (http://localhost:3000)

### Run Tests

npm run test:unit
npm run test:integration


## API Usage (REST Countries)

Used endpoints:

- GET /all?fields=...
- GET /name/{name}
- GET /region/{region}
- GET /currency/{currency}
- GET /alpha/{code}

---

## Challenge:
The Restcountries.com API suddenly stopped responding. I tried to fix it from my side, but the issue was not local.

## Resolution:
Later, the group confirmed the API was down for everyone, and the issue was resolved by the Restcountries.com team.