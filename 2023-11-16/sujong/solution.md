### 2.2

```js
// L1 : pair data
function pair(a, b) {
    return [a, b];
}

function head(pair) {
    return pair[0];
}

function tail(pair) {
    return pair[pair.length - 1];
}

// L2-1 : point data
function make_point(x, y) {
    return pair(x, y);
}

function x_point(p) {
    return head(p);
}

function y_point(p) {
    return tail(p);
}

// L2-2 : segment data
function make_segment(start, end) {
    return pair(start, end);
}

function start_segment(seg) {
    return head(seg);
}

function end_segment(seg) {
    return tail(seg);
}

function display(s) {
    console.log(s);
}

function stringify(o) {
    return JSON.stringify(o);
}

function print_point(p) {
    return display(
        "(" + stringify(x_point(p)) + ", " + stringify(y_point(p)) + ")"
    );
}

function midpoint_segment(seg) {
    const ss = start_segment(seg);
    const es = end_segment(seg);

    return make_point(
        (x_point(ss) + x_point(es)) / 2,
        (y_point(ss) + y_point(es)) / 2
    );
}

// example
const p = make_point(1, 2);
const q = make_point(3, 5);
const segment = make_segment(p, q);
print_point(midpoint_segment(segment)); // (2, 3.5)
```

### 2.3

#### 첫 번째 방법 : 기준점 두 개로 직사각형 정의

```js
// L3 : rectangle data
function make_rectangle(top_left, bottom_right) {
  return pair(top_left, bottom_right);
}

function top_left(rec) {
  return head(rec);
}

function bottom_right(rec) {
  return tail(rec);
}

function top_right(rec) {
  return make_point(x_point(bottom_right(rec)), y_point(top_left(rec)));
}

function bottom_left(rec) {
  return make_point(x_point(top_left(rec)), y_point(bottom_right(rec)));
}

function width(rec) {
  return x_point(top_right(rec)) - x_point(top_left(rec));
}

function height(rec) {
  return y_point(top_right(rec)) - y_point(bottom_right(rec));
}

// L4 : rectangle perimeter & area
function perimeter(rec) {
  return (width(rec) + height(rec)) * 2;
}

function area(rec) {
  return width(rec) * height(rec);
}
```

#### 두 번째 방법 : 기준점 하나와 width, height로 정의

```js
// L3 : rectangle data
function size(width, height) {
  return pair(width, height);
}

function make_rectangle(top_left, width, height) {
  return pair(top_left, size(width, height));
}

function size(rec) {
  return tail(rec);
}

function width(rec) {
  return head(size(rec));
}

function height(rec) {
  return tail(size(rec));
}

// L4 : rectangle perimeter & area
function perimeter(rec) {
  return (width(rec) + height(rec)) * 2;
}

function area(rec) {
  return width(rec) * height(rec);
}
```

perimeter와 area 연산에 대해 추상화 장벽으 두어 두 방법 모두 잘 작동하는 것을 확인할 수 있다.

### 2.4

head(pair(x, y))의 치환 모형은 다음과 같다.

> head(pair(x, y)) \
>  pair(x, y)((p, q) => p) \
> (m => m(x, y))((p, q) => p) \
> ((p, q) => p)(x, y) \
> x

이와 같이 x가 반환되는 것을 확인할 수 있다.

마찬가지로 다음과 같이 tail을 정의할 수 있다.

```js
function tail(z) {
  return z((p, q) => q);
}
```

### 2.5

모든 음이 아닌 정수 쌍이 서로 다른 수로 표현되면 수치를 표현할 수 있다. 예를 들어,

임의의 두 음이 아닌 정수 쌍 (a, b), (c, d)에 대해 다음 식이 성립한다고 가정하자.

$$
2^a\cdot3^b = 2^c\cdot3^b
$$

우변의 수로 양변을 나누게 되면,

$$
2^{a - c}\cdot3^{b - d} = 1
$$

이 때 2와 3은 서로소이므로 역수가 될 수 없기 때문에 1이 되기 위해선,

$$
a - c = 0, b - d = 0 \Rightarrow a = c, b = d
$$

따라서 $2^a\cdot3^b$ 의 표현은 (a, b)의 표현과 마찬가지로 unique하게 사용할 수 있다. 이를 활용해 pair, head, tail을 다음과 같이 정의할 수 있다.

