
// { id: number, title: string }
export const getLatestId = (arr) => {
  const ids = arr.map(item => item.id);
  return Math.max(...ids);
}

export const isTagUnique = ({ originalArr, newTag }) => {
  return !!originalArr.find(tag => tag.title === newTag.trim()) !== true;
}

export const removeTag = ({ originalArr, tag }) => {
  return originalArr.filter(item => item.title !== tag);
}