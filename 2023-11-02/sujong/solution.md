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
