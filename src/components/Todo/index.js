import { Header } from "semantic-ui-react";
import React from "react";
import axios from "axios";
import { Card, Container, Form } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { setItems } from "../../redux/actions";

import TodoList from "../TodoList";
import TodoForm from "../TodoForm";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const dispatch = useDispatch();

  const fetch = async () => {
    try {
      const res = await axios
        .get("http://localhost:8181/items")
        .then((res) => res.data);

      dispatch(setItems(res));
    } catch (error) {}
  };

  React.useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <Header as="h2" content="Todo List Project" textAlign="center" />
      <TodoForm />
      <TodoList />
    </div>
  );
};
