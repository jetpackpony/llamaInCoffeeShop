import { curry } from 'ramda';

export const times = (num) => {
  let res = [];
  for(let i = 0; i < num; i++) {
    res.push(i);
  }
  return res.reverse();
};

export const randInRange = (min, max) => {
  return Math.round(Math.random() * (max - min)) + min;
};

export const clipValue = curry((min, max, val) => (
  Math.min(max, Math.max(min, val))
));
