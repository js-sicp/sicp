## 2.2.3 합의된 인터페이로서의 순차열

> [!conventional interface(합의된 인터페이스)]
> 수치 데이터를 다루는 패턴을 추상화 했듯이 복합 데이터들에 대해서도 추상화가 가능하며 이 추상화를 구성하는 기능 조각들의 집합을 합의된 인터페이스라고 부름!

```js
function even_fibs(n) {
	function next(k) {
		if (k > n) {
			return null;
		} else {
			const f = fib(k);
			return is_even(f)
				? pair(f, next(k + 1))
				: next(k + 1);
		}
	}
	return next(0);
}
```

```js
function sum_odd_squares(tree) {
	return is_null(tree)
		? 0
		: is_pair(tree)
		? is_odd(tree) ? square(tree) : 0
		: sum_odd_squares(head(tree)) + sum_odd_squares(tail(tree));
}
```

위의 두 함수들은 서로 다른 역할을 하나 숫자를 나열해놓고 조건에 따라 누산한다는 공통적인 특징을 가지고 있다. 또한 각 과정을 다음과 같이 도식화 할 수 있다.

$$
enumerate \Rightarrow filter \Rightarrow map \Rightarrow accumulate
$$

도식의 구성 요소들을 이용해 위의 두 함수를 다시 한 번 정의해보자.

### 순차열 연산들

#### even_fibs
위의 도식대로 계산 과정을 설명하면 다음과 같다.
1) 0부터 n까지 모든 정수를 열거(enumerate)한다.
2) 각 정수로부터 피보나치 수를 생성(map)한다.
3) 이 중 짝수인 수만 걸러낸 뒤(filter)
4) pair로 누산해 list를 생성한다.

##### map

```js
function map(func, items) {
	return is_null(items)
		? null
		: pair(func(head(items)), map(func, tail(items)));
}
```

##### filter

```js
function filter(predicate, sequence) {
	return is_null(sequence)
		? null
		: predicate(head(sequence))
		? pair(head(sequence), filter(predicate, tail(sequence)))
		: filter(predicate, tail(sequence));
}
```

##### accumulate

```js
function accumulate(op, initial, sequence) {
	return is_null(sequence)
		? initial
		: op(head(sequence), accumulate(op, initial, tail(sequence)));
}

// example
accumulate(plus, 0, list(1, 2, 3, 4, 5)); // 15
```

##### enumerate

```js
function enumerate_interval(low, high) {
	return low > high
		? null
		: pair(low, enumerate_interval(low + 1, hight));
}
```

위의 4개의 함수를 조합하면,

```js
function even_fibs(n) {
	return accumulate(pair, null, 
		filter(is_even, 
			map(fib, 
				enumerate_interval(0, n);
			)
		)
	)
}
```

#### sum_odd_squares
마찬가지로 도식화한 연산 순서는 다음과 같다.
1) 트리의 잎들을 열거(enumerate)한다.
2) 홀수 잎들만 선택(filter)하여
3) 각 잎의 수치를 제곱(map)한다.
4) 그 다음 제곱된 수들을 모두 더한다.(accumulate)

#### enumerate_tree

```js
function enumerate_tree(tree) {
	return is_null(tree)
		? null
		: !is_pair(tree)
		? list(tree)
		: append(enumerate_tree(head(tree)), enumerate_tree(tail(tree)));
}
```

위의 함수를 사용해 구현하면,

```js
function sum_odd_squares (tree) {
	return accumulate(sum, 0,
		map(square,
			filter(is_odd,
				enumerate_tree(tree)
			)
		)
	);
}
```


> 이렇듯 **합의된 인터페이스**가 있다면 독립된 모듈을 이용해 프로그램을 구축하는 **모듈식 설계(modular design)** 를  구현할 수 있다!!


### 중첩된 매핑

순차열 패러다임을 좀 더 확장하면 중첩 루프로 표현되는 여러 계산도 순차열 패러다임으로 연산이 가능!

#### 1. 합이 소수인 순서쌍 구하기

> 양의 정수 n이 주어졌을 때, $1 \leq j < i \leq n$ 이고 $i + j$가 소수인 서로 다른 양의 정수 순서쌍 (i, j)를 모두 구하여라.

이는 다음 방식으로 구할 수 있다.
1) n보다 작거나 같은 모든 양의 정수 순서쌍을 생성 => 각 정수 $i \leq n$에 대해 정수 $j < i$들을 나열, 쌍 (i, j) 생성
2) 필터를 통해 그 중 합이 소수인 것들만 선택
3) 그런 쌍 (i, j)에 대해 (i, j, i + j)를 생성

이를 코드 세부적으로 설명하면 다음과 같다.
1) enumerate_interval(1, n)으로 1부터 n까지의 숫자들을 순회하며,
2) 각 i 값에 대해 enumerate_interval(1, i - 1)을 생성하고,
3) 해당 list를 순회하며 각 j 값에 대해 list(i, j)를 생성
4) 그러면 모든 경우의 수에 대한 (i, j)로 구성된 list 생성

```js
accumulate(append,
		  null,
		  map(i => map(j => list(i, j),
									  enumerate_interval(1, i - 1)),
					enumerate_interval(1, n)));
```

이런 연산이 생각보다 많기 때문에 flatmap이란 함수를 다음과 같이 정의할 수 있다.

```js
function flatmap(f, seq) {
	return accumulate(append, null, map(f, seq));
}
```

또한 filter로 list를 순회하며 합이 소수인지 체크하는 함수는 다음과 같다.

```js
function is_prime_sum(pair) {
	return is_prime(head(pair) + head(tail(pair)));
}
```

마지막으로 세 값 쌍을 만들어내는 함수는 다음과 같다.

```js
function make_pair_sum(pair) {
	return list(head(pair), tail(pair), head(pair) + tail(pair));
}
```

위의 각 단계들을 합쳐 다음과 같이 소수인 세 값쌍을 생성해내는 함수를 작성할 수 있다.

```js
function prime_sum_pairs(n) {
	return map(make_pair_sum, // 4. 그 합과 pair를 생성해 return
		filter(is_prime_sum, // 3. 해당 list 앞의 두 값의 합이 prime인 것들만 filter한 후
			flatmap(i => map(j => list(i, j), enumerate_interval(1, i - 1)), // 2. 1 부터 i - 1 까지의 숫자와의 쌍을 생성하고
				enumerate_interval(1, n) // 1. 1 부터 n 까지의 숫자들 중
			)
		)
	);
}
```

#### 2. 순열(permutation) 구하기

> 집합 S의 모든 순열 구하여라.

1) S의 각 원소 x에 대해, 집합 S - x의 모든 순열의 순차열을 재귀적으로 생성
2) 각 순차열의 제일 앞에 x를 삽입

```js
function permutations(s) {
	return is_null(s)
		? list(null)
		: flatmap(x => map(p => pair(x, p), // 3. 해당 permutation을 순회하며 x를 순차열의 제일 앞에 삽입
			permutations(remove(x, s))), // 2. S에서 x를 제거한 집합의 permutation을 재귀적으로 구한 뒤
			s // 1. 주어진 집합 S에 대해
			);
}
```

이 때 remove 함수는 다음과 같다.

```js
function remove(item, sequence) {
	return filter(x => !(x === item),
		sequence
		);
}
```
