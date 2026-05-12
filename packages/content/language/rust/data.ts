import type { LanguageGuide } from '../../types';

const data: LanguageGuide = {
  lang: 'Rust',
  langSlug: 'rust',
  version: 'Rust 2021',
  lead: `他言語の経験者が 2〜3 時間でざっと読み通せるリファレンスです。所有権・借用・ライフタイムなど Rust 固有の概念と落とし穴は「要注意」ボックスで強調しています。`,
  accent: '#ce4a00',
  accent2: '#fdf3ee',
  badgeGradient: 'linear-gradient(135deg, #ce4a00, #fdf3ee)',
  heroEmoji: '🦀',
  navGroups: [
    { label: '基礎', sections: ['s1', 's2', 's3', 's4', 's5', 's6'] },
    { label: 'データ構造', sections: ['s7', 's8', 's9'] },
    { label: '実用', sections: ['s10', 's11', 's12', 's13'] },
    { label: '応用', sections: ['s14', 's15', 's16'] },
  ],
  sections: [
    {
      id: 's1',
      num: 1,
      title: '変数・型・束縛',
      level: 'basic',
      items: [
        {
          id: 's1-let-mut-シャドーイング',
          name: 'let / mut / シャドーイング',
          level: 'basic',
          keywords: 'let mut 変数 束縛 イミュータブル シャドーイング shadowing',
          desc: `変数はデフォルトでイミュータブル（変更不可）。変更したい場合は \`mut\` を付ける。同名の変数を再宣言（シャドーイング）すると型も含めて上書きできる。`,
          code: [
          { lang: 'RUST', code: `let x = 5;            // イミュータブル（デフォルト）
// x = 6;            // コンパイルエラー

let mut y = 10;       // ミュータブル
y += 1;
println!("{y}");      // 11

// シャドーイング：同名で再束縛（型も変えられる）
let msg = "42";
let msg = msg.parse::<i32>().unwrap();  // &str → i32
println!("{msg}");    // 42` },
          ],
          output: `11
42`,
          warn: `Rust の変数はデフォルトで不変。\`mut\` を付けずに代入しようとするとコンパイルエラーになる（実行時ではなくコンパイル時に検出される）。他言語から来た場合「変えられない変数」という概念に最初は戸惑うが、意図しない変更を防ぐ安全設計として働く。`,
        },
        {
          id: 's1-スカラー型と型注釈',
          name: 'スカラー型と型注釈',
          level: 'basic',
          keywords: '型推論 型注釈 i32 u64 f64 bool char usize isize スカラー型',
          desc: `型はほとんどの場合推論されるが、複数の型が候補になる場合は注釈が必要。デフォルトの整数型は \`i32\`、浮動小数点は \`f64\`。`,
          code: [
          { lang: 'RUST', code: `let a: i32  = -42;           // 符号付き整数（i8/i16/i32/i64/i128/isize）
let b: u64  = 1_000_000;     // 符号なし整数（u8/u16/u32/u64/u128/usize）
let c: f64  = 3.14;          // 浮動小数点（f32 / f64）
let d: bool = true;          // true / false のみ
let e: char = '🦀';          // Unicode スカラー値（シングルクォート、4バイト）

// 型注釈はサフィックスでも書ける
let x = 42u8;
let y = 1.5f32;

// usize / isize はポインタサイズ（配列インデックスは usize）
let idx: usize = 0;` },
          ],
        },
        {
          id: 's1-整数オーバーフロー',
          name: '整数オーバーフロー',
          level: 'basic',
          keywords: '整数オーバーフロー debug release wrapping saturating checked overflowing パニック',
          desc: `debug ビルドではオーバーフロー時にパニック。release ビルドでは2の補数でラップする（パニックしない）。意図的な操作には専用メソッドを使う。`,
          code: [
          { lang: 'RUST', code: `let x: u8 = 255;

// debug:   255 + 1 → panic! at runtime
// release: 255 + 1 → 0 (ラップ)

// 意図的な操作は専用メソッドで明示する
let wrapped    = x.wrapping_add(1);    // 0（ラップ）
let saturated  = x.saturating_add(1); // 255（上限で止まる）
let checked    = x.checked_add(1);    // None（Option<u8>）
let (val, ov)  = x.overflowing_add(1);// (0, true)` },
          ],
          warn: `debug と release でオーバーフロー時の挙動が異なる。release ビルドでのみ現れるバグの典型的な原因。意図的にラップしたい場合は \`wrapping_*\`、エラーにしたい場合は \`checked_*\` を使い、コードの意図を明確にする。`,
        },
        {
          id: 's1-タプルと配列',
          name: 'タプルと配列',
          level: 'basic',
          keywords: 'タプル 配列 tuple array スライス 固定長',
          desc: `タプルは異なる型を混在できる固定長の複合型。配列はすべて同じ型・コンパイル時固定長。可変長リストには \`Vec<T>\` を使う（コレクション章で解説）。`,
          code: [
          { lang: 'RUST', code: `// タプル
let point: (i32, f64, &str) = (1, 2.5, "origin");
let (x, y, label) = point;         // デストラクチャリング
println!("{x}, {y}, {label}");     // 1, 2.5, origin
println!("{}", point.0);           // インデックスアクセス → 1

// 配列（コンパイル時固定長: [型; 長さ]）
let arr: [i32; 5] = [1, 2, 3, 4, 5];
println!("{}", arr[0]);            // 1
println!("{}", arr.len());         // 5
let zeros = [0i32; 10];            // [0, 0, 0, ...] × 10

// スライス（配列の一部への参照）
let slice: &[i32] = &arr[1..3];    // [2, 3]` },
          ],
        },
        {
          id: 's1-string-vs-str',
          name: 'String vs &str',
          level: 'basic',
          keywords: 'String &str 文字列 所有 スライス Deref 強制変換',
          desc: `\`String\` はヒープ上に確保された所有権付き文字列。\`&str\` はどこか（文字列リテラル・\`String\` 等）への不変スライス参照。`,
          code: [
          { lang: 'RUST', code: `let s1: &str    = "hello";                // 文字列リテラル（'static）
let s2: String  = String::from("hello"); // ヒープ所有文字列
let s3: String  = "hello".to_string();   // 同上

// String → &str（借用）
let s4: &str = &s2;
let s5: &str = &s2[0..3];               // "hel"（バイト境界に注意）

// 結合
let s6 = s2 + " world";  // s2 はここで move される
let s7 = format!("{} {}", "hello", "world");  // 所有権を取らない

// 文字数・バイト数
"hello".len()            // 5（バイト数）
"hello".chars().count()  // 5（文字数; マルチバイト文字では異なる）` },
          ],
          warn: `関数の引数型は \`&str\` にすると \`&String\` も \`&str\` リテラルも渡せる（\`Deref\` 強制変換による）。引数を \`&String\` にすると \`&str\` リテラルを渡せなくなるので、文字列を読み取るだけの引数には \`&str\` を使う。`,
        },
        {
          id: 's1-const-static',
          name: 'const / static',
          level: 'basic',
          keywords: 'const static 定数 グローバル 型注釈必須',
          desc: `\`const\` はコンパイル時定数（インライン展開される）。\`static\` はプログラム全体を通じて唯一のメモリアドレスを持つ。どちらも型注釈が必須。`,
          code: [
          { lang: 'RUST', code: `const MAX_POINTS: u32 = 100_000;   // コンパイル時定数（型注釈必須）
static GREETING: &str = "Hello";  // 静的変数（'static ライフタイム）

// static mut は unsafe が必要（グローバル可変状態は unsafe）
// static mut COUNTER: u32 = 0;
// unsafe { COUNTER += 1; }` },
          ],
        },
      ],
    },
    {
      id: 's2',
      num: 2,
      title: '所有権とMove',
      level: 'basic',
      items: [
        {
          id: 's2-所有権の-3-原則',
          name: '所有権の 3 原則',
          level: 'basic',
          keywords: '所有権 ownership 3原則 メモリ 解放 drop スコープ',
          desc: `Rust のメモリ管理の核心。GC なしで安全なメモリ管理を実現する。コンパイル時に検証されるため実行時コストはゼロ。`,
          code: [
          { lang: 'RUST', code: `// 原則 1: 各値には唯一の所有者がいる
let s1 = String::from("hello");   // s1 が所有者

// 原則 2: 所有者がスコープを抜けると値は自動的にドロップ（解放）
{
    let s2 = String::from("world");
    // s2 を使う
}   // ← s2 はここで自動解放（drop() が呼ばれる）

// 原則 3: 所有者は常に 1 つ（Move で移動する）
let s3 = String::from("hello");
let s4 = s3;          // s3 → s4 に所有権が移動
// println!("{s3}");  // コンパイルエラー: s3 は無効になった
println!("{s4}");     // OK` },
          ],
          warn: `「所有者がスコープを抜けると \`drop()\` が呼ばれる」という単純なルールにより、GC なしで二重解放・メモリリークを防ぐ。他言語の「変数はコピーされる」という直感とは異なり、ヒープを持つ型は移動（Move）される。`,
        },
        {
          id: 's2-関数への所有権の移動',
          name: '関数への所有権の移動',
          level: 'basic',
          keywords: 'move 移動 関数 引数 所有権 渡す 戻り値',
          desc: `引数で値を渡すと所有権が関数に移動する。関数が値を返すことで所有権を戻すこともできる。`,
          code: [
          { lang: 'RUST', code: `fn take_ownership(s: String) {
    println!("{s}");
}   // s はここでドロップ

fn gives_back(s: String) -> String {
    s   // 所有権を呼び出し元に返す
}

fn main() {
    let s1 = String::from("hello");
    take_ownership(s1);
    // println!("{s1}"); // コンパイルエラー: s1 は move 済み

    let s2 = String::from("world");
    let s3 = gives_back(s2);   // s2 → s3 に所有権が移動
    println!("{s3}");           // OK
}` },
          ],
          warn: `関数のたびに所有権を移動して戻すのは冗長。実際には借用（参照渡し）を使うことで所有権を移さずに値を使える（次章）。所有権の移動が必要なケースはコレクションへの追加・所有権を持つ構造体の構築などに限られる。`,
        },
        {
          id: 's2-copy-トレイト-clone',
          name: 'Copy トレイト / clone()',
          level: 'basic',
          keywords: 'Copy clone コピー クローン i32 bool スタック ヒープ',
          desc: `スタック上にのみ存在する型（整数・bool・char・固定長配列等）は \`Copy\` トレイトを実装しており、代入・引数渡しで自動的にコピーされる（Move しない）。ヒープを持つ型は \`.clone()\` で明示的にディープコピーする。`,
          code: [
          { lang: 'RUST', code: `// Copy 型: 代入してもオリジナルが残る
let x: i32 = 5;
let y = x;                // コピー（Move ではない）
println!("{x} {y}");      // 5 5

// Copy でない型（ヒープを持つ）
let s1 = String::from("hello");
let s2 = s1.clone();      // ディープコピー（高コストであることを明示）
println!("{s1} {s2}");    // hello hello

// Copy を実装している主な型:
// i8/i16/i32/i64/i128/u8/.../f32/f64/bool/char
// &T（共有参照）
// タプル（全要素が Copy の場合）
// 固定長配列（[T; N]、T が Copy の場合）` },
          ],
          output: `5 5
hello hello`,
        },
        {
          id: 's2-drop-と-raii',
          name: 'drop() と RAII',
          level: 'basic',
          keywords: 'drop デストラクタ RAII スコープ 解放 手動',
          desc: `スコープを抜けると自動的に \`drop()\` が呼ばれる（RAII パターン）。\`std::mem::drop()\` で早期解放もできる。\`Drop\` トレイトを実装することでカスタムデストラクタを書ける。`,
          code: [
          { lang: 'RUST', code: `struct Resource(i32);

impl Drop for Resource {
    fn drop(&mut self) {
        println!("Resource {} dropped", self.0);
    }
}

fn main() {
    let r1 = Resource(1);
    let r2 = Resource(2);
    drop(r1);               // r1 を早期解放
    println!("before end");
}   // r2 はここで解放（逆順: 後に作られたものが先に解放）` },
          ],
          output: `Resource 1 dropped
before end
Resource 2 dropped`,
        },
      ],
    },
    {
      id: 's3',
      num: 3,
      title: '借用と参照',
      level: 'basic',
      items: [
        {
          id: 's3-t-と-mut-t',
          name: '&T と &mut T',
          level: 'basic',
          keywords: '借用 参照 &T &mut T 共有参照 可変参照 borrow',
          desc: `\`&T\` は共有参照（読み取り専用）、\`&mut T\` は可変参照（読み書き可）。参照を関数に渡すと所有権が移動せず、呼び出し元で引き続き使える。`,
          code: [
          { lang: 'RUST', code: `fn length(s: &String) -> usize {
    s.len()         // s を借用するだけで所有権を取らない
}

fn append(s: &mut String) {
    s.push_str(", world");
}

fn main() {
    let s = String::from("hello");
    println!("{}", length(&s));  // 5 — s の所有権は維持される
    println!("{s}");             // hello

    let mut t = String::from("hello");
    append(&mut t);
    println!("{t}");             // hello, world
}` },
          ],
          output: `5
hello
hello, world`,
        },
        {
          id: 's3-借用規則',
          name: '借用規則',
          level: 'basic',
          keywords: '借用規則 借用チェッカー &mut 同時 複数 コンパイルエラー 競合',
          desc: `コンパイラ（借用チェッカー）が以下 2 つのルールを強制する。これにより実行時のデータ競合を根絶する。`,
          code: [
          { lang: 'RUST', code: `let mut s = String::from("hello");

// ルール 1: &mut は同時に 1 つだけ
let r1 = &mut s;
// let r2 = &mut s;  // ← コンパイルエラー

// ルール 2: &（共有参照）と &mut は同時に共存できない
let r3 = &s;         // 共有参照は複数 OK
let r4 = &s;
// let r5 = &mut s;  // ← r3/r4 が生きている間はエラー

println!("{r3} {r4}");
// r3, r4 のライフタイムはここで終了
let r5 = &mut s;     // ← OK（r3/r4 はもう使われない）
r5.push_str("!");` },
          ],
          warn: `\`&mut\` 参照は同時に 1 つしか存在できない。「まだ使われているかもしれない」ではなく「実際に最後に使われた行まで」がライフタイムになる（NLL: Non-Lexical Lifetimes）。C++ のイテレータ無効化や Python のリスト変更中反復など、他言語で頻発する問題をコンパイル時に防ぐ。`,
        },
        {
          id: 's3-スライス',
          name: 'スライス',
          level: 'basic',
          keywords: 'スライス slice &[T] &str 文字列スライス 部分参照',
          desc: `スライスはコレクションや文字列の連続した一部への参照。所有権を持たない。\`&[T]\`（配列スライス）と \`&str\`（文字列スライス）が最も一般的。`,
          code: [
          { lang: 'RUST', code: `let arr = [1, 2, 3, 4, 5];
let slice: &[i32] = &arr[1..3];       // [2, 3]
println!("{:?}", slice);

let s = String::from("hello world");
let word: &str = &s[0..5];           // "hello"
println!("{word}");

// 便利なスライス記法
let all  = &arr[..];   // &arr[0..5] と同じ
let tail = &arr[2..];  // [3, 4, 5]
let head = &arr[..3];  // [1, 2, 3]

// スライスを受け取る関数（Vec も配列も渡せる）
fn sum(s: &[i32]) -> i32 { s.iter().sum() }
println!("{}", sum(&arr));       // 15
println!("{}", sum(&arr[1..3])); // 5` },
          ],
          output: `[2, 3]
hello
15
5`,
        },
        {
          id: 's3-deref-強制変換',
          name: 'Deref 強制変換',
          level: 'basic',
          keywords: 'Deref 強制変換 deref coercion &String &str &Vec &[T] 自動変換',
          desc: `\`Deref\` トレイトを実装した型は参照渡し時に自動で変換される。これにより \`&String\` を \`&str\` を期待する関数に渡せるようになる。`,
          code: [
          { lang: 'RUST', code: `fn greet(s: &str) { println!("Hello, {s}!"); }

let owned  = String::from("Alice");
let boxed  = Box::new(String::from("Bob"));

greet(&owned);   // &String → &str（Deref 強制変換）
greet(&boxed);   // &Box<String> → &String → &str（連鎖変換）
greet("Carol");  // &str リテラルはそのまま

// &Vec<T> → &[T] も同様
fn first(v: &[i32]) -> i32 { v[0] }
let vec = vec![10, 20, 30];
println!("{}", first(&vec));  // &Vec<i32> → &[i32]` },
          ],
          output: `Hello, Alice!
Hello, Bob!
Hello, Carol!
10`,
        },
        {
          id: 's3-deref-の実装',
          name: 'Deref の実装',
          level: 'advanced',
          keywords: 'Deref トレイト 実装 カスタム スマートポインタ *演算子 逆参照',
          desc: `\`Deref\` トレイトを実装するとカスタム型を参照のように扱える。スマートポインタ（\`Box\`・\`Rc\`・\`Arc\`）はこれにより透過的に利用できる。`,
          code: [
          { lang: 'RUST', code: `use std::ops::Deref;

struct Wrapper(String);

impl Deref for Wrapper {
    type Target = String;
    fn deref(&self) -> &String { &self.0 }
}

let w = Wrapper(String::from("hello"));
println!("{}", w.len());  // Deref 経由で String のメソッドが使える
println!("{}", *w);       // 明示的な逆参照 → "hello"

// DerefMut も実装すると &mut で可変参照も可能
// impl DerefMut for Wrapper { fn deref_mut(&mut self) -> &mut String { &mut self.0 } }` },
          ],
        },
      ],
    },
    {
      id: 's4',
      num: 4,
      title: 'ライフタイム',
      level: 'advanced',
      items: [
        {
          id: 's4-ライフタイム注釈の構文',
          name: 'ライフタイム注釈の構文',
          level: 'advanced',
          keywords: 'ライフタイム lifetime 注釈 アポストロフィ \'a 構文',
          desc: `ライフタイム注釈（\`'a\`）は参照の有効期間を型システムに伝えるもの。参照の有効期間を変えるのではなく、複数の参照の有効期間の関係をコンパイラに伝える。`,
          code: [
          { lang: 'RUST', code: `// &'a T  = ライフタイム 'a を持つ T への参照
// &'a mut T  = ライフタイム 'a を持つ T への可変参照

// 多くの場合コンパイラが省略ルール（ライフタイム省略規則）で推論してくれる
fn first_word(s: &str) -> &str {       // 省略形（推論される）
    s.split_whitespace().next().unwrap_or("")
}

// 明示が必要な場合（戻り値のライフタイムが複数の引数に依存する場合）
fn longer<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() >= y.len() { x } else { y }
    // 戻り値は x か y の短い方のライフタイムまで有効
}` },
          ],
        },
        {
          id: 's4-関数シグネチャのライフタイム',
          name: '関数シグネチャのライフタイム',
          level: 'advanced',
          keywords: 'ライフタイム 関数 シグネチャ 戻り値 引数 複数参照',
          desc: `戻り値の参照のライフタイムは必ず引数のいずれかと結びつける必要がある。関数内で作ったローカル変数の参照を返すとダングリング参照になるためコンパイルエラー。`,
          code: [
          { lang: 'RUST', code: `// 正しい: 戻り値のライフタイムは x か y の短い方（'a）
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

fn main() {
    let s1 = String::from("long string");
    let result;
    {
        let s2 = String::from("xy");
        result = longest(s1.as_str(), s2.as_str());
        println!("{result}");  // ← s2 が生きている間なら OK
    }
    // println!("{result}"); // ← s2 がドロップ後は使えない
}

// コンパイルエラーの例: ローカル変数の参照を返す
// fn bad() -> &str {
//     let s = String::from("hello");
//     &s  // ← s はここでドロップされる → ダングリング参照
// }` },
          ],
          warn: `「戻り値が参照の場合、そのライフタイムは必ず引数のいずれかと紐付ける」が基本ルール。関数内で作った値の参照を返したい場合は、\`String\` などの所有権を持つ型を返すよう設計を変える。`,
        },
        {
          id: 's4-構造体のライフタイム',
          name: '構造体のライフタイム',
          level: 'advanced',
          keywords: '構造体 ライフタイム フィールド 参照 保持',
          desc: `構造体が参照フィールドを持つ場合、その参照が構造体より長生きすることをライフタイム注釈で保証する必要がある。`,
          code: [
          { lang: 'RUST', code: `// 構造体が &str フィールドを持つ場合
struct Excerpt<'a> {
    text: &'a str,
}

impl<'a> Excerpt<'a> {
    fn announce(&self) -> &str {
        self.text   // 戻り値のライフタイムは &self に紐付く（省略規則）
    }
}

fn main() {
    let novel = String::from("Call me Ishmael. Some years ago...");
    let first = novel.split('.').next().unwrap();
    let exc = Excerpt { text: first };
    println!("{}", exc.announce());  // Call me Ishmael
}   // novel は exc より長生きするので安全` },
          ],
        },
        {
          id: 's4-static-ライフタイム',
          name: '\'static ライフタイム',
          level: 'advanced',
          keywords: '\'static ライフタイム 静的 文字列リテラル プログラム全体 有効期間',
          desc: `\`'static\` はプログラムの実行全体を通じて有効な参照。文字列リテラル（バイナリに埋め込まれる）は自動的に \`'static\`。エラーメッセージなど長寿命な参照が必要な場面で使う。`,
          code: [
          { lang: 'RUST', code: `// 文字列リテラルは &'static str
let s: &'static str = "I have a static lifetime.";

// 関数の戻り値を 'static にする例
fn get_message() -> &'static str {
    "always valid"
}

// 複数のトレイト境界 + 'static の組み合わせ（スレッド間送信に必要）
use std::fmt::Display;
fn print_it(x: impl Display + 'static) {
    println!("{x}");
}
print_it(42);        // i32 は 'static
print_it("hello");  // &'static str も 'static` },
          ],
          warn: `\`'static\` 境界はコンパイラが「参照が存在する場合は 'static ライフタイムであること」を要求するもの。「とりあえず \`'static\` を付けてエラーを消す」と本質的な問題を隠してしまう。エラーの原因（所有権の移動・参照の寿命）を先に理解した上で使う。`,
        },
      ],
    },
    {
      id: 's5',
      num: 5,
      title: '制御フロー',
      level: 'basic',
      items: [
        {
          id: 's5-if-else-式として値を返す',
          name: 'if / else（式として値を返す）',
          level: 'basic',
          keywords: 'if else 式 値を返す 条件 分岐',
          desc: `Rust の \`if\` は式であり値を返す。三項演算子の代わりに使える。条件式に括弧は不要。`,
          code: [
          { lang: 'RUST', code: `let x = 7;

// 文として使う場合
if x % 2 == 0 {
    println!("even");
} else if x % 3 == 0 {
    println!("divisible by 3");
} else {
    println!("other");
}

// 式として値を返す（三項演算子の代替）
let label = if x > 5 { "big" } else { "small" };
println!("{label}");   // big

// let に直接バインド
let abs = if x >= 0 { x } else { -x };
println!("{abs}");     // 7` },
          ],
          output: `other
big
7`,
        },
        {
          id: 's5-loop-while-for',
          name: 'loop / while / for',
          level: 'basic',
          keywords: 'loop while for ループ 繰り返し range イテレータ',
          desc: `\`loop\` は無限ループ（\`break\` で抜ける）。\`while\` は条件ループ。\`for\` はイテレータをベースにした最も慣用的なループ。`,
          code: [
          { lang: 'RUST', code: `// loop
let mut i = 0;
loop {
    i += 1;
    if i == 3 { break; }
}

// while
let mut n = 5;
while n > 0 {
    print!("{n} ");
    n -= 1;
}
println!();   // 5 4 3 2 1

// for + Range
for x in 0..5 { print!("{x} "); }    // 0 1 2 3 4
println!();
for x in 0..=5 { print!("{x} "); }   // 0 1 2 3 4 5
println!();

// コレクションのイテレート
let v = vec!["a", "b", "c"];
for (i, val) in v.iter().enumerate() {
    println!("{i}: {val}");
}

// 逆順
for x in (0..5).rev() { print!("{x} "); }  // 4 3 2 1 0` },
          ],
        },
        {
          id: 's5-break-に値を返す-ループラベル',
          name: 'break に値を返す / ループラベル',
          level: 'basic',
          keywords: 'break 値 返す loop 式 ラベル label',
          desc: `\`loop\` は \`break 値\` で値を返せる。ネストしたループでは \`'label\` を付けて外側のループを指定できる。`,
          code: [
          { lang: 'RUST', code: `// break に値を返す
let result = loop {
    let x = expensive_computation();
    if x > 100 { break x * 2; }   // loop 式の値になる
};

fn expensive_computation() -> i32 { 101 }

// ループラベル（ネスト時に外側のループを制御）
'outer: for i in 0..5 {
    for j in 0..5 {
        if i + j == 6 {
            println!("found: {i} + {j} = 6");
            break 'outer;   // 外側の for を抜ける
        }
    }
}
println!("{result}");  // 202` },
          ],
          output: `found: 2 + 4 = 6
202`,
        },
        {
          id: 's5-if-let',
          name: 'if let',
          level: 'basic',
          keywords: 'if let パターンマッチ Option Some None 簡潔 一致',
          desc: `\`if let\` は 1 つのパターンにのみ一致させたい場合の簡潔な構文。\`match\` の糖衣構文で、\`Option\` や \`Result\` の処理でよく使う。`,
          code: [
          { lang: 'RUST', code: `let coin: Option<u32> = Some(100);

// match で書くと冗長になる場合
match coin {
    Some(v) => println!("value: {v}"),
    None    => (),
}

// if let で簡潔に
if let Some(v) = coin {
    println!("value: {v}");
}

// else 節も付けられる
if let Some(v) = coin {
    println!("got {v}");
} else {
    println!("nothing");
}

// ガード条件との組み合わせ
if let Some(v) = coin.filter(|&x| x > 50) {
    println!("big coin: {v}");
}` },
          ],
        },
        {
          id: 's5-while-let',
          name: 'while let',
          level: 'basic',
          keywords: 'while let ループ パターン Option Some イテレータ pop',
          desc: `パターンが一致し続ける間ループする。スタックの \`pop()\` やイテレータの手動処理など、\`Option\` が \`None\` になるまで処理するパターンに最適。`,
          code: [
          { lang: 'RUST', code: `let mut stack = vec![1, 2, 3];

while let Some(top) = stack.pop() {
    println!("{top}");  // 3 → 2 → 1 の順に出力
}
// スタックが空になると pop() が None を返してループ終了

// チャネルでも便利（Receiver::recv() が Err になるまでループ）
// while let Ok(msg) = receiver.recv() { ... }` },
          ],
          output: `3
2
1`,
        },
      ],
    },
    {
      id: 's6',
      num: 6,
      title: '関数・クロージャ',
      level: 'basic',
      items: [
        {
          id: 's6-fn・戻り値の型',
          name: 'fn・戻り値の型',
          level: 'basic',
          keywords: 'fn 関数 引数 戻り値 型注釈 return 末尾式',
          desc: `関数は \`fn\` キーワードで定義。引数と戻り値の型は必須。最後の式（セミコロンなし）が暗黙の戻り値になる。早期リターンは \`return\` を使う。`,
          code: [
          { lang: 'RUST', code: `// 引数と戻り値の型注釈は必須
fn add(a: i32, b: i32) -> i32 {
    a + b           // 末尾式（セミコロンなし）= 暗黙の return
}

// 戻り値なし（Unit 型 () を返す）
fn greet(name: &str) {
    println!("Hello, {name}!");
}

// 早期 return
fn divide(a: f64, b: f64) -> Option<f64> {
    if b == 0.0 { return None; }
    Some(a / b)
}

println!("{}", add(3, 4));          // 7
greet("Rustacean");                 // Hello, Rustacean!
println!("{:?}", divide(10.0, 2.0)); // Some(5.0)
println!("{:?}", divide(1.0, 0.0));  // None` },
          ],
          output: `7
Hello, Rustacean!
Some(5.0)
None`,
        },
        {
          id: 's6-クロージャ-fn-fnmut-fnonce',
          name: 'クロージャ（Fn / FnMut / FnOnce）',
          level: 'basic',
          keywords: 'クロージャ closure Fn FnMut FnOnce キャプチャ 無名関数 |x|',
          desc: `クロージャは環境をキャプチャできる無名関数。\`|引数| 式\` で定義。型推論が働くため型注釈は通常省略できる。\`Fn\`・\`FnMut\`・\`FnOnce\` の 3 トレイトで呼び出し方を区別する。`,
          code: [
          { lang: 'RUST', code: `// 型推論（通常はこれで書く）
let add = |a, b| a + b;
println!("{}", add(3, 4));   // 7

// 型注釈付き（省略形と等価）
let add2 = |a: i32, b: i32| -> i32 { a + b };

// 環境をキャプチャ（不変参照）→ Fn
let factor = 10;
let multiply = |x| x * factor;   // factor を &capture
println!("{}", multiply(5));      // 50

// FnMut: キャプチャした変数を変更する
let mut count = 0;
let mut inc = || { count += 1; count };
println!("{}", inc());  // 1
println!("{}", inc());  // 2

// FnOnce: 所有権を取る → 1回しか呼べない
let s = String::from("hello");
let consume = || { drop(s); };  // s を move → FnOnce
consume();` },
          ],
          output: `7
50
1
2`,
        },
        {
          id: 's6-move-クロージャ',
          name: 'move クロージャ',
          level: 'basic',
          keywords: 'move クロージャ スレッド 所有権 キャプチャ スコープ外',
          desc: `\`move\` キーワードを付けると、クロージャはキャプチャした変数の所有権を取る。スレッドにクロージャを渡す際などに必須。`,
          code: [
          { lang: 'RUST', code: `use std::thread;

let msg = String::from("hello from thread");

let handle = thread::spawn(move || {
    println!("{msg}");  // msg の所有権を取って安全に使える
});

// println!("{msg}");  // move されたのでエラー

handle.join().unwrap();` },
          ],
          warn: `\`move\` クロージャは親スレッドより長生きする可能性があるため、参照ではなく所有権を取らないとコンパイルエラーになる。スレッドに渡すクロージャは \`move\` を付けるのが鉄則。\`move\` + \`clone()\` で元の値を残しつつスレッドに渡すパターンもよく使う。`,
        },
        {
          id: 's6-高階関数・関数ポインタ',
          name: '高階関数・関数ポインタ',
          level: 'advanced',
          keywords: '高階関数 map filter fold 関数ポインタ fn pointer 引数 戻り値 関数',
          desc: `クロージャや関数を引数・戻り値にできる。\`fn\` 型（関数ポインタ）はキャプチャしないため \`Fn\` トレイトも実装する。関数を動的に返す場合は \`Box<dyn Fn...>\` を使う。`,
          code: [
          { lang: 'RUST', code: `// impl Fn(...) → クロージャ/関数ポインタを引数に取る
fn apply<F: Fn(i32) -> i32>(f: F, x: i32) -> i32 { f(x) }

fn double(x: i32) -> i32 { x * 2 }

println!("{}", apply(double, 5));          // 10（関数ポインタ）
println!("{}", apply(|x| x + 1, 5));      // 6（クロージャ）

// 関数を返す（Box<dyn Fn> を使う）
fn make_adder(n: i32) -> Box<dyn Fn(i32) -> i32> {
    Box::new(move |x| x + n)
}
let add10 = make_adder(10);
println!("{}", add10(5));   // 15

// イテレータアダプタでよく使うパターン
let nums = vec![1, 2, 3, 4, 5];
let result: Vec<i32> = nums.iter()
    .filter(|&&x| x % 2 == 0)
    .map(|&x| x * x)
    .collect();
println!("{result:?}");  // [4, 16]` },
          ],
          output: `10
6
15
[4, 16]`,
        },
        {
          id: 's6-impl-trait-引数・戻り値',
          name: 'impl Trait（引数・戻り値）',
          level: 'advanced',
          keywords: 'impl Trait 引数 戻り値 インライン境界 静的ディスパッチ',
          desc: `\`impl Trait\` は引数位置ではジェネリクスの糖衣構文（静的ディスパッチ）、戻り値位置では「何らかの型を返すが具体型は隠す」意味になる。イテレータやクロージャを返す関数でよく使う。`,
          code: [
          { lang: 'RUST', code: `use std::fmt::Display;

// 引数の impl Trait（静的ディスパッチ、ジェネリクスと等価）
fn print_it(val: impl Display) {
    println!("{val}");
}

// 戻り値の impl Trait（具体型を返すが型名を隠す）
fn make_greeting(name: &str) -> impl Fn() -> String + '_ {
    move || format!("Hello, {name}!")
}

print_it(42);
print_it("hello");
let greet = make_greeting("Alice");
println!("{}", greet());   // Hello, Alice!` },
          ],
        },
      ],
    },
    {
      id: 's7',
      num: 7,
      title: '構造体',
      level: 'basic',
      items: [
        {
          id: 's7-struct-の定義とインスタンス化',
          name: 'struct の定義とインスタンス化',
          level: 'basic',
          keywords: 'struct 構造体 フィールド 定義 インスタンス 初期化',
          desc: `名前付きフィールドを持つ複合型。インスタンスを変更したい場合は \`mut\` を付ける（フィールド単位の \`mut\` はなく、構造体全体が \`mut\` になる）。`,
          code: [
          { lang: 'RUST', code: `struct User {
    name: String,
    email: String,
    age: u32,
    active: bool,
}

// インスタンス化
let user1 = User {
    name: String::from("Alice"),
    email: String::from("alice@example.com"),
    age: 30,
    active: true,
};

println!("{} ({})", user1.name, user1.age);

// フィールドと変数名が同じ場合は省略記法
let name = String::from("Bob");
let email = String::from("bob@example.com");
let user2 = User { name, email, age: 25, active: true };

// 構造体更新構文（残りのフィールドを別インスタンスからコピー）
let user3 = User {
    email: String::from("carol@example.com"),
    ..user1   // user1 の残りフィールドを使う（name が Move される点に注意）
};` },
          ],
          output: `Alice (30)`,
        },
        {
          id: 's7-メソッド-impl',
          name: 'メソッド（impl）',
          level: 'basic',
          keywords: 'impl メソッド self &self &mut self 定義 関連関数',
          desc: `\`impl\` ブロック内に定義。第 1 引数が \`&self\`（不変参照）・\`&mut self\`（可変参照）・\`self\`（所有権を取る）のいずれか。\`impl\` ブロックは複数に分けて書ける。`,
          code: [
          { lang: 'RUST', code: `struct Rectangle {
    width: f64,
    height: f64,
}

impl Rectangle {
    // &self: 不変メソッド（読み取り専用）
    fn area(&self) -> f64 {
        self.width * self.height
    }

    fn perimeter(&self) -> f64 {
        2.0 * (self.width + self.height)
    }

    // &mut self: 可変メソッド
    fn scale(&mut self, factor: f64) {
        self.width  *= factor;
        self.height *= factor;
    }

    // self: 所有権を取るメソッド（呼び出し後にインスタンスは無効）
    fn into_square(self) -> Rectangle {
        let side = self.width.min(self.height);
        Rectangle { width: side, height: side }
    }
}

let mut rect = Rectangle { width: 10.0, height: 5.0 };
println!("area: {}", rect.area());       // 50
rect.scale(2.0);
println!("scaled area: {}", rect.area()); // 200` },
          ],
          output: `area: 50
scaled area: 200`,
        },
        {
          id: 's7-関連関数-new',
          name: '関連関数（::new）',
          level: 'basic',
          keywords: '関連関数 associated function new コンストラクタ :: Self',
          desc: `\`self\` を取らない \`impl\` 内の関数を「関連関数」と呼ぶ。コンストラクタは慣習的に \`new\` と命名する。\`Self\` は実装対象の型のエイリアス。`,
          code: [
          { lang: 'RUST', code: `struct Circle {
    radius: f64,
}

impl Circle {
    // 関連関数（コンストラクタ）
    fn new(radius: f64) -> Self {  // Self = Circle
        Self { radius }
    }

    fn unit() -> Self {   // 複数のコンストラクタも可
        Self { radius: 1.0 }
    }

    fn area(&self) -> f64 {
        std::f64::consts::PI * self.radius * self.radius
    }
}

let c1 = Circle::new(5.0);
let c2 = Circle::unit();
println!("{:.2}", c1.area());  // 78.54
println!("{:.2}", c2.area());  // 3.14` },
          ],
          output: `78.54
3.14`,
        },
        {
          id: 's7-タプル構造体',
          name: 'タプル構造体',
          level: 'basic',
          keywords: 'タプル構造体 tuple struct 名前なしフィールド newtype パターン',
          desc: `フィールドに名前を付けない構造体。型に意味を持たせる「newtype パターン」でよく使う。フィールドへのアクセスは \`.0\`、\`.1\`… のインデックスを使う。`,
          code: [
          { lang: 'RUST', code: `struct Point(f64, f64);
struct Color(u8, u8, u8);

let origin = Point(0.0, 0.0);
let red     = Color(255, 0, 0);

println!("x={}, y={}", origin.0, origin.1);

// デストラクチャリング
let Point(x, y) = origin;
let Color(r, g, b) = red;
println!("rgb({r}, {g}, {b})");

// newtype パターン: 同じ基底型でも別型として扱える
struct Meters(f64);
struct Kilograms(f64);
// Meters と Kilograms は同じ f64 だが型が異なるため混在不可` },
          ],
        },
        {
          id: 's7-構造体の更新構文',
          name: '構造体の更新構文',
          level: 'basic',
          keywords: '構造体更新構文 .. spread 残りフィールド コピー Move',
          desc: `\`..existing\` で既存インスタンスの残りフィールドを引き継いだ新インスタンスを作れる。\`Copy\` でないフィールドは Move される点に注意。`,
          code: [
          { lang: 'RUST', code: `struct Config {
    debug: bool,
    max_connections: u32,
    host: String,
    port: u16,
}

let default = Config {
    debug: false,
    max_connections: 100,
    host: String::from("localhost"),
    port: 8080,
};

// host フィールドを変えて新インスタンスを作る
let production = Config {
    host: String::from("prod.example.com"),
    port: 443,
    ..default   // debug・max_connections は default から引き継ぐ
                // default.host は Move されるため default.host は使えなくなる
};
println!("{}:{}", production.host, production.port);  // prod.example.com:443` },
          ],
        },
      ],
    },
    {
      id: 's8',
      num: 8,
      title: '列挙体とパターンマッチ',
      level: 'basic',
      items: [
        {
          id: 's8-enum-の定義とデータ付きバリアント',
          name: 'enum の定義とデータ付きバリアント',
          level: 'basic',
          keywords: 'enum 列挙体 バリアント データ付き 定義',
          desc: `Rust の \`enum\` は各バリアントがデータを持てる代数的データ型。他言語と異なり、バリアントごとに異なる型・数のフィールドを持てる。`,
          code: [
          { lang: 'RUST', code: `// データなし
enum Direction { North, South, East, West }

// データ付きバリアント（バリアントごとに型が異なってよい）
enum Message {
    Quit,                        // データなし
    Move { x: i32, y: i32 },    // 匿名構造体
    Write(String),               // タプル形式
    ChangeColor(u8, u8, u8),     // 複数フィールド
}

// impl でメソッドも定義できる
impl Message {
    fn describe(&self) -> &str {
        match self {
            Message::Quit           => "quit",
            Message::Move { .. }    => "move",
            Message::Write(_)       => "write",
            Message::ChangeColor(..)=> "color",
        }
    }
}

let m = Message::Move { x: 10, y: 20 };
println!("{}", m.describe());  // move` },
          ],
        },
        {
          id: 's8-option-t',
          name: 'Option<T>',
          level: 'basic',
          keywords: 'Option Some None null 安全 値の有無 unwrap',
          desc: `値が存在するか否かを表す標準 enum。Rust に \`null\` はなく、値がない可能性は \`Option<T>\` で明示的に扱う。`,
          code: [
          { lang: 'RUST', code: `let some_val: Option<i32> = Some(42);
let no_val:   Option<i32> = None;

// 安全な取り出し方法
if let Some(v) = some_val { println!("{v}"); }

// map: Some のときだけ変換（None はそのまま）
let doubled = some_val.map(|x| x * 2);  // Some(84)

// unwrap_or: None の場合にデフォルト値
let val = no_val.unwrap_or(0);           // 0

// unwrap_or_else: None の場合にクロージャで生成
let val2 = no_val.unwrap_or_else(|| expensive_default());

// and_then: Some のときだけ次の Option を返す（チェーン）
let result = some_val
    .filter(|&x| x > 10)
    .map(|x| x.to_string());  // Some("42")

fn expensive_default() -> i32 { 99 }` },
          ],
          warn: `\`unwrap()\` は \`None\` のとき panic する。プロダクションコードでは \`unwrap_or\`・\`unwrap_or_else\`・\`?\`演算子・\`if let\` のいずれかを使う。「絶対に \`Some\` だとわかる」ケースでも \`expect("reason")\` でパニック時のメッセージを残すのが良い習慣。`,
        },
        {
          id: 's8-match-の網羅性',
          name: 'match の網羅性',
          level: 'basic',
          keywords: 'match パターンマッチ 網羅性 enum 分岐 アーム ガード',
          desc: `\`match\` はすべてのパターンを網羅しないとコンパイルエラー。\`_\` でデフォルトアームを書ける。ガード条件（\`if\`）で絞り込みもできる。`,
          code: [
          { lang: 'RUST', code: `// 基本的な match
let num = 7;
let label = match num {
    1       => "one",
    2 | 3   => "two or three",    // OR パターン
    4..=6   => "four to six",     // 範囲パターン
    n if n % 2 == 0 => "even",    // ガード条件
    _       => "other",           // デフォルト（必須）
};
println!("{label}");  // other

// enum のデストラクチャリング
enum Shape { Circle(f64), Rect(f64, f64) }

let s = Shape::Rect(3.0, 4.0);
let area = match s {
    Shape::Circle(r)    => std::f64::consts::PI * r * r,
    Shape::Rect(w, h)   => w * h,
};
println!("{area}");  // 12

// @ バインディング（値をバインドしながらパターンマッチ）
let x = 15;
match x {
    n @ 1..=12 => println!("month: {n}"),
    n @ 13..=19 => println!("teen: {n}"),
    n => println!("other: {n}"),
}` },
          ],
          warn: `\`enum\` にバリアントを追加すると、そのバリアントをカバーしていないすべての \`match\` がコンパイルエラーになる。ライブラリの \`enum\` を \`_\` なしで \`match\` するとバージョンアップ時に壊れる。外部ライブラリの \`enum\` をマッチするときは \`_ => ()\` を残しておくのが安全策。`,
        },
        {
          id: 's8-if-let-while-let-再掲・enum-用法',
          name: 'if let / while let（再掲・enum 用法）',
          level: 'basic',
          keywords: 'if let while let パターン Option Result 簡潔',
          desc: `1 パターンのみ処理したい場合に \`match\` より簡潔に書ける。\`let-else\`（Rust 1.65+）は値が取れない場合に早期 return するイディオム。`,
          code: [
          { lang: 'RUST', code: `enum Coin { Penny, Quarter(String) }
let coin = Coin::Quarter(String::from("Alaska"));

// if let でバリアントを取り出す
if let Coin::Quarter(state) = &coin {
    println!("quarter from {state}");
}

// let-else: 取れない場合に早期 return（Rust 1.65+）
fn process(val: Option<i32>) -> i32 {
    let Some(x) = val else {
        return -1;   // None なら早期 return
    };
    x * 2
}
println!("{}", process(Some(5)));  // 10
println!("{}", process(None));     // -1` },
          ],
        },
        {
          id: 's8-演算子の仕組み',
          name: '? 演算子の仕組み',
          level: 'basic',
          keywords: '? 演算子 Result Option 早期リターン エラー伝播 From Into',
          desc: `\`?\` は \`Result\` が \`Err\`（または \`Option\` が \`None\`）のとき即座に \`return\` するシンタックスシュガー。\`From\` トレイトによるエラー型変換も自動で行われる。`,
          code: [
          { lang: 'RUST', code: `use std::num::ParseIntError;

fn parse_and_double(s: &str) -> Result<i32, ParseIntError> {
    let n = s.trim().parse::<i32>()?;  // Err なら即 return
    Ok(n * 2)
}

// ? なしで同等に書くと:
fn parse_and_double_verbose(s: &str) -> Result<i32, ParseIntError> {
    let n = match s.trim().parse::<i32>() {
        Ok(v)  => v,
        Err(e) => return Err(e.into()),  // From::from(e) で変換して return
    };
    Ok(n * 2)
}

println!("{:?}", parse_and_double("21"));   // Ok(42)
println!("{:?}", parse_and_double("abc"));  // Err(...)

// Option にも使える（None で即 return）
fn first_char(s: &str) -> Option<char> {
    let c = s.chars().next()?;  // None なら即 return None
    Some(c.to_uppercase().next()?)
}` },
          ],
        },
      ],
    },
    {
      id: 's9',
      num: 9,
      title: 'コレクション',
      level: 'basic',
      items: [
        {
          id: 's9-vec-t',
          name: 'Vec<T>',
          level: 'basic',
          keywords: 'Vec ベクタ 動的配列 push pop get スライス vec!',
          desc: `ヒープ上の動的配列。要素数が実行時に変わる場合に使う。インデックスアクセスはパニックの可能性があるため、安全には \`get()\` を使う。`,
          code: [
          { lang: 'RUST', code: `// 作成
let mut v: Vec<i32> = Vec::new();
let v2 = vec![1, 2, 3, 4, 5];   // マクロで初期化

// 追加・削除
v.push(10);
v.push(20);
v.push(30);
let last = v.pop();   // Some(30)

// アクセス
let first = &v[0];              // パニックの可能性あり
let safe  = v.get(0);          // Option<&i32> → 安全
let safe2 = v.get(100);        // None（パニックしない）

// イテレート
for val in &v { print!("{val} "); }  // 10 20
println!();

// 可変イテレート
let mut nums = vec![1, 2, 3];
for x in &mut nums { *x *= 2; }
println!("{nums:?}");  // [2, 4, 6]

// よく使うメソッド
println!("{}", v.len());      // 要素数
println!("{}", v.is_empty()); // false
v.sort();                      // ソート（要素が Ord を実装）
v.dedup();                     // 連続する重複を除去
v.retain(|&x| x > 5);        // 条件を満たす要素だけ残す` },
          ],
        },
        {
          id: 's9-hashmap-k-v',
          name: 'HashMap<K, V>',
          level: 'basic',
          keywords: 'HashMap ハッシュマップ キー バリュー entry API 挿入 取得',
          desc: `キーと値のペアを保持するハッシュテーブル。キーの型は \`Hash + Eq\` を実装している必要がある。\`entry\` API で「なければ挿入」を効率よく書ける。`,
          code: [
          { lang: 'RUST', code: `use std::collections::HashMap;

let mut scores: HashMap<String, i32> = HashMap::new();

// 挿入
scores.insert(String::from("Alice"), 100);
scores.insert(String::from("Bob"),   85);

// 取得（&K で借用して検索可）
let alice = scores.get("Alice");  // Option<&i32> → Some(&100)
let carol = scores.get("Carol");  // None

// インデックスアクセス（存在しなければ panic）
// let v = scores["Alice"];  // ← 注意

// entry API: キーが存在しなければデフォルト値を挿入
scores.entry(String::from("Carol")).or_insert(70);
println!("{:?}", scores.get("Carol"));  // Some(70)

// 値の更新（単語カウントの例）
let text = "hello world hello rust";
let mut word_count: HashMap<&str, i32> = HashMap::new();
for word in text.split_whitespace() {
    let count = word_count.entry(word).or_insert(0);
    *count += 1;
}
println!("{word_count:?}");

// イテレート（順序は不定）
for (key, val) in &scores {
    println!("{key}: {val}");
}` },
          ],
          warn: `\`entry().or_insert()\` は「キーがなければ挿入して参照を返す」API。\`insert()\` を毎回呼ぶより効率的で、存在チェックと挿入をアトミックに行える。\`HashMap\` は挿入順を保持しない（順序が必要なら \`BTreeMap\`・\`IndexMap\` などを検討）。`,
        },
        {
          id: 's9-hashset-t',
          name: 'HashSet<T>',
          level: 'basic',
          keywords: 'HashSet セット 重複なし contains insert union intersection 差集合',
          desc: `重複なしのコレクション。和集合・積集合・差集合などの集合演算をサポート。\`HashMap<T, ()>\` の特化版。`,
          code: [
          { lang: 'RUST', code: `use std::collections::HashSet;

let mut set: HashSet<i32> = HashSet::new();
set.insert(1); set.insert(2); set.insert(3); set.insert(2); // 重複は無視
println!("{}", set.len());           // 3

println!("{}", set.contains(&2));    // true

// Vec から変換（重複除去）
let v = vec![1, 2, 2, 3, 3, 3];
let unique: HashSet<_> = v.into_iter().collect();

let a: HashSet<i32> = [1, 2, 3, 4].iter().cloned().collect();
let b: HashSet<i32> = [3, 4, 5, 6].iter().cloned().collect();

// 集合演算（イテレータを返す）
let union:        HashSet<_> = a.union(&b).collect();        // {1,2,3,4,5,6}
let intersection: HashSet<_> = a.intersection(&b).collect(); // {3,4}
let difference:   HashSet<_> = a.difference(&b).collect();   // {1,2}

println!("{:?}", intersection);` },
          ],
        },
        {
          id: 's9-イテレータアダプタ',
          name: 'イテレータアダプタ',
          level: 'basic',
          keywords: 'イテレータ アダプタ map filter fold collect chain zip enumerate take skip',
          desc: `Rust のイテレータは遅延評価。アダプタを連鎖しても \`collect()\`・\`for_each()\`・\`sum()\` などの「消費」メソッドが呼ばれるまで計算されない。`,
          code: [
          { lang: 'RUST', code: `let v = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map + filter + collect（遅延評価）
let result: Vec<i32> = v.iter()
    .filter(|&&x| x % 2 == 0)   // 偶数だけ
    .map(|&x| x * x)             // 二乗
    .collect();
println!("{result:?}");          // [4, 16, 36, 64, 100]

// fold（畳み込み）
let sum = v.iter().fold(0, |acc, &x| acc + x);
println!("{sum}");  // 55

// sum / product（専用メソッド）
let s: i32 = v.iter().sum();
let p: i32 = vec![1, 2, 3, 4].iter().product();

// take / skip
let first3: Vec<_> = v.iter().take(3).collect();   // [1, 2, 3]
let skip3:  Vec<_> = v.iter().skip(3).collect();   // [4..10]

// chain（2つのイテレータを連結）
let a = vec![1, 2];
let b = vec![3, 4];
let chained: Vec<_> = a.iter().chain(b.iter()).collect(); // [1,2,3,4]

// zip（2つのイテレータをタプルにまとめる）
let names = vec!["Alice", "Bob"];
let scores = vec![90, 80];
let pairs: Vec<_> = names.iter().zip(scores.iter()).collect();
println!("{pairs:?}");  // [("Alice", 90), ("Bob", 80)]

// any / all / find / position
println!("{}", v.iter().any(|&x| x > 9));    // true
println!("{}", v.iter().all(|&x| x > 0));    // true
println!("{:?}", v.iter().find(|&&x| x > 5)); // Some(6)` },
          ],
        },
      ],
    },
    {
      id: 's10',
      num: 10,
      title: 'エラー処理',
      level: 'basic',
      items: [
        {
          id: 's10-result-t-e',
          name: 'Result<T, E>',
          level: 'basic',
          keywords: 'Result Ok Err エラー処理 戻り値 成功 失敗',
          desc: `失敗する可能性のある操作の戻り値。\`Ok(T)\` で成功値、\`Err(E)\` でエラー値を包む。\`match\` や \`?\` 演算子で処理する。`,
          code: [
          { lang: 'RUST', code: `use std::fs;
use std::io;

fn read_file(path: &str) -> Result<String, io::Error> {
    fs::read_to_string(path)   // Result<String, io::Error> を返す
}

// match で処理
match read_file("hello.txt") {
    Ok(content) => println!("{content}"),
    Err(e)      => eprintln!("エラー: {e}"),
}

// ? で伝播（関数の戻り値も Result である必要がある）
fn load_and_process(path: &str) -> Result<usize, io::Error> {
    let content = fs::read_to_string(path)?;  // Err なら即 return
    Ok(content.len())
}

// 便利メソッド
let r: Result<i32, &str> = Ok(42);
println!("{}", r.unwrap_or(0));           // 42
println!("{}", r.map(|x| x * 2).unwrap()); // 84
let _: Result<i32, String> = r.map_err(|e| e.to_string());` },
          ],
        },
        {
          id: 's10-演算子とエラー型変換',
          name: '? 演算子とエラー型変換',
          level: 'basic',
          keywords: '? 演算子 エラー伝播 From Into 変換 Box dyn Error',
          desc: `\`?\` は \`Err\` を \`From::from()\` で呼び出し元の戻り値型に変換しながら早期 return する。異なるエラー型を扱う場合は \`Box<dyn Error>\` か統合エラー型を使う。`,
          code: [
          { lang: 'RUST', code: `use std::error::Error;
use std::fs;
use std::num::ParseIntError;

// 複数の異なるエラー型を扱うには Box<dyn Error> が手軽
fn load_number(path: &str) -> Result<i32, Box<dyn Error>> {
    let s = fs::read_to_string(path)?;    // io::Error → Box<dyn Error>
    let n = s.trim().parse::<i32>()?;   // ParseIntError → Box<dyn Error>
    Ok(n * 2)
}

// From トレイトで自動変換される仕組み
#[derive(Debug)]
enum AppError {
    Io(std::io::Error),
    Parse(ParseIntError),
}
impl From<std::io::Error> for AppError {
    fn from(e: std::io::Error) -> Self { AppError::Io(e) }
}
impl From<ParseIntError> for AppError {
    fn from(e: ParseIntError) -> Self { AppError::Parse(e) }
}

fn load_num2(path: &str) -> Result<i32, AppError> {
    let s = fs::read_to_string(path)?;  // io::Error → AppError::Io
    let n = s.trim().parse::<i32>()?; // ParseIntError → AppError::Parse
    Ok(n)
}` },
          ],
        },
        {
          id: 's10-カスタムエラー型・thiserror-anyhow',
          name: 'カスタムエラー型・thiserror / anyhow',
          level: 'advanced',
          keywords: 'カスタムエラー型 thiserror anyhow サードパーティ エラー定義 Display',
          desc: `本番コードでは \`thiserror\`（ライブラリ向け：型付きエラー定義を簡略化）と \`anyhow\`（アプリ向け：ボイラープレートなしで \`Box<dyn Error>\` 相当を扱う）が標準的に使われる。`,
          code: [
          { lang: 'RUST', code: `// --- thiserror（ライブラリ向け） ---
// Cargo.toml: thiserror = "1"
use thiserror::Error;

#[derive(Debug, Error)]
enum MyError {
    #[error("IO エラー: {0}")]
    Io(#[from] std::io::Error),
    #[error("パースエラー: {0}")]
    Parse(#[from] std::num::ParseIntError),
    #[error("値が範囲外: {value} (max: {max})")]
    OutOfRange { value: i32, max: i32 },
}

// --- anyhow（アプリ向け） ---
// Cargo.toml: anyhow = "1"
use anyhow::{Context, Result};

fn run() -> Result<()> {   // anyhow::Result = Result<T, anyhow::Error>
    let s = std::fs::read_to_string("config.toml")
        .context("config.toml の読み込みに失敗")?;  // エラーにコンテキストを追加
    println!("{s}");
    Ok(())
}` },
          ],
        },
        {
          id: 's10-panic-と-unwrap-expect',
          name: 'panic! と unwrap / expect',
          level: 'basic',
          keywords: 'panic unwrap expect 回復不可能 プログラムバグ abort',
          desc: `\`panic!\` はプログラムのバグ（回復不可能なエラー）用。スタックを巻き戻してプロセスを終了する。\`unwrap()\` / \`expect()\` は内部で \`panic!\` を呼ぶ。`,
          code: [
          { lang: 'RUST', code: `// panic! の直接呼び出し（到達不可能な分岐など）
fn divide(a: i32, b: i32) -> i32 {
    if b == 0 { panic!("ゼロ除算は許可されていません"); }
    a / b
}

// unwrap: None/Err のとき panic（メッセージなし）
let v: Option<i32> = Some(5);
let x = v.unwrap();  // Some なので安全

// expect: panic 時にカスタムメッセージ（推奨）
let y = v.expect("v は必ず Some のはず");  // パニック時にメッセージが出る

// unreachable! / todo! / unimplemented! も内部で panic
fn process(flag: bool) -> i32 {
    if flag { 1 }
    else { unreachable!("flag が false になることはない") }
}` },
          ],
          warn: `\`unwrap()\`・\`expect()\` はプロトタイプ・テスト・「絶対に None にならないことを証明できる箇所」以外では避ける。プロダクションコードでは \`?\`・\`unwrap_or\`・\`match\` で適切にエラーを伝播・回復する。`,
        },
        {
          id: 's10-option-result-変換',
          name: 'Option ↔ Result 変換',
          level: 'advanced',
          keywords: 'エラー変換 map_err ok_or ok_or_else Option Result 変換',
          desc: `\`Option\` と \`Result\` を相互変換するメソッドを使うと、\`?\` 演算子を一貫して使えるコードが書ける。`,
          code: [
          { lang: 'RUST', code: `// Option → Result
let opt: Option<i32> = Some(42);
let res: Result<i32, &str> = opt.ok_or("値がありません");       // Ok(42)
let res2 = opt.ok_or_else(|| format!("エラー: {}", "詳細")); // クロージャ版

// Result → Option
let r: Result<i32, &str> = Ok(42);
let o: Option<i32> = r.ok();    // Some(42)（Err の場合は None）
let e: Option<&str> = r.err();  // None（Ok の場合は None）

// ? で統一的に使う例
fn find_and_parse(map: &std::collections::HashMap<&str, &str>, key: &str)
    -> Result<i32, Box<dyn std::error::Error>>
{
    let s = map.get(key).ok_or("key not found")?;   // Option → Result → ?
    let n = s.parse::<i32>()?;
    Ok(n)
}` },
          ],
        },
      ],
    },
    {
      id: 's11',
      num: 11,
      title: 'トレイト',
      level: 'basic',
      items: [
        {
          id: 's11-trait-の定義と実装',
          name: 'trait の定義と実装',
          level: 'basic',
          keywords: 'trait トレイト 定義 実装 impl for 共通インターフェース メソッド',
          desc: `トレイトは型が持つべきメソッドのインターフェース定義。他言語のインターフェース・抽象クラスに相当。\`impl TraitName for Type\` で実装する。`,
          code: [
          { lang: 'RUST', code: `trait Animal {
    fn name(&self) -> &str;             // 必須メソッド
    fn sound(&self) -> &str;            // 必須メソッド

    // デフォルト実装（オーバーライド可）
    fn describe(&self) -> String {
        format!("{} は {} と鳴く", self.name(), self.sound())
    }
}

struct Dog;
struct Cat;

impl Animal for Dog {
    fn name(&self)  -> &str { "犬" }
    fn sound(&self) -> &str { "ワン" }
}

impl Animal for Cat {
    fn name(&self)  -> &str { "猫" }
    fn sound(&self) -> &str { "ニャン" }
    fn describe(&self) -> String { // デフォルト実装を上書き
        format!("{}（気まぐれ）は {} と鳴く", self.name(), self.sound())
    }
}

let d = Dog;
let c = Cat;
println!("{}", d.describe());  // 犬 は ワン と鳴く
println!("{}", c.describe());  // 猫（気まぐれ）は ニャン と鳴く` },
          ],
        },
        {
          id: 's11-トレイト境界-t-trait-where-句',
          name: 'トレイト境界（<T: Trait> / where 句）',
          level: 'basic',
          keywords: 'トレイト境界 where 句 impl Trait 型パラメータ 制約 ジェネリクス',
          desc: `ジェネリック型パラメータに「このトレイトを実装していること」という制約を付ける。複数のトレイトは \`+\` で列挙する。複雑な場合は \`where\` 句で可読性を高める。`,
          code: [
          { lang: 'RUST', code: `use std::fmt::{Display, Debug};

// T は Display + Debug を実装している必要がある
fn print_both<T: Display + Debug>(val: T) {
    println!("Display: {val}");
    println!("Debug:   {val:?}");
}

// where 句（複数の型パラメータで読みやすくなる）
fn compare_and_display<T, U>(t: T, u: U)
where
    T: Display + PartialOrd,
    U: Display,
{
    println!("{t} and {u}");
}

print_both(42);
compare_and_display(3.14, "hello");` },
          ],
        },
        {
          id: 's11-重要な標準トレイト',
          name: '重要な標準トレイト',
          level: 'basic',
          keywords: 'Display Debug Clone PartialEq Eq PartialOrd Ord Hash 標準トレイト derive',
          desc: `よく使う標準トレイト一覧。多くは \`#[derive(...)]\` で自動実装できる。`,
          code: [
          { lang: 'RUST', code: `use std::fmt;

// derive で自動実装できる主なトレイト
#[derive(Debug, Clone, PartialEq, Eq, PartialOrd, Ord, Hash)]
struct Point { x: i32, y: i32 }

// Display は手動実装が必要
impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}

let p1 = Point { x: 1, y: 2 };
let p2 = p1.clone();              // Clone
println!("{p1}");                 // Display → (1, 2)
println!("{p1:?}");               // Debug  → Point { x: 1, y: 2 }
println!("{}", p1 == p2);        // PartialEq → true
println!("{}", p1 < Point { x: 2, y: 0 }); // PartialOrd → true

// よく使う標準トレイト一覧
// Display    : {} フォーマット
// Debug      : {:?} フォーマット（derive 可）
// Clone      : .clone()（derive 可）
// Copy       : 暗黙コピー（derive 可、Drop と共存不可）
// PartialEq  : == / !=（derive 可）
// Eq         : 完全等値（PartialEq の上位、derive 可）
// PartialOrd : < > <= >=（derive 可）
// Ord        : 全順序（derive 可、ソートに必要）
// Hash       : HashMap/HashSet のキー（derive 可）
// Default    : デフォルト値 T::default()（derive 可）
// From/Into  : 型変換` },
          ],
        },
        {
          id: 's11-トレイトオブジェクト-dyn-trait',
          name: 'トレイトオブジェクト（dyn Trait）',
          level: 'advanced',
          keywords: 'トレイトオブジェクト dyn Trait 動的ディスパッチ Box 異種コレクション',
          desc: `\`dyn Trait\` は動的ディスパッチ（vtable 経由）。ヒープに置く場合は \`Box<dyn Trait>\`、参照なら \`&dyn Trait\`。異なる具体型を同一コレクションに格納するときに使う。`,
          code: [
          { lang: 'RUST', code: `trait Draw {
    fn draw(&self);
}

struct Circle  { radius: f64 }
struct Square  { side: f64 }

impl Draw for Circle { fn draw(&self) { println!("○ r={}", self.radius); } }
impl Draw for Square { fn draw(&self) { println!("□ s={}", self.side); } }

// 異種の型を同一 Vec に格納（動的ディスパッチ）
let shapes: Vec<Box<dyn Draw>> = vec![
    Box::new(Circle { radius: 3.0 }),
    Box::new(Square { side:   2.0 }),
];

for shape in &shapes {
    shape.draw();   // 実行時に vtable を通じて呼び出す
}

// &dyn Trait（参照版、ヒープ確保なし）
fn draw_it(shape: &dyn Draw) { shape.draw(); }
draw_it(&Circle { radius: 1.0 });` },
          ],
        },
        {
          id: 's11-演算子オーバーロード',
          name: '演算子オーバーロード',
          level: 'advanced',
          keywords: '演算子オーバーロード Add Sub Mul ops トレイト 実装',
          desc: `\`std::ops\` のトレイトを実装することで演算子をオーバーロードできる。\`Add\`・\`Sub\`・\`Mul\`・\`Neg\`・\`Index\` など。`,
          code: [
          { lang: 'RUST', code: `use std::ops::{Add, Neg};

#[derive(Debug, Clone, Copy, PartialEq)]
struct Vec2 { x: f64, y: f64 }

impl Add for Vec2 {
    type Output = Vec2;
    fn add(self, rhs: Vec2) -> Vec2 {
        Vec2 { x: self.x + rhs.x, y: self.y + rhs.y }
    }
}

impl Neg for Vec2 {
    type Output = Vec2;
    fn neg(self) -> Vec2 { Vec2 { x: -self.x, y: -self.y } }
}

let a = Vec2 { x: 1.0, y: 2.0 };
let b = Vec2 { x: 3.0, y: 4.0 };
println!("{:?}", a + b);   // Vec2 { x: 4.0, y: 6.0 }
println!("{:?}", -a);      // Vec2 { x: -1.0, y: -2.0 }` },
          ],
        },
      ],
    },
    {
      id: 's12',
      num: 12,
      title: 'ジェネリクス',
      level: 'basic',
      items: [
        {
          id: 's12-ジェネリック関数・構造体',
          name: 'ジェネリック関数・構造体',
          level: 'basic',
          keywords: 'ジェネリクス 型パラメータ T 関数 構造体 enum 汎用',
          desc: `型パラメータ \`T\` を使うことで型に依存しないコードを書ける。コンパイル時に具体的な型に展開される（単態化）ため実行時コストはゼロ。`,
          code: [
          { lang: 'RUST', code: `// ジェネリック関数
fn largest<T: PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0];
    for item in list {
        if item > largest { largest = item; }
    }
    largest
}

println!("{}", largest(&[3, 1, 4, 1, 5, 9]));       // 9
println!("{}", largest(&[3.14, 2.71, 1.41]));        // 3.14

// ジェネリック構造体
#[derive(Debug)]
struct Pair<T> {
    first: T,
    second: T,
}

impl<T: Display + PartialOrd> Pair<T> {
    fn cmp_display(&self) {
        if self.first >= self.second {
            println!("最大: {}", self.first);
        } else {
            println!("最大: {}", self.second);
        }
    }
}

use std::fmt::Display;
let p = Pair { first: 5, second: 10 };
p.cmp_display();  // 最大: 10` },
          ],
        },
        {
          id: 's12-トレイト境界と-where-句',
          name: 'トレイト境界と where 句',
          level: 'basic',
          keywords: 'where 句 トレイト境界 複数 型パラメータ 可読性',
          desc: `複数の型パラメータや複雑な境界は \`where\` 句に分離すると読みやすくなる。型パラメータが 1 つで境界が単純なら山括弧内に書くのが慣習。`,
          code: [
          { lang: 'RUST', code: `use std::fmt::{Debug, Display};

// where 句で可読性を高める
fn debug_print<T, U>(t: &T, u: &U) -> String
where
    T: Debug + Display,
    U: Debug + Clone,
{
    format!("{t} / {u:?}")
}

// 複数の境界（+ で連結）
fn print_info<T: Display + Debug + Clone>(val: T) {
    let cloned = val.clone();
    println!("{val} ({cloned:?})");
}

// 条件付き実装（blanket impl）
struct Wrapper<T>(T);

impl<T: Display> Display for Wrapper<T> {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "[{}]", self.0)
    }
}

println!("{}", Wrapper(42));      // [42]
println!("{}", Wrapper("hello")); // [hello]` },
          ],
        },
        {
          id: 's12-impl-trait-関数の引数・戻り値',
          name: 'impl Trait（関数の引数・戻り値）',
          level: 'basic',
          keywords: 'impl Trait 戻り値 引数 静的ディスパッチ 返す クロージャ イテレータ',
          desc: `\`impl Trait\` は静的ディスパッチ（コンパイル時解決）。引数位置ではジェネリクスの糖衣構文、戻り値位置では「具体型を隠す」意味。クロージャやイテレータを返すときによく使う。`,
          code: [
          { lang: 'RUST', code: `use std::fmt::Display;

// 引数: impl Trait（ジェネリクスと同等、呼び出しが簡潔）
fn announce(item: &impl Display) { println!("発表: {item}"); }

// 戻り値: 具体的な型名を隠してトレイトとして返す
fn make_adder(n: i32) -> impl Fn(i32) -> i32 {
    move |x| x + n   // クロージャ（具体型を書けない）
}

// イテレータを返す例
fn evens_up_to(n: u32) -> impl Iterator<Item = u32> {
    (0..=n).filter(|x| x % 2 == 0)
}

announce(&42);
announce(&"hello");

let add5 = make_adder(5);
println!("{}", add5(3));  // 8

let evens: Vec<_> = evens_up_to(10).collect();
println!("{evens:?}");  // [0, 2, 4, 6, 8, 10]` },
          ],
        },
        {
          id: 's12-単態化-monomorphization',
          name: '単態化（Monomorphization）',
          level: 'advanced',
          keywords: '単態化 monomorphization コンパイル時 ゼロコスト ジェネリクス 展開',
          desc: `Rust のジェネリクスはコンパイル時に型ごとの具体的なコードに展開される（単態化）。ゼロコスト抽象化を実現するが、バイナリサイズが増加することがある。\`dyn Trait\` と使い分ける。`,
          code: [
          { lang: 'RUST', code: `// コンパイラが以下のように展開する（概念図）
fn largest<T: PartialOrd>(list: &[T]) -> &T { /* ... */ }

// 実際には以下の 2 つのコードが生成される:
// fn largest_i32(list: &[i32]) -> &i32 { ... }
// fn largest_f64(list: &[f64]) -> &f64 { ... }

// ジェネリクス vs dyn Trait の比較
// ジェネリクス（impl Trait）: 静的ディスパッチ・高速・バイナリ増加
// dyn Trait:                  動的ディスパッチ・vtable・コード共通

// バイナリサイズが問題になるケースでは dyn Trait が有効
fn process_static(val: &impl std::fmt::Display) { println!("{val}"); }  // 型ごとに展開
fn process_dynamic(val: &dyn std::fmt::Display) { println!("{val}"); }  // 共有コード` },
          ],
        },
      ],
    },
    {
      id: 's13',
      num: 13,
      title: 'モジュール・Cargo',
      level: 'basic',
      items: [
        {
          id: 's13-mod-pub-use',
          name: 'mod / pub / use',
          level: 'basic',
          keywords: 'mod pub use モジュール 可視性 パス 名前空間 ファイル分割',
          desc: `Rust のモジュールシステム。\`mod\` で名前空間を定義し、\`pub\` で公開範囲を制御、\`use\` でパスを短縮する。ファイル \`foo.rs\` は \`mod foo;\` で自動的にモジュールとして読み込まれる。`,
          code: [
          { lang: 'RUST', code: `// src/main.rs（またはlib.rs）
mod greet {
    pub fn hello(name: &str) {    // pub: モジュール外から参照可
        println!("Hello, {name}!");
    }

    fn private_fn() {}           // pub なし: モジュール内のみ

    pub mod inner {              // ネストモジュール
        pub fn world() { println!("world"); }
    }
}

// フルパスで呼ぶ
greet::hello("Alice");
greet::inner::world();

// use でパスを短縮
use greet::hello;
use greet::inner::world;
hello("Bob");

// 複数を一括 use
use std::collections::{HashMap, HashSet, BTreeMap};

// as でエイリアス
use std::fmt::Display as Disp;` },
          ],
        },
        {
          id: 's13-可視性の細かい制御',
          name: '可視性の細かい制御',
          level: 'basic',
          keywords: 'pub 可視性 pub(crate) pub(super) pub(in) アクセス制御',
          desc: `\`pub\` 以外にもスコープを限定した可視性指定子がある。ライブラリ設計で内部 API とパブリック API を分けるときに使う。`,
          code: [
          { lang: 'RUST', code: `pub struct Config {
    pub name: String,           // 完全公開
    pub(crate) debug: bool,     // クレート内のみ公開
    pub(super) level: u8,       // 親モジュールまで公開
    secret: String,             // プライベート（同モジュールのみ）
}

// pub(crate) はクレート内部での共有に便利
// （外部クレートから見えないが、クレート内のどこからでも使える）

mod outer {
    pub(super) fn shared() {}   // 親（crate root）まで公開

    mod inner {
        pub(in super::outer) fn local() {}  // outer モジュール内のみ
    }
}` },
          ],
        },
        {
          id: 's13-cargo-toml-と依存関係',
          name: 'Cargo.toml と依存関係',
          level: 'basic',
          keywords: 'Cargo.toml 依存関係 crate バージョン features ビルド',
          desc: `Cargo は Rust 公式のビルドシステム兼パッケージマネージャ。\`Cargo.toml\` で依存クレートを管理し、\`cargo build\` で一括ビルドする。`,
          code: [
          { lang: 'RUST', code: `// Cargo.toml（TOML 形式）
[package]
name    = "my_app"
version = "0.1.0"
edition = "2021"

[dependencies]
serde       = { version = "1", features = ["derive"] }  # フィーチャーフラグ
tokio       = { version = "1", features = ["full"] }
anyhow      = "1"
thiserror   = "1"

[dev-dependencies]   # テスト時のみ
criterion   = "0.5"  # ベンチマーク

[build-dependencies] # ビルドスクリプト用
cc = "1"

// よく使う Cargo コマンド（ターミナル）
// cargo new my_project    プロジェクト作成
// cargo build             デバッグビルド
// cargo build --release   リリースビルド
// cargo run               ビルド＆実行
// cargo test              テスト実行
// cargo clippy            リンタ
// cargo fmt               フォーマッタ
// cargo doc --open        ドキュメント生成＆表示
// cargo add serde         依存追加（cargo-edit）` },
          ],
        },
        {
          id: 's13-cargo-ワークスペース',
          name: 'Cargo ワークスペース',
          level: 'advanced',
          keywords: 'ワークスペース workspace Cargo.toml 複数クレート モノレポ members',
          desc: `複数のクレートを 1 つのリポジトリで管理するモノレポ構成。ルートの \`Cargo.toml\` に \`[workspace]\` を定義する。依存関係のロックファイルが共有され、ビルドキャッシュも再利用される。`,
          code: [
          { lang: 'RUST', code: `// ルート Cargo.toml
[workspace]
members = [
    "crates/core",
    "crates/cli",
    "crates/web",
]

// crates/cli/Cargo.toml（ワークスペースメンバー間で依存）
[dependencies]
core = { path = "../core" }

// Cargo 2024 edition の workspace 依存一括管理
// ルート Cargo.toml
[workspace.dependencies]
serde = { version = "1", features = ["derive"] }

// メンバー Cargo.toml
[dependencies]
serde = { workspace = true }   // バージョンをルートから継承` },
          ],
        },
        {
          id: 's13-よく使う-crate',
          name: 'よく使う crate',
          level: 'basic',
          keywords: 'よく使う crate クレート serde tokio rayon log env_logger clap',
          desc: `Rust エコシステムで事実上の標準となっている主要クレート一覧。`,
          code: [
          { lang: 'RUST', code: `// serde / serde_json — シリアライズ・デシリアライズ
use serde::{Serialize, Deserialize};
#[derive(Serialize, Deserialize, Debug)]
struct User { name: String, age: u32 }
let json = serde_json::to_string(&User { name: "Alice".into(), age: 30 }).unwrap();
// → {"name":"Alice","age":30}

// tokio — 非同期ランタイム（14章で詳説）
// rayon — データ並列（.par_iter()）
use rayon::prelude::*;
let sum: i32 = (0..1000).into_par_iter().sum();  // 並列に合計

// clap — CLI 引数パーサ
// log + env_logger — ロギング
// reqwest — HTTP クライアント（tokio ベース）
// sqlx     — 非同期 DB（コンパイル時 SQL チェック）
// axum     — Web フレームワーク（tokio ベース）
// tracing  — 構造化ロギング・トレース` },
          ],
        },
      ],
    },
    {
      id: 's14',
      num: 14,
      title: '非同期（async / await）',
      level: 'advanced',
      items: [
        {
          id: 's14-async-await-の基本',
          name: 'async / await の基本',
          level: 'advanced',
          keywords: 'async await 非同期 Future 関数 定義 .await',
          desc: `\`async fn\` は \`Future\` を返す関数。\`.await\` で非同期処理の完了を待つ。\`Future\` はランタイム（tokio 等）がなければ実行されない（遅延評価）。`,
          code: [
          { lang: 'RUST', code: `// Cargo.toml: tokio = { version = "1", features = ["full"] }
use tokio::time::{sleep, Duration};

async fn fetch_data(id: u32) -> String {
    sleep(Duration::from_millis(100)).await;  // 非同期で待機
    format!("data-{id}")
}

#[tokio::main]   // async main のエントリーポイント
async fn main() {
    let result = fetch_data(42).await;   // .await で Future を実行
    println!("{result}");               // data-42
}

// async ブロック
let future = async {
    let a = fetch_data(1).await;
    let b = fetch_data(2).await;
    (a, b)
};
// future はまだ実行されていない → .await or executor に渡して実行` },
          ],
          warn: `\`async fn\` は呼び出しただけでは実行されない。\`.await\` するか、\`tokio::spawn\` などに渡して初めて実行される。また \`.await\` は \`async\` コンテキスト（\`async fn\` または \`async\` ブロック）の中でしか使えない。`,
        },
        {
          id: 's14-tokio-ランタイム',
          name: 'tokio ランタイム',
          level: 'advanced',
          keywords: 'tokio::main ランタイム #[tokio::main] マルチスレッド シングルスレッド',
          desc: `tokio は Rust で最も広く使われる非同期ランタイム。\`#[tokio::main]\` マクロがランタイムのセットアップを自動化する。テストでは \`#[tokio::test]\` を使う。`,
          code: [
          { lang: 'RUST', code: `// マルチスレッドランタイム（デフォルト）
#[tokio::main]
async fn main() { /* ... */ }

// シングルスレッドランタイム
#[tokio::main(flavor = "current_thread")]
async fn main() { /* ... */ }

// 手動でランタイムを構築
fn main() {
    let rt = tokio::runtime::Runtime::new().unwrap();
    rt.block_on(async {
        println!("running in tokio");
    });
}

// テスト
#[cfg(test)]
mod tests {
    #[tokio::test]
    async fn test_something() {
        let result = super::fetch_data(1).await;
        assert_eq!(result, "data-1");
    }
}` },
          ],
        },
        {
          id: 's14-future-トレイト',
          name: 'Future トレイト',
          level: 'advanced',
          keywords: 'Future トレイト Poll Pending Ready 実装 手動',
          desc: `\`Future\` トレイトは \`poll()\` メソッドを持ち、\`Ready(T)\`（完了）か \`Pending\`（待機中）を返す。通常は \`async/await\` で隠蔽されるが、カスタム \`Future\` 実装時に知る必要がある。`,
          code: [
          { lang: 'RUST', code: `use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};

// Future トレイトの定義（概念）
// trait Future {
//     type Output;
//     fn poll(self: Pin<&mut Self>, cx: &mut Context) -> Poll<Self::Output>;
// }

// 即座に値を返すシンプルな Future の実装例
struct Ready<T>(Option<T>);

impl<T: Unpin> Future for Ready<T> {
    type Output = T;
    fn poll(mut self: Pin<&mut Self>, _cx: &mut Context) -> Poll<T> {
        Poll::Ready(self.0.take().unwrap())
    }
}

// async/await が展開されると大まかにこのような状態機械になる
// 通常はコンパイラが自動生成するため手動実装は稀` },
          ],
        },
        {
          id: 's14-tokio-spawn-join',
          name: 'tokio::spawn / join!',
          level: 'advanced',
          keywords: 'tokio::spawn join! try_join! 並行 タスク 同時実行',
          desc: `\`tokio::spawn\` でタスクをバックグラウンドに投げ、\`join!\` マクロで複数の Future を並行実行する。逐次 \`.await\` より大幅に高速化できる。`,
          code: [
          { lang: 'RUST', code: `use tokio::time::{sleep, Duration};

async fn task(id: u32, ms: u64) -> String {
    sleep(Duration::from_millis(ms)).await;
    format!("task-{id}")
}

#[tokio::main]
async fn main() {
    // 逐次実行（合計 300ms）
    let a = task(1, 100).await;
    let b = task(2, 200).await;

    // join! で並行実行（合計 ~200ms）
    let (a, b) = tokio::join!(task(1, 100), task(2, 200));
    println!("{a}, {b}");

    // try_join!: どれかが Err を返したら即中断
    let result = tokio::try_join!(
        async { Ok::<_, &str>(task(1, 50).await) },
        async { Ok::<_, &str>(task(2, 80).await) },
    );

    // spawn: 独立したタスクとして投げる（JoinHandle を返す）
    let handle = tokio::spawn(async { task(99, 50).await });
    // 他の処理を続けられる
    let result = handle.await.unwrap();  // タスクの完了を待つ
    println!("{result}");
}` },
          ],
        },
      ],
    },
    {
      id: 's15',
      num: 15,
      title: '並列・スレッド',
      level: 'advanced',
      items: [
        {
          id: 's15-thread-spawn',
          name: 'thread::spawn',
          level: 'advanced',
          keywords: 'thread::spawn スレッド JoinHandle join move クロージャ',
          desc: `OSスレッドを生成する。クロージャに \`move\` を付けてデータの所有権をスレッドに渡す。\`JoinHandle::join()\` でスレッドの完了を待ち、戻り値を受け取る。`,
          code: [
          { lang: 'RUST', code: `use std::thread;
use std::time::Duration;

let data = vec![1, 2, 3, 4, 5];

// move でデータの所有権をスレッドに移す
let handle = thread::spawn(move || {
    println!("スレッド内: {data:?}");
    data.iter().sum::<i32>()  // 戻り値
});

// メインスレッドは続けて処理できる
thread::sleep(Duration::from_millis(10));

// join でスレッド完了を待ち、戻り値を取得
let result = handle.join().unwrap();  // Result<T, Box<dyn Any>>
println!("合計: {result}");  // 15

// 複数スレッドを起動してまとめて join
let handles: Vec<_> = (0..4).map(|i| {
    thread::spawn(move || { println!("thread {i}"); i * i })
}).collect();

let results: Vec<_> = handles.into_iter().map(|h| h.join().unwrap()).collect();
println!("{results:?}");  // [0, 1, 4, 9]（順序不定）` },
          ],
        },
        {
          id: 's15-arc-mutex-t',
          name: 'Arc<Mutex<T>>',
          level: 'advanced',
          keywords: 'Arc Mutex 共有状態 スレッド安全 lock デッドロック RwLock',
          desc: `\`Arc\`（アトミック参照カウント）で複数スレッドが所有権を共有し、\`Mutex\` で排他アクセスを保証する。ロックが自動解放される RAII パターンで使う。`,
          code: [
          { lang: 'RUST', code: `use std::sync::{Arc, Mutex};
use std::thread;

let counter = Arc::new(Mutex::new(0));

let handles: Vec<_> = (0..10).map(|_| {
    let counter = Arc::clone(&counter);   // 参照カウントを増やしてクローン
    thread::spawn(move || {
        let mut num = counter.lock().unwrap();  // ロック取得（MutexGuard を返す）
        *num += 1;
        // MutexGuard がスコープを抜けると自動アンロック
    })
}).collect();

for h in handles { h.join().unwrap(); }
println!("count = {}", *counter.lock().unwrap());  // 10

// 読み書きの頻度が偏る場合は RwLock が効率的
use std::sync::RwLock;
let data = Arc::new(RwLock::new(vec![1, 2, 3]));
let r = data.read().unwrap();   // 複数の読み取りロックを同時取得可能
println!("{r:?}");` },
          ],
          warn: `2 つのスレッドが互いのロックを待ち合うとデッドロックになる。回避策：①ロックの取得順を統一する ②ロックの保持時間を最小限にする（クリティカルセクションを短くする） ③可能な限り \`mpsc\` チャネルで設計し共有状態を避ける。\`lock().unwrap()\` は別スレッドがパニックしてロックが毒された（poisoned）場合に \`Err\` を返す。`,
        },
        {
          id: 's15-mpsc-チャネル',
          name: 'mpsc チャネル',
          level: 'advanced',
          keywords: 'mpsc チャネル channel Sender Receiver メッセージパッシング 通信',
          desc: `mpsc（multiple producer, single consumer）チャネルはスレッド間のメッセージパッシング通信。共有状態より安全で Rust らしい設計。送信側は複数クローン可能。`,
          code: [
          { lang: 'RUST', code: `use std::sync::mpsc;
use std::thread;

let (tx, rx) = mpsc::channel::<String>();

// 複数の送信者（Sender をクローン）
let tx2 = tx.clone();

thread::spawn(move || {
    tx.send(String::from("message from thread 1")).unwrap();
});

thread::spawn(move || {
    tx2.send(String::from("message from thread 2")).unwrap();
});

// recv() はブロッキング（メッセージが来るまで待つ）
// 送信側がすべてドロップされると recv() は Err を返す
for msg in rx {   // イテレータとして使える
    println!("{msg}");
}

// 非ブロッキング受信
// match rx.try_recv() {
//     Ok(msg)  => println!("{msg}"),
//     Err(mpsc::TryRecvError::Empty)        => {},  // まだ来ていない
//     Err(mpsc::TryRecvError::Disconnected) => break,
// }` },
          ],
        },
        {
          id: 's15-send-sync-トレイト',
          name: 'Send / Sync トレイト',
          level: 'advanced',
          keywords: 'Send Sync トレイト スレッド安全 マーカートレイト 自動実装',
          desc: `\`Send\` は所有権をスレッド間で移動できる型、\`Sync\` は参照をスレッド間で共有できる型を表すマーカートレイト。コンパイラが自動実装するため通常は意識しないが、カスタム型やFFIでは手動実装が必要になる。`,
          code: [
          { lang: 'RUST', code: `// Send: 所有権をスレッド間で移動できる（thread::spawn に渡せる）
// Sync: &T をスレッド間で共有できる（Arc に入れられる）

// Send + Sync を実装している型の例:
// i32, String, Vec<T>, Arc<T>, Mutex<T>

// Send のみ（Sync でない）:
// mpsc::Sender<T>（複数スレッドから同時参照不可）

// Send でも Sync でもない（スレッド間使用不可）:
// Rc<T>  → Arc<T> を使う
// Cell<T>/RefCell<T> → Mutex<T>/RwLock<T> を使う

// コンパイラのチェック例
fn requires_send<T: Send>(_: T) {}

let safe = Arc::new(42);
requires_send(safe);       // OK: Arc<i32> は Send

// let rc = std::rc::Rc::new(42);
// requires_send(rc);      // コンパイルエラー: Rc は Send でない` },
          ],
          warn: `\`Rc<T>\` は非スレッドセーフのため \`Send\` / \`Sync\` を実装しない。複数スレッドで参照カウントを共有するには \`Arc<T>\` を使う。\`unsafe impl Send for MyType {}\` で手動実装することは可能だが、安全性の保証はプログラマ側の責任になる。`,
        },
      ],
    },
    {
      id: 's16',
      num: 16,
      title: 'スマートポインタ',
      level: 'advanced',
      items: [
        {
          id: 's16-box-t',
          name: 'Box<T>',
          level: 'advanced',
          keywords: 'Box ヒープ 再帰型 トレイトオブジェクト dyn Box<T> サイズ不明',
          desc: `ヒープに値を確保する最もシンプルなスマートポインタ。主な用途：①コンパイル時サイズ不明な型の確保（再帰型）②\`dyn Trait\`（トレイトオブジェクト）の格納③大きな値の所有権移動をポインタ 1 つで行う。`,
          code: [
          { lang: 'RUST', code: `// 基本的な使い方
let b = Box::new(5);          // ヒープに i32 を確保
println!("{b}");              // 5（Deref で自動参照）

// 再帰型（コンパイル時サイズが不定 → Box で固定）
enum List {
    Cons(i32, Box<List>),    // Box でサイズを固定（ポインタ = 既知サイズ）
    Nil,
}

let list = List::Cons(1, Box::new(List::Cons(2, Box::new(List::Nil))));

// トレイトオブジェクト
trait Drawable { fn draw(&self); }
struct Circle;
impl Drawable for Circle { fn draw(&self) { println!("circle"); } }

let shape: Box<dyn Drawable> = Box::new(Circle);
shape.draw();

// Box は所有権を持ち、スコープを抜けると中身ごと解放（drop）される
// Deref トレイトを実装するため &Box<T> は &T として扱える` },
          ],
        },
        {
          id: 's16-rc-t',
          name: 'Rc<T>',
          level: 'advanced',
          keywords: 'Rc 参照カウント 複数所有者 clone 非スレッドセーフ シングルスレッド',
          desc: `参照カウント型スマートポインタ。\`Rc::clone()\` で所有者を増やし、カウントがゼロになると自動解放。シングルスレッド専用（スレッド間共有は \`Arc<T>\`）。`,
          code: [
          { lang: 'RUST', code: `use std::rc::Rc;

let a = Rc::new(String::from("hello"));
println!("count = {}", Rc::strong_count(&a));  // 1

{
    let b = Rc::clone(&a);    // 参照カウントを増加（ディープコピーではない）
    let c = Rc::clone(&a);
    println!("count = {}", Rc::strong_count(&a));  // 3
    println!("{b}, {c}");
}   // b, c がドロップ → カウントが 1 に戻る

println!("count = {}", Rc::strong_count(&a));  // 1

// Rc<T> は不変のみ。可変にするには Rc<RefCell<T>> を使う` },
          ],
          warn: `\`Rc<T>\` はスレッドセーフではない。複数スレッドで共有するには \`Arc<T>\`（Atomic Reference Counting）を使う。また \`Rc<T>\` の循環参照は解放されずメモリリークになる。循環が生じる可能性がある場合は \`Weak<T>\` で弱参照を持つ。`,
        },
        {
          id: 's16-arc-t',
          name: 'Arc<T>',
          level: 'advanced',
          keywords: 'Arc アトミック参照カウント スレッドセーフ Mutex 共有 マルチスレッド',
          desc: `スレッドセーフな参照カウント型。\`Arc\`（Atomic Rc）は参照カウントの増減をアトミック操作で行うため複数スレッドから安全に使える。値を変更したい場合は \`Arc<Mutex<T>>\` とする。`,
          code: [
          { lang: 'RUST', code: `use std::sync::{Arc, Mutex};
use std::thread;

// 読み取り専用の共有データ
let data = Arc::new(vec![1, 2, 3, 4, 5]);

let handles: Vec<_> = (0..3).map(|i| {
    let data = Arc::clone(&data);  // スレッドごとにクローン（参照カウント増加）
    thread::spawn(move || {
        println!("thread {i}: {:?}", data);
    })
}).collect();
for h in handles { h.join().unwrap(); }

// 可変データの共有: Arc<Mutex<T>>
let shared = Arc::new(Mutex::new(0));
let h1 = { let s = Arc::clone(&shared); thread::spawn(move || { *s.lock().unwrap() += 1; }) };
let h2 = { let s = Arc::clone(&shared); thread::spawn(move || { *s.lock().unwrap() += 1; }) };
h1.join().unwrap(); h2.join().unwrap();
println!("{}", *shared.lock().unwrap());  // 2

// Rc vs Arc の選択基準:
// シングルスレッドのみ → Rc（オーバーヘッド小）
// スレッド間共有あり   → Arc（アトミック操作のオーバーヘッドあり）` },
          ],
        },
        {
          id: 's16-refcell-t-内部可変性',
          name: 'RefCell<T>（内部可変性）',
          level: 'advanced',
          keywords: 'RefCell interior mutability 内部可変性 borrow_mut borrow 実行時チェック',
          desc: `\`RefCell<T>\` は不変参照越しに値を変更できる「内部可変性」パターン。借用チェックをコンパイル時ではなく実行時に行う。\`Rc<RefCell<T>>\` でシングルスレッドの複数所有者＋可変を実現する。`,
          code: [
          { lang: 'RUST', code: `use std::cell::RefCell;
use std::rc::Rc;

// RefCell 単体: 不変な変数でも .borrow_mut() で変更できる
let data = RefCell::new(vec![1, 2, 3]);
data.borrow_mut().push(4);               // 可変借用（実行時チェック）
println!("{:?}", data.borrow());         // [1, 2, 3, 4]

// 2 つの可変借用を同時に取るとパニック（実行時エラー）
// let a = data.borrow_mut();
// let b = data.borrow_mut();  // ← panic!

// Rc<RefCell<T>>: 複数所有者 + 内部可変性
let shared = Rc::new(RefCell::new(0));
let clone1 = Rc::clone(&shared);
let clone2 = Rc::clone(&shared);

*clone1.borrow_mut() += 10;
*clone2.borrow_mut() += 20;
println!("{}", shared.borrow());  // 30

// スレッド間の内部可変性には Arc<Mutex<T>> を使う（RefCell は Send でない）` },
          ],
        },
        {
          id: 's16-weak-t-循環参照の回避',
          name: 'Weak<T>（循環参照の回避）',
          level: 'advanced',
          keywords: 'Weak 弱参照 循環参照 メモリリーク upgrade downgrade Rc Arc',
          desc: `\`Weak<T>\` は参照カウントを増やさない弱参照。循環参照になる片方を \`Weak\` にすることでメモリリークを防ぐ。\`upgrade()\` で \`Option<Rc<T>>\` を取得し、値が生きているか確認してから使う。`,
          code: [
          { lang: 'RUST', code: `use std::rc::{Rc, Weak};
use std::cell::RefCell;

#[derive(Debug)]
struct Node {
    value: i32,
    parent: RefCell<Weak<Node>>,     // 親は弱参照（循環を防ぐ）
    children: RefCell<Vec<Rc<Node>>>, // 子は強参照
}

let leaf = Rc::new(Node {
    value: 3,
    parent:   RefCell::new(Weak::new()),
    children: RefCell::new(vec![]),
});

let branch = Rc::new(Node {
    value: 5,
    parent:   RefCell::new(Weak::new()),
    children: RefCell::new(vec![Rc::clone(&leaf)]),
});

// leaf の親に branch を設定（Weak で保持）
*leaf.parent.borrow_mut() = Rc::downgrade(&branch);

// upgrade() で親を参照（生きている場合は Some）
if let Some(parent) = leaf.parent.borrow().upgrade() {
    println!("parent value = {}", parent.value);  // 5
}

// branch がドロップされると leaf.parent.upgrade() は None を返す
drop(branch);
println!("parent alive: {}", leaf.parent.borrow().upgrade().is_some()); // false` },
          ],
          warn: `\`Rc<T>\`・\`Arc<T>\` の循環参照はメモリリークになる（ドロップされない）。ツリー構造で「子 → 親」参照が必要な場合は、親への参照を \`Weak<T>\` にするのが定石。\`Weak::upgrade()\` の戻り値が \`None\` かチェックを忘れずに。`,
        },
      ],
    },
  ],
};

export default data;
