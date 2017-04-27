export const times = (num) => {
  let res = [];
  for(let i = 0; i < num; i++) {
    res.push(i);
  }
  return res.reverse();
};

export const randInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

