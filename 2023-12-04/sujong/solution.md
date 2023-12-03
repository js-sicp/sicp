### 2.33

```js
function map(f, sequence) {
	return accumulate((x, y) => f(x, y), null, sequence);
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
