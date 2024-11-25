const socket = io.connect()

//elementos
const ingresoSection = document.querySelector(".ingreso")
const chatSection = document.getElementById("chat")
const messageInput = document.getElementById("msj-input")
const messagesView = document.getElementById("messages")

socket.on('newUser', function (datos) {
        //mostrar nombre del usuario que ingresó
        var newUserItem = "<p class='user-noti'><strong>" + datos.user + "</strong> ingresó al chat</p>"
        messagesView.insertAdjacentHTML('beforeend', newUserItem)
})


//escucha el emit y muestra el mensaje recibido
socket.on('newMessage', function (datos) {
        //evaluar si el mensaje fue enviado por el cliente o recibido desde el servidor
        var msjClass = username === datos.user ? 'msj-enviado' : 'msj-recibido'

        var messageItem = "<p class='" + msjClass + "'><strong>" + datos.user + ":</strong> " + datos.mensaje + "</p>"

        messagesView.insertAdjacentHTML('beforeend', messageItem)

        // scrollear al final de los mensajes (midu)
        messagesView.scrollTop = messagesView.scrollHeight
})


function guardarUser() {
        //variables globales
        correo = document.getElementById("correo").value
        username = document.getElementById("usuario").value

        if (correo.trim() !== "" && username.trim() !== "") {
                //ocultar section ingreso y mostrar interfaz del chat
                ingresoSection.classList.remove("ingreso")
                ingresoSection.classList.add("oculto")
                chatSection.classList.remove("oculto")
                //emitir al servidor la data del usuario
                socket.emit('userData', { correo: correo, usuario: username });
        } else {
                alert("Favor complete los campos")
        }
}

function enviarMsj() {
        if (messageInput.value) {
                //recupera el mensaje
                var mensaje = messageInput.value
                //hace el emit al servidor enviando los datos en un objeto
                socket.emit('message', { mensaje: mensaje, usuario: username });

                messageInput.value = '' //reiniciar el input
        } else {
                alert("No hay texto para enviar")
        }
}