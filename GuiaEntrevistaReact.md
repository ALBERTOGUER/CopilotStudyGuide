# React Interview Guide

This guide covers common React interview topics, with explanations, code examples, and practical exercises. It is organized by theme and includes both fundamental and advanced concepts.

---

## 1. React Classes (Class Components)

**Explanation:**
Before React Hooks, class components were the primary way to manage state and lifecycle in React. They use ES6 classes and have access to lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.

**Example:**

```jsx
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
    this.interval = null;
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((prev) => ({ seconds: prev.seconds + 1 }));
    }, 1000);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.seconds !== this.state.seconds) {
      console.log(`Timer updated: ${this.state.seconds} seconds`);
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
    console.log("Timer unmounted");
  }
  render() {
    return <div>Seconds: {this.state.seconds}</div>;
  }
}
```

**Exercise:**

- Convert the above class component to a functional component using hooks.

```jsx
const Counter = () => {
  const [count, setCount] = useState(0);
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };
  return <button onClick={() => increment()}>Count: {count}</button>;
};
```

---

## 2. React After Classes (Functional Components)

**Explanation:**
With the introduction of Hooks in React 16.8, functional components can now manage state and side effects, making them the standard for new React code.

**Example:**

```jsx
function Counter() {
  const [count, setCount] = React.useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

---

## 3. React Hooks

**Explanation:**
Hooks are functions that let you use state and other React features in functional components. Common hooks include `useState`, `useEffect`, `useContext`, `useReducer`, and `useRef`.

**Example:**

```jsx
// useEffect example
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

---

## 4. Advanced Hooks

- **useCallback:** Memoizes a callback function.
- **useMemo:** Memoizes a computed value.
- **useLayoutEffect:** Like `useEffect`, but fires synchronously after all DOM mutations.
- **useImperativeHandle:** Customizes the instance value that is exposed to parent components when using `ref`.
- **Custom Hooks:** Reusable logic extracted into a function starting with `use`.

**Example:**

````jsx
const useToggle = (initial = false) => {
  const [value, setValue] = React.useState(initial);
  const toggle = React.useCallback(() => setValue((v) => !v), []);
  // useMemo example
  const memoizedValue = React.useMemo(() => {
    return value ? "On" : "Off";
  }, [value]);
  return [memoizedValue, toggle];
};

---

## 5. React Internals: Virtual DOM, Reconciliation, Fiber, Diffing

### Virtual DOM

**Explanation:**
The Virtual DOM is a lightweight, in-memory representation of the real DOM. It is usually a JavaScript object (similar to a JSON tree) that describes what the UI should look like. React uses the Virtual DOM to efficiently update the real DOM by first making changes in the virtual representation and then syncing only the necessary changes to the browser DOM.

**Example of a Virtual DOM node:**

```js
const vdom = {
  type: "div",
  props: { className: "container" },
  children: [
    { type: "h1", props: {}, children: ["Hello"] },
    { type: "button", props: { onClick: () => {} }, children: ["Click"] },
  ],
};
````

---

### Reconciliation

**Explanation:**
Reconciliation is the process React uses to update the DOM when a component’s state or props change. When you update state, React creates a new Virtual DOM tree. It then compares (diffs) the new Virtual DOM with the previous one (current vs. new), node by node, to determine the minimal set of changes needed. This process is similar to comparing two JSON objects representing the UI before and after the update.

- If a node type changes (e.g., from `div` to `span`), React destroys the old subtree and builds a new one.
- If the type is the same, React compares props and children recursively.
- Keys in lists help React match elements between renders.

**Visualization:**

- Think of the Virtual DOM as a tree of JSON objects. Reconciliation is the process of comparing two such trees and finding the differences (diffing).

---

### Diffing Algorithm

**Explanation:**
React’s diffing algorithm is a heuristic O(n) algorithm that efficiently compares the old and new Virtual DOM trees. It assumes elements of different types produce different trees and uses keys to optimize list updates. The algorithm finds the minimum number of operations to update the real DOM.

---

### Fiber

**Explanation:**
Fiber is React’s reimplementation of its core algorithm (since React 16) for rendering and reconciliation. Fiber enables React to split rendering work into small units (fibers) and pause, resume, or abandon work as needed. This makes rendering interruptible and allows React to prioritize updates for a more responsive UI.

- **Fiber as a linked list:**
  - Each fiber node is like a linked list node, pointing to its child, sibling, and parent. This allows React to traverse and manage the component tree efficiently, pausing and resuming work as needed.
  - In contrast, the old stack-based approach processed the entire tree recursively and synchronously, making it hard to interrupt.

**Visualization:**

- Imagine the component tree as a linked list of fiber nodes, where React can walk the tree, pause, and pick up where it left off, enabling features like concurrent rendering.

---

## 6. React DOM

**Explanation:**
React DOM is the package that provides DOM-specific methods for React, such as rendering components to the DOM and managing events.

**Example:**

```jsx
import ReactDOM from "react-dom";
ReactDOM.render(<App />, document.getElementById("root"));
```

---

## 7. React and Redux

**Explanation:**
Redux is a state management library often used with React. It uses a single store, actions, and reducers to manage state predictably.

**Example:**

```js
// Action
const increment = () => ({ type: "INCREMENT" });
// Reducer
function counter(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    default:
      return state;
  }
}
```

---

## 8. Thunks in Redux (Async Actions)

**Explanation:**
A thunk is a function that wraps an expression to delay its evaluation. In Redux, thunks are used for async logic (e.g., API calls).

**Example:**

```js
// Thunk action
const fetchData = () => async (dispatch) => {
  dispatch({ type: "FETCH_START" });
  const data = await fetch("/api/data").then((res) => res.json());
  dispatch({ type: "FETCH_SUCCESS", payload: data });
};

