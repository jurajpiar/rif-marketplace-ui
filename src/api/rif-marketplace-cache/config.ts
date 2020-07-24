import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'
import auth from '@feathersjs/authentication-client';

const CACHE_ADDRESS = process.env.REACT_APP_CACHE_ADDR || 'http://localhost:3030'

const socket = io(CACHE_ADDRESS)
const client = feathers()
client.configure(socketio(socket))
client.configure(auth({}))

export default client
