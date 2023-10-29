## 연습문제 1.9

첫번째 코드는 재귀적이고, 두번째 코드는 반복적이다. 재귀와 반복은 '과정이 어떤 식으로 전개되는 가'로 판단할 수 있는데, 첫번째는 과정의 상태가 체인이 길어지는 형태로 유지(재귀적)되는 반면 두번째는 과정의 상태가 변수에 의해 캡쳐(반복적)되기 때문이다.

[CODE 1]

```js
function plus(a, b) {
  return a === 0 ? b : inc(plus(dec(a), b));
}
```

```
plus(4, 5)
inc(plus(dec(4),5)) > inc(plus(3,5))
inc(inc(plus(dec(3),5))) > inc(inc(plus(2,5)))
inc(inc(inc(plus(dec(2),5)))) > inc(inc(inc(plus(1,5)))))
inc(inc(inc(inc(plus(dec(1),5))))) > inc(inc(inc(inc(plus(0,5)))))
inc(inc(inc(inc(plus(0,5))))) >inc(inc(inc(inc(5))))
inc(inc(inc(6)))
inc(inc(7))
inc(8)
9
```

[CODE 2]

```js
function plus(a, b) {
  return a === 0 ? b : plus(dec(a), inc(b));
}
```

```
plus(4, 5)
plus(dec(4),inc(5)) > plus(3,6)
plus(dec(3),inc(6)) > plus(2,7)
plus(dec(2),inc(7)) > plus(1,8)
plus(dec(1),inc(8)) > plus(0,9)
9
```

## 연습문제 1.10

```js
A(1, 10) > 2^10
A(2, 4) > 2^(2^4)
A(3, 3) > 2^27 (??확인 필요함??)

f(n) > 2n
g(n) > 2^n
h(n) > 2^(2^n)
```

```js
A(2, 4)
A(1, A(2,3))
A(1, A(1, A(2,2)))
A(1, A(1, A(1, A(2,1))))
A(1, A(1, A(1, 2)))
A(1, A(1, A(0, A(1,1))))
A(1, A(1, A(0, 2)))
A(1, A(1, 2*2))
A(1, A(0, A(1, 2*2-1)))
A(1, A(0, A(0, A(1, 2*2-2))))
A(1, A(0, A(0, A(0, A(1, 2*2-3)))))
A(1, A(0, A(0, A(0, 2))))
A(1, A(0, A(0, 2*2)))
A(1, A(0, 2*2*2))
A(1, 2*2*2*2)
A(0, A(1, 16-1))
A(0, A(0, A(1, 16-2)))
A(0, A(0, A(0, A(1, 16-3))))

... 반복하다 보면
A(0,A(0,A(0,A(0,A(0,A(0,A(0,A(0,A(0,A(0,A(0,A(0,A(0,A(0,A(0,A(1,16-15)))))))))))))))
A(0,A(0,A(0,A(0,A(0,A(0,A(0,A(0,A(0,A(0,A(0,A(0,A(0,A(0,A(0,A(1,1)))))))))))))))
A(0,A(0,A(0,A(0,A(0,A(0,A(0,A(0,A(0,A(0,A(0,A(0,A(0,A(0,A(0,2))))))))))))))

2^16

```

## 연습문제 1.11

```js
// 재귀적
function example_re(n) {
	if (n < 3) return n;
	return example(n - 1) + 2 * example(n - 2) + 3 * example(n - 3);
}

// 반복적
fucniont exampe_it(n){
	if(n < 3) return n
	return inner(4, 2, 1, n-3)
}

function inner(a, b, c, counter){
	if(counter === 0) return a
	return inner(a+2b+3c, a, b, counter-1)
}

// f(3) = f(2) + 2f(1) + 3f(0) = 2 + 2*1 + 3*0
// f(4) = f(3) + 2f(2) + 3f(1)
```

## 연습문제 1.12

파스칼의 삼각형

```
1 - 1(1)
1 1 - 2(2 : 2^0) `1*2` = 1+ `1*2`
1 2 1 - 4(3 : 2^1) `2*2` = 1+ `1*2` + `2*2`
1 3 3 1 - 8(4 : 2^2) `4*2` = 1+ `1*2` + `2*2` + `4*2`
1 4 6 4 1 -16(5 : 2^3) `8*2` = 1+ `1*2` + `2*2` + `4*2`+ `8*2`
```

```js
function pascal(n) {
  if (n <= 1) return n;
  return pascal(n - 1) + 2 ** (n - 2) * 2;
}
```

## 연습문제 1.13

## 연습문제 1.14

![example](https://github.com/js-sicp/sicp/assets/78922001/ba443869-2d00-4fce-885f-0f86058a0607)

공간은 선형(n+코인종류)적, 단계는..

## 연습문제 1.15

a. 5번

```js
since(12.15) > p(p(p(p(p(0.05))))
```

b.

## 연습문제 1.16 - 19
