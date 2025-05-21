import { useState } from "react";

// Custom hook for toggling a boolean value
const useToggle = (initialValue: boolean = false): [boolean, () => void] => {
  const [isToggled, setToggle] = useState<boolean>(initialValue);

  const toggle = () => {
    setToggle((prev) => !prev);
  };

  return [isToggled, toggle];
};

export default useToggle;
