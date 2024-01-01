### 2.46

```js
function make_vect(xcor, ycor) {
	return pair(xcor, ycor);
}

function xcor_vect(v) {
	return head(v);
}

function ycor_vect(v) {
	return tail(v);
}

function add_vect(v1, v2) {
	return make_vect(
		xcor_vect(v1) + xcor_vect(v2),
		ycor_vect(v1) + ycor_vect(v2)
	);
}

function sub_vect(v1, v2) {
	return make_vect(
		xcor_vect(v1) - xcor_vect(v2),
		ycor_vect(v1) - ycor_vect(v2)
	);
}

function scale_vect(v, scale) {
	return make_vect(scale * xcor_vect(v), scale * ycor_vect(v));
}
```


### 2.47

list로 정의한 경우 i번째 index 값을 선택할 수 있는 list_ref 메서드를 사용할 수 있다.

```js
function make_frame(origin, edge1, edge2) {
	return list(origin, edge1, edge2);
}

function origin_frame(frame) {
	return list_ref(frame, 0);
}

function edge1_frame(frame) {
	return list_ref(frame, 1);
}

function edge2_frame(frame) {
	return list_ref(frame, 2);
}
```


```js
function make_frame(origin, edge1, edge2) {
	return pair(origin, pair(edge1, edge2));
}

function origin_frame(frame) {
	return head(frame);
}

function edge1_frame(frame) {
	return head(tail(frame));
}

function edge2_frame(frame) {
	return tail(tail(frame));
}
```


### 2.48

```js
function make_segment(start_vect, end_vect) {
	return pair(start_vect, end_vect);
}

function start_segment(segment) {
	return head(segment);
}

function end_segment(segment) {
	return tail(segment);
}
```


### 2.49

frame의 각 꼭짓점을 구하는 함수를 활용하면 좀 더 간단히 작성할 수 있다.

```js
function left_top_frame(frame) {
	return add_vect(origin_frame(frame), edge1_frame(frame));
}

function right_top_frame(frame) {
	return add_vect(
		origin_frame(frame),
		add_vect(edge1_frame(frame), edge2_frame(frame))
	);
}

function right_bottom_frame(frame) {
	return add_vect(origin_frame(frame), edge2_frame(frame));
}
```

#### a. 주어진 액자의 테두리를 그리는 화가

```js
function boundary_painter(frame) {
	const left_top = left_top_frame(frame);
	const right_top = right_top_frame(frame);
	const right_bottom = right_bottom_frame(frame);

	return segments_to_painter(list(
		make_segment(origin, left_top),
		make_segment(left_top, right_top),
		make_segment(right_top, right_bottom),
		make_segment(right_bottom, origin))
	);
}
```

#### b. 주어진 액자의 꼭짓점들을 대각선 방향으로 연결해서 X자를 그리는 화가

```js
function diagonal_painter(frame) {
	const left_top = left_top_frame(frame);
	const right_top = right_top_frame(frame);
	const right_bottom = right_bottom_frame(frame);
	  
	return segments_to_painter(
		list(make_segment(left_top, right_bottom), make_segment(origin, right_top))
	);
}
```

#### c. 주어진 액자의 각 변 중점을 연결해서 마름모꼴(다이아몬드)을 그리는 화가

```js
function diamond_painter(frame) {
	const left_center = mid_vect(origin_frame(frame), left_top_frame(frame));
	const top_center = mid_vect(left_top_frame(frame), right_top_frame(frame));
	const right_center = mid_vect(right_top_frame(frame), right_bottom_frame(frame));
	const bottom_center = mid_vect(origin_frame(frame), right_bottom_frame(frame));
	  
	return segments_to_painter(list(
		make_segment(left_center, top_center),
		make_segment(top_center, right_center),
		make_segment(right_center, bottom_center),
		make_segment(bottom_center, left_center)
	));
}
```

#### d. wave 화가

아이c


### 2.50

```js
function flip_horiz(painter) {
	return transform_painter(painter,
		make_vect(1, 0),
		make_vect(1, 1),
		make_vect(0, 0));
}

function rotate180(painter) {
	return flip_horiz(flip_vert(painter));
}

function rotate270(painter) {
	return rotate180(rotate90(painter));
}
```


### 2.51

첫 번째 방법
```js
function below(painter1, painter2) {
	const split_point = make_vect(0, 0.5);
	const paint_top = transform_painter(painter2,
		split_point,
		make_vect(0, 1),
		make_vect(1, 0.5));
	const paint_bottom = transform_painter(painter1,
		make_vect(0, 0),
		split_point,
		make_vect(1, 0));

	return frame => {
		paint_top(frame);
		paint_bottom(frame);
	};
}
```

두 번째 방법
```js
function below(painter1, painter2) {
	return rotate90(beside(rotate270(painter1), rotate270(painter2)));
}
```


### 2.52
// TODO
#### a. 선분 추가?

```js

```


#### b. corner_split 구축 패턴 변경

```js

```


#### c. square_of_four 사용해서 square_limit 수정해보기

```js

```
