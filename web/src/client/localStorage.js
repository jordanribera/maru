export const read = (item) => {
  try {
    const serializedData = localStorage.getItem(item);
    if (serializedData === null) return undefined;
    return JSON.parse(serializedData);
  } catch (e) {
    return undefined;
  }
};

export const write = (item, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(item, serializedData);
  } catch (e) {
    /* ignore */
  }
};
