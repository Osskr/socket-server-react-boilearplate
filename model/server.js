const express = require('express');
const http = require('http')
const socketio = require('socket.io')
const cors = require('cors')

const path = require('path');
const Sockets = require('../controllers/sockets');

class Server{
    
    constructor(){
            
        this.app = express();
        this.port = process.env.PORT;

        //Http Server config 
        this.server = http.createServer(this.app)
        
        //Socketio config
        this.io = socketio(this.server, {/*configuraciones */})


        this.paths = {}

        //Middlewares
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
        //Sockets
        this.sockets();
    }

    middlewares(){

        // Desplegar el directorio publico
        this.app.use(express.static(path.resolve(__dirname ,'../public')))
        //CORS
        this.app.use(cors())
 
    }

    routes(){

    }

    // Configuracion de Sockets
    sockets(){
     new Sockets(this.io);
    }

    listen(){
       
        
        this.server.listen(this.port, ()=>{
            console.log('Server running at: ',this.port)
        })
    }
}

module.exports = Server;