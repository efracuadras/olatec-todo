import * as types from "./types";

export const setFilters = (payload) => ({
  type: types.SET_FILTERS,
  payload,
});

export const setItems = (payload) => ({
  type: types.SET_ITEMS,
  payload,
});

export const addItem = (payload) => ({
  type: types.ADD_ITEM,
  payload,
});

export const deleteItem = (payload) => ({
  type: types.DELETE_ITEM,
  payload,
});

export const editItem = (payload) => ({
  type: types.EDIT_ITEM,
  payload,
});
