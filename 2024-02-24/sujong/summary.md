## 2.5.3 예제: 기호 대수

### 다항식 산술

일반적으로 다항식은 특정한 변수를 기준으로 정의되며 이를 **미지수(indeterminate)** 라고 한다. 다항식의 정의에 있어 까다로운 문제가 있는데, 다항식 산술 프로그램이 아래의 두 식을 동일하게 인식하는가에 대한 문제이다.

$$
\begin{align}
5x^2 + 3x + 7\\
5y^2 + 3y + 7
\end{align}
$$

순수한 수학 함수로 본다면 동일하겠지만 일종의 구문형으로 간주한다면 다를 것이다. 여기선 수학적 의미를 다루지 않고 특정 구문형으로 간주해 식을 다룰 것이다.

```js
 function add_poly(p1, p2) {
	 return is_same_variable(variable(p1), variable(p2))
		 ? make_poly(variable(p1),
			 add_terms(term_list(p1), term_list(p2)))
		: error(list(p1, p2), "polys not in same var -- add_poly");
 }

function mul_poly(p1, p2) {
	return is_same_variable(variable(p1), variable(p2))
		 ? make_poly(variable(p1),
			 mul_terms(term_list(p1), term_list(p2)))
		: error(list(p1, p2), "polys not in same var -- add_poly");
}
```

