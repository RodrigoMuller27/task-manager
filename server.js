const express = require('express');
const app = express();
const path = require('path');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));


let tasks = [
  { id: 1, title: 'Estudar JavaScript', description: 'Revisar conceitos básicos', status: 'Pendente' },
  { id: 2, title: 'Fazer compras', description: 'Ir ao supermercado', status: 'Pendente' }
];


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/tasks', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'tasks.html'));
});


app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title: title,
    description: description,
    status: 'Pendente'
  };
  tasks.push(newTask);
  res.redirect('/tasks'); 
});


app.get('/create-task', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'create_task.html'));
});


app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na http://localhost:${PORT}`);
});
