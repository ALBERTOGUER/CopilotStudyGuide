# JavaScript Interview Guide

This guide covers the most common topics in JavaScript technical interviews, with explanations, code examples, and practical exercises.

---

## 1. Data Types and Objects

**Explanation:**
In JavaScript, objects are collections of key-value pairs. You can store data and functions (methods) inside an object. Data types include primitives (string, number, boolean, null, undefined, symbol, bigint) and objects.

### Ways to create objects

1. **Object literal:**

```js
const person = { name: "Ana", age: 28 };
```

2. **Using `new Object()`:**

```js
const person = new Object();
person.name = "Ana";
```

3. **Constructor functions:**

```js
function Person(name) {
  this.name = name;
}
const ana = new Person("Ana");
```

4. **Classes (ES6):**

```js
class Person {
  constructor(name) {
    this.name = name;
  }
}
const juan = new Person("Juan");
```

5. **Object.create:**

```js
const prototype = {
  greet() {
    return "Hello";
  },
};
const obj = Object.create(prototype);
obj.name = "Ana";
```

### Object methods

- `Object.keys(obj)`: Returns an array of the object's keys.
- `Object.values(obj)`: Returns an array of the object's values.
- `Object.entries(obj)`: Returns an array of [key, value] pairs.
- `Object.assign(dest, src)`: Copies properties from one or more source objects to a target object.
- `Object.create(proto)`: Creates a new object with the specified prototype.
- `Object.freeze(obj)`: Freezes an object so it cannot be modified.
- `Object.seal(obj)`: Seals an object so properties cannot be added or removed.

### Copying objects

- **Shallow copy:**

```js
const copy = { ...person };
// or
const copy2 = Object.assign({}, person);
```

- **Deep copy:**

```js
const deepCopy = JSON.parse(JSON.stringify(person));
```

**Example:**

```js
const person = {
  name: "Ana",
  age: 28,
  greet() {
    return `Hello, I'm ${this.name}`;
  },
};
console.log(person.greet());
```

**Exercise:**

- Create an object `car` with properties `brand`, `model`, and a method `start` that prints a message.

```js
const car = {
  brand: "Toyota",
  model: "Corolla",
  year: 2020,
  start() {
    console.log(`The ${this.brand} ${this.model} is starting...`);
  },
};
car.start();
```

## 2. Prototypes and Prototypal Inheritance

**Explanation:**
JavaScript uses prototype-based inheritance. Every object has an internal reference to another object called its prototype. Methods and properties can be inherited through the prototype chain.

**Example:**

```js
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function () {
  return `${this.name} makes a noise.`;
};
const dog = new Animal("Rex");
console.log(dog.speak());
```

**Exercise:**

- Create a constructor function `Book` and add a method to its prototype that returns the title.

```js
function Book(title) {
  this.title = title;
}
Book.prototype.getTitle = function () {
  return this.title;
};
```

---

## 3. Scope

**Explanation:**
Scope determines the accessibility of variables and functions in different parts of the code. JavaScript has global, function, and block scope (with let/const).

**Example:**

```js
let x = 10;
function foo() {
  let y = 20;
  console.log(x + y);
}
foo();
```

**Exercise:**

- What does this code print and why?
  It prints 30 because `x` is accessible inside the `foo` function.

---

## 4. Hoisting

**Explanation:**
Hoisting is the behavior where variable and function declarations are moved to the top of their context before code execution. Only the declaration (not the initialization) of variables with var is hoisted; let and const do not allow access before declaration.

**Example:**

```js
console.log(a); // undefined
var a = 5;

console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b;

foo(); // "Hello" because function declarations are hoisted
function foo() {
  console.log("Hello");
}
c(); // ReferenceError: Cannot access 'c' before initialization because function expressions are not hoisted
const c = function () {
  console.log("Hello");
};

d(); // ReferenceError: Cannot access 'd' before initialization
let d = () => {
  console.log("Hello");
};

