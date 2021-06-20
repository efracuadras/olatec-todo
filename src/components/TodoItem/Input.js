import React from "react";
import { Icon, Input } from "semantic-ui-react";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const [text, setText] = React.useState(props.value);

  return (
    <React.Fragment>
      <Input
        style={{ flex: 1 }}
        action={{
          color: "teal",
          content: "Guardar",
          disabled: !text.length,
          onClick() {
            props.onConfirm && props.onConfirm(text);
          },
        }}
        {...props}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Icon
        style={{ marginLeft: 15 }}
        onClick={() => props.onCancel && props.onCancel()}
        name="cancel"
      />
    </React.Fragment>
  );
};
