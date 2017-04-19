export const times = (num) => {
  let res = [];
  for(let i = 0; i < num; i++) {
    res.push(i);
  }
  return res.reverse();
};
