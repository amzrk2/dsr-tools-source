function guard(to, from, next) {
  console.log(to, from);
  next();
}

export default [guard];
