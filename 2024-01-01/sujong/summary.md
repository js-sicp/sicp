### 액자 객체

그림의 틀을 나타내는 액자 객체는 다음과 같이 구현할 수 있다.

- 액자가 놓일 위치를 결정하는 원점 벡터(origin vector)
- 꼭짓점들을 결정하는 변(edge vectors)

위 요소를 갖는 액자는 make_frame을 통해 객체를 생성하며 origin_frame, edge1_frame, edge2_frame 선택자를 갖고 있다고 가정하자. 또한 액자는 *액자 좌표 맵(frame coordinate map)* 을 갖는데 이 맵은 이미지를 액자에 맞게 기울이고 비례시키는 역할을 한다고 하자. 이 때 액자 좌표 맵 생성자는 다음과 같이 작성할 수 있다.

```js
function frame_coord_map(frame) {
	return v => add_vect(origin_frame(frame),
		add_vect(scale_vect(xcor_vect(v), edge1_frame(frame)),
			scale_vect(ycor_vect(v), edge2_frame(frame)))
	)
}
```


### 화가 요소

화가는 함수이며, 화가를 나타내는 함수는 주어진 액자에 맞게 기울이고 비례시킨 이미지를 생성
- p : 화가 요소, f : 액자 => p(f) : 액자에 맞는 이미지

예를 들어 두 점을 잇는 직선 선분(segment)을 그리는 draw_line이라는 함수가 있다고 가정하자. 그러면 아래와 같이 선분이 담긴 목록으로 하나의 선 그림을 그리는 화가를 만들 수 있다.

```js
function segments_to_painter(segment_list) {
	return frame => 
		for_each(segment => 
			draw_line(frame_coord_map(frame)(start_segment(segment)),
				frame_coord_map(frame)(end_segment(segment))),
				segment_list);
}
```

위와 같이 화가 요소를 함수로 표현하면 그림 언어에 강력한 추상화 장벽이 세워지며 모든 종류의 원시 화가 요소를 다양한 그래픽 기능에 기초해서 만들고 조합할 수 있다!


### 화가 요소의 변환과 조합

기존의 painter-frame은 주어진 액자를 변형한 액자로 원본 화가 요소를 호출하는 식으로 작동했다. 예를 들어 flip_vert는 화가 요소가 이미지를 어떻게 뒤집는지는 알지 못할 뿐 액자 자체를 상하로 뒤집는다. 이런 방식으로 화가 요소의 변환을 추상화할 수 있는데 화가 요소에 대한 연산들은 transform_painter 함수에 기초해 작성할 수 있다.

- transform_painter : 새 프레임의 꼭짓점들을 결정하는 벡터들을 받아 액자를 변환하고 변환된 액자로 원래의 화가를 호출하는 함수

```js
function transform_painter(painter, origin, corner1, corner2) {
	return frame => {
		const m = frame_coord_map(frame);
		const new_origin = m(origin);
		return painter(make_frame(new_origin,
			sub_vect(m(corner1), new_origin),
			sub_vect(m(corner2), new_origin)));
	};
}
```

위 함수를 활용해 기존의 flip_vert를 새로 정의할 수 있다.

```js
function flip_vert(painter) {
	return transform_painter(painter,
		make_vect(0, 1),  // new origin
		make_vect(1, 1),  // new edge_frame1
		make_vect(0, 0)); // new edge_frame2
}
```

화가의 이미지를 주어진 액자의 오른쪽 윗부분으로 축소하는 화가도 transform_painter를 활용해 다음과 같이 작성할 수 있다.

```js
function shrink_to_upper_right(painter) {
	return transform_painter(painter,
		make_vect(0.5, 0.5),
		make_vect(1, 0.5),
		make_vect(0.5, 1));
}
```

또한 (정사각형)이미지를 반시계방향으로 90도 회전하는 화가는 다음과 같다.

```js
function rotate90(painter) {
	return transform_painter(painter,
		make_vect(1, 0),
		make_vect(1, 1),
		make_vect(0, 0));
}
```

이미지를 액자 중심 부분으로 축소하는 화가는 다음과 같다.

```js
function squash_inwards(painter) {
	return transform_painter(painter,
		make_vect(0, 0),
		make_vect(0.65, 0.35),
		make_vect(0.35, 0.65));
}
```

기존에 잘 작동한다고 가정하고 썼던 beside도 다음과 같이 만들 수 있다.

```js
function beside(painter1, painter2) {
	const split_point = make_vect(0.5, 0);
	const paint_left = transform_painter(painter1,
		make_vect(0, 0),
		split_point,
		make_vect(0, 1));
	const paint_right = transform_painter(painter2,
		split_point,
		make_vect(1, 0),
		make_vect(0.5, 1));

	return frame => {
		paint_left(frame);
		paint_right(frame);
	}
}
```

이렇듯 프레임에 대한 연산에만 집중하여 화가 요소에 대해 알지 못해도 그림을 자유롭게 변형할 수 있다.

### 견고한 설계를 위한 언어 수준들

앞선 그림 언어와 같은 추상화를 통해,
- 서로 다른 기본적인 그리기 기능들을 통일된 방식으로 처리 가능
- 조합 수단들이 닫힘 성질을 충족해 복잡한 설계도 손쉽게 구축 가능
  한 장점들을 살펴볼 수 있었다.

> [!계층화된 설계(stratified design)]
>
> 복잡한 시스템은 반드시 일련의 언어들로 서술한 일련의 수준(level)들로 구성해야 한다는 것

점과 선을 서술하는 원시 요소(원시 화가) -> beside, below -> square_of_four -> ...

이러한 계층화된 설계는 프로그램을 견고하게(robust) 만드는 데 도움이 된다!!! 또한 계층화된 설계의 수준들은 각자 서로 다른 어휘(시스템의 특성들을 서술하는)와 능력(시스템을 변경하는)을 제공!!!
