
### 2.40

unique_pairs는 앞선 예제에서 모든 순서쌍을 생성하기만 하면 되므로 flatmap을 return하여 다음과 같이 작성할 수 있다.

```js
function unique_pairs(n) {
	return flatmap(
		(i) => map((j) => list(i, j), enumerate_interval(1, i - 1)),
		enumerate_interval(1, n)
	);
}
```

위의 unique_pairs를 활용하면 prime_sum_pairs의 로직은 더욱 간단해진다.

1) 모든 순서쌍(unique_pairs)에 대해,
2) prime_sum인 순서쌍을 필터한 것들을 pair_sum으로 만들어 return

```js
function prime_sum_pairs(n) {
	return map(make_pair_sum, filter(is_prime_sum, unique_pairs(n)));
}
```

### 2.41

해당 세값쌍을 구하는 순서는 다음과 같이 정리할 수 있다.

1) 주어진 정수 n보다 작거나 같은 서로 다른 양의 정수 i, j, k로 이루어진 모든 순서쌍 중
2) 세 정수의 합이 s와 같은 쌍만 필터하여 return

이를 구현하기 위해 모든 $1 \leq k < j < i \leq n$을 만족하는 세값쌍을 구하는 *unique_triple_lists(n)* 함수와, list의 요소 합을 구하는 *sum_list(list)* 를 다음과 같이 구현할 수 있다.

```js
function unique_triple_lists(n) {
	return flatmap(i => 
					flatmap(j => 
						flatmap(k => permutations(list(i, j, k)), 
				enumerate_interval(1, j - 1)),
			enumerate_interval(1, i - 1)),
		enumerate_interval(1, n));
}
```

```js
function sum_list(list) {
	return accumulate(add, 0, list);
}
```

위 두 함수를 활용해 다음과 같이 세값쌍을 구하는 함수를 구현할 수 있다.

```js
function specific_sum_pairs(n, s) {
	return filter(list => sum_list(list) === s, unique_triple_lists(n));
}
```

### 2.42(Eight Queens Puzzle)


### 2.43


### 2.44


### 2.45

