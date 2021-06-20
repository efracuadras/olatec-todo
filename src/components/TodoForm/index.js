import React from "react";
import axios from "axios";
import { Card, Container, Form } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, setFilters } from "../../redux/actions";
import Dropdown from "./Dropdown";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.todo.filters);
  const [text, setText] = React.useState("");

  const handleSubmit = async () => {
    if (!text.length) return;

    try {
      const res = await axios
        .post("http://localhost:8181/items", { text })
        .then((res) => res.data);

      dispatch(addItem(res));
      setText("");
    } catch (error) {}
  };

  const handleChange = (value) => {
    dispatch(setFilters({ status: value }));
  };

  return (
    <Container style={{ marginBottom: "20px" }}>
      <Card fluid>
        <Card.Content>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                value={text}
                placeholder="Item"
                onChange={(e) => setText(e.target.value)}
              />
            </Form.Group>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Form.Button color="teal" onClick={handleSubmit}>
                Guardar
              </Form.Button>

              <Dropdown value={filters.status} onChange={handleChange} />
            </div>
          </Form>
        </Card.Content>
      </Card>
    </Container>
  );
};
