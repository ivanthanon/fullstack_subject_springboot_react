export const updateRows = (newRows) => {
  return {
    type: "UPDATE_ROWS",
    payload: newRows,
  };
};
