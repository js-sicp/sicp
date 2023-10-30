### 1.9
```js
function plus(a, b) {
	return a === 0 ? b : inc(plus(dec(a), b));
}
```

위 함수의 경우 인수 우선 평가 방식에 의해 plus 내부에서 inc가 지연된 연산으로 중첩되기 때문에 재귀적 과정으로 계산된다.

```js
plus(4, 5);
inc(plus(3, 5));
inc(inc(plus(2, 5)));
inc(inc(inc(plus(1, 5))));
inc(inc(inc(inc(plus(0, 5)))));
inc(inc(inc(inc(5))));
inc(inc(inc(6)));
inc(inc(7));
inc(8);
9
```

```js
function plus(a , b) {
	return a === 0 ? b : plus(dec(a), inc(b));
}
```

위 함수는 plus 외부에 지연된 연산이 없기 때문에 반복적 과정으로 계산된다.

```js
plus(4, 5);
plus(3, 6);
plus(2, 7);
plus(1, 8);
plus(0, 9);
9
```

### 1.10
```js
A(1, 10);
A(0, A(1, 9));
A(0, A(0, A(1, 8)));
A(0, A(0, A(0, A(1, 7))));
A(0, A(0, A(0, A(0, A(1, 6)))));
A(0, A(0, A(0, A(0, A(0, A(1, 5))))));
A(0, A(0, A(0, A(0, A(0, A(0, A(1, 4)))))));
A(0, A(0, A(0, A(0, A(0, A(0, A(0, A(1, 3))))))));
A(0, A(0, A(0, A(0, A(0, A(0, A(0, A(0, A(1, 2)))))))));
A(0, A(0, A(0, A(0, A(0, A(0, A(0, A(0, A(0, A(1, 1))))))))));
A(0, A(0, A(0, A(0, A(0, A(0, A(0, A(0, A(0, 2)))))))));
A(0, A(0, A(0, A(0, A(0, A(0, A(0, A(0, 4))))))));
A(0, A(0, A(0, A(0, A(0, A(0, A(0, 8)))))));
A(0, A(0, A(0, A(0, A(0, A(0, 16))))));
A(0, A(0, A(0, A(0, A(0, 32)))));
A(0, A(0, A(0, A(0, 64))));
A(0, A(0, A(0, 128)));
A(0, A(0, 256));
A(0, 512);
1024;
```

```js
A(2, 4);
A(1, A(2, 3));
A(1, A(1, A(2, 2)));
A(1, A(1, A(1, A(1, 1))));
A(1, A(1, A(1, 2)));
A(1, A(1, A(0, A(1, 1))));
A(1, A(1, A(0, 2)));
A(1, A(1, 4));
A(1, A(0, A(1, 3)));
A(1, A(0, A(0, A(1, 2))));
A(1, A(0, A(0, A(0, A(1, 1)))));
A(1, A(0, A(0, A(0, 2))));
A(1, A(0, A(0, 4)));
A(1, A(0, 8));
A(1, 16);
// ...
2^16;
```

```js
A(3, 3);
A(2, A(3, 2));
A(2, A(2, A(3, 1)));
A(2, A(2, 2));
A(2, A(1, A(2, 1)));
A(2, A(1, 2));
A(2, A(0, A(1, 1)));
A(2, A(0, 2));
A(2, 4);
// ...
2 ^ 16;
```

아래 선언된 함수들은 수식으로 표현하면 다음과 같다.
```js
function f(n) {
	return A(0, n);
}
```
$$
f(n) = 2n
$$

```js
function g(n) {
	return A(1, n);
}
```

$$
g(n) = 2^n
$$

```js
function h(n) {
	return A(2, n);
}
```
A(2, n)은 A(1, A(1, ... A(1, 1)))로 A가 n번 호출되는 2를 n개 사용해서 밑부터 지수에 쌓아놓은 형태의 식이 된다. 이는 아래와 같이 표현할 수 있을 것이다.
$$
h(n) = 2^{2^{2^{...2}}}
$$


### 1.11
재귀적 과정 함수는 다음과 같다.
```js
// f(n) = f(n - 1) + 2f(n - 2) + 3f(n - 3)
function f(n) {
	return n < 3 ? n : f(n - 1) + 2 * f(n - 2) + 3 * f(n - 3);
}
```

앞선 함수를 반복적 과정 함수로 바꾸기 위해 먼저 계산 과정이 진행되며 값이 어떻게 변하는지 먼저 살펴보자.

