// variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//event listeners
eventListeners()
function eventListeners() {
    // nuevo tweet
    formulario.addEventListener('submit', agregarTweet)

    // documento listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        crearHTML(); 
    })
}

// funciones
function agregarTweet(e) {
    e.preventDefault();

    // definir textarea
    const tweet = document.querySelector('#tweet').value;

    //validar
    if (tweet === '') {
        mostrarError('No puede ir vacio');
        return;
    }

    // objeto
    const tweetObk = {
        id: Date.now(),
        tweet
    }

    // agregar tweet
    tweets = [...tweets, tweetObk]


    // crear html
    crearHTML();

    // resetear form
    formulario.reset();
}

function mostrarError(error) {
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);


    // para q se elimine despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove()
    }, 3000);
}

function crearHTML() {

    limpiarHTML()

    if (tweets.length > 0) {
        tweets.forEach( tweet => {
            //agregar boton de eliminar
            const btnEliminar = document.createElement('A');
            btnEliminar.classList.add('borrar-tweet')
            btnEliminar.textContent = 'X';
            
            // añadir funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            const li = document.createElement('LI');
            li.textContent = tweet.tweet;

            listaTweets.appendChild(li);
            li.appendChild(btnEliminar)
        });
    }

    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));

}


function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);

    crearHTML();
}

