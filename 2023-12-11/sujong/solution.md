### 2.32

다음 명제들을 통해 부분집합들의 집합을 생성하는 알고리즘을 생각해낼 수 있다.

- 공집합의 부분집합은 공집합밖에 없다.
- 집합의 특정 원소를 원소로 갖는 부분집합은 해당 원소를 제외한 부분집합들에 그 원소를 추가함으로써 생성할 수 있다.

알고리즘은 다음과 같다.
- 공집합을 부분집합의 집합에 추가한다.
- 집합의 원소를 순회하며
    - 각 원소를 제외한 나머지 원소들로 구성된 집합의 부분집합들의 집합 $\cup$  그 부분집합을 순회하며 각 원소를 추가한 부분집합들의 집합
      을 모두 합친다.

```js
function subsets(s) {
	if (is_null(s)) {
		return list(null);
	} else {
		const rest = subsets(tail(s));
		return append(rest, map(subset => pair(head(s), subset) , rest));
	}
}
```


### 2.33

```js
function map(f, sequence) {
	return accumulate((x, y) => pair(f(x), y), null, sequence);
}

function append(seq1, seq2) {
	return accumulate(pair, seq2, seq1);
}

function add_one(n) {
	return n + 1;
}

function length(sequence) {
	return accumulate((_, len) => len + 1, 0, sequence);
}
```


### 2.34

```js
function horner_eval(x, coefficient_sequence) {
	return accumulate((this_coeff, higher_terms) => this_coeff  + higher_terms * x,
	0,
	coefficient_sequence)
}

horner_eval(2, list(1, 3, 0, 5, 0, 1)); // 79
```


### 2.35

```js
function count_leaves(t) {
	return accumulate(add, 0, map((n) => 1, enumerate_tree(t)));
}
```


### 2.36

```js
function accumulate_n(op, init, seqs) {
	return is_null(head(seqs))
		? null
		: pair(accumulate(op, init, map((seq) => head(seq), seqs)), accumulate_n(op, init, map((seq) => tail(seq), seqs)));
}
```

### 2.37

```js
function dot_product(v, w) {
	return accumulate(plus, 0, accumulate_n(times, 1, list(v, w)));
}
```

```js
function matrix_times_vector(m, v) {
	return map(row => dot_product(row, v) , m);
}

function transpose(mat) {
	return accumulate_n(pair, null, mat);
}

// 각 row 별로 col들과 dot_product한 값들로 이뤄진 list를 새로운 row로 갖도록
function matrix_times_matrix(m, n) {
	const cols = transpose(n);
	return map(row => map(col => dot_product(row, col) , cols), m);
}
```


### 2.38

```js
function fold_left(op, initial, sequence) {
	function iter(result, rest) {
		return is_null(rest)
			? result
			: iter(op(result, head(rest)), tail(rest));
	}
	return iter(initial, sequence);
}
```

```js
fold_right(divide, 1, list(1, 2, 3)); // 1 -> 3 -> 2 / 3 -> 1 / 3 / 2 -> 1.5
fold_left(divide, 1, list(1, 2, 3)); // 1 -> 1 -> 1 / 2 -> 1 / 2 / 3 -> 0.166666666666
fold_right(list, null, list(1, 2, 3)); // [1, [[2, [[3, [null, null]], null]], null]]
fold_left(list, null, list(1, 2, 3)); // [[[null, [1, null]], [2, null]], [3, null]]
```

임의의 순차열에 대해 fold_right와 fold_left의 결과가 같기 위해선 op로 넣어주는 연산의 교환법칙이 성립해야 한다.


### 2.39

```js
function reverse(sequence) {
	return fold_right((x, y) => append(y, list(x)), null, sequence);
}

function reverse(sequence) {
	return fold_left((x, y) => pair(y, x), null, sequence);
}
```
