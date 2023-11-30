### 2.24

pair(1, pair( pair(2, pair(pair(3, pair(4, null)), null)), null))
이를 상자 표기법으로 표현하면 다음과 같다.

[1, [[2, [[3, [4, null]] , null]], null]]


### 2.25

```js
function is_seven(x) {
	return x === 7;
}

function get_seven(x) {
	return is_seven(x)
		? 7
		: pair(get_seven(head(x)), get_seven(tail(x)));
}
```
