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
	return display("(" + stringify(x_point(p)) + ", " + stringify(y_point(p)) + ")");
}

function midpoint_segment(seg) {
	const ss = start_segment(seg);
	const es = end_segment(seg);
	
	return make_point((x_point(ss) + x_point(es)) / 2, (y_point(ss) + y_point(es)) / 2);
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

