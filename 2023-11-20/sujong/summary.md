## 2.2 위계적 데이터와 닫힘 성질

> box-and-pointer
>
> 복합 객체 상자와 상자를 가리키는 pointer로 구성된 시각화 방법

> 닫힘 성질(closure property)
>
> 데이터 객체들을 조합하는 연산이 있을 때, 그 연산으로 조합한 결과들을 또 다시 그 연산으로 조합할 수 있다면 해당 연산이 닫힘 성질을 충족한다고 할 수 있음

## 2.2.1 sequence(순차열)의 표현

수학에선 수열!!

box and pointer 방식으로 순차열을 표현할 수 있으며, 이 때 사용되는 pair 객체는 head로 목록의 첫 요소, tail로 첫 요소를 제외한 나머지 sublist를 돌려주는 선택자로 할 수 있다. 이 책에서는 이를 표기하는 방식으로 아래 두 가지 방식을 사용할 것이다.

- 상자 표기법(box notation)
  pair(1, 2) -> [1, 2]
  pair(1, pair(2, pair(3, pair(4, null)))) -> [1, [2, [3, [4, null]]]]

- 목록 표기법(list notation)
  [1, 2] -> list(1, 2)
  [1, [[2, 3], [[4, [5, null]], [6, null]]]] -> list(1, [2, 3], list(4, 5), 6)

### 목록 연산

다음과 같은 방식으로 n번째 항목과 순차열의 길이를 구할 수 있다.

```js
function list_ref(items, n) {
	return n === 0
		? head(items)
		: list_ref(tail(items), n - 1);
}

function is_null(item) {
	return item === null;
}

function length(items) {
	return is_null(items)
		? 0
		: 1 + length(tail(items));
}

// or

function length(items) {
    function length_iter(a, count) {
        return is_null(a)
            ? count
            : length_iter(tail(a), count + 1);
    }
    return length_iter(items, 0);
}
```

또한 목록끼리 연결하는 것도 다음과 같이 작성할 수 있다.

```js
function append(list1, list2) {
    return is_null(list1)
        ? list2
        : pair(head(list1), append(tail(list1), list2));
}
```