// how athunk is used in a Redux store
// reducer form send to createStore
import { createStore } from "redux";
const reducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    default:
      return state;
  }
};

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
const store = createStore(reducer, applyMiddleware(thunk)));

```

---

## 9. React Forms

**Explanation:**
Forms in React can be controlled (state managed by React) or uncontrolled (using refs). Controlled forms are more common for validation and dynamic updates.

**Example:**

```jsx
function MyForm() {
  const [value, setValue] = React.useState("");
  return (
    <form>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
    </form>
  );
}
```

---

## 10. Scalability and Performance in React

- Use React.memo and useMemo to avoid unnecessary renders.
- Split code with React.lazy and Suspense.
- Use keys in lists for efficient diffing.
- Avoid inline functions/objects in render when possible.
- Profile with React DevTools.

---

## 11. Lazy Loading in React

**Explanation:**
Lazy loading allows you to load components or data only when needed, improving initial load time.

**Example:**

```jsx
const LazyComponent = React.lazy(() => import("./LazyComponent"));
function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </React.Suspense>
  );
}
```

---

## 12. Batching and State Updates (React 18/19)

**Batching:**
React batches multiple state updates into a single render for performance. In React 18+, automatic batching is enabled for more scenarios (including timeouts, promises, and native event handlers).

**Example:**

```js
setCount((c) => c + 1);
setValue((v) => v + 1);
// Both updates are batched into a single render in React 18+
```

**React 19:**
React 19 further improves batching and async state updates, making UI updates more predictable and efficient.

**Async State Updates:**
State updates in React are asynchronous. You should not rely on the value of state immediately after calling a setter.

**Example:**

```js
setCount(count + 1);
console.log(count); // May log the old value
```

---

## 13. Other Important Topics

- Error boundaries
- Context API
- Server-side rendering (SSR)
- React Suspense for data fetching
- Concurrent rendering
- React Profiler
- Testing React components (Jest, React Testing Library)

---

## 14. React Component Patterns

### 1. Compound Components

Compound components are a pattern where multiple components work together to share implicit state. Useful for building flexible, declarative APIs (e.g., Tabs, Accordions).

**Example:**

```jsx
function Tabs({ children }) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  return React.Children.map(children, (child, i) =>
    React.cloneElement(child, {
      isActive: i === activeIndex,
      onClick: () => setActiveIndex(i),
    })
  );
}
function Tab({ isActive, onClick, children }) {
  return (
    <button
      style={{ fontWeight: isActive ? "bold" : "normal" }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
// Usage: <Tabs><Tab>One</Tab><Tab>Two</Tab></Tabs>
```

### 2. Children as a Function (Render Props)

This pattern allows you to pass a function as a child to a component, giving you control over rendering based on internal state.

**Example:**

```jsx
function MouseTracker({ children }) {
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  return (
    <div onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}>
      {children(pos)}
    </div>
  );
}
// Usage: <MouseTracker>{pos => <p>{pos.x}, {pos.y}</p>}</MouseTracker>
```

### 3. Render Props vs. Children

- **Render prop** is a prop whose value is a function that returns a React element. Often called `render` or `children`.
- **children** can be a function (render prop) or React nodes. The difference is mostly in naming and intent.

### 4. Higher-Order Components (HOC)

A higher-order component is a function that takes a component and returns a new component with enhanced behavior.

**Example:**

```jsx
function withLogger(WrappedComponent) {
  return function (props) {
    React.useEffect(() => {
      console.log("Mounted");
      return () => console.log("Unmounted");
    }, []);
    return <WrappedComponent {...props} />;
  };
}
// Usage: const Enhanced = withLogger(MyComponent);
```

### 5. Controlled vs. Uncontrolled Components

- **Controlled:** State is managed by React (via props/state).
- **Uncontrolled:** State is managed by the DOM (via refs).

### 6. Context Pattern

Use React Context to share state or functions deeply in the component tree without prop drilling.

**Example:**

```jsx
const ThemeContext = React.createContext("light");
function ThemedButton() {
  const theme = React.useContext(ThemeContext);
  return <button className={theme}>Button</button>;
}
```

### 7. Provider Pattern

Expose state and actions via a Context Provider at the top of the tree.

**Example:**

```jsx
const AuthContext = React.createContext();|
function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const login = (u) => setUser(u);
  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### 8. Custom Hooks Pattern

Encapsulate reusable logic in a custom hook.

**Example:**

```jsx
function useLocalStorage(key, initial) {
  const [value, setValue] = React.useState(() => {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initial;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}
```

---

## 15. useCallback and useMemo

### useCallback

**Explanation:**
`useCallback` is a React Hook that returns a memoized version of a callback function. It helps prevent unnecessary re-creations of functions on every render, which is useful when passing callbacks to optimized child components (e.g., components wrapped in `React.memo`).

**Example:**

```jsx
const [count, setCount] = React.useState(0);
const increment = React.useCallback(() => {
  setCount((c) => c + 1);
}, []); // The function is only created once

return <button onClick={increment}>Increment</button>;
```

**When to use:**

- When you pass a function as a prop to a child component that relies on referential equality (e.g., `React.memo`).
- When you want to avoid unnecessary re-renders caused by new function references.

---

### useMemo

**Explanation:**
`useMemo` is a React Hook that returns a memoized value. It only recomputes the value when one of its dependencies changes. This is useful for expensive calculations or for ensuring referential equality of objects/arrays between renders.

**Example:**

```jsx
const [count, setCount] = React.useState(0);
const expensiveValue = React.useMemo(() => {
  // Simulate expensive calculation
  let total = 0;
  for (let i = 0; i < 1000000; i++) {
    total += i;
  }
  return total + count;
}, [count]);

return <div>Expensive value: {expensiveValue}</div>;
```

**When to use:**

- When you have a computationally expensive calculation that you don't want to run on every render.
- When you want to memoize objects or arrays to prevent unnecessary re-renders in child components that depend on referential equality.

---

## 16. Additional React Concepts

### Error Boundaries

**Explanation:**
Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the whole app. They catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.

**Example:**

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    // Log error
    console.error(error, info);
  }
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
// Usage: <ErrorBoundary><MyComponent /></ErrorBoundary>
```

**When to use:**

- To prevent the entire app from crashing due to errors in a part of the UI.
- To show user-friendly error messages.

### Error Boundaries (Functional Component Example)

**Explanation:**
Error boundaries can also be implemented as functional components using the `useEffect` and `useState` hooks in combination with the `ErrorBoundary` API from libraries like `react-error-boundary`, or by using the new `use` error boundary pattern in React 18+ (experimental). Here is a simple custom implementation for demonstration:

**Example:**

```jsx
import React, { useState } from "react";

function ErrorBoundary({ children, fallback }) {
  const [error, setError] = useState(null);

  if (error) {
    return fallback || <h1>Something went wrong.</h1>;
  }

  return (
    <React.Suspense fallback={fallback || <h1>Loading...</h1>}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { onError: setError })
      )}
    </React.Suspense>
  );
}

