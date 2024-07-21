// 4.1

// 왼쪽에서 오른쪽
// 선언문 순서대로 평가한다는 규칙이 존재해야한다.
function list_of_values(exps, env) {
  if (is_null(exps)) return null;

  const first = evaluate(head(exps), env);
  return pair(first, list_of_values(tail(exps), env));
}

// 오른쪽에서 왼쪽
function list_of_values(exps, env) {
  if (is_null(exps)) return null;

  const rest = list_of_values(tail(exps), env);
  return pair(evaluate(head(exps), env), rest);
}

// 4.2
