# 데이터 추상화

- 데이터 객체 형식마다 그 형식의 데이터 객체에 관한 모든 조작을 표현하는 데 사용할 일단의 기본적인 연산들을 정의하고, 그 연산들만으로 데이터를 조작한다는 개념이 있다.

# 추상화 장벽

- 각 수준에서, 추상화 장벽 위에 있는 프로그램은 그 아래 있는 프로그램의 추상화 장벽을 사용한다.
- 각 수준의 함수들은 추상화 장벽을 정의하고 서로 다른 수준들을 연결하는 인터페이스로 작용한다.
- 아주 적은 수의 모듈만 구체적인 자료에 의존하기 때문에, 자료구조를 쉽게 바꿀 수 있다.
- 프로그램을 유연하게 바꿀 수 있다. 유리수 시스템을 예시로 보았을 때, 약분하는 시점을 쉽게 변경할 수 있다. 다른 함수에는 영향을 미치지 않는다.
- 구체에 의존하지말고, 인터페이스에 의존하라.

# 데이터란?

- 데이터란 어떠한 선택자들과 생성자들, 그리고 유효한 표현을 위해 그 함수들이 반드시 충족하는 조건들의 집합으로 정의된다.
  - 유리수 시스템을 예시로 보았을 때 `make_rat(n,d)`라면, n/d 가 성립해야한다.

## pair, head, tail

- 책에서는 어떠한 자료구조도 없이 함수만을 사용해서 pair, head, tail을 구성한다.
- 함수만으로 표현하여, 그 표현이 직관적이지 않더라도 pair, head, tail은 데이터로써 잘 작동한다.