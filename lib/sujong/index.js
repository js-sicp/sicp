function sum(a, b) {
    return a + b;
}

function add(a, b) {
    return a + b;
}

function plus(a, b) {
    return a + b;
}

function divide(a, b) {
    return a / b;
}

function divides(a, b) {
    return b % a === 0;
}

function square(n) {
    return n * n;
}

function is_even(n) {
    return n % 2 === 0;
}

function is_odd(n) {
    return !is_even(n);
}

function abs(num) {
    return num >= 0 ? num : -num;
}

// pair
function pair(a, b) {
    function dispatch(m) {
        return m === 0 ? a : m === 1 ? b : console.error("invalid value for pair");
    }
    return dispatch;
}

function head(p) {
    return p(0);
}

function tail(p) {
    return p(1);
}

function is_null(item) {
    return item === null;
}

function is_pair(item) {
    return (
        typeof item === "function" && item(0) !== undefined && item(1) !== undefined
    );
}

// list
function list(...args) {
    function list_iter(args, idx) {
        return idx >= args.length
            ? null
            : pair(args[idx], list_iter(args, idx + 1));
    }
    return list_iter(args, 0);
}

function stringify(tree) {
    return is_null(tree)
        ? "null"
        : is_pair(tree)
            ? "[" + stringify(head(tree)) + ", " + stringify(tail(tree)) + "]"
            : tree;
}

function print(tree) {
    console.log(stringify(tree));
}

function list_ref(items, n) {
    return n === 0 ? head(items) : list_ref(tail(items), n - 1);
}

function length(items) {
    return is_null(items) ? 0 : 1 + length(length(tail(items)));
}

function append(list1, list2) {
    return is_null(list1) ? list2 : pair(head(list1), append(tail(list1), list2));
}

function map(fun, items) {
    return is_null(items) ? null : pair(fun(head(items)), map(fun, tail(items)));
}

function for_each(func, items) {
    if (is_null(items)) {
        return undefined;
    } else {
        func(head(items));
        for_each(func, tail(items));
    }
}