// Usage:
// <ErrorBoundary fallback={<div>Custom error UI</div>}> <MyComponent /> </ErrorBoundary>
```

_Note: For production, prefer using the [react-error-boundary](https://github.com/bvaughn/react-error-boundary) package for robust error handling in functional components._

---

### Context API and Provider (Full Example)

**Explanation:**
A typical Context implementation involves creating a context, a provider component, and consuming the context in child components. Here is a complete example with separate files:

**theme-context.js**

```jsx
import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
```

**App.js**

```jsx
import React from "react";
import { ThemeProvider, useTheme } from "./theme-context";

function ThemedButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className={theme} onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemedButton />
    </ThemeProvider>
  );
}
```

**Summary:**

- Create a context and provider in a separate file.
- Use a custom hook (`useTheme`) for easy access to context values.
- Wrap your app with the provider and consume the context in any child component.

---

### Concurrent Rendering

**Explanation:**
Concurrent rendering is a set of features in React (since v18) that allows React to work on multiple tasks at once, making the UI more responsive. With concurrent rendering, React can interrupt, pause, or abandon work on one update to handle a more urgent update, such as user input. This enables smoother user experiences, especially in complex or data-heavy applications.

**Relation to Batching:**
Batching is the process of grouping multiple state updates into a single render for performance.

**How Batching Worked Before Concurrent Rendering:**
Before React 18 and concurrent rendering, React only batched state updates that occurred inside React event handlers (like onClick, onChange). Updates triggered by timeouts, promises, or native event handlers were not batched and would cause separate renders for each update. This could lead to less efficient rendering and more UI flicker.

**With Concurrent Rendering:**
React now automatically batches updates across more scenarios, including timeouts, promises, and native event handlers. This means fewer renders and a more efficient, responsive UI.

**Example:**

```js
import { startTransition } from "react";

