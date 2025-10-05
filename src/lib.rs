use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn cycle(data: &[u32], a: u32) -> bool {
    let mut i = 0;
    while i < data.len() {
        if data[i] >= a {
            return true;
        }
        i += 1;
    }
    false
}

#[wasm_bindgen]
pub fn iter(data: &[u32], a: u32) -> bool {
    data.iter().any(|v| *v >= a)
}