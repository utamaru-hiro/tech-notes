import type { LanguageGuide } from '../../types';

const data: LanguageGuide = {
  lang: 'Zig',
  langSlug: 'zig',
  version: 'Zig 0.13.x',
  lead: `他言語の経験者が 2〜3 時間でざっと読み通せるリファレンスです。コンパイル時計算・手動メモリ管理・C 互換性など Zig 固有の概念を重点的に解説します。`,
  accent: '#8c5a00',
  accent2: '#fff0cc',
  bgGradientTop: '#fffbf0',
  bgRadialLeft: 'rgba(140,90,0,0.10)',
  bgRadialRight: 'rgba(180,130,0,0.07)',
  badgeGradient: 'linear-gradient(135deg, #5a3a00, #8c5a00)',
  heroEmoji: '⚡',
  navGroups: [
    { label: '基礎', sections: ['s1','s2','s3','s4','s5','s6'] },
    { label: 'メモリ', sections: ['s7','s8','s9'] },
    { label: '型システム', sections: ['s10','s11'] },
    { label: '実用', sections: ['s12','s13','s14'] },
    { label: '応用', sections: ['s15','s16'] },
  ],
  sections: [
    {
      id: 's1', num: 1, title: '変数・定数・型', level: 'basic',
      items: [
        {
          id: 's1-const-var', name: 'const と var', level: 'basic',
          keywords: 'const var immutable mutable declaration',
          desc: '`const` は不変（コンパイル時定数にもなれる）、`var` は変更可能。型推論あり（`const x = 42`）。未使用変数はコンパイルエラー。',
          code: [{ lang: 'Zig', code: `const x: i32 = 42;       // 不変
var   y: i32 = 10;       // 可変
y += 1;                   // OK
// x = 99;               // コンパイルエラー

const z = "hello";        // 型推論 → *const [5:0]u8` }],
        },
        {
          id: 's1-types', name: '基本型', level: 'basic',
          keywords: 'i32 u64 f64 bool usize isize comptime_int',
          desc: '整数は `i8`〜`i128`・`u8`〜`u128`・`usize`（ポインタサイズ整数）。浮動小数点は `f16`・`f32`・`f64`。コンパイル時定数は `comptime_int`・`comptime_float`。',
          code: [{ lang: 'Zig', code: `const a: i32    = -42;
const b: u64    = 18446744073709551615;
const c: f64    = 3.14;
const d: bool   = true;
const e: usize  = 0;       // ポインタサイズ
const f: u8     = 0xFF;
const g: i128   = 0;` }],
        },
        {
          id: 's1-undefined-null', name: 'undefined と null', level: 'basic',
          keywords: 'undefined null optional ?T unreachable',
          desc: '`undefined` は初期化なし（デバッグビルドでは 0xAA... で埋まる）。`null` は存在しない。Zig に `null` はなく、nullable には `?T`（optional 型）を使う。',
          code: [{ lang: 'Zig', code: `var buf: [100]u8 = undefined;  // 未初期化（後で必ず初期化）

var maybe: ?i32 = null;
maybe = 42;
if (maybe) |val| {
    std.debug.print("value: {d}\\n", .{val});
}` }],
        },
        {
          id: 's1-comptime', name: 'comptime（コンパイル時）', level: 'basic',
          keywords: 'comptime compile-time evaluation constant',
          desc: '`comptime` 修飾子でコンパイル時に評価される値や処理を宣言。ジェネリクスも `comptime` で実現する。',
          code: [{ lang: 'Zig', code: `const arr_size = comptime blk: {
    var size: usize = 1;
    while (size < 100) : (size *= 2) {}
    break :blk size;
};
// arr_size = 128（コンパイル時に確定）

fn makeArray(comptime T: type, comptime n: usize) [n]T {
    return std.mem.zeroes([n]T);
}` }],
        },
      ],
    },
    {
      id: 's2', num: 2, title: '制御フロー', level: 'basic',
      items: [
        {
          id: 's2-if', name: 'if 式', level: 'basic',
          keywords: 'if else if expression optional payload capture',
          desc: 'Zig の `if` は式。optional 型のペイロードキャプチャ（`if (opt) |val|`）とエラーキャプチャ（`if (err) |val| else |e|`）が使える。',
          code: [{ lang: 'Zig', code: `const x: i32 = 5;
const result = if (x > 3) "big" else "small";

// Optional のキャプチャ
var opt: ?i32 = 42;
if (opt) |val| {
    std.debug.print("got {d}\\n", .{val});
} else {
    std.debug.print("null\\n", .{});
}` }],
        },
        {
          id: 's2-while', name: 'while / for', level: 'basic',
          keywords: 'while for loop continue break label',
          desc: '`while` に `:（update expr）` でインクリメント式を書ける。`for` はスライスや配列の要素を反復。ラベル付きで `break :label` で外側のループを抜けられる。',
          code: [{ lang: 'Zig', code: `// while
var i: usize = 0;
while (i < 5) : (i += 1) {
    std.debug.print("{d} ", .{i});
}

// for（スライス反復）
const nums = [_]i32{ 1, 2, 3, 4, 5 };
for (nums) |n| {
    std.debug.print("{d}\\n", .{n});
}

// インデックス付き for
for (nums, 0..) |n, idx| {
    std.debug.print("{d}: {d}\\n", .{idx, n});
}` }],
        },
        {
          id: 's2-switch', name: 'switch 式', level: 'basic',
          keywords: 'switch case else exhaustive enum',
          desc: 'Zig の `switch` は網羅的（全ケースが必要）で式として値を返せる。enum に対して特に強力。範囲（`1...5`）も使える。',
          code: [{ lang: 'Zig', code: `const val: i32 = 3;
const name = switch (val) {
    1     => "one",
    2, 3  => "two or three",   // 複数値
    4...9 => "four to nine",   // 範囲
    else  => "other",
};` }],
        },
        {
          id: 's2-defer', name: 'defer と errdefer', level: 'basic',
          keywords: 'defer errdefer cleanup RAII scope exit',
          desc: '`defer` はスコープ終了時に実行するクリーンアップを登録（LIFO 順）。`errdefer` はエラーでスコープを抜けた場合のみ実行される。',
          code: [{ lang: 'Zig', code: `fn processFile(path: []const u8) !void {
    const file = try std.fs.cwd().openFile(path, .{});
    defer file.close();    // スコープ終了時に必ず実行

    // errdefer: エラー時のみ実行（成功時は不要なクリーンアップ）
    const data = try allocator.alloc(u8, 1024);
    errdefer allocator.free(data);
    // ... ここで error が発生すると data は free される
}` }],
        },
      ],
    },
    {
      id: 's3', num: 3, title: '関数', level: 'basic',
      items: [
        {
          id: 's3-definition', name: '関数定義', level: 'basic',
          keywords: 'fn function return void pub',
          desc: '`fn` で関数を定義。戻り値型は必須（`void` はなにも返さない）。`pub` で外部公開。引数はすべて不変。',
          code: [{ lang: 'Zig', code: `fn add(a: i32, b: i32) i32 {
    return a + b;
}

pub fn greet(name: []const u8) void {
    std.debug.print("Hello, {s}!\\n", .{name});
}

// 戻り値を使う場合は discardが必要
_ = add(1, 2);` }],
        },
        {
          id: 's3-error', name: 'エラーユニオン型', level: 'basic',
          keywords: 'error union !T try catch anyerror error set',
          desc: '`!T` はエラーユニオン型（エラーまたは `T`）。`try` でエラーを呼び出し元に伝播（C# の `?. `に相当）。`catch` でエラーをハンドル。',
          code: [{ lang: 'Zig', code: `const MyError = error{ NotFound, InvalidInput };

fn readValue(key: []const u8) MyError!i32 {
    if (key.len == 0) return error.InvalidInput;
    if (std.mem.eql(u8, key, "answer")) return 42;
    return error.NotFound;
}

// try はエラーを上位に伝播
const val = try readValue("answer");

// catch でハンドル
const val2 = readValue("missing") catch |err| blk: {
    std.debug.print("Error: {}\\n", .{err});
    break :blk 0;
};` }],
        },
        {
          id: 's3-comptime-fn', name: 'comptime 関数（ジェネリクス）', level: 'basic',
          keywords: 'comptime generic type parameter anytype',
          desc: 'Zig のジェネリクスは `comptime T: type` で実現。型をコンパイル時引数として渡す。テンプレートに近い概念で、実行時オーバーヘッドがない。',
          code: [{ lang: 'Zig', code: `fn max(comptime T: type, a: T, b: T) T {
    return if (a > b) a else b;
}

const a = max(i32, 10, 20);   // 20
const b = max(f64, 3.14, 2.71); // 3.14` }],
        },
        {
          id: 's3-inline', name: 'inline 関数と呼び出し', level: 'advanced',
          keywords: 'inline callconv inlining performance',
          desc: '`inline fn` でインライン展開を強制。`callconv` で呼び出し規約を指定（C ABI など）。FFI で使用。',
          code: [{ lang: 'Zig', code: `inline fn square(x: i32) i32 {
    return x * x;
}

// C 呼び出し規約
export fn c_add(a: c_int, b: c_int) callconv(.C) c_int {
    return a + b;
}` }],
        },
      ],
    },
    {
      id: 's4', num: 4, title: '配列・スライス', level: 'basic',
      items: [
        {
          id: 's4-array', name: '配列', level: 'basic',
          keywords: 'array [N]T fixed size stack',
          desc: '`[N]T` は N 個の T の配列（スタック割り当て、サイズはコンパイル時確定）。`[_]T` でサイズを推論させられる。',
          code: [{ lang: 'Zig', code: `const arr = [5]i32{ 1, 2, 3, 4, 5 };
const arr2 = [_]i32{ 10, 20, 30 };  // サイズ推論 → [3]i32
std.debug.print("{d}\\n", .{arr[2]});  // 3
std.debug.print("{d}\\n", .{arr.len}); // 5` }],
        },
        {
          id: 's4-slice', name: 'スライス', level: 'basic',
          keywords: 'slice []T pointer fat pointer',
          desc: '`[]T` はポインタと長さのペア（ファットポインタ）。配列・他のスライスから切り出せる。`[]const u8` は文字列に使われる。',
          code: [{ lang: 'Zig', code: `const arr = [_]i32{ 1, 2, 3, 4, 5 };
const slice: []const i32 = arr[1..4];   // [2,3,4]
std.debug.print("{d}\\n", .{slice.len}); // 3
std.debug.print("{d}\\n", .{slice[0]});  // 2

// 文字列はスライス
const s: []const u8 = "hello";` }],
        },
        {
          id: 's4-sentinel', name: 'センチネル終端配列', level: 'basic',
          keywords: 'sentinel null terminated C string [N:0]T',
          desc: '`[N:0]T` はセンチネル（番兵）終端配列。C の null 終端文字列（`[*:0]u8`）との互換に使う。',
          code: [{ lang: 'Zig', code: `const cstr: [*:0]const u8 = "hello";   // C 文字列
const zstr: [:0]const u8 = "hello";   // Zig スライス（len + null）

// C 関数に渡す
const c = @import("std").c;
_ = c.puts(cstr);` }],
        },
        {
          id: 's4-arraylist', name: 'ArrayList（動的配列）', level: 'basic',
          keywords: 'ArrayList dynamic array heap allocator std.ArrayList',
          desc: '`std.ArrayList(T)` はヒープ上の動的配列（Rust の `Vec` に相当）。アロケータを明示的に渡す必要がある。',
          code: [{ lang: 'Zig', code: `const std = @import("std");
var list = std.ArrayList(i32).init(allocator);
defer list.deinit();

try list.append(1);
try list.append(2);
try list.append(3);
std.debug.print("{d}\\n", .{list.items.len});  // 3` }],
        },
      ],
    },
    {
      id: 's5', num: 5, title: '文字列・フォーマット', level: 'basic',
      items: [
        {
          id: 's5-string', name: '文字列の表現', level: 'basic',
          keywords: 'string []const u8 UTF-8 literal',
          desc: 'Zig の文字列は `[]const u8`（UTF-8 バイト列）。文字列リテラルはコンパイル時定数。`\\"` でエスケープ。マルチライン文字列は `\\\\` 行で書く。',
          code: [{ lang: 'Zig', code: `const s1: []const u8 = "hello";
const s2 = "world";
const s3 = s1;   // コピーではなくスライス参照

// マルチライン文字列
const multi =
    \\Hello,
    \\World!
    ;` }],
        },
        {
          id: 's5-format', name: '文字列フォーマット', level: 'basic',
          keywords: 'std.fmt format print debug.print {d} {s} {any}',
          desc: '`std.debug.print` でデバッグ出力。`std.fmt.allocPrint` でヒープに文字列を生成。フォーマット指定子: `{d}`（整数）`{s}`（文字列）`{any}`（任意）`{x}`（16進）。',
          code: [{ lang: 'Zig', code: `const std = @import("std");

std.debug.print("n={d} s={s}\\n", .{42, "hello"});

// ヒープに文字列を作成（解放が必要）
const msg = try std.fmt.allocPrint(allocator, "x={d}", .{42});
defer allocator.free(msg);` }],
        },
        {
          id: 's5-compare', name: '文字列比較', level: 'basic',
          keywords: 'std.mem.eql compare equal string bytes',
          desc: 'Zig の `==` はポインタ比較。文字列の内容比較には `std.mem.eql(u8, a, b)` を使う。',
          code: [{ lang: 'Zig', code: `const a = "hello";
const b = "hello";
const eq = std.mem.eql(u8, a, b);   // true

const starts = std.mem.startsWith(u8, "hello world", "hello");
const idx = std.mem.indexOf(u8, "hello world", "world");  // 6` }],
        },
      ],
    },
    {
      id: 's6', num: 6, title: 'struct・enum・union', level: 'basic',
      items: [
        {
          id: 's6-struct', name: 'struct', level: 'basic',
          keywords: 'struct field method init',
          desc: '`struct` でフィールドを持つ複合型を定義。メソッド（関数フィールド）も持てる。`self` は慣例（名前は自由）。',
          code: [{ lang: 'Zig', code: `const Point = struct {
    x: f64,
    y: f64,

    pub fn distance(self: Point, other: Point) f64 {
        const dx = self.x - other.x;
        const dy = self.y - other.y;
        return @sqrt(dx * dx + dy * dy);
    }
};

const p1 = Point{ .x = 0, .y = 0 };
const p2 = Point{ .x = 3, .y = 4 };
std.debug.print("{d}\\n", .{p1.distance(p2)});   // 5` }],
        },
        {
          id: 's6-enum', name: 'enum', level: 'basic',
          keywords: 'enum tag type ordinal method',
          desc: '`enum` は名前付き整数定数のセット。メソッドを持てる。`@intFromEnum`・`@enumFromInt` で整数との変換。',
          code: [{ lang: 'Zig', code: `const Direction = enum {
    North, South, East, West,

    pub fn opposite(self: Direction) Direction {
        return switch (self) {
            .North => .South,
            .South => .North,
            .East  => .West,
            .West  => .East,
        };
    }
};

const d = Direction.North;
std.debug.print("{s}\\n", .{@tagName(d.opposite())}); // "South"` }],
        },
        {
          id: 's6-union', name: 'union と tagged union', level: 'basic',
          keywords: 'union tagged union enum variant',
          desc: '`union` は複数の型のうち1つを格納。`union(enum)` でタグ付き union（Rust の enum に相当）。`switch` でタグをパターンマッチできる。',
          code: [{ lang: 'Zig', code: `const Value = union(enum) {
    int: i64,
    float: f64,
    bool: bool,
    str: []const u8,
};

const v = Value{ .int = 42 };
switch (v) {
    .int   => |n| std.debug.print("int: {d}\\n",  .{n}),
    .float => |f| std.debug.print("float: {d}\\n", .{f}),
    .bool  => |b| std.debug.print("bool: {}\\n",  .{b}),
    .str   => |s| std.debug.print("str: {s}\\n",  .{s}),
}` }],
        },
        {
          id: 's6-packed', name: 'packed struct / extern struct', level: 'advanced',
          keywords: 'packed extern struct ABI C interop bitfield',
          desc: '`packed struct` はフィールドを詰めて配置（ビットフィールド相当）。`extern struct` は C の ABI に準拠したレイアウト。',
          code: [{ lang: 'Zig', code: `const Flags = packed struct {
    visible:  u1 = 0,
    active:   u1 = 0,
    readonly: u1 = 0,
    _pad:     u5 = 0,
};

// C 構造体と互換
const CPoint = extern struct {
    x: c_int,
    y: c_int,
};` }],
        },
      ],
    },
    {
      id: 's7', num: 7, title: 'ポインタとメモリ', level: 'basic',
      items: [
        {
          id: 's7-pointer', name: 'ポインタ型', level: 'basic',
          keywords: '*T *const T single pointer many pointer optional',
          desc: '`*T` は単一要素へのポインタ（non-null）。`*const T` は不変ポインタ。`?*T` は nullable ポインタ。`[*]T` は多要素ポインタ（長さなし）。',
          code: [{ lang: 'Zig', code: `var x: i32 = 42;
const ptr: *i32 = &x;
ptr.* = 100;           // デリファレンス
std.debug.print("{d}\\n", .{x});   // 100

const cptr: *const i32 = &x;
// cptr.* = 1;          // コンパイルエラー（不変）

var maybe: ?*i32 = null;
maybe = ptr;` }],
        },
        {
          id: 's7-allocator', name: 'アロケータ', level: 'basic',
          keywords: 'allocator Allocator alloc free GeneralPurposeAllocator',
          desc: 'Zig は標準ライブラリの関数もアロケータを引数に取る。アロケータを差し替えることでメモリ管理戦略を選択できる。テストには `testing.allocator` を使うと leak 検出できる。',
          code: [{ lang: 'Zig', code: `var gpa = std.heap.GeneralPurposeAllocator(.{}){};
defer _ = gpa.deinit();
const allocator = gpa.allocator();

// ヒープ割り当て
const buf = try allocator.alloc(u8, 100);
defer allocator.free(buf);

// 単一オブジェクト
const ptr = try allocator.create(i32);
defer allocator.destroy(ptr);
ptr.* = 42;` }],
        },
        {
          id: 's7-stack', name: 'スタック割り当てと Arena', level: 'basic',
          keywords: 'stack allocation arena FixedBufferAllocator',
          desc: '`std.heap.FixedBufferAllocator` でスタックバッファをアロケータとして使える。`ArenaAllocator` は一括解放のためのアロケータ（Web リクエスト等に有効）。',
          code: [{ lang: 'Zig', code: `// スタックバッファのアロケータ
var buf: [1024]u8 = undefined;
var fba = std.heap.FixedBufferAllocator.init(&buf);
const alloc = fba.allocator();

// Arena（一括解放）
var arena = std.heap.ArenaAllocator.init(std.heap.page_allocator);
defer arena.deinit();  // 全割り当てを一括解放
const arena_alloc = arena.allocator();` }],
        },
      ],
    },
    {
      id: 's8', num: 8, title: 'エラー処理', level: 'basic',
      items: [
        {
          id: 's8-error-set', name: 'エラーセット', level: 'basic',
          keywords: 'error set union anyerror inferred',
          desc: 'エラーは `error { ... }` で名前付き集合として定義。`anyerror` はすべてのエラーを包含するユニオン型。`,` で複数のエラーセットを合成できる。',
          code: [{ lang: 'Zig', code: `const FileError = error{ NotFound, PermissionDenied };
const ParseError = error{ InvalidFormat, UnexpectedEof };

const AppError = FileError || ParseError;  // 合成

fn readConfig(path: []const u8) AppError![]u8 {
    _ = path;
    return error.NotFound;
}` }],
        },
        {
          id: 's8-try-catch', name: 'try / catch / orelse', level: 'basic',
          keywords: 'try catch orelse if error union unwrap',
          desc: '`try expr` はエラーを上位に伝播。`expr catch |e| handler` でエラーを捕捉。`opt orelse default` で optional のデフォルト値を提供。',
          code: [{ lang: 'Zig', code: `// try: エラーを上位に伝播
const content = try std.fs.cwd().readFileAlloc(allocator, "f.txt", 1024);

// catch: エラーを捕捉してデフォルト値
const n = std.fmt.parseInt(i32, "abc", 10) catch 0;

// orelse: optional のデフォルト値
var opt: ?i32 = null;
const val = opt orelse -1;   // -1` }],
        },
        {
          id: 's8-unreachable', name: 'unreachable と @panic', level: 'basic',
          keywords: 'unreachable panic assert @panic safety',
          desc: '`unreachable` はそのコードパスが絶対に到達しないことをコンパイラに伝える。デバッグビルドでは実行時パニックに。`@panic` は強制パニック。',
          code: [{ lang: 'Zig', code: `const Status = enum { ok, err };

fn process(s: Status) i32 {
    return switch (s) {
        .ok  => 0,
        .err => -1,
        // else は不要（網羅的）
        // 将来のケースが追加されたらコンパイルエラー
    };
}

// 到達不可能なパス
const x: i32 = if (false) 1 else unreachable;` }],
        },
      ],
    },
    {
      id: 's9', num: 9, title: 'Optional型・nullチェック', level: 'basic',
      items: [
        {
          id: 's9-optional', name: 'Optional 型（?T）', level: 'basic',
          keywords: 'optional ?T null if payload capture orelse unwrap',
          desc: '`?T` は `null` または `T` を持つ型。`if (opt) |val|` でペイロードを取り出す。`.?` でアンラップ（null なら panic）。',
          code: [{ lang: 'Zig', code: `var opt: ?i32 = 42;

// if によるキャプチャ
if (opt) |val| {
    std.debug.print("{d}\\n", .{val});
}

// orelse
const v = opt orelse 0;

// .? でアンラップ（null なら panic）
const forced = opt.?;
_ = forced;` }],
        },
        {
          id: 's9-while-optional', name: 'while と optional', level: 'basic',
          keywords: 'while optional iterator pattern payload',
          desc: '`while (iter.next()) |item|` でイテレータパターン。optional が null になるまでループする慣用句。',
          code: [{ lang: 'Zig', code: `var iter = std.mem.tokenizeAny(u8, "a b c d", " ");
while (iter.next()) |token| {
    std.debug.print("{s}\\n", .{token});
}` }],
        },
        {
          id: 's9-method-opt', name: 'optional チェーン', level: 'basic',
          keywords: 'optional chaining null safety propagation',
          desc: 'Zig に `?.` はないが、`if` のネストやブロックラベルで同様のパターンを実現できる。',
          code: [{ lang: 'Zig', code: `// if によるネストチェック
const result: ?i32 = blk: {
    const a = getA() orelse break :blk null;
    const b = getB(a) orelse break :blk null;
    break :blk b * 2;
};` }],
        },
      ],
    },
    {
      id: 's10', num: 10, title: 'ジェネリクス・comptime 型', level: 'advanced',
      items: [
        {
          id: 's10-anytype', name: 'anytype', level: 'advanced',
          keywords: 'anytype generic duck typing comptime',
          desc: '`anytype` は型が推論される comptime 型パラメータ。Duck typing 的に動作し、必要なメソッド・フィールドがあれば型を問わない。',
          code: [{ lang: 'Zig', code: `fn printLen(val: anytype) void {
    std.debug.print("len={d}\\n", .{val.len});
}

printLen("hello");          // s.len = 5
printLen([_]i32{1,2,3});   // arr.len = 3` }],
        },
        {
          id: 's10-type-info', name: '@typeInfo と @TypeOf', level: 'advanced',
          keywords: '@typeInfo @TypeOf TypeInfo reflection',
          desc: '`@typeInfo(T)` でコンパイル時に型情報を取得（フィールド・関数・タグなど）。`@TypeOf(expr)` で式の型を取得。',
          code: [{ lang: 'Zig', code: `const info = @typeInfo(i32);
// info == .Int{ .bits = 32, .signedness = .signed }

const T = @TypeOf(42 + 1.0);   // f64（整数と浮動小数の共通型）

// 型によって分岐するコンパイル時処理
fn zigTypeSize(comptime T: type) usize {
    return @sizeOf(T);
}` }],
        },
        {
          id: 's10-builtins', name: '重要な組み込み関数（@builtins）', level: 'basic',
          keywords: '@import @as @intCast @floatCast @sizeOf @offsetOf',
          desc: 'Zig には `@` で始まる組み込み関数がある。`@as`（型変換）・`@intCast`（整数キャスト）・`@floatCast`・`@ptrCast`・`@sizeOf` など。',
          code: [{ lang: 'Zig', code: `const a: i32 = 42;
const b: i64 = @intCast(a);         // i32 → i64（安全）
const c: u32 = @bitCast(@as(i32, -1)); // ビット再解釈

const size = @sizeOf(i32);          // 4（バイト）
const align_ = @alignOf(i64);       // 8

const std = @import("std");          // モジュールインポート` }],
        },
      ],
    },
    {
      id: 's11', num: 11, title: 'C 互換・FFI', level: 'advanced',
      items: [
        {
          id: 's11-cimport', name: '@cImport と C ライブラリ', level: 'advanced',
          keywords: '@cImport @cInclude C interop FFI header',
          desc: '`@cImport` と `@cInclude` で C ヘッダーを直接インポートできる。C 関数や型をほぼそのまま使える。',
          code: [{ lang: 'Zig', code: `const c = @cImport({
    @cInclude("stdio.h");
    @cInclude("string.h");
});

pub fn main() void {
    _ = c.printf("Hello, %s!\\n", "World");
    const len = c.strlen("hello");
    _ = c.printf("len=%zu\\n", len);
}` }],
        },
        {
          id: 's11-export', name: 'export と C ABI', level: 'advanced',
          keywords: 'export extern callconv C ABI library shared',
          desc: '`export fn` で C から呼び出せる関数を公開。`extern fn` で外部（C）関数を宣言。Zig を共有ライブラリとしてビルドして C から使える。',
          code: [{ lang: 'Zig', code: `// Zig → C に公開
export fn add(a: c_int, b: c_int) c_int {
    return a + b;
}

// C → Zig から宣言
extern fn malloc(size: usize) ?*anyopaque;
extern fn free(ptr: ?*anyopaque) void;` }],
        },
        {
          id: 's11-translate', name: 'zig translate-c', level: 'advanced',
          keywords: 'translate-c header conversion C to Zig',
          desc: '`zig translate-c header.h` で C ヘッダーを Zig コードに変換できる。C ライブラリの Zig バインディングを自動生成する出発点として使う。',
          code: [{ lang: 'Zig', code: `# コマンド例
zig translate-c /usr/include/sqlite3.h > sqlite3.zig

# ビルドシステムで C ソースをコンパイルして Zig とリンク
# build.zig:
# exe.linkLibC();
# exe.addCSourceFile("lib.c", &[_][]const u8{"-std=c11"});` }],
        },
      ],
    },
    {
      id: 's12', num: 12, title: 'build.zig・ビルドシステム', level: 'basic',
      items: [
        {
          id: 's12-build', name: 'build.zig の基本', level: 'basic',
          keywords: 'build.zig build system exe lib test target',
          desc: 'Zig のビルドシステムは `build.zig`（Zig コード）で記述。実行ファイル・ライブラリ・テストをビルドできる。クロスコンパイルが簡単。',
          code: [{ lang: 'Zig', code: `// build.zig
const std = @import("std");

pub fn build(b: *std.Build) void {
    const exe = b.addExecutable(.{
        .name = "my-app",
        .root_source_file = b.path("src/main.zig"),
        .target = b.standardTargetOptions(.{}),
        .optimize = b.standardOptimizeOption(.{}),
    });
    b.installArtifact(exe);
}` }],
        },
        {
          id: 's12-test', name: 'テスト', level: 'basic',
          keywords: 'test expect testing.allocator expect equal',
          desc: '`test` ブロックでファイル内にテストを書ける。`zig test` で実行。`std.testing.expect`・`expectEqual`・`testing.allocator`（leak 検出）を使う。',
          code: [{ lang: 'Zig', code: `const std = @import("std");
const testing = std.testing;

fn add(a: i32, b: i32) i32 {
    return a + b;
}

test "add" {
    try testing.expectEqual(@as(i32, 3), add(1, 2));
    try testing.expectEqual(@as(i32, 0), add(-1, 1));
}

test "memory" {
    const alloc = testing.allocator;
    const buf = try alloc.alloc(u8, 10);
    defer alloc.free(buf);  // 解放を忘れると test fail
}` }],
        },
        {
          id: 's12-modules', name: 'モジュールシステム', level: 'basic',
          keywords: '@import module file namespace pub',
          desc: '`@import("file.zig")` でファイルをモジュールとしてインポート。`pub` でシンボルを公開。`@import("std")` で標準ライブラリ。',
          code: [{ lang: 'Zig', code: `// math.zig
pub fn square(x: i32) i32 { return x * x; }
pub const PI = 3.14159;

// main.zig
const math = @import("math.zig");
std.debug.print("{d}\\n", .{math.square(5)});  // 25
std.debug.print("{d}\\n", .{math.PI});` }],
        },
      ],
    },
    {
      id: 's13', num: 13, title: '標準ライブラリ', level: 'basic',
      items: [
        {
          id: 's13-std', name: 'std の主要モジュール', level: 'basic',
          keywords: 'std.mem std.fmt std.fs std.io std.math std.hash',
          desc: '`std.mem`（メモリ操作）・`std.fmt`（フォーマット）・`std.fs`（ファイルシステム）・`std.io`（入出力）・`std.math`・`std.hash`が主要モジュール。',
          code: [{ lang: 'Zig', code: `const std = @import("std");

// std.mem
std.mem.copy(u8, dst, src);
std.mem.eql(u8, "hello", "hello");  // true

// std.math
std.math.sqrt(2.0);    // 1.414...
std.math.maxInt(i32);  // 2147483647

// std.fs
const dir = try std.fs.cwd().openDir("src", .{});
defer dir.close();` }],
        },
        {
          id: 's13-hashmap', name: 'HashMap', level: 'basic',
          keywords: 'HashMap AutoHashMap StringHashMap put get',
          desc: '`std.AutoHashMap`・`std.StringHashMap` がよく使われるハッシュマップ。アロケータが必要。',
          code: [{ lang: 'Zig', code: `var map = std.StringHashMap(i32).init(allocator);
defer map.deinit();

try map.put("one", 1);
try map.put("two", 2);

if (map.get("one")) |val| {
    std.debug.print("one = {d}\\n", .{val});
}` }],
        },
        {
          id: 's13-io', name: 'stdin / stdout', level: 'basic',
          keywords: 'stdin stdout BufferedWriter print write',
          desc: '`std.io.getStdOut()` でスタンダード出力のライターを取得。`std.debug.print` はデバッグ用（stderr）。本番出力は `BufferedWriter` を使うと効率的。',
          code: [{ lang: 'Zig', code: `const stdout = std.io.getStdOut().writer();
try stdout.print("Hello, {s}!\\n", .{"World"});

// バッファリングされた出力
var bw = std.io.bufferedWriter(stdout);
const bww = bw.writer();
try bww.print("buffered: {d}\\n", .{42});
try bw.flush();` }],
        },
      ],
    },
    {
      id: 's14', num: 14, title: '並行処理', level: 'advanced',
      items: [
        {
          id: 's14-threads', name: 'スレッド', level: 'advanced',
          keywords: 'Thread spawn join Mutex atomic',
          desc: '`std.Thread` でスレッドを起動。`std.Thread.Mutex` で排他制御。`std.atomic` でアトミック操作。',
          code: [{ lang: 'Zig', code: `var mutex = std.Thread.Mutex{};
var counter: i32 = 0;

fn increment(_: void) void {
    var i: usize = 0;
    while (i < 1000) : (i += 1) {
        mutex.lock();
        defer mutex.unlock();
        counter += 1;
    }
}

const t1 = try std.Thread.spawn(.{}, increment, .{});
const t2 = try std.Thread.spawn(.{}, increment, .{});
t1.join();
t2.join();
// counter == 2000` }],
        },
        {
          id: 's14-async', name: 'async / await（実験的）', level: 'advanced',
          keywords: 'async await suspend resume async function',
          desc: 'Zig 0.12 では async/await は一時的に削除され再設計中。将来的には組み込みの非同期 I/O フレームワークが計画されている。現状は `std.event.Loop`（廃止予定）の代替を検討。',
          warn: 'Zig 0.12+ では async/await は削除された。再導入は予定されているが API は変更される可能性が高い。',
          code: [{ lang: 'Zig', code: `// 将来の設計（概念的）
// async/await の再実装は Zig 2.0 に向けて進行中
// 現状は libuv や libev などを FFI 経由で利用するか
// std.Thread + std.Thread.Pool でスレッドプールを使う` }],
        },
        {
          id: 's14-atomic', name: 'アトミック操作', level: 'advanced',
          keywords: 'atomic compare-exchange fetch-add ordering',
          desc: '`std.atomic` でアトミック操作。`compareAndSwap`・`fetchAdd`・`load`・`store` とメモリ順序（`SeqCst`・`Acquire`・`Release`）を指定できる。',
          code: [{ lang: 'Zig', code: `var counter = std.atomic.Value(i32).init(0);

// スレッドセーフなインクリメント
_ = counter.fetchAdd(1, .seq_cst);
const val = counter.load(.acquire);
std.debug.print("{d}\\n", .{val});` }],
        },
      ],
    },
    {
      id: 's15', num: 15, title: 'SIMD・低水準操作', level: 'advanced',
      items: [
        {
          id: 's15-vectors', name: 'SIMD ベクター型', level: 'advanced',
          keywords: 'SIMD vector @Vector auto-vectorization',
          desc: '`@Vector(N, T)` で SIMD ベクター型を定義。算術演算が自動的に SIMD 命令にコンパイルされる。',
          code: [{ lang: 'Zig', code: `const v1: @Vector(4, f32) = .{ 1.0, 2.0, 3.0, 4.0 };
const v2: @Vector(4, f32) = .{ 5.0, 6.0, 7.0, 8.0 };
const sum = v1 + v2;   // SIMD 加算: [6,8,10,12]

const dot = @reduce(.Add, v1 * v2);   // 内積: 70.0` }],
        },
        {
          id: 's15-inline-asm', name: 'インラインアセンブリ', level: 'advanced',
          keywords: 'asm inline assembly volatile',
          desc: '`asm volatile` でインラインアセンブリを埋め込める。レジスタ制約も指定可能。超低水準の最適化や特殊命令に使う。',
          code: [{ lang: 'Zig', code: `fn rdtsc() u64 {
    var lo: u32 = undefined;
    var hi: u32 = undefined;
    asm volatile ("rdtsc" : [lo] "={eax}" (lo), [hi] "={edx}" (hi));
    return (@as(u64, hi) << 32) | lo;
}` }],
        },
        {
          id: 's15-linker', name: 'リンカースクリプト・組み込み', level: 'advanced',
          keywords: 'linker script embedded bare metal no stdlib',
          desc: 'Zig は libc なしでビルドできる（`exe.linkLibC()` なし）。`-freestanding` ターゲット・カスタムリンカースクリプトで組み込みシステム開発に対応。',
          code: [{ lang: 'Zig', code: `// build.zig で組み込みターゲット
const target = b.standardTargetOptions(.{
    .default_target = .{
        .cpu_arch = .arm,
        .os_tag   = .freestanding,
        .abi      = .eabi,
    },
});
exe.setLinkerScriptPath(b.path("linker.ld"));` }],
        },
      ],
    },
    {
      id: 's16', num: 16, title: 'エコシステム・ツール', level: 'basic',
      items: [
        {
          id: 's16-tools', name: 'Zig ツールチェーン', level: 'basic',
          keywords: 'zig build run test fmt cc cross-compile',
          desc: '`zig` コマンドは多機能。コンパイラ・フォーマッタ・C/C++ コンパイラの代替（`zig cc`・`zig c++`）・クロスコンパイルが1つのバイナリで完結。',
          code: [{ lang: 'Zig', code: `zig init           # 新規プロジェクト
zig build run      # ビルド + 実行
zig test src/main.zig  # テスト
zig fmt src/       # フォーマット

# クロスコンパイル（例: Linux arm64 向け）
zig build -Dtarget=aarch64-linux-musl

# C プロジェクトのビルド代替
zig cc -o hello hello.c` }],
        },
        {
          id: 's16-package', name: 'zig fetch / パッケージ管理', level: 'basic',
          keywords: 'package manager build.zig.zon zig fetch',
          desc: 'Zig 0.11+ では `build.zig.zon` でパッケージを管理。`zig fetch --save` でパッケージを追加。まだエコシステムは成熟途上。',
          code: [{ lang: 'Zig', code: `// build.zig.zon
.{
    .name = "my-app",
    .version = "0.1.0",
    .dependencies = .{
        .zig_clap = .{
            .url = "https://github.com/Hejsil/zig-clap/archive/refs/tags/0.9.1.tar.gz",
            .hash = "1234...",
        },
    },
}` }],
        },
        {
          id: 's16-zls', name: 'ZLS（Language Server）', level: 'basic',
          keywords: 'ZLS language server LSP IDE VS Code',
          desc: 'ZLS（Zig Language Server）が主要な LSP 実装。VS Code・Neovim・Emacs 等で補完・定義ジャンプ・型情報表示が使える。',
          code: [{ lang: 'Zig', code: `# ZLS のビルド・インストール
git clone https://github.com/zigtools/zls
cd zls
zig build -Doptimize=ReleaseSafe
# 生成バイナリを PATH に追加

# VS Code: Zig Language Server 拡張をインストール` }],
        },
        {
          id: 's16-philosophy', name: 'Zig の設計思想', level: 'basic',
          keywords: 'design philosophy safety comptime no hidden allocation',
          desc: 'Zig の哲学: 「隠れた制御フローなし」「隠れたメモリ割り当てなし」「未定義動作を削減」「コンパイル時計算で抽象を実現」。C の後継を目指す。',
          code: [{ lang: 'Zig', code: `// Zig の設計原則の例
// 1. 隠れた割り当てなし: アロケータは明示的
// 2. エラーは型システムで強制（! で示す）
// 3. defer で確実なクリーンアップ
// 4. comptime で実行時コストゼロの抽象
// 5. ビルトイン @overflow チェックで整数安全性` }],
        },
      ],
    },
  ],
};

export default data;
