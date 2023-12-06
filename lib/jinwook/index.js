function pair(a, b) {
  return [a, b];
}

function head(pair) {
  return pair[0];
}

function tail(pair) {
  return pair[1];
}

function list(...args) {
  return args.length === 0 ? null : pair(args[0], list(...args.slice(1)));
}

function is_null(list) {
  return list === null;
}

function append(list1, list2) {
  return is_null(list1) ? list2 : pair(head(list1), append(tail(list1), list2));
}

function map(f, items) {
  return is_null(items)
    ? null
    : append(list(f(head(items))), map(f, tail(items)));
}

function is_pair(tree) {
  return (
    typeof tree === "object" && tree[0] !== undefined && tree[1] !== undefined
  );
}

function reverse(items) {
  return is_null(items)
    ? null
    : append(reverse(tail(items)), list(head(items)));
}

function deep_reverse(items) {
  return is_null(items)
    ? null
    : !is_pair(items)
    ? items
    : append(deep_reverse(tail(items)), pair(deep_reverse(head(items)), null));
}

function display(tree) {
  function stringify(tree) {
    return is_null(tree)
      ? "null"
      : is_pair(tree)
      ? `(${stringify(head(tree))}, ${stringify(tail(tree))})`
      : `${tree}`;
  }
  console.log(stringify(tree));
}

function tree_map(f, items) {
  return is_null(items)
    ? null
    : !is_pair(items)
    ? f(items)
    : pair(tree_map(f, head(items)), tree_map(f, tail(items)));
}

function filter(predicate, sequence) {
  return is_null(sequence)
    ? null
    : predicate(head(sequence))
    ? pair(head(sequence), filter(predicate, tail(sequence)))
    : filter(predicate, tail(sequence));
}

function accumulate(op, initial, sequence) {
  return is_null(sequence)
    ? initial
    : op(head(sequence), accumulate(op, initial, tail(sequence)));
}

function enumerate_interval(low, high) {
  return low > high ? null : pair(low, enumerate_interval(low + 1, high));
}

function enumerate_tree(tree) {
  return is_null(tree)
    ? null
    : !is_pair(tree)
    ? list(tree)
    : append(enumerate_tree(head(tree)), enumerate_tree(tail(tree)));
}

module.exports = {
  pair,
  head,
  tail,
  list,
  is_null,
  append,
  map,
  is_pair,
  reverse,
  deep_reverse,
  display,
  tree_map,
  filter,
  accumulate,
  enumerate_tree,
  enumerate_interval,
};