e(); // "Hello" var e is hoisted
var e = function () {
  console.log("Hello");
};
```

**Exercise:**

- Explain the difference in hoisting between `var`, `let`, and `const`.
  `var` can be hoisted but returns undefined, `let` and `const` throw a ReferenceError if accessed before declaration.

---

## 5. Closures

**Explanation:**
A closure is a function that remembers the scope in which it was created, even after that scope has finished. It allows access to external variables even after the outer function has finished executing.

**Example:**

```js
function makeCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}
const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

**Exercise:**

- Create a function that returns another function that adds a given number.

```js
const add = (x) => {
  return (y) => x + y;
};
add(5)(3); // 8
```

---

## 6. Generator Functions

**Explanation:**
Generator functions allow you to pause and resume the execution of a function using the `yield` keyword. They are useful for working with sequences of data or asynchronous flows.

**Example:**

```js
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}
const gen = generator();
console.log(gen.next().value); // 1
```

**Exercise:**

- Create a generator that yields even numbers from 2 to 10.

```js
const generator = function* () {
  for (let i = 2; i <= 10; i += 2) {
    yield i;
  }
};
const gen = generator();
gen.next().value; // 2
gen.next().value; // 4
```

---

## 7. Object-Oriented Programming (OOP)

**Explanation:**
OOP in JavaScript is implemented using constructor functions and, since ES6, classes. It allows you to create objects based on "templates" (classes) and reuse code through inheritance.

### Four Principles of OOP

1. **Encapsulation**

   - Encapsulation means bundling data (properties) and methods that operate on that data into a single unit (object), and restricting direct access to some of the object's components.
   - **Example:**

   ```js
   class Person {
     #name; // private field (ES2022+)
     constructor(name) {
       this.#name = name;
     }
     getName() {
       return this.#name;
     }
   }
   const p = new Person("Ana");
   console.log(p.getName()); // "Ana"
   // p.#name; // Error: private field
   ```

2. **Inheritance**

   - Inheritance allows one class to inherit properties and methods from another class.
   - **Example:**

   ```js
   class Animal {
     constructor(name) {
       this.name = name;
     }
     speak() {
       return `${this.name} makes a noise.`;
     }
   }
   class Dog extends Animal {
     speak() {
       return `${this.name} barks.`;
     }
   }
   const d = new Dog("Rex");
   console.log(d.speak()); // "Rex barks."
   ```

3. **Polymorphism**

   - Polymorphism means that different classes can define methods with the same name, and the correct method is called depending on the object instance.
   - **Example:**

   ```js
   class Bird {
     speak() {
       return "Chirp!";
     }
   }
   class Cat {
     speak() {
       return "Meow!";
     }
   }
   function animalSpeak(animal) {
     console.log(animal.speak());
   }
   animalSpeak(new Bird()); // "Chirp!"
   animalSpeak(new Cat()); // "Meow!"
   ```

4. **Abstraction**
   - Abstraction means hiding complex implementation details and showing only the necessary features of an object.
   - **Example:**
   ```js
   class Car {
     start() {
       this.#turnOnEngine();
       console.log("Car started");
     }
     #turnOnEngine() {
       // Complex logic hidden from the user
     }
   }
   const car = new Car();
   car.start(); // "Car started"
   // car.#turnOnEngine(); // Error: private method
   ```

**Example:**

```js
class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Hello, I'm ${this.name}`;
  }
}
const juan = new Person("Juan");
console.log(juan.greet());
```

**Exercise:**

- Create a class `Rectangle` with methods to calculate area and perimeter.

```js
class Rectangle {
  constructor(base, height) {
    this.base = base;
    this.height = height;
  }
  area() {
    return this.base * this.height;
  }
  perimeter() {
    return 2 * (this.base + this.height);
  }
}
```

---

## 8. Callbacks and Promises

**Explanation:**
A callback is a function passed as an argument to another function and executed after an event occurs or a task is completed. Promises are objects that represent the eventual completion (or failure) of an asynchronous operation.
Promises have three states: pending, fulfilled, and rejected. They allow you to handle asynchronous operations more easily than callbacks.

**Example:**

```js
function fetchData(callback) {
  setTimeout(() => callback("data"), 1000);
}
fetchData((data) => console.log(data));

