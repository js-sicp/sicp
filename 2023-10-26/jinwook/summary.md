# intro

- 잘 설계된 시스템은, 모듈식으로 작성된다. 개별 모듈이 따로 작성, 교체, 디버깅 될 수 있는 형태로 제작된다.

# 프로그래밍의 기본 요소

- 원시 표현식
  - 3
- 조합 수단
  - 3 + 3
  - (2\*3) + (3\*6)
- 추상화 수단
  - 상수 선언
    - 이름으로 지칭하는 가장 단순한 추상화 수단
    - 상수 선언을 통해 복잡한 구조의 세부사항을 거듭 명시할 필요가 없음
  - 함수 선언
    - 상수 선언 대비 강력한 추상화 기법
    - 복합 연산에 이름을 붙여 하나의 단위로 지칭
    - 함수를 조합함으로써 새로운 함수를 만들 수 있음
    - 함수 선언을 통해서 상수 선언과 동일한 효과를 얻을 수 있음

# 인수 우선 평가

- 함수와 인수 표현식을 먼저 평가한다.
- js는 인수 우선 평가를 사용한다.
  - 중복된 연산을 피할 수 있다.
  - 치환 모형을 벗어나면, 정상 순서 평가를 파악하기 어렵다.

# 정상 순서 평가

- 인수의 값이 실제로 필요해질 때까지 표현식의 평가를 미룬다.
- 인수의 값이 필요하지 않으면 평가를 하지 않는다.

# 조건부 표현식과 술어

- 술어 ? 귀결-표현식 : 대안-표현식
- 술어가 참이라면, 귀결 표현식만 평가된다.
- 술어가 거짓이라면, 대안 표현식만 평가된다.

# 뉴턴 예제

- 반복문 없이 재귀를 활용하여 반복을 구현
- is_good_enough와 같은 연산을 함수로 구현
  - 추상화 수준을 높임
  - 느슨한 결합, is_good_enough의 기준이 달라진다면 해당 함수만 고치면 됨.

# 블랙박스 추상으로의 함수

- how를 알 필요가 없다. what만 알면 된다. 함수가 어떻게 구현되었는지 몰라도 사용할 수 있어야한다.
- 함수는 세부사항을 숨길 수 있어야한다.
- 함수가 순수해야 한다는 의미와도 동일하다고 느껴진다. 순수하지 않다면 함수가 일으키는 사이드 이펙트를 알아야하며, 이는 함수가 어떻게 구현되었는지 알도록 강제한다.

## 지역 이름

- 함수의 매개변수 이름은, 함수 본문 안에서만 유효한 지역 이름이다.
  - 만일 그렇지 아니한다면, 함수 외부의 정보를 알아야 한다는 것이고 이는 순수하지 않으며, 블랙박스로서의 역할도 수행하지 못한다.

## 내부 선언과 블록 구조

- 함수의 지역 이름은 함수의 스코프 내에서만 유효하다.
- 어떤 하나만을 함수를 구성하기 위해 제작된 모듈은 해당 함수 내부로 옮기면 좋다.
  - 다른 함수는 사용자에게 혼란을 준다.
  - 같은 이름의 함수를 선언하면 안된다.
  - 함수의 매개변수를 간단하게 선언할 수 있다.
    - 스코프 체이닝을 활용하여 자식 함수(지역 이름)는 부모 함수의 인자에 접근할 수 있다.
    - 부모 함수의 인자를 자유 이름으로 활용할 수 있다.
