i3 12100 / Win 11 / node v22.20.0
```
node ./bench.js

testing: ok
warnup: done

js cycle 1.47 ms
js of 3.44 ms
js iter 4.73 ms

js non-typed cycle 0.45 ms
js non-typed of 0.55 ms
js non-typed iter 4.56 ms

rs cycle 0.72 ms
rs iter 0.71 ms
```

```
cargo bench

native cycle 249.02 µs (0.25 ms)
native iter 270.18 µs (0.27 ms)
```

It's interesting that when compiling for x86-64 the compiler can't use SIMD instructions, which it usually does very efficiently when using iterators. On the other hand, this further demonstrates how slow node is.

https://godbolt.org/z/bz9vTKra1

To rebuild:
```
// instal Rust from rust-lang.org

rustup target add wasm32-unknown-unknown
cargo install wasm-pack

wasm-pack build --release --target nodejs
```
