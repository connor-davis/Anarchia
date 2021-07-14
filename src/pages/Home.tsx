import { getUserInfo, setUser } from "../state/slices/user.slice";
import { useDispatch, useSelector } from "react-redux";

import React from "react";

const Home: React.FC = () => {
  let dispatch = useDispatch();

  let user = useSelector(getUserInfo);

  return (
    <div className="flex w-screen h-screen bg-black dark:bg-black text-gray-600 dark:text-white">
      {JSON.stringify(user)}
      <button
        onClick={() => {
          dispatch(setUser({ username: "woopwoop" }));
        }}
      >
        click me
      </button>
    </div>
  );
};

export default Home;
