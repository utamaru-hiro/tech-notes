import type { LanguageGuide } from '../../types';

const data: LanguageGuide = {
  lang: 'PHP',
  langSlug: 'php',
  version: 'PHP 8.x',
  lead: '他言語の経験者が2〜3時間で読み通せるPHP 8リファレンス',
  accent: '#4f3a8c',
  accent2: '#ede0ff',
  bgGradientTop: '#f5f0ff',
  bgRadialLeft: 'rgba(79,58,140,0.10)',
  bgRadialRight: 'rgba(120,90,180,0.07)',
  badgeGradient: 'linear-gradient(135deg, #2d1e6b, #4f3a8c)',
  heroEmoji: '🐘',
  navGroups: [
    { label: '基礎', sections: ['s1', 's2', 's3', 's4', 's5', 's6'] },
    { label: 'OOP', sections: ['s7', 's8', 's9'] },
    { label: '型・エラー', sections: ['s10', 's11'] },
    { label: '実用', sections: ['s12', 's13', 's14'] },
    { label: '応用', sections: ['s15', 's16'] },
  ],
  sections: [
    // ─────────────────────────────────────────────
    // s1: 変数・型
    // ─────────────────────────────────────────────
    {
      id: 's1',
      num: 1,
      title: '変数・型',
      level: 'basic',
      items: [
        {
          id: 's1-variables',
          name: '変数宣言',
          level: 'basic',
          keywords: '変数 $ 代入 var_dump gettype 動的型付け',
          desc: 'PHPの変数は `$` から始まる。宣言キーワードは不要で代入した瞬間に生成される。型は動的に決まるが `var_dump()` で型と値を確認できる。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
$name  = 'Alice';       // string
$age   = 30;            // int
$price = 9.99;          // float
$flag  = true;          // bool
$empty = null;          // NULL

var_dump($name);   // string(5) "Alice"
var_dump($age);    // int(30)
var_dump($flag);   // bool(true)
echo gettype($price); // double`,
            },
          ],
        },
        {
          id: 's1-constants',
          name: '定数',
          level: 'basic',
          keywords: 'define const 定数 大文字 グローバル',
          desc: '`define()` はランタイム時、`const` はコンパイル時に定義される。クラス外のグローバル定数は慣習的に大文字スネークケースで書く。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
define('MAX_SIZE', 100);
const APP_NAME = 'MyApp';

echo MAX_SIZE;   // 100
echo APP_NAME;   // MyApp

// クラス定数
class Config {
    const VERSION = '1.0.0';
}
echo Config::VERSION; // 1.0.0`,
            },
          ],
        },
        {
          id: 's1-type-declaration',
          name: '型宣言',
          level: 'basic',
          keywords: '型ヒント 引数 戻り値 int string float bool array',
          desc: '関数の引数と戻り値に型ヒントを付けることができる。PHP 8 では`mixed`・`never` 型も追加された。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
declare(strict_types=1);

function add(int $a, int $b): int {
    return $a + $b;
}

function greet(string $name): string {
    return "Hello, $name!";
}

echo add(2, 3);        // 5
echo greet('Bob');     // Hello, Bob!`,
            },
          ],
        },
        {
          id: 's1-type-cast',
          name: '型変換・型チェック',
          level: 'basic',
          keywords: '型キャスト intval strval is_int is_string settype 型ジャグリング',
          desc: 'PHPには暗黙の型変換（型ジャグリング）と明示的キャストの両方がある。`is_*()` 関数で型チェック、`(int)` 等のキャストや `intval()` で明示変換できる。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
$s = '42';

// 明示キャスト
$n = (int) $s;      // 42 (int)
$f = (float) $s;    // 42.0 (float)
$b = (bool) $s;     // true (bool)

// 変換関数
echo intval('0xFF', 16); // 255
echo strval(3.14);       // "3.14"

// 型チェック
var_dump(is_int($n));    // bool(true)
var_dump(is_numeric($s));// bool(true)`,
            },
          ],
          warn: '`==` による比較は型ジャグリングが働くため `"0" == false` が `true` になる。厳密比較には必ず `===` を使うこと。',
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
          id: 's2-if',
          name: 'if / elseif / else',
          level: 'basic',
          keywords: 'if elseif else 条件分岐 三項演算子 null合体',
          desc: '`if`/`elseif`/`else` による条件分岐。三項演算子 `?:` と PHP 7 で追加された null 合体演算子 `??` も頻用される。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
$score = 75;

if ($score >= 90) {
    echo 'A';
} elseif ($score >= 70) {
    echo 'B';   // "B"
} else {
    echo 'C';
}

// 三項演算子
$label = $score >= 60 ? '合格' : '不合格';  // "合格"

