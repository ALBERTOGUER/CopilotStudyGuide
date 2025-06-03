import { useState, createContext, useContext } from "react";
import Greeting from "./Components/Greeting.tsx";
import Counter from "./Components/Counter.tsx";
import UserForm from "./Components/UserForm.tsx";
import PostList from "./Components/PostList.tsx";
import useToggle from "./Components/UseToggle.tsx";
import Tasks from "./Components/Tasks.tsx";
import "./App.css";

// Exercise 1: Create a new component called "Greeting" that accepts a "name" prop and displays a greeting message.
// Example: <Greeting name="John" /> should render "Hello, John!"

// Exercise 2: Implement a counter component that increments and decrements a value. Use React hooks.
// Example: <Counter /> should have buttons to increase and decrease the count.

// Exercise 3: Fetch data from an API and display it in a list. Use the JSONPlaceholder API (https://jsonplaceholder.typicode.com/posts).
// Example: <PostList /> should fetch and display a list of posts.

// Exercise 4: Create a form with controlled components to capture user input (e.g., name and email).
// Example: <UserForm /> should have input fields for name and email and display the entered values on submit.

// Exercise 5: Implement a custom hook called "useToggle" that toggles a boolean value.
// Example: const [isToggled, toggle] = useToggle(false);

// Exercise 6: Create a component that uses the Context API to manage a theme (light/dark).
// Example: <ThemeProvider> should provide a theme context, and a child component should consume it to display the current theme.

function App() {
  const [count, setCount] = useState(0);
  const [isToggled, setToggle] = useToggle();

  return (
    <>
      {/* Exercises for practice */}
      {/* Add your components here as you solve the exercises */}
      <Greeting name="John" />
      <Counter />
      <UserForm />
      <Tasks />
      <button onClick={setToggle}>
        {isToggled ? "Switch to Light Theme" : "Switch to Dark Theme"}
      </button>
      <PostList />
    </>
  );
}

export default App;
