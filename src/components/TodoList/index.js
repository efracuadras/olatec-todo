import { Container, Segment } from "semantic-ui-react";
import { useSelector } from "react-redux";

import Item from "../TodoItem";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const items = useSelector((state) => state.todo.items);
  const filters = useSelector((state) => state.todo.filters);

  const data = items
    .filter((item) =>
      !!filters.status ? item.status === filters.status : true
    )
    .filter((item) =>
      filters.search ? item.text.includes(filters.search) : true
    );

  return (
    <Container>
      <Segment.Group>
        {data.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Segment.Group>
    </Container>
  );
};
