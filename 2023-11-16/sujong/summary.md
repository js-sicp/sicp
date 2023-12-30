# 2.1 데이터 추상화

> **데이터 추상화**
>
> 프로그램에서 데이터 객체의 표현을 다루는 부분과 그러한 객체를 실제로 활용하는 부분을 분리하는 개념의 설계 방법론

- 복합 데이터를 이용하면 프로그램의 모듈성(modularity)도 높일 수 있음
- 높아진 모듈성을 통해 프로그램의 설계와 유지보수, 수정이 훨씬 쉬워짐
- 언어의 표현력이 높아짐

## 2.1.1 예제: 유리수 산술 연산

> 희망적 사고(wishful thinking) : 사용할 수 있는 함수들이 그냥 잘 작동할 것이라고 희망적으로 생각하고 넘어가는 강력한 합성(synthesis) 전략(?)

우리는 유리수의 산술 연산이 **make_rat(n, d)**, **numer(x)**, **denom(x)** 세 함수를 통해 (희망적 사고를 했을 때) 다음과 같이 구현할 수 있다.

```js
function add_rat(x, y) {
	return make_rat(numer(x) * denom(y) + numer(y) * denom(x), denom(x) * denom(y));
}

function sub_rat(x, y) {
	return make_rat(numer(x) * denom(y) - numer(y) * denom(x), denom(x) * denom(y));
}

function mul_rat(x, y) {
	return make_rat(numer(x) * numer(y), denom(x) * denom(y));
}

function div_rat(x, y) {
	return make_rat(numer(x) * denom(y), denom(x) * numer(y));
}

function equal_rat(x, y) {
	return numer(x) * denom(y) === numer(y) * denom(x);
}
```

### 쌍 자료 구조

**pair**, **head**, **tail**을 통해 데이터를 표현하는 방식으로, 쌍 객체들로 만든 데이터 객체를 목록 구조 데이터(list-structured data)라고 부름

쌍 자료 구조를 활용하면 앞선 make_rat, numer, denom을 간단하게 표현할 수 있다.

```js
function make_rat(n, d) {
	return pair(n, d);
}

function numer(x) {
	return head(x);
}

function denom(x) {
	return tail(x);
} 
```

또한 위의 유리수는 약분을 하지 않은 채로 구현되어있는데, 다음과 같이 make_rat 함수를 수정하여 최대공약수를 구하여 항상 기약분수가 되도록 만들수도 있다.

```js
function make_rat(n, d) {
	const g = gcd(n, d);
	return pair(n / g, d / g);
}
```

> 데이터 구현과 사용 영역을 독립적으로 구별해놨기 때문에 앞선 기약분수 문제는 연산 함수를 수정하지 않고 데이터 표현 부분만 수정하여 해결할 수 있었다!!!


## 2.1.2 추상화 장벽

데이터 추상화란, 데이터 객체 형식과 그 형식에 관한 모든 조작을 표현하는 연산으로 구성하는 것을 말한다.

> **추상화 장벽(abstraction barriers)**
>
> 이 때 추상화 수준(abstraction level)을 나눔으로써 독립적인 추상 레이어를 생성할 수 있고, 이렇게 갈라진 경계를 추상화 장벽이라 함
> 본질적으로 각 수준의 함수들은 추상화 장벽을 정의하고 서로 다른 수준들을 연결하는 **인터페이스**로 작용!

추상화 장벽 개념을 잘 적용하면, 프로그램의 유지보수에 용이하며, 구현의 유연성으로 인해 프로그램의 설계에도 도움이 된다.

## 2.1.3 데이터란 무엇인가?

> **데이터란?**\
> 어떠한 선택자들과 생성자들, 그리고 유효한 표현을 위해 그함수들이 반드시 충족하는 조건들의 집합

앞서 살펴본 pair, head, tail 등은 해당 함수가 갖춰야 할 조건들만 충족한다면 어떤 함수든 사용할 수 있다!!!

```js
function pair(x, y) {
  function dispatch(m) {
    return m === 0 ? x : m === 1 ? y : error(m, "argument not 0 or 1 -- pair");
  }
  return dispatch;
}

function head(z) {
  return z(0);
}

function tail(z) {
  return z(1);
}
```

직관적이진 않지만 앞서 살펴본 pair, head, tail과 동일한 동작을 할 수 있는 함수들이다.

여기서 특이한 점은 pair(x, y)가 돌려주는 값이 함수라는 점이다. 이렇듯 head, tail만으로 쌍 객체에 접근하는 경우 pair가 함수를 돌려주는지, 아니면 무엇을 돌려주는지 알 방법이 없다.

이 예시를 통해 알 수 있는 것은,

> 함수를 객체로서 다루는 능력이 곧 복합 데이터를 표현하는 능력으로 이어진다는 점!!!

데이터의 함수적 표현... 어렵지만 알아두도록 하자.

## 2.1.4 심화 연습문제: 구간 산술

병렬 저항 합 공식

$$
R_p = \frac{1}{1/R_1 + 1/R_2}
$$

일반적으로 저항 값은 어떤 허용오차(tolerance) 이내의 근삿값이다.

$$
6.8\Omega, precision: 10\% \Rightarrow (6.8 - 0.68, 6.8 + 0.68) = (6.12, 7.48)
$$

이를 위해 구간 산술(interval arithmetic) 패키지를 구현해보자.

```js
function add_interval(x, y) {
  return make_interval(
    lower_bound(x) + lower_bound(y),
    upper_bound(x) + upper_bound(y)
  );
}

// 모든 경우의 수 중 최소, 최대 활용
function mul_interval(x, y) {
  const p1 = lower_bound(x) * lower_bound(y);
  const p2 = lower_bound(x) * upper_bound(y);
  const p3 = upper_bound(x) * lower_bound(y);
  const p4 = upper_bound(x) * upper_bound(y);
  return make_interval(math_min(p1, p2, p3, p4), math_max(p1, p2, p3, p4));
}

// 둘째 구간의 역에 첫째 구간을 곱함
function div_interval(x, y) {
  return mul_interval(x, make_interval(1 / upper_bound(y), 1 / lower_bound(y)));
}
```
