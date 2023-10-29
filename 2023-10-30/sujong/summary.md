# 1.2 함수와 과정


함수란 계산적 과정의 local evolution(국소 전개)에 관한 패턴!

## 1.2.1 Linear Recursion & Iteration
### Factorial

factorial의 정의는 다음과 같다.

$$
n! = n\cdot (n−1)\cdot(n−2)\cdots3\cdot2\cdot1
$$

이를 점화식(recurrence relation)으로 표현하면 다음과 같다.

$$
factorial(n) = n \times factorial(n - 1)
$$

팩토리얼을 구현하는 방식은 여러 가지가 있을 수 있으나 위의 점화식을 통해 그대로 작성하면 다음과 같다.

```js
function factorial(n) {
	return n === 1 ? 1 : n * factorial(n - 1);
}
```

이와 다른 방식으로, **중간 곱셈 결과를 담는 counter를 두고** 다음 규칙에 따라 카운터와 곱을 함께 갱신하는 방법은 다음과 같다.

```js
function factorial(n) {
	return fact_iter(1, 1, n);
}
function fact_iter(product, counter, max_count) {
	return counter > max_count ? product : fact_iter(counter * product, counter + 1, max_count);
}
```

위의 두 과정은 결과에 있어선 차이가 없으나 계산 과정에 있어 큰 차이가 있다.

> 첫 번째 방식의 치환 모델 : 선형 재귀적 과정의 factorial
> 
> 전개 -> 축약 과정을 거쳐 계산되며, 전개를 보면 지연된 연산(deferred operation)들의 사슬을 구축함에 따라 일어남
> *재귀적 과정(recursive process)* : 지연된 연산들의 사슬을 통해 일어나는 과정
>
> 이 과정을 수행하기 위해 해석기는 나중에 수행할 연산들을 기억해야 하며, *스택*이라는 영역에 따로 저장됨
> n!의 경우 계산할 때 지연된 곱셈 사슬의 길이는 n에 linear하게 비례하는데 이런 과정을 *linear recursive process(선형 재귀적 과정)*이라 함!!!

> 두 번째 방식의 치환 모델 : 선형 반복적 과정의 factorial
> 
> 전개 -> 축약 과정이 없으며 각 단계에서 기억된 product, counter, max_count 값을 통해 새로운 값을 계산함
> *반복적 과정(iterative process): 과정의 상태를 고정된 개수의 상태 변수(state variable)들과 변수들이 갱신되는 규칙, 종료 조건 등을 통해 일어나는 과정*
>
> n!의 경우 반복적 과정에서 필요한 단계 수가 n에 선형적으로 증가하는데 이런 과정을  *linear iterative process(선형 반복적 과정)*이라 함!!!

- 혼동하지 말아야 할 점은, **재귀 함수**와 **재귀적 과정**은 서로 다른 개념이라는 것이다. 함수가 재귀적인 것은 함수 선언에서 함수가 자기 자신을 참조한다는 구문상의 사실 말하며, 과정이 재귀적이라는 것은 과정이 어떤 식으로 전개되는가에 관한 것이다!!

### tmi

위의 함수들이 Node에서 사용하는 메모리를 측정해볼 수 있는데 결과는 다음과 같다.

```js
function factorial_linear_recursive(n) {
	return n === 1 ? 1 : n * factorial_linear_recursive(n - 1);
}

function factorial_linear_iterative(n) {
	return fact_iter(1, 1, n);
}

function fact_iter(product, counter, max_count) {
	return counter > max_count ? product : fact_iter(counter * product, counter + 1, max_count);
}

// linear rescursive factorial memory usage
const initialMemoryUsageRec = process.memoryUsage().heapUsed;
factorial_linear_recursive(20);
const finalMemoryUsageRec = process.memoryUsage().heapUsed;
const usedMemoryRec = finalMemoryUsageRec - initialMemoryUsageRec;

// linear iterative factorial memory usage
const initialMemoryUsageIter = process.memoryUsage().heapUsed;
factorial_linear_iterative(20);
const finalMemoryUsageIter = process.memoryUsage().heapUsed;
const usedMemoryIter = finalMemoryUsageIter - initialMemoryUsageIter;

console.log(`Used memory 1: ${usedMemoryRec} bytes`); // 1144 bytes
console.log(`Used memory 2: ${usedMemoryIter} bytes`); // 1196 bytes
```

### 꼬리 재귀적(tail-recursive) 구현

// TODO

## 1.2.2 트리 재귀
### 피보나치 수열
```js
function fib(n) {
	return n == 0 ? 0 : n === 1 ? 1 : fib(n - 1) + fib(n - 2);
}
```

위 함수의 계산 과정은 트리 모양으로 전개되며, 각 수준에서 branch가 둘씩 갈라져 나오며 함수가 호출된다.

