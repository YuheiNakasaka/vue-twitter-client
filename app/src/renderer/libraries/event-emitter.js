import EventEmitter from 'events'

class MyEmitter extends EventEmitter {}
export const eventEmitter = new MyEmitter()
