// Parser
function parseApply(expr, program) {
    var programNoSpaces = skipSpace(program)
    if (programNoSpaces[0] != "(") {
        return { expr: expr, rest: programNoSpaces }
    }
    programNoSpaces = skipSpace(programNoSpaces.slice(1))
    var expr = { type: "apply", operator: expr, args: [] }
    while (programNoSpaces[0] != ")") {
        var arg = parseExpression(programNoSpaces)
        expr.args.push(arg.expr)
        programNoSpaces = skipSpace(arg.rest)
        if (programNoSpaces[0] == ",") {
            programNoSpaces = skipSpace(programNoSpaces.slice(1))
        } else if (programNoSpaces[0] != ")") {
            throw new SyntaxError("Expected ',' or ')'")
        }
    }
    return parseApply(expr, programNoSpaces.slice(1))
}

function parseExpression(program) {
    var programNoSpaces = skipSpace(program);
    var match, expr;
    if (match = /^\"([^\"]*)\"/.exec(programNoSpaces)) {
        expr = { type: "value", value: match[1] }
    } else if (match = /^\d+\b/.exec(programNoSpaces)) {
        expr = { type: "value", value: Number(match[0]) }
    } else if (match = /^[^\s(),\"]+/.exec(programNoSpaces)) {
        expr = { type: "word", name: match[0] }
    } else {
        throw new SyntaxError("Unexpected syntax: " + programNoSpaces)
    }
    return parseApply(expr, programNoSpaces.slice(match[0].length))
}

function skipSpace(string) {
    var first = string.search(/\S/)
    if (first == -1) return ""
    return string.slice(first)
}
function parse(program) {
    var { expr, rest } = parseExpression(program)
    if (skipSpace(rest).length > 0) {
        throw new SyntaxError("Unexpected text after program")
    }
    return expr
}

// Evaluator

const specialForms = Object.create(null);
function evaluate(expr, scope) {
    if (expr.type == "value") {
        return expr.value;
    } else if (expr.type == "word") {
        if (expr.name in scope) {
            return scope[expr.name];
        } else {
            throw new ReferenceError(
                `Undefined binding: ${expr.name}`);
        }
    } else if (expr.type == "apply") {
        let { operator, args } = expr;
        if (operator.type == "word" &&
            operator.name in specialForms) {
            return specialForms[operator.name](expr.args, scope);
        } else {
            let op = evaluate(operator, scope);
            if (typeof op == "function") {
                return op(...args.map(arg => evaluate(arg, scope)));
            } else {
                throw new TypeError("Applying a non-function.");
            }
        }
    }
}

specialForms.if = (args, scope) => {
    if (args.length != 3) {
        throw new SyntaxError("Wrong number of args to if");
    } else if (evaluate(args[0], scope) !== false) {
        return evaluate(args[1], scope);
    } else {
        return evaluate(args[2], scope);
    }
}

specialForms.while = (args, scope) => {
    if (args.length != 2) {
        throw new SyntaxError("Wrong number of args to while");
    }
    while (evaluate(args[0], scope) !== false) {
        evaluate(args[1], scope);
    }
    // Since undefined does not exist in Egg, we return false,
    // for lack of a meaningful result.
    return false;
};

specialForms.do = (args, scope) => {
    let value = false;
    for (let arg of args) {
        value = evaluate(arg, scope);
    }
    return value;
};

specialForms.define = (args, scope) => {
    if (args.length != 2 || args[0].type != "word") {
        throw new SyntaxError("Incorrect use of define");
    }
    let value = evaluate(args[1], scope);
    scope[args[0].name] = value;
    return value;
};

const topScope = Object.create(null);
topScope.true = true;
topScope.false = false

let prog = parse(`if(true, false, true)`);
console.log(evaluate(prog, topScope))

for (let op of ["+", "-", "*", "/", "==", "<", ">"]) {
    topScope[op] = Function("a, b", `return a ${op} b;`);
}

topScope.print = value => {
    console.log(value);
    return value;
};

function run(program) {
    return evaluate(parse(program), Object.create(topScope));
}

run(`
    do(define(total, 0),
    define(count, 1),
    while(<(count, 11),
        do(define(total, +(total, count)),
        define(count, +(count, 1)))),
    print(total))
`);

specialForms.fun = (args, scope) => {
    if (!args.length) {
        throw new SyntaxError("Functions need a body");
    }
    let body = args[args.length - 1];
    let params = args.slice(0, args.length - 1).map(expr => {
        if (expr.type != "word") {
            throw new SyntaxError("Parameter names must be words");
        }
        return expr.name;
    });
    return function () {
        if (arguments.length != params.length) {
            throw new TypeError("Wrong number of arguments");
        }
        let localScope = Object.create(scope);
        for (let i = 0; i < arguments.length; i++) {
            localScope[params[i]] = arguments[i];
        }
        return evaluate(body, localScope);
    };
};

run(`
do(define(plusOne, fun(a, +(a, 1))),
print(plusOne(10)))
`);

run(`
do(define(pow, fun(base, exp,
if(==(exp, 0),
1,
*(base, pow(base, -(exp, 1)))))),
print(pow(2, 10)))
`);