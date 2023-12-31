# 프로그래밍의 기본 요소

**계산적 과정** : 데이터를 조작하는 일정한 패턴인 프로그램(spell)으로 구성된 추상적 존재

- 데이터는 우리가 조작하는 '재료'이며, 함수는 데이터를 다루는 규칙들을 서술한 것!

## 자바스크립트의 원시 요소들(primitives)
### 표현식(expression)

JS Interpreter(해석기) : 자바스크립트의 statement(문장)를 evaluation(해석)하는 장치
- 표현식 문장 : 표현식(expression) + 세미콜론(;)

> 조합(combination) : 다른 표현식을 구성요소로 담고 있는 표현식
>  e.g. 연산자 조합(연산자와 피연산자들로 구성된 표현식), ...

- 곱셈 뺄셈 등의 연산은 왼쪽에서 오른쪽으로 평가되며, 이를 left-association(왼쪽 결합)이라 함

> REPL(read-evaluate-print loop) : 사용자가 입력한 문장을 읽고, 그 문장을 평가하고, 결과를 출력하는 주기를 반복하는 해석기의 작동 방식

### 이름 붙이기와 환경

상수 선언은 "표준 자바스크립트"에서 가장 단순한 추상화 수단!
값에 이름을 붙여 다른 곳에서 사용할 수 있으며, 이를 이용해 더 복잡한 계산적 객체들을 구축해 나갈 수 있음

> 환경(environment; program environment) : (이 책에서만 사용될 용어일지 모르겠지만) 이름-객체 쌍을 저장하고 관리하는 특정한 메모리 공간

### 연산자 조합의 평가

> 연산자 조합의 평가 과정
> 
> 	1. 조합의 피연산자 표현식들을 평가한다.
> 
> 	2. 연산자가 나타내는 함수를 인수(피연산자들의 값)들에 적용한다.

- 조합을 평가하기 위해 먼저 자신의 구성 요소를 평가해야하기 때문에 1단계는 재귀적으로 일어남!
    - 이런 재귀적 평가는 **tree accumulation(트리 누산; 연산을 트리 형태로 나눠 leaf부터 위로 올려보내는 과정)** 을 통해 이뤄짐

이러한 평가를 거듭하다보면 조합이 아니라 원시 표현식(수치나 이름)을 평가하기도 하는데,

> 원시 표현식의 평가 과정
> 
> 	1. 수치의 값은 해당 숫자들이 나타내는 바로 그 값이다.
> 
> 	2. 이름의 값은 현재 환경에서 그 이름에 연관된 객체이다.

* 키워드는 특별한 의미를 지니기 때문에 이름으로 사용할 수 없으며, 이런 조합을 만나는 경우 해석기는 해당 문장을 특별한 방식으로 처리
    * synthetic form(구문형) : 키워드를 포함한 문장(요 책에서만)


## 좀 더 강력한 추상화 기법에 대해서
### 복합 함수

> 함수 선언(function declaration) : compound operation(복합 연산)에 이름을 붙여 그 연산을 하나의 단위로 지칭하는 것!!!!

```js
function      square.         ( x )   { return       x          *          x      ; }
//   To        square       something              take it times itself

function 함수이름(매개변수들) { return 표현식; }
```

함수이름 : 환경 안에서 함수 정의와 연관시킬 기호
매개변수들 : 함수의 본문 안에서 함수의 인수들을 지칭하는 데 사용할 지역 이름들
반환문 : 키워드 return과 반환 표현식(return expression)으로 구성되며, **함수 적용(function application)의 값** 을 산출



> 함수 적용의 평가 과정
> 
> 	1. 적용의 부분식들, 즉 함수 표현식과 인수 표현식들을 각각 평가한다.
> 
> 	2. 함수, 즉 함수 표현식의 값을 인수 표현식 값들에 적용한다.
>
> - 함수 적용 (표현식) : 표현식들로부터 더 큰 표현식을 만드는 또 다른 종류의 조합
    > 	e.g. 함수표현식(인수표현식들)
>
> 여기서 중요한 것은 함수 표현식과 인수 표현식을 "각각 평가한다는 것!!!"
> 	e.g. (isPositive ? add : sub)(1, 2) 와 같은 경우 isPositive에 의해 함수 표현식 값이 먼저 평가되며 add, sub 중 하나가 선택됨

### 함수 적용의 치환 모형

> 하나의 복합 함수를 인수들에 적용하기 위해, 함수의 각 매개변수를 해당 인수로 치환해서 함수의 반환 표현식을 평가한다.

말이 어렵지만 매개변수를 먼저 평가하고 그 값을 함수의 코드블록에 대입해 계산된 결과를 return값으로 반환한다는 뜻!!

> 함수 적용의 치환 모형(substitution model) : 함수 적용의 의미를 결정하는 모형ㅈ

실제로 함수가 계산되는 것을 모델링 하는 것을 말하며, 평가 방식에 따라 다양한 치환 모형이 존재할 수 있음

### 인수 우선 평가 v.s. 정상 순서 평가

해석기의 평가 순서에 따라 함수 적용의 결과가 다르게 나타날 수 있다.

> 인수 우선 평가(적용적 순서 평가) : 먼저 인수들을 평가한 후 적용
> 정상 순서 평가 : 먼저 완전히 전개한 후 축약

