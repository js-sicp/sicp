### 2.24

pair(1, pair( pair(2, pair(pair(3, pair(4, null)), null)), null))
이를 상자 표기법으로 표현하면 다음과 같다.

[1, [[2, [[3, [4, null]] , null]], null]]


### 2.25

```js
const list1 = list(1, 3, list(5, 7), 9);
const first_seven = head(tail(head(tail(tail(list1)))));

const list2 = list(list(7));
const second_seven = head(head(list2));

const list3 = list(1, list(2, list(3, list(4, list(5, list(6, 7))))));
const third_seven = head(tail(head(tail(head(tail(head(tail(head(tail(head(tail(list3))))))))))));
// head(tail(...)) 연계
```

### 2.26

```js
const x = list(1, 2, 3);
const y = list(4, 5, 6);

append(x, y); // [1, [2, [3, [4, [5, [6, null]]]]]]
pair(x, y); // [[1, [2, [3, null]]], [4, [5, [6, null]]]]
list(x, y); // [[1, [2, [3, null]]], [[4, [5, [6, null]]], null]]
```


### 2.27

```js
function reverse(list) {  
    return is_null(list)  
        ? null
         : append(reverse(tail(list)), pair(head(list), null));  
}
```

2.18의 reverse는 위와 같이 list를 순회하며 head에 해당하는 값만으로 이뤄진 새로운 list를 뒤집혀진 tail list에 append하는 방식으로 작성했다. deep_reverse는 여기에 추가적으로 head(list) 또한 목록일 수 있으므로 head 또한 reverse한 결과를 append하여 구현할 수 있다.

```js
function deep_reverse(list) {
	return is_null(list)
		? null
		: append(deep_reverse(tail(list)), pair(reverse(head(list)), null));
}
```


### 2.28

count_leaves에서와 마찬가지로 tree의 leaf node로만 이뤄진 list들을 차례대로 append함으로써 다음과 같이 구현할 수 있다.

```js
function fringe(tree) {
	return is_null(tree)
		? null
		: !is_pair(tree)
		? list(tree)
		: append(fringe(head(tree)), fringe(tail(tree)));
}
```


### 2.29

이진 모빌의 데이터는 다음과 같다.
* 이진 모빌(binary mobile) : 가지가 두 개인 모빌 -> 왼쪽 가지 + 오른쪽 가지
* 가지(branch) : 가지의 길이(length)와 가지 끝에 달린 요소(structure)로 구성된 객체
* 가지의 길이 : 수치 값
* 가지 끝에 달린 요소 : 추의 무게 or 또 다른 이진 모빌

```js
function make_mobile(left, right) {
	return list(left, right);
}

function make_branch(length, structure) {
	return list(length, structure);
}
```

#### a. left_branch, right_branch, branch_length, branch_structure
```js
function left_branch(mobile) {
	return head(mobile);
}

function right_branch(mobile) {
	return head(tail(mobile));
}

function branch_length(branch) {
	return head(branch);
}

function branch_structure(branch) {
	return head(tail(branch));
}
```

#### b. total_weight

count_leaves에서와 전략은 같다.

```js
function total_weight(mobile) {
	return is_null(mobile)
		? 0
		: !is_pair(mobile)
		? mobile
		: total_weight(branch_structure(left_branch(mobile)))
		+ total_weight(branch_structure(right_branch(mobile)));
}
```

#### c. is_balanced_mobile

알고리즘은 다음과 같다.

- is_balanced = left_branch의 토크 === right_branch의 토크

따라서 left_branch와 right_branch의 total_weight와 length를 각각 곱해 비교함으로써 다음과 같이 구현할 수 있다.

```js
function is_balanced_mobile(mobile) {
	const left = left_branch(mobile);
	const right = right_branch(mobile);
	return (
		total_weight(branch_structure(left)) * branch_length(left) ===
		total_weight(branch_structure(right)) * branch_length(right)
	);
}
```

#### d. if data structure changed...?

```js
function make_mobile(left, right) {
	return pair(left, right);
}

function make_branch(length, structure) {
	return pair(length, structure);
}
```

위와 같이 list 대신 pair를 쓰는 경우, 데이터의 값을 *사용하는* total_weight와 is_balanced_mobile은 수정할 필요가 없어진다. 대신 mobile과 branch에 대한 선택자인 left_branch, right_branch, branch_length, branch_structure만 수정하면 되며, 이를 통해 추상화로 인한 유지보수가 훨씬 유리하다는 것을 확인할 수 있다.


### 2.30

```js
// 고차함수 사용하지 않는 경우
function square_tree(tree) {
	return is_null(tree)
		? null
		: !is_pair(tree)
		? square(tree)
		: pair(square_tree(head(tree)), square_tree(tail(tree)));
}

// 고차함수를 사용한 경우
function square_tree(tree) {
	return map(
		(sub_tree) =>
			is_pair(sub_tree) ? square_tree(sub_tree) : square(sub_tree),
		tree
	);
}
```


### 2.31

tree_map은 tree의 모든 leaf node를 순회하도록 다음과 같이 작성할 수 있다.

```js
function tree_map(func, tree) {
	return is_null(tree)
		? null
		: !is_pair(tree)
		? func(tree)
		: pair(tree_map(func, head(tree)), tree_map(func, tail(tree)));
} 
```

