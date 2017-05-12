import sum from './modules/sum';

const numbers = {
  a: 1,
  b: 2,
};

console.log(`${numbers.a} + ${numbers.b} = ${sum(numbers.a, numbers.b)}`);
