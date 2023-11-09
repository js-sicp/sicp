### 1.20
#### 정상 순서 평가
```js
gcd(206, 40);
40 === 0 ? 206 : gcd(40, 206 % 40);
gcd(40, 206 % 40);
206 % 40 === 0 ? 40 : gcd(206 % 40, 40 % (206 % 40)); // predicate : + 1
gcd(206 % 40, 40 % (206 % 40));
40 % (206 % 40) === 0 ? 206 % 40 : gcd(40 % (206 % 40), (206 % 40) % (40 % (206 % 40))); // predicate : + 2
gcd(40 % (206 % 40), (206 % 40) % (40 % (206 % 40)));
(206 % 40) % (40 % (206 % 40)) === 0 ? 40 % (206 % 40) : gcd(((206 % 40) % (40 % (206 % 40))), (40 % (206 % 40)) % ((206 % 40) % (40 % (206 % 40)))); // predicate : + 4
gcd(((206 % 40) % (40 % (206 % 40))), (40 % (206 % 40)) % ((206 % 40) % (40 % (206 % 40))));
(40 % (206 % 40)) % ((206 % 40) % (40 % (206 % 40))) === 0 ? ((206 % 40) % (40 % (206 % 40))) : gcd(..., ...); // predicate : + 7, expression : + 4
// result : 2, total : 18
```
결과는 2가 나오며 총 18번의 % 계산이 일어난다.

#### 인수 우선 평가
```js
gcd(206, 40);
40 === 0 ? 206 : gcd(40, 6); // + 1
gcd(40, 6);
6 === 0 ? 40 : gcd(6, 4); // + 1;
gcd(6, 4);
4 === 0 ? 6 : gcd(4, 2); // + 1;
gcd(4, 2);
2 === 0 ? 4 : gcd(2, 0); // + 1;
gcd(2, 0);
0 === 0 ? 2 : gcd(0, 2 % 0); // result : 2, total : 4
```
결과는 마찬가지로 2가 나오며 총 4번의 % 계산이 일어난다.

### 1.21
```js
console.log(smallest_divisor(199)); // 199
console.log(smallest_divisor(1999)); // 1999
console.log(smallest_divisor(19999)); // 7
```

### 1.22
```js
// divisor
function smallest_divisor(n) {
	return find_divisor(n, 2);
}

function square (n) {
	return n * n;
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

// prime test
function is_prime(n) {
	return n === smallest_divisor(n);
}

// display
function display(n) {
	console.log(n);
}

function get_time() {
	return new Date().getTime();
}

function timed_prime_test(n) {
	display(n);
	return start_prime_test(n, get_time());
}

function start_prime_test(n, start_time) {
	return is_prime(n) ? report_prime(get_time() - start_time) : true;
}

function report_prime(elapsed_time) {
	display(" *** ");
	display(elapsed_time);
}

function is_even(n) {
	return n % 2 === 0;
}

function is_undefined(v) {
	return v === undefined;
}

function search_for_primes(n, count) {
	return count === 0
		? true
		: n > 2 && is_even(n)
		? search_for_primes(n + 1, count)
		: is_undefined(timed_prime_test(n))
		? search_for_primes(n + 2, count - 1)
		: search_for_primes(n + 2, count);
}
```
- 1,000보다 큰 최소 소수 세 개 : 1009, 1013, 1019
- 10,000보다 큰 최소 소수 세 개 : 10007, 10009, 10037
- 100,000보다 큰 최소 소수 세 개 : 100003, 100019, 100043
- 1,000,000보다 큰 최소 소수 세 개 : 1000003, 1000033, 1000037

- 1,000에 대해서는 1ms보다 적게 걸리며, 100,000일 때 1ms, 1,000,000일 때 1, 2ms 정도 걸려 단계 수에 따라 커지는 것은 확인했으나 $\sqrt{n}$에 부합하는지는 확인하기 어려웠다.

### 1.23
```js
function smallest_divisor(n) {
	return find_divisor(n, 2);
}

function find_divisor(n, test_divisor) {
	return square(test_divisor) > n ?
		n
		: divides(test_divisor, n)
		? test_divisor
		: find_divisor(n, test_divisor + 1);
}

function square(n) {
	return n * n;
}

function divides(a, b) {
	return b % a === 0;
}

function next(n) {
	return n === 2 ? 3 : n + 2;
}
```
모두 0ms가 걸려 확인이 되지 않았다. 정확히 2는 아닐지라도 알고리즘의 속도가 빨라진 것을 확인할 수 있었다.

