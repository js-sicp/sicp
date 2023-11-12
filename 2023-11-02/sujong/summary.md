## 1.2.5 최대공약수

최대공약수(Greatest Common Divisor, GCD)란 a, b 모두와 나눠떨어지는 가장 큰 정수를 말한다.

> Euclid's Algorithm(유클리드 알고리즘; 유클리드 호제법)
>  a를 b로 나눈 나머지가 r이라고 할 때, a와 b의 공약수들은 b와 r의 공약수와 같다!


> 라메의 정리(Lame's Theorem)
> 유클리도 호제법으로 어떤 정수 쌍의 최대공약수를 구하는 데 필요한 단계 수가 k라고 할 때, 그 쌍의 더 작은 정수는 반드시 k번째 피보나치 수보다 크거나 같다.

$$
n \geq Fib(k) \approx \phi^k / \sqrt{5}
$$

따라서 유클리드 알고리즘의 증가 차수는 $\Theta(\log{n})$ 임을 알 수 있다!



## 1.2.6 예제 : 소수 판정

### 약수 찾기

약수는 주어진 수를 나눠떨어지게 하는 수로 다음 코드를 이용해 구할 수 있다. 아래의 find_divisor는 다음 명제에 기반한다.

> 만일 n이 소수가 아니라면 $\sqrt{n}$보다 작거나 같은 약수가 반드시 존재!!!

```js
function smallest_divisor(n) {
	return find_divisor(n, 2);
}

function find_divisor(n, test_divisor) {
	return square(test_divisor) > n
		? n
		: divides(test_divisor, n)
		? test_divisor
		: find_divisor(n, test_divisor + 1)
}

function divides(a, b) {
	return b % a === 0;
}
```

### 소수 찾기

> n이 n의 최소 약수라면 n은 소수!!!

```js
function is_prime(n) {
	return n === smallest_divisor(n);
}
```

### 페르마 판정법

> [!페르마의 소정리]
> 만일 n이 소수이고 a가 n보다 작은 임의의 양의 정수이면,
> $$
> a^n \equiv a \pmod{n}
> $$
> 이 정리는 n이 소수일 때만 성립!!!
> 소수가 아닐 때는 **일반적으로** n보다 작은 대부분의 수 a는 위의 관계를 충족하지 않음


페르마 판정법은 위의 소정리를 이용한 방법으로,

> 페르마 판정법(Fermat test)
> - 수 n이 주어졌을 때, a < n을 무작위로 선택하여 $a^n$을 n으로 나눈 나머지를 계산
    > 	- 그 결과가 a와 같지 않으면 n은 소수가 아님이 분명!
           > 	- 그 결과가 a와 같다면 n이 소수일 가능성이 높아짐! -> 다른 a를 무작위로 선택해 같은 방법으로 판정


```js
function expmod(base, exp, m) {
	return exp === 0
		? 1
		: is_even(exp)
		? square(expmod(base, exp / 2, m)) % m
		: (base * expmod(base, exp - 1, m)) % m;
}

function fermat_test(n) {
	function try_it(a) {
		return expmod(a, n, n) === a;
	}
	return try_it(1 + Math.floor(Math.random() * (n - 1)));
}

function fast_is_prime(n, times) {
	return times === 0
		? true
		: fermat_test(n)
		? fast_is_prime(n, times - 1)
		: false;
}
```


### 확률적 방법(Probabilistic Algorithms)

n이 페르마 판정법을 통과하지 못하면 n은 확실히 소수가 아니지만, n이 판정을 통과했다 해도 n이 반드시 소수라는 보장은 없다!!!

> e.g. 카마이클 수(Carmichael numbers) : 페르마 판정법을 속이는 수들로, 561, 1105, 1729, 등이 있음

따라서 확률에 의존하거나 변형된 판정법을 사용해야 한다. 이렇듯 **오류 확률을 낮출 수 있음이 증명 가능한 판정법, 알고리즘**을 확률적 알고리즘이라 한다.


# 1.3 고차 함수를 이용한 추상의 정식화

> 함수는 수들에 관한 복합 연산을 서술하는 추상

하지만 앞서 살펴본 단순한 함수들을 보면 언어의 원시 요소들에 해당하는 구체적인 연산만을 통해 작업해야 한다는 불편함이 있다. 강력한 프로그래밍 언어들에선 좀 더 고수준 연산의 추상화를 위해 매개변수로 함수를 받을 수 있는 기능을 제공하며, 이렇게 *함수를 다루는 함수*를 **고차 함수(higher-order function)**이라 한다.

## 1.3.1 함수를 받는 함수

### Summation of a series(급수의 합)

$$
\sum_{n=a}^{b} f(n) = f(a) + \cdots + f(b)
$$

이를 다음과 같이 작성할 수 있다.

```js
function sum(term, a, next, b) {
	return a > b
		? 0
		: term(a) + sum(term, next(a), next, b);
}
```

위 함수를 활용해 1에서 10까지의 정수들의 세제곱의 합을 구할 수 있다.

```js
function cube (n) {
	return n * n * n;
}

function inc (n) {
	return n + 1;
}

function sum_cubes(a, b) {
	return sum(cube, a, inc, b);
}
```

### (optional) pi sum
tan 함수의 역함수인 arctan를 활용하면 pi(pi/4)의 값을 다음과 같이 구할 수 있다.

$$
\tan{\frac{\pi}{4}} = 1 \rightarrow \arctan{1} = \frac{\pi}{4}
$$

arctan는 미분했을 때 분수 식으로 표현되며 이를 이용해 다음과 같이 pi/4를 계산할 수 있다.

$$
\begin{array}{ccl}
&\frac{d}{dx} \arctan{x} & =  &\frac{1}{1 + x^2} \\
& \int_{0}^{1}{\frac{dx}{1 + x^2}} & = & \int_{0}^{1}{\frac{d}{dx}\arctan{x}} dx \\
& & = & arctan{1} - arctan{0} & = \frac{\pi}{4}
\end{array}
$$

위 식에서 $\frac{1}{1 + x^2}$ 부분은 이항정리를 통해 다음과 같이 정리할 수 있다.

$$
\begin{array}{cccll}
&&(1 + x)^n &= &1 + nx + \frac{n(n-1)}{2!}x^2 + \frac{n(n - 1)(n - 2)}{3!}x^3 + \cdots \\
&&\frac{1}{1 + x^2} &= &(1 + x^2)^{-1} = 1 - x^2 + x^4 - x^6 + x^8 - \cdots \\
& \therefore & \int_{0}^{1}{\frac{dx}{1 + x^2}}  &= &\int_{0}^{1}{1 - x^2 + x^4 - x^6 + x^8 + \cdots}dx \\
&&&= &[ 1 - \frac{1}{3}x^3 + \frac{1}{5}x^5 - \cdots ]_{0}^{1}\\
&&&= &(1 - \frac{1}{3}) + (\frac{1}{5} - \frac{1}{7})+ \cdots\\
&&&= &\frac{2}{1\cdot3} + \frac{2}{6\cdot7} + \cdots\\
&\therefore &\frac{\pi}{8} &= &\frac{1}{1\cdot3} + \frac{1}{5\cdot7} \cdots
\end{array}
$$

위 식을 이용해 아래 pi를 구하는 pi_sum 함수를 구현할 수 있다.

```js
function pi_sum(a, b) {
	function pi_term(n) {
		return 1 / (n * (n + 2));
	}
	function pi_next(n) {
		return n + 4;
	}
	return sum(pi_term, a, pi_next, b);
}
```


### 구분구적법을 활용한 적분의 근사

$$
\int_{a}^{b}{f} = \left[  f( a + \frac{dx}{2}) + f(a + dx + \frac{dx}{2}) + \cdots \right]dx
$$

이를 함수로 표현하면 다음과 같다.

```js
function integral(f, a, b, dx) {
	function add_dx(x) {
		return x + dx;
	}
	return sum(f, a + dx / 2, add_dx, b) * dx;
}
```