자바스크립트는 인수 우선 평가 방식을 사용하는데, 같은 표현식이 여러번 평가되는 비효율을 줄이기 위한 목적 및 치환 모형을 벗어난 함수들에 대해서는 정상 순서 평가가 훨씬 복잡하기 때문!!!

### 조건부 표현식과 술어

> case analysis(사례 분석) : 어떤 조건을 판정해서 그 결과에 따라 서로 다른 연산을 수행하는 방식의 연산 구조

자바스크립트에서는 **조건부 표현식(conditional expression)** 을 이용해 표현 가능!!!

> 조건부 표현식의 구조
> 	술어 ? 귀결 표현식 : 대안 표현식
> 		술어(predicate) : 값이 참/거짓인 표현식
> 		consequent expression(귀결 표현식) & alternative expression(대안 표현식)

$$
표현식의\,\,술어\,\,먼저\,\,평가 \rightarrow(참이면?)\,\,귀결표현식\,\,평가 \,/(거짓이면?)\,\,대안표현식\,\,평가
$$

	* 표현식의 술어가 평가되기 전에 귀결 표현식과 대안 표현식은 평가되지 않음!!!

### 기타 논리 조합 연산들

compound predicate(복합 술어)를 구축하기 위해 여러 논리 조합 연산들을 사용할 수 있음!

- 논리 곱(logical conjunction)
  의미는 and와 대략 비슷하며, $exp_1 \,? \,exp_2 : false$ 의 문법적 설탕(synthetic sugar)!
  $exp_1$ 이 참이면 $exp_2$ 를 평가하고 거짓이면 false를 바로 return

- 논리 합(logical disjunction)
  의미는 or와 대략 비슷하며, $exp_1 \,? \, true : exp_2$ 와 동일

- 논리 부정(logical negation)
  의미는 not!

## 컴퓨터의 함수란

수학에서의 함수는 사물의 성질(property)를 서술하는 성격이 강하다면 컴퓨터의 함수는 뭔가를 하는 방법을 서술하는 성격이 강하다.

> 선언적 지식(declarative knowledge) : 이것은 무엇인가?
> 명령적 지식(imperative knowledge) : 어떻게 하는가?

예를 들어 x의 제곱근을 설명할 때,

	수학 : "제곱해서 x가 되는 수"
	컴퓨터 : "제곱근이 될만한 값 y를 추측해 y 와 x/y의 평균으로 더 나은 추측값을 계산하는 과정을 반복해 계산"

이렇듯 컴퓨터의 함수는 반드시 절차적이어야 하고, 효과적(effective)이어야 한다.

### 뉴턴 방법으로 제곱근 구하기

일반적으로 Newton's method란 임의의 미분 가능한 함수의 해(local solution)를 iteration 방식을 통해 근사값을 계산해나가는 방법을 말한다. 예를 들어, 임의의 미분 가능한 함수가 주어졌을 때,

$$
x_{n+1} = x_{n} - \frac{f(x_n)}{f\prime(x_n)}
$$


를 만족하며, 2의 제곱근을 구한다고 하면, $f(x) = x^2 - 2$ 를 대입해 다음 추측값을 계산할 수 있는데, 이 값을 앞서 설명한 y와 x/y의 평균!
재귀적 방식을 통해 특별한 반복문 없이도 반복 연산(iteration)을 구현 가능!!

### 블랙박스 추상으로서의 함수

앞선 제곱근 계산 문제(코드 작성해볼 것)는 다수의 부분 문제(sqrt_iter, is_good_enough, improve, ...)로 자연스럽게 분해된다. 이 때 분해한 함수들은 우리가 어떤 과정을 거치는지 알 필요도 없이 일련의 계산을 통해 우리가 최종적으로 원하는 "제곱근"을 계산해주며 이를 하나의 "블랙박스"로 취급할 수 있다.

> ***함수적 추상(functional abstraction)*** : 함수 정의의 맥락에서 자신의 결과를 어떻게 계산하는지에 상관 없이 입력값에 대한 결과가 나오도록 하는 개념의 블랙박스화(?)

- 일반적으로 사용자는 함수의 구현 원리를 몰라도 함수를 사용할 수 있어야 하기 때문에 추상화 과정이 중요!!!(이름을 관리하는 것이 중요!)

#### 지역 이름

매개변수 이름은 함수 본문 안에서만 유효한 local name이어야 한다!
이렇듯 함수 선언에서 매개변수 이름은 함수 본문 안에서만 유효한 특별한 역할을 하는데, 이러한 이름을 함수 선언에 바인딩된(bound) 이름이라 함(반대는 자유로움)

> scope(범위) : 주어진 이름의 바인딩이 유효하게 유지되는 문장들의 집합

#### 내부 선언과 블록 구조

> block(블록) : 중괄호 한 쌍
> 	블록 안에서 선언된 이름들은 그 블록 내부로만 한정되며, 이를 중첩한 구조를 가리켜 block structure라고 함

> lexical scoping(어휘순 범위 적용) : 이름의 값이 선언된 위치에 따라 정해지는 방식

블록 구조를 활용해 코드를 이해하기 쉬운 조각들로 나누고, 지역 이름처럼 **격리(isolation)** 할 수 있는데(Algol 60이라는 언어에서 기원) 이를 통해 함수적 추상을 구현한다!
