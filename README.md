<h1>Desafío 4: Acceso a una base de datos con Node y el paquete pg (Parte II)</h1>
<p>Módulo 6: Backend con Node y Express (68) > Desafío - Like Me (Parte II)<br><br></p>
<h2>Instrucciones para el usuario</h2>

<ol>
  <li><p>Descargar el archivo presionando en el botón verde que indica "Code", y luego en Download ZIP</p></li>
  <li><p>Descomprimir modulo6-desafio4-main.zip en un directorio deseado</p></li>
  <li><p>Abrir la carpeta modulo6-desafio4-main en Visual Studio Code</p></li>
  <li><p>Abrir 2 terminales e ir ejecutando, mediante la tecla Enter, lo siguiente:</p></li>
</ol>

<h3>Terminal I</h3>
<ul>
  <li><p>cd backend</p></li>
  <li><p>nodemon index.js</p></li>
</ul>

<h3>Terminal II</h3>
<ul>
  <li><p>cd frontend</p></li>
  <li><p>npm i</p></li>
  <li><p>npm run dev</p></li>
</ul>
<p>Finalmente, mantener presionada la tecla ctrl y clickear sobre el link localhost generado.<br></p><br>

<h2>⚠️ Importante ⚠️</h2>
<ul>
  
  <li><p>Se debe contar con una base de datos en PostgreSQL llamada "likeme":<br><br> 
    CREATE DATABASE likeme;<br><br>
</p></li>
  
  <li><p>Dicha base de datos debe contener la siguiente tabla llamada "posts": <br> <br> 
    CREATE TABLE posts ( <br>
    id SERIAL PRIMARY KEY, <br>
    titulo VARCHAR(25), <br>
    img VARCHAR(1000), <br>
    descripcion VARCHAR(255), <br>
    likes INT DEFAULT 0 <br>
);	 
</p></li>

<li><p>En el archivo "index.js" de la subcarpeta "backend", se deben modificar las lineas 10 y 11, completando respectivamente con el usuario y contraseña de PostgreSQL, dentro de las comillas simples.<br></p></li>  
</ul><br>

<h2>Cómo usar la aplicación</h2>
<p>Considerar que solo funcionará habiendo completado los pasos de los items anteriores:</p>

<h3>En la propia página</h3>
<ul>
  <li><p>Se tiene una interfaz para hacer un post escribiendo sobre los campos de "Título" (1), "URL de la iamgen" (2) y "Descripción" (3)</p></li>
  <li><p>El usuario puede postear una imagen, pegando su URL en el segundo campo. A ella puede agregar un título y una descripción. Para culminar, debe presionar el botón "Agregar"</p></li>
  <li><p>Si el post fue agregado exitosamente, será visible en la propia interfaz, con (en orden descendente) la imagen, el título, y la descripción.<br></p></li>
  <p><br>NUEVO:</p>
  <li><p> Ahora es posible sumar un like al post presionando ❤️, o eliminar el post presionando ❌.<br></p></li>
  <li><p>Los posts serán ordenados de "más actual" a "menos actual" en orden descendente.</p></li>
</ul><br>

<h3>En VSCode mediante la extensión Thunder Client</h3>
<ul>
  <li><p>Presionar botón New Request</p></li>
  <li><p>En la barra mostrada, escribir localhost:3000/posts</p></li>
</ul>

<h4>Ruta GET</h4>
<ul>
  <li><p>Predisponer GET en el desplegable</p></li>
  <li><p>En la barra, escribir http://localhost:3000/posts</p></li>
  <li><p>Presionar Send</p></li>
  <li><p>✅ Si todo está correcto, en el response se debiesen ver los objetos, con sus respectivos pares clave-valor de id, titulo, img, descripcion, y likes. Todo esto procedente de la database likeme (si no hay posts, un arreglo vacío)</p></li>
  <li><p>Si queremos obtener solo un post en particular, en la barra se debe escribir http://localhost:3000/posts/[id del post]</p></li>
</ul>

<h4>Ruta POST</h4>
<ul>
  <li><p>Predisponer POST en el desplegable</p></li>
  <li><p>Presionar Body y escribir lo siguiente, reemplazando en la estructura:<br><br>
  {<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"titulo": "Titulo del post",<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"img": "URL-DE-LA-IMAGEN-DEL-POST",<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"descripcion": "Descripcion del post"<br>
}<br><br>
</p></li>
  <li><p>Presionar Send</p></li>
  <li><p>✅ Si todo está correcto, en el response se debiese ver el objeto recientemente ingresado con sus pares clave-valor id, titulo, img, descripcion, y likes.</p></li>
</ul>

<h4>Ruta PUT</h4>
<ul>
  <li><p>Predisponer PUT en el desplegable</p></li>
  <li><p>En la barra, escribir http://localhost:3000/posts/like/[id del post]</p></li>
  <li><p>Presionar Send</p></li>
  <li><p>✅ Si todo está correcto, en el response, por cada vez que se presione Send, será como presionar el botón ❤️ para el post en la interfaz. Es decir, veremos en el objeto respecto a la id ingresada, que el valor de la clave likes aumenta en 1</p></li>
</ul>

<h4>Ruta DELETE</h4>
<ul>
  <li><p>Predisponer DELETE en el desplegable</p></li>
  <li><p>En la barra, escribir http://localhost:3000/posts/[id del post]</p></li>
  <li><p>Presionar Send</p></li>
  <li><p>✅ Si todo está correcto, en el response se mostrará algo como lo siguiente:<br><br>
  {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"message": "Post eliminado",<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"post": {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": id del post eliminado,<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"titulo": "Titulo del post eliminado",<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"img": "URL-DEL-POST-ELIMINADO",<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"descripcion": "Descripción del post eliminado",<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"likes": Likes del post eliminado<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>
}<br><br>
  </p></li>
  <li><p>Notar que, en caso de accidente, es preferible ver esto (para rescatar la información) en vez de solo un mensaje de <br>"Post eliminado con éxito".</p></li>
</ul>

<h2><br>Créditos</h2>
<p>De Joaquín López Rojas para Desafío Latam, FullStack Javascript, Generación 68.</p>

