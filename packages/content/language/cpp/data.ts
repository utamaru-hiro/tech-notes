import type { LanguageGuide } from '../../types';

const data: LanguageGuide = {
  lang: 'C++',
  langSlug: 'cpp',
  version: 'C++17/C++20',
  lead: `他言語の経験者が 2〜3 時間でざっと読み通せるリファレンスです。C++ 固有の落とし穴（未定義動作・メモリ管理・オブジェクトライフタイム）を重点的に解説します。`,
  accent: '#004482',
  accent2: '#d0e4f7',
  bgGradientTop: '#eef3fa',
  bgRadialLeft: 'rgba(0,68,130,0.15)',
  bgRadialRight: 'rgba(0,120,212,0.12)',
  badgeGradient: 'linear-gradient(135deg, #001f4d, #004482)',
  heroEmoji: '⚡',
  navGroups: [
    { label: '基礎', sections: ['s1', 's2', 's3', 's4', 's5'] },
    { label: 'オブジェクト指向', sections: ['s6', 's7', 's8'] },
    { label: '実用', sections: ['s9', 's10', 's11', 's12', 's13'] },
    { label: '応用', sections: ['s14', 's15', 's16'] },
  ],
  sections: [
    // ─────────────────────────────────────────────────────────────
    // 01 変数・型・基本演算
    // ─────────────────────────────────────────────────────────────
    {
      id: 's1',
      num: 1,
      title: '変数・型・基本演算',
      level: 'basic',
      items: [
        {
          id: 's1-fundamental-types',
          name: '基本型',
          level: 'basic',
          keywords: '型 int long double float bool char size_t int32_t uint64_t 整数 浮動小数点 基本型',
          desc: 'C++ の整数型はサイズが処理系依存。確定サイズが必要なら `<cstdint>` の `int32_t`・`uint64_t` 等を使う。`bool` は `true`/`false`。`char` は符号が処理系依存なので文字は `unsigned char` か `std::string` を使う。',
          code: [{ lang: 'C++', code: `#include <cstdint>
#include <iostream>

int main() {
    int           a = 42;
    long long     b = 9'223'372'036'854'775'807LL; // C++14: 数値区切り
    double        c = 3.14;
    bool          d = true;
    std::size_t   e = sizeof(int); // インデックス・サイズは size_t
    int32_t  x = -100;   // 確定 32bit
    uint64_t y = 100ULL; // 確定 64bit 符号なし
    std::cout << a << " " << b << " " << c << "\n";
    std::cout << std::boolalpha << d << "\n"; // "true"
}` }],
          warn: '`int` は最低 16bit の保証しかない（多くの環境では 32bit）。`sizeof(int) == 4` を前提にすると移植性が壊れる。クロスプラットフォームコードでは `<cstdint>` の固定幅型を使うこと。',
        },
        {
          id: 's1-auto',
          name: 'auto による型推論',
          level: 'basic',
          keywords: 'auto 型推論 decltype 変数宣言 型指定',
          desc: 'C++11 以降、`auto` で型推論が可能。ただし参照や `const` は推論されないため `auto&`・`const auto&` と明示が必要。`decltype` は式の型を取り出す。',
          code: [{ lang: 'C++', code: `auto x = 42;       // int
auto y = 3.14;     // double
auto s = "hello";  // const char* （std::string ではない！）

std::vector<int> v = {1, 2, 3};
auto it = v.begin(); // std::vector<int>::iterator

// 参照で受け取る場合は明示
auto& ref   = v[0];       // int&（コピーなし）
const auto& cref = v[0];  // const int&（読み取り専用）

// decltype
int a = 1;
decltype(a) b = 2; // int` }],
          warn: '`auto s = "hello";` は `std::string` ではなく `const char*` になる。文字列として扱うなら `auto s = std::string{"hello"};` と書くこと。',
        },
        {
          id: 's1-const-constexpr',
          name: 'const と constexpr',
          level: 'basic',
          keywords: 'const constexpr コンパイル時定数 定数 不変 immutable',
          desc: '`const` は実行時定数（値が変わらないことを保証）、`constexpr` はコンパイル時定数（コンパイル時に値が確定）。`constexpr` 変数はテンプレート引数や配列サイズに使える。C++11 以降 `constexpr` 関数も書ける。',
          code: [{ lang: 'C++', code: `const int MAX = 100;          // 実行時定数
constexpr int BUF = 256;      // コンパイル時定数

constexpr int square(int n) { return n * n; }

int arr[BUF];                 // OK: constexpr なので配列サイズに使える
template<int N> struct Foo {};
Foo<square(4)> f;             // OK: コンパイル時に 16 が確定

const int rt = someFunc();    // OK: 実行時に決まる
// constexpr int err = someFunc(); // NG: constexpr 関数でなければ不可` }],
        },
        {
          id: 's1-type-cast',
          name: '型変換（named cast）',
          level: 'basic',
          keywords: 'cast static_cast reinterpret_cast const_cast dynamic_cast 型変換 キャスト',
          desc: 'C++ には 4 種の named cast がある。C スタイルキャスト `(Type)x` は危険なので使ってはいけない。`static_cast` が最も一般的。',
          code: [{ lang: 'C++', code: `double d = 3.7;
int i = static_cast<int>(d);       // 3（切り捨て）

// reinterpret_cast: ビットレベルの再解釈（危険）
uintptr_t addr = reinterpret_cast<uintptr_t>(&d);

// const_cast: const を外す（元が const なら UB）
const int ci = 42;
// int& ri = const_cast<int&>(ci); // 元が const なので UB！

// dynamic_cast: 実行時の安全なダウンキャスト（仮想関数を持つ型のみ）
Base* b = new Derived();
Derived* dp = dynamic_cast<Derived*>(b); // 成功: 非 null
if (!dp) { /* 変換失敗 */ }` }],
          warn: 'C スタイルキャスト `(int)x` は `const` も外せる万能で危険なキャスト。誤った変換をコンパイラが検出できないため、必ず named cast を使うこと。',
        },
      ],
    },
    // ─────────────────────────────────────────────────────────────
    // 02 制御フロー
    // ─────────────────────────────────────────────────────────────
    {
      id: 's2',
      num: 2,
      title: '制御フロー',
      level: 'basic',
      items: [
        {
          id: 's2-if-switch',
          name: 'if / switch',
          level: 'basic',
          keywords: 'if else switch case break fall-through C++17 if初期化文 fallthrough',
          desc: 'C++17 で if の初期化文が追加された。`switch` は `case` の fall-through がデフォルト（`break` を忘れやすい）。意図的な fall-through は `[[fallthrough]]` 属性で明示。',
          code: [{ lang: 'C++', code: `// C++17: if 初期化文（スコープを限定できる）
if (auto it = map.find(key); it != map.end()) {
    use(it->second); // it はこの if ブロック内にスコープが限定
}

// switch の fall-through
switch (n) {
    case 1:
        doA();
        [[fallthrough]]; // 意図的な fall-through を明示
    case 2:
        doB();
        break;
    default:
        doDefault();
}` }],
          warn: '`switch` で `break` を忘れると次の `case` に処理が流れる（fall-through）。意図しない fall-through はバグの温床。コンパイラの `-Wimplicit-fallthrough` 警告を有効にすること。',
        },
        {
          id: 's2-loops',
          name: 'ループ（for / while / 範囲 for）',
          level: 'basic',
          keywords: 'for while do-while range-based for ループ イテレーション コピー',
          desc: 'C++11 の範囲 for 文（range-based for）でコンテナを簡潔に走査できる。コピーを避けるため要素は `const auto&` で受け取るのが基本。変更する場合は `auto&`。',
          code: [{ lang: 'C++', code: `std::vector<std::string> names = {"Alice", "Bob", "Carol"};

// コピーなし読み取り
for (const auto& name : names) {
    std::cout << name << "\n";
}

// 変更する場合
for (auto& name : names) {
    name += "!";
}

// インデックス付き: 従来の for
for (std::size_t i = 0; i < names.size(); ++i) {
    std::cout << i << ": " << names[i] << "\n";
}` }],
          warn: '範囲 for で `auto name` と書くとコピーが発生する。文字列やコンテナの要素は `const auto&` を習慣にすること。プリミティブ型（int 等）はコピーでよい。',
        },
        {
          id: 's2-goto-label',
          name: '多重ループの脱出（goto の正当なユースケース）',
          level: 'basic',
          keywords: 'goto label break continue 多重ループ 脱出',
          desc: 'C++ で `goto` が有用なのは多重ループを一気に脱出する場面。ただし RAII やラムダを使った代替手段の方が可読性が高い。',
          code: [{ lang: 'C++', code: `// goto による多重ループ脱出（C++ では稀）
for (int i = 0; i < N; ++i) {
    for (int j = 0; j < M; ++j) {
        if (found(i, j)) goto done;
    }
}
done:;

// 推奨: ラムダで包んで return
auto search = [&]() -> std::pair<int,int> {
    for (int i = 0; i < N; ++i)
        for (int j = 0; j < M; ++j)
            if (found(i, j)) return {i, j};
    return {-1, -1};
};
auto [r, c] = search();` }],
        },
      ],
    },
    // ─────────────────────────────────────────────────────────────
    // 03 関数
    // ─────────────────────────────────────────────────────────────
    {
      id: 's3',
      num: 3,
      title: '関数',
      level: 'basic',
      items: [
        {
          id: 's3-overload',
          name: '関数オーバーロードとデフォルト引数',
          level: 'basic',
          keywords: '関数 オーバーロード デフォルト引数 引数 overload',
          desc: 'C++ では同名で引数の型・数が異なる関数を複数定義できる（オーバーロード）。デフォルト引数は宣言側に書き、末尾の引数から順に省略可能。',
          code: [{ lang: 'C++', code: `void print(int n)              { std::cout << "int: " << n; }
void print(double d)           { std::cout << "double: " << d; }
void print(const std::string& s){ std::cout << "str: " << s; }

print(42);      // int: 42
print(3.14);    // double: 3.14
print("hi");    // str: hi

// デフォルト引数（末尾から省略可能）
void connect(const std::string& host, int port = 80, bool tls = false);

connect("example.com");            // port=80, tls=false
connect("example.com", 443, true); // 全部指定` }],
          warn: 'デフォルト引数は宣言（ヘッダ）側にのみ書く。実装側にも書くと再定義エラー。オーバーロードとデフォルト引数が混在すると呼び出しが曖昧になる場合がある。',
        },
        {
          id: 's3-lambda',
          name: 'ラムダ式',
          level: 'basic',
          keywords: 'lambda ラムダ クロージャ キャプチャ 無名関数 std::function auto',
          desc: 'C++11 のラムダは `[キャプチャ](引数) -> 戻り値型 { 本体 }` の形。キャプチャは `[=]`（コピー）・`[&]`（参照）・個別指定が可能。戻り値型は多くの場合推論できるので省略可能。',
          code: [{ lang: 'C++', code: `int offset = 10;

// キャプチャ（コピー）
auto addOffset = [offset](int x) { return x + offset; };

// キャプチャ（参照）
auto increment = [&offset]() { ++offset; };

// STL アルゴリズムへの渡し方
std::vector<int> v = {3, 1, 4, 1, 5};
std::sort(v.begin(), v.end(), [](int a, int b){ return a > b; }); // 降順

// std::function で型消去（オーバーヘッドあり）
std::function<int(int)> fn = addOffset;
std::cout << fn(5) << "\n"; // 15` }],
          warn: '`[&]` でキャプチャしたラムダを関数の戻り値として返すと、ローカル変数への参照がダングリングになる。非同期コールバックでも同様の危険がある。',
        },
        {
          id: 's3-inline-constexpr',
          name: 'inline 関数と constexpr 関数',
          level: 'basic',
          keywords: 'inline constexpr 関数 最適化 コンパイル時',
          desc: '`inline` はヘッダに関数定義を書いても ODR 違反にならないためのキーワード（インライン展開の指示ではない）。`constexpr` 関数はコンパイル時にも実行時にも呼べる。',
          code: [{ lang: 'C++', code: `// ヘッダに書ける（ODR 違反にならない）
inline int clamp(int v, int lo, int hi) {
    return v < lo ? lo : v > hi ? hi : v;
}

// constexpr 関数: コンパイル時に評価可能
constexpr int factorial(int n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}

constexpr int f5 = factorial(5); // コンパイル時に 120
int arr[factorial(4)];           // 配列サイズにも使える

// 実行時にも呼べる
int n = 6;
int fn = factorial(n); // 実行時に計算` }],
        },
      ],
    },
    // ─────────────────────────────────────────────────────────────
    // 04 ポインタと参照
    // ─────────────────────────────────────────────────────────────
    {
      id: 's4',
      num: 4,
      title: 'ポインタと参照',
      level: 'basic',
      items: [
        {
          id: 's4-pointer-basics',
          name: 'ポインタの基礎',
          level: 'basic',
          keywords: 'pointer ポインタ * & アドレス デリファレンス nullptr ヌルポインタ アロー演算子',
          desc: 'ポインタはメモリアドレスを格納する変数。`*` でデリファレンス（値アクセス）、`&` でアドレス取得。`nullptr`（C++11）は NULL の代替で型安全。',
          code: [{ lang: 'C++', code: `int x = 42;
int* p = &x;         // p は x のアドレスを保持
std::cout << *p;     // 42（デリファレンス）
*p = 100;            // x も 100 になる

// nullptr チェック
int* q = nullptr;
if (q) { /* null でなければ処理 */ }

// 構造体メンバへのアクセス
struct Point { int x, y; };
Point pt{1, 2};
Point* pp = &pt;
std::cout << pp->x;  // (*pp).x と同じ` }],
          warn: '未初期化のポインタを使うと不定値を参照（未定義動作）。必ず `nullptr` か有効なアドレスで初期化すること。`NULL` は C の慣習なので C++ では `nullptr` を使う。',
        },
        {
          id: 's4-reference',
          name: '参照（&）',
          level: 'basic',
          keywords: '参照 reference lvalue reference const参照 別名',
          desc: '参照はポインタの安全版。宣言時に必ず初期化し、後から別の変数を指すことができない。`const T&` で大きなオブジェクトをコピーなしで読み取れる。',
          code: [{ lang: 'C++', code: `int a = 1;
int& ref = a;  // ref は a の別名
ref = 99;      // a == 99

// const 参照: コピーなし読み取り
void printStr(const std::string& s) {
    std::cout << s; // コピーなし
}

// 参照を返す関数（変更可能）
int& getFirst(std::vector<int>& v) { return v[0]; }
getFirst(v) = 999;  // v[0] を直接変更` }],
          warn: '関数からローカル変数の参照を返すと、スコープを抜けた後に参照がダングリングになり未定義動作。コンパイラが警告を出すが見逃しやすい。',
        },
        {
          id: 's4-const-pointer',
          name: 'const とポインタ',
          level: 'basic',
          keywords: 'const pointer constポインタ const T* T* const 読み方',
          desc: '`const` の位置で意味が変わる。右から左に読むと理解しやすい。`const T*` は「指す先が const」、`T* const` は「ポインタ自体が const」。',
          code: [{ lang: 'C++', code: `int x = 1, y = 2;

const int* p1 = &x;  // "const な int へのポインタ"
// *p1 = 9;           // NG: 指す先を変更不可
p1 = &y;             // OK: p1 自体は変えられる

int* const p2 = &x;  // "int へのconstポインタ"
*p2 = 9;             // OK: 指す先は変えられる
// p2 = &y;           // NG: p2 自体は変えられない

const int* const p3 = &x; // 両方 const` }],
        },
        {
          id: 's4-function-pointer',
          name: '関数ポインタと std::function',
          level: 'basic',
          keywords: '関数ポインタ function pointer std::function callable コールバック',
          desc: '関数ポインタは型が複雑なので `auto` や `using` で簡略化。`std::function` はあらゆる callable（ラムダ・関数ポインタ・ファンクタ）を格納できる型消去ラッパー。',
          code: [{ lang: 'C++', code: `int add(int a, int b) { return a + b; }

// 関数ポインタ
int (*fp)(int, int) = add;
fp(1, 2); // 3

// auto で簡略化
auto fp2 = add; // int(*)(int,int)

// using でエイリアス
using BinOp = int(*)(int, int);
BinOp op = add;

// std::function: ラムダも格納可
std::function<int(int,int)> fn = [](int a, int b){ return a + b; };
fn(3, 4); // 7` }],
          warn: '`std::function` は型消去のため仮想関数と同程度のオーバーヘッドがある。ホットパスでは `auto` でラムダを直接保持するか、テンプレートを使うこと。',
        },
      ],
    },
    // ─────────────────────────────────────────────────────────────
    // 05 配列と文字列
    // ─────────────────────────────────────────────────────────────
    {
      id: 's5',
      num: 5,
      title: '配列と文字列',
      level: 'basic',
      items: [
        {
          id: 's5-array',
          name: 'C 配列と std::array',
          level: 'basic',
          keywords: '配列 array C配列 std::array サイズ decay std::span',
          desc: 'C 配列は関数に渡すとポインタに decay してサイズ情報が失われる。`std::array<T, N>` は固定長で decay しないため安全で STL アルゴリズムとも親和性が高い。',
          code: [{ lang: 'C++', code: `// C 配列（非推奨: 関数に渡すと decay する）
int ca[5] = {1, 2, 3, 4, 5};
// sizeof(ca)/sizeof(ca[0]) で要素数取得（危険）

// std::array（推奨: 固定長）
#include <array>
std::array<int, 5> arr = {1, 2, 3, 4, 5};
arr.size();    // 5（メンバ関数でサイズ取得）
arr.at(10);    // 範囲チェック付き（越えると std::out_of_range）

// std::vector（動的サイズ）
std::vector<int> v = {1, 2, 3};
v.push_back(4);
v.size(); // 4

// C++20: std::span（サイズ付き非所有ビュー）
#include <span>
void process(std::span<int> data) { /* 配列もvectorも受け取れる */ }` }],
          warn: 'C 配列を `void f(int arr[])` で受け取ると `void f(int* arr)` と同じになりサイズ情報が消える。C++20 の `std::span<int>` か `std::vector`/`std::array` を渡すこと。',
        },
        {
          id: 's5-string',
          name: 'std::string と std::string_view',
          level: 'basic',
          keywords: 'string string_view 文字列 substr find npos C++17 raw string',
          desc: '`std::string` はヒープ確保の動的文字列。`std::string_view`（C++17）はコピーなしで文字列を参照する軽量型で、読み取り専用の引数に最適。',
          code: [{ lang: 'C++', code: `#include <string>
#include <string_view>

std::string s = "Hello, World!";
s += " Bye";               // 連結
s.size();                  // 文字数
s.substr(0, 5);            // "Hello"
s.find("World");           // 7（見つからなければ std::string::npos）
s.empty();                 // false

// string_view: コピーなし参照
std::string_view sv = s;
void readOnly(std::string_view v); // const std::string& より軽量

// raw string リテラル（バックスラッシュ・改行そのまま）
std::string path  = R"(C:\Users\alice\Documents)";
std::string regex = R"(\d+\.\d+)";` }],
          warn: '`std::string_view` は元の文字列が存在する間のみ有効。`std::string` の一時オブジェクトに `string_view` を作り、その一時オブジェクトが破棄されるとダングリング。',
        },
      ],
    },
    // ─────────────────────────────────────────────────────────────
    // 06 クラスとオブジェクト
    // ─────────────────────────────────────────────────────────────
    {
      id: 's6',
      num: 6,
      title: 'クラスとオブジェクト',
      level: 'basic',
      items: [
        {
          id: 's6-class-basics',
          name: 'クラス定義とアクセス指定子',
          level: 'basic',
          keywords: 'class struct public private protected アクセス指定子 メンバ',
          desc: '`class` はデフォルトが `private`、`struct` はデフォルトが `public`。それ以外は同じ。データメンバを `private` にし、メンバ関数でアクセスを制御するのが基本。',
          code: [{ lang: 'C++', code: `class Person {
public:
    Person(std::string name, int age) : name_(name), age_(age) {}

    const std::string& name() const { return name_; }
    int age() const { return age_; }
    void birthday() { ++age_; }

private:
    std::string name_;
    int age_;
};

Person p("Alice", 30);
p.birthday();
std::cout << p.name() << " " << p.age() << "\n"; // Alice 31` }],
        },
        {
          id: 's6-constructor',
          name: 'コンストラクタと初期化リスト',
          level: 'basic',
          keywords: 'コンストラクタ constructor デストラクタ destructor 初期化リスト 委譲コンストラクタ',
          desc: '初期化リスト（`: メンバ(値)`）はコンストラクタ本体での代入より効率的。`const` メンバや参照メンバは初期化リストでしか初期化できない。C++11 以降、委譲コンストラクタで重複を減らせる。',
          code: [{ lang: 'C++', code: `class Buffer {
public:
    // 初期化リスト: コンストラクタ本体前に初期化
    Buffer(std::size_t size, char fill = 0)
        : size_(size), data_(new char[size]) {
        std::fill(data_, data_ + size_, fill);
    }

    // 委譲コンストラクタ (C++11)
    Buffer() : Buffer(256) {}

    ~Buffer() { delete[] data_; } // デストラクタで解放

private:
    std::size_t size_;
    char* data_;
};` }],
          warn: '`const` メンバと参照メンバは初期化リストでのみ初期化できる。初期化リストの順序はメンバ宣言順と一致させること（不一致はコンパイラ警告。順序が違うと初期化順が意図と異なる）。',
        },
        {
          id: 's6-const-member',
          name: 'const メンバ関数と static・mutable',
          level: 'basic',
          keywords: 'const member function static mutable クラス変数',
          desc: '`const` メンバ関数はオブジェクトの状態を変更しないことを保証。`static` メンバはオブジェクトではなくクラスに属する。`mutable` はキャッシュなど論理的に const でも変更したいケースに使う。',
          code: [{ lang: 'C++', code: `class Counter {
public:
    void increment() { ++count_; }         // 非 const: 状態変更
    int value() const { return count_; }   // const: 変更不可

    // mutable: const 関数内でも変更可
    int cached() const {
        if (!cached_) { cache_ = expensive(); cached_ = true; }
        return cache_;
    }

    static int instances() { return s_count_; } // クラスメソッド

private:
    int count_ = 0;
    static int s_count_;       // .cpp で定義が必要
    mutable bool cached_ = false;
    mutable int cache_ = 0;
};` }],
        },
        {
          id: 's6-special-member',
          name: '= default / = delete',
          level: 'basic',
          keywords: 'default delete 特殊メンバ関数 コピー禁止 move',
          desc: '`= default` でコンパイラ生成の特殊メンバ関数を明示的に要求、`= delete` で禁止できる。コピー禁止クラス（ファイルハンドル・mutex 等）を作る際に使う。',
          code: [{ lang: 'C++', code: `class NonCopyable {
public:
    NonCopyable() = default;
    ~NonCopyable() = default;

    // コピー禁止
    NonCopyable(const NonCopyable&) = delete;
    NonCopyable& operator=(const NonCopyable&) = delete;

    // ムーブは許可
    NonCopyable(NonCopyable&&) = default;
    NonCopyable& operator=(NonCopyable&&) = default;
};

NonCopyable a;
// NonCopyable b = a; // コンパイルエラー
NonCopyable c = std::move(a); // OK` }],
        },
      ],
    },
    // ─────────────────────────────────────────────────────────────
    // 07 継承と多態性
    // ─────────────────────────────────────────────────────────────
    {
      id: 's7',
      num: 7,
      title: '継承と多態性',
      level: 'basic',
      items: [
        {
          id: 's7-inheritance',
          name: '継承の基本',
          level: 'basic',
          keywords: '継承 inheritance base derived public 基底クラス 派生クラス super',
          desc: '`class Derived : public Base` で公開継承（is-a 関係）。基底クラスのコンストラクタは初期化リストで明示的に呼ぶ。デストラクタは必ず `virtual` にすること。',
          code: [{ lang: 'C++', code: `class Animal {
public:
    explicit Animal(std::string name) : name_(std::move(name)) {}
    const std::string& name() const { return name_; }
    virtual std::string sound() const { return "..."; }
    virtual ~Animal() = default; // 仮想デストラクタ必須

private:
    std::string name_;
};

class Dog : public Animal {
public:
    explicit Dog(std::string name) : Animal(std::move(name)) {}
    std::string sound() const override { return "Woof"; }
};

std::unique_ptr<Animal> a = std::make_unique<Dog>("Rex");
std::cout << a->sound(); // "Woof"（多態性）` }],
          warn: '基底クラスのデストラクタが `virtual` でない場合、`Base*` から `delete` すると派生クラスのデストラクタが呼ばれない（リソースリーク・未定義動作）。必ず `virtual ~Base() = default;` を書くこと。',
        },
        {
          id: 's7-virtual-override',
          name: '仮想関数・override・final',
          level: 'basic',
          keywords: 'virtual override final 純粋仮想関数 抽象クラス abstract interface',
          desc: '`virtual` で宣言した関数は実行時に動的ディスパッチされる。`override` で誤ったシグネチャをコンパイル時に検出できる。`= 0` で純粋仮想関数（そのクラスはインスタンス化不可の抽象クラス）。',
          code: [{ lang: 'C++', code: `class Shape {
public:
    virtual double area() const = 0;  // 純粋仮想: インスタンス化不可
    virtual void draw() const {}      // デフォルト実装あり
    virtual ~Shape() = default;
};

class Circle : public Shape {
public:
    explicit Circle(double r) : r_(r) {}
    double area() const override { return 3.14159 * r_ * r_; }

private:
    double r_;
};

// final: これ以上継承・オーバーライドを禁止
class SpecialCircle final : public Circle {
public:
    using Circle::Circle;
};` }],
          warn: '`override` なしで仮想関数と同名でも引数型が違う関数を書くと、オーバーライドではなく全く別の関数になる（シャドーイング）。必ず `override` を付けること。',
        },
        {
          id: 's7-dynamic-cast',
          name: 'dynamic_cast と RTTI',
          level: 'basic',
          keywords: 'dynamic_cast RTTI typeid 実行時型情報 ダウンキャスト',
          desc: '`dynamic_cast` は実行時に安全なダウンキャスト（基底 → 派生）。ポインタで失敗すると `nullptr`、参照で失敗すると `std::bad_cast` をスロー。仮想関数を持つ型にのみ使える。',
          code: [{ lang: 'C++', code: `Shape* s = new Circle(5.0);

// ポインタ: 失敗時は nullptr
if (Circle* c = dynamic_cast<Circle*>(s)) {
    std::cout << "Circle, area=" << c->area();
}

// 参照: 失敗時は std::bad_cast
try {
    Circle& c = dynamic_cast<Circle&>(*s);
} catch (const std::bad_cast& e) {
    std::cerr << "Bad cast\n";
}

delete s;` }],
          warn: '`dynamic_cast` の多用は設計上の問題を示すことが多い。仮想関数の追加やビジターパターンの導入を先に検討すること。',
        },
      ],
    },
    // ─────────────────────────────────────────────────────────────
    // 08 演算子オーバーロード
    // ─────────────────────────────────────────────────────────────
    {
      id: 's8',
      num: 8,
      title: '演算子オーバーロード',
      level: 'advanced',
      items: [
        {
          id: 's8-operator-basics',
          name: '演算子オーバーロードの基本',
          level: 'advanced',
          keywords: 'operator overload 演算子 オーバーロード + == << stream friend',
          desc: '多くの演算子を独自型に対してオーバーロードできる。メンバ関数として定義するか、非メンバ関数（`friend`）として定義する。`<<` は `std::ostream&` を返し連鎖呼び出しを可能にする。',
          code: [{ lang: 'C++', code: `class Vec2 {
public:
    double x, y;
    Vec2(double x, double y) : x(x), y(y) {}

    Vec2 operator+(const Vec2& o) const { return {x+o.x, y+o.y}; }
    Vec2& operator+=(const Vec2& o) { x+=o.x; y+=o.y; return *this; }
    bool operator==(const Vec2& o) const { return x==o.x && y==o.y; }

    // 出力演算子: friend 非メンバ関数
    friend std::ostream& operator<<(std::ostream& os, const Vec2& v) {
        return os << "(" << v.x << ", " << v.y << ")";
    }
};

Vec2 a{1, 2}, b{3, 4};
std::cout << (a + b) << "\n"; // (4, 6)` }],
        },
        {
          id: 's8-rule-of-five',
          name: 'Rule of Three / Five / Zero',
          level: 'advanced',
          keywords: 'copy constructor copy assignment move Rule of Three Five Zero 特殊メンバ関数 ディープコピー',
          desc: 'デストラクタ・コピーコンストラクタ・コピー代入のいずれかを定義したら 3 つとも定義するのが Rule of Three。C++11 以降はムーブ操作 2 つも加えて Rule of Five。スマートポインタ等を使えば何も定義不要（Rule of Zero）が理想。',
          code: [{ lang: 'C++', code: `class MyBuf {
public:
    explicit MyBuf(std::size_t n) : data_(new int[n]), size_(n) {}

    // コピーコンストラクタ（ディープコピー）
    MyBuf(const MyBuf& o) : data_(new int[o.size_]), size_(o.size_) {
        std::copy(o.data_, o.data_ + size_, data_);
    }
    // コピー代入（コピー&スワップイディオム）
    MyBuf& operator=(MyBuf o) { swap(o); return *this; }

    // ムーブコンストラクタ
    MyBuf(MyBuf&& o) noexcept : data_(o.data_), size_(o.size_) {
        o.data_ = nullptr; o.size_ = 0;
    }
    // ムーブ代入
    MyBuf& operator=(MyBuf&& o) noexcept { swap(o); return *this; }

    ~MyBuf() { delete[] data_; }

private:
    void swap(MyBuf& o) noexcept {
        std::swap(data_, o.data_); std::swap(size_, o.size_);
    }
    int* data_;
    std::size_t size_;
};` }],
          warn: 'コンパイラが生成するデフォルトのコピーはシャローコピー（ポインタをそのまま複製）。動的メモリを持つクラスでディープコピーを書かないと二重解放（未定義動作）になる。',
        },
        {
          id: 's8-spaceship',
          name: '三方比較演算子 <=> (C++20)',
          level: 'advanced',
          keywords: '<=> spaceship operator 三方比較 C++20 比較演算子 strong_ordering',
          desc: 'C++20 の `<=>` を定義するだけで `<`・`>`・`<=`・`>=` が自動生成される。`= default` で全メンバの辞書順比較も自動化できる。',
          code: [{ lang: 'C++', code: `#include <compare>

class Point {
public:
    int x, y;
    // <=> を定義すると <, >, <=, >= が自動生成
    auto operator<=>(const Point&) const = default;
    bool operator==(const Point&) const = default;
};

Point a{1, 2}, b{1, 3};
std::cout << (a < b);  // true（x が等しければ y で比較）
std::cout << (a == b); // false` }],
        },
      ],
    },
    // ─────────────────────────────────────────────────────────────
    // 09 メモリ管理と RAII
    // ─────────────────────────────────────────────────────────────
    {
      id: 's9',
      num: 9,
      title: 'メモリ管理と RAII',
      level: 'advanced',
      items: [
        {
          id: 's9-new-delete',
          name: 'new / delete',
          level: 'advanced',
          keywords: 'new delete heap ヒープ メモリ確保 解放 bad_alloc nothrow',
          desc: '`new` はヒープからメモリを確保しコンストラクタを呼ぶ。`delete` はデストラクタを呼び解放。配列は `new[]`/`delete[]` のペアで。直接使うのは避けスマートポインタを使うこと。',
          code: [{ lang: 'C++', code: `// 単一オブジェクト
int* p = new int(42);
delete p;
p = nullptr; // dangling pointer 防止

// 配列
int* arr = new int[10]{};
delete[] arr; // delete[] を使う（delete だと UB）

// 確保失敗: std::bad_alloc がスロー
try {
    int* big = new int[1'000'000'000'000LL];
} catch (const std::bad_alloc& e) {
    std::cerr << "Out of memory\n";
}

// nothrow バージョン（失敗時 nullptr）
int* q = new (std::nothrow) int;
if (!q) { /* メモリ確保失敗 */ }` }],
          warn: '`new[]` で確保したメモリを `delete`（`[]` なし）で解放すると未定義動作。`new` は `delete`、`new[]` は `delete[]` と必ず対応させること。現代 C++ ではスマートポインタを使えば不要。',
        },
        {
          id: 's9-raii',
          name: 'RAII 原則',
          level: 'advanced',
          keywords: 'RAII リソース管理 destructor コンストラクタ スコープ 例外安全',
          desc: 'Resource Acquisition Is Initialization。リソース（メモリ・ファイル・ロック等）をオブジェクトのライフタイムに結び付ける。コンストラクタで取得、デストラクタで解放。例外が来てもデストラクタは保証される。',
          code: [{ lang: 'C++', code: `// RAII の例: ファイルハンドラ
class FileHandle {
public:
    explicit FileHandle(const char* path)
        : fp_(std::fopen(path, "r")) {
        if (!fp_) throw std::runtime_error("cannot open");
    }
    ~FileHandle() { if (fp_) std::fclose(fp_); } // 例外でも必ず閉じる

    FILE* get() { return fp_; }

    // コピー禁止（ハンドルの二重解放を防ぐ）
    FileHandle(const FileHandle&) = delete;
    FileHandle& operator=(const FileHandle&) = delete;

private:
    FILE* fp_;
};

{
    FileHandle f("data.txt");
    // 例外が来ても ~FileHandle() が呼ばれてクローズされる
} // スコープを抜けると自動クローズ` }],
        },
        {
          id: 's9-undefined-behavior',
          name: '未定義動作（UB）',
          level: 'advanced',
          keywords: '未定義動作 UB undefined behavior 整数オーバーフロー 境界外 ダングリング',
          desc: 'C++ の未定義動作（UB）はコンパイラが何をしてもよい状態。クラッシュ・誤った結果・セキュリティホールにつながる。よくある UB を把握して避けること。',
          code: [{ lang: 'C++', code: `// よくある未定義動作の例（これらを書いてはいけない）

// 1. 符号付き整数オーバーフロー（unsigned は wrap-around で定義済み）
int x = INT_MAX;
// int y = x + 1; // UB!

// 2. 境界外アクセス
int arr[5];
// arr[5] = 0; // UB!

// 3. ヌルポインタデリファレンス
int* p = nullptr;
// *p = 42; // UB!

// 4. ダングリング参照
int& dangle() {
    int local = 1;
    return local; // UB: ローカル変数の参照を返す
}

// 5. 初期化前の値を読む
int uninit;
// std::cout << uninit; // UB!` }],
          warn: 'UB はコンパイラ最適化により「消える」ことがある。デバッグビルドでは動いて、リリースビルドで壊れるケースがある。AddressSanitizer・UBSanitizer を使って早期発見すること。',
        },
      ],
    },
    // ─────────────────────────────────────────────────────────────
    // 10 スマートポインタ
    // ─────────────────────────────────────────────────────────────
    {
      id: 's10',
      num: 10,
      title: 'スマートポインタ',
      level: 'advanced',
      items: [
        {
          id: 's10-unique-ptr',
          name: 'unique_ptr',
          level: 'advanced',
          keywords: 'unique_ptr スマートポインタ make_unique 所有権 move ファクトリ',
          desc: '単独所有権を持つスマートポインタ。コピー不可・ムーブのみ可。`make_unique<T>(args)` で生成（例外安全）。生ポインタと同等のパフォーマンスでオーバーヘッドはほぼゼロ。',
          code: [{ lang: 'C++', code: `#include <memory>

auto p = std::make_unique<int>(42);
std::cout << *p;  // 42（スコープ終了時に自動解放）

// 所有権の移転
auto q = std::move(p); // p は nullptr になる
if (!p) std::cout << "p is null\n";

// カスタムデリータ
auto fp = std::unique_ptr<FILE, decltype(&fclose)>(
    fopen("f.txt", "r"), &fclose);

// ファクトリ関数パターン
std::unique_ptr<Shape> makeShape(ShapeType t) {
    switch (t) {
        case CIRCLE: return std::make_unique<Circle>(1.0);
        default:     return std::make_unique<Square>(1.0);
    }
}` }],
        },
        {
          id: 's10-shared-ptr',
          name: 'shared_ptr と weak_ptr',
          level: 'advanced',
          keywords: 'shared_ptr weak_ptr 参照カウント 循環参照 make_shared use_count',
          desc: '`shared_ptr` は参照カウント方式で複数の所有者を持てる。カウントが 0 で解放。`weak_ptr` は所有権を持たない弱参照で循環参照を防ぐ。`make_shared` は参照カウントとオブジェクトを一度に確保して効率的。',
          code: [{ lang: 'C++', code: `auto sp1 = std::make_shared<std::string>("hello");
auto sp2 = sp1;              // 参照カウント: 2
std::cout << sp1.use_count(); // 2

// weak_ptr: 循環参照防止
struct Node {
    std::shared_ptr<Node> next;
    std::weak_ptr<Node>   prev; // weak でないと循環参照でリーク
};

// weak_ptr の使い方
std::weak_ptr<std::string> wp = sp1;
if (auto locked = wp.lock()) { // expired してなければ shared_ptr
    std::cout << *locked;
}` }],
          warn: '`shared_ptr` の循環参照（A が B を所有、B が A を所有）は参照カウントが 0 にならずメモリリーク。片方を `weak_ptr` にすること。`make_shared` は `new` + `shared_ptr` より効率的。',
        },
      ],
    },
    // ─────────────────────────────────────────────────────────────
    // 11 例外処理
    // ─────────────────────────────────────────────────────────────
    {
      id: 's11',
      num: 11,
      title: '例外処理',
      level: 'basic',
      items: [
        {
          id: 's11-try-catch',
          name: 'try / catch / throw',
          level: 'basic',
          keywords: 'try catch throw 例外 exception std::exception runtime_error invalid_argument',
          desc: '`throw` で任意の型をスローできるが `std::exception` 派生クラスを使うのが慣習。`catch(...)` で全例外を捕捉。捕捉されない例外は `std::terminate` が呼ばれる。',
          code: [{ lang: 'C++', code: `#include <stdexcept>

double divide(double a, double b) {
    if (b == 0.0) throw std::invalid_argument("division by zero");
    return a / b;
}

try {
    double r = divide(10.0, 0.0);
} catch (const std::invalid_argument& e) {
    std::cerr << "Invalid: " << e.what() << "\n";
} catch (const std::exception& e) {
    std::cerr << "Error: " << e.what() << "\n";
} catch (...) {
    std::cerr << "Unknown exception\n";
}

// 独自例外クラス
class AppError : public std::runtime_error {
public:
    AppError(int code, const std::string& msg)
        : std::runtime_error(msg), code_(code) {}
    int code() const { return code_; }
private:
    int code_;
};` }],
        },
        {
          id: 's11-noexcept',
          name: 'noexcept と例外安全性',
          level: 'basic',
          keywords: 'noexcept 例外安全 ムーブ パフォーマンス guarantee',
          desc: '`noexcept` は例外をスローしないことを宣言。ムーブコンストラクタに付けると `vector` リサイズ時にムーブが使われパフォーマンスが向上する。`noexcept` な関数が例外をスローすると `std::terminate`。',
          code: [{ lang: 'C++', code: `void cleanup() noexcept { /* 例外を投げない */ }

// ムーブには noexcept を付けるべき（vector の最適化に影響）
class MyClass {
public:
    MyClass(MyClass&& o) noexcept : data_(o.data_) {
        o.data_ = nullptr;
    }
};

// 例外安全性の 3 レベル:
// 1. Basic guarantee: 例外後もリソースリークなし（最低保証）
// 2. Strong guarantee: 例外後は操作前の状態（トランザクション的）
// 3. No-throw guarantee: 例外が発生しない（noexcept）` }],
          warn: '`vector` のリサイズ時、ムーブコンストラクタが `noexcept` でないと安全のためコピーが使われる（パフォーマンス低下）。ムーブ操作には必ず `noexcept` を付けること。',
        },
      ],
    },
    // ─────────────────────────────────────────────────────────────
    // 12 STL コンテナ
    // ─────────────────────────────────────────────────────────────
    {
      id: 's12',
      num: 12,
      title: 'STL コンテナ',
      level: 'basic',
      items: [
        {
          id: 's12-vector',
          name: 'std::vector',
          level: 'basic',
          keywords: 'vector 動的配列 push_back emplace_back reserve resize erase',
          desc: '最も使うコンテナ。動的配列でメモリは連続。末尾への追加は平均 O(1)。`reserve` で事前にメモリ確保するとリサイズを防げる。`emplace_back` はコピーなしでその場に構築。',
          code: [{ lang: 'C++', code: `std::vector<int> v;
v.reserve(100);           // メモリ事前確保（サイズは変わらない）
v.push_back(1);
v.emplace_back(2);        // その場で構築（std::string 等でコピー不要）
v.pop_back();
v.insert(v.begin(), 0);  // 先頭挿入（O(n)）
v.erase(v.begin());      // 先頭削除（O(n)）

v[0];        // 範囲チェックなし（高速）
v.at(0);     // 範囲チェックあり（越えると std::out_of_range）
v.front();   // 先頭要素
v.back();    // 末尾要素
v.data();    // 生ポインタ（C API に渡す場合）` }],
          warn: '`push_back` や `insert` でリサイズが発生すると、既存のイテレータ・ポインタ・参照がすべて無効になる（ダングリング）。イテレータを保持したまま push_back しないこと。',
        },
        {
          id: 's12-map',
          name: 'std::map と std::unordered_map',
          level: 'basic',
          keywords: 'map unordered_map hash 連想配列 辞書 find insert try_emplace',
          desc: '`std::map` は赤黒木でキー順に保持（O(log n)）。`std::unordered_map` はハッシュテーブルで平均 O(1)。順序不要なら `unordered_map` の方が速い。',
          code: [{ lang: 'C++', code: `std::unordered_map<std::string, int> scores;
scores["Alice"] = 90;

// 安全なアクセス: [] はキーがなければデフォルト値で挿入してしまう
if (auto it = scores.find("Carol"); it != scores.end()) {
    std::cout << it->second;
} else {
    std::cout << "not found";
}

// 挿入（既存キーは上書きしない）
auto [it, ok] = scores.try_emplace("Eve", 95); // C++17

// C++17 構造化束縛で全要素走査
for (const auto& [key, val] : scores) {
    std::cout << key << ": " << val << "\n";
}` }],
          warn: '`map[key]` はキーが存在しない場合にデフォルトコンストラクタで要素を生成・挿入する。`const map` に `[]` は使えない。存在確認は `find` か `contains`（C++20）を使うこと。',
        },
        {
          id: 's12-set-queue',
          name: 'set / unordered_set / queue / stack',
          level: 'basic',
          keywords: 'set unordered_set queue stack deque LIFO FIFO priority_queue',
          desc: '`std::set` は重複なしの順序付きコレクション。`std::queue` は FIFO、`std::stack` は LIFO。`std::priority_queue` で優先キュー。いずれも内部実装は別のコンテナのアダプタ。',
          code: [{ lang: 'C++', code: `// set: 重複なし・ソート済み
std::set<int> s = {3, 1, 4, 1, 5}; // {1, 3, 4, 5}
s.insert(9);
s.count(3);   // 0 か 1
s.contains(3); // C++20: bool

// queue: FIFO
std::queue<std::string> q;
q.push("first"); q.push("second");
q.front(); // "first"
q.pop();   // front を削除

// stack: LIFO
std::stack<int> st;
st.push(1); st.push(2);
st.top(); // 2
st.pop(); // 2 を削除

// priority_queue: 最大値優先
std::priority_queue<int> pq;
pq.push(3); pq.push(1); pq.push(4);
pq.top(); // 4` }],
        },
      ],
    },
    // ─────────────────────────────────────────────────────────────
    // 13 STL アルゴリズムとイテレータ
    // ─────────────────────────────────────────────────────────────
    {
      id: 's13',
      num: 13,
      title: 'STL アルゴリズムとイテレータ',
      level: 'advanced',
      items: [
        {
          id: 's13-iterators',
          name: 'イテレータ',
          level: 'advanced',
          keywords: 'iterator イテレータ begin end rbegin rend back_inserter ostream_iterator',
          desc: 'STL アルゴリズムはイテレータを通じてコンテナ非依存に動作する。カテゴリ（入力・出力・前向き・双方向・ランダムアクセス）によって使えるアルゴリズムが異なる。',
          code: [{ lang: 'C++', code: `std::vector<int> v = {1, 2, 3, 4, 5};

// begin/end: 前から走査
for (auto it = v.begin(); it != v.end(); ++it) { ... }

// rbegin/rend: 後ろから走査
for (auto it = v.rbegin(); it != v.rend(); ++it) { ... }

// イテレータアダプタ
#include <iterator>
// ostream_iterator で出力
std::copy(v.begin(), v.end(),
    std::ostream_iterator<int>(std::cout, " ")); // 1 2 3 4 5

// back_inserter でコンテナ末尾に追加
std::vector<int> out;
std::copy(v.begin(), v.end(), std::back_inserter(out));` }],
        },
        {
          id: 's13-algorithms',
          name: 'std::sort / find / transform / accumulate',
          level: 'advanced',
          keywords: 'sort find count transform for_each accumulate remove_if algorithm erase',
          desc: '`<algorithm>` ヘッダに豊富なアルゴリズム。`std::sort` はイントロソート（O(n log n)）。`remove_if` + `erase` のイディオムでフィルタリング。',
          code: [{ lang: 'C++', code: `#include <algorithm>
#include <numeric>

std::vector<int> v = {5, 3, 1, 4, 2};
std::sort(v.begin(), v.end());                            // 昇順
std::sort(v.begin(), v.end(), std::greater<int>());       // 降順

auto it = std::find(v.begin(), v.end(), 3);
if (it != v.end()) { /* 見つかった */ }

// Erase-Remove イディオム: 条件に合う要素を削除
v.erase(std::remove_if(v.begin(), v.end(),
    [](int x){ return x % 2 == 0; }), v.end());

// transform: 変換
std::vector<int> doubled;
std::transform(v.begin(), v.end(), std::back_inserter(doubled),
    [](int x){ return x * 2; });

// accumulate: 集約（初期値が必要）
int sum = std::accumulate(v.begin(), v.end(), 0);` }],
          warn: '`std::remove` / `std::remove_if` は要素を削除せず、削除対象を末尾に移動して新しい末尾イテレータを返すだけ。`vector::erase` と組み合わせて実際に削除すること（Erase-Remove イディオム）。',
        },
        {
          id: 's13-ranges',
          name: 'std::ranges (C++20)',
          level: 'advanced',
          keywords: 'ranges views pipeline C++20 filter transform lazy 遅延評価',
          desc: 'C++20 の `<ranges>` はアルゴリズムをパイプライン形式で記述できる。`views` は遅延評価でコピーが不要。コンテナ全体を引数に取るオーバーロードも追加された。',
          code: [{ lang: 'C++', code: `#include <ranges>

std::vector<int> v = {1, 2, 3, 4, 5, 6};

// パイプライン（遅延評価: 走査時まで計算しない）
auto result = v
    | std::views::filter([](int x){ return x % 2 == 0; }) // 偶数
    | std::views::transform([](int x){ return x * x; });  // 二乗

for (int x : result) {
    std::cout << x << " "; // 4 16 36
}

// ranges::sort: begin()/end() 省略可
std::ranges::sort(v);
auto it = std::ranges::find(v, 3);
bool found = std::ranges::contains(v, 3); // C++23` }],
        },
      ],
    },
    // ─────────────────────────────────────────────────────────────
    // 14 テンプレート
    // ─────────────────────────────────────────────────────────────
    {
      id: 's14',
      num: 14,
      title: 'テンプレート',
      level: 'advanced',
      items: [
        {
          id: 's14-function-template',
          name: '関数テンプレート',
          level: 'advanced',
          keywords: 'template 関数テンプレート typename 型推論 instantiation 非型パラメータ',
          desc: '`template<typename T>` で型パラメータを取る関数を定義。呼び出し時に型が推論されるため明示指定は少ない。インスタンス化はコンパイル時に行われる。',
          code: [{ lang: 'C++', code: `template<typename T>
T maximum(T a, T b) { return a > b ? a : b; }

maximum(3, 5);         // T = int（推論）
maximum(3.0, 5.0);     // T = double
maximum<int>(3, 5);    // T を明示

// 複数の型パラメータ
template<typename T, typename U>
auto add(T a, U b) -> decltype(a + b) { return a + b; }

// 非型パラメータ（値をテンプレート引数に）
template<std::size_t N>
void printArray(const int (&arr)[N]) {
    for (std::size_t i = 0; i < N; ++i) std::cout << arr[i] << " ";
}
int a[] = {1, 2, 3};
printArray(a); // N = 3 が推論` }],
          warn: 'テンプレートはヘッダファイルに実装を書く必要がある（`.cpp` に分けると未定義シンボルエラー）。宣言と定義を同じヘッダに置くこと。',
        },
        {
          id: 's14-class-template',
          name: 'クラステンプレートと特殊化',
          level: 'advanced',
          keywords: 'class template クラステンプレート 特殊化 partial specialization',
          desc: 'クラスにも型パラメータを持たせられる。`std::vector<int>` のように使う。特殊化で特定の型に対して別実装を提供できる。',
          code: [{ lang: 'C++', code: `template<typename T>
class Stack {
public:
    void push(T val) { data_.push_back(std::move(val)); }
    T pop() { T v = std::move(data_.back()); data_.pop_back(); return v; }
    bool empty() const { return data_.empty(); }
    std::size_t size() const { return data_.size(); }
private:
    std::vector<T> data_;
};

Stack<int> si;
si.push(1); si.push(2);

// 完全特殊化: bool に対して別実装
template<>
class Stack<bool> {
    // ビット単位で保存する効率的な実装...
};` }],
        },
        {
          id: 's14-concept',
          name: 'concept (C++20)',
          level: 'advanced',
          keywords: 'concept C++20 requires constraint テンプレート制約 SFINAE',
          desc: 'C++20 の `concept` でテンプレート引数に制約を付けられ、エラーメッセージが大幅に改善される。`requires` 式で型が特定の操作をサポートするか検査できる。',
          code: [{ lang: 'C++', code: `#include <concepts>

// concept の定義
template<typename T>
concept Addable = requires(T a, T b) { a + b; };

template<typename T>
concept Numeric = std::integral<T> || std::floating_point<T>;

// concept で制約されたテンプレート関数
template<Addable T>
T sum(T a, T b) { return a + b; }

// requires 節でも書ける
template<typename T>
    requires Numeric<T>
T square(T x) { return x * x; }

sum(1, 2);        // OK: int は Addable
// sum(std::vector<int>{}, {}); // エラー: Addable を満たさない（明快なエラー）` }],
        },
        {
          id: 's14-variadic',
          name: '可変引数テンプレート',
          level: 'advanced',
          keywords: '可変引数 variadic template parameter pack fold expression',
          desc: '`template<typename... Args>` で任意個の型パラメータを受け取れる。C++17 のフォールド式でパックに対する演算を簡潔に書ける。',
          code: [{ lang: 'C++', code: `// 可変引数テンプレート
template<typename... Args>
void print(Args&&... args) {
    (std::cout << ... << args) << "\n"; // C++17 フォールド式
}
print(1, " ", 2.0, " ", "hello"); // 1 2 hello

// 型の数を取得
template<typename... Ts>
constexpr std::size_t count() { return sizeof...(Ts); }
count<int, double, std::string>(); // 3

// 完全転送と組み合わせ（make_unique の実装例）
template<typename T, typename... Args>
std::unique_ptr<T> myMakeUnique(Args&&... args) {
    return std::unique_ptr<T>(new T(std::forward<Args>(args)...));
}` }],
        },
      ],
    },
    // ─────────────────────────────────────────────────────────────
    // 15 ムーブセマンティクス
    // ─────────────────────────────────────────────────────────────
    {
      id: 's15',
      num: 15,
      title: 'ムーブセマンティクス',
      level: 'advanced',
      items: [
        {
          id: 's15-rvalue-reference',
          name: '右辺値参照と std::move',
          level: 'advanced',
          keywords: 'rvalue reference 右辺値参照 lvalue std::move ムーブ 所有権 転送',
          desc: 'C++11 の右辺値参照（`T&&`）で、もうすぐ破棄されるオブジェクトのリソースを「盗む」ムーブが可能。`std::move` は左辺値を右辺値参照にキャストするだけで、実際の移動はムーブコンストラクタが行う。',
          code: [{ lang: 'C++', code: `std::string a = "hello";
std::string b = std::move(a); // a のバッファを b に移す。a は空文字列に

// 関数の戻り値は自動でムーブ（RVO/NRVO でさらに最適化）
std::vector<int> makeVec() {
    std::vector<int> v = {1, 2, 3};
    return v; // コンパイラが最適化（コピーなし）
}

// 関数引数でのムーブ（所有権の移転）
class Repo {
    std::vector<int> data_;
public:
    void store(std::vector<int> v) { data_ = std::move(v); }
};
Repo r;
std::vector<int> big(1000);
r.store(std::move(big)); // big の中身を移転` }],
          warn: '`std::move` 後のオブジェクトは「有効だが未規定の状態」（通常は空）。移動元の変数を再利用する場合は再代入してから使うこと。',
        },
        {
          id: 's15-perfect-forwarding',
          name: '完全転送（std::forward）',
          level: 'advanced',
          keywords: 'perfect forwarding std::forward forwarding reference 転送参照 universal reference',
          desc: 'テンプレートパラメータの `T&&` は「転送参照（forwarding reference）」になる。`std::forward<T>` で左辺値なら左辺値として、右辺値なら右辺値として次の関数に転送できる。',
          code: [{ lang: 'C++', code: `// 完全転送: 引数の値カテゴリを保持して渡す
template<typename T, typename... Args>
std::unique_ptr<T> myMakeUnique(Args&&... args) {
    return std::unique_ptr<T>(
        new T(std::forward<Args>(args)...)
    );
}

struct Widget {
    Widget(int x, std::string s) {}
};

auto w = myMakeUnique<Widget>(42, std::string("hello"));
// 42 は int&&（右辺値）として転送
// std::string("hello") は string&&（右辺値）として転送` }],
          warn: '`std::forward` と `std::move` は別物。`std::forward` は値カテゴリを保持して転送するためのもの。転送参照でない場所で `std::forward` を使うと意図しないムーブが発生する。',
        },
        {
          id: 's15-copy-elision',
          name: 'RVO / NRVO とコピー省略',
          level: 'advanced',
          keywords: 'RVO NRVO copy elision コピー省略 戻り値最適化 move',
          desc: 'C++17 でコピー省略（copy elision）が一部必須化。`return` に右辺値（一時オブジェクト）を返す場合はコピーもムーブも不要。名前付き戻り値最適化（NRVO）は任意だがほとんどのコンパイラが実装。',
          code: [{ lang: 'C++', code: `std::string make() {
    std::string s = "hello";
    return s; // NRVO: s のコンストラクタは 1 回だけ（コピー・ムーブなし）
}

// C++17 必須のコピー省略
std::string s = make(); // コピーもムーブも発生しない

// 注意: std::move して返すと NRVO を妨害する場合がある
std::string makeBad() {
    std::string s = "hello";
    return std::move(s); // NRVO が無効になる可能性（パフォーマンス低下）
}` }],
          warn: '`return std::move(local);` はローカル変数に対して NRVO を妨害する可能性がある。ローカル変数をそのまま `return` すれば良い。`std::move` が必要なのはメンバ変数や引数を返す場合。',
        },
      ],
    },
    // ─────────────────────────────────────────────────────────────
    // 16 モダン C++（C++17/20）
    // ─────────────────────────────────────────────────────────────
    {
      id: 's16',
      num: 16,
      title: 'モダン C++（C++17/20）',
      level: 'advanced',
      items: [
        {
          id: 's16-structured-binding',
          name: '構造化束縛と if constexpr',
          level: 'advanced',
          keywords: '構造化束縛 structured binding if constexpr C++17 tuple pair auto',
          desc: 'C++17 の構造化束縛 `auto [a, b] = pair;` で複数の戻り値を分解できる。`if constexpr` はテンプレートの分岐をコンパイル時に解決し、コンパイルされない方の型チェックをスキップする。',
          code: [{ lang: 'C++', code: `// 構造化束縛
auto [x, y] = std::make_pair(1, 2.0);
auto [it, ok] = myMap.insert({"key", 42}); // C++17

std::tuple<int, std::string, double> t{1, "hi", 3.14};
auto [id, name, score] = t;

// if constexpr（コンパイル時分岐）
template<typename T>
std::string describe(T val) {
    if constexpr (std::is_integral_v<T>) {
        return "integer: " + std::to_string(val);
    } else if constexpr (std::is_floating_point_v<T>) {
        return "float: " + std::to_string(val);
    } else {
        return "other";
    }
}` }],
        },
        {
          id: 's16-optional-variant',
          name: 'std::optional と std::variant',
          level: 'advanced',
          keywords: 'optional variant visit nullopt holds_alternative C++17 sum type nullable',
          desc: '`std::optional<T>` は値があるかどうかを表す型（null 安全な代替）。`std::variant<T...>` は型安全な共用体。`std::visit` でパターンマッチ的に処理できる。',
          code: [{ lang: 'C++', code: `#include <optional>
#include <variant>

// optional: 値なし状態を表現
std::optional<int> findFirst(const std::vector<int>& v, int key) {
    for (int x : v) if (x == key) return x;
    return std::nullopt;
}
auto r = findFirst({1,2,3}, 2);
if (r) std::cout << *r;    // 2
r.value_or(-1);            // なければ -1

// variant: 型安全な共用体
using Val = std::variant<int, double, std::string>;
Val v = 42;
v = "hello";

std::visit([](auto&& x) {
    std::cout << x << "\n"; // 型に応じた処理
}, v);

if (std::holds_alternative<std::string>(v)) {
    std::cout << std::get<std::string>(v);
}` }],
        },
        {
          id: 's16-modules-coroutine',
          name: 'モジュールとコルーチン（C++20）',
          level: 'advanced',
          keywords: 'module import export コルーチン coroutine co_await co_yield C++20 非同期',
          desc: 'C++20 のモジュールはヘッダファイルをプリコンパイルするより速く、ODR 問題やマクロ漏れを防ぐ。コルーチンは `co_yield`・`co_await`・`co_return` で中断/再開できる関数。',
          code: [{ lang: 'C++', code: `// モジュール（C++20）
// math.ixx
export module math;
export int add(int a, int b) { return a + b; }

// main.cpp
import math;
int r = add(1, 2);

// コルーチン（C++23 の std::generator 利用例）
// #include <generator>
// std::generator<int> fibonacci() {
//     int a = 0, b = 1;
//     while (true) {
//         co_yield a;
//         std::tie(a, b) = std::make_tuple(b, a + b);
//     }
// }
// for (int n : fibonacci() | std::views::take(10)) {
//     std::cout << n << " "; // 0 1 1 2 3 5 8 13 21 34
// }` }],
          warn: 'C++20 のコルーチンは言語キーワードのみ定義しており、`std::generator` は C++23 から。コルーチンを使うには cppcoro・Asio 等のサードパーティライブラリか、C++23 への移行が必要。',
        },
      ],
    },
  ],
};

export default data;
