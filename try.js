var p = {
  f: "f",
  l: "l",
  fl: function () {
    return this.f + this.l;
  },
};
let n = function () {
  //   console.log(p.fl());
  return this.fl();
};
console.log(
  p.fl(),
  n.bind({
    fl: function () {
      return "nnnn";
    },
  })()
);