// Promise
const promise = new Promise((resolve) => {
  setTimeout(() => resolve("resolved"), 1000);
});
promise.then(console.log);
```

**Exercise:**

- Convert a callback-based function to one that uses promises.

```js
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("data"), 1000);
  });
}
fetchData().then((data) => console.log(data));
// 'data'
```

---

## 9. Async/Await

**Explanation:**
`async` and `await` are keywords that simplify working with promises, allowing you to write asynchronous code in a more readable and structured way, as if it were synchronous.

- `async` is used to declare a function that returns a promise.
- `await` is used to wait for a promise to resolve or reject before continuing execution.
- `await` can only be used inside an `async` function.
- helps to avoid callback hell and makes the code cleaner.

**Example:**

```js
async function getData() {
  return "data";
}
getData().then(console.log);
```

**Exercise:**

- Write an async function that waits 1 second and then returns a message.

```js
let myFunction = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Hello");
    }, 1000);
  });
};
```

---

## 10. Array Manipulation

**Explanation:**
JavaScript offers many methods to manipulate arrays, such as `map`, `filter`, `reduce`, `forEach`, `find`, `some`, `every`, `includes`, `sort`, `concat`, `slice`, `splice`, among others. These methods allow you to transform, filter, search, modify, and iterate over data in a functional and efficient way.

### Common array methods and how they work

- **map:** Creates a new array with the results of applying a function to each element.
  ```js
  const arr = [1, 2, 3];
  const doubles = arr.map((x) => x * 2); // [2, 4, 6]
  ```
- **filter:** Creates a new array with elements that pass a condition.
  ```js
  const evens = arr.filter((x) => x % 2 === 0); // [2]
  ```
- **reduce:** Reduces the array to a single value by applying an accumulator function.
  ```js
  const sum = arr.reduce((acc, x) => acc + x, 0); // 6
  ```
- **forEach:** Executes a function for each element (returns nothing).
  ```js
  arr.forEach((x) => console.log(x));
  ```
- **find:** Returns the first element that satisfies a condition.
  ```js
  const greaterThan1 = arr.find((x) => x > 1); // 2
  ```
- **some:** Returns `true` if at least one element satisfies the condition.
  ```js
  const hasGreaterThan2 = arr.some((x) => x > 2); // true
  ```
- **every:** Returns `true` if all elements satisfy the condition.
  ```js
  const allPositive = arr.every((x) => x > 0); // true
  ```
- **includes:** Checks if an element is in the array.
  ```js
  arr.includes(2); // true
  ```
- **sort:** Sorts the elements of the array (modifies the original array).
  ```js
  const unsorted = [3, 1, 2];
  unsorted.sort((a, b) => a - b); // [1, 2, 3]
  ```
- **concat:** Joins two or more arrays and returns a new one.
  ```js
  const arr2 = [4, 5];
  const combined = arr.concat(arr2); // [1, 2, 3, 4, 5]
  ```
- **slice:** Returns a shallow copy of a portion of the array.
  ```js
  const subArr = arr.slice(1, 3); // [2, 3]
  ```
- **splice:** Changes the contents of the array by removing or adding elements.
  ```js
  const arr3 = [1, 2, 3];
  arr3.splice(1, 1, 9); // arr3 is now [1, 9, 3]
  ```

**Exercise:**

- Use `filter` to get the odd numbers from an array.

```js
const arr = [1, 2, 3, 4, 5];
const odds = arr.filter((item) => item % 2 !== 0);
```

---

## 11. Destructuring and Spread/Rest

**Explanation:**
Destructuring allows you to extract values from arrays or objects into individual variables. The spread (`...`) and rest (`...`) operators allow you to expand or group elements, respectively.

**Example:**

```js
const obj = { a: 1, b: 2 };
const { a, b } = obj;
const arr = [1, 2, 3];
const [x, ...rest] = arr;
```

**Exercise:**

- Use spread to combine two arrays.

---

## 12. This and Bind

**Explanation:**
`this` refers to the current execution context. Its value depends on how the function is called. `bind` allows you to set the value of `this` in a function.

**Example:**

```js
const obj = {
  name: "Ana",
  greet() {
    return `Hello, I'm ${this.name}`;
  },
};
const greet = obj.greet;
console.log(greet.bind(obj)());
```

**Exercise:**

- What happens if you call `greet()` without `bind`?
  It prints `undefined` or throws an error in strict mode, because `this` is not defined in the global context.

---

## 13. Creative Exercise

**Explanation:**
These types of exercises test your ability to manipulate arrays and objects, as well as your creativity to solve practical problems.

- Write a function that receives an array of objects and returns a new array with only the names in uppercase.

---

## 14. Event Loop and Concurrency

**Explanation:**
The event loop is the mechanism that allows JavaScript to handle asynchronous operations (such as timers, promises, and events) on a single thread. The event loop manages the call stack, the task queue, and the microtask queue.

**Example:**

```js
console.log("One");
setTimeout(() => console.log("Two"), 0);
Promise.resolve().then(() => console.log("Three"));
console.log("Four");
// Output: One, Four, Three, Two
```

**Exercise:**

- Explain the execution order of the example above.
  1. "One" is printed because it is a synchronous instruction and executes first in the call stack.
  2. "Four" is printed for the same reason, both are synchronous operations.
  3. "Three" is printed next because promises (microtasks) execute before macrotasks like `setTimeout`.
  4. Finally, "Two" is printed because `setTimeout` is a macrotask and executes after microtasks.

---

## 15. Set and Map

**Explanation:**
`Set` is a collection of unique values. `Map` is a collection of key-value pairs where keys can be of any type.

**Example:**

```js
const set = new Set([1, 2, 2, 3]); // Set {1, 2, 3}
set.add(4);
set.has(2); // true

