### 2.66

```js
function lookup(given_key, tree_of_records) {
    if (is_null(tree_of_records)) {
        return false;
    } else {
        const entry = entry(tree_of_records);
        const key = key(entry);
        return given_key === key
            ? entry
            : given_key < key
            ? lookup(given_key, left_branch(tree_of_records))
            : lookup(given_key, right_branch(tree_of_records));
    }
}
```

### 2.67

```js

```

### 2.68

```js
function encode(message, tree) {
    return is_null(message)
        ? null
        : append(encode_symbol(head(message), tree),
                 encode(tail(message), tree));
}

function encode_symbol(symbol, tree) {
    if (is_leaf(tree)) {
        return null;
    } else {
        const left_tree = left_branch(tree)
        const right_tree = right_branch(tree)
        return !is_null(member(symbol, left_tree))
            ? pair(0, encode_symbol(symbol, left_tree))
            : !is_null(member(symbol, right_tree))
            ? pair(1, encode_symbol(symbol, right_tree))
            : throw new Error("symbol not included")
    }
}
```


### 2.69

```js
function generate_huffman_tree(pairs) {
    return successive_merge(make_leaf_set(pairs));
}

function successive_merge(leaf_set) {
    
}
```


### 2.70


### 2.71

도수가 가장 낮은 기호의 경우 연습문제 2.71의 