```js
function pair(a, b) {
  return fast_expt(2, a) * fast_expt(3, b);
}

function head(p) {
  return p % 2 === 0 ? head(p / 2) + 1 : 0;
}

function tail(p) {
  return p % 3 === 0 ? tail(p / 3) + 1 : 0;
}
```

### 2.6

> Church numerals(처치 수)\
> 람다 계산법을 고안한 논리학자 알론조 처치의 계산법으로, 수치를 사용하지 않고 임의의 수에 1을 더하는 연산을 다음과 같이 할 수 있다.

```js
const zero = (f) => (x) => x;

function add_1(n) {
  return (f) => (x) => f(n(f)(x));
}
```

add_1(zero)의 치환 모형은 다음과 같다.

> add_1(zero)\
> (f) => (x) => f(((f) => (x) => x)(f)(x))\
> (f) => (x) => f(((x) => x)(x))\
> (f) => (x) => f(x)

위의 add_1의 결과 형태를 관찰해보면 f를 한 번 실행할 때마다 1만큼 증가한다는 것을 알 수 있다. 이를 통해 one, two를 다음과 같이 정의할 수 있다.

```js
const one = (f) => x => f(x);
cosnt two = f => x => f(f(x));
```

```js
function church_to_number(c) {
  return c((n) => n + 1)(0);
}

church_to_number(zero); // 0
church_to_number(one); // 1
church_to_number(two); // 2
```

솔루션을 참고했는데, 위와 같이 0일 때 0, 0이 아닐 때 1씩 증가하는 함수를 통해 church numeral로 인코딩된 수를 숫자로 디코딩 할 수 있다.

또한 덧셈 함수 plus는 다음과 같이 정의할 수 있다.

```js
function plus(a, b) {
  return (f) => (x) => a(f)(b(f)(x));
}
```


### 2.7

```js
function make_interval(x, y) {
	return pair(x, y);
}

function upper_bound(int) {
	return head(int);
}

function lower_bound(int) {
	return tail(int);
}
```


### 2.8

구간의 뺄셈은 가장 작은 값과 가장 큰 값이 항상 정해져있기 때문에 다음과 같이 구할 수 있다.

```js
function sub_interval(x, y) {
	return make_interval(lower_bound(x) - upper_bound(y), upper_bound(x) - lower_bound(y));
}
```


### 2.9

구간 x의 lower_bound와 upper_bound를 $l_x$, $u_x$, 구간 y의 lower_bound와 upper_bound를 $l_y$ , $u_y$라 하자. 이 때 각 구간의 합 차는 다음과 같이 표현할 수 있다.

$$
sum : (l_x + l_y, u_x + u_y), sub : (l_x - u_y, u_x - l_y)
$$

구간 x의 너비를 $d_x$라 하면 x, y, (x + y), (x - y)의 구간의 너비는 다음과 같다.

$$
\begin{array}{}
d_x = \frac{u_x - l_x}{2}, d_y = \frac{u_y - l_y}{2}\\
\\
d_{x + y} = \frac{(u_x + u_y) - (l_x + l_y)}{2}, d_{x - y}=\frac{(u_x - l_y) - (l_x - u_y)}{2}\\
\end{array}
$$

이 때 합과 차 구간의 너비를 다음과 같이 $d_x$, $d_y$로 표현할 수 있다.

$$
\begin{array}{cl}
d_{x + y} &= &\frac{(u_x + u_y) - (l_x + l_y)}{2}\\
&= &\frac{u_x - l_x}{2} + \frac{u_y - l_y}{2}\\
&= &d_x + d_y\\
\\
d_{x - y} &= &\frac{(u_x - l_y) - (l_x - u_y)}{2}\\
&= &\frac{u_x - l_x}{2} + \frac{u_y - l_y}{2}\\
&= &d_x + d_y\\
\end{array}
$$

따라서 두 구간의 합, 차의 너비는 오직 두 구간 너비에 대한 함수임을 알 수 있다.

