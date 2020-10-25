export const addItems = (items) => ({
  type: "ADD_ITEMS",
  items,
});

export const removeItems = (items) => ({
  type: "REMOVE_ITEMS",
  items,
});

export const advanceQueue = () => ({
  type: "ADVANCE_QUEUE",
});

export const reverseQueue = () => ({
  type: "REVERSE_QUEUE",
});
