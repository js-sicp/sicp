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
