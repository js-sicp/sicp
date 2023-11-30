## 2.2.2 위계적 구조

> 순차열을 요소로 하는 순차열은 **트리(tree)** 구조로 이해할 수 있음!!
> 요소들 : branch, 자체가 순차열인 요소는 subtree

tree의 leaf node의 개수를 세는 방법은 다음과 같다.

> 빈 목록의 count_leaves 값은 0
> given tree x, count_leaves(x) = count_leaves(head(x)) + count_leaves(tail(x))

코드는 다음과 같다.

```js
function is_pair(item) {
	return !is_null(head(item)) && !is_null(tail(item));
}

function count_leaves(x) {
	return is_null(x)
		? 0
		: !is_pair(x)
		? 1
		: count_leaves(head(x)) + count_leaves(tail(x));
}
```


## 2.2.3 합의된 인터페이로서의 순차열

