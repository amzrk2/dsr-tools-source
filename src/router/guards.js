/**
 * @param {Object} to
 * @param {Object} from
 * @param {Function} next
 */
function guard(to, from, next) {
  next();
}

export default [guard];
