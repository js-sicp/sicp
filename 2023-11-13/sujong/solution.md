// TODO : 1.32 ~ 1.46 채우기

### 1.32
#### a) accumulation & sum/product
```js
function accumulate(combiner, null_value, term, a, next, b) {
	return a > b
		? null_value
		: combiner(term(a), accumulate(combiner, null_value, term, next(a), next, b));
}
```

```js
function add(a, b) {
	return a + b;
}

function sum(term, a, next, b) {
	return accumulate(add, 0, term, a, next,  b);
}
```

```js
function mul(a, b) {
	return a * b;
}

function product(term, a, next, b) {
	return accumulate(mul, 1, term, a, next, b);
}
```

#### b) 재귀적 과정과 반복적 과정
반복적 과정의 accumulate는 다음과 같다.
```js
function accumulate(combiner, null_value, term, a, next, b) {
	function iter(a, result) {
		return a > b
			? combiner(null_value, result)
			: iter(next(a), combiner(term(a), result));
	}
	return iter(a, null_value);
}
```

### 1.33
```js
function filtered_accumulate(combiner, discriminator, null_value, term, a, next, b) {
	return a > b
		? null_value
		: discriminator(term(a))
		? combiner(term(a), filtered_accumulate(combiner, discriminator, null_value, term, next(a), next, b))
		: filtered_accumulate(combiner, discriminator, null_value, term, next(a), next, b);
}
```

#### a) prime filtered accumulate
```js
function add(a, b) {
	return a + b;
}

function plus(n) {
	return n + 1;
}

function squared_prime_sum(a, b) {
	return filtered_accumulate(add, is_prime, 0, square, a, plus, b);
}
```

#### b) GCD filtered accumulate

```js
function coprime_sum(n) {
	function is_coprime(a) {
		return gcd(a, n) === 1;
	}
	return filtered_accumulate(add, is_coprime, 0, identity, 1, plus, n);
}
```

### 1.34
// TODO 