// null 合体演算子（PHP 7+）
$name = $_GET['name'] ?? 'Guest';`,
            },
          ],
        },
        {
          id: 's2-match',
          name: 'match 式（PHP 8）',
          level: 'basic',
          keywords: 'match switch PHP8 厳密比較 式',
          desc: 'PHP 8 で追加された `match` 式は値を返せる式であり、`===` で厳密比較する。`switch` と異なりフォールスルーがない。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
$status = 2;

$label = match($status) {
    1       => '処理中',
    2, 3    => '完了',    // 複数条件
    default => '不明',
};
echo $label; // "完了"

// switch との違い：match は === で比較
$x = '1';
// switch: case 1 がマッチしてしまう（型ジャグリング）
// match:  case 1 はマッチしない（厳密）`,
            },
          ],
        },
        {
          id: 's2-foreach',
          name: 'foreach',
          level: 'basic',
          keywords: 'foreach 配列 連想配列 ループ key value',
          desc: '配列・連想配列・イテレータに対して `foreach` で反復処理する。`&` を付けると参照渡しでループ内から値を変更できる。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
$fruits = ['apple', 'banana', 'cherry'];

foreach ($fruits as $fruit) {
    echo $fruit . "\n";
}

// キー付き
$person = ['name' => 'Alice', 'age' => 30];
foreach ($person as $key => $value) {
    echo "$key: $value\n";
}

// 参照渡し
foreach ($fruits as &$f) {
    $f = strtoupper($f);
}
unset($f); // 参照解除は必須！`,
            },
          ],
          warn: '参照渡しの `foreach` ループ後に `unset($ref)` を忘れると、後続のコードで意図しない書き換えが起きる。',
        },
        {
          id: 's2-while',
          name: 'while / for / do-while',
          level: 'basic',
          keywords: 'while for do-while break continue ループ',
          desc: '`while`・`for`・`do-while` の3種のループ構文。`break` で脱出、`continue` で次の反復へスキップできる。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
// for
for ($i = 0; $i < 3; $i++) {
    echo $i . ' '; // 0 1 2
}

// while
$n = 10;
while ($n > 0) {
    $n -= 3;
}
echo $n; // -2

// do-while（最低1回実行）
$count = 0;
do {
    $count++;
} while ($count < 5);
echo $count; // 5`,
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
          id: 's3-default-args',
          name: 'デフォルト引数・可変長引数',
          level: 'basic',
          keywords: 'デフォルト引数 可変長 ... splat スプレッド',
          desc: '引数にデフォルト値を設定できる。`...$args` で可変長引数（スプレッド）をまとめて受け取ることも可能。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
function greet(string $name, string $greeting = 'Hello'): string {
    return "$greeting, $name!";
}
echo greet('Alice');          // "Hello, Alice!"
echo greet('Bob', 'Hi');      // "Hi, Bob!"

// 可変長引数
function sum(int ...$nums): int {
    return array_sum($nums);
}
echo sum(1, 2, 3, 4); // 10

// スプレッド演算子で配列を展開
$values = [1, 2, 3];
echo sum(...$values);  // 6`,
            },
          ],
        },
        {
          id: 's3-named-args',
          name: 'Named Arguments（PHP 8）',
          level: 'basic',
          keywords: 'Named Arguments 名前付き引数 PHP8 可読性',
          desc: 'PHP 8 で追加された名前付き引数。引数名を明示することで順序に依存せず関数を呼び出せる。組み込み関数にも使える。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
function createUser(string $name, int $age, bool $active = true): string {
    $s = $active ? 'active' : 'inactive';
    return "$name ($age) [$s]";
}

// 名前付き引数
echo createUser(age: 25, name: 'Alice');
// "Alice (25) [active]"

// 組み込み関数にも使用可
$arr = [3, 1, 2];
echo implode(separator: ', ', array: $arr);
// "3, 1, 2"`,
            },
          ],
        },
        {
          id: 's3-arrow-fn',
          name: 'アロー関数 fn（PHP 7.4+）',
          level: 'basic',
          keywords: 'アロー関数 fn クロージャ 無名関数 use 短縮構文',
          desc: 'PHP 7.4 で追加された `fn` によるアロー関数は外側のスコープを自動キャプチャする。1式のみ書ける短縮形でコールバックに便利。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
// 従来のクロージャ（use で変数キャプチャが必要）
$multiplier = 3;
$triple = function(int $n) use ($multiplier): int {
    return $n * $multiplier;
};

// アロー関数（自動キャプチャ）
$double = fn(int $n): int => $n * $multiplier;

echo $triple(5); // 15
echo $double(5); // 15

// array_map との組み合わせ
$nums = [1, 2, 3, 4];
$squared = array_map(fn($n) => $n ** 2, $nums);
// [1, 4, 9, 16]`,
            },
          ],
        },
        {
          id: 's3-return-types',
          name: '戻り値型・void・never',
          level: 'basic',
          keywords: 'return 戻り値型 void never mixed static',
          desc: '関数の戻り値に型宣言を付けると誤った返しをコンパイル時に検知できる。`void` は何も返さない関数、`never` は常に例外を投げるか無限ループする関数に使う。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
declare(strict_types=1);

function logMessage(string $msg): void {
    echo $msg . "\n";
    // return; は可、return 値 は不可
}

function throwError(string $msg): never {
    throw new RuntimeException($msg);
    // この関数は絶対に正常終了しない
}

// PHP 8.1: intersection type
function processInput(Iterator&Countable $input): int {
    return count($input);
}`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s4: 文字列
    // ─────────────────────────────────────────────
    {
      id: 's4',
      num: 4,
      title: '文字列',
      level: 'basic',
      items: [
        {
          id: 's4-quotes',
          name: 'シングル / ダブルクォート',
          level: 'basic',
          keywords: 'シングルクォート ダブルクォート 文字列 エスケープ',
          desc: 'ダブルクォート文字列は変数展開とエスケープシーケンスが有効。シングルクォートは `\\\'` と `\\\\` 以外エスケープしない（高速・安全）。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
$name = 'Alice';

// ダブルクォート：変数展開あり
echo "Hello, $name!\n";          // Hello, Alice!
echo "Tab:\there\n";             // Tab:  here

// シングルクォート：展開なし
echo 'Hello, $name!\n';          // Hello, $name!\n（そのまま）

// 複合変数展開（波括弧）
$arr = ['key' => 'val'];
echo "value: \${arr['key']}";    // value: val`,
            },
          ],
        },
        {
          id: 's4-heredoc',
          name: 'ヒアドキュメント・Nowdoc',
          level: 'basic',
          keywords: 'ヒアドキュメント heredoc nowdoc 複数行 テンプレート',
          desc: 'ヒアドキュメント（`<<<EOT`）は複数行文字列で変数展開が有効。Nowdoc（`<<<\'EOT\'`）はシングルクォート相当で展開なし。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
$name = 'Alice';
$age  = 30;

// Heredoc（変数展開あり）
$html = <<<EOT
<div>
  <p>Name: $name</p>
  <p>Age:  $age</p>
</div>
EOT;

// Nowdoc（展開なし）
$raw = <<<'EOT'
Name: $name
Age:  $age
EOT;

echo $html;
// <div><p>Name: Alice</p>...
echo $raw;
// Name: $name  Age: $age`,
            },
          ],
        },
        {
          id: 's4-mb',
          name: 'マルチバイト文字列（mb_*）',
          level: 'basic',
          keywords: 'mb_strlen mb_substr mb_strtolower マルチバイト UTF-8 日本語',
          desc: '日本語などマルチバイト文字を扱う場合は `mb_*` 関数を使う。通常の `strlen()` はバイト数を返すため文字数と一致しない。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
$str = 'こんにちは';

echo strlen($str);            // 15 (UTF-8 bytes)
echo mb_strlen($str);         // 5  (文字数)
echo mb_strlen($str, 'UTF-8'); // 5

echo mb_substr($str, 0, 3);   // こんに
echo mb_strtoupper('hello');  // HELLO
echo mb_convert_encoding(
    $str, 'SJIS-win', 'UTF-8'
);  // Shift_JIS に変換`,
            },
          ],
          warn: '`php.ini` で `mbstring.internal_encoding = UTF-8` を設定し、ソースファイルも UTF-8 で保存すること。',
        },
        {
          id: 's4-string-funcs',
          name: '文字列操作関数',
          level: 'basic',
          keywords: 'str_contains str_starts_with sprintf trim explode implode 文字列',
          desc: 'PHP 8 では `str_contains()`・`str_starts_with()`・`str_ends_with()` が追加され `strpos() !== false` より直感的に書ける。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
$s = 'Hello, World!';

// PHP 8 の新関数
var_dump(str_contains($s, 'World'));     // bool(true)
var_dump(str_starts_with($s, 'Hello')); // bool(true)
var_dump(str_ends_with($s, '!'));        // bool(true)

// 定番操作
echo strtoupper($s);         // HELLO, WORLD!
echo trim('  hello  ');      // "hello"
echo str_replace('World', 'PHP', $s); // Hello, PHP!

$parts = explode(', ', $s);  // ['Hello', 'World!']
echo implode(' - ', $parts); // Hello - World!

echo sprintf('%.2f', 3.14159); // 3.14`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s5: 配列
    // ─────────────────────────────────────────────
    {
      id: 's5',
      num: 5,
      title: '配列',
      level: 'basic',
      items: [
        {
          id: 's5-indexed',
          name: 'インデックス配列',
          level: 'basic',
          keywords: 'array インデックス 配列 push pop count sort',
          desc: 'PHPの配列はすべて内部的に連想配列だが、整数キーのみ使えばリストとして扱える。`[]` 構文で作成し `count()` で長さを取得する。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
$fruits = ['apple', 'banana', 'cherry'];

echo count($fruits);    // 3
echo $fruits[0];        // apple

$fruits[] = 'date';     // 末尾追加
array_push($fruits, 'elderberry');

$last = array_pop($fruits); // 末尾取り出し

sort($fruits);          // 昇順ソート（破壊的）
rsort($fruits);         // 降順ソート（破壊的）

echo in_array('apple', $fruits) ? 'found' : 'not found';`,
            },
          ],
        },
        {
          id: 's5-assoc',
          name: '連想配列',
          level: 'basic',
          keywords: '連想配列 キー 値 isset array_key_exists array_keys array_values',
          desc: '`\'key\' => value` 形式の連想配列は他言語のハッシュマップ相当。`isset()` でキーの存在確認、`array_key_exists()` で値が `null` の場合も検知できる。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
$person = [
    'name' => 'Alice',
    'age'  => 30,
    'city' => 'Tokyo',
];

echo $person['name'];             // Alice
$person['email'] = 'a@example.com'; // 追加

var_dump(isset($person['age']));              // true
var_dump(array_key_exists('city', $person));  // true

echo implode(', ', array_keys($person));
// name, age, city, email

unset($person['city']);           // 削除`,
            },
          ],
        },
        {
          id: 's5-functional',
          name: 'array_map / filter / reduce',
          level: 'basic',
          keywords: 'array_map array_filter array_reduce usort 高階関数',
          desc: '`array_map`・`array_filter`・`array_reduce` で配列を関数型スタイルで変換・絞り込み・集約できる。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
$nums = [1, 2, 3, 4, 5];

// map: 各要素を変換
$squared = array_map(fn($n) => $n ** 2, $nums);
// [1, 4, 9, 16, 25]

// filter: 条件に合う要素を残す（キーが保持される）
$evens = array_filter($nums, fn($n) => $n % 2 === 0);
// [1 => 2, 3 => 4]
$evens = array_values($evens); // インデックス再割り当て

// reduce: 集約
$sum = array_reduce($nums, fn($carry, $n) => $carry + $n, 0);
// 15

// usort: カスタムソート
$people = [['name' => 'Bob'], ['name' => 'Alice']];
usort($people, fn($a, $b) => $a['name'] <=> $b['name']);`,
            },
          ],
        },
        {
          id: 's5-destructure',
          name: '分割代入・スプレッド',
          level: 'basic',
          keywords: '分割代入 list() [] スプレッド array_merge array_spread',
          desc: '`[]` 構文（または `list()`）で配列を変数に分割代入できる。`...` スプレッド演算子で配列のマージや関数への展開も可能。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
// インデックス配列の分割代入
[$first, $second] = ['apple', 'banana', 'cherry'];
echo $first;  // apple

// 連想配列の分割代入（PHP 7.1+）
['name' => $name, 'age' => $age] = ['name' => 'Alice', 'age' => 30];
echo $name; // Alice

// 要素スキップ
[, $middle] = [1, 2, 3];
echo $middle; // 2

// スプレッドでマージ
$a = [1, 2, 3];
$b = [4, 5, 6];
$merged = [...$a, ...$b]; // [1,2,3,4,5,6]`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s6: 例外
    // ─────────────────────────────────────────────
    {
      id: 's6',
      num: 6,
      title: '例外',
      level: 'basic',
      items: [
        {
          id: 's6-try-catch',
          name: 'try / catch / finally',
          level: 'basic',
          keywords: 'try catch finally 例外 Exception 複数キャッチ',
          desc: '`try` ブロック内で投げられた例外を `catch` で捕捉する。PHP 8 では `catch (Exception)` の変数名省略が可能。`finally` は例外有無にかかわらず実行される。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
function divide(int $a, int $b): float {
    if ($b === 0) {
        throw new InvalidArgumentException('Division by zero');
    }
    return $a / $b;
}

try {
    echo divide(10, 2);  // 5
    echo divide(10, 0);  // 例外
} catch (InvalidArgumentException $e) {
    echo 'Invalid: ' . $e->getMessage();
} catch (Exception) {              // PHP 8: 変数名省略可
    echo 'Unexpected error';
} finally {
    echo 'Always runs';
}`,
            },
          ],
        },
        {
          id: 's6-throw-expr',
          name: 'throw 式（PHP 8）',
          level: 'basic',
          keywords: 'throw 式 PHP8 三項 null合体 アロー関数',
          desc: 'PHP 8 では `throw` が文から式に昇格し、三項演算子・null 合体・アロー関数の中で使えるようになった。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
// null 合体と組み合わせ
$id = $_GET['id'] ?? throw new InvalidArgumentException('id required');

// 三項演算子と組み合わせ
function getUser(int $id): array {
    $user = findById($id);
    return $user ?? throw new RuntimeException("User $id not found");
}

// アロー関数と組み合わせ
$validate = fn($v) => $v > 0
    ? $v
    : throw new RangeException('Must be positive');`,
            },
          ],
        },
        {
          id: 's6-error-vs-exception',
          name: 'Error vs Exception',
          level: 'basic',
          keywords: 'Error Exception Throwable TypeError ParseError 階層',
          desc: 'PHP 7 以降、エラーには `Error` 系と `Exception` 系の2階層がある。どちらも `Throwable` インターフェースを実装しており `catch (Throwable)` で両方を捕捉できる。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
// Throwable 階層
// Throwable
//   ├─ Error
//   │    ├─ TypeError
//   │    ├─ ParseError
//   │    └─ ArithmeticError
//   └─ Exception
//        ├─ RuntimeException
//        ├─ InvalidArgumentException
//        └─ LogicException

try {
    $fn = null;
    $fn();   // Error: Call to a member function...
} catch (\Error $e) {
    echo 'Error: ' . $e->getMessage();
} catch (\Exception $e) {
    echo 'Exception: ' . $e->getMessage();
}

// 両方まとめて捕捉
try {
    // ...
} catch (\Throwable $e) {
    echo get_class($e) . ': ' . $e->getMessage();
}`,
            },
          ],
        },
        {
          id: 's6-custom-exception',
          name: 'カスタム例外',
          level: 'basic',
          keywords: 'カスタム例外 継承 Exception コンストラクタ',
          desc: '`Exception` または `RuntimeException` を継承してドメイン固有の例外クラスを作ると、呼び出し元が目的別にハンドリングできる。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
class DomainException extends \RuntimeException
{
    public function __construct(
        string $message,
        private readonly string $domain = ''
    ) {
        parent::__construct($message);
    }

    public function getDomain(): string
    {
        return $this->domain;
    }
}

class UserNotFoundException extends DomainException {}

try {
    throw new UserNotFoundException('User not found', 'user');
} catch (UserNotFoundException $e) {
    echo $e->getMessage();     // User not found
    echo $e->getDomain();      // user
}`,
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
          id: 's7-class',
          name: 'クラス定義・コンストラクタ',
          level: 'basic',
          keywords: 'class コンストラクタ __construct new プロパティ',
          desc: 'PHPのクラスは `class` キーワードで定義し、`__construct()` がコンストラクタ。`new` でインスタンス化し `->` でメンバーにアクセスする。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
class Point
{
    public float $x;
    public float $y;

    public function __construct(float $x, float $y)
    {
        $this->x = $x;
        $this->y = $y;
    }

    public function distanceTo(Point $other): float
    {
        return sqrt(($this->x - $other->x) ** 2
                  + ($this->y - $other->y) ** 2);
    }
}

$a = new Point(0, 0);
$b = new Point(3, 4);
echo $a->distanceTo($b); // 5`,
            },
          ],
        },
        {
          id: 's7-inheritance',
          name: '継承',
          level: 'basic',
          keywords: '継承 extends parent override オーバーライド',
          desc: '`extends` で継承。`parent::` で親クラスのメソッドを呼び出す。`__construct` を上書きする場合は親コンストラクタを明示的に呼ぶ。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
class Animal
{
    public function __construct(protected string $name) {}

    public function speak(): string
    {
        return "$this->name says ...";
    }
}

class Dog extends Animal
{
    public function speak(): string
    {
        return "$this->name says Woof!";
    }

    public function fetch(): string
    {
        return parent::speak() . ' (fetching)';
    }
}

$d = new Dog('Rex');
echo $d->speak();  // Rex says Woof!
echo $d->fetch();  // Rex says ... (fetching)`,
            },
          ],
        },
        {
          id: 's7-visibility',
          name: 'アクセス修飾子',
          level: 'basic',
          keywords: 'public protected private アクセス修飾子 カプセル化 getter setter',
          desc: '`public`（誰でも）・`protected`（自クラスと子クラス）・`private`（自クラスのみ）の3段階。プロパティは原則 `private`/`protected` にしてカプセル化する。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
class BankAccount
{
    private float $balance = 0;

    public function deposit(float $amount): void
    {
        $this->validateAmount($amount);
        $this->balance += $amount;
    }

    public function getBalance(): float
    {
        return $this->balance;
    }

    private function validateAmount(float $amount): void
    {
        if ($amount <= 0) {
            throw new InvalidArgumentException('Amount must be positive');
        }
    }
}

$acc = new BankAccount();
$acc->deposit(1000);
echo $acc->getBalance(); // 1000
// $acc->balance; // Fatal error: Cannot access private property`,
            },
          ],
        },
        {
          id: 's7-static',
          name: 'static プロパティ・メソッド',
          level: 'basic',
          keywords: 'static :: クラスメソッド ファクトリ シングルトン',
          desc: '`static` を付けるとインスタンスなしでクラス名 `::` メソッド名で呼び出せる。ファクトリパターンやシングルトンに活用される。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
class Counter
{
    private static int $count = 0;

    public static function increment(): void
    {
        self::$count++;
    }

    public static function getCount(): int
    {
        return self::$count;
    }
}

Counter::increment();
Counter::increment();
echo Counter::getCount(); // 2

// static ファクトリメソッド
class Color
{
    private function __construct(
        public readonly int $r,
        public readonly int $g,
        public readonly int $b
    ) {}

    public static function fromHex(string $hex): self
    {
        return new self(
            hexdec(substr($hex, 1, 2)),
            hexdec(substr($hex, 3, 2)),
            hexdec(substr($hex, 5, 2)),
        );
    }
}
$c = Color::fromHex('#ff6600');`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s8: インターフェース・トレイト
    // ─────────────────────────────────────────────
    {
      id: 's8',
      num: 8,
      title: 'インターフェース・トレイト',
      level: 'basic',
      items: [
        {
          id: 's8-interface',
          name: 'interface',
          level: 'basic',
          keywords: 'interface implements 多重実装 契約 型',
          desc: 'インターフェースはメソッドシグネチャのみを定義する契約。PHPはクラスの多重継承を禁止するが、インターフェースは複数 `implements` できる。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
interface Drawable
{
    public function draw(): string;
}

interface Resizable
{
    public function resize(float $factor): void;
}

class Circle implements Drawable, Resizable
{
    public function __construct(private float $radius) {}

    public function draw(): string
    {
        return "Circle(r={$this->radius})";
    }

    public function resize(float $factor): void
    {
        $this->radius *= $factor;
    }
}

$c = new Circle(5.0);
echo $c->draw();   // Circle(r=5)
$c->resize(2.0);
echo $c->draw();   // Circle(r=10)`,
            },
          ],
        },
        {
          id: 's8-abstract',
          name: 'abstract クラス',
          level: 'basic',
          keywords: 'abstract 抽象クラス テンプレートメソッド 継承 強制実装',
          desc: '`abstract` クラスは直接インスタンス化できない。`abstract` メソッドを含むクラスは必ず `abstract` にし、継承先で実装を強制する。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
abstract class Shape
{
    abstract public function area(): float;

    // テンプレートメソッド
    public function describe(): string
    {
        return get_class($this) . ': area=' . $this->area();
    }
}

class Rectangle extends Shape
{
    public function __construct(
        private float $width,
        private float $height
    ) {}

    public function area(): float
    {
        return $this->width * $this->height;
    }
}

$r = new Rectangle(4, 5);
echo $r->describe(); // Rectangle: area=20`,
            },
          ],
        },
        {
          id: 's8-trait',
          name: 'trait',
          level: 'basic',
          keywords: 'trait use ミックスイン 再利用 多重継承代替',
          desc: '`trait` はメソッドをクラスに「注入」する仕組み。多重継承の代替として、複数のクラスで共通処理を再利用したいときに使う。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
trait Timestampable
{
    private \DateTimeImmutable $createdAt;
    private \DateTimeImmutable $updatedAt;

    public function initTimestamps(): void
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();
    }

    public function touch(): void
    {
        $this->updatedAt = new \DateTimeImmutable();
    }

    public function getCreatedAt(): \DateTimeImmutable
    {
        return $this->createdAt;
    }
}

