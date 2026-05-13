import type { LanguageGuide } from '../../types';

const data: LanguageGuide = {
  lang: 'Dart',
  langSlug: 'dart',
  version: 'Dart 3.x',
  lead: `他言語の経験者が 2〜3 時間でざっと読み通せるリファレンスです。null 安全・非同期処理・Flutter との関係など Dart 固有の概念を重点的に解説します。`,
  accent: '#0050a0',
  accent2: '#deeeff',
  bgGradientTop: '#eef5ff',
  bgRadialLeft: 'rgba(0,80,160,0.12)',
  bgRadialRight: 'rgba(0,150,220,0.08)',
  badgeGradient: 'linear-gradient(135deg, #003070, #0050a0)',
  heroEmoji: '🎯',
  navGroups: [
    { label: '基礎', sections: ['s1', 's2', 's3', 's4', 's5', 's6'] },
    { label: 'OOP', sections: ['s7', 's8', 's9'] },
    { label: '非同期', sections: ['s10', 's11'] },
    { label: '実用', sections: ['s12', 's13', 's14'] },
    { label: '応用', sections: ['s15', 's16'] },
  ],
  sections: [
    // ─────────────────────────────────────────────
    // s1: 変数・型・null 安全
    // ─────────────────────────────────────────────
    {
      id: 's1',
      num: 1,
      title: '変数・型・null 安全',
      level: 'basic',
      items: [
        {
          id: 's1-var-final-const',
          name: 'var / final / const と明示的型宣言',
          level: 'basic',
          keywords: 'var final const 変数 型宣言 型推論 イミュータブル',
          desc: '`var` は型推論で変数を宣言します。`final` は一度だけ代入可能（実行時定数）、`const` はコンパイル時定数です。型を明示したい場合は `int x = 0;` のように書きます。',
          code: [
            {
              lang: 'Dart',
              code: `var name = 'Alice';          // 型推論: String
String greeting = 'Hello';   // 明示的型宣言

final birthYear = 1990;      // 一度だけ代入可（実行時定数）
const pi = 3.14159;          // コンパイル時定数

// const はコレクションも不変にする
const colors = ['red', 'green', 'blue'];
// colors.add('yellow'); // エラー: Unsupported operation`,
            },
          ],
          warn: '`final` と `const` の違い: `final` は実行時に値が確定すれば OK（例: `final now = DateTime.now()`）ですが、`const` はコンパイル時に値が決まる必要があります。',
        },
        {
          id: 's1-null-safety',
          name: 'null 安全（?, !, ??, ?.）',
          level: 'basic',
          keywords: 'null safety null安全 nullable non-nullable ? ! ?? ?. null許容',
          desc: 'Dart はデフォルトで非 null 安全です。`String?` のように `?` を付けた型だけが `null` を持てます。`!` は null でないことをアサート、`??` は null 合体演算子、`?.` は null 安全メンバーアクセスです。',
          code: [
            {
              lang: 'Dart',
              code: `String  nonNull = 'hello';  // null 不可
String? nullable = null;    // null 許容

// ?? : null のとき右辺を使う
String display = nullable ?? 'default';

// ?. : null のとき null を返す（例外を投げない）
int? len = nullable?.length;  // null

// ! : null でないと確信するときのキャスト（nullならエラー）
String forced = nullable!;    // 実行時 Null check operator used on a null value`,
            },
          ],
          warn: '`!` 演算子は安易に使わないこと。`null` のときに `Null check operator used on a null value` という実行時エラーが発生します。',
        },
        {
          id: 's1-basic-types',
          name: '基本型（int, double, bool, String, dynamic, Object）',
          level: 'basic',
          keywords: 'int double bool String dynamic Object num 基本型 プリミティブ',
          desc: 'Dart の組み込み型はすべてオブジェクトです。`num` は `int` と `double` の親型。`dynamic` は型チェックを無効化し、`Object` はすべての非 null 型の基底クラスです。`Object?` はすべての型（null 含む）の基底です。',
          code: [
            {
              lang: 'Dart',
              code: `int    count   = 42;
double ratio   = 3.14;
bool   isReady = true;
String label   = 'Dart';
num    value   = 100;      // int か double を受け取れる

dynamic anything = 'text';
anything = 123;            // 型を後から変えられる（型チェックなし）

Object obj = 'hello';      // null 不可の最上位型
Object? any = null;        // null も受け取れる最上位型`,
            },
          ],
        },
        {
          id: 's1-late',
          name: 'late（遅延初期化）',
          level: 'basic',
          keywords: 'late 遅延初期化 lazy initialization non-nullable',
          desc: '`late` を付けると、宣言時に初期化しなくても非 null 型の変数を宣言できます。初回アクセス時に初期化されます（lazy initialization）。使用前に代入がなければ実行時エラーになります。',
          code: [
            {
              lang: 'Dart',
              code: `class Config {
  late String databaseUrl;  // 後で代入することを宣言

  void init(String url) {
    databaseUrl = url;      // 最初のアクセス前に代入必須
  }
}

// late + lazy initialization（アクセス時に一度だけ評価）
late String expensive = _computeExpensiveValue();

String _computeExpensiveValue() {
  print('計算中...');
  return 'result';
}`,
            },
          ],
          warn: '`late` 変数を初期化前にアクセスすると `LateInitializationError` が発生します。依存注入や Widget ライフサイクルで頻出ですが、乱用は避けてください。',
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s2: 制御フロー
    // ─────────────────────────────────────────────
    {
      id: 's2',
      num: 2,
      title: '制御フロー',
      level: 'basic',
      items: [
        {
          id: 's2-if-else',
          name: 'if / else・三項演算子',
          level: 'basic',
          keywords: 'if else 条件分岐 三項演算子 条件式',
          desc: '`if`/`else` は他言語と同様に使えます。三項演算子 `condition ? a : b` も利用可能です。Dart 3 では `if` 式（式として値を返す if）が使えるようになりました。',
          code: [
            {
              lang: 'Dart',
              code: `int score = 75;

if (score >= 80) {
  print('合格');
} else if (score >= 60) {
  print('補欠');
} else {
  print('不合格');
}

// 三項演算子
String result = score >= 60 ? '合格' : '不合格';

// Dart 3: if 式（コレクション内などで使用）
var label = if (score >= 80) '優秀' else '普通';`,
            },
          ],
        },
        {
          id: 's2-switch',
          name: 'switch（Dart 3 の exhaustive switch）',
          level: 'basic',
          keywords: 'switch case exhaustive switch式 パターン Dart3',
          desc: 'Dart 3 では `switch` が式として値を返せるようになり、sealed class との組み合わせで exhaustive（網羅的）チェックが行われます。すべてのケースを処理しないとコンパイルエラーになります。',
          code: [
            {
              lang: 'Dart',
              code: `// 従来の switch 文
String day = 'Monday';
switch (day) {
  case 'Saturday':
  case 'Sunday':
    print('週末');
    break;
  default:
    print('平日');
}

// Dart 3: switch 式（値を返す）
int code = 2;
String label = switch (code) {
  1 => '低',
  2 => '中',
  3 => '高',
  _ => '不明',
};
print(label); // 中`,
            },
          ],
        },
        {
          id: 's2-loops',
          name: 'for / for-in / while / do-while',
          level: 'basic',
          keywords: 'for for-in while do-while ループ 繰り返し break continue',
          desc: 'Dart はすべての主要なループ構文をサポートします。`for-in` は `Iterable` に対して使えます。`break` でループ脱出、`continue` で次の反復へ進みます。',
          code: [
            {
              lang: 'Dart',
              code: `// C スタイル for
for (int i = 0; i < 3; i++) {
  print(i); // 0 1 2
}

// for-in（Iterable を反復）
var fruits = ['apple', 'banana', 'cherry'];
for (var fruit in fruits) {
  print(fruit);
}

// while
int n = 0;
while (n < 3) { n++; }

// do-while（必ず 1 回実行）
do {
  print('executed');
} while (false);`,
            },
          ],
        },
        {
          id: 's2-pattern-matching',
          name: 'パターンマッチング（Dart 3+）',
          level: 'basic',
          keywords: 'pattern matching パターン switch guard when Dart3',
          desc: 'Dart 3 で追加されたパターンマッチングは、switch 文・式内で値の構造を分解・検査できます。`when` ガード節で追加条件を指定できます。',
          code: [
            {
              lang: 'Dart',
              code: `Object value = [1, 2, 3];

// リストパターン
switch (value) {
  case [int a, int b, int c]:
    print('3要素リスト: \${a + b + c}'); // 6
  case []:
    print('空リスト');
  default:
    print('その他');
}

// guard（when）節
int x = 42;
switch (x) {
  case int n when n > 0:
    print('正の整数: \$n');
  case int n when n < 0:
    print('負の整数: \$n');
  case 0:
    print('ゼロ');
}`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s3: 関数
    // ─────────────────────────────────────────────
    {
      id: 's3',
      num: 3,
      title: '関数',
      level: 'basic',
      items: [
        {
          id: 's3-optional-params',
          name: 'オプション引数（名前付き {} と位置 []）',
          level: 'basic',
          keywords: '名前付き引数 オプション引数 required デフォルト値 位置引数',
          desc: '名前付きオプション引数は `{}` で囲み、`required` を付けると必須になります。位置オプション引数は `[]` で囲みます。デフォルト値を `=` で指定できます。',
          code: [
            {
              lang: 'Dart',
              code: `// 名前付きオプション引数
void greet({required String name, String greeting = 'Hello'}) {
  print('\${greeting}, \${name}!');
}
greet(name: 'Alice');               // Hello, Alice!
greet(name: 'Bob', greeting: 'Hi'); // Hi, Bob!

// 位置オプション引数（[] で囲む）
String join(String a, [String b = '', String c = '']) {
  return '\${a}\${b}\${c}';
}
print(join('x'));       // x
print(join('x', 'y')); // xy`,
            },
          ],
        },
        {
          id: 's3-arrow',
          name: 'アロー関数（=>）',
          level: 'basic',
          keywords: 'アロー関数 => ラムダ 短縮構文 fat arrow',
          desc: '本体が単一の式の場合、`=> expression` で短縮できます。`{ return expression; }` と等価です。メソッドにも使えます。',
          code: [
            {
              lang: 'Dart',
              code: `// 通常の関数
int add(int a, int b) {
  return a + b;
}

// アロー関数（=> は単一式のみ）
int addArrow(int a, int b) => a + b;

// 匿名アロー関数（クロージャ）
var square = (int n) => n * n;
print(square(5)); // 25

// メソッドでも使える
class Circle {
  double radius;
  Circle(this.radius);
  double get area => 3.14159 * radius * radius;
}`,
            },
          ],
        },
        {
          id: 's3-first-class',
          name: '関数を値として扱う',
          level: 'basic',
          keywords: '高階関数 first-class クロージャ callback 関数型 map filter',
          desc: 'Dart の関数はファーストクラスオブジェクトです。変数に代入したり、引数として渡したり、関数から返したりできます。クロージャは外側のスコープを捕捉します。',
          code: [
            {
              lang: 'Dart',
              code: `// 関数を変数に代入
Function multiply = (int a, int b) => a * b;
print(multiply(3, 4)); // 12

// 高階関数（関数を引数に受け取る）
List<int> nums = [1, 2, 3, 4, 5];
List<int> evens = nums.where((n) => n.isEven).toList(); // [2, 4]
List<int> doubled = nums.map((n) => n * 2).toList();    // [2, 4, 6, 8, 10]

// クロージャ（外側のスコープを捕捉）
Function makeAdder(int x) => (int y) => x + y;
var add5 = makeAdder(5);
print(add5(3)); // 8`,
            },
          ],
        },
        {
          id: 's3-typedef',
          name: 'Function 型と typedef',
          level: 'basic',
          keywords: 'typedef Function型 型エイリアス callback シグネチャ',
          desc: '`typedef` で関数型に名前を付けられます。コールバックの型を明確にしたいときに便利です。Dart 2.13 以降、`typedef` は関数型以外にも使えます。',
          code: [
            {
              lang: 'Dart',
              code: `// typedef で関数型に名前を付ける
typedef Predicate<T> = bool Function(T value);
typedef Transformer = String Function(String input);

bool isPositive(int n) => n > 0;
Predicate<int> check = isPositive;
print(check(5));  // true
print(check(-1)); // false

// typedef は通常の型エイリアスにも使える（Dart 2.13+）
typedef StringList = List<String>;
StringList names = ['Alice', 'Bob'];`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s4: コレクション
    // ─────────────────────────────────────────────
    {
      id: 's4',
      num: 4,
      title: 'コレクション',
      level: 'basic',
      items: [
        {
          id: 's4-list-map-set',
          name: 'List・Map・Set',
          level: 'basic',
          keywords: 'List Map Set コレクション 配列 辞書 集合',
          desc: '`List` は順序付きの可変長配列、`Map` はキーと値のペア、`Set` は重複なしのコレクションです。いずれもジェネリクスで型を指定できます。',
          code: [
            {
              lang: 'Dart',
              code: `// List
List<String> fruits = ['apple', 'banana'];
fruits.add('cherry');
print(fruits.length);   // 3
print(fruits[0]);       // apple

// Map
Map<String, int> scores = {'Alice': 90, 'Bob': 85};
scores['Charlie'] = 78;
print(scores['Alice']); // 90

// Set（重複なし）
Set<int> nums = {1, 2, 3, 2, 1};
print(nums); // {1, 2, 3}

// 空コレクションのリテラル
var emptyList = <String>[];
var emptyMap  = <String, int>{};
var emptySet  = <double>{};`,
            },
          ],
        },
        {
          id: 's4-spread',
          name: 'コレクションリテラルと spread（...）',
          level: 'basic',
          keywords: 'spread スプレッド ... 展開 結合 concat',
          desc: 'スプレッド演算子 `...` でコレクションを展開して別のコレクションに埋め込めます。null 安全スプレッド `...?` を使うと null のコレクションを無視できます。',
          code: [
            {
              lang: 'Dart',
              code: `var a = [1, 2, 3];
var b = [4, 5, 6];

// spread で結合
var combined = [...a, ...b];
print(combined); // [1, 2, 3, 4, 5, 6]

// null 安全 spread（...?）
List<int>? maybeNull;
var safe = [0, ...?maybeNull, 9];
print(safe); // [0, 9]

// Map の spread
var defaults = {'color': 'blue', 'size': 'M'};
var custom   = {'size': 'L', 'weight': 'light'};
var merged   = {...defaults, ...custom};
print(merged); // {color: blue, size: L, weight: light}`,
            },
          ],
        },
        {
          id: 's4-collection-if-for',
          name: 'Collection if / for',
          level: 'basic',
          keywords: 'collection if for コレクションリテラル 条件 繰り返し',
          desc: 'コレクションリテラル内で `if` や `for` を直接書けます。Flutter の Widget ツリー構築でも多用されるパターンです。',
          code: [
            {
              lang: 'Dart',
              code: `bool showAdmin = true;
List<String> menu = [
  'Home',
  'Profile',
  if (showAdmin) 'Admin',       // 条件付き追加
];
print(menu); // [Home, Profile, Admin]

// Collection for
var items = [for (int i = 1; i <= 3; i++) 'item_\$i'];
print(items); // [item_1, item_2, item_3]

// 組み合わせ
var evens = [
  for (int i = 0; i <= 10; i++)
    if (i.isEven) i,
];
print(evens); // [0, 2, 4, 6, 8, 10]`,
            },
          ],
        },
        {
          id: 's4-iterable',
          name: 'Iterable と Iterator',
          level: 'basic',
          keywords: 'Iterable Iterator lazy 遅延評価 where map fold reduce',
          desc: '`Iterable<T>` はシーケンスの抽象。`List`・`Set` などが実装しています。`where`・`map`・`reduce`・`fold`・`any`・`every` などのメソッドが使えます。遅延評価なので大量データに効率的です。',
          code: [
            {
              lang: 'Dart',
              code: `Iterable<int> nums = [1, 2, 3, 4, 5];

// 遅延評価チェーン（終端操作まで実行されない）
var result = nums
    .where((n) => n.isOdd)    // [1, 3, 5]
    .map((n) => n * 10)       // [10, 30, 50]
    .toList();                // Listに具現化
print(result); // [10, 30, 50]

// 集約
int sum = nums.fold(0, (acc, n) => acc + n);
print(sum); // 15

bool hasEven = nums.any((n) => n.isEven);  // true
bool allPos  = nums.every((n) => n > 0);   // true`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s5: 文字列
    // ─────────────────────────────────────────────
    {
      id: 's5',
      num: 5,
      title: '文字列',
      level: 'basic',
      items: [
        {
          id: 's5-interpolation',
          name: '文字列補間（"Hello, ${name}!"）',
          level: 'basic',
          keywords: '文字列補間 interpolation $ \${} テンプレート文字列',
          desc: '`\$variable` で変数を埋め込み、`\${expression}` で任意の式を埋め込めます。バッククォートではなく通常のクォートを使います。',
          code: [
            {
              lang: 'Dart',
              code: `String name = 'Alice';
int age = 30;

// 変数の埋め込み（$ のみ）
print('Hello, \$name!');          // Hello, Alice!

// 式の埋め込み（\${} を使う）
print('来年は \${age + 1} 歳');    // 来年は 31 歳

// ネストした式も可能
List<int> nums = [1, 2, 3];
print('合計: \${nums.reduce((a, b) => a + b)}'); // 合計: 6`,
            },
          ],
        },
        {
          id: 's5-raw',
          name: 'raw 文字列（r\'...\'）',
          level: 'basic',
          keywords: 'raw string raw文字列 r エスケープ 正規表現',
          desc: '`r` プレフィックスを付けると raw 文字列になり、エスケープシーケンスが処理されません。正規表現パターンを書くときに便利です。',
          code: [
            {
              lang: 'Dart',
              code: `// 通常の文字列（\n は改行として解釈）
String normal = 'line1\nline2';
print(normal);
// line1
// line2

// raw 文字列（\n はそのまま 2文字）
String raw = r'line1\nline2';
print(raw); // line1\nline2

// 正規表現で raw 文字列を使う例
RegExp pattern = RegExp(r'\d{3}-\d{4}');
print(pattern.hasMatch('090-1234')); // true`,
            },
          ],
        },
        {
          id: 's5-multiline',
          name: "マルチライン文字列（'''...'''）",
          level: 'basic',
          keywords: "マルチライン 複数行 triple quote '''",
          desc: "シングルまたはダブルクォートを 3 つ重ねた `'''...'''` または `\"\"\"...\"\"\"` で複数行の文字列を書けます。",
          code: [
            {
              lang: 'Dart',
              code: `String poem = '''
春はあけぼの
やうやう白くなりゆく
山際少し明かりて
''';
print(poem);

String html = """
<div>
  <p>Hello, World!</p>
</div>
""";

// raw + マルチラインの組み合わせ
String regex = r'''
^[a-zA-Z0-9._%+\-]+
@[a-zA-Z0-9.\-]+
\.[a-zA-Z]{2,}$
''';`,
            },
          ],
        },
        {
          id: 's5-methods',
          name: '文字列操作メソッド',
          level: 'basic',
          keywords: '文字列メソッド split trim contains substring indexOf replace toUpperCase toLowerCase',
          desc: '`String` クラスは豊富なメソッドを持ちます。文字列はイミュータブルなので、変換メソッドは常に新しい文字列を返します。',
          code: [
            {
              lang: 'Dart',
              code: `String s = '  Hello, Dart!  ';

print(s.trim());                  // 'Hello, Dart!'
print(s.toLowerCase());           // '  hello, dart!  '
print(s.toUpperCase());           // '  HELLO, DART!  '
print(s.contains('Dart'));        // true
print(s.replaceAll('Dart', 'World')); // '  Hello, World!  '

// 分割と結合
List<String> parts = 'a,b,c'.split(','); // ['a', 'b', 'c']
String joined = parts.join('-');          // 'a-b-c'

// 部分文字列
String sub = 'Hello'[1];           // 'e'（文字アクセス）
String slice = 'Hello'.substring(1, 3); // 'el'

// 数値変換
int n   = int.parse('42');
double d = double.parse('3.14');`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s6: 例外処理
    // ─────────────────────────────────────────────
    {
      id: 's6',
      num: 6,
      title: '例外処理',
      level: 'basic',
      items: [
        {
          id: 's6-try-catch',
          name: 'try / catch / on / finally',
          level: 'basic',
          keywords: 'try catch on finally 例外 エラー処理 exception',
          desc: '`on 型名` で特定の例外型だけをキャッチできます。`catch(e, s)` で例外オブジェクトとスタックトレースを受け取れます。`on` と `catch` は同時に使えます。',
          code: [
            {
              lang: 'Dart',
              code: `try {
  int result = int.parse('not a number');
  print(result);
} on FormatException catch (e) {
  print('フォーマットエラー: \${e.message}');
} on RangeError {
  print('範囲エラー（詳細不要）');
} catch (e, stackTrace) {
  print('予期せぬエラー: \$e');
  print(stackTrace);
} finally {
  print('必ず実行される');
}`,
            },
          ],
          output: `フォーマットエラー: Invalid radix-10 number (at character 1)
必ず実行される`,
        },
        {
          id: 's6-throw-rethrow',
          name: 'throw / rethrow',
          level: 'basic',
          keywords: 'throw rethrow 例外送出 再スロー 伝播',
          desc: '`throw` で任意のオブジェクトを例外として投げられます（`Exception` や `Error` のサブクラス推奨）。`rethrow` はキャッチした例外をスタックトレースを保持したまま再投げします。',
          code: [
            {
              lang: 'Dart',
              code: `void validateAge(int age) {
  if (age < 0) {
    throw ArgumentError.value(age, 'age', '年齢は 0 以上');
  }
  if (age > 150) {
    throw RangeError.range(age, 0, 150, 'age');
  }
}

void process(int age) {
  try {
    validateAge(age);
  } catch (e) {
    print('ログに記録: \$e');
    rethrow; // 元のスタックトレースを維持したまま再送
  }
}`,
            },
          ],
        },
        {
          id: 's6-error-vs-exception',
          name: 'Error vs Exception',
          level: 'basic',
          keywords: 'Error Exception 違い プログラムミス 実行時エラー',
          desc: '`Error` はプログラムのバグ（回復不能、キャッチすべきでない）、`Exception` は予測可能な実行時エラー（回復可能）を表します。カスタム例外は `implements Exception` を推奨します。',
          code: [
            {
              lang: 'Dart',
              code: `// Error: プログラムのバグ（キャッチ不要・修正すべき）
// AssertionError, ArgumentError, RangeError, StateError ...

// Exception: 予測可能な失敗（キャッチして回復）
// FormatException, IOException, TimeoutException ...

// カスタム例外の実装
class NetworkException implements Exception {
  final String message;
  final int statusCode;
  const NetworkException(this.message, this.statusCode);

  @override
  String toString() => 'NetworkException(\$statusCode): \$message';
}

throw NetworkException('Not Found', 404);`,
            },
          ],
        },
        {
          id: 's6-stack-trace',
          name: 'スタックトレースの取得',
          level: 'basic',
          keywords: 'StackTrace スタックトレース デバッグ print current',
          desc: '`catch (e, stackTrace)` でスタックトレースを取得できます。また `StackTrace.current` で現在位置のスタックトレースを任意のタイミングで取得できます。',
          code: [
            {
              lang: 'Dart',
              code: `void riskyOperation() {
  try {
    throw Exception('何かが失敗した');
  } catch (e, stack) {
    print('Error: \$e');
    print('Stack trace:');
    print(stack);
  }
}

// 現在のスタックトレースを取得
void logCurrentTrace() {
  StackTrace trace = StackTrace.current;
  print(trace);
}

riskyOperation();`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s7: クラス
    // ─────────────────────────────────────────────
    {
      id: 's7',
      num: 7,
      title: 'クラス',
      level: 'basic',
      items: [
        {
          id: 's7-constructors',
          name: 'コンストラクタ（名前付き・ファクトリ・リダイレクト）',
          level: 'basic',
          keywords: 'コンストラクタ constructor 名前付き ファクトリ factory リダイレクト initializer',
          desc: 'Dart のコンストラクタは多彩です。フィールドへの自動代入（`this.field`）、名前付きコンストラクタ、キャッシュを返す `factory`、初期化子リスト（`: `）が使えます。',
          code: [
            {
              lang: 'Dart',
              code: `class Point {
  final double x;
  final double y;

  // 通常コンストラクタ（this.x で自動代入）
  const Point(this.x, this.y);

  // 名前付きコンストラクタ
  Point.origin() : x = 0, y = 0;

  // リダイレクトコンストラクタ
  Point.zero() : this(0, 0);

  // factory コンストラクタ（キャッシュや別コンストラクタ呼出し）
  factory Point.fromJson(Map<String, double> json) {
    return Point(json['x']!, json['y']!);
  }
}

void main() {
  var p1 = const Point(1.0, 2.0);
  var p2 = Point.origin();
  var p3 = Point.fromJson({'x': 3.0, 'y': 4.0});
}`,
            },
          ],
        },
        {
          id: 's7-getter-setter',
          name: 'getter / setter',
          level: 'basic',
          keywords: 'getter setter プロパティ get set 計算プロパティ',
          desc: '`get` / `set` キーワードでプロパティを定義します。計算プロパティや値の検証に使います。getter のみ定義すると読み取り専用プロパティになります。',
          code: [
            {
              lang: 'Dart',
              code: `class Temperature {
  double _celsius; // プライベートフィールド（_ プレフィックス）

  Temperature(this._celsius);

  // getter: 摂氏を華氏に変換
  double get fahrenheit => _celsius * 9 / 5 + 32;

  // setter: 値の検証付き
  set celsius(double value) {
    if (value < -273.15) throw ArgumentError('絶対零度以下は不可');
    _celsius = value;
  }

  double get celsius => _celsius;
}

var t = Temperature(100);
print(t.fahrenheit); // 212.0
t.celsius = 0;
print(t.fahrenheit); // 32.0`,
            },
          ],
        },
        {
          id: 's7-override-extends',
          name: '@override と継承（extends）',
          level: 'basic',
          keywords: 'extends 継承 override super 多態性 ポリモーフィズム',
          desc: '`extends` で継承します。親クラスのメソッドをオーバーライドする際は `@override` アノテーションを付けます。`super` で親クラスのメンバーにアクセスできます。',
          code: [
            {
              lang: 'Dart',
              code: `class Animal {
  final String name;
  Animal(this.name);

  String speak() => '...';
  void introduce() => print('\$name は「\${speak()}」と言う');
}

class Dog extends Animal {
  Dog(super.name); // super パラメータ（Dart 2.17+）

  @override
  String speak() => 'ワン';
}

class Cat extends Animal {
  Cat(super.name);

  @override
  String speak() => 'ニャン';
}

void main() {
  Animal(  'Bob').introduce(); // Bob は「...」と言う
  Dog(  'Pochi').introduce(); // Pochi は「ワン」と言う
  Cat(  'Tama').introduce();  // Tama は「ニャン」と言う
}`,
            },
          ],
        },
        {
          id: 's7-mixin',
          name: 'mixin（再利用の単位）',
          level: 'basic',
          keywords: 'mixin with 多重継承 再利用 on',
          desc: '`mixin` は複数のクラスに振る舞いを混ぜ込む仕組みです。`with` キーワードで適用します。`on 型名` で適用できるクラスを制限できます。',
          code: [
            {
              lang: 'Dart',
              code: `mixin Greetable {
  String get name;
  void greet() => print('Hello, I am \$name!');
}

mixin Serializable {
  Map<String, dynamic> toJson();
  String serialize() => toJson().toString();
}

class Person with Greetable, Serializable {
  @override
  final String name;
  final int age;

  Person(this.name, this.age);

  @override
  Map<String, dynamic> toJson() => {'name': name, 'age': age};
}

void main() {
  var p = Person('Alice', 30);
  p.greet();           // Hello, I am Alice!
  print(p.serialize()); // {name: Alice, age: 30}
}`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s8: インターフェース・抽象クラス
    // ─────────────────────────────────────────────
    {
      id: 's8',
      num: 8,
      title: 'インターフェース・抽象クラス',
      level: 'basic',
      items: [
        {
          id: 's8-implicit-interface',
          name: 'Dart のすべてのクラスは暗黙的インターフェース',
          level: 'basic',
          keywords: 'implicit interface 暗黙的インターフェース implements',
          desc: 'Dart ではすべてのクラスが暗黙的にインターフェースを定義します。`implements` キーワードで任意のクラスをインターフェースとして実装できます（継承なし）。',
          code: [
            {
              lang: 'Dart',
              code: `class Logger {
  void log(String message) => print('[LOG] \$message');
}

// Logger をインターフェースとして実装（継承ではない）
class FileLogger implements Logger {
  @override
  void log(String message) {
    // ファイルへの書き込み（実際の実装は省略）
    print('[FILE] \$message');
  }
}

// 複数のインターフェースを実装できる
class MultiLogger implements Logger {
  final List<Logger> _loggers = [FileLogger()];

  @override
  void log(String message) {
    for (var logger in _loggers) logger.log(message);
  }
}`,
            },
          ],
        },
        {
          id: 's8-abstract-interface',
          name: 'abstract class と interface class（Dart 3+）',
          level: 'basic',
          keywords: 'abstract class interface class Dart3 抽象クラス インターフェース',
          desc: '`abstract class` は直接インスタンス化できず、サブクラスで実装するメソッドを定義します。Dart 3 では `interface class` が追加され、継承ではなく実装のみを強制できます。',
          code: [
            {
              lang: 'Dart',
              code: `// abstract class: 部分実装を持てる
abstract class Shape {
  double get area;               // 抽象メンバー（実装必須）
  double get perimeter;          // 抽象メンバー
  void describe() => print('面積: \${area.toStringAsFixed(2)}'); // 具象メソッド
}

// Dart 3: interface class（継承不可・実装のみ許可）
interface class Drawable {
  void draw() => throw UnimplementedError();
}

class Circle extends Shape implements Drawable {
  final double radius;
  Circle(this.radius);

  @override double get area      => 3.14159 * radius * radius;
  @override double get perimeter => 2 * 3.14159 * radius;
  @override void   draw()        => print('○');
}`,
            },
          ],
        },
        {
          id: 's8-implements-extends-mixin',
          name: 'implements / extends / mixin with の違い',
          level: 'basic',
          keywords: 'implements extends mixin with 違い 比較',
          desc: '`extends` は継承（1つのみ）、`implements` はインターフェースとして実装（複数可・継承なし）、`with` は mixin の適用（複数可・メソッド実装を持てる）という違いがあります。',
          code: [
            {
              lang: 'Dart',
              code: `class Animal {
  void breathe() => print('呼吸中');
}

mixin Swimmable {
  void swim() => print('泳ぎ中');
}

mixin Flyable {
  void fly() => print('飛行中');
}

abstract class Runnable {
  void run();
}

// extends: 1つの親クラスから継承
// with: 複数の mixin を適用
// implements: インターフェースとして実装（すべて override 必須）
class Duck extends Animal with Swimmable, Flyable implements Runnable {
  @override
  void run() => print('走り中');
}

void main() {
  var duck = Duck();
  duck.breathe(); // extends から
  duck.swim();    // mixin から
  duck.fly();     // mixin から
  duck.run();     // implements から
}`,
            },
          ],
        },
        {
          id: 's8-sealed-base-final',
          name: 'base / final / sealed class（Dart 3+）',
          level: 'basic',
          keywords: 'base final sealed class modifier Dart3 クラス修飾子',
          desc: 'Dart 3 で追加されたクラス修飾子: `base`（継承可・実装不可）、`final`（継承も実装も不可）、`sealed`（同一ライブラリ内でのみサブクラス化可・exhaustive switch 対応）。',
          code: [
            {
              lang: 'Dart',
              code: `// sealed: 同一ライブラリ内でのみサブクラス化可能
// → switch で exhaustive チェックが効く
sealed class Result<T> {}
class Success<T> extends Result<T> { final T value; Success(this.value); }
class Failure<T> extends Result<T> { final String error; Failure(this.error); }

String describe<T>(Result<T> result) => switch (result) {
  Success(:var value) => '成功: \$value',
  Failure(:var error) => '失敗: \$error',
  // sealed なのでこれで exhaustive（default 不要）
};

// final: 継承も実装も不可
final class ImmutableConfig {
  final String host;
  ImmutableConfig(this.host);
}`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s9: ジェネリクス
    // ─────────────────────────────────────────────
    {
      id: 's9',
      num: 9,
      title: 'ジェネリクス',
      level: 'basic',
      items: [
        {
          id: 's9-type-params',
          name: '型パラメータと制約（<T extends Comparable>）',
          level: 'basic',
          keywords: 'ジェネリクス 型パラメータ T extends Comparable 型制約',
          desc: '`<T>` で型パラメータを宣言します。`<T extends SomeType>` で型制約を付け、特定のメソッドを利用できるようにします。複数の型パラメータも可能です。',
          code: [
            {
              lang: 'Dart',
              code: `// 型パラメータの基本
class Box<T> {
  T value;
  Box(this.value);
  T get() => value;
  void set(T newValue) { value = newValue; }
}

// 型制約: T は Comparable を実装している型に限定
T max<T extends Comparable<T>>(T a, T b) => a.compareTo(b) >= 0 ? a : b;

void main() {
  var intBox = Box<int>(42);
  print(intBox.get()); // 42

  print(max(3, 7));        // 7
  print(max('apple', 'banana')); // banana（辞書順）
}`,
            },
          ],
        },
        {
          id: 's9-list-map-generics',
          name: 'List<T>・Map<K,V>',
          level: 'basic',
          keywords: 'List Map ジェネリクス 型安全 コレクション',
          desc: '組み込みコレクションはジェネリックです。型引数を省略すると `dynamic` になりますが、明示することで型安全性が得られます。型引数はネストも可能です。',
          code: [
            {
              lang: 'Dart',
              code: `// 型引数を明示
List<String> names = ['Alice', 'Bob'];
Map<String, List<int>> scores = {
  'Alice': [90, 85, 92],
  'Bob':   [78, 80, 76],
};

// 型推論による省略
var pairs = <String, int>{'one': 1, 'two': 2};

// ジェネリックメソッド
T firstOrDefault<T>(List<T> list, T defaultValue) {
  return list.isEmpty ? defaultValue : list.first;
}

print(firstOrDefault(<int>[], 0));          // 0
print(firstOrDefault(['a', 'b'], 'none'));   // a`,
            },
          ],
        },
        {
          id: 's9-covariant',
          name: 'covariant',
          level: 'basic',
          keywords: 'covariant 共変 型安全 オーバーライド パラメータ',
          desc: '`covariant` キーワードでメソッド引数をオーバーライド時により具体的な型に置き換えられます。型安全性を緩めるためランタイムチェックが挿入されます。',
          code: [
            {
              lang: 'Dart',
              code: `class Animal {
  void eat(covariant Animal other) {
    print('Animal が食べる');
  }
}

class Dog extends Animal {
  @override
  void eat(Dog other) { // Dog に絞り込む（covariant を使っているので OK）
    print('犬同士が食べる');
  }
}

// covariant なしで引数を絞り込むと静的エラーになる
// class Cat extends Animal {
//   @override
//   void eat(Cat other) { ... } // エラー
// }`,
            },
          ],
        },
        {
          id: 's9-reified',
          name: 'Reified Generics（実行時に型情報が残る）',
          level: 'basic',
          keywords: 'reified generics 実行時型 is runtimeType type erasure',
          desc: 'Dart のジェネリクスは "reified"（実体化）されており、実行時にも型情報が保持されます。Java の型消去とは異なり、`is List<String>` のような検査が実行時に正しく動作します。',
          code: [
            {
              lang: 'Dart',
              code: `void checkType<T>(List<T> list) {
  if (list is List<String>) {
    print('文字列のリスト');
  } else if (list is List<int>) {
    print('整数のリスト');
  }
}

checkType(<String>['a', 'b']); // 文字列のリスト
checkType(<int>[1, 2, 3]);     // 整数のリスト

// runtimeType で型を文字列として取得
print(<String>[].runtimeType); // List<String>
print(<int, bool>{}.runtimeType); // _Map<int, bool> など`,
            },
          ],
          warn: 'Java のジェネリクスとは異なり、Dart では `List<String>` と `List<int>` は実行時に区別されます。Flutter で型チェックが予想外に働かない場合はこの違いを思い出してください。',
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s10: 非同期処理・Future
    // ─────────────────────────────────────────────
    {
      id: 's10',
      num: 10,
      title: '非同期処理・Future',
      level: 'basic',
      items: [
        {
          id: 's10-future-async-await',
          name: 'Future<T> と async / await',
          level: 'basic',
          keywords: 'Future async await 非同期 Promise then',
          desc: '`Future<T>` は非同期の結果を表します。`async` 関数内で `await` を使うと非同期処理を同期的に書けます。`async` 関数は自動的に `Future<T>` を返します。',
          code: [
            {
              lang: 'Dart',
              code: `import 'dart:async';

// async 関数は Future を返す
Future<String> fetchUser(int id) async {
  // 実際は HTTP リクエストなど
  await Future.delayed(Duration(milliseconds: 100));
  return 'User#\$id';
}

void main() async {
  // await で結果を待つ
  String user = await fetchUser(42);
  print(user); // User#42

  // then チェーンでも書ける（await 推奨）
  fetchUser(1).then((u) => print(u));
}`,
            },
          ],
        },
        {
          id: 's10-future-wait-any',
          name: 'Future.wait / Future.any',
          level: 'basic',
          keywords: 'Future.wait Future.any 並列 並行 複数 concurrent',
          desc: '`Future.wait` は複数の Future を並列実行してすべての完了を待ちます。`Future.any` は最初に完了した Future の結果を返します。',
          code: [
            {
              lang: 'Dart',
              code: `Future<int> fetchA() async {
  await Future.delayed(Duration(milliseconds: 200));
  return 1;
}
Future<int> fetchB() async {
  await Future.delayed(Duration(milliseconds: 100));
  return 2;
}

void main() async {
  // すべての完了を待つ（並列実行）
  List<int> results = await Future.wait([fetchA(), fetchB()]);
  print(results); // [1, 2]（順序は保証）

  // 最初に完了したものだけを受け取る
  int first = await Future.any([fetchA(), fetchB()]);
  print(first); // 2（fetchB の方が早い）
}`,
            },
          ],
        },
        {
          id: 's10-error-handling',
          name: 'エラーハンドリング（catchError / try-catch）',
          level: 'basic',
          keywords: 'catchError try catch async エラー 例外処理 Future',
          desc: '`async`/`await` を使う場合は通常の `try`/`catch` でエラーを処理できます。`.catchError()` はチェーンスタイルで処理する場合に使います。',
          code: [
            {
              lang: 'Dart',
              code: `Future<String> risky() async {
  throw Exception('ネットワークエラー');
}

// async/await + try/catch（推奨）
void handleWithAwait() async {
  try {
    String result = await risky();
    print(result);
  } catch (e) {
    print('エラー: \$e');
  } finally {
    print('完了');
  }
}

// then/catchError チェーン（古い書き方）
void handleWithChain() {
  risky()
    .then((v) => print(v))
    .catchError((e) => print('エラー: \$e'))
    .whenComplete(() => print('完了'));
}`,
            },
          ],
        },
        {
          id: 's10-completer',
          name: 'Completer<T>',
          level: 'basic',
          keywords: 'Completer Future 手動 完了 resolve reject',
          desc: '`Completer<T>` は Future を手動で完了させる仕組みです。コールバックベースの API を Future に変換したり、テストで Future を制御したりするときに使います。',
          code: [
            {
              lang: 'Dart',
              code: `import 'dart:async';

Future<String> loadData() {
  final completer = Completer<String>();

  // コールバックベースの API をラップ
  Timer(Duration(seconds: 1), () {
    if (DateTime.now().second.isEven) {
      completer.complete('データ取得成功');
    } else {
      completer.completeError(Exception('取得失敗'));
    }
  });

  return completer.future;
}

void main() async {
  try {
    final data = await loadData();
    print(data);
  } catch (e) {
    print('Error: \$e');
  }
}`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s11: Stream
    // ─────────────────────────────────────────────
    {
      id: 's11',
      num: 11,
      title: 'Stream',
      level: 'basic',
      items: [
        {
          id: 's11-stream-controller',
          name: 'Stream<T> と StreamController',
          level: 'basic',
          keywords: 'Stream StreamController 非同期 イベント ストリーム',
          desc: '`Stream<T>` は時間をかけて複数の値を発行する非同期シーケンスです。`StreamController` で手動制御できます。`broadcast` ストリームは複数のリスナーに対応します。',
          code: [
            {
              lang: 'Dart',
              code: `import 'dart:async';

void main() async {
  // StreamController でストリームを手動制御
  final controller = StreamController<int>();

  // リスナーを登録
  controller.stream.listen(
    (value) => print('受信: \$value'),
    onError: (e) => print('エラー: \$e'),
    onDone: () => print('完了'),
  );

  // 値を送出
  controller.add(1);
  controller.add(2);
  controller.add(3);
  controller.close(); // 完了を通知

  // Broadcast ストリーム（複数リスナー対応）
  final broadcast = StreamController<String>.broadcast();
  broadcast.stream.listen((v) => print('A: \$v'));
  broadcast.stream.listen((v) => print('B: \$v'));
  broadcast.add('hello');
}`,
            },
          ],
        },
        {
          id: 's11-async-star',
          name: 'async* / yield（ジェネレータ）',
          level: 'basic',
          keywords: 'async* yield generator ジェネレータ sync* yield*',
          desc: '`async*` + `yield` で非同期ジェネレータを作れます。`sync*` + `yield` は同期の `Iterable` を生成します。`yield*` でネストしたジェネレータを展開できます。',
          code: [
            {
              lang: 'Dart',
              code: `// async* ジェネレータ: Stream<T> を返す
Stream<int> countDown(int from) async* {
  for (int i = from; i >= 0; i--) {
    await Future.delayed(Duration(milliseconds: 100));
    yield i; // ストリームに値を送出
  }
}

// sync* ジェネレータ: Iterable<T> を返す
Iterable<int> fibonacci() sync* {
  int a = 0, b = 1;
  while (true) {
    yield a;
    int temp = a + b;
    a = b;
    b = temp;
  }
}

void main() async {
  await for (int n in countDown(3)) {
    print(n); // 3 2 1 0
  }

  print(fibonacci().take(8).toList()); // [0, 1, 1, 2, 3, 5, 8, 13]
}`,
            },
          ],
        },
        {
          id: 's11-listen-transform',
          name: 'listen / where / map / transform',
          level: 'basic',
          keywords: 'listen where map transform StreamTransformer 変換 フィルタ',
          desc: 'Stream には `where`・`map`・`take`・`skip` などの変換メソッドがあります。`StreamTransformer` で複雑な変換パイプラインを作れます。',
          code: [
            {
              lang: 'Dart',
              code: `import 'dart:async';

void main() async {
  Stream<int> numbers = Stream.fromIterable([1, 2, 3, 4, 5, 6]);

  // メソッドチェーンで変換
  numbers
      .where((n) => n.isEven)   // 偶数のみ
      .map((n) => n * 10)       // 10倍
      .listen((n) => print(n)); // 20 40 60

  // await for でストリームを消費
  Stream<String> words = Stream.fromIterable(['hello', 'world']);
  await for (String w in words) {
    print(w.toUpperCase()); // HELLO WORLD
  }

  // 集約（toList / first / last）
  List<int> all = await Stream.fromIterable([1, 2, 3]).toList();
  print(all); // [1, 2, 3]
}`,
            },
          ],
        },
        {
          id: 's11-subscription',
          name: 'StreamSubscription とキャンセル',
          level: 'basic',
          keywords: 'StreamSubscription cancel pause resume listen キャンセル',
          desc: '`listen()` の戻り値 `StreamSubscription` でストリームの購読をコントロールできます。`cancel()` で購読を解除し、リソースリークを防ぎます。',
          code: [
            {
              lang: 'Dart',
              code: `import 'dart:async';

void main() async {
  final controller = StreamController<int>();

  // listen の戻り値で購読を管理
  StreamSubscription<int> sub = controller.stream.listen(
    (v) => print('受信: \$v'),
  );

  controller.add(1);
  controller.add(2);

  // 一時停止と再開
  sub.pause();
  controller.add(3); // バッファリングされる

  sub.resume();
  // → 受信: 3

  // 購読解除（リソース解放）
  await sub.cancel();

  controller.add(4); // 誰も受け取らない
  await controller.close();
}`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s12: パターンマッチング（Dart 3）
    // ─────────────────────────────────────────────
    {
      id: 's12',
      num: 12,
      title: 'パターンマッチング（Dart 3）',
      level: 'advanced',
      items: [
        {
          id: 's12-switch-expr',
          name: 'switch 式とパターン（Dart 3+）',
          level: 'advanced',
          keywords: 'switch式 pattern Dart3 パターン 型パターン リテラルパターン',
          desc: 'Dart 3 の switch 式は値を返せます。型パターン・リテラルパターン・ワイルドカード（`_`）など様々なパターンを組み合わせられます。',
          code: [
            {
              lang: 'Dart',
              code: `Object shape = Circle(5.0);

// switch 式（値を返す）
String desc = switch (shape) {
  Circle(radius: var r) when r > 10 => '大きな円（r=\$r）',
  Circle(:var radius)               => '円（r=\$radius）',
  Rectangle(:var width, :var height) => '長方形 \${width}x\${height}',
  _                                  => '不明な図形',
};
print(desc); // 円（r=5.0）

// 複数のパターンを | で OR 結合
int n = 5;
String kind = switch (n) {
  1 | 2 | 3 => '小さい',
  4 | 5 | 6 => '中程度',
  _         => '大きい',
};`,
            },
          ],
        },
        {
          id: 's12-destructuring',
          name: 'Destructuring（構造分解）',
          level: 'advanced',
          keywords: 'destructuring 分解代入 pattern record list map',
          desc: 'パターンマッチングを用いてコレクションやオブジェクトを変数に分解できます。`var (a, b) = (1, 2)` のように宣言側でも使えます。',
          code: [
            {
              lang: 'Dart',
              code: `// タプル（Record）の分解
var (name, age) = ('Alice', 30);
print('\$name は \$age 歳'); // Alice は 30 歳

// リストの分解
var [first, second, ...rest] = [1, 2, 3, 4, 5];
print(first); // 1
print(rest);  // [3, 4, 5]

// Map の分解
var {'name': n, 'score': s} = {'name': 'Bob', 'score': 95};
print('\$n: \$s'); // Bob: 95

// for ループ内での分解
var pairs = [('Alice', 1), ('Bob', 2)];
for (var (name, id) in pairs) {
  print('\$id: \$name');
}`,
            },
          ],
        },
        {
          id: 's12-records',
          name: 'Record 型（(int, String) / ({int x, String y})）',
          level: 'advanced',
          keywords: 'record レコード 匿名型 位置フィールド 名前付きフィールド tuple',
          desc: 'Dart 3 の Record は軽量な匿名複合型です。位置フィールドと名前付きフィールドを混在できます。型は `(int, String)` や `({int x, String y})` のように書きます。',
          code: [
            {
              lang: 'Dart',
              code: `// 位置フィールドの Record（タプルのように使う）
(int, String) getIdAndName() => (42, 'Alice');
var (id, name) = getIdAndName();
print('\$id: \$name'); // 42: Alice

// 名前付きフィールドの Record
({double lat, double lng}) location = (lat: 35.68, lng: 139.69);
print('\${location.lat}, \${location.lng}'); // 35.68, 139.69

// 位置 + 名前付き混在
(int, {String name, bool active}) user = (1, name: 'Bob', active: true);

// Record は == で値比較できる
print((1, 'a') == (1, 'a')); // true`,
            },
          ],
        },
        {
          id: 's12-sealed-exhaustive',
          name: 'sealed class と exhaustive switch',
          level: 'advanced',
          keywords: 'sealed class exhaustive switch 網羅的 パターン Dart3',
          desc: '`sealed` クラスは同一ライブラリ内でのみサブクラス化可能です。これにより switch でのパターンが exhaustive（網羅的）かどうかをコンパイラが検証できます。',
          code: [
            {
              lang: 'Dart',
              code: `sealed class ApiResult<T> {}
class ApiSuccess<T> extends ApiResult<T> {
  final T data;
  ApiSuccess(this.data);
}
class ApiError<T> extends ApiResult<T> {
  final String message;
  final int statusCode;
  ApiError(this.message, this.statusCode);
}
class ApiLoading<T> extends ApiResult<T> {}

// exhaustive switch: すべてのサブクラスを処理しないとエラー
String render<T>(ApiResult<T> result) => switch (result) {
  ApiSuccess(:var data)                 => '成功: \$data',
  ApiError(:var message, :var statusCode) => 'エラー \$statusCode: \$message',
  ApiLoading()                          => '読み込み中...',
  // default 不要（sealed なので網羅的）
};`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s13: 標準ライブラリ
    // ─────────────────────────────────────────────
    {
      id: 's13',
      num: 13,
      title: '標準ライブラリ',
      level: 'basic',
      items: [
        {
          id: 's13-dart-core',
          name: 'dart:core（String, List, Map, Set, DateTime）',
          level: 'basic',
          keywords: 'dart:core String List Map Set DateTime 標準 組み込み',
          desc: '`dart:core` は自動インポートされ、基本的なクラスをすべて含みます。`DateTime` で日付操作、`Duration` で時間差表現ができます。',
          code: [
            {
              lang: 'Dart',
              code: `// DateTime: 日付と時刻
DateTime now = DateTime.now();
DateTime future = now.add(Duration(days: 7));
print(future.toIso8601String());

DateTime birthday = DateTime(1990, 3, 15);
Duration age = now.difference(birthday);
print('生まれてから \${age.inDays} 日');

// Duration
Duration d = const Duration(hours: 2, minutes: 30);
print(d.inMinutes); // 150

// Comparator / Comparable
List<String> words = ['banana', 'apple', 'cherry'];
words.sort(); // Comparable に基づいてソート
print(words); // [apple, banana, cherry]`,
            },
          ],
        },
        {
          id: 's13-dart-math',
          name: 'dart:math',
          level: 'basic',
          keywords: 'dart:math 数学 sqrt sin cos Random 乱数 pi',
          desc: '`dart:math` は数学関数と乱数生成を提供します。`Random` クラスで乱数を生成できます。`dart:math` の定数として `pi`・`e`・`sqrt2` などがあります。',
          code: [
            {
              lang: 'Dart',
              code: `import 'dart:math';

void main() {
  print(pi);           // 3.141592653589793
  print(sqrt(16));     // 4.0
  print(pow(2, 10));   // 1024
  print(log(e));       // 1.0
  print(sin(pi / 2));  // 1.0

  // 最大値・最小値
  print(max(3, 7)); // 7
  print(min(3, 7)); // 3

  // 乱数
  final rng = Random();
  print(rng.nextInt(100));    // 0〜99 のランダム整数
  print(rng.nextDouble());    // 0.0〜1.0 のランダム実数
  print(rng.nextBool());      // true か false

  // セキュアな乱数
  final secure = Random.secure();
  print(secure.nextInt(256));
}`,
            },
          ],
        },
        {
          id: 's13-dart-convert',
          name: 'dart:convert（JSON encode/decode）',
          level: 'basic',
          keywords: 'dart:convert JSON jsonEncode jsonDecode encode decode base64 utf8',
          desc: '`dart:convert` は JSON、UTF-8、Base64 などのエンコード/デコードを提供します。`jsonEncode`/`jsonDecode` でオブジェクトと JSON 文字列を相互変換します。',
          code: [
            {
              lang: 'Dart',
              code: `import 'dart:convert';

void main() {
  // JSON エンコード
  Map<String, dynamic> data = {
    'name': 'Alice',
    'age': 30,
    'hobbies': ['reading', 'coding'],
  };
  String json = jsonEncode(data);
  print(json);
  // {"name":"Alice","age":30,"hobbies":["reading","coding"]}

  // JSON デコード
  String jsonStr = '{"score": 100, "pass": true}';
  Map<String, dynamic> decoded = jsonDecode(jsonStr);
  print(decoded['score']); // 100

  // UTF-8 エンコード
  List<int> bytes = utf8.encode('こんにちは');
  print(bytes);
  print(utf8.decode(bytes)); // こんにちは

  // Base64
  String b64 = base64Encode(bytes);
  print(b64);
}`,
            },
          ],
        },
        {
          id: 's13-dart-io',
          name: 'dart:io（File, HttpClient）',
          level: 'basic',
          keywords: 'dart:io File HttpClient ファイル HTTP 入出力 IO',
          desc: '`dart:io` はファイル・ソケット・プロセス・HTTP クライアントなどを提供します。Flutter（UI）では使えず、サーバーサイドや CLI で使います。',
          code: [
            {
              lang: 'Dart',
              code: `import 'dart:io';

// ファイルの読み書き
Future<void> fileExample() async {
  // 書き込み
  final file = File('example.txt');
  await file.writeAsString('Hello, Dart IO!\n');

  // 読み込み
  String content = await file.readAsString();
  print(content);

  // 行ごとに読む
  List<String> lines = await file.readAsLines();
  for (var line in lines) print(line);
}

// HTTP クライアント（基本）
Future<void> httpExample() async {
  final client = HttpClient();
  final req = await client.getUrl(Uri.parse('https://example.com'));
  final res = await req.close();
  print('Status: \${res.statusCode}');
  client.close();
}`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s14: パッケージ・pub
    // ─────────────────────────────────────────────
    {
      id: 's14',
      num: 14,
      title: 'パッケージ・pub',
      level: 'basic',
      items: [
        {
          id: 's14-pubspec',
          name: 'pubspec.yaml の構造',
          level: 'basic',
          keywords: 'pubspec.yaml パッケージ 依存 dependencies バージョン制約',
          desc: '`pubspec.yaml` はプロジェクトのメタ情報と依存パッケージを定義します。`dependencies` は本番用、`dev_dependencies` は開発専用（テスト・コード生成など）に使います。',
          code: [
            {
              lang: 'Dart',
              code: `# pubspec.yaml の例
name: my_app
description: A Dart application
version: 1.0.0

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  http: ^1.1.0          # ^ = パッチ・マイナーアップを許容
  path: any             # any = バージョン制約なし

dev_dependencies:
  test: ^1.24.0         # テストフレームワーク
  lints: ^3.0.0         # 静的解析ルール

# Flutter の場合は flutter セクションも追加
# flutter:
#   assets:
#     - assets/images/`,
            },
          ],
        },
        {
          id: 's14-pub-commands',
          name: 'dart pub get / dart pub upgrade',
          level: 'basic',
          keywords: 'dart pub get upgrade add remove clean pubspec.lock',
          desc: '`dart pub get` で依存パッケージを取得・`pubspec.lock` を生成します。`dart pub upgrade` でバージョン制約内で最新バージョンに更新します。',
          code: [
            {
              lang: 'Dart',
              code: `# 依存パッケージを取得（pubspec.lock を生成）
dart pub get

# バージョン制約内で最新にアップグレード
dart pub upgrade

# 特定のパッケージだけアップグレード
dart pub upgrade http

# パッケージを追加（pubspec.yaml を自動更新）
dart pub add http
dart pub add --dev test

# パッケージを削除
dart pub remove http

# 使われていない依存を確認
dart pub deps`,
            },
          ],
        },
        {
          id: 's14-import',
          name: 'package: インポートと dart: インポートの違い',
          level: 'basic',
          keywords: 'import package: dart: 相対パス ライブラリ',
          desc: '`dart:` は Dart SDK 組み込みライブラリ、`package:` は pub パッケージ（外部・自作）への参照です。プロジェクト内のファイルは相対パスまたは `package:自パッケージ名/` で参照します。',
          code: [
            {
              lang: 'Dart',
              code: `// dart: — SDK 組み込みライブラリ（インストール不要）
import 'dart:core';       // 自動インポート（通常は不要）
import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'dart:math';

// package: — pub パッケージ（pubspec.yaml に追加済み）
import 'package:http/http.dart' as http;
import 'package:path/path.dart';

// 自プロジェクト内のファイル（package: または相対パス）
import 'package:my_app/src/utils.dart';
import '../utils.dart'; // 相対パス

// 特定の識別子だけインポート
import 'dart:math' show Random, pi;
import 'dart:io' hide File; // File を除外`,
            },
          ],
        },
        {
          id: 's14-project-structure',
          name: 'lib/src/ / bin/ / test/ の構成',
          level: 'basic',
          keywords: 'lib src bin test 構成 ディレクトリ構造 公開 非公開',
          desc: 'Dart の標準的なプロジェクト構成: `lib/` は公開 API、`lib/src/` は実装詳細（非公開）、`bin/` は実行可能ファイル、`test/` はテストです。',
          code: [
            {
              lang: 'Dart',
              code: `# 標準的な Dart パッケージ/アプリの構成
my_package/
├── pubspec.yaml          # パッケージ設定
├── pubspec.lock          # 依存ロックファイル
├── analysis_options.yaml # 静的解析設定
├── lib/
│   ├── my_package.dart   # 公開 API のエントリポイント
│   └── src/              # 実装詳細（外部から直接インポート非推奨）
│       ├── feature_a.dart
│       └── feature_b.dart
├── bin/
│   └── main.dart         # 実行可能スクリプト（dart run）
└── test/
    └── my_package_test.dart`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s15: 型システム・型推論
    // ─────────────────────────────────────────────
    {
      id: 's15',
      num: 15,
      title: '型システム・型推論',
      level: 'advanced',
      items: [
        {
          id: 's15-type-inference',
          name: '型推論（var・final での推論）',
          level: 'advanced',
          keywords: '型推論 type inference var final 推論 infer',
          desc: 'Dart は強力な型推論を持ちます。`var`・`final`・`const` では右辺から型が推論されます。ローカル変数には `var`/`final` を使い、公開 API には型を明示するのが慣習です。',
          code: [
            {
              lang: 'Dart',
              code: `// 型推論の例
var count = 0;          // int と推論
var name = 'Alice';     // String と推論
var items = [1, 2, 3];  // List<int> と推論

// 複雑な推論
var map = {'a': 1, 'b': 2};  // Map<String, int>

// 戻り値型の推論（ローカル関数）
var double = (int n) => n * 2;  // int Function(int)

// 型推論が効かないケース（明示が必要）
var empty = [];          // List<dynamic>（推論できない）
var empty2 = <String>[]; // 明示で List<String>`,
            },
          ],
        },
        {
          id: 's15-dynamic-vs-object',
          name: 'dynamic vs Object?（違いと危険性）',
          level: 'advanced',
          keywords: 'dynamic Object? 違い 型安全 危険 noSuchMethod',
          desc: '`dynamic` は型チェックを完全に無効化します（コンパイル時に何でも呼び出せる）。`Object?` は型の最上位ですが型チェックは有効です。`dynamic` は型安全性を破壊するため最小限に。',
          code: [
            {
              lang: 'Dart',
              code: `// dynamic: 型チェックなし（危険）
dynamic d = 'hello';
print(d.toUpperCase()); // OK（コンパイル時チェックなし）
d = 42;
// print(d.toUpperCase()); // 実行時エラー: NoSuchMethodError

// Object?: 型の最上位（型チェックあり）
Object? o = 'hello';
// print(o.toUpperCase()); // コンパイルエラー: Object? にそのメソッドはない
if (o is String) {
  print(o.toUpperCase()); // Type Promotion で String として使える
}

// dynamic を使っても良いケース
// - JSON decode の結果（Map<String, dynamic>）
// - 型消去が起きる既存 API との接続部分
Map<String, dynamic> json = jsonDecode('{"n": 1}') as Map<String, dynamic>;`,
            },
          ],
          warn: '`dynamic` を多用するとコンパイル時の型安全性が失われ、実行時に `NoSuchMethodError` や `TypeError` が発生しやすくなります。`Object?` + `is` 検査・キャストを優先してください。',
        },
        {
          id: 's15-type-promotion',
          name: 'Type Promotion の仕組み',
          level: 'advanced',
          keywords: 'type promotion 型昇格 null check is null safety',
          desc: '`if (x is String)` や `if (x != null)` のようなチェック後、そのスコープ内で変数の型が自動的に絞り込まれます（Type Promotion）。条件を通過した後は明示的なキャスト不要です。',
          code: [
            {
              lang: 'Dart',
              code: `void process(Object? value) {
  // null チェックで non-null に昇格
  if (value == null) return;
  // ここでは value は Object（non-null）

  // is チェックで具体的な型に昇格
  if (value is String) {
    print(value.toUpperCase()); // String として使える
    return;
  }
  if (value is int) {
    print(value.isEven); // int として使える
    return;
  }
}

// &&、||、三項演算子でも有効
void check(String? s) {
  // s != null の後、s は String に昇格
  if (s != null && s.isNotEmpty) {
    print(s.length); // OK
  }
}`,
            },
          ],
        },
        {
          id: 's15-is-as',
          name: 'is / as キャスト',
          level: 'advanced',
          keywords: 'is as cast キャスト 型検査 instanceof',
          desc: '`is` で型を検査し（true/false 返す）、`as` で型をキャストします（失敗時は `TypeError`）。`as` より `is` + Type Promotion を優先する方が安全です。',
          code: [
            {
              lang: 'Dart',
              code: `Object obj = 'Hello, Dart!';

// is: 型検査（Type Promotion も発生）
if (obj is String) {
  print(obj.length); // 12（String として使える）
}

// is!: 否定の型検査
if (obj is! int) {
  print('整数ではない');
}

// as: 強制キャスト（型が合わないと TypeError）
String s = obj as String; // obj が String でなければ実行時エラー
print(s.toUpperCase());   // HELLO, DART!

// 安全なキャスト（is で確認してから as）
dynamic unknown = 42;
if (unknown is int) {
  int n = unknown; // Type Promotion で as 不要
  print(n + 1);   // 43
}`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s16: Flutter との関係・エコシステム
    // ─────────────────────────────────────────────
    {
      id: 's16',
      num: 16,
      title: 'Flutter との関係・エコシステム',
      level: 'advanced',
      items: [
        {
          id: 's16-jit-aot',
          name: 'Dart の JIT（開発）と AOT（本番）コンパイル',
          level: 'advanced',
          keywords: 'JIT AOT コンパイル Hot Reload 本番 パフォーマンス',
          desc: 'Dart は開発中は JIT（Just-In-Time）コンパイルで Hot Reload を実現し、本番ビルドでは AOT（Ahead-Of-Time）コンパイルでネイティブバイナリを生成します。これが Flutter の高速起動と高いパフォーマンスの根拠です。',
          code: [
            {
              lang: 'Dart',
              code: `# --- 開発時（JIT）---
# Hot Reload: コードを変更して r キーで即反映（状態を保持）
# Hot Restart: アプリを再起動して最初からやり直し
flutter run   # JIT モードで起動
dart run      # CLI ツールを JIT で実行

# --- 本番（AOT）---
# ネイティブバイナリにコンパイル（起動速度・サイズが最適化）
flutter build apk           # Android
flutter build ios           # iOS
flutter build web           # Web（dart2js または dart compile js）
dart compile exe bin/main.dart  # CLI ツールをネイティブ実行ファイルに`,
            },
          ],
        },
        {
          id: 's16-flutter-widget',
          name: 'Widget ツリーと setState / InheritedWidget',
          level: 'advanced',
          keywords: 'Widget setState InheritedWidget BuildContext Flutter UI ツリー',
          desc: 'Flutter の UI は Widget ツリーで構成されます。`StatefulWidget` の `setState()` でローカル状態を更新します。`InheritedWidget` はツリーを越えてデータを伝播する仕組みです。',
          code: [
            {
              lang: 'Dart',
              code: `import 'package:flutter/material.dart';

// StatefulWidget: 内部状態を持つ Widget
class Counter extends StatefulWidget {
  const Counter({super.key});
  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _count = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Count: \$_count'),
        ElevatedButton(
          // setState でビルドを再実行
          onPressed: () => setState(() => _count++),
          child: const Text('Increment'),
        ),
      ],
    );
  }
}`,
            },
          ],
        },
        {
          id: 's16-freezed-riverpod',
          name: 'freezed・riverpod の Dart 的背景',
          level: 'advanced',
          keywords: 'freezed riverpod code generation コード生成 immutable 不変 状態管理',
          desc: '`freezed` は不変データクラスとパターンマッチングを生成します。`riverpod` は依存性注入と状態管理のフレームワークです。どちらも Dart のコード生成（`build_runner`）を活用しています。',
          code: [
            {
              lang: 'Dart',
              code: `// freezed の使用例（コード生成後）
// part 'user.freezed.dart';
// @freezed
// class User with _\$User {
//   const factory User({
//     required int id,
//     required String name,
//     required String? email,
//   }) = _User;
// }

// 生成されるメリット:
// - copyWith（部分更新）
// - == / hashCode の自動実装
// - toJson / fromJson（json_serializable 連携）
// - sealed union 型（パターンマッチ対応）

// riverpod の例（コード生成スタイル）
// @riverpod
// Future<List<User>> userList(UserListRef ref) async {
//   final repo = ref.watch(userRepositoryProvider);
//   return repo.fetchAll();
// }`,
            },
          ],
          warn: '`freezed` や `riverpod` は `build_runner` でのコード生成が必要です（`dart run build_runner build`）。生成ファイル（`.freezed.dart`・`.g.dart`）はバージョン管理に含めない場合が多いです。',
        },
        {
          id: 's16-dart-compile',
          name: 'dart compile と Web ターゲット',
          level: 'advanced',
          keywords: 'dart compile web js wasm exe aot snapshot Web',
          desc: '`dart compile` コマンドで様々なターゲットにコンパイルできます。Web 向けには `dart2js`（JS）または `dart2wasm`（WebAssembly）が使われます。',
          code: [
            {
              lang: 'Dart',
              code: `# ネイティブ実行ファイル（AOT コンパイル・依存なし）
dart compile exe bin/main.dart -o bin/main

# AOT スナップショット（Dart VM が必要）
dart compile aot-snapshot bin/main.dart

# JavaScript（Web デプロイ用）
dart compile js -O2 -o web/main.js bin/main.dart

# JIT スナップショット（起動が速くなる）
dart compile jit-snapshot bin/main.dart

# WebAssembly（実験的）
# dart compile wasm bin/main.dart

# Flutter Web は自動的に dart2js か dart2wasm を使用
# flutter build web --web-renderer canvaskit
# flutter build web --wasm`,
            },
          ],
        },
      ],
    },
  ],
};

export default data;
