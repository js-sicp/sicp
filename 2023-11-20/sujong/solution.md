### 2.17

```js
function last_pair(list) {
    return is_null(tail(list))
        ? head(list)
        : last_pair(tail(list));
}
```


### 2.18

```js
function reverse(list) {
    return is_null(list)
        ? null
        : append(reverse(tail(list)), pair(head(list), null));
}
```


### 2.19

```js
function no_more(coin_values) {
  return is_null(coin_values);
}

function except_first_denomination(coin_values) {
  return tail(coin_values);
}

function first_denomination(coin_values) {
  return head(coin_values);
}

function cc(amount, coin_values) {
  return amount === 0
          ? 1
          : amount < 0 || no_more(coin_values)
                  ? 0
                  : cc(amount, except_first_denomination(coin_values)) +
                  cc(amount - first_denomination(coin_values), coin_values);
}

const us_coins = pair(50, pair(25, pair(10, pair(5, pair(1, null)))));
const uk_coins = pair(
        100,
        pair(50, pair(20, pair(10, pair(5, pair(2, pair(1, null))))))
);

cc(100, us_coins); // 292
```

목록의 순서가 달라지더라도 모든 경우에 대해 체크하기 때문에 답은 달라지지 않는다.


### 2.20

```js
function brooks(curried_func, list) {
    return is_null(list)
        ? curried_func
        : brooks(curried_func(head(list)), tail(list));
}

function brooks_curried(list) {
    function brooks_iter(curried_func, params) {
        return is_null(params)
            ? curried_func
            : brooks_iter(curried_func(head(params)), tail(params));
    } 
    return brooks_iter(head(list), tail(list));
}

const list1 = pair(plus_curried, pair(3, pair(4, null)));

const list2 = pair(
    brooks_curried,
    pair(pair(plus_curried, pair(3, pair(4, null))), null)
);

const list3 = pair(
    brooks_curried,
    pair(
        pair(
            brooks_curried,
            pair(pair(plus_curried, pair(3, pair(4, null))), null)
        ),
        null
    )
);

console.log(brooks_curried(list1)); // 7
console.log(brooks_curried(list2)); // 7
console.log(brooks_curried(list3)); // 7
```

### 2.21
```js
function square_list(items) {
	return is_null(items)
		? null
		:pair(square(head), square_list(tail(items)));
}

function square_list(items) {
	return map(square, items);
}
```


### 2.22

```js
function square_list(items) {
	function iter(things, answer) {
		return is_null(things)
			? answer
			: iter(tail(things),
				pair(square(head(things)),
					answer)
			);
	}
	return iter(items, null);
}

const l = list(1, 2, 3, 4, 5);
square_list(l); // [1, [4, [9, [16, [25, null]]]]]
```

위의 square_list 함수는 제곱된 head가 처음에 null이었던 answer의 head로 계속해서 붙어나가기 때문에 요소들이 역순인 목록을 돌려주게 된다.
만약 이를 위해 pair의 인수들을 맞바꾸게 되면,

```js
function square_list(items) {
	function iter(things, answer) {
		return is_null(things)
			? answer
			: iter(tail(things),
				pair(answer,
					square(head(things)))
			);
	}
	return iter(items, null);
}

const l = list(1, 2, 3, 4, 5);
square_list(l); // [[[[[null, 25], 16], 9], 4], 1]
```

위의 주석과 같이 이상한 목록이 생성된다.


### 2.23

```js
function for_each(func, items) {
	if (is_null(items)) {
		return undefined;
	} else {
		func(head(items));
		for_each(func, tail(items));
	}
}
```

