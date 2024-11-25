const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

const port = 3000 //puerto del server

server.listen(port, () => {
    console.log('Servidor escuchando en el puerto ' + port)
})

app.use(express.static('public'))

io.on('connection', (socket) => {
    console.log('\n> Nueva conexion id: ' + socket.id)


    socket.on('disconnect', () => {
        console.log(' Se ha desconectado el usuario id: ' + socket.id)

    })


    socket.on('userData', function (datos) {
        console.log('correo: ' + datos.correo + ' usuario: ' + datos.usuario)

        //emitir notificacion a todos los clientes
        io.emit('newUser', { user: datos.usuario })
    })


    socket.on('message', function (datos) {
        //escucha cuando el cliente envia un mensaje 
        console.log(datos.usuario + ' ha enviado un nuevo mensaje')

        //emite el mensaje a todos los clientes conectados
        io.emit('newMessage', { user: datos.usuario, mensaje: datos.mensaje })
    })

})