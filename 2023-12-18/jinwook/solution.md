# 2.40

```js
function is_prime(n) {
  function iter(k) {
    if (k * k > n) return true;
    if (n % k === 0) return false;
    return iter(k + 1);
  }

  return iter(2);
}

function is_prime_sum(pair) {
  return is_prime(head(pair) + head(tail(pair)));
}

function make_pair_sum(pair) {
  return list(head(pair), head(tail(pair)), head(pair) + head(tail(pair)));
}

function unique_pairs(i, j) {
  return filter(
    (pair) => head(pair) !== head(tail(pair)),
    flatmap(
      (j_num) => map((i_num) => list(i_num, j_num), enumerate_interval(1, i)),
      enumerate_interval(1, j)
    )
  );
}

function prime_sum_pairs(n) {
  return map(make_pair_sum, filter(is_prime_sum, unique_pairs(n, n)));
}
```

# 2.41

```js
function unique_triple_pairs(n) {
  return flatmap(
    (unique_pair) =>
      map(
        (k) => pair(k, unique_pair),
        enumerate_interval(1, head(tail(unique_pair)) - 1)
      ),
    unique_pairs(n)
  );
}

function sol(n) {
  return filter(
    (list) => accumulate((x, y) => x + y, 0, list) === n,
    unique_triple_pairs(n)
  );
}
```

# 2.42

# 2.43

# 2.44

```js
function up_split(painter, n) {
  if (n === 0) {
    return painter;
  } else {
    const smaller = up_split(painter, n);
    return below(painter, beside(smaller, smaller));
  }
}
```

# 2.45

```js
function split(o1, o2) {
  return (painter, n) => {
    if (n === 0) {
      return painter;
    } else {
      const smaller = split(o1, o2)(painter, n - 1);
      return o1(painter, o2(smaller, smaller));
    }
  };
}
```
