const usersData = require('./specialities.js');

const express = require("express"); 
const app = express();

app.get('/', (req, res) => {
    res.send(
      `
      <head>
      <title>HOME</title>
      </head>
      <h1>Home</h1>
      <nav>
      <a href="/marketing">Marketing</a>
      <a href="/developers">Developers</a>
      <a href="/qas">QAs</a>
      <a href="/ventas">Ventas</a>
     </nav>
     `
    );
  });

app.get('/marketing', (req, res) => {
    res.send(
      pageSpecialty("marketing")
    );
  });

app.get('/developers', (req, res) => {
    res.send(
      pageSpecialty("developers")
    );
  });

app.get('/qas', (req, res) => {
    res.send(
      pageSpecialty("QAs")
    );
  });

app.get('/ventas', (req, res) => {
    res.send(
      pageSpecialty("ventas")
    );
  });

app.use((req, res) => {
    res
      .status(404)
      .send(
        `<h1>PAGINA NO ENCONTRADA</h1><a href="/">home</a><p>Ruta actual: ${req.path}</p>`
      );
  });

app.listen(3000,()=>{
    console.log("funciona el puerto")
}); 


//Crea una función para filtrar usuarios por su especialidad

const filterSpeciality = (especialidad) =>{
  return usersData.filter((element)=>element.specialty.includes(especialidad));
}

const filtradasMarketing = filterSpeciality("marketing")
console.log(filtradasMarketing)

const filtradasDevelopers = filterSpeciality("developers")
console.log(filtradasDevelopers)

const filtradasQas = filterSpeciality("QAs")
console.log(filtradasQas)

const filtradasVentas = filterSpeciality("ventas")
console.log(filtradasVentas)

  
/*
Generación de Páginas HTML:
Utiliza literal string para construir páginas HTML directamente en el código..
Crea una página para cada especialidad que muestre el título de la página, el número de personas y los detalles de cada usuario.
*/


const pageSpecialty = ((especialidad) =>{
  const usuarios = filterSpeciality(especialidad)
  const numbUsers = usuarios.length
  return `
  <head>
  <title>${especialidad.toUpperCase()}</title>
  </head>
  <header>
  <nav>
      <a href="/">Home</a>
      <a href="/marketing">Marketing</a>
      <a href="/developers">Developers</a>
      <a href="/qas">QAs</a>
      <a href="/ventas">Ventas</a>
  </nav>
<main>
  <h1> Equipo de ${especialidad} <span> (${numbUsers} personas)</span></h1>
  <div class="fichaUser">
      ${usuarios.map(usuario => `
          <p>Nombre: ${usuario.name}</p>
          <p>Edad: ${usuario.age}</p>
      `).join('')}
  </div>
</main>  `
}); 
