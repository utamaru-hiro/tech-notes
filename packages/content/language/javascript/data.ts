import type { LanguageGuide } from '../../types';

const data: LanguageGuide = {
  lang: 'JavaScript',
  langSlug: 'javascript',
  version: 'ES2024',
  lead: `他言語の経験者が 2〜3 時間でざっと読み通せるリファレンスです。型強制・プロトタイプ・イベントループなど JS 固有の動作と落とし穴を重点的に解説します。`,
  accent: '#f7df1e',
  accent2: '#fffde0',
  bgGradientTop: '#fefef0',
  bgRadialLeft: 'rgba(247,223,30,0.18)',
  bgRadialRight: 'rgba(50,50,50,0.08)',
  badgeGradient: 'linear-gradient(135deg, #b8a000, #f7df1e)',
  heroEmoji: '🟨',
  navGroups: [
    { label: '基礎', sections: ['s1', 's2', 's3', 's4', 's5'] },
    { label: 'オブジェクト指向', sections: ['s6', 's7', 's8'] },
    { label: '非同期', sections: ['s9', 's10'] },
    { label: '実用', sections: ['s11', 's12', 's13'] },
    { label: '応用', sections: ['s14', 's15', 's16'] },
  ],
  sections: [
    // ─────────────────────────────────────────
    // s1: 変数・型・型強制
    // ─────────────────────────────────────────
    {
      id: 's1',
      num: 1,
      title: '変数・型・型強制',
      level: 'basic',
      items: [
        {
          id: 's1-var-let-const',
          name: 'var / let / const',
          level: 'basic',
          keywords: 'var let const 変数 スコープ 巻き上げ hoisting ブロックスコープ 関数スコープ',
          desc: '`var` は関数スコープで巻き上げ（hoisting）が発生し、宣言前に `undefined` として参照できてしまいます。`let` と `const` はブロックスコープで、宣言前に参照すると ReferenceError（TDZ: Temporal Dead Zone）が発生します。`const` は再代入不可ですが、オブジェクトや配列の内容は変更できます。現代の JS では `var` を使う理由はほぼなく、`const` を基本とし必要なときだけ `let` を使うのが推奨スタイルです。',
          code: [
            {
              lang: 'JavaScript',
              code: `// var: 関数スコープ・巻き上げあり
console.log(x); // undefined（エラーにならない）
var x = 10;

// let: ブロックスコープ・TDZ
{
  let y = 20;
  console.log(y); // 20
}
// console.log(y); // ReferenceError

// const: 再代入不可
const obj = { a: 1 };
obj.a = 2;      // OK（内容変更は可能）
// obj = {};    // TypeError（再代入は不可）

// var の巻き上げの罠
for (var i = 0; i < 3; i++) {}
console.log(i); // 3（ループ外でも参照できてしまう）

for (let j = 0; j < 3; j++) {}
// console.log(j); // ReferenceError`,
            },
          ],
          warn: '`var` のループカウンタは非同期コールバック内で意図しない値を参照する問題が起きやすい。`let` または即時実行関数でスコープを閉じること。',
        },
        {
          id: 's1-primitives',
          name: 'プリミティブ型',
          level: 'basic',
          keywords: 'string number boolean null undefined symbol bigint プリミティブ型 primitive',
          desc: 'JavaScript には 7 種類のプリミティブ型があります：`string`・`number`・`boolean`・`null`・`undefined`・`symbol`（ES2015）・`bigint`（ES2020）。プリミティブ値は不変であり、変数に代入するときは値のコピーが渡されます。`symbol` はユニークなキーを作るために使い、`bigint` は `Number.MAX_SAFE_INTEGER` を超える整数を正確に扱います。',
          code: [
            {
              lang: 'JavaScript',
              code: `const str   = "hello";          // string
const num   = 42;               // number
const big   = 9007199254740993n; // bigint
const bool  = true;             // boolean
const empty = null;             // null
let   undef;                    // undefined
const sym   = Symbol('id');     // symbol（毎回ユニーク）

console.log(typeof str);   // "string"
console.log(typeof num);   // "number"
console.log(typeof big);   // "bigint"
console.log(typeof sym);   // "symbol"
console.log(typeof undef); // "undefined"

// symbol は同名でも別物
const s1 = Symbol('id');
const s2 = Symbol('id');
console.log(s1 === s2); // false`,
            },
          ],
        },
        {
          id: 's1-typeof',
          name: 'typeof 演算子',
          level: 'basic',
          keywords: 'typeof 型チェック type check null object 罠',
          desc: '`typeof` は値の型を文字列で返しますが、歴史的バグとして `typeof null === "object"` が残っています。関数は `"function"` を返しますが、その他のオブジェクト（配列・日付など）はすべて `"object"` です。`null` チェックは `=== null` で行い、配列チェックには `Array.isArray()` を使います。',
          code: [
            {
              lang: 'JavaScript',
              code: `console.log(typeof "hello");    // "string"
console.log(typeof 42);         // "number"
console.log(typeof true);       // "boolean"
console.log(typeof undefined);  // "undefined"
console.log(typeof Symbol());   // "symbol"
console.log(typeof 42n);        // "bigint"
console.log(typeof function(){}); // "function"
console.log(typeof {});         // "object"
console.log(typeof []);         // "object"（配列も object）
console.log(typeof null);       // "object" ← 歴史的バグ！

// null を正しくチェックする方法
const val = null;
console.log(val === null);      // true

// 配列を正しく判定
console.log(Array.isArray([])); // true`,
            },
          ],
          warn: '`typeof null === "object"` は ECMAScript 仕様に残る有名なバグ。null チェックは必ず `=== null` を使うこと。',
        },
        {
          id: 's1-coercion',
          name: '暗黙の型強制',
          level: 'basic',
          keywords: '型強制 type coercion == === 等値 厳密等値 加算 + 演算子 implicit conversion',
          desc: 'JavaScript は `==` 比較や `+` 演算子などで暗黙の型変換を行います。`==` は型が異なる場合に変換ルール（Abstract Equality Comparison）を適用するため、予期しない結果になりがちです。`===` は型変換なしの厳密比較です。`+` 演算子は片方が文字列の場合、数値も文字列に変換して連結します。',
          code: [
            {
              lang: 'JavaScript',
              code: `// == は型を変換して比較
console.log(0 == false);   // true（false → 0）
console.log("" == false);  // true
console.log(null == undefined); // true（特例）
console.log(null == 0);    // false（null は 0/false と等しくない）

// === は型変換なし
console.log(0 === false);  // false
console.log("1" === 1);    // false

// + 演算子の型強制
console.log(1 + "2");      // "12"（数値→文字列）
console.log("3" - 1);      // 2（文字列→数値）
console.log(true + true);  // 2（boolean→数値）

// 明示的変換
console.log(Number("42")); // 42
console.log(String(42));   // "42"
console.log(Boolean(0));   // false`,
            },
          ],
          warn: '`==` を使うべき場面はほとんどない。コードベース全体で `===` を使う方針を徹底し、ESLint の `eqeqeq` ルールで強制することを推奨。',
        },
      ],
    },

    // ─────────────────────────────────────────
    // s2: 制御フロー
    // ─────────────────────────────────────────
    {
      id: 's2',
      num: 2,
      title: '制御フロー',
      level: 'basic',
      items: [
        {
          id: 's2-if-falsy',
          name: 'if/else と falsy 値',
          level: 'basic',
          keywords: 'if else falsy truthy 条件分岐 0 空文字 null undefined NaN false',
          desc: '`if` の条件式は boolean に変換されます。`false`・`0`・`""`・`null`・`undefined`・`NaN` の 6 つが falsy 値であり、それ以外はすべて truthy です。`0n`（BigInt のゼロ）も falsy です。空配列 `[]` や空オブジェクト `{}` は truthy であることに注意が必要です。',
          code: [
            {
              lang: 'JavaScript',
              code: `// falsy 値のリスト
const falsyValues = [false, 0, 0n, "", null, undefined, NaN];
falsyValues.forEach(v => console.log(!!v)); // すべて false

// 空配列・空オブジェクトは truthy
if ([]) console.log("空配列は truthy");   // 出力される
if ({}) console.log("空オブジェクトは truthy"); // 出力される

// よくある誤り
const count = 0;
if (count) {
  console.log("ここは実行されない");
} else {
  console.log("0 は falsy"); // これが実行される
}

// null/undefined の存在チェックには != null を使う
function greet(name) {
  if (name != null) {   // null と undefined 両方を除外
    console.log("Hello, " + name);
  }
}`,
            },
          ],
          warn: '数値 `0` や空文字 `""` を falsy として扱う if 文は、有効な値を見落とす可能性がある。意図が明確でない場合は `!== null && !== undefined` で明示的にチェックすること。',
        },
        {
          id: 's2-loops',
          name: 'for / while / for...in / for...of',
          level: 'basic',
          keywords: 'for while for in for of ループ 繰り返し イテレーション 配列 オブジェクト',
          desc: '`for...in` はオブジェクトの列挙可能プロパティ（継承を含む）を文字列キーで反復し、`for...of` は iterable（配列・文字列・Map・Set など）の値を反復します。配列の反復には `for...of` または `forEach` を使い、`for...in` は使わないのが鉄則です。',
          code: [
            {
              lang: 'JavaScript',
              code: `// 通常の for
for (let i = 0; i < 3; i++) {
  console.log(i); // 0, 1, 2
}

// for...of（iterable の値）
const arr = ['a', 'b', 'c'];
for (const item of arr) {
  console.log(item); // a, b, c
}

// for...in（オブジェクトのキー）
const obj = { x: 1, y: 2 };
for (const key in obj) {
  console.log(key, obj[key]); // x 1, y 2
}

// for...in を配列に使うと危険
Array.prototype.custom = () => {};
for (const i in arr) {
  console.log(i); // "0", "1", "2", "custom" ← 継承プロパティも出る
}
delete Array.prototype.custom;

// while
let n = 3;
while (n > 0) {
  console.log(n--); // 3, 2, 1
}`,
            },
          ],
          warn: '`for...in` を配列に使うとプロトタイプチェーン上のプロパティも列挙されることがある。配列には必ず `for...of` か `forEach` を使うこと。',
        },
        {
          id: 's2-switch',
          name: 'switch と fall-through',
          level: 'basic',
          keywords: 'switch case break fall-through 厳密等値 フォールスルー',
          desc: '`switch` は `===`（厳密等値）で比較します。各 `case` に `break` がないと次の `case` に処理が流れ込む fall-through が発生します。`default` はどの `case` にも一致しない場合に実行されますが、末尾に置くのが慣習です。',
          code: [
            {
              lang: 'JavaScript',
              code: `const status = 2;

switch (status) {
  case 1:
    console.log("active");
    break;
  case 2:
    console.log("pending"); // ここが実行される
    break;
  case 3:
    console.log("closed");
    break;
  default:
    console.log("unknown");
}

// fall-through の意図的な使用（複数 case で同じ処理）
const day = "Saturday";
switch (day) {
  case "Saturday":
  case "Sunday":
    console.log("週末"); // Saturday でも Sunday でも実行
    break;
  default:
    console.log("平日");
}

// 型変換なし（=== 比較）
switch ("1") {
  case 1:
    console.log("数値 1"); // 実行されない
    break;
  case "1":
    console.log("文字列 '1'"); // 実行される
    break;
}`,
            },
          ],
          warn: '`break` の書き忘れによる fall-through は発見しにくいバグの温床。ESLint の `no-fallthrough` ルールを有効にすることを推奨。',
        },
        {
          id: 's2-optional-nullish',
          name: 'オプショナルチェーン ?. と ヌル合体演算子 ??',
          level: 'basic',
          keywords: 'optional chaining オプショナルチェーン nullish coalescing ヌル合体 ?. ?? null undefined',
          desc: '`?.` は左辺が `null` または `undefined` のときに評価を短絡して `undefined` を返します。ネストされたプロパティへの安全なアクセスに使います。`??` は左辺が `null` または `undefined` のときだけ右辺を返し、`||` と異なり `0` や `""` は通り抜けます。',
          code: [
            {
              lang: 'JavaScript',
              code: `const user = {
  profile: {
    address: null,
  },
};

// オプショナルチェーン
console.log(user.profile?.address?.city); // undefined（エラーにならない）
console.log(user.notExist?.name);         // undefined

// メソッド呼び出しにも使える
const arr = null;
console.log(arr?.map(x => x * 2));        // undefined

// ヌル合体演算子 ??
const config = { timeout: 0, label: "" };
console.log(config.timeout ?? 5000);  // 0（0 は nullish でないのでそのまま）
console.log(config.label   ?? "無名"); // ""（空文字も nullish でない）
console.log(config.missing ?? "デフォ"); // "デフォ"

// || との違い
console.log(config.timeout || 5000);  // 5000（0 は falsy なので右辺が返る）

// ??= 代入演算子（ES2021）
let value = null;
value ??= "初期値";
console.log(value); // "初期値"`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────
    // s3: 関数
    // ─────────────────────────────────────────
    {
      id: 's3',
      num: 3,
      title: '関数',
      level: 'basic',
      items: [
        {
          id: 's3-function-types',
          name: '関数宣言 / 関数式 / アロー関数',
          level: 'basic',
          keywords: '関数宣言 function declaration 関数式 function expression アロー関数 arrow function this 巻き上げ',
          desc: '関数宣言は巻き上げられ、定義前に呼び出せます。関数式と `const` への代入は巻き上げされません。アロー関数は自身の `this` を持たず、外側のスコープの `this` を継承します。これがコールバックやクラスメソッドでの `this` 問題を解消します。',
          code: [
            {
              lang: 'JavaScript',
              code: `// 関数宣言（巻き上げあり）
console.log(add(1, 2)); // 3（定義前でも呼べる）
function add(a, b) { return a + b; }

// 関数式（巻き上げなし）
// console.log(mul(2, 3)); // TypeError
const mul = function(a, b) { return a * b; };

// アロー関数
const square = x => x * x;
const greet  = (name) => \`Hello, \${name}!\`;
const noop   = () => {};

// this の違い
function Timer() {
  this.count = 0;
  // 通常関数: this は undefined（strict mode）か グローバル
  setInterval(function() {
    // this.count++; // ← this が Timer インスタンスでない
  }, 1000);

  // アロー関数: 外側の this（Timer インスタンス）を継承
  setInterval(() => {
    this.count++; // ← 正しく Timer インスタンスを参照
  }, 1000);
}`,
            },
          ],
          warn: 'アロー関数は `this` を持たないためオブジェクトリテラルのメソッドには使わないこと。`obj.method = () => {}` は `this` が `obj` にならない。',
        },
        {
          id: 's3-params',
          name: 'デフォルト引数・残余引数・スプレッド構文',
          level: 'basic',
          keywords: 'デフォルト引数 default parameter 残余引数 rest parameter スプレッド spread arguments',
          desc: 'デフォルト引数は引数が `undefined` のときに使われます。残余引数 `...args` は可変長引数を配列で受け取ります。スプレッド構文 `...arr` は配列や iterable を展開します。古い `arguments` オブジェクトはアロー関数では使えないため、残余引数を使うのが現代的です。',
          code: [
            {
              lang: 'JavaScript',
              code: `// デフォルト引数
function greet(name = "World") {
  return \`Hello, \${name}!\`;
}
console.log(greet());       // "Hello, World!"
console.log(greet("Alice")); // "Hello, Alice!"

// 残余引数（最後の引数のみ使用可能）
function sum(...nums) {
  return nums.reduce((acc, n) => acc + n, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// スプレッド構文（配列の展開）
const a = [1, 2, 3];
const b = [4, 5, 6];
const merged = [...a, ...b];
console.log(merged); // [1, 2, 3, 4, 5, 6]

// 関数呼び出しへの展開
console.log(Math.max(...a)); // 3

// オブジェクトのスプレッド
const base = { x: 1, y: 2 };
const ext  = { ...base, z: 3 };
console.log(ext); // { x: 1, y: 2, z: 3 }`,
            },
          ],
        },
        {
          id: 's3-iife',
          name: '即時実行関数（IIFE）',
          level: 'basic',
          keywords: 'IIFE 即時実行関数 immediately invoked function expression スコープ汚染 モジュールパターン',
          desc: 'IIFE（Immediately Invoked Function Expression）は定義と同時に実行される関数式です。変数をグローバルスコープに漏らさないためのスコープ隔離に使われていました。ES Modules が普及した現代では用途は減りましたが、初期化処理や非同期 IIFE でまだ使われます。',
          code: [
            {
              lang: 'JavaScript',
              code: `// 基本形
(function() {
  const secret = "内部変数";
  console.log(secret); // "内部変数"
})();
// console.log(secret); // ReferenceError

// アロー関数での IIFE
(() => {
  console.log("アロー IIFE");
})();

// 引数を渡す
(function(name) {
  console.log(\`Hello, \${name}!\`);
})("World");

// 非同期 IIFE（トップレベル await が使えない環境）
(async () => {
  const result = await Promise.resolve(42);
  console.log(result); // 42
})();`,
            },
          ],
        },
        {
          id: 's3-closure',
          name: 'クロージャ',
          level: 'basic',
          keywords: 'クロージャ closure スコープ キャプチャ 変数 レキシカルスコープ lexical scope',
          desc: 'クロージャとは、関数が自身が定義されたスコープの変数を「閉じ込めて」参照し続ける仕組みです。関数が外部スコープの変数をキャプチャし、その関数が返された後もそのスコープは生き続けます。カウンタ・プライベート状態・部分適用などに活用されます。',
          code: [
            {
              lang: 'JavaScript',
              code: `// カウンタ（プライベート状態）
function makeCounter() {
  let count = 0; // 外部からアクセスできない
  return {
    increment() { count++; },
    decrement() { count--; },
    value()     { return count; },
  };
}
const counter = makeCounter();
counter.increment();
counter.increment();
console.log(counter.value()); // 2

// 部分適用（partial application）
function multiply(x) {
  return function(y) {
    return x * y; // x をキャプチャ
  };
}
const double = multiply(2);
const triple = multiply(3);
console.log(double(5)); // 10
console.log(triple(5)); // 15

// var ループのクロージャ問題
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 3, 3, 3（全て同じ i）
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 0); // 0, 1, 2（let はブロックごと）
}`,
            },
          ],
          warn: '`var` ループ内の非同期コールバックはクロージャが同一の `i` を参照するため、全て同じ値になる。`let` を使うか IIFE で各イテレーションのスコープを作ること。',
        },
      ],
    },

    // ─────────────────────────────────────────
    // s4: 配列
    // ─────────────────────────────────────────
    {
      id: 's4',
      num: 4,
      title: '配列',
      level: 'basic',
      items: [
        {
          id: 's4-create',
          name: 'リテラル・Array.from・Array.of',
          level: 'basic',
          keywords: '配列 array リテラル Array.from Array.of 生成 作成 length',
          desc: '配列リテラル `[]` が最も一般的な生成方法です。`Array.from` は iterable やオブジェクトから配列を生成し、マッピング関数も受け取れます。`Array.of` は引数を要素とする配列を作ります（`new Array(3)` が長さ 3 の空配列を作るのと対比）。',
          code: [
            {
              lang: 'JavaScript',
              code: `// リテラル
const fruits = ['apple', 'banana', 'cherry'];

// new Array の罠
const a = new Array(3);
console.log(a);        // [ <3 empty items> ]
console.log(a.length); // 3

// Array.of（引数がそのまま要素になる）
const b = Array.of(3);
console.log(b); // [3]

// Array.from（iterable から生成）
const chars = Array.from("hello");
console.log(chars); // ['h', 'e', 'l', 'l', 'o']

// Array.from + map
const squares = Array.from({ length: 5 }, (_, i) => i ** 2);
console.log(squares); // [0, 1, 4, 9, 16]

// Set から配列へ
const unique = Array.from(new Set([1, 2, 2, 3, 3]));
console.log(unique); // [1, 2, 3]`,
            },
          ],
        },
        {
          id: 's4-iteration',
          name: 'map / filter / reduce / find / some / every',
          level: 'basic',
          keywords: 'map filter reduce find some every forEach 高階関数 配列操作 イテレーション',
          desc: '`map` は各要素を変換した新しい配列を返します。`filter` は条件を満たす要素を新しい配列として返します。`reduce` は配列を単一値に集約します。`find` は条件を満たす最初の要素を返し、`some`/`every` はブール値を返します。これらはすべて元の配列を変更しません。',
          code: [
            {
              lang: 'JavaScript',
              code: `const nums = [1, 2, 3, 4, 5];

// map: 各要素を変換
const doubled = nums.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter: 条件を満たす要素を抽出
const evens = nums.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]

// reduce: 集約（初期値を必ず渡すこと）
const total = nums.reduce((acc, n) => acc + n, 0);
console.log(total); // 15

// find: 最初にマッチする要素（なければ undefined）
const found = nums.find(n => n > 3);
console.log(found); // 4

// some / every
console.log(nums.some(n => n > 4));  // true（5 が存在する）
console.log(nums.every(n => n > 0)); // true（全て正）
console.log(nums.every(n => n > 2)); // false

// 連鎖
const result = nums
  .filter(n => n % 2 !== 0)
  .map(n => n ** 2);
console.log(result); // [1, 9, 25]`,
            },
          ],
          warn: '`reduce` に初期値を省略すると空配列でエラーになる。常に第 2 引数に初期値を指定すること。',
        },
        {
          id: 's4-flat',
          name: 'flat / flatMap',
          level: 'basic',
          keywords: 'flat flatMap 平坦化 ネスト 配列 flatten',
          desc: '`flat(depth)` はネストした配列を指定の深さまで平坦化します。`flatMap` は `map` と `flat(1)` を組み合わせたもので、各要素を配列に変換して結合するパターンに有用です。`Infinity` を渡すと完全に平坦化します。',
          code: [
            {
              lang: 'JavaScript',
              code: `// flat（デフォルトは深さ 1）
const nested = [1, [2, 3], [4, [5, 6]]];
console.log(nested.flat());    // [1, 2, 3, 4, [5, 6]]
console.log(nested.flat(2));   // [1, 2, 3, 4, 5, 6]
console.log(nested.flat(Infinity)); // [1, 2, 3, 4, 5, 6]

// flatMap（map + flat(1)）
const sentences = ["hello world", "foo bar"];
const words = sentences.flatMap(s => s.split(" "));
console.log(words); // ['hello', 'world', 'foo', 'bar']

// flatMap で要素を増やす・削除する
const nums = [1, 2, 3, 4];
const expanded = nums.flatMap(n => n % 2 === 0 ? [n, n * 10] : []);
console.log(expanded); // [2, 20, 4, 40]`,
            },
          ],
        },
        {
          id: 's4-destructuring',
          name: '分割代入・スプレッド',
          level: 'basic',
          keywords: '分割代入 destructuring スプレッド spread 配列 swap 残余',
          desc: '配列の分割代入は位置ベースで変数に値を割り当てます。スキップしたい要素はカンマで飛ばせます。スプレッド構文で残りの要素を配列として取得できます。変数の交換（swap）もシンプルに書けます。',
          code: [
            {
              lang: 'JavaScript',
              code: `const [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1 2 3

// スキップ
const [first, , third] = [10, 20, 30];
console.log(first, third); // 10 30

// デフォルト値
const [x = 0, y = 0] = [5];
console.log(x, y); // 5 0

// 残余要素
const [head, ...tail] = [1, 2, 3, 4];
console.log(head); // 1
console.log(tail); // [2, 3, 4]

// 変数の交換
let p = 1, q = 2;
[p, q] = [q, p];
console.log(p, q); // 2 1

// 関数の戻り値を分割代入
function minMax(arr) {
  return [Math.min(...arr), Math.max(...arr)];
}
const [min, max] = minMax([3, 1, 4, 1, 5]);
console.log(min, max); // 1 5`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────
    // s5: オブジェクト
    // ─────────────────────────────────────────
    {
      id: 's5',
      num: 5,
      title: 'オブジェクト',
      level: 'basic',
      items: [
        {
          id: 's5-literal',
          name: 'リテラル記法・プロパティアクセス',
          level: 'basic',
          keywords: 'オブジェクト object リテラル プロパティ アクセス ドット記法 ブラケット記法',
          desc: 'オブジェクトリテラルはキーと値のペアで構成されます。プロパティへのアクセスはドット記法（`obj.key`）またはブラケット記法（`obj["key"]`）で行います。ブラケット記法は動的なキーや識別子として無効な文字を含むキーに必要です。',
          code: [
            {
              lang: 'JavaScript',
              code: `const person = {
  name: "Alice",
  age: 30,
  "home-city": "Tokyo", // ハイフン含む → ブラケット記法が必要
};

// ドット記法
console.log(person.name); // "Alice"

// ブラケット記法（動的キー）
const key = "age";
console.log(person[key]);       // 30
console.log(person["home-city"]); // "Tokyo"

// 存在しないプロパティは undefined
console.log(person.email); // undefined

// プロパティの追加・変更・削除
person.email = "alice@example.com";
person.age = 31;
delete person["home-city"];
console.log(person); // { name: 'Alice', age: 31, email: 'alice@example.com' }`,
            },
          ],
        },
        {
          id: 's5-computed-shorthand',
          name: '計算プロパティ名・省略記法',
          level: 'basic',
          keywords: '計算プロパティ computed property 省略記法 shorthand メソッド定義',
          desc: '省略記法（shorthand）は変数名とプロパティ名が同じ場合に `{ name }` と書けます。計算プロパティ名は `[expression]` で動的なキーを指定できます。メソッド定義の省略記法では `function` キーワードを省略できます。',
          code: [
            {
              lang: 'JavaScript',
              code: `const name = "Alice";
const age  = 30;

// 省略記法（shorthand property）
const person = { name, age };
console.log(person); // { name: 'Alice', age: 30 }

// 計算プロパティ名
const prefix = "user";
const user = {
  [\`\${prefix}Name\`]: "Bob",
  [\`\${prefix}Age\`]: 25,
};
console.log(user.userName); // "Bob"

// メソッドの省略記法
const calculator = {
  value: 0,
  add(n) { this.value += n; return this; }, // function 不要
  reset() { this.value = 0; return this; },
};
calculator.add(5).add(3);
console.log(calculator.value); // 8

// getter / setter
const temp = {
  _celsius: 0,
  get fahrenheit() { return this._celsius * 9 / 5 + 32; },
  set fahrenheit(f) { this._celsius = (f - 32) * 5 / 9; },
};
temp.fahrenheit = 212;
console.log(temp._celsius); // 100`,
            },
          ],
        },
        {
          id: 's5-object-methods',
          name: 'Object.keys / values / entries / assign / freeze',
          level: 'basic',
          keywords: 'Object.keys Object.values Object.entries Object.assign Object.freeze 列挙 コピー 凍結',
          desc: '`Object.keys/values/entries` は列挙可能な自身のプロパティを配列で返します。`Object.assign` は浅いコピーとマージに使います（深いコピーには `structuredClone` を使う）。`Object.freeze` はオブジェクトを凍結し、プロパティの変更・追加・削除を防ぎます（ただし浅い凍結）。',
          code: [
            {
              lang: 'JavaScript',
              code: `const obj = { a: 1, b: 2, c: 3 };

console.log(Object.keys(obj));    // ['a', 'b', 'c']
console.log(Object.values(obj));  // [1, 2, 3]
console.log(Object.entries(obj)); // [['a',1], ['b',2], ['c',3]]

// entries からオブジェクトに戻す
const doubled = Object.fromEntries(
  Object.entries(obj).map(([k, v]) => [k, v * 2])
);
console.log(doubled); // { a: 2, b: 4, c: 6 }

// Object.assign（浅いコピー・マージ）
const defaults = { color: "blue", size: "M" };
const overrides = { size: "L", weight: "light" };
const config = Object.assign({}, defaults, overrides);
console.log(config); // { color: 'blue', size: 'L', weight: 'light' }

// Object.freeze（浅い凍結）
const frozen = Object.freeze({ x: 1, nested: { y: 2 } });
frozen.x = 99;           // 無視（strict mode では TypeError）
frozen.nested.y = 99;    // 深い部分は変更可能！
console.log(frozen.x);   // 1
console.log(frozen.nested.y); // 99`,
            },
          ],
          warn: '`Object.freeze` は浅い凍結。ネストしたオブジェクトは凍結されない。完全なイミュータビリティには再帰的に freeze するか `structuredClone` + freeze の組み合わせが必要。',
        },
        {
          id: 's5-obj-destructuring',
          name: 'オブジェクトの分割代入・スプレッド',
          level: 'basic',
          keywords: 'オブジェクト 分割代入 destructuring スプレッド spread 別名 rename デフォルト値',
          desc: 'オブジェクトの分割代入はプロパティ名で変数に値を割り当てます。別名（rename）・デフォルト値・ネストした分割代入が使えます。スプレッドで残りのプロパティをオブジェクトとして取得できます。',
          code: [
            {
              lang: 'JavaScript',
              code: `const user = { name: "Alice", age: 30, city: "Tokyo" };

// 基本
const { name, age } = user;
console.log(name, age); // "Alice" 30

// 別名（rename）
const { name: userName } = user;
console.log(userName); // "Alice"

// デフォルト値
const { name: n, email = "none@example.com" } = user;
console.log(n, email); // "Alice" "none@example.com"

// 残余プロパティ
const { city, ...rest } = user;
console.log(city); // "Tokyo"
console.log(rest); // { name: 'Alice', age: 30 }

// ネストした分割代入
const { address: { zip } = {} } = { address: { zip: "100-0001" } };
console.log(zip); // "100-0001"

// 関数引数での分割代入
function display({ name, age = 0 }) {
  console.log(\`\${name}: \${age}\`);
}
display(user); // "Alice: 30"`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────
    // s6: プロトタイプと継承
    // ─────────────────────────────────────────
    {
      id: 's6',
      num: 6,
      title: 'プロトタイプと継承',
      level: 'basic',
      items: [
        {
          id: 's6-prototype-chain',
          name: '[[Prototype]] チェーン',
          level: 'basic',
          keywords: 'プロトタイプ prototype chain __proto__ Object.getPrototypeOf 継承 プロトタイプチェーン',
          desc: 'すべての JS オブジェクトは `[[Prototype]]` という内部スロットを持ち、プロパティが見つからない場合はプロトタイプチェーンを遡って検索されます。`Object.getPrototypeOf` でプロトタイプを取得できます。`__proto__` はレガシーなアクセサで、現代コードでは使わないことを推奨します。',
          code: [
            {
              lang: 'JavaScript',
              code: `const animal = {
  speak() { return \`\${this.name} speaks.\`; },
};

const dog = Object.create(animal);
dog.name = "Rex";

console.log(dog.speak()); // "Rex speaks."（animal から継承）
console.log(Object.getPrototypeOf(dog) === animal); // true

// プロトタイプチェーンの探索
console.log(dog.hasOwnProperty("name"));   // true（自身のプロパティ）
console.log(dog.hasOwnProperty("speak"));  // false（継承）

// 全プロトタイプチェーンを表示
let proto = dog;
while (proto !== null) {
  console.log(proto);
  proto = Object.getPrototypeOf(proto);
}
// dog → animal → Object.prototype → null`,
            },
          ],
        },
        {
          id: 's6-object-create',
          name: 'Object.create',
          level: 'basic',
          keywords: 'Object.create プロトタイプ 継承 null プロトタイプなし pure dictionary',
          desc: '`Object.create(proto)` は `proto` をプロトタイプとする新しいオブジェクトを作成します。`Object.create(null)` は `Object.prototype` を持たない純粋な辞書オブジェクトを作れます。これは `toString` などの継承メソッドが干渉しないキャッシュや辞書用途に適しています。',
          code: [
            {
              lang: 'JavaScript',
              code: `// 継承チェーンを手動で構築
const vehicle = {
  type: "vehicle",
  describe() { return \`I am a \${this.type}\`; },
};
const car = Object.create(vehicle);
car.type = "car";
console.log(car.describe()); // "I am a car"

// Object.create(null): プロトタイプなし辞書
const dict = Object.create(null);
dict.key = "value";
console.log(dict.hasOwnProperty); // undefined（Object.prototype を持たない）
console.log("key" in dict);       // true

// 通常オブジェクトとの比較
const normalObj = {};
console.log(normalObj.toString); // [Function: toString]（継承）
console.log(dict.toString);      // undefined`,
            },
          ],
        },
        {
          id: 's6-hasown-in',
          name: 'hasOwnProperty vs in 演算子',
          level: 'basic',
          keywords: 'hasOwnProperty Object.hasOwn in 演算子 継承 プロパティ チェック 存在確認',
          desc: '`in` 演算子はプロトタイプチェーン全体を検索します。`hasOwnProperty` は自身のプロパティのみを確認します。ES2022 では `Object.hasOwn(obj, key)` が追加され、`Object.create(null)` のようにプロトタイプのないオブジェクトでも安全に使えます。',
          code: [
            {
              lang: 'JavaScript',
              code: `function Animal(name) { this.name = name; }
Animal.prototype.speak = function() { return "..."; };

const dog = new Animal("Rex");

// in: プロトタイプチェーン全体を検索
console.log("name"  in dog); // true（自身）
console.log("speak" in dog); // true（プロトタイプ）

// hasOwnProperty: 自身のプロパティのみ
console.log(dog.hasOwnProperty("name"));  // true
console.log(dog.hasOwnProperty("speak")); // false

// Object.hasOwn（ES2022, 推奨）
console.log(Object.hasOwn(dog, "name"));  // true
console.log(Object.hasOwn(dog, "speak")); // false

// null プロトタイプオブジェクトでの問題
const dict = Object.create(null);
dict.x = 1;
// dict.hasOwnProperty("x"); // TypeError（メソッドが存在しない）
console.log(Object.hasOwn(dict, "x")); // true（安全）`,
            },
          ],
          warn: '`Object.create(null)` で作ったオブジェクトに `hasOwnProperty` は呼べない。代わりに `Object.hasOwn` を使うこと。',
        },
        {
          id: 's6-prototype-pollution',
          name: 'プロトタイプ汚染',
          level: 'basic',
          keywords: 'プロトタイプ汚染 prototype pollution セキュリティ __proto__ constructor Object.prototype',
          desc: 'プロトタイプ汚染は `Object.prototype` に意図しないプロパティを追加することで、アプリケーション全体のオブジェクトの動作を変えてしまう攻撃・バグです。外部入力から `__proto__` や `constructor.prototype` を経由してプロトタイプを書き換えられる危険があります。',
          code: [
            {
              lang: 'JavaScript',
              code: `// 汚染の例（実際には行わないこと）
const maliciousInput = JSON.parse('{"__proto__": {"isAdmin": true}}');

// 安全でないマージ関数
function unsafeMerge(target, source) {
  for (const key in source) {
    target[key] = source[key]; // __proto__ も代入してしまう
  }
}
// unsafeMerge({}, maliciousInput);
// すると {} の [[Prototype]] が汚染される

// 安全なマージ: Object.hasOwn でチェック
function safeMerge(target, source) {
  for (const key of Object.keys(source)) { // 自身のキーのみ
    if (key !== "__proto__" && key !== "constructor") {
      target[key] = source[key];
    }
  }
  return target;
}

// 対策: Object.create(null) を使う
const safe = Object.create(null);
safe.__proto__ = "harmless"; // Object.prototype は汚染されない
console.log({}.isAdmin); // undefined（正常）`,
            },
          ],
          warn: '外部から受け取った JSON をそのまま再帰マージする処理はプロトタイプ汚染の温床。`__proto__`・`constructor`・`prototype` キーは明示的に拒否するか `Object.create(null)` を使うこと。',
        },
      ],
    },

    // ─────────────────────────────────────────
    // s7: クラス
    // ─────────────────────────────────────────
    {
      id: 's7',
      num: 7,
      title: 'クラス',
      level: 'basic',
      items: [
        {
          id: 's7-class-basics',
          name: 'class 構文・コンストラクタ・extends・super',
          level: 'basic',
          keywords: 'class constructor extends super 継承 インスタンス new クラス構文',
          desc: 'ES2015 で導入された `class` 構文はプロトタイプベース継承の糖衣構文です。`constructor` でインスタンスを初期化し、`extends` で継承、`super` で親クラスのコンストラクタ・メソッドを呼び出します。派生クラスの `constructor` では `this` を使う前に `super()` を呼ぶ必要があります。',
          code: [
            {
              lang: 'JavaScript',
              code: `class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return \`\${this.name} makes a sound.\`;
  }
  toString() {
    return \`Animal(\${this.name})\`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // 必ず先に呼ぶ
    this.breed = breed;
  }
  speak() {
    return \`\${this.name} barks!\`;
  }
  describe() {
    return \`\${super.speak()} I am a \${this.breed}.\`;
  }
}

const d = new Dog("Rex", "Shiba");
console.log(d.speak());    // "Rex barks!"
console.log(d.describe()); // "Rex makes a sound. I am a Shiba."
console.log(d instanceof Dog);    // true
console.log(d instanceof Animal); // true`,
            },
          ],
        },
        {
          id: 's7-private-fields',
          name: 'プライベートフィールド # と静的メンバ',
          level: 'basic',
          keywords: 'プライベートフィールド private field # static 静的 ES2022 クラスフィールド',
          desc: 'ES2022 で `#` プレフィックスによる真のプライベートフィールドとメソッドが導入されました。クラス外からアクセスすると SyntaxError になります。`static` キーワードで静的プロパティ・メソッドを定義でき、インスタンスではなくクラス自体に属します。',
          code: [
            {
              lang: 'JavaScript',
              code: `class BankAccount {
  #balance = 0;             // プライベートフィールド
  static #interestRate = 0.03; // プライベート静的フィールド

  constructor(initialBalance) {
    this.#balance = initialBalance;
  }

  deposit(amount) {
    if (amount <= 0) throw new Error("Invalid amount");
    this.#balance += amount;
  }

  get balance() { return this.#balance; } // getter で読み取り

  static getInterestRate() {
    return BankAccount.#interestRate;
  }
}

const acc = new BankAccount(1000);
acc.deposit(500);
console.log(acc.balance); // 1500
// console.log(acc.#balance); // SyntaxError

console.log(BankAccount.getInterestRate()); // 0.03

// プライベートフィールドの存在チェック
console.log(#balance in acc); // true（ES2022）`,
            },
          ],
        },
        {
          id: 's7-class-is-sugar',
          name: 'クラスはプロトタイプの糖衣構文',
          level: 'basic',
          keywords: 'クラス 糖衣構文 syntactic sugar プロトタイプ prototype typeof class function',
          desc: '`class` は新しいオブジェクトシステムを導入したのではなく、既存のプロトタイプベース継承をより直感的に書くための構文糖です。`typeof MyClass === "function"` であり、`MyClass.prototype` にメソッドが定義されます。この理解は高度なメタプログラミングやデバッグに不可欠です。',
          code: [
            {
              lang: 'JavaScript',
              code: `class Greeter {
  constructor(name) { this.name = name; }
  greet() { return \`Hello, \${this.name}!\`; }
}

// class は実体として function
console.log(typeof Greeter); // "function"

// メソッドは prototype に定義される
console.log(typeof Greeter.prototype.greet); // "function"

// 同等のプロトタイプ記法
function GreeterProto(name) { this.name = name; }
GreeterProto.prototype.greet = function() { return \`Hello, \${this.name}!\`; };

const g1 = new Greeter("Alice");
const g2 = new GreeterProto("Alice");
console.log(g1.greet()); // "Hello, Alice!"
console.log(g2.greet()); // "Hello, Alice!"

// class は strict mode が強制される
class Strict {
  test() {
    // 'use strict' が自動的に適用される
    return typeof this; // undefined（strictでない呼び出し時）
  }
}`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────
    // s8: this と binding
    // ─────────────────────────────────────────
    {
      id: 's8',
      num: 8,
      title: 'this と binding',
      level: 'basic',
      items: [
        {
          id: 's8-this-rules',
          name: 'this が決まるルール',
          level: 'basic',
          keywords: 'this 呼び出し方 コンテキスト context グローバル メソッド呼び出し new 暗黙バインディング',
          desc: '`this` の値は関数の**定義場所ではなく呼び出し方**によって決まります。メソッド呼び出し（`obj.method()`）ではレシーバが `this`、通常関数呼び出しでは strict mode では `undefined`、非 strict では `globalThis` になります。`new` で呼ぶと新しいオブジェクトが `this` になります。',
          code: [
            {
              lang: 'JavaScript',
              code: `"use strict";

function showThis() {
  console.log(this);
}
showThis(); // undefined（strict mode）

const obj = {
  name: "obj",
  show: showThis,
};
obj.show(); // { name: 'obj', show: [Function] }（obj が this）

// メソッドを変数に代入すると this を失う
const detached = obj.show;
detached(); // undefined（呼び出し方が変わった）

// new 呼び出し
function Person(name) { this.name = name; }
const p = new Person("Alice");
console.log(p.name); // "Alice"（新しいオブジェクトが this）

// イベントハンドラ
class Button {
  label = "Click me";
  handleClick() {
    // DOM イベントでは this が button 要素になる（意図しない）
    console.log(this.label);
  }
}`,
            },
          ],
          warn: '`this` はコードを読むだけでは決まらない。呼び出しコンテキストによって動的に変わる。デバッグ時は呼び出し元を必ず確認すること。',
        },
        {
          id: 's8-call-apply-bind',
          name: 'call / apply / bind',
          level: 'basic',
          keywords: 'call apply bind this 明示バインディング explicit binding 借用 partial application',
          desc: '`call(thisArg, ...args)` と `apply(thisArg, argsArray)` は `this` を指定して関数を即座に呼び出します。`bind(thisArg)` は `this` が固定された新しい関数を返し、後から呼び出せます。`bind` はクラスメソッドをコールバックとして渡す際によく使います。',
          code: [
            {
              lang: 'JavaScript',
              code: `function introduce(greeting, punctuation) {
  return \`\${greeting}, I am \${this.name}\${punctuation}\`;
}

const alice = { name: "Alice" };
const bob   = { name: "Bob" };

// call: 引数を個別に渡す
console.log(introduce.call(alice, "Hello", "!")); // "Hello, I am Alice!"

// apply: 引数を配列で渡す
console.log(introduce.apply(bob, ["Hi", "."]));   // "Hi, I am Bob."

// bind: this を固定した新しい関数を返す
const aliceIntro = introduce.bind(alice, "Hey");
console.log(aliceIntro("!!"));  // "Hey, I am Alice!!"

// クラスメソッドを bind でコールバックとして渡す
class Counter {
  count = 0;
  increment() { this.count++; }
}
const c = new Counter();
const inc = c.increment.bind(c); // bind で this を固定
[1, 2, 3].forEach(inc);
console.log(c.count); // 3`,
            },
          ],
        },
        {
          id: 's8-arrow-this',
          name: 'アロー関数と this',
          level: 'basic',
          keywords: 'アロー関数 arrow function this レキシカル lexical this 継承 コールバック',
          desc: 'アロー関数は自身の `this` を持たず、定義時の外側のスコープの `this` をレキシカルに継承します。これによりクラスメソッド内でコールバックを使う際の `this` 問題が解消されます。ただしオブジェクトリテラルのメソッドにはアロー関数を使ってはいけません。',
          code: [
            {
              lang: 'JavaScript',
              code: `class DataFetcher {
  data = [];

  // 通常関数: コールバック内の this が問題
  loadBad() {
    [1, 2, 3].forEach(function(item) {
      // this は undefined（strict）または globalThis
      // this.data.push(item); // エラーになる
    });
  }

  // アロー関数: 外側（DataFetcher）の this を継承
  loadGood() {
    [1, 2, 3].forEach((item) => {
      this.data.push(item); // 正しく DataFetcher インスタンス
    });
  }
}

const df = new DataFetcher();
df.loadGood();
console.log(df.data); // [1, 2, 3]

// オブジェクトリテラルでは使わない
const obj = {
  value: 42,
  // NG: アロー関数の this はオブジェクトリテラルの外を参照
  wrong: () => console.log(this?.value), // undefined
  // OK: 通常のメソッド
  right() { console.log(this.value); },  // 42
};
obj.wrong();
obj.right();`,
            },
          ],
          warn: 'アロー関数をオブジェクトリテラルのメソッドや Vue/React のオプション API のメソッドに使うと `this` が意図しないスコープを参照する。メソッドには通常の関数を使うこと。',
        },
      ],
    },

    // ─────────────────────────────────────────
    // s9: 非同期処理・Promise
    // ─────────────────────────────────────────
    {
      id: 's9',
      num: 9,
      title: '非同期処理・Promise',
      level: 'basic',
      items: [
        {
          id: 's9-callback',
          name: 'コールバックとコールバック地獄',
          level: 'basic',
          keywords: 'コールバック callback 非同期 callback hell ネスト エラーハンドリング Node.js',
          desc: 'コールバックは非同期処理完了後に呼ばれる関数です。非同期処理が連鎖すると深いネストが生まれ（コールバック地獄）、可読性とエラーハンドリングが困難になります。Node.js スタイルのコールバックは `(error, result)` の慣習を使いますが、Promise と async/await によりこの問題は解消されました。',
          code: [
            {
              lang: 'JavaScript',
              code: `// Node.js スタイルのコールバック（error-first）
function readFile(path, callback) {
  // 疑似実装
  setTimeout(() => {
    if (path === "bad.txt") {
      callback(new Error("File not found"));
    } else {
      callback(null, "file contents");
    }
  }, 100);
}

readFile("good.txt", (err, data) => {
  if (err) return console.error(err);
  console.log(data); // "file contents"
});

// コールバック地獄の例（読みにくい）
readFile("a.txt", (err1, a) => {
  if (err1) return;
  readFile("b.txt", (err2, b) => {
    if (err2) return;
    readFile("c.txt", (err3, c) => {
      if (err3) return;
      console.log(a, b, c); // 深いネスト
    });
  });
});`,
            },
          ],
        },
        {
          id: 's9-promise',
          name: 'Promise（状態・then・catch・finally）',
          level: 'basic',
          keywords: 'Promise then catch finally 状態 pending fulfilled rejected resolve reject',
          desc: 'Promise は非同期処理の結果を表すオブジェクトで、`pending`（待機）・`fulfilled`（成功）・`rejected`（失敗）の 3 つの状態を持ちます。`then` で成功時の処理を、`catch` でエラー処理を、`finally` で成否に関わらず実行する処理を登録します。`then` はチェーン可能で、コールバック地獄を回避できます。',
          code: [
            {
              lang: 'JavaScript',
              code: `// Promise の基本
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve("データ取得成功");
    } else {
      reject(new Error("取得失敗"));
    }
  }, 100);
});

promise
  .then(result => {
    console.log(result); // "データ取得成功"
    return result.toUpperCase(); // 次の then に渡る
  })
  .then(upper => console.log(upper)) // "データ取得成功"（大文字）
  .catch(err => console.error("エラー:", err.message))
  .finally(() => console.log("完了（成否に関わらず実行）"));

// fetch API（実際のネットワーク請求）
// fetch("https://api.example.com/data")
//   .then(res => res.json())
//   .then(data => console.log(data))
//   .catch(err => console.error(err));`,
            },
          ],
        },
        {
          id: 's9-promise-combinators',
          name: 'Promise.all / allSettled / race / any',
          level: 'basic',
          keywords: 'Promise.all Promise.allSettled Promise.race Promise.any 並列 combinator',
          desc: '`Promise.all` は全て成功した場合に解決し、1 つでも失敗すると即座に拒否します。`Promise.allSettled` は全て完了するまで待ち、成否に関わらず結果を返します。`Promise.race` は最初に完了したものの結果を返し、`Promise.any` は最初に成功したものを返します。',
          code: [
            {
              lang: 'JavaScript',
              code: `const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.reject(new Error("失敗"));

// Promise.all: 全成功 or 最初の失敗
Promise.all([p1, p2])
  .then(([a, b]) => console.log(a, b)); // 1 2

Promise.all([p1, p3])
  .catch(err => console.error("all:", err.message)); // "失敗"

// Promise.allSettled: 全完了まで待つ
Promise.allSettled([p1, p3])
  .then(results => {
    results.forEach(r => console.log(r.status, r.value ?? r.reason));
    // "fulfilled" 1
    // "rejected" Error: 失敗
  });

// Promise.race: 最初に完了したもの
const slow = new Promise(res => setTimeout(() => res("遅い"), 500));
const fast = new Promise(res => setTimeout(() => res("速い"), 100));
Promise.race([slow, fast]).then(v => console.log(v)); // "速い"

// Promise.any: 最初に成功したもの（ES2021）
Promise.any([p3, p1, p2]).then(v => console.log(v)); // 1`,
            },
          ],
          warn: '`Promise.all` は 1 つでも失敗すると他の Promise の結果を捨てる。全結果が必要な場合は `Promise.allSettled` を使うこと。',
        },
        {
          id: 's9-microtask',
          name: 'microtask キューと Promise の実行順',
          level: 'basic',
          keywords: 'microtask マイクロタスク キュー Promise 実行順 setTimeout queueMicrotask イベントループ',
          desc: 'Promise の `then` コールバックはマイクロタスクキューに積まれます。マイクロタスクは現在のタスク（同期コード）が完了した直後、次のマクロタスク（`setTimeout` など）より前に処理されます。この実行順序を理解することで非同期コードの動作を正確に予測できます。',
          code: [
            {
              lang: 'JavaScript',
              code: `console.log("1: 同期開始");

setTimeout(() => console.log("4: setTimeout (マクロタスク)"), 0);

Promise.resolve()
  .then(() => console.log("3: Promise.then (マイクロタスク)"))
  .then(() => console.log("3b: Promise.then 2"));

console.log("2: 同期終了");

// 出力順:
// 1: 同期開始
// 2: 同期終了
// 3: Promise.then (マイクロタスク)
// 3b: Promise.then 2
// 4: setTimeout (マクロタスク)

// queueMicrotask（明示的にマイクロタスク）
queueMicrotask(() => console.log("マイクロタスクキューに追加"));`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────
    // s10: async/await
    // ─────────────────────────────────────────
    {
      id: 's10',
      num: 10,
      title: 'async / await',
      level: 'basic',
      items: [
        {
          id: 's10-async-basics',
          name: 'async 関数と await の動作',
          level: 'basic',
          keywords: 'async await 非同期 Promise 返り値 wrap 同期的 書き方',
          desc: '`async` 関数は常に Promise を返します。戻り値は自動的に `Promise.resolve()` でラップされます。`await` は Promise の解決を待つ構文糖であり、非同期処理を同期的な見た目で書けます。`await` は `async` 関数内（またはトップレベル ES Modules）でのみ使えます。',
          code: [
            {
              lang: 'JavaScript',
              code: `// async 関数は常に Promise を返す
async function getValue() {
  return 42; // → Promise.resolve(42) と同等
}
getValue().then(v => console.log(v)); // 42
console.log(getValue() instanceof Promise); // true

// await: Promise の解決を待つ
function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

async function main() {
  console.log("開始");
  await delay(100);
  console.log("100ms 後");

  const val = await Promise.resolve("hello");
  console.log(val); // "hello"

  // 非 Promise も await できる（即座に解決）
  const num = await 42;
  console.log(num); // 42
}

main();
console.log("main() は非同期なのでこちらが先に出力");`,
            },
          ],
        },
        {
          id: 's10-error-handling',
          name: 'try/catch によるエラーハンドリング',
          level: 'basic',
          keywords: 'try catch finally async await エラーハンドリング Error reject',
          desc: 'async/await では通常の `try/catch/finally` でエラー（Promise の reject）を捕捉できます。`catch` を忘れると UnhandledPromiseRejection になります。複数の非同期処理のエラーを一箇所でまとめて扱いたい場合に有効です。',
          code: [
            {
              lang: 'JavaScript',
              code: `async function fetchData(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(\`HTTP error: \${res.status}\`);
  return res.json();
}

async function main() {
  try {
    const data = await fetchData("https://api.example.com/data");
    console.log(data);
  } catch (err) {
    console.error("取得失敗:", err.message);
  } finally {
    console.log("クリーンアップ");
  }
}

// エラーを戻り値として扱うパターン（Result 型風）
async function safeFetch(url) {
  try {
    const data = await fetchData(url);
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: err };
  }
}

main();`,
            },
          ],
          warn: '`async` 関数内の `await` なし `throw` でも Promise が reject される。呼び出し元で `.catch()` か `try/catch` を忘れると未処理の rejection になる。',
        },
        {
          id: 's10-parallel',
          name: '並列実行と直列実行',
          level: 'basic',
          keywords: '並列 直列 sequential parallel async await Promise.all パフォーマンス',
          desc: '`await` を直列に書くと処理が順番に実行され時間がかかります。並列実行が可能なら `Promise.all` と `await` を組み合わせて同時に処理します。`for...of` との組み合わせでは直列になる点に注意が必要です。',
          code: [
            {
              lang: 'JavaScript',
              code: `function delay(ms, val) {
  return new Promise(res => setTimeout(() => res(val), ms));
}

// NG: 直列実行（合計 300ms）
async function sequential() {
  const a = await delay(100, "A"); // 100ms 待つ
  const b = await delay(100, "B"); // さらに 100ms 待つ
  const c = await delay(100, "C"); // さらに 100ms 待つ
  return [a, b, c];
}

// OK: 並列実行（合計 100ms）
async function parallel() {
  const [a, b, c] = await Promise.all([
    delay(100, "A"),
    delay(100, "B"),
    delay(100, "C"),
  ]);
  return [a, b, c];
}

// for...of は直列になる（意図的なレート制限などに使う）
async function serialLoop(items) {
  const results = [];
  for (const item of items) {
    const result = await delay(50, item.toUpperCase());
    results.push(result);
  }
  return results;
}

(async () => {
  console.log(await sequential()); // ['A', 'B', 'C']（~300ms）
  console.log(await parallel());   // ['A', 'B', 'C']（~100ms）
})();`,
            },
          ],
          warn: '`await` を `for...of` 内に書くと自動的に直列になる。意図せず直列化してパフォーマンスを損ないやすい。並列化できるなら `Promise.all` を優先すること。',
        },
      ],
    },

    // ─────────────────────────────────────────
    // s11: モジュール
    // ─────────────────────────────────────────
    {
      id: 's11',
      num: 11,
      title: 'モジュール',
      level: 'basic',
      items: [
        {
          id: 's11-esm',
          name: 'ES Modules（import / export）',
          level: 'basic',
          keywords: 'ES Modules import export ESM モジュール 名前空間 依存関係 静的解析',
          desc: 'ES Modules（ESM）は JS の標準モジュールシステムです。`export` でモジュールから値を公開し、`import` で取り込みます。ESM はファイル単位でスコープが分離されます。`import` は静的解析が可能なため、バンドラーによるツリーシェイキングが効きます。',
          code: [
            {
              lang: 'JavaScript',
              code: `// math.js（モジュール側）
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }

// main.js（利用側）
import { PI, add } from './math.js';
console.log(PI);        // 3.14159
console.log(add(1, 2)); // 3

// エイリアス
import { add as sum } from './math.js';
console.log(sum(3, 4)); // 7

// 名前空間インポート
import * as math from './math.js';
console.log(math.PI);   // 3.14159

// 再エクスポート
// export { add, subtract } from './math.js';`,
            },
          ],
        },
        {
          id: 's11-default-export',
          name: 'デフォルトエクスポートと名前付きエクスポート',
          level: 'basic',
          keywords: 'default export デフォルトエクスポート named export 名前付きエクスポート 使い分け',
          desc: '各モジュールはデフォルトエクスポートを 1 つだけ持てます。インポート時に任意の名前を付けられるため、クラスや主要な関数に使います。名前付きエクスポートは複数持てます。デフォルトエクスポートは再エクスポートや自動インポートで混乱しやすいため、ライブラリでは名前付きエクスポートを推奨するスタイルガイドもあります。',
          code: [
            {
              lang: 'JavaScript',
              code: `// logger.js
const LOG_LEVELS = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 };

export class Logger {
  constructor(prefix) { this.prefix = prefix; }
  log(msg) { console.log(\`[\${this.prefix}] \${msg}\`); }
}

export { LOG_LEVELS }; // 名前付きエクスポート

export default Logger;  // デフォルトエクスポート

// ─────────────────────
// 利用側

// デフォルトインポート（任意の名前を付けられる）
import MyLogger from './logger.js';
import Logger2 from './logger.js'; // 同じもの、別名

// 名前付きと混在
import DefaultLogger, { LOG_LEVELS } from './logger.js';

const log = new DefaultLogger("APP");
log.log("起動"); // "[APP] 起動"
console.log(LOG_LEVELS.INFO); // 1`,
            },
          ],
          warn: 'デフォルトエクスポートは名前が強制されないため、プロジェクト全体で命名が一貫しなくなりやすい。ライブラリ開発では名前付きエクスポートを優先することが多い。',
        },
        {
          id: 's11-dynamic-import',
          name: '動的 import() と CommonJS との違い',
          level: 'basic',
          keywords: '動的 import dynamic import() 遅延読み込み lazy load CommonJS require 違い',
          desc: '動的 `import()` は実行時に非同期でモジュールを読み込む関数です。Promise を返し、条件付き読み込みやルートベースのコード分割に使います。CommonJS の `require` との主な違いは同期/非同期・トップレベル制約・ライブバインディングです。',
          code: [
            {
              lang: 'JavaScript',
              code: `// 動的インポート（Promise を返す）
async function loadModule(locale) {
  const { default: messages } = await import(\`./i18n/\${locale}.js\`);
  return messages;
}

// 条件付き読み込み
if (process.env.NODE_ENV === "development") {
  const { devTools } = await import('./devTools.js');
  devTools.init();
}

// ─── CommonJS vs ESM の違い ───
// CommonJS（Node.js 従来形式）
// const fs = require('fs');           // 同期・実行時
// module.exports = { foo, bar };

// ES Modules
// import fs from 'fs';                // 静的・コンパイル時解析可能
// export { foo, bar };

// ライブバインディング（ESM の特徴）
// counter.js: export let count = 0; export function inc() { count++; }
// main.js:    import { count, inc } from './counter.js';
//             inc(); console.log(count); // 1（最新値が反映される）
// CommonJS はコピーを取るため古い値が残る場合がある`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────
    // s12: イテレータ・ジェネレータ
    // ─────────────────────────────────────────
    {
      id: 's12',
      num: 12,
      title: 'イテレータ・ジェネレータ',
      level: 'advanced',
      items: [
        {
          id: 's12-iterator-protocol',
          name: 'iterable プロトコルと Symbol.iterator',
          level: 'advanced',
          keywords: 'iterable iterator Symbol.iterator プロトコル for of 反復可能 カスタム',
          desc: 'iterable プロトコルは `Symbol.iterator` メソッドを持つオブジェクトです。このメソッドは `{ value, done }` を返す `next()` メソッドを持つイテレータを返します。`for...of`・スプレッド・分割代入はこのプロトコルを使います。カスタム iterable を実装することで任意のオブジェクトを反復可能にできます。',
          code: [
            {
              lang: 'JavaScript',
              code: `// カスタム iterable
class Range {
  constructor(start, end) {
    this.start = start;
    this.end   = end;
  }
  [Symbol.iterator]() {
    let current = this.start;
    const end   = this.end;
    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }
        return { value: undefined, done: true };
      },
    };
  }
}

const range = new Range(1, 5);
for (const n of range) {
  process.stdout.write(n + " "); // 1 2 3 4 5
}
console.log();

console.log([...range]);   // [1, 2, 3, 4, 5]
const [a, b, c] = range;
console.log(a, b, c);      // 1 2 3

// 組み込み iterable の確認
console.log(typeof [][Symbol.iterator]);    // "function"
console.log(typeof ""[Symbol.iterator]);   // "function"
console.log(typeof new Map()[Symbol.iterator]); // "function"`,
            },
          ],
        },
        {
          id: 's12-generator',
          name: 'function* ジェネレータと yield',
          level: 'advanced',
          keywords: 'generator ジェネレータ function* yield 遅延評価 lazy イテレータ',
          desc: 'ジェネレータ関数（`function*`）は `yield` で値を一つずつ返し、途中で処理を中断・再開できます。呼び出すとジェネレータオブジェクトを返し、`next()` を呼ぶたびに次の `yield` まで実行します。自動的に iterable を実装するため `for...of` で使えます。',
          code: [
            {
              lang: 'JavaScript',
              code: `function* counter(start = 0) {
  let n = start;
  while (true) {
    yield n++;
  }
}

const gen = counter(1);
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }

// for...of で使う（break で停止）
function* range(from, to) {
  for (let i = from; i <= to; i++) yield i;
}

for (const n of range(1, 5)) {
  process.stdout.write(n + " "); // 1 2 3 4 5
}
console.log();

// yield* で別のジェネレータに委譲
function* concat(...iterables) {
  for (const it of iterables) yield* it;
}

console.log([...concat([1, 2], [3, 4], [5])]); // [1, 2, 3, 4, 5]`,
            },
          ],
        },
        {
          id: 's12-infinite-sequence',
          name: '無限シーケンスと遅延評価',
          level: 'advanced',
          keywords: '無限 infinite sequence 遅延評価 lazy Fibonacci フィボナッチ take',
          desc: 'ジェネレータは必要なときにだけ値を生成するため、無限シーケンスを扱えます。配列と違いメモリを使い切ることがありません。`take` のようなユーティリティと組み合わせて必要な分だけ取り出します。',
          code: [
            {
              lang: 'JavaScript',
              code: `// フィボナッチ数列（無限）
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// 先頭 n 個を取り出すユーティリティ
function take(n, iterable) {
  const result = [];
  for (const val of iterable) {
    result.push(val);
    if (result.length === n) break;
  }
  return result;
}

console.log(take(10, fibonacci()));
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

// 素数ジェネレータ（エラトステネスの篩）
function* primes() {
  const seen = [];
  for (let n = 2; ; n++) {
    if (seen.every(p => n % p !== 0)) {
      seen.push(n);
      yield n;
    }
  }
}

console.log(take(10, primes()));
// [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────
    // s13: Map・Set・WeakMap・WeakRef
    // ─────────────────────────────────────────
    {
      id: 's13',
      num: 13,
      title: 'Map・Set・WeakMap・WeakRef',
      level: 'advanced',
      items: [
        {
          id: 's13-map',
          name: 'Map vs オブジェクト',
          level: 'advanced',
          keywords: 'Map オブジェクト キー 型 順序 size entries パフォーマンス dictionary',
          desc: '`Map` は任意の型をキーにでき、挿入順を保持します。`size` プロパティで要素数を取得でき、`for...of` で直接反復できます。キーが文字列・シンボルのみで良い場合はオブジェクトでも問題ありませんが、頻繁な追加・削除や非文字列キーには `Map` が適しています。',
          code: [
            {
              lang: 'JavaScript',
              code: `// Map: 任意の型をキーにできる
const map = new Map();
const objKey = { id: 1 };
const fnKey  = () => {};

map.set("string", "文字列キー");
map.set(42, "数値キー");
map.set(objKey, "オブジェクトキー");
map.set(fnKey, "関数キー");

console.log(map.get(objKey)); // "オブジェクトキー"
console.log(map.size);        // 4
console.log(map.has(42));     // true

// for...of で反復
for (const [key, value] of map) {
  console.log(key, "→", value);
}

// Map から配列へ
const keys   = [...map.keys()];
const values = [...map.values()];
const entries = [...map.entries()];

// オブジェクトからの変換
const obj = { a: 1, b: 2 };
const m   = new Map(Object.entries(obj));
console.log(m.get("a")); // 1`,
            },
          ],
        },
        {
          id: 's13-set',
          name: 'Set（重複排除）',
          level: 'advanced',
          keywords: 'Set 重複排除 unique has add delete size 集合 intersection union',
          desc: '`Set` は重複のない値のコレクションです。追加・検索・削除がすべて O(1) で動作します。配列の重複排除に便利ですが、ソートや添字アクセスはできません。集合演算（和・積・差）は手動で実装するか ES2025 で追加された `Set` メソッドを使います。',
          code: [
            {
              lang: 'JavaScript',
              code: `// 重複排除
const arr = [1, 2, 2, 3, 3, 3, 4];
const unique = [...new Set(arr)];
console.log(unique); // [1, 2, 3, 4]

// 基本操作
const s = new Set(["apple", "banana"]);
s.add("cherry");
s.add("apple"); // 重複は無視
console.log(s.size);          // 3
console.log(s.has("banana")); // true
s.delete("banana");
console.log(s.size);          // 2

// 集合演算
const a = new Set([1, 2, 3, 4]);
const b = new Set([3, 4, 5, 6]);

// 和集合
const union        = new Set([...a, ...b]);
// 積集合（共通）
const intersection = new Set([...a].filter(x => b.has(x)));
// 差集合
const difference   = new Set([...a].filter(x => !b.has(x)));

console.log([...union]);        // [1,2,3,4,5,6]
console.log([...intersection]); // [3,4]
console.log([...difference]);   // [1,2]`,
            },
          ],
        },
        {
          id: 's13-weakmap-weakref',
          name: 'WeakMap / WeakSet / WeakRef',
          level: 'advanced',
          keywords: 'WeakMap WeakSet WeakRef FinalizationRegistry GC ガベージコレクション メモリリーク キャッシュ',
          desc: '`WeakMap` と `WeakSet` はキーをオブジェクトのみに限定し、キーへの参照を弱参照にします。キーが GC で回収されると自動的に削除されます。列挙不可のためプライベートデータのキャッシュや DOM 要素への付加データに適しています。`WeakRef`（ES2021）は弱参照を直接作成し、`FinalizationRegistry` で GC 後のクリーンアップを登録できます。',
          code: [
            {
              lang: 'JavaScript',
              code: `// WeakMap: DOM 要素へのプライベートデータ
const cache = new WeakMap();

function processElement(el) {
  if (cache.has(el)) return cache.get(el);
  const result = { processed: true, timestamp: Date.now() };
  cache.set(el, result);
  return result;
}
// el が GC されると cache のエントリも自動削除

// WeakSet: オブジェクトの訪問済みフラグ
const visited = new WeakSet();
function visit(node) {
  if (visited.has(node)) return; // 循環参照を防ぐ
  visited.add(node);
  // ... 処理
}

// WeakRef（ES2021）
let bigObj = { data: new Array(1000).fill(0) };
const ref = new WeakRef(bigObj);

// GC 前は deref() でオブジェクトを取得
console.log(ref.deref() === bigObj); // true
bigObj = null; // 参照を手放す → GC の対象になる

// FinalizationRegistry
const registry = new FinalizationRegistry((heldValue) => {
  console.log(\`\${heldValue} が GC されました\`);
});
let obj = { name: "test" };
registry.register(obj, "obj");
obj = null; // GC の対象に`,
            },
          ],
          warn: '`WeakRef.deref()` は GC タイミングによって `undefined` を返すことがある。参照が生きているか常に確認が必要。`WeakRef` は最後の手段として使い、通常のキャッシュには `Map` や LRU キャッシュを検討すること。',
        },
      ],
    },

    // ─────────────────────────────────────────
    // s14: Proxy・Reflect
    // ─────────────────────────────────────────
    {
      id: 's14',
      num: 14,
      title: 'Proxy・Reflect',
      level: 'advanced',
      items: [
        {
          id: 's14-proxy-traps',
          name: 'Proxy のトラップ（get / set / has / deleteProperty）',
          level: 'advanced',
          keywords: 'Proxy トラップ trap get set has deleteProperty ハンドラ メタプログラミング',
          desc: '`Proxy` はオブジェクトへの操作を傍受するラッパーです。`handler` オブジェクトにトラップを定義することで、プロパティアクセス・代入・`in` 演算子・削除などをカスタマイズできます。Vue 3 の reactive システムはこの仕組みを利用しています。',
          code: [
            {
              lang: 'JavaScript',
              code: `// バリデーション付き Proxy
function createValidated(target, validators) {
  return new Proxy(target, {
    set(obj, key, value) {
      if (validators[key]) {
        const error = validators[key](value);
        if (error) throw new TypeError(\`\${key}: \${error}\`);
      }
      obj[key] = value;
      return true; // 成功を示す true が必要
    },
    get(obj, key) {
      if (key in obj) return obj[key];
      throw new ReferenceError(\`Property "\${String(key)}" not found\`);
    },
    has(obj, key) {
      return key in obj;
    },
    deleteProperty(obj, key) {
      if (key.startsWith("_")) throw new Error("Cannot delete private");
      delete obj[key];
      return true;
    },
  });
}

const person = createValidated(
  { name: "Alice", _id: 1 },
  { name: v => typeof v !== "string" ? "must be string" : null }
);

console.log(person.name);   // "Alice"
person.name = "Bob";
console.log(person.name);   // "Bob"
// person.name = 42;        // TypeError
// delete person._id;       // Error`,
            },
          ],
        },
        {
          id: 's14-reflect',
          name: 'Reflect API',
          level: 'advanced',
          keywords: 'Reflect Proxy 対応 get set has deleteProperty apply construct メタプログラミング',
          desc: '`Reflect` は Proxy のトラップに対応した静的メソッドを提供します。Proxy ハンドラ内でデフォルト動作を呼び出す際に `Reflect` を使うと、レシーバを正しく伝播できます。`Reflect.apply`・`Reflect.construct` は `Function.prototype.apply` や `new` の代替として使えます。',
          code: [
            {
              lang: 'JavaScript',
              code: `// Reflect を使ったログ Proxy
function withLogging(target) {
  return new Proxy(target, {
    get(obj, key, receiver) {
      console.log(\`GET: \${String(key)}\`);
      return Reflect.get(obj, key, receiver); // デフォルト動作
    },
    set(obj, key, value, receiver) {
      console.log(\`SET: \${String(key)} = \${value}\`);
      return Reflect.set(obj, key, value, receiver);
    },
  });
}

const obj = withLogging({ x: 1 });
obj.x;      // GET: x
obj.y = 2;  // SET: y = 2

// Reflect.apply
function sum(a, b) { return a + b; }
console.log(Reflect.apply(sum, null, [3, 4])); // 7

// Reflect.construct（new の代替）
class Point { constructor(x, y) { this.x = x; this.y = y; } }
const p = Reflect.construct(Point, [1, 2]);
console.log(p.x, p.y); // 1 2

// Reflect のメソッドは対応する演算子の関数版
console.log(Reflect.has({ a: 1 }, "a")); // true（"a" in obj と同等）`,
            },
          ],
        },
        {
          id: 's14-vue-reactive',
          name: 'バリデーション・ログ記録と Vue 3 の reactive',
          level: 'advanced',
          keywords: 'Vue 3 reactive Proxy バリデーション ログ 観察 observer パターン',
          desc: 'Vue 3 の `reactive()` は Proxy を使ってオブジェクトへのアクセスを監視し、変更があったときに UI を再レンダリングします。`get` トラップで「このプロパティを使っているコンポーネント」を追跡（track）し、`set` トラップで変更を検知してコンポーネントを再レンダリング（trigger）します。',
          code: [
            {
              lang: 'JavaScript',
              code: `// Vue 3 の reactive の仕組みを模倣した簡単な実装
function reactive(target) {
  const listeners = new Map(); // プロパティ → コールバックのセット

  function track(key) {
    if (!listeners.has(key)) listeners.set(key, new Set());
    // 現在アクティブなエフェクトを登録（Vue では activeEffect を使う）
  }

  function trigger(key) {
    const cbs = listeners.get(key);
    if (cbs) cbs.forEach(cb => cb());
  }

  return new Proxy(target, {
    get(obj, key, receiver) {
      track(key);
      return Reflect.get(obj, key, receiver);
    },
    set(obj, key, value, receiver) {
      const result = Reflect.set(obj, key, value, receiver);
      trigger(key); // 変更を通知
      return result;
    },
  });
}

const state = reactive({ count: 0 });

// リスナーを登録（Vue 3 の watchEffect に相当）
// state にアクセスするたびに track が呼ばれ、
// state を変更するたびに trigger → リスナーが実行される
state.count = 1; // trigger('count') が呼ばれる
console.log(state.count); // 1`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────
    // s15: 型強制・等値性・比較の落とし穴
    // ─────────────────────────────────────────
    {
      id: 's15',
      num: 15,
      title: '型強制・等値性・比較の落とし穴',
      level: 'advanced',
      items: [
        {
          id: 's15-abstract-equality',
          name: 'Abstract Equality Comparison（== の変換ルール）',
          level: 'advanced',
          keywords: '== 抽象等値比較 Abstract Equality 型変換 ルール ToPrimitive valueOf toString',
          desc: '`==` の比較ルール（Abstract Equality Comparison）は複雑な型変換アルゴリズムを持ちます。数値と文字列では文字列が数値に変換され、オブジェクトでは `valueOf`・`toString` が呼ばれます。`null == undefined` は `true` ですが `null == 0` は `false` です。',
          code: [
            {
              lang: 'JavaScript',
              code: `// 基本ルール
console.log(1 == "1");         // true（文字列→数値）
console.log(0 == false);       // true（false→0）
console.log("" == false);      // true（""→0, false→0）
console.log(null == undefined); // true（特例）
console.log(null == 0);        // false（null は変換されない）
console.log(null == "");       // false

// オブジェクトは ToPrimitive で変換
const obj = {
  valueOf() { return 42; },
};
console.log(obj == 42); // true

// 配列の変換（toString が呼ばれる）
console.log([] == 0);    // true（[] → "" → 0）
console.log(["1"] == 1); // true（["1"] → "1" → 1）
console.log([1,2] == "1,2"); // true

// 有名な不等式
console.log([] == ![]);  // true（![] → false → 0, [] → "" → 0）

// 対策: 常に === を使う
console.log(1 === "1"); // false（型変換なし）`,
            },
          ],
          warn: '`[] == ![]` が `true` になるような直感に反する動作が多い。`==` を使うのは `null` チェック（`x == null`）のみとし、それ以外は `===` を使うこと。',
        },
        {
          id: 's15-nan',
          name: 'NaN !== NaN と Object.is',
          level: 'advanced',
          keywords: 'NaN isNaN Number.isNaN Object.is -0 +0 等値 比較',
          desc: '`NaN`（Not a Number）は自分自身と等しくない唯一の値です。`isNaN()` はグローバル関数で型変換があるため危険です。`Number.isNaN()` は型変換なしで厳密に `NaN` を判定します。`Object.is` は `===` とほぼ同じですが `NaN === NaN` を `true`、`+0 === -0` を `false` として扱います。',
          code: [
            {
              lang: 'JavaScript',
              code: `// NaN の特性
console.log(NaN === NaN);   // false（唯一自分と等しくない値）
console.log(NaN !== NaN);   // true
console.log(typeof NaN);    // "number"

// isNaN vs Number.isNaN
console.log(isNaN(NaN));       // true
console.log(isNaN("hello"));   // true（文字列を数値変換すると NaN）
console.log(isNaN("123"));     // false（"123" → 123）

console.log(Number.isNaN(NaN));       // true
console.log(Number.isNaN("hello"));   // false（変換しない）
console.log(Number.isNaN(undefined)); // false

// 自分と等しくないチェック（NaN の判定）
function isNaNSafe(x) { return x !== x; }
console.log(isNaNSafe(NaN));  // true
console.log(isNaNSafe(1));    // false

// Object.is
console.log(Object.is(NaN, NaN));  // true
console.log(Object.is(+0, -0));    // false
console.log(Object.is(1, 1));      // true
console.log(0 === -0);             // true（=== は +0/-0 を区別しない）`,
            },
          ],
          warn: 'グローバル `isNaN()` は型変換があるため誤検知する。常に `Number.isNaN()` を使うこと。',
        },
        {
          id: 's15-sort-trap',
          name: 'sort の罠と Array の比較',
          level: 'advanced',
          keywords: 'sort 罠 辞書順 lexicographic 比較関数 compareFn localeCompare 安定ソート',
          desc: '`Array.prototype.sort` はデフォルトで要素を文字列に変換して辞書順でソートします。数値を正しくソートするには比較関数が必要です。ES2019 から安定ソートが保証されています。',
          code: [
            {
              lang: 'JavaScript',
              code: `// デフォルト sort は辞書順（文字列変換）
const nums = [10, 9, 2, 1, 100];
console.log(nums.sort()); // [1, 10, 100, 2, 9]（辞書順！）

// 数値ソートは比較関数が必要
console.log([...nums].sort((a, b) => a - b)); // [1, 2, 9, 10, 100]
console.log([...nums].sort((a, b) => b - a)); // [100, 10, 9, 2, 1]（降順）

// sort は元の配列を変更する（in-place）
const original = [3, 1, 2];
original.sort((a, b) => a - b);
console.log(original); // [1, 2, 3]（変更された）

// 変更しないには toSorted を使う（ES2023）
const arr = [3, 1, 2];
const sorted = arr.toSorted((a, b) => a - b);
console.log(arr);    // [3, 1, 2]（変更なし）
console.log(sorted); // [1, 2, 3]

// オブジェクトのソート
const people = [
  { name: "Charlie", age: 30 },
  { name: "Alice", age: 25 },
  { name: "Bob", age: 25 },
];
people.sort((a, b) => a.age - b.age || a.name.localeCompare(b.name));
console.log(people.map(p => p.name)); // ['Alice', 'Bob', 'Charlie']`,
            },
          ],
          warn: '`[1, 10, 2].sort()` は `[1, 10, 2]` のまま辞書順になり `[1, 2, 10]` にはならない。数値の sort には必ず `(a, b) => a - b` を渡すこと。',
        },
      ],
    },

    // ─────────────────────────────────────────
    // s16: イベントループ・パフォーマンス
    // ─────────────────────────────────────────
    {
      id: 's16',
      num: 16,
      title: 'イベントループ・パフォーマンス',
      level: 'advanced',
      items: [
        {
          id: 's16-event-loop',
          name: 'コールスタック・タスクキュー・マイクロタスクキュー',
          level: 'advanced',
          keywords: 'イベントループ event loop コールスタック タスクキュー マイクロタスク call stack task queue microtask',
          desc: 'JS はシングルスレッドで動作し、イベントループが非同期処理を調整します。同期コードはコールスタックで実行されます。`setTimeout` などのマクロタスクはタスクキューに積まれ、Promise の `then` はマイクロタスクキューに積まれます。マイクロタスクはタスクキューより先に処理されます。',
          code: [
            {
              lang: 'JavaScript',
              code: `console.log("1: start");

// マクロタスク（タスクキュー）
setTimeout(() => console.log("5: setTimeout"), 0);

// マイクロタスク（マイクロタスクキュー）
Promise.resolve().then(() => {
  console.log("3: Promise 1");
  return Promise.resolve();
}).then(() => {
  console.log("4: Promise 2");
});

queueMicrotask(() => console.log("3b: queueMicrotask"));

console.log("2: end");

// 出力:
// 1: start
// 2: end
// 3: Promise 1       ← マイクロタスク（コールスタック空になった直後）
// 3b: queueMicrotask ← マイクロタスク
// 4: Promise 2       ← マイクロタスク（Promise チェーン）
// 5: setTimeout      ← マクロタスク（全マイクロタスク処理後）`,
            },
          ],
        },
        {
          id: 's16-settimeout-0',
          name: 'setTimeout(fn, 0) の意味',
          level: 'advanced',
          keywords: 'setTimeout 0 マクロタスク 遅延 ゼロ遅延 イベントループ 非同期 UI ブロッキング',
          desc: '`setTimeout(fn, 0)` は「できるだけ早く、しかし現在の同期処理の後」に関数を実行します。UI の更新処理やスタックオーバーフロー回避のための再帰の分割に使われます。ただし HTML 仕様上、ネストした `setTimeout` は最低 4ms の遅延が入ります。',
          code: [
            {
              lang: 'JavaScript',
              code: `// UI をブロックしない長い処理の分割
function processLargeArray(arr) {
  let index = 0;
  function processChunk() {
    const end = Math.min(index + 1000, arr.length);
    for (; index < end; index++) {
      // 重い処理
    }
    if (index < arr.length) {
      setTimeout(processChunk, 0); // イベントループに制御を返す
    }
  }
  processChunk();
}

// DOM 更新後に処理を実行
function afterRender(fn) {
  setTimeout(fn, 0);
}
// afterRender(() => console.log(element.offsetHeight));

// setTimeout vs Promise の実行順
setTimeout(() => console.log("A: setTimeout 0ms"), 0);
Promise.resolve().then(() => console.log("B: Promise.then"));
console.log("C: 同期");
// 出力: C → B → A（マイクロタスクが先）`,
            },
          ],
        },
        {
          id: 's16-raf-microtask',
          name: 'requestAnimationFrame・queueMicrotask・structuredClone',
          level: 'advanced',
          keywords: 'requestAnimationFrame rAF アニメーション queueMicrotask structuredClone 深いコピー deep copy ES2022',
          desc: '`requestAnimationFrame(fn)` はブラウザの次の描画前に `fn` を呼び出します。アニメーションの実装に最適で、タブが非アクティブの場合は自動的に停止します。`queueMicrotask` はマイクロタスクキューに関数を追加します。`structuredClone`（ES2022）は深いコピーを作成するネイティブ関数で、`JSON.parse(JSON.stringify(...))` より高機能です。',
          code: [
            {
              lang: 'JavaScript',
              code: `// requestAnimationFrame（ブラウザ環境）
function animate() {
  let x = 0;
  function step(timestamp) {
    x += 1;
    // element.style.transform = \`translateX(\${x}px)\`;
    if (x < 300) {
      requestAnimationFrame(step); // 次フレームに続ける
    }
  }
  requestAnimationFrame(step);
}

// queueMicrotask（マイクロタスクの明示的な追加）
queueMicrotask(() => {
  console.log("マイクロタスクとして実行");
});

// structuredClone（ES2022）: 深いコピー
const original = {
  name: "Alice",
  hobbies: ["reading", "coding"],
  nested: { count: 1 },
  date: new Date(),
};
const clone = structuredClone(original);
clone.hobbies.push("gaming");
clone.nested.count = 99;

console.log(original.hobbies.length); // 2（変更されない）
console.log(original.nested.count);   // 1（変更されない）
console.log(clone.date instanceof Date); // true（Date もコピーされる）

// JSON.parse/stringify との違い
const withDate = { d: new Date() };
const jsonClone = JSON.parse(JSON.stringify(withDate));
console.log(jsonClone.d instanceof Date); // false（文字列になる）`,
            },
          ],
          warn: '`JSON.parse(JSON.stringify(obj))` は `Date`・`undefined`・関数・`RegExp`・循環参照を正しくコピーできない。深いコピーには `structuredClone` を使うこと。ただし `structuredClone` も関数はコピーできない。',
        },
      ],
    },
  ],
};

export default data;