const map = new Map();
map.set("a", 1);
map.set({ b: 2 }, "object");
console.log(map.get("a")); // 1
```

**Exercise:**

- Use a Set to remove duplicates from an array.
- Use a Map to count the frequency of words in an array.

```js
const arr = [1, 2, 3, 3, 3, 4, 4, 7, 5, 5];
const mySet = new Set(arr);
```

---

## 16. Regular Expressions (RegEx)

**Explanation:**
Regular expressions allow you to search and manipulate text patterns. They are used with methods like `test`, `exec`, `match`, `replace`, `search`, and `split`.

**Example:**

```js
const regex = /\d+/g;
const text = "There are 123 numbers and 456 more.";
console.log(text.match(regex)); // ['123', '456']
```

**Exercise:**

- Write a regular expression to validate an email.

---

## 17. Error Handling

**Explanation:**
Error handling in JavaScript is done with `try...catch`. You can throw custom errors with `throw` and catch them to prevent the program from stopping.

**Example:**

```js
try {
  throw new Error("Something went wrong");
} catch (e) {
  console.error(e.message);
}
```

**Exercise:**

- Create a function that throws an error if the argument is not a number.

```js
let myFunction = (numberParam) => {
  try {
    if (typeof numberParam !== "number") {
      throw new Error("Not a number");
    }
    console.log(numberParam);
  } catch (e) {
    console.error("Please enter a number");
  }
};