반면, 곱셈과 나눗셈의 경우, 만약 앞의 구간이 (0, 0)이라면 곱셈과 나눗셈에 의한 구간은 (0, 0), 이 되어 너비가 항상 0이 되지만, 구간이 (1,1)로 동일한 너비를 가지는 구간이라면, 곱셈과 나눗셈에 의한 구간은 피연산 구간과 동일하게 된다. 따라서 곱셈과 나눗셈은 구간의 너비에 의해 결정되지 않는다.


### 2.10

기존의 div_interval은 다음과 같다.

```js
function div_interval(x, y) {
	return mul_interval(x, make_interval(1 / upper_bound(y), 1 / lower_bound(y)));
}
```

만약 나누는 구간에 0이 포함된 경우, 분모가 0이 되기 때문에 Infinity로 계산되어 기존의 div_interval도 정상적으로 작동하게 된다. 하지만 자바스크립트가 아닌 경우에 대해 나누는 구간에 0이 포함되면 문제가 될 수 있으므로 다음과 같이 명시적으로 코드를 작성해 0인 경우 오류가 나도록 설정할 수 있다.

```js
function div_interval(x, y) {
	if (lower_bound(y) * upper_bound(y) <= 0) throw new Error("Invalid divider. Divider should not include 0 in it.");
	return mul_interval(x, make_interval(1 / upper_bound(y), 1 / lower_bound(y)));
}
```


### 2.11

구간 x, y에 대해 다음과 같이 각각 3가지 경우의 수로 나눌 수 있다.

$$
\begin{array}{ccc}
l_x \leq u_x \lt 0 & & l_y \leq u_y \lt 0\\
l_x \leq 0 \leq u_x & & l_y \leq 0 \leq u_y\\
0 \lt l_x \leq u_x & & 0 \lt l_y \leq u_y\\
\end{array}
$$

이를 조합해보면 총 9가지 경우의 수가 나오며, 두 구간 모두 0을 포함하는 경우를 제외하고 항상 단일한 값으로 계산할 수 있다. 이를 코드로 구현하면 다음과 같다.

```js
function p(x) {
	return x >= 0;
}

function n(x) {
	return x < 0;
}

function mul_every_case(lx, ux, ly, uy) {
	const p1 = lx * ly;
	const p2 = lx * uy;
	const p3 = ux * ly;
	const p4 = ux* uy;
	return make_interval(Math.min(p1, p2, p3, p4), Math.max(p1, p2, p3, p4));
}


function mul_interval(x, y) {
	const lx = lower_bound(x);
	const ux = upper_bound(x);
	const ly = lower_bound(y);
	const uy = upper_bound(y);
	return n(lx) && n(ux) && n(ly) && n(uy)
		? make_interval(ux * uy, lx * ly)
		: n(lx) && n(ux) && n(ly) && p(uy)
		? make_interval(lx * uy, lx * ly)
		: n(lx) && n(ux) && p(ly) && p(uy)
		? make_interval(lx * uy, ux* ly)
		: n(lx) && p(ux) && n(ly) && n(uy)
		? make_interval(ux * ly , lx * ly)
		: n(lx) && p(ux) && p(ly) && p(uy)
		? make_interval(lx * uy , ux * uy)
		: p(lx) && p(ux) && n(ly) && n(uy)
		? make_interval(ux * ly, lx * uy)
		: p(lx) && p(ux) && n(ly) && p(uy)
		? make_interval(ux * ly , ux * uy)
		: p(lx) && p(ux) && p(ly) && p(uy)
		? make_interval(lx * ly, ux * uy)
		: mul_every_case(lx, ux, ly, uy); // 두 구간 모두 0을 포함하는 경우
}
```

다음은 테스트 케이스이다.

```js
function print_interval(int) {
	console.log("(" + head(int) + ", " + tail(int) + ")");
}

const x1 = make_interval(-3, -2);
const x2 = make_interval(-1, 1);
const x3 = make_interval(3, 4);

const y1 = make_interval(-4, -2);
const y2 = make_interval(0, 3);
const y3 = make_interval(2, 5);

print_interval(mul_interval(x1, y1)); // (4, 12)
print_interval(mul_interval(x1, y2)); // (-9, 0)
print_interval(mul_interval(x1, y3)); // (-15, -4)
print_interval(mul_interval(x2, y1)); // (-4, 4)
print_interval(mul_interval(x2, y2)); // (-3, 3)
print_interval(mul_interval(x2, y3)); // (-5, 5)
print_interval(mul_interval(x3, y1)); // (-16, -6)
print_interval(mul_interval(x3, y2)); // (0, 12)
print_interval(mul_interval(x3, y3)); // (6, 20)
```