class Post
{
    use Timestampable;

    public function __construct(public readonly string $title)
    {
        $this->initTimestamps();
    }
}

$p = new Post('Hello');
echo $p->getCreatedAt()->format('Y-m-d');`,
            },
          ],
        },
        {
          id: 's8-final',
          name: 'final',
          level: 'basic',
          keywords: 'final クラス メソッド 継承禁止 オーバーライド禁止',
          desc: '`final` クラスは継承不可、`final` メソッドはオーバーライド不可。意図しない拡張を防ぎ、設計の意図を明示する。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
final class Singleton
{
    private static ?self $instance = null;

    private function __construct(private string $config) {}

    public static function getInstance(string $config = ''): self
    {
        if (self::$instance === null) {
            self::$instance = new self($config);
        }
        return self::$instance;
    }
}

// final なので継承不可
// class Extended extends Singleton {} // Fatal error

class Base
{
    public final function mustNotOverride(): void
    {
        echo 'Cannot be overridden';
    }
}`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s9: PHP 8 新機能
    // ─────────────────────────────────────────────
    {
      id: 's9',
      num: 9,
      title: 'PHP 8 新機能',
      level: 'basic',
      items: [
        {
          id: 's9-constructor-promotion',
          name: 'Constructor Promotion（PHP 8）',
          level: 'basic',
          keywords: 'Constructor Promotion コンストラクタ 昇格 省略 PHP8',
          desc: 'コンストラクタ引数に `public`/`protected`/`private` を付けると、プロパティ宣言と代入を省略できる PHP 8 の糖衣構文。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
// 従来の書き方（PHP 7）
class UserV7
{
    private string $name;
    private int $age;

    public function __construct(string $name, int $age)
    {
        $this->name = $name;
        $this->age  = $age;
    }
}

// PHP 8: Constructor Promotion
class User
{
    public function __construct(
        private string $name,
        private int    $age,
        public  string $role = 'user',
    ) {}

    public function getName(): string { return $this->name; }
}

$u = new User('Alice', 30);
echo $u->getName(); // Alice
echo $u->role;      // user`,
            },
          ],
        },
        {
          id: 's9-readonly',
          name: 'readonly プロパティ（PHP 8.1）',
          level: 'basic',
          keywords: 'readonly 読み取り専用 PHP8.1 不変 値オブジェクト',
          desc: '`readonly` プロパティは初期化後に再代入できない。値オブジェクトや DTO の不変性を表現するのに最適。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
class Money
{
    public function __construct(
        public readonly int    $amount,
        public readonly string $currency,
    ) {}

    public function add(Money $other): self
    {
        if ($this->currency !== $other->currency) {
            throw new \InvalidArgumentException('Currency mismatch');
        }
        return new self($this->amount + $other->amount, $this->currency);
    }
}

$a = new Money(100, 'JPY');
$b = new Money(200, 'JPY');
$c = $a->add($b);
echo $c->amount; // 300

// $a->amount = 999; // Fatal: Cannot modify readonly property`,
            },
          ],
        },
        {
          id: 's9-enums',
          name: 'Enum（PHP 8.1）',
          level: 'basic',
          keywords: 'Enum 列挙型 PHP8.1 backed pure cases',
          desc: 'PHP 8.1 で Pure Enum と Backed Enum が追加された。Backed Enum は各ケースに `int` または `string` の値を持ち、`from()` / `tryFrom()` で変換できる。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
// Pure Enum
enum Direction
{
    case North;
    case South;
    case East;
    case West;
}

$d = Direction::North;
echo $d->name; // North

// Backed Enum (string)
enum Status: string
{
    case Active   = 'active';
    case Inactive = 'inactive';
    case Pending  = 'pending';
}

$s = Status::from('active');   // Status::Active
echo $s->value;                // active

$t = Status::tryFrom('unknown'); // null（例外なし）

// 全ケース取得
$all = Status::cases(); // [Status::Active, ...]`,
            },
          ],
        },
        {
          id: 's9-fibers',
          name: 'Fibers（PHP 8.1）',
          level: 'basic',
          keywords: 'Fibers コルーチン 非同期 PHP8.1 協調マルチタスク',
          desc: 'PHP 8.1 の Fiber はコルーチン相当の軽量並行処理。`Fiber::suspend()` で一時停止し、`resume()` で再開できる。ReactPHP や Amp が内部実装に活用している。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
$fiber = new Fiber(function(): void {
    $value = Fiber::suspend('first');
    echo "Received: $value\n";
    Fiber::suspend('second');
    echo "Fiber done\n";
});

$v1 = $fiber->start();        // "first"
echo "Got: $v1\n";            // Got: first
$v2 = $fiber->resume('hello'); // Received: hello → "second"
echo "Got: $v2\n";            // Got: second
$fiber->resume();              // Fiber done`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s10: 型宣言
    // ─────────────────────────────────────────────
    {
      id: 's10',
      num: 10,
      title: '型宣言',
      level: 'basic',
      items: [
        {
          id: 's10-strict-types',
          name: 'strict_types',
          level: 'basic',
          keywords: 'strict_types declare 厳格モード 型強制 型変換',
          desc: 'ファイル先頭に `declare(strict_types=1)` を置くと、そのファイル内の関数呼び出しで型の暗黙変換が行われず `TypeError` が投げられる。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
declare(strict_types=1);

function double(int $n): int
{
    return $n * 2;
}

echo double(5);    // 10
// double('5');    // TypeError: must be of type int, string given
// double(2.5);    // TypeError: must be of type int, float given

// strict_types なし（デフォルト）では '5' → 5 に自動変換される`,
            },
          ],
          warn: '`declare(strict_types=1)` はファイル単位の設定。ライブラリ側がどちらで書かれていても、呼び出しファイルの設定が優先される。',
        },
        {
          id: 's10-union-types',
          name: 'Union 型・Intersection 型',
          level: 'basic',
          keywords: 'Union型 PHP8 | Intersection & mixed',
          desc: 'PHP 8 で `int|string` の Union 型、PHP 8.1 で `Iterator&Countable` の Intersection 型が追加された。`mixed` は任意の型を表す。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
declare(strict_types=1);

// Union 型
function processId(int|string $id): string
{
    return "ID: $id";
}
echo processId(42);      // ID: 42
echo processId('abc-1'); // ID: abc-1

// PHP 8.2: DNF 型
function handle((Stringable&Countable)|null $value): void
{
    if ($value !== null) {
        echo count($value) . ' items';
    }
}

// mixed（PHP 8）
function acceptAnything(mixed $val): mixed
{
    return $val;
}`,
            },
          ],
        },
        {
          id: 's10-nullable',
          name: 'Nullable 型',
          level: 'basic',
          keywords: 'Nullable ? null 許容 オプション型',
          desc: '`?Type` は `Type|null` の糖衣構文。関数が値を返せない場合に null を許容する。`??` や `?->` と組み合わせて安全にアクセスする。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
declare(strict_types=1);

function findUser(int $id): ?array
{
    $users = [1 => ['name' => 'Alice']];
    return $users[$id] ?? null;
}

$user = findUser(1);
echo $user['name'] ?? 'Not found'; // Alice

$guest = findUser(99);
echo $guest['name'] ?? 'Not found'; // Not found

// Null セーフ演算子（PHP 8）
class User {
    public ?Address $address = null;
}
class Address {
    public string $city = 'Tokyo';
}
$u = new User();
echo $u?->address?->city ?? 'Unknown'; // Unknown`,
            },
          ],
        },
        {
          id: 's10-phpdoc',
          name: 'PHPDoc アノテーション',
          level: 'basic',
          keywords: 'PHPDoc @param @return @var @template ジェネリクス',
          desc: 'PHPDoc コメントは型システムを補完し、IDE や静的解析ツール（PHPStan・Psalm）に型情報を伝える。PHP が表現できない `array<K,V>` やジェネリクスも記述できる。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
/**
 * ユーザー一覧を名前でフィルタする
 *
 * @param  array<int, array{name: string, age: int}> $users
 * @param  string $prefix
 * @return list<array{name: string, age: int}>
 */
function filterByName(array $users, string $prefix): array
{
    return array_values(
        array_filter($users, fn($u) => str_starts_with($u['name'], $prefix))
    );
}

/**
 * @template T
 * @param  T $value
 * @return T
 */
function identity(mixed $value): mixed
{
    return $value;
}`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s11: エラー処理
    // ─────────────────────────────────────────────
    {
      id: 's11',
      num: 11,
      title: 'エラー処理',
      level: 'basic',
      items: [
        {
          id: 's11-error-levels',
          name: 'エラーレベル',
          level: 'basic',
          keywords: 'E_ALL E_ERROR E_WARNING E_NOTICE error_reporting php.ini',
          desc: 'PHPのエラーは重要度別に定数で分類される。開発時は `E_ALL` を、本番では `E_ERROR` などに絞る。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
// 開発環境
error_reporting(E_ALL);
ini_set('display_errors', '1');

// 本番環境
error_reporting(E_ERROR | E_WARNING | E_PARSE);
ini_set('display_errors', '0');
ini_set('log_errors', '1');
ini_set('error_log', '/var/log/php/error.log');

// 主なエラーレベル
// E_ERROR   (1)   — 致命的エラー（スクリプト停止）
// E_WARNING (2)   — 警告（停止しない）
// E_NOTICE  (8)   — 通知（未定義変数等）
// E_ALL     (32767) — すべて`,
            },
          ],
        },
        {
          id: 's11-error-handler',
          name: 'set_error_handler',
          level: 'basic',
          keywords: 'set_error_handler register_shutdown_function カスタムエラー ロギング',
          desc: '`set_error_handler()` でカスタムエラーハンドラを登録し、Warning・Notice などを例外に変換したりロギングしたりできる。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
// エラーを例外に変換
set_error_handler(function (
    int    $errno,
    string $errstr,
    string $errfile,
    int    $errline
): bool {
    if (!(error_reporting() & $errno)) {
        return false; // error_reporting でマスクされている
    }
    throw new \ErrorException($errstr, 0, $errno, $errfile, $errline);
});

// シャットダウン時の致命的エラー補捉
register_shutdown_function(function (): void {
    $error = error_get_last();
    if ($error && ($error['type'] & E_ERROR)) {
        error_log('Fatal: ' . $error['message']);
    }
});`,
            },
          ],
        },
        {
          id: 's11-var-dump',
          name: 'var_dump / print_r / dd',
          level: 'basic',
          keywords: 'var_dump print_r var_export デバッグ 出力',
          desc: '`var_dump()` は型と値を詳細に出力し、`print_r()` は人間が読みやすい形式で出力する。フレームワーク（Laravel 等）では `dd()` （die + dump）が使われる。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
$data = [
    'name'  => 'Alice',
    'score' => 99,
    'tags'  => ['php', 'web'],
];

var_dump($data);
// array(3) { ["name"]=> string(5) "Alice" ... }

print_r($data);
// Array ( [name] => Alice [score] => 99 ... )

var_export($data);
// array ( 'name' => 'Alice', 'score' => 99 ... )
// ※ PHP コードとして再実行可能な形式

// ob_start でキャプチャ
ob_start();
var_dump($data);
$output = ob_get_clean();`,
            },
          ],
        },
        {
          id: 's11-xdebug',
          name: 'Xdebug・静的解析',
          level: 'basic',
          keywords: 'Xdebug PHPStan Psalm 静的解析 デバッガ カバレッジ',
          desc: 'Xdebug はステップ実行・スタックトレース・カバレッジ計測を提供するデバッガ拡張。PHPStan / Psalm は型エラーをコンパイル時に検知する静的解析ツール。',
          code: [
            {
              lang: 'PHP',
              code: `# php.ini / xdebug.ini
# zend_extension=xdebug
# xdebug.mode=debug,coverage
# xdebug.start_with_request=yes
# xdebug.client_port=9003

# PHPStan のインストール
# composer require --dev phpstan/phpstan

# phpstan.neon
# parameters:
#   level: 8   # 0（緩）〜 9（厳）
#   paths:
#     - src

# Psalm のインストール
# composer require --dev vimeo/psalm
# vendor/bin/psalm --init`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s12: ファイル・HTTP
    // ─────────────────────────────────────────────
    {
      id: 's12',
      num: 12,
      title: 'ファイル・HTTP',
      level: 'basic',
      items: [
        {
          id: 's12-file',
          name: 'ファイル操作',
          level: 'basic',
          keywords: 'file_get_contents file_put_contents fopen fread json_decode',
          desc: '`file_get_contents()` / `file_put_contents()` で手軽にファイル読み書きができる。大きなファイルはストリーム (`fopen`/`fread`) で処理する。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
// 読み込み
$content = file_get_contents('/path/to/file.txt');

// 書き込み（FILE_APPEND で追記）
file_put_contents('/path/to/file.txt', "new line\n", FILE_APPEND);

// JSON ファイル読み書き
$json = file_get_contents('data.json');
$data = json_decode($json, true);
$data['updated'] = date('Y-m-d');
file_put_contents('data.json', json_encode($data, JSON_PRETTY_PRINT));

// ディレクトリ操作
mkdir('/tmp/mydir', 0755, true); // recursive
$files = glob('/tmp/mydir/*.txt');`,
            },
          ],
        },
        {
          id: 's12-superglobals',
          name: '$_GET / $_POST / $_FILES',
          level: 'basic',
          keywords: '$_GET $_POST $_FILES $_SERVER $_SESSION スーパーグローバル フォーム',
          desc: 'PHPにはリクエストデータを格納するスーパーグローバル変数がある。入力値は必ずバリデーション・サニタイズしてから使う。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
// GET パラメータ: ?name=Alice&page=2
$name = filter_input(INPUT_GET, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
$page = filter_input(INPUT_GET, 'page', FILTER_VALIDATE_INT) ?? 1;

// POST データ
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
if ($email === false || $email === null) {
    http_response_code(422);
    echo json_encode(['error' => 'Invalid email']);
    exit;
}

// ファイルアップロード
if (isset($_FILES['avatar'])) {
    $file = $_FILES['avatar'];
    if ($file['error'] === UPLOAD_ERR_OK) {
        move_uploaded_file($file['tmp_name'], '/uploads/' . basename($file['name']));
    }
}`,
            },
          ],
          warn: '`$_GET`/`$_POST` の値を直接 HTML や SQL に埋め込まないこと。`htmlspecialchars()` でエスケープし、DB には必ず Prepared Statement を使う。',
        },
        {
          id: 's12-curl',
          name: 'cURL',
          level: 'basic',
          keywords: 'cURL HTTP リクエスト GET POST curl_exec json API',
          desc: '`curl_*` 関数で外部 HTTP API を呼び出す。`CURLOPT_RETURNTRANSFER` を `true` にしないとレスポンスが返ってこない点に注意。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
// GET リクエスト
$ch = curl_init('https://api.example.com/users');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 10,
    CURLOPT_HTTPHEADER     => ['Accept: application/json'],
]);
$response = curl_exec($ch);
$code     = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$data = json_decode($response, true);

// POST (JSON)
$ch = curl_init('https://api.example.com/users');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode(['name' => 'Alice']),
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
]);
$result = curl_exec($ch);
curl_close($ch);`,
            },
          ],
        },
        {
          id: 's12-guzzle',
          name: 'Guzzle HTTP クライアント',
          level: 'basic',
          keywords: 'Guzzle HTTP クライアント Composer PSR-7 非同期 並列',
          desc: 'Guzzle は PHP の事実上標準 HTTP クライアントライブラリ。PSR-7 準拠で非同期・並列リクエストもサポートする。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
// composer require guzzlehttp/guzzle
use GuzzleHttp\Client;
use GuzzleHttp\Promise;

$client = new Client([
    'base_uri' => 'https://api.example.com',
    'timeout'  => 10.0,
]);

// 同期 GET
$response = $client->get('/users', [
    'query' => ['page' => 1],
]);
$data = json_decode($response->getBody(), true);

// 並列リクエスト
$promises = [
    'users'  => $client->getAsync('/users'),
    'posts'  => $client->getAsync('/posts'),
];
$results = Promise\Utils::unwrap($promises);
$users = json_decode($results['users']->getBody(), true);`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s13: PDO・DB
    // ─────────────────────────────────────────────
    {
      id: 's13',
      num: 13,
      title: 'PDO・DB',
      level: 'basic',
      items: [
        {
          id: 's13-connect',
          name: 'DSN 接続',
          level: 'basic',
          keywords: 'PDO DSN 接続 MySQL PostgreSQL SQLite 例外',
          desc: 'PDO（PHP Data Objects）はデータベース抽象化レイヤー。DSN 文字列でドライバとホストを指定し、接続エラーは `PDOException` で捕捉する。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
$dsn = 'mysql:host=localhost;dbname=mydb;charset=utf8mb4';

try {
    $pdo = new PDO($dsn, 'user', 'password', [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);
} catch (\PDOException $e) {
    // 接続情報を含む可能性があるため詳細はログのみ
    error_log($e->getMessage());
    throw new \RuntimeException('Database connection failed');
}`,
            },
          ],
          warn: '接続情報（DSN・パスワード）は環境変数または `.env` ファイルから読み込み、ソースコードにハードコーディングしないこと。',
        },
        {
          id: 's13-prepared',
          name: 'Prepared Statement',
          level: 'basic',
          keywords: 'Prepared Statement プレースホルダ bindParam bindValue SQL インジェクション',
          desc: 'Prepared Statement はプレースホルダ（`?` または `:name`）にパラメータを束縛して SQL を実行する。SQL インジェクション対策の基本。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
// 名前付きプレースホルダ
$stmt = $pdo->prepare(
    'INSERT INTO users (name, email) VALUES (:name, :email)'
);
$stmt->execute(['name' => 'Alice', 'email' => 'alice@example.com']);

// 位置プレースホルダ
$stmt = $pdo->prepare(
    'SELECT * FROM users WHERE id = ? AND active = ?'
);
$stmt->execute([42, 1]);

// bindParam（参照渡し・大量 INSERT に有効）
$stmt = $pdo->prepare('INSERT INTO logs (msg) VALUES (:msg)');
$stmt->bindParam(':msg', $msg);
foreach ($messages as $msg) {
    $stmt->execute();
}`,
            },
          ],
        },
        {
          id: 's13-fetch',
          name: 'fetch / fetchAll',
          level: 'basic',
          keywords: 'fetch fetchAll PDO::FETCH_ASSOC fetchObject イテレータ',
          desc: '`fetch()` で1行ずつ、`fetchAll()` で全行を取得する。大量データは `fetch()` のループで逐次処理してメモリを節約できる。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
$stmt = $pdo->prepare('SELECT id, name, email FROM users WHERE active = ?');
$stmt->execute([1]);

// 全件取得（小〜中量）
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);
// [['id'=>1,'name'=>'Alice',...], ...]

// 1行ずつ（大量データ）
$stmt->execute([1]);
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    process($row);
}

