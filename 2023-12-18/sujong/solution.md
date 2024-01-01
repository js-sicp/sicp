
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

8퀸 퍼즐을 푸는 방법은 다음과 같다.
- k-1개의 퀸을 체스판의 처음 k-1개의 열에 배치하는 모든 순차열 생성
- 각 방법에 대해 k번째 열의 각 행에 퀸을 놓아서 생기는 확장된 체스판 생성
- 생성된 체스판들 중 k번째 열의 퀸이 기존의 퀸들에게 잡히지 않는 상황만 filter

몇 가지 함수들을 활용해 다음과 같이 8퀸 퍼즐의 모든 솔루션을 구할 수 있는 함수를 작성할 수 있다.
- is_safe(k, positions) : k-1번째까지 놓여있는 퀸 포지션에 대해 k번째 열의 위치가 안전한지 체크
- adjoin_position(new_row, k, rest_of_queens) : k-1번째까지 구한 위치들에 대해 k번째 열의 모든 행에 퀸을 배치
- empty_board : 빈 체스판

```js
function queens(board_size) {
	function queen_cols(k) {
		return k === 0
			? list(empty_board)
			: filter((positions) => is_safe(k, positions),
				flatmap((rest_of_queens) =>
				map((new_row) => adjoin_position(new_row, k, rest_of_queens),
					enumerate_interval(1, board_size)),
				queen_cols(k - 1)
			)
		);
	}
	return queen_cols(board_size);
}

const empty_board = null;

function adjoin_position(row, col, rest_of_queens) {
	return pair(pair(row, col), rest_of_queens);
}

function is_safe(k, positions) {
	// 새롭게 추가된 k번째 열의 queen 위치
	const first_row = head(head(positions));
	const first_col = tail(head(positions));
	return accumulate((pos, so_far) => {
		const row = head(pos);
		const col = tail(pos);
		return (so_far &&
			first_row - first_col !== row - col && // 왼쪽 위 대각선
			first_row + first_col !== row + col && // 왼쪽 아래 대각선
			first_row !== row // 같은 행
			);
	}, true, tail(positions));
}
```

솔루션을 보고 했는데 다시 풀어보길...(여전히 flatmap, map을 잘 이해 못한듯)


### 2.43

```js
flatmap(new_row => 
	   map(rest_of_queens => 
		   adjoin_position(new_row, k, rest_of_queens),
		queen_cols(k - 1)),
	   enumerate_interval(1, board_size));
```

위와 같이 푼 경우 queen_cols(k-1)이 매 flatmap iteration 마다 값을 새롭게 생성하기 때문에 훨씬 많은 시간이 걸린다. 맵의 사이즈가 n이고 기존의 퍼즐 푸는 시간을 T라 했을 때, col 하나 당 flatmap을 한 번 돌 때마다 n번씩 호출되기 때문에 기존의 flatmap보다 대략 $k^k$번씩 더 호출되며, 따라서 $O(n^nT)$라고 할 수 있다.


### 2.44

```js
function up_split(painter, n) {
	if (n === 0) {
		return painter;
	} else {
		const smaller = up_split(painter, n - 1);
		return below(beside(smaller, smaller), painter);
	}
}
```


### 2.45

up_split의 경우 below 안의 변수 순서가 달라 다르게 나올텐데 어떻게 저 구조로 짜라는건지 모르겠다. direction같은 변수가 추가적으로 필요할 듯 하다.

```js
function split(fn1, fn2) {
	function recursive_split(painter, n) {
		if (n === 0) {
			return painter;
		} else {
			const smaller = recursive_split(painter, n - 1);
			return fn1(painter, fn2(smaller, smaller));
		}
	}
	return recursive_split;
}
```