function handleInputChange(newValue) {
  // Mark this update as non-urgent
  startTransition(() => {
    setInputValue(newValue);
  });
}
```

---

## Practice Questions

1. **What is the difference between a controlled and uncontrolled component?**

   - Controlled components have their state managed by React (using state and props). Uncontrolled components store their own state internally, typically accessed via refs. Controlled components are preferred for validation and dynamic updates.

2. **How does React's reconciliation algorithm work?**

   - React's reconciliation algorithm compares the new virtual DOM tree with the previous one and updates only the parts of the real DOM that have changed. It uses a heuristic O(n) diffing algorithm, assuming elements of different types produce different trees.

3. **What is the purpose of keys in React lists?**

   - Keys help React identify which items have changed, been added, or removed. They improve performance and help React efficiently update and reorder list items.

4. **How do you optimize performance in a large React application?**

   - Use React.memo, useMemo, and useCallback to avoid unnecessary renders. Split code with React.lazy and Suspense. Use keys in lists, avoid inline functions/objects in render, and profile with React DevTools. Consider virtualization for large lists.

5. **Explain the difference between useEffect and useLayoutEffect.**

   - useEffect runs asynchronously after the DOM has been painted. useLayoutEffect runs synchronously after all DOM mutations but before the browser paints, making it suitable for reading layout and synchronously re-rendering.

6. **How does Redux middleware like thunk work?**

   - Redux Thunk allows you to write action creators that return a function instead of an action. This function can perform async operations and dispatch actions when async work is done, enabling side effects in Redux.

7. **What is batching and how has it changed in React 18/19?**

   - Batching is the process of grouping multiple state updates into a single render for performance. In React 18+, automatic batching is enabled for more scenarios (including timeouts, promises, and native event handlers), making UI updates more efficient.

8. **How does React handle async state updates?**

   - State updates in React are asynchronous and may be batched. You should not rely on the value of state immediately after calling a setter; instead, use the updater function or effects to respond to changes.

9. **What is React Fiber and why was it introduced?**

   - React Fiber is a reimplementation of React's core algorithm (since React 16) that enables incremental rendering, prioritization, and interruption of rendering work. It improves responsiveness and enables features like concurrent rendering.

10. **How do you implement code splitting in React?**

    - Use React.lazy to dynamically import components and React.Suspense to show a fallback while loading. This reduces the initial bundle size and improves load performance.

11. **What is concurrent rendering in React and how does it relate to batching?**
    - Concurrent rendering is a set of features in React (since v18) that allows React to work on multiple tasks at once, making the UI more responsive. Batching is the process of grouping multiple state updates into a single render for performance. Concurrent rendering enhances batching by allowing React to batch updates across more scenarios and to prioritize urgent updates.
