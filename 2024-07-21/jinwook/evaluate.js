function evaluate() {}

function apply(fun, args) {
  if (is_primitive_function(fun)) {
    return apply_primitive_function(fun, args);
  } else if (is_compound_function(fun)) {
    const result = evaluate(
      function_body(fun),
      extend_environment(
        function_parameters(fun),
        args,
        function_environment(fun)
      )
    );
  } else {
    new Error(fun, "unknown function type --apply");
  }
}

function list_of_values(exps, env) {
  return map((arg) => evaluate(arg, env), exps);
}

function eval_conditional(component, env) {
  return is_truthy(evaluate(conditional_predicate(component), env))
    ? evaluate(conditional_consequent(component, env))
    : evaluate(conditional_alternative(component, env));
}

function eval_sequence(stmts, env) {
  if (is_empty_sequence(stmts)) {
    return undefined;
  } else if (is_last_statement(stmts)) {
    return evaluate(first_statement(stmts), env);
  } else {
    const first_stmt_value = evaluate(first_statement(stmts), env);
    if (is_return_value(first_stmt_value)) {
      return first_stmt_value;
    } else {
      return eval_sequence(rest_statements(stmts), env);
    }
  }
}

function eval_block(component, env) {
  const body = block_body(component);
  const locals = scan_out_declarations(body);
  const unassigneds = list_of_unassigned(locals);
  return evaluate(body, extend_environment(locals, unassigneds, env));
}

function list_of_unassigned(symbols) {
  return map((symbol) => "*unassigned*", symbols);
}

function scan_out_declarations(component) {
  return is_sequence(component)
    ? accumulate(
        append,
        null,
        map(scan_out_declarations, sequence_statements(component))
      )
    : is_declaration(component)
    ? list(declaration_symbol(component))
    : null;
}

function eval_return_statement(component, env) {
  return make_return_value(evaluate(return_expression(component), env));
}

function eval_assignment(component, env) {
  const value = evaluate(assignment_value_expression(component), env);
  assign_symbol_value(assignment_symbol(component), value, env);
  return value;
}

function eval_declaration(component, env) {
  assign_symbol_value(
    declaration_symbol(component),
    evaluate(declaration_value_expression(component), env),
    env
  );
  return undefined;
}

// AST

function parse() {}

function is_literal(component) {
  return is_tagged_list(component, "literal");
}

function is_tagged_list(component, the_tag) {
  return is_pair(component) && head(component) === the_tag;
}

function literal_value(component) {
  return head(tail(component));
}

function make_literal(value) {
  return list("literal", value);
}

function make_name(symbol) {
  return list("name", symbol);
}

function is_name(component) {
  return is_tagged_list(component, "name");
}

function symbol_of_name(component) {
  return head(tail(component));
}

function is_application(component) {}

function function_expression(component) {}

function arg_expressions(component) {}

function make_application(function_expression, argument_expressions) {}

function is_conditional(component) {}

function conditional_predicate(component) {}

function conditional_consequent(component) {}

function conditional_alternative(component) {}

function is_lambda_expression() {}

function lambda_body(component) {}

function lamba_parameter_symbols(component) {
  return map(symbol_of_name, head(tail(component)));
}

function make_lambda_expression(parameters, body) {
  return list("lambda_expression", parameters, body);
}

function first_statement(stmts) {
  return head(stmts);
}

function rest_statements(stmts) {
  return tail(stmts);
}

function is_empty_sequence(stmts) {
  return is_null(stmts);
}

function is_last_statement(stmts) {
  return is_null(tail(stmts));
}

function is_block(component) {}

function block_body(component) {}

function is_return_statement(component) {}

function return_expression(component) {}

function is_assignment(component) {}

function assignment_symbol(component) {
  return symbol_of_name(head(tail(component)));
}

function assignment_value_expression(component) {}

function declaration_symbol(component) {
  return symbol_of_name(head(tail(component)));
}

function declaration_value_expression(component) {
  return head(tail(tail(component)));
}

function make_constant_declaration(name, value_expression) {
  return list("constant_declaration", name, value_expression);
}

function is_declaration(component) {
  return (
    is_tagged_list(component, "constant_declaration") ||
    is_tagged_list(component, "variable_declaration") ||
    is_tagged_list(component, "function_declaration")
  );
}

function is_function_declaration(component) {}

function function_decl_to_constant_decl(component) {
  return make_constant_declaration(
    function_declaration_name(component),
    make_lambda_expression(
      function_declaration_parameters(component),
      function_declaration_body(component)
    )
  );
}
