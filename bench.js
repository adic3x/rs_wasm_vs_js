const wasm = require('./pkg/rs');

const I = 1_000;
const N = 1_000_000;
const A = Uint32Array.from({ length: N }, (_, i) => i !== N - 1 ? i % 256 : 512);
const V = Array.from(A);

function cycle(data, a) {
    for (let i = 0; i < data.length; i++) {
        if (data[i] >= a) return true;
    }
    return false;
}

function of(data, a) {
    for (const i of data) {
        if (i >= a) return true;
    }
    return false;
}

function iter(data, a) {
    return data.some(v => v >= a);
}

function array_cycle(data, a) {
    for (let i = 0; i < data.length; i++) {
        if (data[i] >= a) return true;
    }
    return false;
}

function array_of(data, a) {
    for (const i of data) {
        if (i >= a) return true;
    }
    return false;
}

function array_iter(data, a) {
    return data.some(v => v >= a);
}

console.log(
    (
        cycle(A, 400) &&
        of(A, 400) &&
        iter(A, 400) &&

        array_cycle(V, 400) &&
        array_of(V, 400) &&
        array_iter(V, 400) &&

        wasm.cycle(A, 400) &&
        wasm.iter(A, 400) &&

        !cycle(A, 800) &&
        !of(A, 800) &&
        !iter(A, 800) &&

        !array_cycle(V, 800) &&
        !array_of(V, 800) &&
        !array_iter(V, 800) &&
    
        !wasm.cycle(A, 800) &&
        !wasm.iter(A, 800)
    ) ? 'testing: ok' : 'testing: fail'
);

for (let i = 0; i < 1000; i++) {
    cycle(A, 400);
    of(A, 400);
    iter(A, 400);

    array_cycle(V, 400);
    array_of(V, 400);
    array_iter(V, 400);

    wasm.cycle(A, 400);
    wasm.iter(A, 400);
}

console.log('warnup: done');

let start, end;

start = performance.now();
for (let i = 0; i < I; i++) cycle(A, 400);
end = performance.now();
console.log(`js cycle ${((end - start) / I).toFixed(2)} ms`);

start = performance.now();
for (let i = 0; i < I; i++) of(A, 400);
end = performance.now();
console.log(`js of ${((end - start) / I).toFixed(2)} ms`);

start = performance.now();
for (let i = 0; i < I; i++) iter(A, 400);
end = performance.now();
console.log(`js iter ${((end - start) / I).toFixed(2)} ms`);

start = performance.now();
for (let i = 0; i < I; i++) array_cycle(V, 400);
end = performance.now();
console.log(`js non-typed cycle ${((end - start) / I).toFixed(2)} ms`);

start = performance.now();
for (let i = 0; i < I; i++) array_of(V, 400);
end = performance.now();
console.log(`js non-typed of ${((end - start) / I).toFixed(2)} ms`);

start = performance.now();
for (let i = 0; i < I; i++) array_iter(V, 400);
end = performance.now();
console.log(`js non-typed iter ${((end - start) / I).toFixed(2)} ms`);

start = performance.now();
for (let i = 0; i < I; i++) wasm.cycle(A, 400);
end = performance.now();
console.log(`rs cycle ${((end - start) / I).toFixed(2)} ms`);

start = performance.now();
for (let i = 0; i < I; i++) wasm.iter(A, 400);
end = performance.now();
console.log(`rs iter ${((end - start) / I).toFixed(2)} ms`);