myFunction("e");
myFunction(3);
```

---

## 18. Immutability and Mutability

**Explanation:**
Immutability means that data is not modified directly, but a modified copy is created. This is important to avoid side effects and hard-to-track bugs.

**Example:**

```js
const arr = [1, 2, 3];
const newArr = [...arr, 4]; // immutable
arr.push(4); // mutable
```

**Exercise:**

- Write a function that adds an element to an array immutably.

---

## 19. Higher-Order Functions

**Explanation:**
A higher-order function is one that receives a function as an argument or returns a function. They are the basis of functional programming in JS.

**Example:**

```js
function greet(name) {
  return `Hello, ${name}`;
}
function processUser(name, fn) {
  return fn(name);
}
console.log(processUser("Ana", greet));
```

**Exercise:**

- Write a function that receives an array and a function, and applies that function to each element (simulate `map`).

---

## 20. Algorithm Performance and Big O

**Explanation:**
Big O notation describes the efficiency of an algorithm in terms of time and space. For example, a linear search is O(n), a binary search is O(log n).

**Example:**

```js
// Linear search
function search(arr, x) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === x) return i;
  }
  return -1;
}
```

**Exercise:**

- What is the time complexity of the `filter` method?

---

## 21. Modules (import/export)

**Explanation:**
Modules allow you to split code into reusable files. You can export variables, functions, or classes and then import them into other files.

**Example:**

```js
// file.js
export function sum(a, b) {
  return a + b;
}
// main.js
import { sum } from "./file.js";
console.log(sum(2, 3));
```

**Exercise:**

- Create a module that exports a function and another that imports and uses it.

---

## 22. Handling Performance in JavaScript

**Explanation:**
Performance optimization in JavaScript involves writing efficient code, minimizing resource usage, and ensuring smooth user experiences, especially in web applications. Good performance practices help reduce lag, improve responsiveness, and lower memory consumption.

### Common Performance Techniques

1. **Minimize Expensive Operations**

   - Avoid unnecessary loops and deep nesting.
   - Cache results of expensive calculations (memoization).
   - Example:

   ```js
   // Inefficient
   for (let i = 0; i < arr.length; i++) {
     if (arr.includes(x)) { ... }
   }
   // Better: cache the result
   const hasX = arr.includes(x);
   for (let i = 0; i < arr.length; i++) {
     if (hasX) { ... }
   }
   ```

2. **Debouncing and Throttling**

   - Use debouncing or throttling for events like scroll, resize, or input to limit how often a function runs.
   - Example (debounce):

   ```js
   function debounce(fn, delay) {
     let timeout;
     return (...args) => {
       clearTimeout(timeout);
       timeout = setTimeout(() => fn(...args), delay);
     };
   }
   window.addEventListener(
     "resize",
     debounce(() => {
       console.log("Resized!");
     }, 200)
   );
   ```

3. **Efficient DOM Manipulation**

   - Minimize direct DOM updates; batch changes or use frameworks like React.
   - Example:

   ```js
   // Inefficient: multiple reflows
   for (let i = 0; i < 100; i++) {
     const div = document.createElement("div");
     document.body.appendChild(div);
   }
   // Better: use a fragment
   const fragment = document.createDocumentFragment();
   for (let i = 0; i < 100; i++) {
     const div = document.createElement("div");
     fragment.appendChild(div);
   }
   document.body.appendChild(fragment);
   ```

4. **Lazy Loading**

   - Load resources (images, modules, data) only when needed.
   - Example:

   ```js
   // Dynamic import
   button.onclick = async () => {
     const module = await import("./heavyModule.js");
     module.run();
   };
   ```

5. **Web Workers**
   - Offload heavy computations to background threads using Web Workers.
   - Example:
   ```js
   // main.js
   const worker = new Worker("worker.js");
   worker.postMessage("start");
   worker.onmessage = (e) => {
     console.log("Result:", e.data);
   };
   // worker.js
   self.onmessage = function (e) {
     // heavy computation
     self.postMessage("done");
   };
   ```

### Exercise:

- Refactor a function that filters a large array on every keystroke to use debouncing for better performance.

---
