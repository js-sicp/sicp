
이번 장에서는 문자열을 데이터로 다루는 능력을 통해 언어 표현 능력을 확장하고자 한다.

## 2.3.1 문자열

다음은 (문자열 하나, 문자열들의 목록 하나) 혹은 (수치 하나, 수치들의 목록 하나)를 입력받아 첫 인수가 목록에 들어있지 않으면 null을, 있다면 그 인수가 처음 등장한 지점에서 시작하는 부분 목록을 돌려주는 member라는 함수이다.

```js
function member(item, x) {
	return is_null(x)
		? null
		: item === head(x)
		? x
		: member(item, tail(x));
}
```


## 2.3.2 예제: 기호 미분

데이터 추상화 전략에 따라 기호 미분 프로그램을 개발해보고자 한다.

### 추상 데이터에 기초한 미분 프로그램

희망적 사고 방식으로 다음 선택자 및 함수들이 정의되어있다고 가정해보자.

```js
is_variable(e) // e가 변수인가?
is_same_variable(v1, v2) // v1과 v2가 같은 변수인가?
is_sum(e) // e가 합 연산인가?
addend(e) // 합 e의 더하는 수(오른쪽 수)
augend(e) // 합 e의 더해지는 수(왼쪽 수)
make_sum(a1, a2) // a1과 a2의 합을 생성
is_product(e) // e가 곱인가?
multiplier(e) // 곱e의 곱하는 수(연산자 오른쪽 수)
multiplicand(e) // 곱e의 곱해지는 수(연산자 왼쪽 수)
make_product(m1, m2) // m1과 m2의 곱을 생성한다.
```

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
		: error(exp, "unknown expression type -- deriv");
}
```

위 미분 알고리즘은 대수식의 구체적인 표현 방식과는 무관하게 미분을 수행한다. 앞선 선택자 및 함수들을 하나씩 구현해보자.


### 대수식의 표현

전위 표기법(prefix notation)을 사용하면 자바스크립트로 대수식을 다루기 쉬워진다. 다음은 전위 표기법에 기초한, 미분 문제를 위한 데이터 표현 방식이다.

```js
function is_number(x) {
	return typeof x === 'number';
}

function is_string(x) {
	return typeof x === 'string';
}

function is_variable(x) { return is_string(x); }

function is_same_variable(v1, v2) {
	return is_variable(v1) && is_variable(v2) && v1 === v2;
}

function make_sum(a1, a2) { return list("+", a1, a2); }

function make_product(m1, m2) { return list("*", m1, m2); }

function is_sum(x) {
	return is_pair(x) && head(x) === "+";
}

function addend(s) { return head(tail(s)); }

function augend(s) { return head(tail(tail(s))); }

function is_product(x) {
	return is_pair(x) && head(x) === "*";
}

function multiplier(s) { return head(tail(s)); }

function multiplicand(s) { return head(tail(tail(s))); }
```

몇 가지 예시를 확인하다 보면 위의 deriv는 올바른 미분을 하는 함수이지만 답이 정리되지 않음을 볼 수 있다. 예를 들어,

$$
\frac{d(xy)}{dx} = x \cdot 0 + 1 \cdot y
$$

위와 같이 계산되는 것을 볼 수 있는데, 분명 계산은 맞지만 y로 return하는 것이 맞다. 이는 이전 유리수 프로그램에서 마지막에 기약분수로 정리했듯이 deriv를 수정하지 않고 하위 레이어의 make_product, make_sum을 수정하여 정리된 형태로 보여줄 수 있다. (아래와 같이 항등원과 역원 케이스를 통해 간단히 할 수 있다)

```js
function number_equal(exp, num) {
	return is_number(exp) && exp === num; // 둘 중 하나만 숫자여도 되므로
}

function make_sum(a1, a2) {
	return number_equal(a1, 0)
		? a2
		: number_equal(a2, 0)
		? a1
		: is_number(a1) && is_number(a2)
		? a1 + a2
		: list("+", a1, a2);
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
		: list("*", m1, m2);
}
```

위 함수들을 활용하면 이전처럼 0이나 1이 나타나는 형태의 대수식은 보이지 않을 것이다. 하지만 "대수식의 단순화"는 관점에 따라 단순함과 복잡함의 기준이 다를 수 있기 때문에 "가장 단순한 형태"의 대수식을 만들었다고 보기는 어렵다.


## 2.3.3 예제: 집합의 표현
// TODO
### 순서 없는 목록으로 표현한 집합


### 순서 있는 목록으로 표현한 집합


### 이진 트리로 표현한 목록