### 2.12

```js
function make_center_percent(c, p) {
	return make_interval(c - c * p, c + c * p);
}

function center(i) {
	return (lower_bound(i) + upper_bound(i)) / 2;
}

function width(i) {
	return (upper_bound(i) - lower_bound(i)) / 2;
}

function percent(i) {
	return width(i) / center(i);
}
```


### 2.13

서로 다른 퍼센트 허용오차(모두 양수라고 가정)에 대해 곱의 결과는 다음과 같다.

$$
\begin{array}{cll}
(c_1(1 - p), c_1(1 + p)) \times (c_2(1 - p), c_2(1 + p))&\Rightarrow & (c_1c_2(1 - p_1)\cdot(1 - p_2), c_1c_2(1 + p_1)\cdot(1 + p_2)) \\
& = & (c_1c_2(1 - p_1 - p_2 + p_1p_2), c_1c_2(1 + p_1 + p_2 + p_1p_2)) \\
& \approx & (c_1c_2(1 - p_1 - p_2), c_1c_2(1 + p_1 + p_2))
\end{array}
$$

$p_1$, $p_2$가 충분히 작다고 할 때 곱한 값은 각각의 값에 비해 무시할정도로 작으므로 위와 같이 근사가 가능하다.

위의 식으로부터 곱의 center는 $c_1c_2$, 퍼센트(tolerance)는 $p_1 + p_2$로 간단히 계산할 수 있다.


### 2.14

A/A, A/B 테스트를 하다보면 center는 거의 정확한 값이 나오는데, percent의 값이 두 구간의 percent의 합과 비슷한 값이 나오는 것을 확인할 수 있다. 즉, div_interval은 구간의 불확실한 정도를 높이는 연산임을 알 수 있다.

렘이 제시한 par1과 par2는 이 불확실성과 관련된 연산에 있어 차이가 나타난다.

par1의 경우 mul_interval로 r1과 r2의 percent가 더해지고, 거기에 add_interval로 인한 percent가 div_interval 연산에 의해 더해짐으로써 불확실한 정도가 2번 증가하는 것을 볼 수 있다. 반면 par2의 경우 one이라는 정확한 값을 통해 div_interval을 계산했기 때문에 r1, r2가 기존에 갖고 있던 percent를 거의 그대로 들고 있게 되고, add_interval과 바깥쪽 div_interval은 해당 percent를 미미하게 변화시키기 때문에 par1과 다른, 보다 정확한 percent의 구간을 계산할 수 있다.


### 2.15

2.14에서 설명했듯이, 불확실한 수치를 지칭하는 이름이 딱 한 번씩만 나오는 경우 불확실한 수치를 가진 구간의 불확실한 정도가 그대로 유지되는 것을 볼 수 있다. 따라서 에바의 주장은 옳다.


### 2.16

동등한 수식을 계산할 때 불확실한 수치를 지칭하는 이름의 횟수가 달라질 수 있으며 이로 인해 구간 산술 연산 시 서로 다른 결과를 낼 수 있다.

구간이 모두 양수라고 가정하면 식을 정리하여 다음과 같이 정확한 값에 대한 식을 만들어낼 수 있을 것이다.


$$
\begin{array}{}
A / B &: &(\frac{c_1(1 - p_1)}{c_2(1 + p_2)}, \frac{c_1(1 + p_1)}{c_2(1 - p_2)})\\
&\cdots\\
percent &: &\frac{p_1 + p_2}{1 + p_1p_2}
\end{array}
$$

아직 완전히 이해하진 못했지만 임의의 함수가 주어졌을 때 완벽한 구간 산술연산을 구현하는 것은 매우 어려운 문제라고 한다.(아래 링크 참고)

[2.16에 대한 설명](https://stackoverflow.com/questions/14130878/sicp-2-16-interval-arithmetic-scheme)
[dependency problem](https://en.wikipedia.org/wiki/Interval_arithmetic#Dependency_problem)