// オブジェクトとして取得
$stmt->execute([1]);
while ($user = $stmt->fetchObject(User::class)) {
    echo $user->name;
}

// 単一カラム
$ids = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);`,
            },
          ],
        },
        {
          id: 's13-transaction',
          name: 'トランザクション',
          level: 'basic',
          keywords: 'トランザクション beginTransaction commit rollBack ACID',
          desc: 'PDO は `beginTransaction()` / `commit()` / `rollBack()` でトランザクション管理ができる。例外発生時に必ず `rollBack()` するパターンが基本。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
$pdo->beginTransaction();
try {
    $pdo->prepare('UPDATE accounts SET balance = balance - ? WHERE id = ?')
        ->execute([1000, $fromId]);

    $pdo->prepare('UPDATE accounts SET balance = balance + ? WHERE id = ?')
        ->execute([1000, $toId]);

    $pdo->commit();
} catch (\Exception $e) {
    $pdo->rollBack();
    throw $e;
}

// セーブポイント（ネスト疑似実装）
$pdo->exec('SAVEPOINT sp1');
try {
    // ...
    $pdo->exec('RELEASE SAVEPOINT sp1');
} catch (\Exception $e) {
    $pdo->exec('ROLLBACK TO SAVEPOINT sp1');
}`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s14: Composer
    // ─────────────────────────────────────────────
    {
      id: 's14',
      num: 14,
      title: 'Composer',
      level: 'basic',
      items: [
        {
          id: 's14-composer-json',
          name: 'composer.json・基本コマンド',
          level: 'basic',
          keywords: 'composer require install update autoload vendor',
          desc: 'Composer は PHP 標準のパッケージマネージャ。`composer.json` で依存を管理し、`vendor/autoload.php` を読み込むだけで PSR-4 オートロードが有効になる。',
          code: [
            {
              lang: 'PHP',
              code: `# パッケージ追加
# composer require guzzlehttp/guzzle
# composer require --dev phpunit/phpunit

# composer.json の例
# {
#   "require": {
#     "php": "^8.1",
#     "guzzlehttp/guzzle": "^7.0"
#   },
#   "require-dev": {
#     "phpunit/phpunit": "^11.0"
#   },
#   "autoload": {
#     "psr-4": { "App\\\\": "src/" }
#   }
# }

# インストール（本番）
# composer install --no-dev --optimize-autoloader

# autoload を PHP から読み込む
<?php
require __DIR__ . '/vendor/autoload.php';`,
            },
          ],
        },
        {
          id: 's14-psr4',
          name: 'PSR-4 オートロード',
          level: 'basic',
          keywords: 'PSR-4 オートロード 名前空間 namespace use',
          desc: 'PSR-4 はクラスのフルネーム（名前空間＋クラス名）をファイルパスにマッピングする規約。`namespace` と `use` で整理するとクラスが自動解決される。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
// src/Service/UserService.php
namespace App\\Service;

use App\\Repository\\UserRepository;
use App\\Entity\\User;

class UserService
{
    public function __construct(
        private UserRepository $repository
    ) {}

    public function find(int $id): ?User
    {
        return $this->repository->findById($id);
    }
}

// PSR-4 マッピング（composer.json）
// "psr-4": { "App\\\\": "src/" }
// App\\Service\\UserService → src/Service/UserService.php`,
            },
          ],
        },
        {
          id: 's14-frameworks',
          name: 'Laravel / Symfony 概要',
          level: 'basic',
          keywords: 'Laravel Symfony フレームワーク DI コンテナ ORM Eloquent Doctrine',
          desc: 'Laravel は「生産性優先」のフルスタックフレームワーク。Symfony はコンポーネント指向で Laravel も多くの Symfony コンポーネントを利用している。',
          code: [
            {
              lang: 'PHP',
              code: `# ─ Laravel ─
# composer create-project laravel/laravel myapp
# php artisan serve

# Eloquent ORM
use App\\Models\\User;

$user = User::find(1);
$users = User::where('active', true)->orderBy('name')->get();
$user = User::create(['name' => 'Alice', 'email' => 'a@example.com']);

# ─ Symfony ─
# composer create-project symfony/skeleton myapp
# symfony server:start

# DI コンテナ（自動配線）
# services.yaml:
# App\\Service\\UserService:
#     arguments:
#         $repository: '@App\\Repository\\UserRepository'`,
            },
          ],
        },
        {
          id: 's14-phpunit',
          name: 'PHPUnit',
          level: 'basic',
          keywords: 'PHPUnit テスト assertEquals mockery データプロバイダ',
          desc: 'PHPUnit は PHP の標準テストフレームワーク。`TestCase` を継承してテストクラスを書き、`vendor/bin/phpunit` で実行する。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
use PHPUnit\\Framework\\TestCase;

class CalculatorTest extends TestCase
{
    private Calculator $calc;

    protected function setUp(): void
    {
        $this->calc = new Calculator();
    }

    public function testAdd(): void
    {
        $this->assertEquals(5, $this->calc->add(2, 3));
    }

    /** @dataProvider additionProvider */
    public function testAddWithProvider(int $a, int $b, int $expected): void
    {
        $this->assertEquals($expected, $this->calc->add($a, $b));
    }

    public static function additionProvider(): array
    {
        return [[1, 2, 3], [0, 0, 0], [-1, 1, 0]];
    }
}
# vendor/bin/phpunit tests/`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s15: 非同期
    // ─────────────────────────────────────────────
    {
      id: 's15',
      num: 15,
      title: '非同期',
      level: 'advanced',
      items: [
        {
          id: 's15-reactphp',
          name: 'ReactPHP',
          level: 'advanced',
          keywords: 'ReactPHP イベントループ PromiseA+ 非同期 I/O ストリーム',
          desc: 'ReactPHP はイベントループベースの非同期 I/O ライブラリ。Promise/A+ 仕様の Promise をサポートし、ノンブロッキング HTTP サーバやタイマーが書ける。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
// composer require react/event-loop react/http react/promise

use React\\EventLoop\\Loop;
use React\\Http\\HttpServer;
use React\\Http\\Message\\Response;
use Psr\\Http\\Message\\ServerRequestInterface;

$server = new HttpServer(function (ServerRequestInterface $request): Response {
    return Response::plaintext("Hello, World!\n");
});

$socket = new React\\Socket\\SocketServer('0.0.0.0:8080');
$server->listen($socket);

echo "Server running at http://127.0.0.1:8080\n";
Loop::run();`,
            },
          ],
        },
        {
          id: 's15-amp',
          name: 'Amp v3',
          level: 'advanced',
          keywords: 'Amp コルーチン async await 並列 非同期 PHP',
          desc: 'Amp v3 は Fibers を利用し、`async`/`await` に近い構文で非同期処理を記述できるフレームワーク。並列 HTTP リクエストやファイル I/O に適している。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
// composer require amphp/amp amphp/http-client

use Amp\\Future;
use function Amp\\async;
use function Amp\\await;

function fetchUrl(string $url): string {
    $client = new \Amp\Http\Client\HttpClientBuilder::buildDefault();
    $request = new \Amp\Http\Client\Request($url);
    $response = $client->request($request);
    return $response->getBody()->buffer();
}

// 並列実行
$futures = [
    'a' => async(fn() => fetchUrl('https://example.com/a')),
    'b' => async(fn() => fetchUrl('https://example.com/b')),
];

$results = Future\\await($futures);
echo $results['a']; // a のレスポンス`,
            },
          ],
        },
        {
          id: 's15-fibers-advanced',
          name: 'Fibers 詳解（PHP 8.1）',
          level: 'advanced',
          keywords: 'Fibers コルーチン 協調 スケジューラ suspend resume start',
          desc: 'Fiber は独立したコールスタックを持つ軽量スレッド。複数の Fiber をスケジューラで管理することで協調マルチタスクを実現できる。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
// シンプルなラウンドロビンスケジューラ
$fibers = [];

function spawn(callable $fn): void {
    global $fibers;
    $fibers[] = new Fiber($fn);
}

function run(): void {
    global $fibers;
    while (!empty($fibers)) {
        $fiber = array_shift($fibers);
        if (!$fiber->isStarted()) {
            $fiber->start();
        } elseif ($fiber->isSuspended()) {
            $fiber->resume();
        }
        if (!$fiber->isTerminated()) {
            $fibers[] = $fiber; // 末尾に戻す
        }
    }
}

spawn(function(): void {
    echo "Task A: step 1\n";
    Fiber::suspend();
    echo "Task A: step 2\n";
});
spawn(function(): void {
    echo "Task B: step 1\n";
    Fiber::suspend();
    echo "Task B: step 2\n";
});
run();
// Task A: step 1 → Task B: step 1 → Task A: step 2 → Task B: step 2`,
            },
          ],
        },
        {
          id: 's15-pcntl',
          name: 'pcntl_fork・マルチプロセス',
          level: 'advanced',
          keywords: 'pcntl_fork fork マルチプロセス 並列処理 子プロセス CLI',
          desc: '`pcntl_fork()` で子プロセスを生成し、CPU バウンドな処理を並列化できる。CLI スクリプト専用で Web サーバ環境では使用不可。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
// CLI のみ・pcntl 拡張必須
declare(ticks=1);

$chunks = array_chunk(range(1, 100), 25); // 4 チャンクに分割
$pids   = [];

foreach ($chunks as $i => $chunk) {
    $pid = pcntl_fork();
    if ($pid === -1) {
        die('fork failed');
    } elseif ($pid === 0) {
        // 子プロセス
        $sum = array_sum($chunk);
        echo "Child $i: sum = $sum\n";
        exit(0);
    } else {
        // 親プロセス
        $pids[] = $pid;
    }
}

// すべての子を待機
foreach ($pids as $pid) {
    pcntl_waitpid($pid, $status);
}
echo "All done\n";`,
            },
          ],
          warn: '`pcntl_fork()` は Web サーバ（Apache / FPM）プロセスでは使用禁止。マルチプロセスの代替として `symfony/process` の利用を検討すること。',
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s16: セキュリティ
    // ─────────────────────────────────────────────
    {
      id: 's16',
      num: 16,
      title: 'セキュリティ',
      level: 'advanced',
      items: [
        {
          id: 's16-sqli',
          name: 'SQL インジェクション対策',
          level: 'advanced',
          keywords: 'SQL インジェクション Prepared Statement PDO バインド セキュリティ',
          desc: 'SQL インジェクションは外部入力を SQL に直接埋め込むことで起きる。PDO の Prepared Statement を使い、ユーザー入力は必ずパラメータとして渡す。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
// NG: SQL インジェクション脆弱
$name = $_GET['name']; // 例: "' OR 1=1 --"
$sql  = "SELECT * FROM users WHERE name = '$name'";
// → 全ユーザーが漏洩する

// OK: Prepared Statement
$stmt = $pdo->prepare('SELECT * FROM users WHERE name = :name');
$stmt->execute([':name' => $_GET['name']]);
$user = $stmt->fetch();

// 動的な列名/テーブル名はホワイトリストで検証
$allowed = ['name', 'email', 'created_at'];
$col = in_array($_GET['sort'], $allowed, true)
    ? $_GET['sort']
    : 'name';
$stmt = $pdo->query("SELECT * FROM users ORDER BY $col");`,
            },
          ],
          warn: '列名・テーブル名・ORDER BY 方向などの識別子はプレースホルダで束縛できない。ホワイトリスト検証を必ず行うこと。',
        },
        {
          id: 's16-xss',
          name: 'XSS 対策',
          level: 'advanced',
          keywords: 'XSS クロスサイトスクリプティング htmlspecialchars Content-Security-Policy',
          desc: 'ユーザー入力を HTML に出力する際は `htmlspecialchars()` でエスケープする。テンプレートエンジン（Twig 等）は自動エスケープが有効なため安全。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
$userInput = '<script>alert("XSS")</script>';

// NG: そのまま出力
echo $userInput; // スクリプトが実行される

// OK: エスケープ
echo htmlspecialchars($userInput, ENT_QUOTES | ENT_HTML5, 'UTF-8');
// &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;

// Twig テンプレート（自動エスケープ）
// {{ user.name }}        → 自動エスケープ
// {{ user.html | raw }}  → 意図的な生 HTML 出力（要注意）

// Content-Security-Policy ヘッダ
header("Content-Security-Policy: default-src 'self'; script-src 'self'");`,
            },
          ],
          warn: 'JavaScript コンテキスト（`onclick="..."` 等）・CSS コンテキスト・URL コンテキストではそれぞれ異なるエスケープが必要。`htmlspecialchars` だけでは不十分な場合がある。',
        },
        {
          id: 's16-csrf',
          name: 'CSRF 対策',
          level: 'advanced',
          keywords: 'CSRF トークン session フォーム POST SameSite',
          desc: 'CSRF はユーザーが意図しないリクエストを外部サイトから発行させる攻撃。セッション紐づきのランダムトークンをフォームに埋め込み、POST 時に検証する。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
session_start();

// トークン生成（ログイン時・フォーム表示時）
function generateCsrfToken(): string {
    $token = bin2hex(random_bytes(32));
    $_SESSION['csrf_token'] = $token;
    return $token;
}

// トークン検証（POST 処理時）
function verifyCsrfToken(string $token): bool {
    $expected = $_SESSION['csrf_token'] ?? '';
    return hash_equals($expected, $token);
}

// フォームに埋め込む
$token = generateCsrfToken();
echo '<input type="hidden" name="csrf_token" value="'
   . htmlspecialchars($token, ENT_QUOTES, 'UTF-8') . '">';

// POST 受信時
if (!verifyCsrfToken($_POST['csrf_token'] ?? '')) {
    http_response_code(403);
    exit('CSRF validation failed');
}`,
            },
          ],
          warn: '`hash_equals()` を使うことでタイミング攻撃（timing attack）を防ぐ。`===` での比較は使わないこと。また Cookie の `SameSite=Strict` 設定も併用する。',
        },
        {
          id: 's16-password',
          name: 'password_hash / password_verify',
          level: 'advanced',
          keywords: 'password_hash password_verify bcrypt Argon2 ハッシュ 認証',
          desc: 'パスワードは `password_hash()` で bcrypt/Argon2 ハッシュ化して保存する。`password_verify()` で照合、`password_needs_rehash()` でコスト更新が必要か確認する。',
          code: [
            {
              lang: 'PHP',
              code: `<?php
// パスワード登録
$plain  = 'secret_password';
$hashed = password_hash($plain, PASSWORD_BCRYPT, ['cost' => 12]);
// "$2y$12$..." の形式で DB 保存

// ログイン認証
function authenticate(string $input, string $storedHash): bool {
    return password_verify($input, $storedHash);
}

// コスト更新（bcrypt → Argon2 移行等）
if (password_needs_rehash($storedHash, PASSWORD_ARGON2ID)) {
    $newHash = password_hash($plain, PASSWORD_ARGON2ID);
    // DB を新しいハッシュで更新
}

// Argon2ID（推奨・PHP 7.3+）
$hash = password_hash($plain, PASSWORD_ARGON2ID, [
    'memory_cost' => 65536,
    'time_cost'   => 4,
    'threads'     => 3,
]);`,
            },
          ],
          warn: 'MD5・SHA-1 などの汎用ハッシュ関数はパスワード保存に使用禁止。必ず `password_hash()` の bcrypt / Argon2 を使うこと。ソルトは自動生成されるので手動で付与する必要はない。',
        },
      ],
    },
  ],
};

export default data;