- Fib(n)이 $\phi^{n}/\sqrt{5}$ 에 가까운 정수에 대한 증명은 연습문제 1.13 풀이 확인

> 피보나치와 같은 계산에서 나타나는 단계의 수는 입력에 대해 **지수적으로 증가**한다.
> 트리 재귀적 과정에 필요한 단계의 수는 트리의 노드 수에 비례하고, 필요한 공간은 트리의 최대 깊이에 비례!!

이를 반복적 과정 함수로 바꾸면 다음과 같다.
```js
function fib(n) {
	return fib_iter(1, 0, n);
}
function fib_iter(a, b, count) {
	return count = 0 ? b : fib_iter(a + b, a, count - 1);
}
```

이 함수는 선형 반복이기 때문에 앞선 트리 재귀보다 훨씬 효율적!!!
- 그렇다면 트리 재귀는 쓸모가 없나? => No!!
- 트리 재귀가 프로그램의 이해와 설계에 도움이 되며, 수학적 정의를 통해 좀 더 직관적으로 코드를 작성할 수 있다는 장점이 있음

### 잔돈 만들기

여러 종류의 동전들로 임의의 금액을 조합하는 방법은 몇가지일까? 아래 알고리즘을 이용해 해결할 수 있다.

> n가지 동전을 이용해 금액 a를 만드는 방법의 수는,
> - 첫 번째 종류의 동전을 제외한 나머지 동전들로 금액 a를 만드는 방법에
> - n가지 종류의 동전들을 모두 사용해 금액 a-d를 만드는 방법의 수를 더한 것과 같음

```js
function count_change(amount) {
	return cc(amount, 5);
}
function cc(amount, kinds_of_coins) {
	return amount === 0
		? 1
		: amount < 0 || kinds_of_coins === 0
		? 0
		: cc(amount, kinds_of_coins - 1) + cc(amount - first_denomination(kinds_of_coins), kinds_of_coins);
}
function first_denomination(kinds_of_coins) {
	return kinds_of_coins === 1 ? 1
		: kinds_of_coins === 2 ? 5
		: kinds_of_coins === 3 ? 10
		: kinds_of_coins === 4 ? 25
		: kinds_of_coins === 5 ? 50
		: 0;
}
```


## 1.2.3 증가 차수(Order of Growth)

> **order of growth**: 입력이 커짐에 따라 과정이 요구하는 자원의 양을 대략 측정한 것
> 충분히 큰 임의의 n에 대해 다음 부등식을 만족하며 n과 독립인 양의 상수 $k_1$ 와 $k_2$ 가 존재할 때 $R(n)=\Theta(f(n))$으로 표기함

$$
k_1f(n) \leq R(n) \leq k_2f(n)
$$


> **big O notation** : 증가 차수를 수학적으로 표현하는 방법 중 하나

앞선 예시들을 보면,(호출 횟수, depth라고 생각하면 편함)
- factorial : 단계수 = $\Theta(n)$, 공간 = $\Theta(n)$
- fibonacci(tree) : 단계수 = $\Theta(\phi^n)$, 공간 = $\Theta(n)$


## 1.2.4 거듭제곱

#### 재귀적 정의
$$
\begin{array}{ccl}
& b^n & = & b \cdot b^{n-1}\\
& b^0 & = & 1
\end{array}
$$

```js
function expt(b, n) {
	return n === 0 ? 1 : b * expt(b, n - 1);
}
```

선형 재귀적 과정이며, 단계 수와 공간은 $\Theta(n)$이다. 이를 반복적 과정으로 바꾸면 다음과 같다.

```js
function expt(b, n) {
	return expt_iter(b, n, 1);
}
function expt_iter(b, counter, product) {
	return counter === 0 ? product : expt_iter(b, counter - 1, b * product);
}
```

이 경우 단계 수는 $\Theta(n)$, 공간은 $\Theta(1)$임을 알 수 있다.

이 때 expt에서 계산하는 과정은 중복된 계산들이 있는데 *연속제곱(successive squaring)* 을 활용해 필요한 단계 수를 줄일 수 있다.

$$
\begin{array}{cccl}
& b^n & =  &(b^{n/2})^2 &&& n\,even \\
& b^n & =  &b\cdot b^{n-1} &&& n\,odd
\end{array}
$$


```js
function is_even(n) {
	return n % 2 === 0;
}
function fast_expt(b, n) {
return n === 0 ? 1 : is_even(n) ? square(fast_expt(b, n / 2)) : b * fast_expt(b, n - 1);
}
```

이 경우 지수를 계산하는 횟수가 2로 계속 나눠지기 때문에 단계 수가 줄어 $\Theta(log{n})$임을 확인할 수 있다.
