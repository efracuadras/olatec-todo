import React from "react";
import axios from "axios";
import { Card, Container, Form, Dropdown } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/actions";

const options = [
  {
    text: "Todas",
    value: 0,
    label: { color: "blue", empty: true, circular: true },
  },
  {
    text: "Pendientes",
    value: 1,
    label: { color: "teal", empty: true, circular: true },
  },
  {
    text: "Terminadas",
    value: 2,
    label: { empty: true, circular: true },
  },
];

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const selected = options.find((option) => option.value === props.value);

  return (
    <Dropdown
      text={selected.text}
      icon="filter"
      floating
      labeled
      button
      className="icon"
    >
      <Dropdown.Menu>
        <Dropdown.Menu scrolling>
          {options.map((option, i) => (
            <Dropdown.Item
              key={i}
              {...option}
              onClick={() => props.onChange && props.onChange(option.value)}
            />
          ))}
        </Dropdown.Menu>
      </Dropdown.Menu>
    </Dropdown>
  );
};
