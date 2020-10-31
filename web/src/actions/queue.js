export const addItems = (items, target = null) => ({
  type: "ADD_ITEMS",
  items,
  target,
});

export const removeItems = (targets = []) => ({
  type: "REMOVE_ITEMS",
  targets,
});

export const advanceQueue = () => ({
  type: "ADVANCE_QUEUE",
});

export const reverseQueue = () => ({
  type: "REVERSE_QUEUE",
});
