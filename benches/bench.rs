fn bench(c: &mut criterion::Criterion) {
    const N: u32 = 1_000_000;
    let v = Vec::from_iter((0u32..N).map(|i| if i < N - 1 { i % 256 } else { 512 }));
    c.bench_function("native cycle", |b| b.iter(|| rs::cycle(&v, 400)));
    c.bench_function("native iter", |b| b.iter(|| rs::iter(&v, 400)));
}

criterion::criterion_group!(benches, bench);
criterion::criterion_main!(benches);