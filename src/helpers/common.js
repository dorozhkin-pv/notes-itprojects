export const calculateGuid = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const makeNote = () => ({
  id: calculateGuid(),
  title: "new Note",
  todos: []
});

export const ToDo = (value) => ({
  id: calculateGuid(),
  title: value,
  completed: false
});
