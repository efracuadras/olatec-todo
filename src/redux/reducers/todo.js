import * as types from "../actions/types";

let initState = {
  filters: {
    status: 0,
    search: "",
  },
  items: [
    { text: "ITEM EJEMPLO", status: 1 },
    { text: "ITEM EJEMPLO", status: 1 },
    { text: "ITEM EJEMPLO", status: 1 },
  ],
};

const todo = (state = initState, action) => {
  switch (action.type) {
    case types.SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case types.SET_ITEMS:
      return { ...state, items: action.payload };
    case types.ADD_ITEM:
      return { ...state, items: [...state.items, action.payload] };
    case types.EDIT_ITEM:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload.id) return action.payload;

          return item;
        }),
      };
    case types.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default todo;
