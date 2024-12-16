import pkg from 'pg';
const { Pool } = pkg;

import express from 'express';
import cors from 'cors';

// Configuración base de datos likeme
const pool = new Pool({
  host: 'localhost',
  user: 'postgres', // COMPLETAR CON USUARIO POSTGRES
  password: 'postgres', // COMPLETAR CON PASSWORD POSTGRES
  database: 'likeme',
  allowExitOnIdle: true,
});

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta GET: Obtener todos los posts (http://localhost:3000/posts)
app.get('/posts', async (req, res) => {
  try {
    const consulta = 'SELECT * FROM posts ORDER BY id DESC';
    const { rows } = await pool.query(consulta);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener los posts:', error);
    res.status(500).json({ error: 'Error al obtener los posts' });
  }
});

// Ruta GET: Obtener un post específico por ID (http://localhost:3000/posts/[id del post])
app.get('/posts/:id', async (req, res) => {
  const { id } = req.params; // Captura el ID desde la URL
  try {
    const consulta = 'SELECT * FROM posts WHERE id = $1';
    const values = [id];
    const { rows } = await pool.query(consulta, values);
    if (rows.length > 0) {
      res.json(rows[0]); // Retorna el post encontrado
    } else {
      res.status(404).json({ error: 'No se encontró un post con ese ID' });
    }
  } catch (error) {
    console.error('Error al obtener el post específico:', error);
    res.status(500).json({ error: 'Error al obtener el post' });
  }
});

// Ruta POST: Agregar un nuevo post (Body > Rellenar pares clave valor "titulo", "img" y "descripción" del nuevo objeto JSON a postear)
app.post('/posts', async (req, res) => {
  const { titulo, img, descripcion } = req.body;
  try {
    const consulta = 'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4)';
    const values = [titulo, img, descripcion, 0];
    await pool.query(consulta, values);
    res.status(201).send('Post agregado con éxito');
  } catch (error) {
    console.error('Error al agregar el post:', error);
    res.status(500).json({ error: 'Error al agregar el post' });
  }
});

// Ruta PUT: Sumar un like a un post (http://localhost:3000/posts/like/[id del post])
app.put('/posts/like/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const consulta = 'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(consulta, [id]);
    if (rows.length > 0) {
      res.status(200).json({ message: 'Like registrado', post: rows[0] });
    } else {
      res.status(404).json({ error: 'Post no encontrado' });
    }
  } catch (error) {
    console.error('Error al registrar el like:', error);
    res.status(500).json({ error: 'Error al registrar el like' });
  }
});

// Ruta DELETE: Eliminar un post
app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const consulta = 'DELETE FROM posts WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(consulta, [id]);
    if (rows.length > 0) {
      res.status(200).json({ message: 'Post eliminado', post: rows[0] });
    } else {
      res.status(404).json({ error: 'Post no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar el post:', error);
    res.status(500).json({ error: 'Error al eliminar el post' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
