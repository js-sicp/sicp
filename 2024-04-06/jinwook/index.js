const {
  pair,
  stringify,
  list,
  member,
  is_null,
  head,
  tail,
} = require("../../lib/jinwook");

const has_value = "I have a value";
const no_value = "I lost my value";

function make_connector() {}

function celsius_fahrenheit_converter(c, f) {}

function has_value(connector) {
  return connector("has_value");
}

function get_value(connector) {
  return connector("value");
}

function set_value(connector, new_value, informant) {
  return connector("set_value")(new_value, informant);
}

function forget_value(connector, retractor) {
  return connector("forget")(retractor);
}

function connect(connector, new_constraint) {
  return connector("connect")(new_constraint);
}

function adder(a1, a2, sum) {
  function process_new_value() {
    if (has_value(a1) && has_value(a2)) {
      set_value(sum, get_value(a1) + get_value(a2), me);
    } else if (has_value(a1) && has_value(sum)) {
      set_value(a2, get_value(sum) - get_value(a1), me);
    } else if (has_value(a2) && has_value(sum)) {
      set_value(a1, get_value(sum) - get_value(a2), me);
    } else {
    }
  }

  function process_forget_value() {
    forget_value(sum, me);
    forget_value(a1, me);
    forget_value(a2, me);
    process_new_value();
  }

  function me(request) {
    if (request === has_value) {
      process_new_value();
    } else if (request === no_value) {
      process_forget_value();
    } else {
      error(request, "unkown request --adder");
    }
  }

  connect(a1, me);
  connect(a2, me);
  connect(sum, me);
  return me;
}

function inform_about_value(constraint) {
  return constraint(has_value);
}

function inform_about_no_value(constraint) {
  return constraint(no_value);
}

function multiplier(m1, m2, product) {
  function process_new_value() {
    if (
      (has_value(m1) && get_value(m1) === 0) ||
      (has_value(m2) && get_value(m2) === 0)
    ) {
      set_value(product, 0, me);
    } else if (has_value(m1) && has_value(m2)) {
      set_value(product, get_value(m1) * get_value(m2), me);
    } else if (has_value(product) && has_value(m1)) {
      set_value(m2, get_value(product) / get_value(m1), me);
    } else if (has_value(product) && has_value(m2)) {
      set_value(m1, get_value(product) / get_value(m2), me);
    } else {
    }
  }

  function process_forget_value() {
    forget_value(product, me);
    forget_value(m1, me);
    forget_value(m2, me);
    process_new_value();
  }

  function me(request) {
    if (request === has_value) {
      process_new_value();
    } else if (request === no_value) {
      process_forget_value();
    } else {
      error(request, "Unknown request -- multiplier");
    }
  }

  connect(m1, me);
  connect(m2, me);
  connect(product, me);

  return me;
}

function constant(value, connector) {
  function me(request) {
    error(request, "unknown request -- constant");
  }
  connect(connector, me);
  set_value(connector, value, me);
  return me;
}

function probe(name, connector) {
  function print_probe(value) {
    console.log("Probe: " + name + " = " + stringify(value));
  }

  function process_new_value() {
    print_probe(get_value(connector));
  }

  function process_forget_value() {
    print_probe("?");
  }

  function me(request) {
    if (request === "I have a value.") {
      process_new_value();
    } else if (request === "I lost my value.") {
      process_forget_value();
    } else {
      error(request, "Unknown request -- probe");
    }
  }

  connect(connector, me);

  return me;
}

function make_connector() {
  let value = false;
  let informant = false;
  let constraints = null;

  function set_my_value(newval, setter) {
    if (!has_value(me)) {
      value = newval;
      informant = setter;
      return for_each_except(setter, inform_about_value, constraints);
    } else if (value !== newval) {
      error(list(value, newval), "contradiction");
    } else {
      return "ignored";
    }
  }

  function forget_my_value(retractor) {
    if (retractor === informant) {
      informant = false;
      return for_each_except(retractor, inform_about_no_value, constraints);
    } else {
      return "ignored";
    }
  }

  function connect(new_constraint) {
    if (is_null(member(new_constraint, constraints))) {
      constraints = pair(new_constraint, constraints);
    }
    if (has_value(me)) {
      inform_about_value(new_constraint);
    }
    return "done";
  }

  function me(request) {
    if (request === "has_value") {
      return informant !== false;
    } else if (request === "value") {
      return value;
    } else if (request === "set_value") {
      return set_my_value;
    } else if (request === "forget") {
      return forget_my_value;
    } else if (request === "connect") {
      return connect;
    } else {
      error(request, "Unknown operation -- connector");
    }
  }
  return me;
}

function for_each_except(exception, fun, list) {
  function loop(items) {
    if (is_null(items)) {
      return "done";
    } else if (head(items) === exception) {
      return loop(tail(items));
    } else {
      fun(head(items));
      return loop(tail(items));
    }
  }

  return loop(list);
}

function averager(a, b, c) {
  const sum = make_connector();
  const divide = make_connector();

  constant(2, divide);
  adder(a, b, sum);
  return multiplier(sum, divide, c);
}

function squarer(a, b) {
  function process_new_value() {
    if (has_value(b)) {
      if (get_value(b) < 0) {
        error(get_value(b), "square less than 0 -- squarer");
      } else {
        set_value(a, sqrt(get_value(b)), me);
      }
    } else {
      if (get_value(a)) {
        set_value(b, get_value(a) * get_value(a), me);
      }
    }
  }

  // process_forget_value, me는 multiplier 함수와 차이가 없다.
  connect(a, me);
  connect(b, me);
  return me;
}

function cminus(a, b) {
  const c = make_connector();
  adder(c, b, a);
  return c;
}

function cmul(a, b) {
  const c = make_connector();
  multiplier(a, b, c);
  return c;
}

function cdiv(a, b) {
  const c = make_connector();
  multiplier(c, b, a);
  return c;
}

function cv(a) {
  const b = make_connector();
  constant(b, a);
  return b;
}