$$
\begin{array}{ccc}
a & b & c \\
&\underset{=b}{a'} & \underset{=c}{b'} & \underset{=3 \times a+2\times b + c}{c'} \\
\end{array}
$$
위의 모식도를 통해 각 과정에서 이전 값 2개와 새로 생성될 값을 상태값으로 기억해둘 필요가 있음을 알 수 있고, count를 설정해 아래와 같이 iter 함수를 작성할 수 있다.(n < 3인 경우의 값은 iter로 계산되는 값과 별개의 함수이므로 f(n)에 삼항 연산으로 추가)

```js
function f(n) {
	return n < 3 ? n : f_iter(0, 1, 2, n);
}
function f_iter(a, b, c, count) {
	return count < 3 ? c : f_iter(b, c, 3 * a + 2 * b + c, count - 1);
}
```

### 1.12
파스칼의 삼각형은 i 번째 행의 j 번째 숫자와 같은 형태로 각 값을 표현할 수 있으며 점화식은 다음과 같이 쓸 수 있다.

$$
\begin{array}{ccc}
& A(i, j) = A(i - 1, j - 1) + A(i - 1, j) & \cdots & i \geq 2, j \geq 2, A(1, j) = A(i, 1) = 1
\end{array}
$$

위 식을 바탕으로 아래와 같이 재귀적 과정으로 계산하는 파스칼의 삼각형 함수를 작성할 수 있다.
```js
function A(i, j) {
	return i === 1 ? 
		1 : 
		j === 1 ? 
		1 : 
		j === i ? 
		1 : 
		A(i - 1, j - 1) + A(i - 1, j);
}
```


### 1.13
칠판 풀이(내용이 너무 많지만 주어진 여백이 너무 작아 이곳에 결과만 남긴다)


### 1.14
![coin_tree](https://github.com/js-sicp/sicp/assets/58013476/cc85ad4a-5966-4a22-8f7a-1c1b14b8531e)

공간 증가 차수 : 이진트리이므로 $\Theta(2^n)$
단계 증가 차수 : 임의의 잔돈 n이 들어왔을 때 가장 작은 동전의 금액을 a라 하면 tree의 depth는 n/a가 되므로, $\Theta(n)$

### 1.15
#### a. sine(12.15)
```js
sine(12.15);
p(sine(4.05));
p(p(sine(1.35)));
p(p(p(sine(0.45))));
p(p(p(p(sine(0.15)))));
p(p(p(p(p(sine(0.05))))));
```
p는 총 5번 적용된다.

#### b. sine(a) 평가 시 공간과 단계 수의 증가 차수
$$
a \rightarrow \frac{a}{3} \rightarrow \frac{a}{3^2} \rightarrow \cdots \rightarrow \frac{a}{3^k} < 0.01
$$
sine(a)의 평가는 위와 같은 과정을 함수가 실행되기 때문에 *3으로 몇 번 나눠졌는가*에 따라 단계 수가 결정된다. 양변에 log를 취해 대략 k의 값을 계산하면, $k > \log_{3}{100a}$가 되며, 만족하는 최솟값 k를 구하는 것이므로 $\Theta(\log{a})$라 할 수 있다.

공간은 지연된 연산들의 사슬로 평가되기 때문에 호출 횟수와 동일하므로, $\Theta(\log{a})$라 할 수 있다.

### 1.16
```js
function is_even(n) {
	return n % 2 === 0;
}
function square(n) {
	return n * n;
}
function fast_expt(a, b, n) {
	return n === 0 ? a : is_even(n) ? fast_expt(a, square(b), n / 2) : fast_expt(a * b, b, n - 1);
}
```

### 1.17
주어진 연산인 double과 halve는 bitwize 연산($O(1)$)으로 구현

```js
function double(n) {
	return n << 1;
}
function halve(n) {
	return n >> 1;
}
function is_even(n) {
	return n % 2 === 0;
}
function times(a, b) {
	return b === 1
	? a 
	: is_even(b)
	? double(times(a, halve(b))) 
	: a + times(a, b - 1);
}
```

### 1.18
인수 우선방식을 알고나니 이게 반복적 과정으로 계산된다는걸 이해할 수 있다는 점이 참 흥미로운 것 같다.

```js
function fast_times(a, b) {
	return b === 1 
	? a 
	: is_even(b) 
	? fast_times(double(a), halve(b)) 
	: a + fast_times(a, b - 1);
}
```

### 1.19
$$
T_{pq} : a \leftarrow bq + aq + ap , b \leftarrow bp + aq
$$

위의 Transform을 두 번 수행한 결과가 $T_{p^\prime q^\prime}$과 같기 위해선 아래와 같이 과정을 두 번 해봄으로써 계수 비교를 통해 확인해볼 수 있다.(matrix 연산으로 바꾸면 제곱)

$$
\begin{array}{ccl}
a_1 & = & (p + q)a_0 + qb_0 \\
b_1 & = & qa+0 + pb_0 \\
a_2 & = & (p + q)\{ (p + q)a_0 + qb_0\} + q(qa_0 + pb_0) \\
& = & (p^2 + 2pq + 2q^2)a_0 + (2pq + q^2)b_0 \\
b_2 & = & q\{ (p + q)a_0 + qb_0\} + p(qa_0 + pb_0) \\
& = & (2pq + q^2)a_0 + (p ^ 2 + q ^ 2 )b_0
\end{array}
$$

$$
\therefore p\prime = p^2 + q^2,  q\prime = 2pq + q^2
$$

위와 같이 일반화 했을 때, 두 번의 과정을 스킵할 수 있는 효율적인 피보나치 수열은 다음과 같다.

```js
function is_even(n) {
	return n % 2 === 0;
}
function fib(n) {
	return fib_iter(1, 0, 0, 1, n);
}
function fib_iter(a, b, p, q, count) {
	return count === 0
		? b
		: is_even(count)
		? fib_iter(a, b, p * p + q * q, 2 * p * q + q * q, count / 2)
		: fib_iter(b * q + a * q + a * p, b * p + a * q, p, q, count - 1);
}
```
