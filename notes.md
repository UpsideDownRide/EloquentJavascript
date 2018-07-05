# Notes from Eloquent Javascript

### Character Encoding

Standard string methods are 'broken' when used with UTF-16 characters. From a brief reading on the web it seems that JS does not represent UTF-16 internally as such but uses somethign else which results in problems. For example when callin charAt method it will only return part of the Unicode for the whole character.

### Backticks notation for strings

Backticks can be used so that javscript can be invoked form inside. Like so: 
```js
const message = 'is a good day'
console.log(`Today ${message}`)
```

### Beware of inheritence - map example
```js
let ages = {
    Boris: 39,
    Liang: 22,
    Júlia: 62
};
console.log(`Júlia is ${ages["Júlia"]}`);
// → Júlia is 62
console.log("Is Jack's age known?", "Jack" in ages);
// → Is Jack's age known? false
console.log("Is toString's age known?", "toString" in ages);
// → Is toString's age known? true
```

Worth remembering this caveat. `Object.create(null)` can be used to create object without deriving the properties. Also JS has Map class for using objects as pure dictionaries.

### Statics in class
```js
class Temperature {
    constructor(celsius) {
        this.celsius = celsius;
    }
    get fahrenheit() {
        return this.celsius * 1.8 + 32;
    }
    set fahrenheit(value) {
        this.celsius = (value - 32) / 1.8;
    }
    static fromFahrenheit(value) {
        return new Temperature((value - 32) / 1.8);
    }
}
```

The static keyword means that the method will be available only for the constructor and will not be in the class instances.

### Improvised modules

While they are superseded by the ES6 modules they are probably very likely to be encountered all over the place in older codebases. An example:

```js
const weekDay = function() {
    const names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return {
        name(number) { return names[number]; },
        number(name) { return names.indexOf(name); }
    };
}();

console.log(weekDay.name(weekDay.number("Sunday")));
// → Sunday
```
### Promises

Promises are a monadic structure to deal with asynchronous tasks. They supersede callback method of dealing with async. A nice discussion is available at [https://github.com/promises-aplus/promises-spec/issues/94](https://github.com/promises-aplus/promises-spec/issues/94). 

Promises always resolve or reject as a new event. Even if a promise is already resolved, waiting for it will cause your callback to run after the current script finishes, rather than right away.
```js
Promise.resolve("Done").then(console.log);
console.log("Me first!");
// → Me first!
// → Done
```

### Async

An async function is a function that implicitly returns a promise and that can, in its body,
await other promises

### Query selectors

* .class
* \#element (by unique id)
* p#main.a.b - p elements with id of main and classes a and b
* p > a is all a elements that are direct children of p
* p a applies to all a tags inside p regardless if they are direct or indirect children

`querySelectorAll` method is defined on document object and element nodes. Example of count function:
```js
const count = selector => document.querySelectorAll(selector).length
```

### Events

`.addEventListener` takes event type and a function to execute on this event. There is also `.removeEventListener`. Difference between onclick and addEventListener with "click" is that multiple listeners can be added to a node. Event handler functions are passed an event object which allows to get additional information about the event. For example which mouse button was pressed. Events propagate upwards to parents of nodes, this propagation can be stopped with `event.stopPropagation`
Default actions (ie context menu on right click) can be prevented with `event.preventDefault`. Touch events are separate - touchstart, touchmove and touchend. Since multiple touch points can be registered they are being hold in array-like object with coordinates. There are also separate scroll events. Focus events get fired when respective elements gain focus (ie input field) and blur event is fired when element loses focus. Those events do not propagate. Another class of events that do not propagate are load events.

To avoid boggling down page with too much stuff to run concurrently resulting in event loop being held back by slow computations jobs can be delegated to workers. The code for worker should be put in a separate file.

```js
// squareworker.js
addEventListener("message", event => {
postMessage(event.data * event.data);
});
// code in page
let squareWorker = new Worker("code/squareworker.js");
squareWorker.addEventListener("message", event => {
console.log("The worker responded:", event.data);
});
squareWorker.postMessage(10);
squareWorker.postMessage(24);
```

##### Debouncing

To avoid firing too many events (for example on scroll or mousemove) or to do something consuming on such events several debouncing techniques can be employed.

```js
<textarea>Type something here...</textarea>
<script>
    let textarea = document.querySelector("textarea");
    let timeout;
    textarea.addEventListener("input", () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => console.log("Typed!"), 500);
    });
</script>
```

A slight modification of above can also be used to fire an event with certain frequency when it occurs.