### 연습문제 1.1

```js
10; // 10

5 + 3 + 4; // 12

9 - 1; // 8

6 / 2; // 3.0

2 * 4 + (4 - 6); // 6

const a = 3; // undefined

const b = a + 1; // undefined

a + b + a * b; // 19

a === b; // false

b > a && b < a * b ? b : a; // b > a -> true로 평가되므로 뒤의 exp 평가 => 4

a === 4
? 6
: b === 4
? 6 + 7 + a
: 25; // 16

2 + (b > a ? b : a); // 6

(a > b
? a
: a < b
? b
: -1)
*
(a + 1); // 16
```

### 연습문제 1.2

```js
(5 + 4 + (2 - (3 - (6 + 4 / 5)))) / (3 * (6 - 2) * (2 - 7));
```

### 연습문제 1.3

```js
function lesserSquareSum (a, b, c) {
	return a > b ?
		(a > c ? b * b + c * c : a * a + b * b) :
		(b > c ? c * c + a * a : a * a + b * b)
}
```

### 연습문제 1.4

함수 적용 평가 과정을 보기 위해 $a = 1, b = 2$ 를 대입해보자.
```js
a_plus_abs_b(1, 2);
```

자바스크립트는 함수 적용에 인수 우선 평가 방식을 사용하기 때문에 1을 1로, 2를 2로 각각 평가하며, 평가한 값을 바탕으로 반환 표현식의 이름을 치환하여 평가를 시작한다.

```js
return (b >= 0 ? plus : minus)(a, b); // a = 1, b = 2로 치환되며, plus, minus는 앞서 선언된 함수 주소값으로 치환
```

여기서 함수 표현식은 삼항 연산자로 작성되어 predicate의 평가 결과를 바탕으로 다음 표현식들이 평가되는데, b의 값은 2이고 0보다 크거나 같기 때문에 plus의 주솟값으로 평가된다. 인수 표현식은 (1, 2)로 평가되며 인수 표현식의 평가 결과를 plus에 대입하여 plus(1, 2)의 함수 적용 평가가 일어나게 된다.

만약 b = -1과 같은 음수가 들어가게 되면, 함수 표현식의 평가 결과가 minus의 주솟값이 되어 minus(1, -1)이 실행된다.

### 연습문제 1.5

#### 인수 우선 평가

```js
test(0, p());
```
위의 함수 적용 평가를 인수 우선 평가 방식으로 하는 경우, 첫 번째 매개변수는 0, 두 번째 매개변수는 p 함수를 실행하여 반환되는 값을 test 함수 내부에서 사용할 값으로 사용하기 위해 실행하게 된다. p 함수는 자기 자신을 return하므로 콜스텍에 함수 실행 컨텍스트가 쌓이게 되고, 콜 스택이 꽉 차서 더 이상 함수를 담을 수 없을 때 maximum callstack size 관련 에러를 내며 프로그램이 멈출 것이다.

#### 정상 순서 평가

정상 순서 평가는 함수의 반환문을 일단 펼쳐놓고 실행하기 때문에 인수로 전달받은 0과 p()를 바탕으로 다음 표현식이 평가될 것이다.

```js
0 === 0 ? 0 : p();
```

삼항 연산에서 predicate이 true인 경우엔 alternative expression이 평가되지 않기 때문에 p 함수는 실행되지 않고, 0이 return된다.

### 연습문제 1.6

```js
function sqrt_iter(guess, x) {
	return conditional(is_good_enough(guess, x), guess, sqrt_iter(improve(guess, x), x));
}
```

위의 함수를 실행할 경우 반환문에 함수 적용 평가가 적용되어 is_good_enough의 평가 결과에 따라 sqrt_iter를 진행하는 것이 아니라 sqrt_iter의 평가가 무한히 일어나게 되고, 일반적으로는 정확한 루트 값이 계산되기 전에 콜스텍이 차서 에러로 인해 프로그램이 멈출 것이다.(연습문제 1.5와 함께 이해할 것)


### 연습문제 1.7

```js
function abs(a) {
	return a >= 0 ? a : -a;
}

function square(a) {
	return a * a;
}

function is_good_enough(guess, x) {
	return abs(square(guess) - x) < 0.001;
}
```

아주 작은 수의 제곱근을 구하는 경우, 기본적으로 자기 자신과 guess의 값의 차이가 is_good_enough에서 설정한 0.001보다 작기 때문에 비교로 인한 improve가 잘 일어나지 않는다. 실제로 0.001, 0.0001, 0.00001... 의 sqrt 값을 계산해보면 거의 비슷한 값이 나오는 것을 볼 수 있다.

```js
sqrt(0.0001); // 0.03230844833048122
sqrt(0.00001); // 0.03135649010771716
sqrt(0.000001); // 0.031260655525445276
...
```

아주 큰 수의 제곱근을 구하는 경우, guess로 인한 차이값 또한 너무 커서 설정한 값인 0.001만큼 정밀하게 가기까지 너무 많은 iteration을 거쳐야 하기 때문에 콜스텍 에러가 나오게 된다.(e.g. sqrt(99999999999999999);)

```js
sqrt(99999999999999999); // Error : Maximum call stack size exceeded
```

이를 해결하기 위해 guess의 변화량을 추적하며 변화량이 guess의 아주 작은 비율보다 작으면 충분히 좋은 추측값이라 판정하는 코드는 다음과 같다.

```js
function is_good_enough(guess, x) {
	const improvedValue = improve(guess, x);
	return abs(guess - improvedValue) / improvedValue < 0.0001;
}
```

위와 같이 판별하는 경우 이후 guess 값을 바탕으로 변화의 비율을 추적하므로 값이 크든 작든 상관없이 적절한 추측값인지 확인할 수 있다. 앞서 살펴본 제대로 계산되지 않는 값을 계산해보면 다음과 같다.

```js
sqrt(0.0001); // 0.010000714038711746
sqrt(0.00001); // 0.0031622926477232706
sqrt(0.000001); // 0.0010000001533016628
```

```js
sqrt(99999999999999999); // 316228564.9222876
```


### 연습문제 1.8

```js
function onThirdOfSum(a, b) {
	return (a + b) / 3;
}

function square(a) {
	return a * a;
}

function cube(a) {
	return a * a * a;
}

function abs(a) {
	return a >= 0 ? a : -a;
}

function improve(guess, x) {
	return onThirdOfSum(2 * guess, x / square(guess));
}

function isGoodEnough(guess, x) {
	return abs(cube(guess) - x) < 0.001;
}

function sqrt_iter(guess, x) {
	return isGoodEnough(guess, x) ? guess : sqrt_iter(improve(guess, x), x);
}

function sqrt(x) {
	return sqrt_iter(1, x);
}

sqrt(3); // 1.4422497895989996
```
