let firebaseConfig = {
  apiKey: "AIzaSyDXAlQeHVJVMBxI-ffcLy8tY_NyaRe5GCM",
  authDomain: "demoweb-3fd5d.firebaseapp.com",
  projectId: "demoweb-3fd5d",
  storageBucket: "demoweb-3fd5d.firebasestorage.app",
  messagingSenderId: "595157286679",
  appId: "1:595157286679:web:f31888123093d0da8dc152",
  measurementId: "G-L4LSFQMK1H",
};

firebase.initializeApp(firebaseConfig);// Inicializaar app Firebase
const db = firebase.firestore();// db representa mi BBDD //inicia Firestore

const formulario = document.getElementById("contactos");

formulario.addEventListener("submit", function (event) { //Llamada del Sumit para input de diferentes campos
  event.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const mensaje = document.getElementById("mensaje").value;
  const imagen = document.getElementById("imagen").value;



  console.log({ nombre, email, mensaje, imagen }); //Probando que los datos llegan


  //Contactos existentes o crear array vacío
  db.collection("contactos").add({
    nombre,
    email,
    mensaje,
    imagen
  })
    .then(() => {
      alert("¡Muchas gracias! " + nombre);
      formulario.reset();
      mostrarContactos(); // Actualizar la lista
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });

  // Mostrar los contactos
  mostrarContactos();

  // Limpiar el formulario
  formulario.reset();
});

// Función para mostrar contactos
function mostrarContactos() {
  let contactList = document.getElementById('contactList');

  db.collection("contactos").get()
    .then((querySnapshot) => {
      contactList.innerHTML = ''; // Limpiar la lista

      querySnapshot.forEach((doc) => {
        const contacto = doc.data();
        const div = document.createElement('div');
        div.classList.add('contacto');


        let imagenHTML = contacto.imagen ?
          `<img src="${contacto.imagen}" alt="Imagen de contacto">` : '';

        div.innerHTML = `
        <p>Nombre: ${contacto.nombre}</p>
        <p>Email: ${contacto.email}</p>
        <p>Mensaje: ${contacto.mensaje}</p>
        <p>Id: ${doc.id}</p>
        ${imagenHTML}
      `;
        contactList.appendChild(div);
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}
//        FUNCIONES
// Funcion para eliminar un contacto
const deleteInfo = () => {
  const id = prompt('Introduce un Id a borrar');
  db.collection("contactos").doc(id).delete().then(() => {
    alert(`Documento ${id} ha sido borrado`);
    //Clean
    document.getElementById('contactList').innerHTML = "";
  })
    .catch(() => console.log('Error borrando documento'))
}

// Funcion para eliminar todo (Clean)
const cleanContactos = () => {
  document.getElementById('contactList').innerHTML = "";
}

// Funcion para eliminar todo
const deleteAllInfo = () => {
  const borrarTodo = confirm("Estas seguro de borrar TODO?")
    db.collection("contactos").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        db.collection("contactos").doc(doc.id).delete();
      });
      alert('Todos los contactos han sido borrados');
      document.getElementById('contactList').innerHTML = "";
    }).catch((error) => {
      console.log('Error borrando formularios', error);
    });
  }


//        Eventos

// Eliminar un contacto
document.getElementById('borrar-contacto').addEventListener('click', () => {
  deleteInfo();
})

// Evento para borrar todos
document.getElementById('borrar-todos').addEventListener('click', deleteAllInfo);

// Limpiar doc
document.getElementById('borrar-datos').addEventListener('click', () => {
  cleanContactos();
})



document.addEventListener('DOMContentLoaded', mostrarContactos);
// // Botón para borrar todos los datos
// const botonBorrar = document.querySelector("#borrar");
// botonBorrar.addEventListener("click", function (event) {
//   localStorage.clear();
//   mostrarContactos();
// });

// // Botón para borrar solo el nombre
// const botonBorrarNombre = document.querySelector("#borrar-nombre");
// botonBorrarNombre.addEventListener("click", function (event) {
//   let contactos = JSON.parse(localStorage.getItem('contactos')) || [];
//   if (contactos.length > 0) {
//     contactos[0].nombre = ''; // Borra el nombre del primer contacto
//     localStorage.setItem('contactos', JSON.stringify(contactos));
//     mostrarContactos();
//   }
// });





