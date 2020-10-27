function iqTest(n, p) {
  const sum = [...(n + "")].map(Number).reduce((ac, num) => {
    return ac + num ** p++;
  }, 0);

  return Number.isInteger(sum / n) ? sum / n : -1;
}

console.log(iqTest(46288, 3));
