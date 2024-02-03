

## 2.3.4 허프먼 부호화 트리

### 고정 길이 부호(fixed-length code)


### 가변 길이 부호(variable-length code)

데이터를 좀 더 효율적으로 부호화 가능


### 허프먼 트리 만들기


### 허프먼 트리의 표현

트리의 잎 노드들은 문자열 "leaf"와 문자, 빈도수로 구성된 리스트로 표현된다.

```js
function make_leaf(symbol, weight) {
    return list("leaf", symbol, weight);
}

function is_leaf(object) {
    return head(object) === "leaf";
}

function symbol_leaf(x) {
    return head(tail(x));
}

function weight_leaf(x) {
    return head(tail(tail(x)));
}
```

트리는 "code_tree"라는 문자열과 왼쪽 가지, 오른쪽 가지, 기호들의 집합, 그리고 가중치로 구성된 목록으로 표현한다.

```js
function make_code_tree(left, right) {
    return list("code_tree", left, right, append(symbols(left), symbols(right)), weight(left) + weight(right));
}
```

```js
function left_branch(tree) {
    return head(tail(tree));
}

function right_branch(tree) {
    return head(tail(tail(tree)));
}

function symbols(tree) {
    return is_leaf(tree)
        ? list(symbol_leaf(tree))
        : head(tail(tail(tail(tree))));
}

function weight(tree) {
    return is_leaf(tree)
        ? weight_leaf(tree)
        : head(tail(tail(tail(tail(tree)))));
}
```


```js
function decode(bits, tree) {
    function decode_1(bits, current_branch) {
        if (is_null(bits)) {
            return null;
        } else {
            const next_branch = choose_branch(head(bits), current_branch);
            return is_leaf(next_branch)
                ? pair(symbol_leaf(next_branch), decode_1(tail(bits), tree))
                : decode_1(tail(bits), next_branch);
        }
    }
}

function choose_branch(bit, branch) {
    return bit === 0
        ? left_branch(branch)
        : bit === 1
        ? right_branch(branch) 
        : error(bit, "bad bit -- choose_branch");
}
```

### 가중 원소 집합

```js

```