### 1.24
```js
function expmod(base, exp, m) {
	return exp === 0
		? 1
		: is_even(n)
		? square(expmod(base, exp / 2, m)) % m
		: (base * expmod(base, exp - 1, m)) % m;
}

function fermat_test(n) {
	function try_it(a) {
		return expmod(a, n, n) === a;
	}
	return try_it(1 + Math.floor(Math.random() *(n - 1)));
}

function fast_is_prime(n, times) {
	return times === 0
		? true
		: fermat_test(n)
		? fast_is_prime(n, times - 1)
		: false;
}

function is_prime(n) {
	return fast_is_prime(n, 100); // asertion
}
```
- 1,000보다 큰 최소 소수 세 개 : 1009, 1013, 1019
- 10,000보다 큰 최소 소수 세 개 : 10007, 10009, 10037
- 100,000보다 큰 최소 소수 세 개 : 100003, 100019, 100043
- 1,000,000보다 큰 최소 소수 세 개 : 1000003, 1000033, 1000037

1ms 정도로 아주 길지 않았다. 이 때 주목할만한 점은 fast_is_prime의 경우 앞선 테스트보다 많은 함수가 펼쳐지기 때문에 큰 수를 테스트하는 경우 Maximum callstack error가 발생했고, 이를 위해 is_prime에서 random 숫자를 체크하는 횟수를 100으로 고정했다.

### 1.25
```js
function fast_expt(a, b, n) {
	return n === 0 ? a : is_even(n) ? fast_expt(a, square(b), n / 2) : fast_expt(a * b, b, n - 1);
}

function expmod(base, exp, m) {
	return fast_expt(1, base, exp) % m;
}
```
fast_expt의 경우 큰 수에 대해 곱 연산이 안되는 경우가 있어 코드는 간결하나 적절하지 않다.

### 1.26
```js
function expmod(base, exp, m) {
	return exp === 0
		? 1
		: is_even(exp)
		? (expmod(base, exp / 2, m) * expmod(base, exp / 2, m)) % m
		: (base * expmod(base, exp - 1, m)) % m;
}
```
인수 우선 적용방식을 사용하여 square를 사용하는 경우 expmod를 한 번만 호출하면 되나, 위와 같이 expmod를 쓰는 경우 짝수인지 체크하는 과정을 통해 logn으로 줄인 연산을 expmod 함수를 두 번 호출해 n제곱으로 다시 늘어나게 된다. 따라서 비효율적인 코드가 된다.

### 1.27
```js
function halve(n) {
	return n >> 1;
}

function full_fermat_test(n) {
	function test(a, n) {
	return a > halve(n) || (expmod(a, n, n) === a ? test(a + 1, n) : false);
}
	return test(2, n);
}

function is_prime(n) {
	return full_fermat_test(n);
}
```

위와 같이 2부터 n/2까지 모든 수에 대해 페르마 테스트를 체크하는 함수를 작성할 수 있으며, 책에 예시로 나온 카마이클 수(561,1105, 1729, 2821, 6601)이 페르마 판정법을 속일 수 있다는 것을 확인할 수 있다.

### 1.28
```js
function square_with_check(a, n) {
	return a !== 1 && a !== n - 1 && square(a) % n === 1 ? 0 : square(a);
}

function expmod(base, exp, m) {
	return exp === 0
		? 1
		: is_even(exp)
		? square_with_check(expmod(base, exp / 2, m), m) % m
		: (base * expmod(base, exp - 1, m)) % m;
}

function miller_rabin_test(n) {
	function try_it(a) {
		return expmod(a, n - 1, n) === 1;
	}
return try_it(1 + Math.floor(Math.random() * (n - 1)));
}

function fast_is_prime(n, times) {
	return times === 0
		? true
		: miller_rabin_test(n)
		? fast_is_prime(n, times - 1)
		: false;
}

function is_prime(n) {
	return fast_is_prime(n, 100);
}
```
진욱님의 갓갓 증명으로 square_with_check 완성


### 1.29
#### Simpsons's Rule
일반적인 구분구적법보다 좀 더 정확한 수치 적분법으로 Simpson's Rule(심프슨 법칙)이 있는데, a와 b 사이의 함수 f의 적분을 다음과 같이 근사한다.

