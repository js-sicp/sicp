### 2.17

```js
function last_pair(list) {
    return is_null(tail(list))
        ? head(list)
        : last_pair(tail(list));
}
```


### 2.18

```js
function reverse(list) {
    return is_null(list)
        ? null
        : append(reverse(tail(list)), pair(head(list), null));
}
```
