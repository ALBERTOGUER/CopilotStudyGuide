import { useState } from "react";

const UserForm = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
  });
  const [toggle, setToggle] = useState(false);

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!state.name || !state.email) {
      alert("Please fill out all fields.");
      return;
    }
    setToggle(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="name"
          onChange={(e) => handleInputs(e)}
          value={state.name}
        ></input>
        <input
          name="email"
          placeholder="email"
          onChange={(e) => handleInputs(e)}
          value={state.email}
        ></input>
        <button>sUBMIT</button>
      </form>
      {toggle && <p>{[state.name, state.email]}</p>}
    </>
  );
};

export default UserForm;
