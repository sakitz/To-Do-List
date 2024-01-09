//variables
const formulario = document.querySelector('#formulario')
const listaTweets = document.querySelector('#lista-tweets')
let tweets = [];

//EventListeners
EventListeners();

function EventListeners() {
    //cuando el usurio grega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

     // Borrar Tweets
     listaTweets.addEventListener('click', borrarTweet);

    //cuando el document esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];
        crearHTML();
    })
}

//Funciones
function agregarTweet(evt) {
    evt.preventDefault();

    const tweet = document.querySelector('#tweet').value;

    if (tweet === '') {
        mostrarError('Un mensaje no puede estar vacio, escriba algo.')
        
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet : tweet
    }
    //añadir l arreglo de tweets
    tweets = [...tweets, tweetObj]

    //crear el html
    crearHTML();

    //reiniciar el formulario;
    formulario.reset();
}

//mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error')

    //insertarlo en el contenido
    const contenido = document.querySelector('#contenido')
    contenido.appendChild(mensajeError);

    //eliminar la alerta
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

//muestra el listdo de los tweets
function crearHTML() {

    limpiarHTML();

    if (tweets.length > 0) {
        tweets.forEach( tweet => {
            //agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet')
            btnEliminar.innerText = 'X';

            //añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            //crear el html
            const li = document.createElement('li');

            //añadir texto
            li.innerText = tweet.tweet;

            //asignar boton
            li.appendChild(btnEliminar)

            //insertar en el html
            listaTweets.appendChild(li)
        })
    }

    sincronizarStorge();
}

//agregar los tweets a localstorage
function sincronizarStorge() {
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

//borrar tweets
function borrarTweet(id) {
     tweets = tweets.filter( tweet => tweet.id !== id)
    
     crearHTML();
}

//limpiar el html
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild)
    }
}