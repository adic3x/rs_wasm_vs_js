i3 12100 / Win 11 / node v22.20.0
```
node ./bench.js

testing: ok
warnup: done
js cycle 1510.74 ms
js iter 4785.04 ms
rs cycle 737.80 ms
rs iter 726.86 ms
```

To rebuild:
```
// instal Rust from rust-lang.org

rustup target add wasm32-unknown-unknown
cargo install wasm-pack

wasm-pack build --release --target nodejs
```
