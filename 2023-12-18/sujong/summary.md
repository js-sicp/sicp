## 2.2.4 예제: 그림 언어

요소로 painter(화가) 하나만을 갖는 우아한 언어를 살펴보고자 한다.

- flip_vert : 하나의 화가를 입력받아 이미지를 수직 반전한 이미지 생성
- flip_horiz : 하나의 화가를 입력받아 이미지를 수평 반전한 이미지 생성
- beside : 두 화가를 입력받아 왼쪽 절반에 첫 화가의 이미지를, 오른쪽 절반에 둘째 화가의 이미지 배치
- below : 두 화가를 입력받아 첫 화가의 이미지를 둘째 화가의 이미지 아래에 배치

이 복합 이미지 구축 함수들을 활용해 다양한 그림들을 생성할 수 있다.

```js
function flipped_pairs(painter) {
	const painter2 = beside(painter, flip_vert(painter));
	return below(painter2, painter2);
}

const wave4 = flipped_pairs(wave); // wave와 flip_vert된 이미지가 수평-수직으로 연결되는 그림 생성
```

함수이기 때문에 재귀적 연산 또한 가능하다. 다음 코드는 오른쪽으로 더 작은 painter들을 연결해가는, 기존 사이즈와 동일한 그림을 생성하는 함수이다.

```js
function right_split(painter, n) {
	if (n === 0) {
		return patiner;
	} else {
		const smaller = right_split(painter, n - 1);
		return beside(painter, below(smaller, smaller));
	}
}
```

위와 같이 한 쪽 방향으로 재귀적 이미지를 생성할 수 있게 되면 아래와 같이 한 쪽 방향 모서리로 재귀적인 이미지를 생성할 수 있으며,

```js
function corner_split(painter, n) {
	if (n === 0) {
		return painter;
	} else {
		const up = up_split(painter, n - 1);
		const right = right_split(painter, n - 1);
		const top_left = beside(up, up);
		const bottom_right = below(right, right);
		const corner = corner_split(painter, n - 1);
		return beside(below(painter, top_left), below(bottom_right, corner));
	}
}
```

사방으로 이미지를 생성하는 함수를 square_limit로 정의하면 아래와 같이 사방으로 대칭인 이미지를 생성하는 함수를 작성할 수 있다.

```js
function square_limit(painter, n) {
	const quarter = corner_split(painter, n);
	const half = beside(flip_horiz(quarter), quarter);
	return below(flip_vert(half), half);
}
```

### 고차 연산

앞선 예시와 같이 화가들을 조합하는 패턴을 추상하는 것에서 한 차원 올라가 화가 연산들을 조합하는 패턴 또한 추상화가 가능하다. 즉, 연산들을 받아 새로운 연산을 돌려주는 함수를 작성할 수 있다.

예를 들어 화가 영역을 4등분 하여 각 영역에 서로 다른 painter를 그린다고 하면, 다음과 같이 각 영역의 painter를 그리는 화가 연산들을 입력받아 네 부분을 채우는 고차 함수를 작성할 수 있다.

```js
function square_of_four(tl, tr, bl, br) {
	return painter => {
		const top = beside(tl(painter), tr(painter));
		const bottom = beside(bl(painter), br(painter));
		return below(bottom, top);
	}
}
```

위 고차함수를 활용하면 세부적인 연산들을 노출하지 않고 다음과 같이 square_limit를 더 간단히 작성할 수 있다.

```js
function square_limit(painter, n) {
	const combine4 = square_of_four(flip_horiz, identity, rotate180, flip_vert);
	return combine4(corner_split(painter, n));
}
```
