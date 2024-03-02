### 2.87
```js
function install_javascript_number_package() {
	// other methods
	put ("is_equal_to_zero", list("javascript_number", "javascript_number"),
		(x) => tag(x === 0));
}

// rational package
function is_equal_to_zero (x) {
	return numer(x) === 0 && denom(x) !== 0;
}

// complex package
function is_equal_to_zero (z) {
	return real_part(z) === 0 && imag_part(z) === 0;
}
```


### 2.88
```js
function negative (t) {
	return make_term(order(t), -coeff(t));
}

function sub_terms(L1, L2) {
	if (is_empty_termlist(L1)) {
		return negate_terms(L2);
	} else if (is_empty_termlist(L2)) {
		return L1;
	} else {
		const t1 = first_term(L1);
		const t2 = first_term(L2);
		return order(t1) > order(t2)
			? adjoin_term(t1, sub_terms(rest_terms(L1), L2))
			: order(t1) < order(t2)
			? adjoin_term(negative(t2), sub_terms(L1, rest_terms(L2))
			: adjoin_term(order(t1),
				sub(coeff(t1), coeff(t2))),
				sub_terms(rest_terms(L1), rest_terms(L2)));
	}
}
```


### 2.89

조밀 다항식의 경우 항의 계수만 다루면 되기 때문에 함수들이 간단해질 수 있다.

```js
// example : list(1, 2, 0, 3, -2, -5)

function adjoin_term(term, term_list) {
	return is_equal_to_zero(term)
		? term_list
		: pair(term, term_list);
}

const the_empty_termlist = null;
function first_term(term_list) { return head(term_list); }
function rest_terms(term_list) { return tail(term_list); }
function is_empty_termlist(term_list) { return is_null(term_list); }

function make_term(coeff) { return list(coeff); }
// ???
```


### 2.90

하...

### 2.91

```js
function div_terms(L1, L2) {
	if (is_empty_termlist(L1)) {
		return list(the_empty_termlist, the empty_termlist);
	} else {
		const t1 = first_term(L1);
		const t2 = first_term(L2);
		if (order(t2) > order(t1)) {
			return list(the_empty_termlist, L1);
		} else {
			const new_c = div(coeff(t1), coeff(t2));
			const new_o = order(t1) - order(t2);
			const rest_of_result = // TODO

			if (new_o > 0) {
				
			}
		}
	}
}
```
