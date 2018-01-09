
import { EventEmitter } from './event-emitter';

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();

// on
myEmitter.on('event', (a, b, c) => {
    console.log('an event occurred!', a, b, c, this);
});

myEmitter.emit('event', 'a', 'b', { foo: 'bar' });

// once
myEmitter.once('event2', () => {
    console.log('an event occurred once!');
});

myEmitter.emit('event2');
myEmitter.emit('event2');


