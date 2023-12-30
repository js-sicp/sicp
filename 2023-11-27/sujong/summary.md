## 2.2.2 위계적 구조

> 순차열을 요소로 하는 순차열은 **트리(tree)** 구조로 이해할 수 있음!!
> 요소들 : branch, 자체가 순차열인 요소는 subtree

tree의 leaf node의 개수를 세는 방법은 다음과 같다.

> 빈 목록의 count_leaves 값은 0
> given tree x, count_leaves(x) = count_leaves(head(x)) + count_leaves(tail(x))

코드는 다음과 같다.

```js
function pair(a, b) {
    function dispatch(m) {
        return m === 0 ? a : m === 1 ? b : console.error("invalid value for pair");
    }
    return dispatch;
}

function head(p) {
    return p(0);
}

function tail(p) {
    return p(1);
}

function is_pair(item) {
    return (
        typeof item === "function" && item(0) !== undefined && item(1) !== undefined
    );
}

function count_leaves(x) {
	return is_null(x)
		? 0
		: !is_pair(x)
		? 1
		: count_leaves(head(x)) + count_leaves(tail(x));
}
```