$$
\frac{h}{3}[{y_{0} + 4y_{1} + 2y_{2} + \cdots + 4y_{n - 1} + y_n}]
$$
$h = (b - a) / n$ 이고, $y_k=f(a+kh)$ 일 때 f, a, b, n을 인수로 받고 심슨 근사법으로 적분하는 함수는 다음과 같다.

```js
function inc(k) {
	return k + 1;
}

function simpson_integral(f, a, b, n) {
	function helper(h) {
		function y(k) {
			return f(a + k * h);
		}
		function term(k) {
			return k === 0 || k === n
				? y(k)
				: k % 2 === 0
				? 2 * y(k)
				: 4 * y(k);
		}
		return sum(term, 0, inc, n) * h / 3;
	}
	return helper((b - a) / n);
}
```
솔루션을 보고 배낀거라 외우겠습니다. ㅋㅋㅋ


### 1.30
```js
function sum(term, a, next, b) {
	function iter(a, result) {
		return a > b
			? result
			: iter(next(a), term(a) + result);
	}
	return iter(a, 0);
}
```


### 1.31
월리스 곱(Wallis Product)의 한 형태로 $\pi$의 무한 곱 표현식이다. 문제에서 주어진 식이 나오게 된 배경에 대한 증명은 다음과 같다.(tmi : 참고로 월리스는 무한대 기호를 처음으로 쓴 뉴턴보다 선배인 엄청난 수학자이다)

#### 1) $I_n = \int_{0}^{\frac{\pi}{2}}{\sin^{n}{x}dx}$, $I_{2n} = \frac{n - 1}{n}{I_{n - 2}}$

부분적분을 활용해 다음 관계식을 보일 수 있다.
$$
\begin{array}{ccccl}
& I_n & = & \int_{\frac{\pi}{2}}^{0}{\sin^{n}{x}}{dx} & = & [-\cos{x}\sin^{n - 1}{x}]_{0}^{\frac{\pi}{2}} + (n - 1)\cdot \int_{0}^{\frac{\pi}{2}}{\cos^{2}{x}\sin^{n - 2}{x}dx}\\
&&&&&(n - 1)\cdot\int_{0}^{\frac{\pi}{2}}(1 - \sin^2{x})\sin^{n - 2}{x}dx\\
&&&&&(n - 1)\cdot\int_{0}^{\frac{\pi}{2}}\sin^{n - 2}{x}dx - (n - 1)\cdot\int_{0}^{\frac{\pi}{2}}\sin^{n}{x}dx\\
&&\Rightarrow &n\cdot\int_{0}^{\frac{\pi}{2}}\sin^{n}{x}dx & = & (n - 1)\cdot\int_{0}^{\frac{\pi}{2}}\sin^{n - 2}{x}dx\\
\\
&&\therefore I_n & = \int_{\frac{\pi}{2}}^{0}{\sin^{n}{x}}{dx} &= &\frac{n - 1}{n}\int_{\frac{\pi}{2}}^{0}{\sin^{n - 2}{x}}{dx} = \frac{n - 1}{n}I_{n - 2}
\end{array}
$$

#### 2) $I_{2n}$, $I_{2n + 1}$의 값

위의 관계식으로부터 각 식을 계산해보면 다음과 같다.
##### $I_{2n}$
$$
\begin{array}{ccl}
I_{2n} = \frac{2n - 1}{2n}I_{2n - 2} = \frac{2n - 1}{2n}\cdot\frac{2n - 3}{2n - 2}I_{2n - 4} = \cdots = \frac{2n - 1}{2n}\cdot\frac{2n - 3}{2n - 2} \cdots \cdot \frac{1}{2}\cdot I_0\\
\\
I_0 = \int_{0}^{\frac{\pi}{2}}{1}dx = \frac{\pi}{2}\\
\\
\therefore I_{2n} = \frac{2n - 1}{2n}\cdot\frac{2n - 3}{2n - 2} \cdots \cdot \frac{1}{2}\cdot \frac{\pi}{2}
\end{array}
$$

##### $I_{2n + 1}$
$$
\begin{array}{ccl}
I_{2n + 1} = \frac{2n}{2n + 1}I_{2n - 1} = \frac{2n}{2n + 1}\cdot\frac{2n - 2}{2n - 1}I_{2n - 3} = \cdots = \frac{2n}{2n + 1}\cdot\frac{2n - 2}{2n - 1} \cdots \cdot \frac{2}{3}\cdot I_1\\
\\
I_1 = \int_{0}^{\frac{\pi}{2}}{\sin{x}}dx = 1\\
\\
\therefore I_{2n + 1} = \frac{2n}{2n + 1}\cdot\frac{2n - 2}{2n - 1} \cdots \cdot \frac{2}{3}\cdot 1
\end{array}
$$


