import axios from "axios";
import React from "react";
import { Segment, Icon, Checkbox, Confirm } from "semantic-ui-react";
import style from "./style";
import { useDispatch } from "react-redux";
import { deleteItem, editItem } from "../../redux/actions";
import Input from "./Input";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ item }) => {
  const [text, setText] = React.useState(item.text);
  const [editing, setEditing] = React.useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleConfirm = async () => {
    try {
      await axios.delete(`http://localhost:8181/items/${item.id}`);
      dispatch(deleteItem(item.id));
    } catch (error) {}
  };

  const handleUpdate = async (params) => {
    try {
      await axios.patch(`http://localhost:8181/items/${item.id}`, params);
      dispatch(editItem({ ...item, ...params }));
      setEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Segment style={style.item}>
      {editing && (
        <Input
          value={item.text}
          onConfirm={(text) => handleUpdate({ text })}
          onCancel={() => setEditing(false)}
        />
      )}
      {!editing && (
        <React.Fragment>
          <Checkbox
            checked={item.status === 2}
            onClick={() => handleUpdate({ status: item.status === 1 ? 2 : 1 })}
          />
          <p
            style={{
              ...style.text,
              textDecoration: item.status === 2 ? "line-through" : null,
            }}
          >
            {item.text}
          </p>
          <div style={style.actions}>
            <Icon onClick={() => setEditing(true)} name="pencil alternate" />
            <Icon onClick={() => setOpen(true)} name="trash alternate" />
          </div>
        </React.Fragment>
      )}

      <Confirm
        size="tiny"
        content={`Seguro de querer eliminar el item "${item.text}"?`}
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={handleConfirm}
      />
    </Segment>
  );
};
