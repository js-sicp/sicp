### 2.53

```js
list("a", "b", "c")
// 상자 : ["a", ["b", ["c", null]]]
// 목록 : list("a", "b", "c")

list(list("george"))
// 상자 : [["george", null], null]
// 목록 : list(list("george"))

tail(list(list("x1", "x2"), list("y1", "y2")))
// 상자 : [["y1", ["y2", null]], null]
// 목록 : list(list("y1", "y2"))

tail(head(list(list("x1", "x2"), list("y1", "y2"))))
// 상자 : ["x2", null]
// 목록 : list("x2")

member("red", list("blue", "shoes", "yellow", "socks"))
// 상자 : null
// 목록 : null

member("red", list("red", "shoes", "blue", "socks"))
// 상자 : ["red", ["shoes", ["blue", ["socks", null]]]]
// 목록 : list("red", "shoes", "blue", "socks")
```


### 2.54

```js
function equal(list1, list2) {
	return is_null(list1) && is_null(list2)
		? true
		: is_pair(list1)
		? is_pair(list2) ? head(list1) === head(list2) && equal(tail(list1), tail(list2)) : false
		: is_pair(list2)
		? false
		: list1 === list2;
}
```


### 2.55

```js
'"' === ""
```

주어진 문자열 조건에 따르면 위의 케이스는 다음과 같이 정리할 수 있다.

- true 인 경우
  (작은 따옴표) (큰 따옴표) (작은 따옴표) === (작은 따옴표) (큰 따옴표) (작은 따옴표)
  (큰 따옴표) (작은 따옴표) (큰 따옴표) === (큰 따옴표) (작은 따옴표) (큰 따옴표)

- false 인 경우
  (작은 따옴표) (큰 따옴표) (작은 따옴표) === (큰 따옴표) (큰 따옴표)

(문제의 답은 false 이지만) 만약 구별이 잘 안가는 폰트를 썼다면 true인 경우와 false인 경우를 나눠 생각해보고 폰트를 역추론 할 수 있다고 생각한다.


### 2.56

지수에 대한 미분법을 적용하면 연산의 횟수를 많이 줄일 수 있기 때문에 도움이 될 수 있다. 아래와 같이 지수식 생성자와 선택자들을 구현할 수 있다. 식을 간단히 하기 위해 make_exp의 조건을 추가했다.

```js
function make_exp(b, e) {
	return number_equal(b, 0)
		? 0
		: number_equal(b, 1) || number_equal(e, 0)
		? 1
		: number_equal(e, 1)
		? b
		: is_number(b) && is_number(e)
		? b ** e
		: list("**", b, e);
}

function is_exp(x) {
	return is_pair(x) && head(x) === "**";
}

function base(s) {
	return head(tail(s));
}

function exponent(s) {
	return head(tail(tail(s)));
}
```

$$
\frac{d(u^n)}{dx} = nu^{n - 1}(\frac{du}{dx})
$$

위의 거듭제곱 미분법을 deriv 함수에 적용하면 다음과 같이 곱 조건 뒤에 추가해줄 수 있다.

```js
function deriv(exp, variable) {
	return is_number(exp)
		? 0
		: is_variable(exp)
		? is_same_variable(exp, variable) ? 1 : 0
		: is_sum(exp)
		? make_sum(deriv(addend(exp), variable),
			deriv(augend(exp), variable))
		: is_product(exp)
		? make_sum(make_product(multiplier(exp), deriv(multiplicand(exp), variable)),
			make_product(deriv(multiplier(exp), variable), multiplicand(exp)))
		: is_exp(exp)
		? make_product(exponent(exp), 
			make_product(make_exp(base(exp), exponent(exp) - 1),
				deriv(base(exp), variable)
			)
		)
		: error(exp, "unknown expression type -- deriv");
}
```

### 2.57

인수를 2개 이상 받는 경우 기존의 addend와 augend는 값이 아닌 list를 반환하기 때문에 우리가 원하는 식을 만들어낼 수 없다. 이 부분을 덧셈 식, 혹은 곱 식으로 만들기 위해서는 accumulate 함수를 다음과 같이 사용할 수 있다.

```js
function augend(s) {
	return accumulate(make_sum, 0, tail(tail(s)));
}

function multiplicand(s) {
	return accumulate(make_product, 1, tail(tail(s)));
}
```

이렇게 반환된 식은 연산 식 하나만 return하기 때문에 이전 프로그램을 수정하지 않아도 미분을 할 수 있게 된다.

### 2.58

#### a. 중위 표기법으로의 변경

문제에서 언급했듯이 대수식의 표현을 정의하는 술어, 선택자, 생성자만 다음과 같이 변경할 수 있다. 항상 두 개의 인수를 받는다고 가정하면 이전처럼 accumulate를 사용할 필요는 없다.

```js
function is_sum(x) {
	return is_pair(x) && is_pair(tail(x)) && head(tail(x)) === "+";
}

function addend(s) {
	return head(s);
}

function augend(s) {
	return accumulate(make_sum, 0, tail(tail(s)));
}

function is_product(x) {
	return is_pair(x) && is_pair(tail(x)) && head(tail(x)) === "*";
}

function multiplier(s) {
	return head(s);
}

function multiplicand(s) {
	return accumulate(make_product, 1, tail(tail(s)));
}

function make_sum(a1, a2) {
	return number_equal(a1, 0)
		? a2
		: number_equal(a2, 0)
		? a1
		: is_number(a1) && is_number(a2)
		? a1 + a2
		: list(a1, "+", a2);
}

function make_product(m1, m2) {
	return number_equal(m1, 0) || number_equal(m2, 0)
		? 0
		: number_equal(m1, 1)
		? m2
		: number_equal(m2, 1)
		? m1
		: is_number(m1) && is_number(m2)
		? m1 * m2
		: list(m1, "*", m2);
}
```