#### 3) $\lim_{n\to\infty} \frac{I_{2n}}{I_{2n+1}} = 1$

$\sin{x}$ 는 0과 $\frac{\pi}{2}$ 사이에서 항상 1보다 작기 때문에 $\sin^{n + 1}{x}$의 적분 값은 $\sin^{n}{x}$의 적분 값보다 항상 작을수밖에 없다. 따라서 다음 관계식이 성립한다.
$$
\begin{array}{ccc}
\sin^{n + 1}{x} \leq \sin^{n}{x} \Rightarrow \int_{0}^{\frac{\pi}{2}}\sin^{n + 1}{x}dx \leq \int_{0}^{\frac{\pi}{2}}\sin^{n}{x}dx\\
\\
\therefore I_{n + 1} \leq I_{n}
\end{array}
$$

위 관계식을 활용하면 $I_{2n}$, $I_{2n + 1}$ 사이의 비의 범위를 다음과 같이 한정할 수 있다.

$$
I_{2n + 1} \leq I_{2n} \Rightarrow 1\leq \frac{I_{2n}}{I_{2n + 1}}\leq \frac{I_{2n - 1}}{I_{2n + 1}} = \frac{2n + 1}{2n}
$$

샌드위치 정리에 의해 다음과 같이 극한값을 구할 수 있다.

$$
\lim_{n \to \infty}{\frac{I_{2n}}{I_{2n + 1}}} = 1
$$

#### 4) $\frac{\pi}{4} = \frac{2\cdot4\cdot4\cdot6\cdot6\cdot8\cdots}{3\cdot3\cdot5\cdot5\cdot7\cdot7\cdots}$

n에 대한 표현식 $A_n$ 을 다음과 같이 정의해보자.

$$
A_n = \frac{2\cdot4\cdot4\cdot6\cdot \cdots \cdot (2n)\cdot(2n - 2)}{3\cdot3\cdot5\cdot5\cdot \cdots \cdot (2n - 1)\cdot(2n-1)}
$$

앞서 극한값을 계산한 $I_{2n}$, $I_{2n + 1}$ 사이의 비를 다음과 같이 쓸 수 있다.

$$
\begin{array}{ccc}
\frac{I_{2n}}{I_{2n + 1}} = \frac{\frac{3}{4}}{\frac{2}{3}}\cdot\frac{\frac{5}{6}}{\frac{4}{5}} \cdot \cdots \cdot \frac{\frac{2n - 1}{2n}}{\frac{2n-2}{2n - 1}}\cdot \frac{1}{\frac{2n}{2n+1}}\cdot \frac{\pi}{4}\\
\\
\frac{I_{2n}}{I_{2n + 1}} \cdot A_n \cdot \frac{2n}{2n + 1} = \frac{\pi}{4}\\
\\
\Rightarrow \lim_{n \to \infty}{\frac{I_{2n}}{I_{2n + 1}} \cdot A_n \cdot \frac{2n}{2n + 1}} = \lim_{n \to \infty}{A_n} = \frac{\pi}{4}
\end{array}
$$

따라서 문제에서 주어진 식과 같이 pi를 무한 곱으로 표현할 수 있다.

$$
\therefore \frac{\pi}{4} = \frac{2\cdot4\cdot4\cdot6\cdot6\cdot8\cdots}{3\cdot3\cdot5\cdot5\cdot7\cdot7\cdots}
$$

#### a) product

```js
function product (term, a, next, b) {
	return a > b
		? 1
		: term(a) * product(term, next(a), next, b);
}
```

다음 함수를 활용해 $\pi$의 근사값을 계산해 보았다.

```js
function pi() {
	function term(n) {
		return ((2 * n) * (2 * n + 2)) / ((2 * n + 1) * (2 * n + 1));
	}
	function next(n) {
		return n + 1;
	}
	return 4 * product(term, 1, next, 5000);
}

pi(); // 3.141749705738071
```


#### b) 재귀적 과정과 반복적 과정

반복적 과정의 product

```js
function product(term, a, next, b) {
	function iter(a, result) {
		return a > b
			? result
			: iter(next(a), term(a) * result);
	}
	return iter(a, 1);
}
```
