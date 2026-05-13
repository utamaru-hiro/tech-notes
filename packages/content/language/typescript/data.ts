import type { LanguageGuide } from '../../types';

const data: LanguageGuide = {
  lang: 'TypeScript',
  langSlug: 'typescript',
  version: 'TypeScript 5.x',
  lead: `JavaScript の経験者が 2〜3 時間でざっと読み通せるリファレンスです。型システムの仕組みと実践的な型の書き方を重点的に解説します。`,
  accent: '#3178c6',
  accent2: '#dce9f8',
  bgGradientTop: '#eef3fb',
  bgRadialLeft: 'rgba(49,120,198,0.15)',
  bgRadialRight: 'rgba(100,150,220,0.12)',
  badgeGradient: 'linear-gradient(135deg, #1a4f8a, #3178c6)',
  heroEmoji: '🔷',
  navGroups: [
    { label: '基本型', sections: ['s1', 's2', 's3', 's4', 's5'] },
    { label: 'クラス・ジェネリクス', sections: ['s6', 's7', 's8'] },
    { label: '高度な型', sections: ['s9', 's10', 's11', 's12', 's13'] },
    { label: '実践', sections: ['s14', 's15', 's16'] },
  ],
  sections: [
    // ─────────────────────────────────────────────
    // s1: 基本型・型アノテーション
    // ─────────────────────────────────────────────
    {
      id: 's1',
      num: 1,
      title: '基本型・型アノテーション',
      level: 'basic',
      items: [
        {
          id: 's1-primitives',
          name: 'プリミティブ型',
          level: 'basic',
          keywords: 'string number boolean null undefined symbol bigint プリミティブ 基本型',
          desc: 'TypeScript には JavaScript の 7 種のプリミティブ型がそのまま対応します。変数宣言に `: 型` を付けて型アノテーションを明示できます。`null` と `undefined` は `strictNullChecks` が有効な場合、それぞれ独立した型として扱われます。',
          code: [
            {
              lang: 'TypeScript',
              code: `const name: string = 'Alice';
const age: number = 30;
const active: boolean = true;
const nothing: null = null;
const undef: undefined = undefined;
const sym: symbol = Symbol('id');
const big: bigint = 9007199254740993n;

// strictNullChecks が有効なとき
let s: string = 'hello';
// s = null; // エラー: null は string に代入できない`,
            },
          ],
          warn: '`strictNullChecks` を無効にすると `null`/`undefined` がすべての型に代入できてしまい、実行時エラーの温床になります。必ず `strict: true` を tsconfig に設定してください。',
        },
        {
          id: 's1-array-tuple',
          name: '配列型・タプル型',
          level: 'basic',
          keywords: 'array tuple 配列 タプル 固定長',
          desc: '配列型は `T[]` または `Array<T>` で表現します。タプル型は要素数と各位置の型が固定された配列で、関数の複数戻り値などに使われます。',
          code: [
            {
              lang: 'TypeScript',
              code: `// 配列
const nums: number[] = [1, 2, 3];
const strs: Array<string> = ['a', 'b'];

// タプル
const pair: [string, number] = ['Alice', 30];
const [username, userAge] = pair;

// ラベル付きタプル（TS 4.0+）
type Range = [start: number, end: number];
const r: Range = [0, 100];

// 可変長タプル（残余要素）
type StringsAndNumber = [...string[], number];
const sn: StringsAndNumber = ['a', 'b', 42];`,
            },
          ],
          warn: 'タプルは添字アクセスで範囲外を参照してもコンパイルエラーにならない場合があります（noUncheckedIndexedAccess オプションで強化できます）。',
        },
        {
          id: 's1-special-types',
          name: 'any・unknown・never・void の違い',
          level: 'basic',
          keywords: 'any unknown never void 特殊型 top bottom',
          desc: '`any` は型チェックを無効化します。`unknown` は型安全な「何でも入れられる型」で、使う前に型を絞り込む必要があります。`never` は「到達しない・値が存在しない」ことを表す bottom 型です。`void` は戻り値がないことを示します。',
          code: [
            {
              lang: 'TypeScript',
              code: `// any: 型チェック無効
let a: any = 42;
a.toUpperCase(); // エラーにならない（危険）

// unknown: 安全な「何でも」型
let u: unknown = 'hello';
// u.toUpperCase(); // エラー: 絞り込みが必要
if (typeof u === 'string') u.toUpperCase(); // OK

// never: 到達不能
function fail(msg: string): never {
  throw new Error(msg);
}

// void: 戻り値なし
function log(x: string): void {
  console.log(x);
}`,
            },
          ],
          warn: '`any` は型の伝播（any の感染）が起きます。`any` を受け取った変数から別の変数に代入すると、その変数も `any` になります。`unknown` を使うことで型安全性を保てます。',
        },
        {
          id: 's1-inference',
          name: '型推論',
          level: 'basic',
          keywords: '型推論 inference 自動推論 明示不要',
          desc: 'TypeScript は多くの場面で型を自動推論するため、型アノテーションを省略できます。変数の初期値、関数の戻り値、配列リテラルなどは推論が効きます。型が自明な場所での明示は冗長になるため省略が一般的です。',
          code: [
            {
              lang: 'TypeScript',
              code: `// 変数: 右辺から推論
const x = 42;        // number
const s = 'hello';   // string
const arr = [1, 2];  // number[]

// 関数の戻り値: return 文から推論
function add(a: number, b: number) {
  return a + b; // 戻り値型は number と推論
}

// オブジェクト: プロパティ値から推論
const user = { name: 'Alice', age: 30 };
// { name: string; age: number }

// 型推論が広すぎる場合は明示する
let status = 'active'; // string（リテラル型にならない）
let status2: 'active' | 'inactive' = 'active'; // リテラル型`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // s2: 関数の型
    // ─────────────────────────────────────────────
    {
      id: 's2',
      num: 2,
      title: '関数の型',
      level: 'basic',
      items: [
        {
          id: 's2-annotations',
          name: '引数・戻り値の型注釈',
          level: 'basic',
          keywords: '関数 引数 戻り値 型注釈 function arrow',
          desc: '関数の引数と戻り値に型を付けることで、呼び出し側のミスをコンパイル時に検出できます。アロー関数・関数宣言どちらも同じ構文です。',
          code: [
            {
              lang: 'TypeScript',
              code: `// 関数宣言
function greet(name: string): string {
  return \`Hello, \${name}\`;
}

// アロー関数
const double = (n: number): number => n * 2;

// 関数型を変数に持つ
let fn: (x: number) => string;
fn = (x) => x.toString();

// void 戻り値
const print = (msg: string): void => {
  console.log(msg);
};`,
            },
          ],
        },
        {
          id: 's2-optional-default',
          name: 'オプション引数・デフォルト引数',
          level: 'basic',
          keywords: 'optional default オプション デフォルト 省略可能',
          desc: '`?` を付けるとオプション引数（`undefined` を許容）になります。デフォルト引数は値が渡されなかったときに使われ、型は自動推論されます。オプション引数はデフォルト引数の後には置けません。',
          code: [
            {
              lang: 'TypeScript',
              code: `// オプション引数
function greet(name: string, greeting?: string): string {
  return \`\${greeting ?? 'Hello'}, \${name}\`;
}
greet('Alice');          // "Hello, Alice"
greet('Alice', 'Hi');   // "Hi, Alice"

// デフォルト引数（型推論が効く）
function repeat(s: string, count = 3): string {
  return s.repeat(count);
}
repeat('ha');     // "hahaha"
repeat('ha', 2);  // "haha"`,
            },
          ],
          warn: 'オプション引数（`?`）と `| undefined` の共用体型は微妙に異なります。`?` は引数の省略を許容しますが、`| undefined` の場合は省略はできず `undefined` を明示的に渡す必要があります（`exactOptionalPropertyTypes` 有効時）。',
        },
        {
          id: 's2-overload',
          name: '関数オーバーロード',
          level: 'basic',
          keywords: 'overload オーバーロード 多重定義 シグネチャ',
          desc: '同じ関数名で引数パターンが異なる複数のシグネチャを宣言できます。実装シグネチャはすべてのオーバーロードを受け入れる広い型にします。',
          code: [
            {
              lang: 'TypeScript',
              code: `// オーバーロードシグネチャ
function format(value: number): string;
function format(value: string): string;
function format(value: Date): string;
// 実装シグネチャ（外部からは見えない）
function format(value: number | string | Date): string {
  if (typeof value === 'number') return value.toFixed(2);
  if (typeof value === 'string') return value.trim();
  return value.toISOString();
}

format(3.14);         // "3.14"
format('  hello  '); // "hello"
format(new Date());  // ISO string`,
            },
          ],
          warn: '実装シグネチャはすべてのオーバーロードシグネチャを包含する型を持たなければなりません。包含できていない場合、実装が呼び出されても型エラーになることがあります。',
        },
        {
          id: 's2-readonly-never',
          name: 'readonly 引数・never を返す関数',
          level: 'basic',
          keywords: 'readonly never 不変 到達不能 throw',
          desc: '`readonly` を引数に付けると、関数内でその引数を変更できないことを型レベルで保証します。`never` を返す関数は「必ず例外を投げる」か「無限ループ」で、呼び出し元の制御フローに伝播します。',
          code: [
            {
              lang: 'TypeScript',
              code: `// readonly 引数
function sum(nums: readonly number[]): number {
  // nums.push(1); // エラー: readonly 配列は変更不可
  return nums.reduce((a, b) => a + b, 0);
}

// never を返す関数
function assertNever(x: never): never {
  throw new Error(\`Unexpected value: \${JSON.stringify(x)}\`);
}

type Direction = 'left' | 'right';
function move(dir: Direction) {
  if (dir === 'left') return 'go left';
  if (dir === 'right') return 'go right';
  return assertNever(dir); // never チェック
}`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // s3: オブジェクト型・インターフェース
    // ─────────────────────────────────────────────
    {
      id: 's3',
      num: 3,
      title: 'オブジェクト型・インターフェース',
      level: 'basic',
      items: [
        {
          id: 's3-interface-basic',
          name: 'interface の定義・オプションプロパティ・readonly',
          level: 'basic',
          keywords: 'interface オブジェクト型 オプション readonly 定義',
          desc: '`interface` でオブジェクトの形状を宣言します。`?` でオプションプロパティ（省略可能）、`readonly` で変更不可プロパティを表現できます。',
          code: [
            {
              lang: 'TypeScript',
              code: `interface User {
  readonly id: number;
  name: string;
  email?: string; // オプション
}

const user: User = { id: 1, name: 'Alice' };
// user.id = 2; // エラー: readonly は変更不可

// 継承
interface AdminUser extends User {
  role: 'admin';
}

const admin: AdminUser = { id: 2, name: 'Bob', role: 'admin' };`,
            },
          ],
        },
        {
          id: 's3-declaration-merging',
          name: 'interface の宣言マージ',
          level: 'basic',
          keywords: '宣言マージ declaration merging 拡張 interface',
          desc: '同名の `interface` を複数宣言すると自動的にマージされます。ライブラリの型を拡張（augmentation）する際に利用されます。`type` にはこの機能がありません。',
          code: [
            {
              lang: 'TypeScript',
              code: `interface Window {
  myLib: { version: string };
}

// 別ファイルや別宣言でマージされる
interface Window {
  myLib: { version: string };
  myPlugin: () => void;
}

// 結果: Window は両方のプロパティを持つ
declare const win: Window;
win.myLib.version;
win.myPlugin();`,
            },
          ],
          warn: '宣言マージはグローバルな型（`Window`、`HTMLElement` など）を汚染するリスクがあります。ライブラリ型の拡張以外では意図しないマージが起きないよう注意してください。',
        },
        {
          id: 's3-index-signature',
          name: 'インデックスシグネチャ',
          level: 'basic',
          keywords: 'index signature インデックスシグネチャ 動的キー Record',
          desc: 'キーが動的な辞書型オブジェクトには `[key: string]: ValueType` のインデックスシグネチャを使います。すべてのプロパティがそのバリュー型に準拠する必要があります。',
          code: [
            {
              lang: 'TypeScript',
              code: `interface StringMap {
  [key: string]: string;
}

const map: StringMap = {};
map['foo'] = 'bar';
map['baz'] = 'qux';

// number インデックス
interface NumberedList {
  [index: number]: string;
  length: number; // 通常のプロパティも混在可
}

// Record<K, V> の方が簡潔
type Config = Record<string, string | number>;`,
            },
          ],
          warn: 'インデックスシグネチャがあると、存在しないキーへのアクセスも型エラーにならなくなります（`noUncheckedIndexedAccess` オプションで `T | undefined` に強化できます）。',
        },
        {
          id: 's3-interface-vs-type',
          name: 'interface vs type の使い分け',
          level: 'basic',
          keywords: 'interface type 違い 使い分け alias',
          desc: '`interface` はオブジェクト・クラスの形状定義に向いており、宣言マージや `extends` による継承が可能です。`type` はユニオン・交差・マップ・条件型など複雑な型構成に向いています。',
          code: [
            {
              lang: 'TypeScript',
              code: `// interface: 継承・宣言マージが可能
interface Animal { name: string }
interface Dog extends Animal { breed: string }

// type: ユニオンや複雑な型
type ID = string | number;
type Nullable<T> = T | null;

// type は プリミティブや Union に別名をつけられる
type StringOrNumber = string | number;
// interface StringOrNumber = ... // エラー: interface はオブジェクト型のみ

// どちらでも書けるケースはどちらでもよいが、
// 公開APIのオブジェクト型には interface が推奨される`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // s4: Union型・Intersection型
    // ─────────────────────────────────────────────
    {
      id: 's4',
      num: 4,
      title: 'Union型・Intersection型',
      level: 'basic',
      items: [
        {
          id: 's4-union-intersection',
          name: 'Union と Intersection の基本',
          level: 'basic',
          keywords: 'union intersection | & 共用体 交差型',
          desc: '`|`（Union）は「AまたはB」、`&`（Intersection）は「AかつB」を表します。Intersection はオブジェクト型を合成する際によく使われます。',
          code: [
            {
              lang: 'TypeScript',
              code: `// Union型
type StringOrNumber = string | number;
let val: StringOrNumber = 42;
val = 'hello'; // OK

// Intersection型
interface Serializable { serialize(): string }
interface Loggable { log(): void }
type SerializableLogger = Serializable & Loggable;

// オブジェクトの合成
type A = { a: number };
type B = { b: string };
type AB = A & B;
const ab: AB = { a: 1, b: 'x' }; // 両方必須`,
            },
          ],
        },
        {
          id: 's4-literal',
          name: 'リテラル型',
          level: 'basic',
          keywords: 'literal リテラル 文字列リテラル 数値リテラル 定数',
          desc: '特定の文字列・数値・真偽値だけを許可する型をリテラル型と言います。Union と組み合わせると列挙型のような効果が得られます。',
          code: [
            {
              lang: 'TypeScript',
              code: `type Direction = 'up' | 'down' | 'left' | 'right';
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
type Bit = 0 | 1;

function move(dir: Direction) {
  console.log(\`Moving \${dir}\`);
}
move('up');    // OK
// move('diagonal'); // エラー

// 関数の戻り値をリテラル型で絞る
function getStatus(): 'ok' | 'error' {
  return 'ok';
}`,
            },
          ],
        },
        {
          id: 's4-discriminated-union',
          name: '判別共用体（discriminated union）',
          level: 'basic',
          keywords: 'discriminated union 判別共用体 判別子 パターンマッチ',
          desc: '共通のリテラル型プロパティ（判別子）を持つ Union 型を判別共用体と呼びます。`switch`/`if` で判別子を絞り込むと、各ブランチで型が自動的に絞られます。',
          code: [
            {
              lang: 'TypeScript',
              code: `type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rect'; width: number; height: number }
  | { kind: 'triangle'; base: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2; // radius は確定
    case 'rect':
      return shape.width * shape.height;
    case 'triangle':
      return (shape.base * shape.height) / 2;
  }
}`,
            },
          ],
        },
        {
          id: 's4-narrowing',
          name: 'in 演算子・typeof による絞り込み',
          level: 'basic',
          keywords: 'narrowing 絞り込み in typeof 型ガード',
          desc: '`typeof` や `in` 演算子を条件式に使うと TypeScript は型を絞り込みます。`in` はプロパティの存在チェック、`typeof` はプリミティブの種別チェックに使われます。',
          code: [
            {
              lang: 'TypeScript',
              code: `type Cat = { meow: () => void };
type Dog = { bark: () => void };

// in による絞り込み
function makeSound(animal: Cat | Dog) {
  if ('meow' in animal) {
    animal.meow(); // Cat
  } else {
    animal.bark(); // Dog
  }
}

// typeof による絞り込み
function padLeft(value: string, padding: string | number) {
  if (typeof padding === 'number') {
    return ' '.repeat(padding) + value;
  }
  return padding + value;
}`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // s5: 型エイリアス
    // ─────────────────────────────────────────────
    {
      id: 's5',
      num: 5,
      title: '型エイリアス',
      level: 'basic',
      items: [
        {
          id: 's5-type-alias',
          name: 'type キーワードでの型定義',
          level: 'basic',
          keywords: 'type alias 型エイリアス 型定義 別名',
          desc: '`type` キーワードで既存の型に別名を付けたり、複雑な型をまとめて名前を付けられます。Union・Intersection・関数型・タプル型など、`interface` では書けない型も定義できます。',
          code: [
            {
              lang: 'TypeScript',
              code: `// 基本的な別名
type UserId = string;
type Point = { x: number; y: number };

// 関数型
type Comparator<T> = (a: T, b: T) => number;
const numCmp: Comparator<number> = (a, b) => a - b;

// 複合型
type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) return { ok: false, error: 'Division by zero' };
  return { ok: true, value: a / b };
}`,
            },
          ],
        },
        {
          id: 's5-recursive',
          name: '再帰型',
          level: 'basic',
          keywords: '再帰型 recursive ツリー JSON 自己参照',
          desc: '型エイリアスは自己参照（再帰型）が可能です。ツリー構造や JSON のような再帰的なデータ構造を表現できます。',
          code: [
            {
              lang: 'TypeScript',
              code: `// ツリー構造
type TreeNode<T> = {
  value: T;
  children: TreeNode<T>[];
};

const tree: TreeNode<number> = {
  value: 1,
  children: [
    { value: 2, children: [] },
    { value: 3, children: [{ value: 4, children: [] }] },
  ],
};

// JSON 型
type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };`,
            },
          ],
        },
        {
          id: 's5-template-literal',
          name: 'テンプレートリテラル型',
          level: 'basic',
          keywords: 'template literal テンプレートリテラル 文字列型 型操作',
          desc: 'テンプレートリテラル構文で文字列リテラル型を組み合わせた型を作れます。イベント名・CSSプロパティ・ルーティング等の文字列パターンを型安全に表現できます。',
          code: [
            {
              lang: 'TypeScript',
              code: `type Color = 'red' | 'green' | 'blue';
type ColorKey = \`bg-\${Color}\`; // "bg-red" | "bg-green" | "bg-blue"

type Size = 'sm' | 'md' | 'lg';
type ClassName = \`btn-\${Color}-\${Size}\`;
// "btn-red-sm" | "btn-red-md" | ... (9通り)

// getter/setter ペアの生成
type Getter<T extends string> = \`get\${Capitalize<T>}\`;
type PropNames = 'name' | 'age';
type Getters = Getter<PropNames>; // "getName" | "getAge"`,
            },
          ],
        },
        {
          id: 's5-satisfies',
          name: 'satisfies 演算子',
          level: 'basic',
          keywords: 'satisfies 型チェック 型推論 TS4.9 演算子',
          desc: '`satisfies` は「この値が型 T を満たすか」をチェックしつつ、変数の型は推論された具体的な型のままにします。`as` による型アサションと異なり型安全性を保ちます（TS 4.9+）。',
          code: [
            {
              lang: 'TypeScript',
              code: `type Colors = Record<string, string | [number, number, number]>;

// satisfies を使うと:
// - Colors の制約を検証しつつ
// - 各値の具体的な型（string か tuple か）が保たれる
const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
  blue: [0, 0, 255],
} satisfies Colors;

// palette.green は string 型（string | [...] ではない）
palette.green.toUpperCase(); // OK
// palette.red.toUpperCase(); // エラー: red は number[]

// as による型アサションとの違い
const palette2 = { red: [255, 0, 0] } as Colors;
palette2.red.toUpperCase(); // 型エラーにならない（危険）`,
            },
          ],
          warn: '`as Colors` のような型アサションでは過剰なプロパティがあってもエラーにならず、型の安全性が損なわれます。型の検証が目的なら `satisfies` を使ってください。',
        },
      ],
    },

    // ─────────────────────────────────────────────
    // s6: ジェネリクス
    // ─────────────────────────────────────────────
    {
      id: 's6',
      num: 6,
      title: 'ジェネリクス',
      level: 'basic',
      items: [
        {
          id: 's6-type-parameter',
          name: '型パラメータ <T>',
          level: 'basic',
          keywords: 'generics ジェネリクス 型パラメータ T 再利用',
          desc: '型パラメータ `<T>` を使うと、型を外部から注入できる汎用的なコードが書けます。呼び出し時に型引数を指定するか、引数から推論させます。',
          code: [
            {
              lang: 'TypeScript',
              code: `// ジェネリック関数
function identity<T>(value: T): T {
  return value;
}

identity<string>('hello'); // 明示的に型引数を渡す
identity(42);              // number と推論される

// ジェネリックな配列ユーティリティ
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

function zip<A, B>(a: A[], b: B[]): [A, B][] {
  return a.map((v, i) => [v, b[i]]);
}
zip([1, 2], ['a', 'b']); // [number, string][]`,
            },
          ],
        },
        {
          id: 's6-constraints',
          name: 'ジェネリクス制約（extends）',
          level: 'basic',
          keywords: 'extends 制約 constraint keyof ジェネリクス',
          desc: '`extends` で型パラメータに制約を付けると、特定の構造を持つ型のみを受け付けられます。`keyof` と組み合わせることでプロパティアクセスの型安全なユーティリティが作れます。',
          code: [
            {
              lang: 'TypeScript',
              code: `// length プロパティを持つ型のみ受け付ける
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}
longest('abc', 'de');    // string
longest([1, 2], [3]);    // number[]

// keyof を使った安全なプロパティ取得
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const user = { id: 1, name: 'Alice' };
getProperty(user, 'name');  // string
// getProperty(user, 'age'); // エラー: 'age' は keyof user でない`,
            },
          ],
        },
        {
          id: 's6-default-type',
          name: 'デフォルト型引数',
          level: 'basic',
          keywords: 'default type parameter デフォルト型引数 省略可能',
          desc: 'ジェネリクスに `= DefaultType` を付けると、型引数を省略したときのデフォルト型が指定できます。ライブラリの API 設計で便利です。',
          code: [
            {
              lang: 'TypeScript',
              code: `interface Response<T = unknown> {
  data: T;
  status: number;
}

// 型引数を省略すると T = unknown
const res1: Response = { data: 'hello', status: 200 };

// 型引数を指定
const res2: Response<{ id: number }> = {
  data: { id: 1 },
  status: 200,
};

// 複数型パラメータのデフォルト
type Pair<A, B = A> = { first: A; second: B };
const p1: Pair<number> = { first: 1, second: 2 }; // B = number
const p2: Pair<string, number> = { first: 'x', second: 1 };`,
            },
          ],
        },
        {
          id: 's6-generic-class',
          name: 'ジェネリッククラス・ジェネリックインターフェース',
          level: 'basic',
          keywords: 'generic class interface ジェネリッククラス スタック コンテナ',
          desc: 'クラスやインターフェースにも型パラメータを持たせられます。データ構造（スタック・キュー・リポジトリ）のような汎用コンテナで活用されます。',
          code: [
            {
              lang: 'TypeScript',
              code: `class Stack<T> {
  private items: T[] = [];

  push(item: T): void { this.items.push(item); }
  pop(): T | undefined { return this.items.pop(); }
  peek(): T | undefined { return this.items[this.items.length - 1]; }
  get size(): number { return this.items.length; }
}

const numStack = new Stack<number>();
numStack.push(1);
numStack.push(2);
numStack.pop(); // 2

// ジェネリックインターフェース
interface Repository<T, ID> {
  findById(id: ID): Promise<T | null>;
  save(entity: T): Promise<T>;
  delete(id: ID): Promise<void>;
}`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // s7: クラスとアクセス修飾子
    // ─────────────────────────────────────────────
    {
      id: 's7',
      num: 7,
      title: 'クラスとアクセス修飾子',
      level: 'basic',
      items: [
        {
          id: 's7-access-modifiers',
          name: 'アクセス修飾子',
          level: 'basic',
          keywords: 'public private protected readonly アクセス修飾子 クラス',
          desc: '`public`（デフォルト）は外部からアクセス可能、`private` はクラス内のみ、`protected` はクラスとサブクラス内のみアクセス可能です。`readonly` はコンストラクタ内でのみ代入できます。',
          code: [
            {
              lang: 'TypeScript',
              code: `class BankAccount {
  private balance: number = 0;
  readonly id: string;
  public owner: string;

  constructor(id: string, owner: string) {
    this.id = id;
    this.owner = owner;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  get currentBalance(): number { return this.balance; }
}

const acc = new BankAccount('001', 'Alice');
// acc.balance; // エラー: private
acc.owner;      // OK: public
acc.currentBalance; // OK: getter`,
            },
          ],
          warn: 'TypeScript の `private` はコンパイル時のチェックのみです。実行時は JavaScript のオブジェクトなのでアクセスできます。真のプライベートが必要な場合は ES2022 の `#` プライベートフィールドを使ってください。',
        },
        {
          id: 's7-parameter-properties',
          name: 'コンストラクタの省略記法（parameter properties）',
          level: 'basic',
          keywords: 'parameter properties 省略記法 コンストラクタ ショートハンド',
          desc: 'コンストラクタ引数にアクセス修飾子または `readonly` を付けると、プロパティ宣言と代入を自動生成します（parameter properties）。ボイラープレートを大幅に削減できます。',
          code: [
            {
              lang: 'TypeScript',
              code: `// 従来の書き方
class UserOld {
  public name: string;
  private age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

// parameter properties による省略
class User {
  constructor(
    public name: string,
    private age: number,
    readonly id: string = crypto.randomUUID(),
  ) {}

  info(): string {
    return \`\${this.name} (\${this.age})\`;
  }
}

const u = new User('Alice', 30);
u.name; // 'Alice'`,
            },
          ],
        },
        {
          id: 's7-abstract',
          name: 'abstract クラス・抽象メソッド',
          level: 'basic',
          keywords: 'abstract 抽象クラス 抽象メソッド 継承 テンプレートメソッド',
          desc: '`abstract` クラスは直接インスタンス化できないクラスで、共通の実装とサブクラスに任せる抽象メソッドを定義できます。テンプレートメソッドパターンの実装に使われます。',
          code: [
            {
              lang: 'TypeScript',
              code: `abstract class Shape {
  abstract area(): number;       // サブクラスで実装必須
  abstract perimeter(): number;

  // 共通の具体メソッド
  describe(): string {
    return \`Area: \${this.area().toFixed(2)}, Perimeter: \${this.perimeter().toFixed(2)}\`;
  }
}

class Circle extends Shape {
  constructor(private radius: number) { super(); }
  area(): number { return Math.PI * this.radius ** 2; }
  perimeter(): number { return 2 * Math.PI * this.radius; }
}

// new Shape(); // エラー: abstract クラスはインスタンス化不可
new Circle(5).describe();`,
            },
          ],
        },
        {
          id: 's7-implements',
          name: 'implements によるインターフェース実装',
          level: 'basic',
          keywords: 'implements インターフェース実装 クラス 構造的型付け',
          desc: '`implements` でクラスがインターフェースを満たすことを宣言します。複数のインターフェースを実装でき、クラスが契約（contract）を守ることを型レベルで強制できます。',
          code: [
            {
              lang: 'TypeScript',
              code: `interface Serializable {
  serialize(): string;
  deserialize(data: string): this;
}

interface Cloneable<T> {
  clone(): T;
}

class Config implements Serializable, Cloneable<Config> {
  constructor(private data: Record<string, unknown> = {}) {}

  serialize(): string { return JSON.stringify(this.data); }
  deserialize(json: string): this {
    (this.data as Record<string, unknown>) = JSON.parse(json);
    return this;
  }
  clone(): Config { return new Config({ ...this.data }); }
}`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // s8: 型ガード・型 narrowing
    // ─────────────────────────────────────────────
    {
      id: 's8',
      num: 8,
      title: '型ガード・型 narrowing',
      level: 'basic',
      items: [
        {
          id: 's8-typeof-instanceof',
          name: 'typeof・instanceof ガード',
          level: 'basic',
          keywords: 'typeof instanceof 型ガード narrowing 絞り込み',
          desc: '`typeof` はプリミティブの種別判定、`instanceof` はオブジェクトのクラス判定に使います。条件ブランチ内で TypeScript が自動的に型を絞り込みます。',
          code: [
            {
              lang: 'TypeScript',
              code: `function process(value: string | number | Date) {
  if (typeof value === 'string') {
    return value.toUpperCase(); // string
  }
  if (typeof value === 'number') {
    return value.toFixed(2);   // number
  }
  return value.toISOString();  // Date
}

class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

function handle(err: Error) {
  if (err instanceof ApiError) {
    console.error(err.statusCode, err.message); // ApiError
  } else {
    console.error(err.message); // Error
  }
}`,
            },
          ],
        },
        {
          id: 's8-custom-guard',
          name: 'カスタム型ガード（is キーワード）',
          level: 'basic',
          keywords: 'custom type guard is キーワード ユーザー定義 predicate',
          desc: '戻り値型に `value is Type` を指定するとカスタム型ガード関数になります。条件ブランチ内で TypeScript が型を絞り込みます。',
          code: [
            {
              lang: 'TypeScript',
              code: `interface Cat { kind: 'cat'; meow(): void }
interface Dog { kind: 'dog'; bark(): void }

// カスタム型ガード
function isCat(animal: Cat | Dog): animal is Cat {
  return animal.kind === 'cat';
}

function interact(animal: Cat | Dog) {
  if (isCat(animal)) {
    animal.meow(); // Cat
  } else {
    animal.bark(); // Dog
  }
}

// nullチェック用ガード
function isNonNull<T>(val: T | null | undefined): val is T {
  return val != null;
}

const items = [1, null, 3, undefined, 5];
const nums = items.filter(isNonNull); // number[]`,
            },
          ],
        },
        {
          id: 's8-type-assertion',
          name: 'as 型アサション（危険な使い方）',
          level: 'basic',
          keywords: 'as 型アサション type assertion 危険 キャスト',
          desc: '`as` は TypeScript の型チェックを強制的に上書きします。実際の値の型と異なる型に変換すると実行時エラーの原因になるため、使用は最小限にとどめてください。',
          code: [
            {
              lang: 'TypeScript',
              code: `// 安全な使用例（DOM 操作）
const input = document.getElementById('name') as HTMLInputElement;
input.value = 'Alice'; // InputElement として扱う

// 危険な使用例
const x = {} as { name: string };
// x.name は実行時 undefined だが、型では string になっている
// x.name.toUpperCase(); // 実行時エラー

// double assertion（より危険）
const n = 'hello' as unknown as number;

// @ts-expect-error でコンパイルエラーを意図的に抑制
// @ts-expect-error: 意図してエラーを起こす
const bad: number = 'not a number';`,
            },
          ],
          warn: '`as` はコンパイル時のチェックを無効にするだけで、実行時に型変換は行われません。`unknown` を経由する二重アサション（`as unknown as T`）は特に危険で、型システムを完全に迂回します。',
        },
        {
          id: 's8-non-null-assertion',
          name: '! 非 null アサション',
          level: 'basic',
          keywords: 'non-null assertion ! 非null アサション 強制 nullish',
          desc: '`!` を値の末尾に付けると `null`/`undefined` でないことをコンパイラに伝えます。実際に `null` だった場合は実行時エラーになります。',
          code: [
            {
              lang: 'TypeScript',
              code: `// DOM アクセス
const el = document.getElementById('app')!; // null でないことを保証
el.style.display = 'block';

// Map からの取得
const map = new Map<string, number>([['a', 1]]);
const val = map.get('a')!; // undefined でないことを保証
val.toFixed(2);

// 避けるべきパターン: 安全なチェックの方が望ましい
const val2 = map.get('a');
if (val2 !== undefined) {
  val2.toFixed(2); // 型安全
}`,
            },
          ],
          warn: '`!` は型チェックを迂回するため、値が実際に `null` や `undefined` の場合に実行時エラーになります。可能な限り `if` チェックや `??` によるフォールバックを使ってください。',
        },
      ],
    },

    // ─────────────────────────────────────────────
    // s9: Utility Types
    // ─────────────────────────────────────────────
    {
      id: 's9',
      num: 9,
      title: 'Utility Types',
      level: 'advanced',
      items: [
        {
          id: 's9-partial-required-readonly',
          name: 'Partial・Required・Readonly',
          level: 'advanced',
          keywords: 'Partial Required Readonly utility type オプション 必須 不変',
          desc: '`Partial<T>` は全プロパティをオプションに、`Required<T>` は全プロパティを必須に、`Readonly<T>` は全プロパティを読み取り専用にします。',
          code: [
            {
              lang: 'TypeScript',
              code: `interface User {
  id: number;
  name: string;
  email?: string;
}

// Partial: 全プロパティをオプションに（更新用）
function updateUser(id: number, updates: Partial<User>): User {
  const current = {} as User; // 仮
  return { ...current, ...updates };
}
updateUser(1, { name: 'Bob' }); // id不要

// Required: 全プロパティを必須に
type StrictUser = Required<User>;
// { id: number; name: string; email: string }

// Readonly: 変更不可
const frozen: Readonly<User> = { id: 1, name: 'Alice' };
// frozen.name = 'Bob'; // エラー`,
            },
          ],
        },
        {
          id: 's9-pick-omit-record',
          name: 'Pick・Omit・Record',
          level: 'advanced',
          keywords: 'Pick Omit Record utility type 抽出 除外 辞書',
          desc: '`Pick<T, K>` はプロパティの抜き出し、`Omit<T, K>` は指定プロパティの除外、`Record<K, V>` はキー・バリュー型の辞書生成に使います。',
          code: [
            {
              lang: 'TypeScript',
              code: `interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Pick: 特定プロパティのみ抽出
type PublicUser = Pick<User, 'id' | 'name' | 'email'>;

// Omit: 特定プロパティを除外
type SafeUser = Omit<User, 'password'>;

// Record: キーと値の型でオブジェクト型を生成
type UserId = number;
type UserMap = Record<UserId, User>;

// ステータスマップの例
type Status = 'loading' | 'success' | 'error';
type StatusConfig = Record<Status, { label: string; color: string }>;`,
            },
          ],
        },
        {
          id: 's9-exclude-extract-nonnullable',
          name: 'Exclude・Extract・NonNullable',
          level: 'advanced',
          keywords: 'Exclude Extract NonNullable union 型演算 フィルタ',
          desc: '`Exclude<T, U>` は Union から型を取り除き、`Extract<T, U>` は合致する型だけ残します。`NonNullable<T>` は `null`/`undefined` を除去します。',
          code: [
            {
              lang: 'TypeScript',
              code: `type AllTypes = string | number | boolean | null | undefined;

// Exclude: null と undefined を除く
type Primitive = Exclude<AllTypes, null | undefined>;
// string | number | boolean

// Extract: 文字列か数値のみ
type StrOrNum = Extract<AllTypes, string | number>;
// string | number

// NonNullable: null/undefined を除去
type NonNull = NonNullable<string | null | undefined>; // string

// 実用例: イベント名のフィルタリング
type EventNames = 'click' | 'focus' | 'mouseenter' | 'touchstart';
type MouseEvents = Extract<EventNames, \`\${'mouse'}\${string}\`>;
// "mouseenter"`,
            },
          ],
        },
        {
          id: 's9-returntype-parameters',
          name: 'ReturnType・Parameters・InstanceType',
          level: 'advanced',
          keywords: 'ReturnType Parameters InstanceType 関数型 クラス 型抽出',
          desc: '`ReturnType<F>` は関数の戻り値型、`Parameters<F>` は引数の型をタプルで、`InstanceType<C>` はコンストラクタからインスタンス型を取り出します。',
          code: [
            {
              lang: 'TypeScript',
              code: `function fetchUser(id: number): Promise<{ name: string; age: number }> {
  return Promise.resolve({ name: 'Alice', age: 30 });
}

// ReturnType: 戻り値型
type FetchResult = ReturnType<typeof fetchUser>;
// Promise<{ name: string; age: number }>

// Awaited<ReturnType<...>> で Promise を解決
type UserData = Awaited<ReturnType<typeof fetchUser>>;
// { name: string; age: number }

// Parameters: 引数型のタプル
type FetchParams = Parameters<typeof fetchUser>; // [id: number]

// InstanceType: クラスのインスタンス型
class MyService {
  run(): void { console.log('running'); }
}
type ServiceInstance = InstanceType<typeof MyService>;
// MyService`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // s10: Mapped Types
    // ─────────────────────────────────────────────
    {
      id: 's10',
      num: 10,
      title: 'Mapped Types',
      level: 'advanced',
      items: [
        {
          id: 's10-basic',
          name: 'Mapped Types の基本形',
          level: 'advanced',
          keywords: 'mapped type マップ型 keyof in 変換',
          desc: '`{ [K in keyof T]: ... }` で既存の型の全プロパティを変換した新しい型を作れます。Utility Types（Partial, Readonlyなど）の多くがこれで実装されています。',
          code: [
            {
              lang: 'TypeScript',
              code: `interface User {
  id: number;
  name: string;
  email: string;
}

// 全プロパティを string に変換
type Stringified<T> = { [K in keyof T]: string };
type StringUser = Stringified<User>;
// { id: string; name: string; email: string }

// 全プロパティを関数に変換
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};
type UserGetters = Getters<User>;
// { getId: () => number; getName: () => string; ... }`,
            },
          ],
        },
        {
          id: 's10-modifiers',
          name: '+/- による修飾子の追加・削除',
          level: 'advanced',
          keywords: '+ - 修飾子 optional readonly 追加 削除 mapped type',
          desc: 'Mapped Types では `+`/`-` で修飾子を追加・削除できます。`-?` でオプション性を除去し、`+readonly` で読み取り専用を追加できます。',
          code: [
            {
              lang: 'TypeScript',
              code: `interface MaybeUser {
  id?: number;
  name?: string;
  readonly email: string;
}

// -? で全プロパティを必須化（Required<T> の実装）
type RequiredUser = { [K in keyof MaybeUser]-?: MaybeUser[K] };

// -readonly で readonly を解除
type MutableUser = { -readonly [K in keyof MaybeUser]: MaybeUser[K] };

// +? で全プロパティをオプションに（Partial<T> の実装）
type PartialUser = { [K in keyof MaybeUser]+?: MaybeUser[K] };

// +readonly で全プロパティを読み取り専用に
type FrozenUser = { +readonly [K in keyof MaybeUser]: MaybeUser[K] };`,
            },
          ],
        },
        {
          id: 's10-key-remapping',
          name: 'as によるキーの再マッピング',
          level: 'advanced',
          keywords: 'as key remapping キー再マッピング TS4.1 フィルタ',
          desc: 'Mapped Types の `as` 句でキーを変換・フィルタできます（TS 4.1+）。`never` を返すとそのキーを除外できます。',
          code: [
            {
              lang: 'TypeScript',
              code: `interface Model {
  id: number;
  name: string;
  _internalFlag: boolean;
}

// _ で始まるキーを除外
type PublicModel = {
  [K in keyof Model as K extends \`_\${string}\` ? never : K]: Model[K];
};
// { id: number; name: string }

// キーを大文字に変換
type UpperModel = {
  [K in keyof Model as Uppercase<string & K>]: Model[K];
};
// { ID: number; NAME: string; _INTERNALFLAG: boolean }`,
            },
          ],
        },
        {
          id: 's10-homomorphic',
          name: 'ホモモルフィックとそうでない Mapped Type',
          level: 'advanced',
          keywords: 'homomorphic ホモモルフィック keyof 修飾子保存 mapped type',
          desc: '`keyof T` を使う Mapped Type は「ホモモルフィック」と呼ばれ、元の型の optional/readonly 修飾子が保存されます。任意のキー型を使う場合は修飾子が保存されません。',
          code: [
            {
              lang: 'TypeScript',
              code: `interface Opt {
  a?: string;
  readonly b: number;
}

// ホモモルフィック: keyof T を使う → 修飾子が保存される
type Wrapped<T> = { [K in keyof T]: T[K][] };
type WrappedOpt = Wrapped<Opt>;
// { a?: string[]; readonly b: number[] }  ← ?, readonly が保存

// 非ホモモルフィック: 任意のキー型 → 修飾子は引き継がれない
type NonHomo<T> = { [K in keyof T & string]: T[K] };
type NonHomoOpt = NonHomo<Opt>;
// { a: string; b: number }  ← ? が消える（注意！）`,
            },
          ],
          warn: '非ホモモルフィックな Mapped Type では元の型の `?` や `readonly` 修飾子が失われます。修飾子を保持したい場合は必ず `keyof T` の形を使ってください。',
        },
      ],
    },

    // ─────────────────────────────────────────────
    // s11: Conditional Types
    // ─────────────────────────────────────────────
    {
      id: 's11',
      num: 11,
      title: 'Conditional Types',
      level: 'advanced',
      items: [
        {
          id: 's11-basic',
          name: 'Conditional Types の基本',
          level: 'advanced',
          keywords: 'conditional type 条件型 extends ? : 型の分岐',
          desc: '`T extends U ? X : Y` で型レベルの条件分岐ができます。型に応じて異なる型を返す汎用的なユーティリティ型を作れます。',
          code: [
            {
              lang: 'TypeScript',
              code: `// 基本形
type IsString<T> = T extends string ? true : false;
type A = IsString<string>;  // true
type B = IsString<number>;  // false

// 型の変換
type ToArray<T> = T extends unknown[] ? T : T[];
type C = ToArray<string>;    // string[]
type D = ToArray<string[]>;  // string[]

// Flatten: 配列の要素型を取り出す
type Flatten<T> = T extends (infer U)[] ? U : T;
type E = Flatten<string[]>;   // string
type F = Flatten<number>;     // number（変換なし）`,
            },
          ],
        },
        {
          id: 's11-distributive',
          name: '分配条件型',
          level: 'advanced',
          keywords: 'distributive conditional 分配 Union 各メンバーに適用',
          desc: '型パラメータが Union のとき、Conditional Type は Union の各メンバーに分配されて適用されます（分配条件型）。これは意図せず起きることもあるため注意が必要です。',
          code: [
            {
              lang: 'TypeScript',
              code: `type IsString<T> = T extends string ? true : false;

// Union に適用すると各メンバーに分配される
type G = IsString<string | number>; // true | false

// 分配を防ぐには型パラメータをタプルで包む
type IsStringNoDistribute<T> = [T] extends [string] ? true : false;
type H = IsStringNoDistribute<string | number>; // false（分配しない）

// 分配を利用した Exclude の実装
type MyExclude<T, U> = T extends U ? never : T;
type I = MyExclude<'a' | 'b' | 'c', 'b'>; // 'a' | 'c'`,
            },
          ],
          warn: '分配条件型は「型パラメータが裸の（タプルや配列でラップされていない）Union 型」のときに自動的に発生します。意図しない分配が起きる場合は `[T] extends [U]` でラップして無効化できます。',
        },
        {
          id: 's11-infer',
          name: 'infer キーワード',
          level: 'advanced',
          keywords: 'infer 型抽出 推論 ReturnType Awaited',
          desc: '`infer` は Conditional Types の中で型を「推論・抽出」するキーワードです。関数の戻り値型・引数型・Promise の解決型など、既存型から部分的な型を取り出せます。',
          code: [
            {
              lang: 'TypeScript',
              code: `// 関数の戻り値型を抽出（ReturnType の実装）
type MyReturnType<T> = T extends (...args: never[]) => infer R ? R : never;
type R1 = MyReturnType<() => string>; // string

// Promise の解決型を抽出（Awaited の実装）
type MyAwaited<T> =
  T extends null | undefined ? T :
  T extends object & { then(onfulfilled: infer F, ...args: infer _): unknown }
    ? F extends (value: infer V, ...args: infer _) => unknown
      ? MyAwaited<V>
      : never
    : T;
type R2 = MyAwaited<Promise<string>>; // string

// 配列の最初の要素の型
type Head<T extends unknown[]> = T extends [infer H, ...unknown[]] ? H : never;
type R3 = Head<[string, number, boolean]>; // string`,
            },
          ],
        },
        {
          id: 's11-patterns',
          name: 'よく使うパターン',
          level: 'advanced',
          keywords: 'Flatten Awaited DeepPartial 実用パターン conditional',
          desc: '実務でよく登場する Conditional Types のパターンをまとめます。`Awaited<T>` や再帰的な `DeepReadonly<T>` などが典型例です。',
          code: [
            {
              lang: 'TypeScript',
              code: `// DeepReadonly: ネストされた全プロパティを readonly に
type DeepReadonly<T> = T extends (infer U)[]
  ? ReadonlyArray<DeepReadonly<U>>
  : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;

interface Config { db: { host: string; port: number }; debug: boolean }
type FrozenConfig = DeepReadonly<Config>;
// { readonly db: { readonly host: string; readonly port: number }; readonly debug: boolean }

// PromiseType: Promise を解決した型
type PromiseType<T> = T extends Promise<infer U> ? U : T;
type Resolved = PromiseType<Promise<{ id: number }>>; // { id: number }`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // s12: Template Literal Types
    // ─────────────────────────────────────────────
    {
      id: 's12',
      num: 12,
      title: 'Template Literal Types',
      level: 'advanced',
      items: [
        {
          id: 's12-basic',
          name: 'テンプレートリテラル型の基本構文',
          level: 'advanced',
          keywords: 'template literal type テンプレートリテラル型 文字列型 結合',
          desc: 'バッククォートと `${}` で文字列リテラル型を組み合わせた型を作れます。Union 型を埋め込むと自動的に全組み合わせが展開されます。',
          code: [
            {
              lang: 'TypeScript',
              code: `type Greeting = \`Hello, \${string}!\`;
const g: Greeting = 'Hello, Alice!'; // OK
// const g2: Greeting = 'Hi, Bob!'; // エラー

// Union の組み合わせ展開
type Fruit = 'apple' | 'orange';
type Color = 'red' | 'green';
type FruitColor = \`\${Color}-\${Fruit}\`;
// "red-apple" | "red-orange" | "green-apple" | "green-orange"

// CSSクラス名の型
type Spacing = 0 | 1 | 2 | 4 | 8;
type SpacingClass = \`m-\${Spacing}\` | \`p-\${Spacing}\`;`,
            },
          ],
        },
        {
          id: 's12-string-manipulation',
          name: 'Uppercase・Lowercase・Capitalize・Uncapitalize',
          level: 'advanced',
          keywords: 'Uppercase Lowercase Capitalize Uncapitalize 文字列操作 組み込み型',
          desc: 'TypeScript 組み込みの文字列操作ユーティリティ型です。テンプレートリテラル型と組み合わせると動的な命名規則に対応できます。',
          code: [
            {
              lang: 'TypeScript',
              code: `type U = Uppercase<'hello'>;     // "HELLO"
type L = Lowercase<'HELLO'>;     // "hello"
type C = Capitalize<'hello'>;    // "Hello"
type Un = Uncapitalize<'Hello'>; // "hello"

// camelCase → PascalCase
type ToPascal<T extends string> = Capitalize<T>;

// プロパティ名を大文字に変換したオブジェクト型
type UpperKeys<T> = {
  [K in keyof T as Uppercase<string & K>]: T[K];
};
interface Env { nodeEnv: string; port: number }
type UpperEnv = UpperKeys<Env>;
// { NODE_ENV: string; PORT: number }`,
            },
          ],
        },
        {
          id: 's12-event-pattern',
          name: 'イベント名の型安全パターン',
          level: 'advanced',
          keywords: 'event handler on イベント名 型安全 Capitalize テンプレートリテラル',
          desc: '`on${Capitalize<EventName>}` パターンを使うと、イベント名からハンドラー名を型安全に生成できます。',
          code: [
            {
              lang: 'TypeScript',
              code: `type Events = 'click' | 'focus' | 'blur' | 'mouseenter';
type EventHandlers = {
  [E in Events as \`on\${Capitalize<E>}\`]: (event: Event) => void;
};
// { onClick: ...; onFocus: ...; onBlur: ...; onMouseenter: ... }

// 型安全なイベントエミッター
type Listener<T extends Record<string, unknown>> = {
  on<K extends string & keyof T>(
    event: K,
    handler: (payload: T[K]) => void,
  ): void;
};

type AppEvents = { login: { userId: string }; logout: {} };
declare const emitter: Listener<AppEvents>;
emitter.on('login', ({ userId }) => console.log(userId));`,
            },
          ],
        },
        {
          id: 's12-string-path',
          name: '文字列操作での活用例（ドットパス型）',
          level: 'advanced',
          keywords: 'dot path ドットパス 型安全 ネスト アクセス',
          desc: '再帰的なテンプレートリテラル型とジェネリクスを組み合わせると、ネストしたオブジェクトのドットパスを型安全に表現できます。',
          code: [
            {
              lang: 'TypeScript',
              code: `// ネストしたオブジェクトの全ドットパスを生成
type Paths<T, P extends string = ''> = {
  [K in keyof T & string]:
    T[K] extends object
      ? P extends '' ? Paths<T[K], K> : Paths<T[K], \`\${P}.\${K}\`>
      : P extends '' ? K : \`\${P}.\${K}\`;
}[keyof T & string];

interface Config {
  db: { host: string; port: number };
  app: { name: string };
}

type ConfigPath = Paths<Config>;
// "db.host" | "db.port" | "app.name"`,
            },
          ],
          warn: 'ドットパス型のような再帰的テンプレートリテラル型は型チェック時間が増大します。深いネストや広い型に適用する場合はパフォーマンスに注意してください。',
        },
      ],
    },

    // ─────────────────────────────────────────────
    // s13: satisfies・const assertion・const 型パラメータ
    // ─────────────────────────────────────────────
    {
      id: 's13',
      num: 13,
      title: 'satisfies・const assertion・const 型パラメータ',
      level: 'advanced',
      items: [
        {
          id: 's13-as-const',
          name: 'as const（リテラル型として固定）',
          level: 'advanced',
          keywords: 'as const リテラル型 const assertion 固定 immutable',
          desc: '`as const` を付けると、値がリテラル型として推論され、すべてのプロパティが `readonly` になります。マジックナンバーや設定オブジェクトの型安全な定数化に使われます。',
          code: [
            {
              lang: 'TypeScript',
              code: `// as const なし: string, number として広く推論される
const configA = { host: 'localhost', port: 3000 };
// { host: string; port: number }

// as const あり: リテラル型・readonly に固定
const configB = { host: 'localhost', port: 3000 } as const;
// { readonly host: "localhost"; readonly port: 3000 }

// 配列も readonly タプルになる
const ROUTES = ['/', '/about', '/contact'] as const;
// readonly ["/", "/about", "/contact"]

type Route = typeof ROUTES[number]; // "/" | "/about" | "/contact"`,
            },
          ],
        },
        {
          id: 's13-satisfies',
          name: 'satisfies 演算子',
          level: 'advanced',
          keywords: 'satisfies 型チェック 型推論 TS4.9 演算子',
          desc: '`satisfies` は値が型を満たすことを検証しつつ、推論された具体的な型を保持します。`as` 型アサションと異なり型安全性を損なわずに型チェックできます（TS 4.9+）。',
          code: [
            {
              lang: 'TypeScript',
              code: `type Palette = Record<string, string | readonly [number, number, number]>;

const colors = {
  red: [255, 0, 0],
  green: '#00ff00',
} satisfies Palette;

// colors.green は string（string | readonly [...] でなく）
colors.green.toUpperCase(); // OK
// colors.red.toUpperCase(); // エラー: red は number[]

// as const と組み合わせ
const config = {
  port: 3000,
  host: 'localhost',
} satisfies Record<string, string | number> as const;
// port: 3000（number ではなく 3000 型）`,
            },
          ],
        },
        {
          id: 's13-const-type-parameter',
          name: 'const 型パラメータ（TS 5.0+）',
          level: 'advanced',
          keywords: 'const type parameter TS5.0 リテラル推論 型パラメータ',
          desc: '`<const T>` とすると、型引数が `as const` を付けたように推論されます（TS 5.0+）。配列や文字列をそのままリテラル型として推論させたいときに便利です。',
          code: [
            {
              lang: 'TypeScript',
              code: `// 通常: T は string[] と推論
function firstNormal<T extends string[]>(arr: T): T[0] {
  return arr[0];
}
const r1 = firstNormal(['a', 'b']); // string

// const 型パラメータ: T は readonly ['a', 'b'] と推論
function firstConst<const T extends readonly string[]>(arr: T): T[0] {
  return arr[0];
}
const r2 = firstConst(['a', 'b']); // "a"（リテラル型）

// ルーティングの型安全な生成
function createRoutes<const T extends readonly string[]>(routes: T) {
  return routes;
}
const routes = createRoutes(['/home', '/about']);
type Routes = typeof routes[number]; // "/home" | "/about"`,
            },
          ],
        },
        {
          id: 's13-readonly-array',
          name: 'readonly 配列・readonly タプル',
          level: 'advanced',
          keywords: 'readonly array tuple 配列 タプル 不変 ReadonlyArray',
          desc: '`readonly T[]` または `ReadonlyArray<T>` で変更不可の配列型を作れます。`as const` で生成された配列は自動的に readonly タプルになります。',
          code: [
            {
              lang: 'TypeScript',
              code: `// readonly 配列
function processItems(items: readonly string[]): void {
  // items.push('x'); // エラー: 変更不可
  items.forEach(console.log);
}

// ReadonlyArray<T>（同等）
function processItems2(items: ReadonlyArray<string>): void {}

// readonly タプル
function swap<T extends readonly [unknown, unknown]>(
  pair: T
): readonly [T[1], T[0]] {
  return [pair[1], pair[0]];
}
swap(['a', 1] as const); // readonly [1, "a"]`,
            },
          ],
          warn: '`readonly T[]` は `T[]` のサブタイプではありません（逆方向）。`T[]` を期待する場所に `readonly T[]` を渡すとエラーになります。引数の型を可能な限り `readonly` にするのが安全です。',
        },
      ],
    },

    // ─────────────────────────────────────────────
    // s14: モジュール・名前空間・宣言ファイル
    // ─────────────────────────────────────────────
    {
      id: 's14',
      num: 14,
      title: 'モジュール・名前空間・宣言ファイル',
      level: 'advanced',
      items: [
        {
          id: 's14-import-type',
          name: 'ES Modules の型（import type）',
          level: 'advanced',
          keywords: 'import type ES module 型インポート isolatedModules',
          desc: '`import type` は型のみをインポートし、実行時にはコードが生成されません。`isolatedModules` や `verbatimModuleSyntax` が有効な環境で必須です。',
          code: [
            {
              lang: 'TypeScript',
              code: `// 型のみのインポート（実行時に消える）
import type { User, ApiResponse } from './types';

// 通常のインポートと型インポートの混在
import { fetchUser } from './api';
import type { FetchOptions } from './api';

// export type
export type { User };

// inline type import（TS 4.5+）
import { type Config, createConfig } from './config';`,
            },
          ],
          warn: '`verbatimModuleSyntax` が有効な場合、型として使われるインポートには必ず `import type` を使う必要があります。通常の `import` で型のみを使うとエラーになります。',
        },
        {
          id: 's14-declare-module',
          name: 'declare module で外部ライブラリを拡張',
          level: 'advanced',
          keywords: 'declare module 型拡張 augmentation モジュール拡張 ambient',
          desc: '`declare module` を使うと既存のモジュールの型を拡張（Module Augmentation）できます。Express の `Request` 型にカスタムプロパティを追加する場合などに使われます。',
          code: [
            {
              lang: 'TypeScript',
              code: `// express の Request 型を拡張
import 'express';

declare module 'express' {
  interface Request {
    userId?: string;
    sessionData?: Record<string, unknown>;
  }
}

// 使用側
import { Request, Response } from 'express';
function handler(req: Request, res: Response) {
  const userId = req.userId; // 型安全にアクセス可能
}`,
            },
          ],
        },
        {
          id: 's14-dts',
          name: '.d.ts 宣言ファイルの書き方',
          level: 'advanced',
          keywords: '.d.ts 宣言ファイル ambient declaration declare 型定義',
          desc: '`.d.ts` ファイルに `declare` キーワードを使ってモジュールの型情報を宣言します。JavaScript ライブラリに型を追加する際や、グローバル変数の型定義に使います。',
          code: [
            {
              lang: 'TypeScript',
              code: `// my-lib.d.ts
declare module 'my-lib' {
  export interface Options {
    timeout?: number;
    retries?: number;
  }

  export function request(url: string, options?: Options): Promise<Response>;

  export class Client {
    constructor(baseUrl: string);
    get<T>(path: string): Promise<T>;
    post<T>(path: string, body: unknown): Promise<T>;
  }

  export default Client;
}

// グローバル変数の宣言
declare const __APP_VERSION__: string;
declare function gtag(command: string, ...args: unknown[]): void;`,
            },
          ],
        },
        {
          id: 's14-atypes',
          name: '@types パッケージの仕組み',
          level: 'advanced',
          keywords: '@types DefinitelyTyped 型定義パッケージ npm typeRoots',
          desc: '`@types/xxx` は DefinitelyTyped で管理されるコミュニティ型定義パッケージです。TypeScript はデフォルトで `node_modules/@types` を自動認識します。`tsconfig.json` の `types`/`typeRoots` で制御できます。',
          code: [
            {
              lang: 'TypeScript',
              code: `// インストール例
// npm install -D @types/node @types/express

// tsconfig.json での制御
// {
//   "compilerOptions": {
//     "typeRoots": ["./node_modules/@types", "./types"],
//     "types": ["node"]  // node のみ自動インクルード
//   }
// }

// 型定義のない JS ライブラリに即席の型を付ける
// src/types/some-untyped-lib.d.ts
declare module 'some-untyped-lib' {
  const lib: { init(): void; doSomething(v: string): void };
  export default lib;
}`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // s15: tsconfig 設定
    // ─────────────────────────────────────────────
    {
      id: 's15',
      num: 15,
      title: 'tsconfig 設定',
      level: 'advanced',
      items: [
        {
          id: 's15-compiler-options',
          name: '重要なコンパイラオプション',
          level: 'advanced',
          keywords: 'tsconfig compilerOptions strict target module paths 設定',
          desc: '`strict` で型チェックを最大化し、`target` で出力 JS バージョン、`module` でモジュール形式を指定します。`paths` でモジュールのエイリアスを設定できます。',
          code: [
            {
              lang: 'TypeScript',
              code: `// tsconfig.json の主要設定例
{
  "compilerOptions": {
    "target": "ES2022",          // 出力 JS のバージョン
    "module": "NodeNext",        // モジュール形式
    "moduleResolution": "NodeNext",
    "lib": ["ES2022", "DOM"],    // 使用可能なライブラリ型
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,              // 全 strict チェックを有効に
    "esModuleInterop": true,     // CommonJS の default import
    "skipLibCheck": true,        // .d.ts の型チェックをスキップ
    "paths": {
      "@/*": ["./src/*"]         // パスエイリアス
    }
  }
}`,
            },
          ],
        },
        {
          id: 's15-strict-mode',
          name: 'strict モードに含まれるチェック',
          level: 'advanced',
          keywords: 'strict strictNullChecks noImplicitAny strictFunctionTypes strict mode',
          desc: '`strict: true` は複数の厳格チェックを一括有効化します。各チェックの意味を理解して適切に有効化することが重要です。',
          code: [
            {
              lang: 'TypeScript',
              code: `// strict: true は以下を全て有効にする
// - strictNullChecks: null/undefined を別の型として扱う
// - noImplicitAny: 暗黙の any を禁止
// - strictFunctionTypes: 関数型の反変チェック
// - strictBindCallApply: bind/call/apply の型チェック
// - strictPropertyInitialization: クラスプロパティの初期化チェック
// - noImplicitThis: this の型推論を強制
// - alwaysStrict: 各ファイルに 'use strict' を追加
// - useUnknownInCatchVariables (TS 4.4+): catch 変数を unknown に

// noImplicitAny の例
function bad(x) { return x; }     // エラー: x は any
function good(x: unknown) { return x; } // OK`,
            },
          ],
        },
        {
          id: 's15-isolated-modules',
          name: 'isolatedModules・verbatimModuleSyntax',
          level: 'advanced',
          keywords: 'isolatedModules verbatimModuleSyntax esbuild バンドラー transpile',
          desc: '`isolatedModules` は各ファイルを独立してトランスパイルできることを保証します（esbuild/SWC との互換性）。`verbatimModuleSyntax` はより厳格な `import type` の強制を行います（TS 5.0+）。',
          code: [
            {
              lang: 'TypeScript',
              code: `// isolatedModules: true が有効な場合
// 型のみの export は 'export type' にする必要がある
// export { SomeType }; // エラー
export type { SomeType }; // OK

// verbatimModuleSyntax: true が有効な場合
// 型インポートは 'import type' にする必要がある
// import { SomeType } from './module'; // エラー（型のみなら）
import type { SomeType } from './module'; // OK
import { someValue, type AnotherType } from './module'; // OK`,
            },
          ],
        },
        {
          id: 's15-project-references',
          name: 'Project References（モノレポ構成）',
          level: 'advanced',
          keywords: 'project references monorepo モノレポ composite references',
          desc: '複数のパッケージからなるモノレポで、各パッケージの TypeScript プロジェクトを `references` でリンクできます。インクリメンタルビルドが効き、型が別パッケージから参照できます。',
          code: [
            {
              lang: 'TypeScript',
              code: `// packages/core/tsconfig.json
{
  "compilerOptions": {
    "composite": true,   // Project Reference に必須
    "declaration": true,
    "outDir": "./dist"
  }
}

// apps/web/tsconfig.json
{
  "compilerOptions": { "outDir": "./dist" },
  "references": [
    { "path": "../../packages/core" }
  ]
}

// ビルドコマンド: ルートから全パッケージをビルド
// tsc --build --verbose`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // s16: 実践的な型パターン
    // ─────────────────────────────────────────────
    {
      id: 's16',
      num: 16,
      title: '実践的な型パターン',
      level: 'advanced',
      items: [
        {
          id: 's16-builder',
          name: 'Builder パターンの型安全な実装',
          level: 'advanced',
          keywords: 'builder パターン fluent interface メソッドチェーン 型安全',
          desc: 'メソッドチェーンで段階的にオブジェクトを構築する Builder パターンを、ジェネリクスを使って型安全に実装できます。必須フィールドが揃ったときだけ `build()` を呼べるようにする設計が典型例です。',
          code: [
            {
              lang: 'TypeScript',
              code: `type Optional<T, Keys extends keyof T> = Omit<T, Keys> & Partial<Pick<T, Keys>>;

interface QueryConfig {
  table: string;
  where: string;
  limit: number;
  offset: number;
}

class QueryBuilder<T extends Partial<QueryConfig> = {}> {
  private config: T;
  constructor(config: T = {} as T) { this.config = config; }

  from<S extends string>(table: S) {
    return new QueryBuilder({ ...this.config, table });
  }
  where(condition: string) {
    return new QueryBuilder({ ...this.config, where: condition });
  }
  limit(n: number) {
    return new QueryBuilder({ ...this.config, limit: n });
  }
  // table が必須: T が table を持つときのみ build を公開
  build(this: QueryBuilder<T & { table: string }>): string {
    const { table, where, limit } = this.config as QueryConfig;
    let q = \`SELECT * FROM \${table}\`;
    if (where) q += \` WHERE \${where}\`;
    if (limit) q += \` LIMIT \${limit}\`;
    return q;
  }
}

const query = new QueryBuilder()
  .from('users')
  .where('age > 18')
  .limit(10)
  .build(); // OK`,
            },
          ],
        },
        {
          id: 's16-options-bag',
          name: 'オプションバッグパターン（Options 型）',
          level: 'advanced',
          keywords: 'options bag オプション型 設定オブジェクト デフォルト値',
          desc: '関数の引数をオブジェクトにまとめ（オプションバッグ）、`Partial` や `Required` を使ってデフォルト値と必須値を分離するパターンです。',
          code: [
            {
              lang: 'TypeScript',
              code: `interface FetchOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  timeout: number;
  retries: number;
  headers: Record<string, string>;
}

type UserFetchOptions = Partial<FetchOptions>;

const DEFAULT_OPTIONS: FetchOptions = {
  method: 'GET',
  timeout: 5000,
  retries: 3,
  headers: {},
};

async function apiFetch(
  url: string,
  options: UserFetchOptions = {},
): Promise<Response> {
  const merged: FetchOptions = { ...DEFAULT_OPTIONS, ...options };
  return fetch(url, {
    method: merged.method,
    headers: merged.headers,
    signal: AbortSignal.timeout(merged.timeout),
  });
}`,
            },
          ],
        },
        {
          id: 's16-branded-types',
          name: 'Branded Types（単位型・ID の混同防止）',
          level: 'advanced',
          keywords: 'branded type nominal 単位型 ID 型安全 混同防止 タグ付き',
          desc: '同じプリミティブ型でも意味が異なるものを区別する「Branded Types」パターンです。`UserId` と `ProductId`、`Meter` と `Kilometer` などを型システムで区別できます。',
          code: [
            {
              lang: 'TypeScript',
              code: `// Brand を付ける
type Branded<T, B> = T & { readonly _brand: B };

type UserId = Branded<string, 'UserId'>;
type ProductId = Branded<string, 'ProductId'>;
type Meter = Branded<number, 'Meter'>;
type Kilometer = Branded<number, 'Kilometer'>;

// 生成関数（唯一の入り口）
const toUserId = (id: string): UserId => id as UserId;
const toProductId = (id: string): ProductId => id as ProductId;
const toMeter = (n: number): Meter => n as Meter;

function getUser(id: UserId): void { /* ... */ }

const uid = toUserId('u-001');
const pid = toProductId('p-001');

getUser(uid);  // OK
// getUser(pid); // エラー: ProductId は UserId に代入不可
// getUser('raw-string'); // エラー`,
            },
          ],
          warn: 'Branded Types は実行時には通常の `string`/`number` です。型強制（`as UserId`）を行う生成関数でのみ生成し、それ以外では直接 `as` でブランドを付けないようにしてください。',
        },
        {
          id: 's16-result-type',
          name: 'Result<T, E> 型でエラーを型安全に扱う',
          level: 'advanced',
          keywords: 'Result Either エラーハンドリング 型安全 neverthrow',
          desc: '`Result<T, E>` 型（Either パターン）を使うと、成功値とエラーを Union 型で表現し、例外に頼らない型安全なエラーハンドリングができます。',
          code: [
            {
              lang: 'TypeScript',
              code: `type Success<T> = { ok: true; value: T };
type Failure<E> = { ok: false; error: E };
type Result<T, E = Error> = Success<T> | Failure<E>;

// ヘルパー関数
const ok = <T>(value: T): Success<T> => ({ ok: true, value });
const err = <E>(error: E): Failure<E> => ({ ok: false, error });

// 使用例
type ParseError = { message: string; position: number };

function parseJson(raw: string): Result<unknown, ParseError> {
  try {
    return ok(JSON.parse(raw));
  } catch (e) {
    return err({ message: String(e), position: 0 });
  }
}

const result = parseJson('{"name":"Alice"}');
if (result.ok) {
  console.log(result.value); // unknown
} else {
  console.error(result.error.message); // ParseError
}`,
            },
          ],
        },
      ],
    },
  ],
};

export default data;