#### b. 곱셈이 덧셈보다 우선순위가 높다는 가정하의 불필요한 괄호 생략

곱셈과 덧셈이 혼재되어있을 수 있는 경우 연산자를 기준으로 앞 - 뒤의 연산 식으로 쪼개 각각을 계산하도록 하면 미분 연산에 영향을 주지 않고 함께 쓰는 연산식을 사용할 수 있다. 함수 식을 간단히 하기 위해 연산은 항상 두 개의 인수를 받으며 거듭제곱에 대한 조건은 제외하기로 한다.

```js
function items_before_first(op, s) { // solution 보고 배낌 -> 개쩌는 아이디어인듯
	return head(s) === op
		? null
		: pair(head(s), items_before_first(op, tail(s)));
}

function items_after_first(op, s) {
	return head(s) === op
		? tail(s)
		: items_after_first(op, tail(s));
}

function is_variable(x) {
	return is_pair(x) && is_string(head(x)) && is_null(tail(x));
}

function is_same_variable(v1, v2) {
	return is_variable(v1) && is_variable(v2) && head(v1) === head(v2);
}

function is_sum(x) {
	return is_pair(x) && is_pair(tail(x)) && head(tail(x)) === "+";
}

function addend(s) {
	return items_before_first("+", s);
}

function augend(s) {
	return items_after_first("+", s);
}

function is_product(x) {
	return is_pair(x) && is_pair(tail(x)) && head(tail(x)) === "*";
}

function multiplier(s) {
	return items_before_first("*", s);
}

function multiplicand(s) {
	return items_after_first("*", s);
}

function make_sum(a1, a2) {
	return number_equal(a1, 0)
		? a2
		: number_equal(a2, 0)
		? a1
		: is_number(a1) && is_number(a2)
		? a1 + a2
		: list(a1, "+", a2);
}

function make_product(m1, m2) {
	return number_equal(m1, 0) || number_equal(m2, 0)
		? 0
		: number_equal(m1, 1)
		? m2
		: number_equal(m2, 1)
		? m1
		: is_number(m1) && is_number(m2)
		? m1 * m2
		: list(m1, "*", m2);
}

function deriv(exp, variable) {
	return is_number(exp)
		? 0
		: is_variable(exp)
		? is_same_variable(exp, variable) ? 1 : 0
		: is_sum(exp)
		? make_sum(deriv(addend(exp), variable),
			deriv(augend(exp), variable))
		: is_product(exp)
		? make_sum(make_product(multiplier(exp), deriv(multiplicand(exp), variable)),
			make_product(deriv(multiplier(exp), variable), multiplicand(exp)))
		: error(exp, "unknown expression type -- deriv");
}
```

// TODO : list 중첩이 있는 경우 deriv 조건식에서 걸러지지 않는데 이 부분 해결할 것


### 2.59

set1을 순회하며 set2 집합에 adjoin하면 union을 구할 수 있다.

```js
function union_set(set1, set2) {
	return is_null(set1)
		? set2
		: is_element_of_set(head(set1), set2)
		? union_set(tail(set1), set2)
		: pair(head(set1), union_set(tail(set1), set2));
}
```


### 2.60

중복을 허용하는 경우 각 함수들은 다음과 같다.

```js
function is_element_of_set(x, set) {
	return is_null(set)
		? false
		: equal(x, head(set))
		? true
		: is_element_of_set(x, tail(set));
}

function adjoin_set(x, set) {
	return pair(x, set);
}

function intersection_set(set1, set2) {
	return is_null(set1) || is_null(set2)
		? null
		: is_element_of_set(head(set1), set2)
		? pair(head(set1), intersection_set(tail(set1), set2))
		: intersection_set(tail(set1), set2);
}

function union_set(set1, set2) {
	return is_null(set1)
		? set2
		: pair(head(set1), union_set(tail(set1), set2));
}
```

- is_element_of_set : set의 사이즈에 비례하기 때문에 O(m + n)으로 동일(하지만 실제 시간은 더 오래 걸릴 것)
- adjoin_set : 체크 과정에서 생기던 O(n) 시간에서 바로 추가만 하면 되기 때문에 O(1)로 매울 효율적임
- intersection_set : O(n x m)으로 동일
- union_set : 체크 없이 추가만 하기 때문에 O(n)으로 효율이 높아짐


### 2.61

is_element_of_set과 동일한 방식으로 풀 수 있다.

```js
function adjoin_set(x, set) {
	return is_null(set)
		? pair(x, null)
		: x === head(set)
		? set
		: x < head(set)
		? pair(x, set)
		: pair(head(set), adjoin_set(x, tail(set)));
}
```


### 2.62

```js
function union_set(set1, set2) {
	if(is_null(set1)) {
		return set2;
	} else if(is_null(set2)) {
		return set1;
	} else {
		const x1 = head(set1);
		const x2 = head(set2);
		return x1 === x2
			? pair(x1, union_set(tail(set1), tail(set2)))
			: x1 < x2
			? pair(x1, union_set(tail(set1), set2))
			: pair(x2, union_set(set1, tail(set2)));
	}
}
```


### 2.63


### 2.64


### 2.65
