export const addItems = (items, target = null) => ({
  type: "ADD_ITEMS",
  items,
  target,
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
