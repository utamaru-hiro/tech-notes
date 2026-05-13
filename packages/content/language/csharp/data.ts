import type { LanguageGuide } from '../../types';

const data: LanguageGuide = {
  lang: 'C#',
  langSlug: 'csharp',
  version: 'C# 12 / .NET 8',
  lead: `他言語の経験者が 2〜3 時間でざっと読み通せるリファレンスです。LINQ・async/await・パターンマッチなど C# 固有の機能を重点的に解説します。`,
  accent: '#68217a',
  accent2: '#f3e8f8',
  bgGradientTop: '#f8f0fc',
  bgRadialLeft: 'rgba(104,33,122,0.12)',
  bgRadialRight: 'rgba(180,120,210,0.10)',
  badgeGradient: 'linear-gradient(135deg, #3e0f4a, #68217a)',
  heroEmoji: '🔷',

  navGroups: [
    { label: '基礎', sections: ['s1', 's2', 's3', 's4', 's5', 's6'] },
    { label: 'OOP', sections: ['s7', 's8', 's9'] },
    { label: 'LINQ・コレクション', sections: ['s10', 's11'] },
    { label: '非同期・並行', sections: ['s12', 's13'] },
    { label: '応用', sections: ['s14', 's15', 's16'] },
  ],

  sections: [
    // ─────────────────────────────────────────
    // s1: 変数・型・null 許容
    // ─────────────────────────────────────────
    {
      id: 's1',
      num: 1,
      title: '変数・型・null 許容',
      level: 'basic',
      items: [
        {
          id: 's1-value-ref',
          name: '値型と参照型',
          level: 'basic',
          keywords: 'struct class 値型 参照型 スタック ヒープ',
          desc: '`struct` は値型でスタックに割り当てられ、コピーセマンティクスを持つ。`class` は参照型でヒープに割り当てられ、参照セマンティクスを持つ。',
          code: [
            {
              lang: 'C#',
              code: `// 値型（struct）
struct Point { public int X; public int Y; }

var p1 = new Point { X = 1, Y = 2 };
var p2 = p1;   // コピー
p2.X = 99;
Console.WriteLine(p1.X); // 1（p1 は影響を受けない）

// 参照型（class）
class Box { public int Value; }

var b1 = new Box { Value = 1 };
var b2 = b1;   // 参照コピー
b2.Value = 99;
Console.WriteLine(b1.Value); // 99（同じオブジェクトを指す）`,
            },
          ],
          output: '1\n99',
        },
        {
          id: 's1-var',
          name: 'var と明示的型',
          level: 'basic',
          keywords: 'var 型推論 型宣言 dynamic',
          desc: '`var` はコンパイル時に型が確定するローカル変数の型推論。`dynamic` は実行時に型が解決される（パフォーマンスに注意）。',
          code: [
            {
              lang: 'C#',
              code: `var name = "Alice";          // string
var count = 42;              // int
var items = new List<int>(); // List<int>

// 明示的型も同義
string name2 = "Bob";

// dynamic（型チェックが実行時）
dynamic d = 10;
d = "now a string"; // OK（実行時エラーにはならない）`,
            },
          ],
        },
        {
          id: 's1-nullable',
          name: 'Nullable 参照型（C# 8+）',
          level: 'basic',
          keywords: 'nullable string? null許容 NRT NullReferenceException',
          desc: 'C# 8 から nullable reference types が導入された。`?` を付けることで「null を許容する」意図を明示し、コンパイラが null 安全性を静的解析する。',
          code: [
            {
              lang: 'C#',
              code: `#nullable enable

string nonNull = "hello";   // null 代入するとワーニング
string? nullable = null;    // OK

// null 合体演算子
string result = nullable ?? "default";

// null 条件演算子
int? len = nullable?.Length;

// null 免除演算子（null でないことを保証するとき）
string forced = nullable!; // CS8600 ワーニングを抑制`,
            },
          ],
          warn: '`!` 演算子の乱用は NullReferenceException の温床になる。使用は慎重に。',
        },
        {
          id: 's1-literal',
          name: '数値リテラル',
          level: 'basic',
          keywords: '数値リテラル 16進 2進 アンダースコア 区切り',
          desc: '`_` で桁区切り、`0x` で 16 進数、`0b` で 2 進数を表現できる。サフィックスで型を指定する。',
          code: [
            {
              lang: 'C#',
              code: `int million  = 1_000_000;
int hex      = 0xFF_EC_D8_12;
int binary   = 0b_1010_0101;
long big     = 9_876_543_210L;
double pi    = 3.141_592_653;
float f      = 1.5f;
decimal d    = 19.99m;

Console.WriteLine(million); // 1000000
Console.WriteLine(hex);     // 4293820434`,
            },
          ],
          output: '1000000\n4293820434',
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
          id: 's2-switch-expr',
          name: 'switch 式（C# 8+）',
          level: 'basic',
          keywords: 'switch式 パターンマッチ when arm',
          desc: 'C# 8 で導入された `switch` 式は値を返す。アーム（`=>`）形式で簡潔に書ける。パターンマッチと組み合わせると強力。',
          code: [
            {
              lang: 'C#',
              code: `string GetLabel(int score) => score switch
{
    >= 90 => "A",
    >= 80 => "B",
    >= 70 => "C",
    _      => "F",   // default
};

Console.WriteLine(GetLabel(85)); // B

// 型パターン
object obj = 3.14;
string desc = obj switch
{
    int i    => \`整数: \${i}\`,
    double d => \`実数: \${d}\`,
    string s => \`文字列: \${s}\`,
    _        => "不明",
};
Console.WriteLine(desc); // 実数: 3.14`,
            },
          ],
          output: 'B\n実数: 3.14',
        },
        {
          id: 's2-if',
          name: 'if / else・三項演算子',
          level: 'basic',
          keywords: 'if else 三項演算子 条件分岐',
          desc: '基本的な条件分岐。三項演算子 `? :` は式として値を返す。',
          code: [
            {
              lang: 'C#',
              code: `int x = 10;

if (x > 5)
    Console.WriteLine("大きい");
else if (x == 5)
    Console.WriteLine("等しい");
else
    Console.WriteLine("小さい");

// 三項演算子
string sign = x >= 0 ? "正" : "負";
Console.WriteLine(sign); // 正`,
            },
          ],
          output: '大きい\n正',
        },
        {
          id: 's2-loops',
          name: 'for / foreach / while',
          level: 'basic',
          keywords: 'for foreach while break continue ループ',
          desc: '`for` はインデックスループ、`foreach` はシーケンス走査、`while`/`do-while` は条件ループ。',
          code: [
            {
              lang: 'C#',
              code: `// for
for (int i = 0; i < 3; i++)
    Console.Write(\`\${i} \`); // 0 1 2
Console.WriteLine();

// foreach
int[] arr = [10, 20, 30];
foreach (var v in arr)
    Console.Write(\`\${v} \`); // 10 20 30
Console.WriteLine();

// while
int n = 3;
while (n > 0)
    Console.Write(\`\${n--} \`); // 3 2 1
Console.WriteLine();`,
            },
          ],
          output: '0 1 2 \n10 20 30 \n3 2 1 ',
        },
        {
          id: 's2-goto',
          name: 'goto（多重ループ脱出）',
          level: 'basic',
          keywords: 'goto ラベル 多重ループ break',
          desc: '`goto` は通常避けるべきだが、多重ネストループから抜け出す際に限定的に使われる。C# では `switch` の fallthrough にも必要。',
          code: [
            {
              lang: 'C#',
              code: `for (int i = 0; i < 3; i++)
{
    for (int j = 0; j < 3; j++)
    {
        if (i == 1 && j == 1)
            goto done;
        Console.WriteLine(\`(\${i},\${j})\`);
    }
}
done:
Console.WriteLine("完了");`,
            },
          ],
          output: '(0,0)\n(0,1)\n(0,2)\n(1,0)\n完了',
          warn: '`goto` の多用はコードの可読性を著しく下げる。通常は `bool` フラグや抽出メソッドで代替する。',
        },
      ],
    },

    // ─────────────────────────────────────────
    // s3: メソッド
    // ─────────────────────────────────────────
    {
      id: 's3',
      num: 3,
      title: 'メソッド',
      level: 'basic',
      items: [
        {
          id: 's3-overload',
          name: 'メソッドオーバーロード',
          level: 'basic',
          keywords: 'オーバーロード 多重定義 シグネチャ',
          desc: '同じ名前で異なるシグネチャ（引数型・数）を持つメソッドを定義できる。戻り値型だけの違いはオーバーロードにならない。',
          code: [
            {
              lang: 'C#',
              code: `static int Add(int a, int b) => a + b;
static double Add(double a, double b) => a + b;
static string Add(string a, string b) => a + b;

Console.WriteLine(Add(1, 2));       // 3
Console.WriteLine(Add(1.5, 2.5));   // 4
Console.WriteLine(Add("foo", "bar")); // foobar`,
            },
          ],
          output: '3\n4\nfoobar',
        },
        {
          id: 's3-default-named',
          name: 'デフォルト引数・名前付き引数',
          level: 'basic',
          keywords: 'デフォルト引数 名前付き引数 optional parameter named argument',
          desc: 'デフォルト引数はメソッド定義時に省略値を指定。名前付き引数は呼び出し時に引数名を明示し順序を変えられる。',
          code: [
            {
              lang: 'C#',
              code: `static void Greet(string name, string greeting = "Hello", bool upper = false)
{
    var msg = \`\${greeting}, \${name}!\`;
    Console.WriteLine(upper ? msg.ToUpper() : msg);
}

Greet("Alice");                          // Hello, Alice!
Greet("Bob", "Hi");                      // Hi, Bob!
Greet("Carol", upper: true);             // HELLO, CAROL!
Greet(greeting: "Hey", name: "Dave");    // Hey, Dave!`,
            },
          ],
          output: 'Hello, Alice!\nHi, Bob!\nHELLO, CAROL!\nHey, Dave!',
        },
        {
          id: 's3-ref-out',
          name: 'ref / out / in パラメータ',
          level: 'basic',
          keywords: 'ref out in 参照渡し 出力パラメータ',
          desc: '`ref`：呼び出し元変数への参照渡し（初期化必須）。`out`：メソッド内で代入して返す（初期化不要）。`in`：読み取り専用の参照渡し（コピーを避けつつ変更不可）。',
          code: [
            {
              lang: 'C#',
              code: `static void Swap(ref int a, ref int b)
{
    (a, b) = (b, a);
}

static bool TryParse(string s, out int result)
{
    return int.TryParse(s, out result);
}

int x = 1, y = 2;
Swap(ref x, ref y);
Console.WriteLine(\`\${x}, \${y}\`); // 2, 1

if (TryParse("42", out int n))
    Console.WriteLine(n); // 42`,
            },
          ],
          output: '2, 1\n42',
        },
        {
          id: 's3-params',
          name: 'params（可変長引数）',
          level: 'basic',
          keywords: 'params 可変長引数 配列 args',
          desc: '`params` キーワードで任意個数の引数を配列として受け取れる。メソッドシグネチャの最後のパラメータにのみ付与可能。',
          code: [
            {
              lang: 'C#',
              code: `static int Sum(params int[] numbers)
{
    int total = 0;
    foreach (var n in numbers) total += n;
    return total;
}

Console.WriteLine(Sum(1, 2, 3));           // 6
Console.WriteLine(Sum(10, 20, 30, 40));    // 100
Console.WriteLine(Sum());                   // 0

// 配列を直接渡すことも可能
int[] arr = [5, 6, 7];
Console.WriteLine(Sum(arr));               // 18`,
            },
          ],
          output: '6\n100\n0\n18',
        },
      ],
    },

    // ─────────────────────────────────────────
    // s4: 配列・スパン
    // ─────────────────────────────────────────
    {
      id: 's4',
      num: 4,
      title: '配列・スパン',
      level: 'basic',
      items: [
        {
          id: 's4-array',
          name: '1次元・多次元配列とジャグ配列',
          level: 'basic',
          keywords: '配列 多次元配列 ジャグ配列 array',
          desc: '多次元配列は `[,]` で矩形行列、ジャグ配列（配列の配列）は `[][]` で各行の長さを変えられる。',
          code: [
            {
              lang: 'C#',
              code: `// 1次元
int[] a = [1, 2, 3];
Console.WriteLine(a[1]); // 2

// 多次元（矩形）
int[,] matrix = { {1,2}, {3,4} };
Console.WriteLine(matrix[1, 0]); // 3

// ジャグ配列
int[][] jagged = new int[3][];
jagged[0] = [1];
jagged[1] = [2, 3];
jagged[2] = [4, 5, 6];
Console.WriteLine(jagged[2][1]); // 5`,
            },
          ],
          output: '2\n3\n5',
        },
        {
          id: 's4-span',
          name: 'Span<T> と Memory<T>',
          level: 'basic',
          keywords: 'Span Memory スタック スライス stackalloc ゼロコピー',
          desc: '`Span<T>` はスタック上のスライスを表す構造体。ヒープ割り当てなしに配列の一部を参照できる。`Memory<T>` は非同期メソッドでも使える heap ベースの版。',
          code: [
            {
              lang: 'C#',
              code: `int[] source = [0, 1, 2, 3, 4];

// スライス（コピーなし）
Span<int> span = source.AsSpan(1, 3); // [1, 2, 3]
span[0] = 99;
Console.WriteLine(source[1]); // 99（元配列が変わる）

// スタック割り当て
Span<byte> buf = stackalloc byte[128];
buf.Fill(0xFF);
Console.WriteLine(buf[0]); // 255`,
            },
          ],
          output: '99\n255',
        },
        {
          id: 's4-collection-expr',
          name: 'コレクション式（C# 12+）',
          level: 'basic',
          keywords: 'コレクション式 collection expression スプレッド .. C#12',
          desc: 'C# 12 でコレクション式 `[...]` が導入。配列・`List<T>`・`Span<T>` など多くのコレクション型に統一構文を使える。`..` でスプレッド展開も可能。',
          code: [
            {
              lang: 'C#',
              code: `int[] a = [1, 2, 3];
List<int> b = [4, 5, 6];

// スプレッド演算子
int[] merged = [..a, ..b, 7];
Console.WriteLine(string.Join(", ", merged));
// 1, 2, 3, 4, 5, 6, 7

// Span にも使える
Span<int> s = [10, 20, 30];
Console.WriteLine(s[1]); // 20`,
            },
          ],
          output: '1, 2, 3, 4, 5, 6, 7\n20',
        },
      ],
    },

    // ─────────────────────────────────────────
    // s5: 文字列
    // ─────────────────────────────────────────
    {
      id: 's5',
      num: 5,
      title: '文字列',
      level: 'basic',
      items: [
        {
          id: 's5-interpolation',
          name: '文字列補間',
          level: 'basic',
          keywords: '文字列補間 $ インターポレーション フォーマット',
          desc: '`$"..."` でブレース内の式を文字列に埋め込む。フォーマット指定子や整列指定子も使える。',
          code: [
            {
              lang: 'C#',
              code: `string name = "Alice";
int age = 30;
double pi = 3.14159;

Console.WriteLine(\`Hello, \${name}! Age: \${age}\`);
Console.WriteLine(\`Pi = \${pi:F2}\`);         // 小数点以下2桁
Console.WriteLine(\`\${name,-10}|\${age,5}\`);  // 整列`,
            },
          ],
          output: 'Hello, Alice! Age: 30\nPi = 3.14\nAlice     |   30',
        },
        {
          id: 's5-raw',
          name: 'raw 文字列リテラル（C# 11+）',
          level: 'basic',
          keywords: 'raw文字列 三重クォート エスケープ不要 JSON',
          desc: '`"""..."""` で囲むとエスケープ不要の raw 文字列。JSON や正規表現の記述が簡潔になる。`$"""..."""` で補間と組み合わせ可能。',
          code: [
            {
              lang: 'C#',
              code: `// エスケープ不要
string json = """
{
    "name": "Alice",
    "path": "C:\\\\Users\\\\Alice"
}
""";

// 補間 raw 文字列
string user = "Bob";
string msg = \$"""
    Hello, {user}!
    Path: C:\\Users\\{user}
""";
Console.WriteLine(msg);`,
            },
          ],
        },
        {
          id: 's5-stringbuilder',
          name: 'StringBuilder',
          level: 'basic',
          keywords: 'StringBuilder 文字列結合 パフォーマンス append',
          desc: 'ループ内で文字列を連結する際は `StringBuilder` を使う。`+` 演算子の連続使用は都度新しい文字列オブジェクトを生成するため非効率。',
          code: [
            {
              lang: 'C#',
              code: `using System.Text;

var sb = new StringBuilder();
for (int i = 0; i < 5; i++)
{
    sb.Append(i);
    if (i < 4) sb.Append(", ");
}
Console.WriteLine(sb.ToString()); // 0, 1, 2, 3, 4

sb.Insert(0, "Items: ");
sb.Replace("0", "zero");
Console.WriteLine(sb.ToString()); // Items: zero, 1, 2, 3, 4`,
            },
          ],
          output: '0, 1, 2, 3, 4\nItems: zero, 1, 2, 3, 4',
        },
        {
          id: 's5-format',
          name: 'string.Format / String.Create',
          level: 'basic',
          keywords: 'string.Format composite format String.Create パフォーマンス',
          desc: '`string.Format` は書式文字列と引数を組み合わせる古典的な方法。`String.Create` はバッファを直接操作し高パフォーマンスな文字列生成に使う。',
          code: [
            {
              lang: 'C#',
              code: `// string.Format
string s = string.Format("{0,-10} | {1:C}", "Apple", 1.5);
Console.WriteLine(s); // Apple      | ¥1.50

// String.Create（.NET 6+）
int len = 5;
string result = string.Create(len, 0, (buf, _) =>
{
    for (int i = 0; i < buf.Length; i++)
        buf[i] = (char)('A' + i);
});
Console.WriteLine(result); // ABCDE`,
            },
          ],
          output: 'Apple      | ¥1.50\nABCDE',
        },
      ],
    },

    // ─────────────────────────────────────────
    // s6: 例外処理
    // ─────────────────────────────────────────
    {
      id: 's6',
      num: 6,
      title: '例外処理',
      level: 'basic',
      items: [
        {
          id: 's6-try-catch',
          name: 'try / catch / finally',
          level: 'basic',
          keywords: 'try catch finally throw 例外処理',
          desc: '`try` ブロックで例外が発生すると対応する `catch` へジャンプ。`finally` は例外の有無にかかわらず必ず実行される。`throw` で再スローできる。',
          code: [
            {
              lang: 'C#',
              code: `try
{
    int[] arr = [1, 2, 3];
    Console.WriteLine(arr[5]); // IndexOutOfRangeException
}
catch (IndexOutOfRangeException ex)
{
    Console.WriteLine(\`配列外: \${ex.Message}\`);
}
catch (Exception ex)
{
    Console.WriteLine(\`その他: \${ex.Message}\`);
    throw; // スタックトレースを保持して再スロー
}
finally
{
    Console.WriteLine("finally 実行");
}`,
            },
          ],
          output: '配列外: Index was outside the bounds of the array.\nfinally 実行',
        },
        {
          id: 's6-when',
          name: 'when フィルタ',
          level: 'basic',
          keywords: 'catch when 例外フィルタ条件付きcatch',
          desc: '`catch (Exception e) when (条件)` で条件付きの catch ができる。条件が false のときはその catch ブロックをスキップし、スタックを巻き戻さない（デバッグに有利）。',
          code: [
            {
              lang: 'C#',
              code: `static void Process(int code)
{
    try
    {
        throw new InvalidOperationException("error") { HResult = code };
    }
    catch (InvalidOperationException ex) when (ex.HResult == 1)
    {
        Console.WriteLine("コード 1 のエラー");
    }
    catch (InvalidOperationException ex) when (ex.HResult == 2)
    {
        Console.WriteLine("コード 2 のエラー");
    }
}

Process(1); // コード 1 のエラー
Process(2); // コード 2 のエラー`,
            },
          ],
          output: 'コード 1 のエラー\nコード 2 のエラー',
        },
        {
          id: 's6-using',
          name: 'using 宣言（C# 8+）',
          level: 'basic',
          keywords: 'using IDisposable Dispose リソース解放 using宣言',
          desc: '`using` 文でスコープ終了時に自動的に `Dispose()` を呼ぶ。C# 8 の `using` 宣言（ブロックなし）はスコープ末まで有効。',
          code: [
            {
              lang: 'C#',
              code: `// 旧スタイル（ブロックあり）
using (var conn = new System.IO.StringReader("data"))
{
    Console.WriteLine(conn.ReadToEnd());
} // ここで Dispose

// C# 8+ using 宣言（ブロックなし）
static void WriteFile(string path)
{
    using var writer = new System.IO.StreamWriter(path);
    writer.WriteLine("Hello");
} // メソッド終了時に Dispose`,
            },
          ],
        },
        {
          id: 's6-custom-exception',
          name: '独自例外クラス',
          level: 'basic',
          keywords: '独自例外 カスタム例外 Exception 継承',
          desc: '`Exception` を継承して独自例外を作成する。メッセージを受け取るコンストラクタと、インナー例外を受け取るコンストラクタを実装するのが慣例。',
          code: [
            {
              lang: 'C#',
              code: `public class ValidationException : Exception
{
    public string Field { get; }

    public ValidationException(string field, string message)
        : base(message)
    {
        Field = field;
    }

    public ValidationException(string field, string message, Exception inner)
        : base(message, inner)
    {
        Field = field;
    }
}

throw new ValidationException("Email", "無効なメールアドレスです");`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────
    // s7: クラス・構造体・レコード
    // ─────────────────────────────────────────
    {
      id: 's7',
      num: 7,
      title: 'クラス・構造体・レコード',
      level: 'basic',
      items: [
        {
          id: 's7-class-struct',
          name: 'class vs struct の使い分け',
          level: 'basic',
          keywords: 'class struct 参照型 値型 設計指針',
          desc: '`struct` は小さく不変（または短命）なデータ向け。16 バイト以下が目安。頻繁にボックス化される場面では逆にオーバーヘッドになる。',
          code: [
            {
              lang: 'C#',
              code: `// struct: 小さなデータの値セマンティクス
readonly struct Color(byte r, byte g, byte b)
{
    public byte R => r;
    public byte G => g;
    public byte B => b;
    public override string ToString() => \`rgb(\${R},\${G},\${B})\`;
}

var red = new Color(255, 0, 0);
Console.WriteLine(red); // rgb(255,0,0)`,
            },
          ],
          output: 'rgb(255,0,0)',
        },
        {
          id: 's7-record',
          name: 'record と record struct（C# 9/10+）',
          level: 'basic',
          keywords: 'record record struct with式 不変 値等価性 C#10',
          desc: '`record` は不変データに最適。値等価性・`ToString` のオーバーライド・`with` 式によるコピーが自動生成される。`record struct`（C# 10+）は値型版。',
          code: [
            {
              lang: 'C#',
              code: `record Person(string Name, int Age);

var alice = new Person("Alice", 30);
var alice2 = alice with { Age = 31 }; // コピー＋変更

Console.WriteLine(alice);            // Person { Name = Alice, Age = 30 }
Console.WriteLine(alice2);           // Person { Name = Alice, Age = 31 }
Console.WriteLine(alice == alice2);  // False（値等価性）

// record struct（C# 10+）
record struct Point3D(double X, double Y, double Z);`,
            },
          ],
          output: 'Person { Name = Alice, Age = 30 }\nPerson { Name = Alice, Age = 31 }\nFalse',
        },
        {
          id: 's7-constructor-prop',
          name: 'コンストラクタ・プロパティ',
          level: 'basic',
          keywords: 'コンストラクタ プロパティ 自動実装 init getter setter',
          desc: '自動実装プロパティで `get`/`set` を簡潔に書ける。`init` アクセサ（C# 9+）はオブジェクト初期化子でのみ代入可能にする。',
          code: [
            {
              lang: 'C#',
              code: `class Product
{
    public string Name { get; init; } = "";
    public decimal Price { get; set; }

    public Product(string name, decimal price)
    {
        Name = name;
        Price = price;
    }
}

var p = new Product("Widget", 9.99m);
// p.Name = "Other"; // エラー: init-only
p.Price = 12.99m;
Console.WriteLine(\`\${p.Name}: \${p.Price:C}\`); // Widget: ¥12.99`,
            },
          ],
          output: 'Widget: ¥12.99',
        },
        {
          id: 's7-sealed-abstract-partial',
          name: 'sealed / abstract / partial',
          level: 'basic',
          keywords: 'sealed abstract partial 継承禁止 抽象クラス 分割クラス',
          desc: '`sealed` は継承禁止。`abstract` は抽象メンバを持ち直接インスタンス化不可。`partial` はファイルをまたいでクラス定義を分割できる（ソースジェネレータでも多用）。',
          code: [
            {
              lang: 'C#',
              code: `abstract class Shape
{
    public abstract double Area();
    public virtual string Describe() => \`面積: \${Area():F2}\`;
}

sealed class Circle(double radius) : Shape
{
    public override double Area() => Math.PI * radius * radius;
}

var c = new Circle(5);
Console.WriteLine(c.Describe()); // 面積: 78.54`,
            },
          ],
          output: '面積: 78.54',
        },
      ],
    },

    // ─────────────────────────────────────────
    // s8: インターフェース・継承
    // ─────────────────────────────────────────
    {
      id: 's8',
      num: 8,
      title: 'インターフェース・継承',
      level: 'basic',
      items: [
        {
          id: 's8-interface',
          name: 'interface（デフォルト実装、C# 8+）',
          level: 'basic',
          keywords: 'interface デフォルト実装 DIM C#8 多重実装',
          desc: 'C# 8 からインターフェースにデフォルト実装を持たせられる。既存の実装クラスを壊さずにインターフェースを拡張できる。',
          code: [
            {
              lang: 'C#',
              code: `interface ILogger
{
    void Log(string message);
    // デフォルト実装（C# 8+）
    void LogError(string msg) => Log(\`[ERROR] \${msg}\`);
}

class ConsoleLogger : ILogger
{
    public void Log(string message) => Console.WriteLine(message);
}

ILogger logger = new ConsoleLogger();
logger.Log("Info");        // Info
logger.LogError("Oops");   // [ERROR] Oops`,
            },
          ],
          output: 'Info\n[ERROR] Oops',
        },
        {
          id: 's8-abstract-class',
          name: 'abstract class',
          level: 'basic',
          keywords: 'abstract class 抽象クラス テンプレートメソッド',
          desc: '抽象クラスは共通実装を持ちつつ、サブクラスに特定メソッドの実装を強制する。インターフェースと異なり状態（フィールド）を持てる。',
          code: [
            {
              lang: 'C#',
              code: `abstract class Validator<T>
{
    public bool Validate(T value)
    {
        if (!IsValid(value))
        {
            OnInvalid(value);
            return false;
        }
        return true;
    }

    protected abstract bool IsValid(T value);
    protected virtual void OnInvalid(T value) =>
        Console.WriteLine(\`Invalid: \${value}\`);
}

class PositiveValidator : Validator<int>
{
    protected override bool IsValid(int value) => value > 0;
}

var v = new PositiveValidator();
Console.WriteLine(v.Validate(5));  // True
Console.WriteLine(v.Validate(-1)); // Invalid: -1 → False`,
            },
          ],
          output: 'True\nInvalid: -1\nFalse',
        },
        {
          id: 's8-explicit-impl',
          name: '明示的インターフェース実装',
          level: 'basic',
          keywords: '明示的実装 explicit interface implementation 名前衝突',
          desc: '同名のメンバを持つ複数インターフェースを実装する場合、`インターフェース名.メンバ名` で明示的に実装する。インターフェース経由でのみアクセスできる。',
          code: [
            {
              lang: 'C#',
              code: `interface IArea  { double Calculate(); }
interface IPerimeter { double Calculate(); }

class Rectangle(double w, double h) : IArea, IPerimeter
{
    double IArea.Calculate()      => w * h;
    double IPerimeter.Calculate() => 2 * (w + h);
}

var rect = new Rectangle(3, 4);
Console.WriteLine(((IArea)rect).Calculate());      // 12
Console.WriteLine(((IPerimeter)rect).Calculate()); // 14`,
            },
          ],
          output: '12\n14',
        },
        {
          id: 's8-is-as',
          name: 'is / as による型チェック',
          level: 'basic',
          keywords: 'is as キャスト 型チェック パターン',
          desc: '`is` は型チェック（C# 7+ はパターン変数を同時宣言可）。`as` は失敗時に null を返すキャスト。`(T)obj` は失敗時に例外を投げる。',
          code: [
            {
              lang: 'C#',
              code: `object obj = "hello";

// is パターン変数（C# 7+）
if (obj is string s)
    Console.WriteLine(\`文字列: \${s.ToUpper()}\`); // 文字列: HELLO

// as（失敗時 null）
var num = obj as int?;
Console.WriteLine(num.HasValue ? num.Value.ToString() : "null"); // null

// switch 式でのキャスト
string kind = obj switch
{
    string  => "string",
    int     => "int",
    _       => "other",
};
Console.WriteLine(kind); // string`,
            },
          ],
          output: '文字列: HELLO\nnull\nstring',
        },
      ],
    },

    // ─────────────────────────────────────────
    // s9: ジェネリクス
    // ─────────────────────────────────────────
    {
      id: 's9',
      num: 9,
      title: 'ジェネリクス',
      level: 'basic',
      items: [
        {
          id: 's9-constraint',
          name: '型パラメータと制約',
          level: 'basic',
          keywords: 'ジェネリクス 型制約 where T class new IComparable',
          desc: '`where T :` で型パラメータに制約を加える。`class`（参照型）、`struct`（値型）、`new()`（デフォルトコンストラクタ）、インターフェース名などを指定できる。',
          code: [
            {
              lang: 'C#',
              code: `static T Max<T>(T a, T b) where T : IComparable<T>
    => a.CompareTo(b) >= 0 ? a : b;

Console.WriteLine(Max(3, 7));         // 7
Console.WriteLine(Max("apple", "mango")); // mango

static T CreateAndInit<T>() where T : new()
{
    return new T();
}`,
            },
          ],
          output: '7\nmango',
        },
        {
          id: 's9-variance',
          name: '共変・反変',
          level: 'basic',
          keywords: '共変 反変 covariant contravariant out in IEnumerable IComparer',
          desc: 'ジェネリックインターフェースに `out`（共変）を付けると派生型として扱え、`in`（反変）を付けると基底型として扱える。',
          code: [
            {
              lang: 'C#',
              code: `// IEnumerable<out T> は共変
IEnumerable<string> strings = ["a", "b"];
IEnumerable<object> objects = strings; // OK（string は object の派生）

// IComparer<in T> は反変
IComparer<object> objCmp = Comparer<object>.Default;
IComparer<string> strCmp = objCmp; // OK

Console.WriteLine(strCmp.Compare("a", "b")); // -1`,
            },
          ],
          output: '-1',
        },
        {
          id: 's9-generic-method',
          name: 'ジェネリックメソッド',
          level: 'basic',
          keywords: 'ジェネリックメソッド 型推論 T',
          desc: 'メソッドに型パラメータを付けると、呼び出し時の引数から型が推論される。明示的に指定することもできる。',
          code: [
            {
              lang: 'C#',
              code: `static void Swap<T>(ref T a, ref T b)
{
    (a, b) = (b, a);
}

int x = 1, y = 2;
Swap(ref x, ref y);           // 型推論で T = int
Console.WriteLine(\`\${x}, \${y}\`); // 2, 1

string s1 = "foo", s2 = "bar";
Swap<string>(ref s1, ref s2); // 明示的に T = string
Console.WriteLine(\`\${s1}, \${s2}\`); // bar, foo`,
            },
          ],
          output: '2, 1\nbar, foo',
        },
        {
          id: 's9-default-typeof',
          name: 'default(T) / typeof(T) / nameof',
          level: 'basic',
          keywords: 'default typeof nameof リフレクション デフォルト値',
          desc: '`default(T)` は型のデフォルト値を返す（参照型は null、値型はゼロ相当）。`typeof(T)` は `Type` オブジェクトを返す。`nameof` はシンボル名を文字列にする（リネームリファクタリング安全）。',
          code: [
            {
              lang: 'C#',
              code: `Console.WriteLine(default(int));      // 0
Console.WriteLine(default(bool));     // False
Console.WriteLine(default(string));   // (空)

Console.WriteLine(typeof(List<int>).Name); // List\`1

string firstName = "Alice";
Console.WriteLine(nameof(firstName)); // firstName

static T GetDefault<T>() => default!;`,
            },
          ],
          output: '0\nFalse\n\nList`1\nfirstName',
        },
      ],
    },

    // ─────────────────────────────────────────
    // s10: LINQ
    // ─────────────────────────────────────────
    {
      id: 's10',
      num: 10,
      title: 'LINQ',
      level: 'basic',
      items: [
        {
          id: 's10-syntax',
          name: 'クエリ構文 vs メソッド構文',
          level: 'basic',
          keywords: 'LINQ クエリ構文 メソッド構文 from where select',
          desc: 'LINQ はクエリ構文（SQL 風）とメソッド構文（ラムダ式チェーン）の 2 通りで書ける。どちらもコンパイル後は同じになる。',
          code: [
            {
              lang: 'C#',
              code: `int[] nums = [1, 2, 3, 4, 5, 6];

// クエリ構文
var q = from n in nums
        where n % 2 == 0
        select n * n;

// メソッド構文（同義）
var m = nums.Where(n => n % 2 == 0).Select(n => n * n);

Console.WriteLine(string.Join(", ", q)); // 4, 16, 36
Console.WriteLine(string.Join(", ", m)); // 4, 16, 36`,
            },
          ],
          output: '4, 16, 36\n4, 16, 36',
        },
        {
          id: 's10-operators',
          name: 'Where / Select / SelectMany / GroupBy / Join',
          level: 'basic',
          keywords: 'Where Select SelectMany GroupBy Join LINQ 変換',
          desc: '主要 LINQ 演算子。`SelectMany` はネストしたシーケンスをフラット化。`GroupBy` はキーでグループ化。`Join` は 2 つのシーケンスを結合。',
          code: [
            {
              lang: 'C#',
              code: `string[] words = ["Hello", "World", "C#"];

// SelectMany: 文字列を文字にフラット化
var chars = words.SelectMany(w => w).Distinct().OrderBy(c => c);
Console.WriteLine(new string(chars.ToArray())); // #CHWdelor

// GroupBy
var groups = words.GroupBy(w => w.Length);
foreach (var g in groups)
    Console.WriteLine(\`len=\${g.Key}: \${string.Join(",", g)}\`);`,
            },
          ],
          output: '#CHWdelor\nlen=5: Hello,World\nlen=2: C#',
        },
        {
          id: 's10-aggregate',
          name: 'Aggregate / Sum / Average / Min / Max',
          level: 'basic',
          keywords: 'Aggregate Sum Average Min Max 集計 fold',
          desc: '集計演算子。`Aggregate` は fold 相当で任意の累積処理ができる。',
          code: [
            {
              lang: 'C#',
              code: `int[] data = [3, 1, 4, 1, 5, 9, 2, 6];

Console.WriteLine(data.Sum());              // 31
Console.WriteLine(data.Average());         // 3.875
Console.WriteLine(data.Min());             // 1
Console.WriteLine(data.Max());             // 9

// Aggregate: 文字列を ", " で結合
string joined = data.Select(n => n.ToString())
                    .Aggregate((acc, s) => \`\${acc}, \${s}\`);
Console.WriteLine(joined); // 3, 1, 4, 1, 5, 9, 2, 6`,
            },
          ],
          output: '31\n3.875\n1\n9\n3, 1, 4, 1, 5, 9, 2, 6',
        },
        {
          id: 's10-lazy',
          name: '遅延評価と ToList/ToArray',
          level: 'basic',
          keywords: '遅延評価 ToList ToArray 即時評価 IEnumerable',
          desc: 'LINQ クエリは `IEnumerable<T>` を返し、実際の処理は列挙時に行われる（遅延評価）。同じクエリを 2 回列挙すると 2 回処理される。`ToList()`/`ToArray()` で即時評価してキャッシュできる。',
          code: [
            {
              lang: 'C#',
              code: `int count = 0;
int[] source = [1, 2, 3, 4, 5];

var query = source.Where(n => { count++; return n > 2; });
Console.WriteLine(\`定義後 count=\${count}\`); // 0（未実行）

var result = query.ToList();
Console.WriteLine(\`ToList後 count=\${count}\`); // 5（全走査）

_ = query.ToList();
Console.WriteLine(\`再列挙 count=\${count}\`);   // 10（もう一度走査）`,
            },
          ],
          output: '定義後 count=0\nToList後 count=5\n再列挙 count=10',
        },
      ],
    },

    // ─────────────────────────────────────────
    // s11: コレクション
    // ─────────────────────────────────────────
    {
      id: 's11',
      num: 11,
      title: 'コレクション',
      level: 'basic',
      items: [
        {
          id: 's11-list-dict-set',
          name: 'List<T> / Dictionary<K,V> / HashSet<T>',
          level: 'basic',
          keywords: 'List Dictionary HashSet コレクション Add Remove Contains',
          desc: '`List<T>` は可変長配列。`Dictionary<K,V>` はキー・値の連想配列（O(1) 平均）。`HashSet<T>` は重複なし集合（O(1) 平均）。',
          code: [
            {
              lang: 'C#',
              code: `var list = new List<int> { 1, 2, 3 };
list.Add(4);
list.Remove(2);
Console.WriteLine(string.Join(", ", list)); // 1, 3, 4

var dict = new Dictionary<string, int>
{
    ["apple"] = 1,
    ["banana"] = 2,
};
dict["cherry"] = 3;
Console.WriteLine(dict["banana"]); // 2

var set = new HashSet<int> { 1, 2, 3 };
set.Add(2); // 無視（重複）
Console.WriteLine(set.Count); // 3`,
            },
          ],
          output: '1, 3, 4\n2\n3',
        },
        {
          id: 's11-ienumerable',
          name: 'IEnumerable<T> / IReadOnlyList<T>',
          level: 'basic',
          keywords: 'IEnumerable IReadOnlyList yield return 読み取り専用',
          desc: '`IEnumerable<T>` はシーケンスの最小インターフェース。`yield return` で遅延シーケンスを生成できる。`IReadOnlyList<T>` は読み取り専用のインデックスアクセスを提供。',
          code: [
            {
              lang: 'C#',
              code: `static IEnumerable<int> Fibonacci()
{
    int a = 0, b = 1;
    while (true)
    {
        yield return a;
        (a, b) = (b, a + b);
    }
}

var fibs = Fibonacci().Take(8);
Console.WriteLine(string.Join(", ", fibs)); // 0, 1, 1, 2, 3, 5, 8, 13

IReadOnlyList<string> names = ["Alice", "Bob"];
Console.WriteLine(names[0]); // Alice`,
            },
          ],
          output: '0, 1, 1, 2, 3, 5, 8, 13\nAlice',
        },
        {
          id: 's11-queue-stack-pq',
          name: 'Queue<T> / Stack<T> / PriorityQueue<T,P>',
          level: 'basic',
          keywords: 'Queue Stack PriorityQueue Enqueue Dequeue FIFO LIFO 優先度付きキュー',
          desc: '`Queue<T>` は FIFO、`Stack<T>` は LIFO。`PriorityQueue<T,P>`（.NET 6+）は優先度付きキューで、優先度の小さい要素から取り出す。',
          code: [
            {
              lang: 'C#',
              code: `var queue = new Queue<string>();
queue.Enqueue("first");
queue.Enqueue("second");
Console.WriteLine(queue.Dequeue()); // first

var stack = new Stack<int>();
stack.Push(1); stack.Push(2); stack.Push(3);
Console.WriteLine(stack.Pop()); // 3

// PriorityQueue（.NET 6+）: 優先度が小さい順
var pq = new PriorityQueue<string, int>();
pq.Enqueue("low",    10);
pq.Enqueue("high",    1);
pq.Enqueue("medium",  5);
Console.WriteLine(pq.Dequeue()); // high`,
            },
          ],
          output: 'first\n3\nhigh',
        },
        {
          id: 's11-initializer',
          name: 'コレクション初期化子',
          level: 'basic',
          keywords: 'コレクション初期化子 Add IEnumerable object initializer',
          desc: '`IEnumerable<T>` を実装し `Add` メソッドを持つクラスはコレクション初期化子 `{ }` が使える。C# 12 のコレクション式 `[ ]` とは別物。',
          code: [
            {
              lang: 'C#',
              code: `// コレクション初期化子（C# 3+）
var dict = new Dictionary<string, int>
{
    { "a", 1 },
    { "b", 2 },
};
// インデックス初期化子（C# 6+）
var dict2 = new Dictionary<string, int>
{
    ["x"] = 10,
    ["y"] = 20,
};

Console.WriteLine(dict["a"]);  // 1
Console.WriteLine(dict2["x"]); // 10`,
            },
          ],
          output: '1\n10',
        },
      ],
    },

    // ─────────────────────────────────────────
    // s12: async/await
    // ─────────────────────────────────────────
    {
      id: 's12',
      num: 12,
      title: 'async/await',
      level: 'basic',
      items: [
        {
          id: 's12-basic',
          name: 'async/await の基本',
          level: 'basic',
          keywords: 'async await 非同期 Task 非同期メソッド',
          desc: '`async` メソッドは `await` でスレッドをブロックせずに非同期操作を待機する。`await` を使うとスレッドプールに制御を戻し、完了後に再開する。',
          code: [
            {
              lang: 'C#',
              code: `static async Task<string> FetchAsync(string url)
{
    using var client = new System.Net.Http.HttpClient();
    string content = await client.GetStringAsync(url);
    return content[..50]; // 先頭 50 文字
}

// トップレベル async（C# 9+ / .NET 6+）
var result = await FetchAsync("https://example.com");
Console.WriteLine(result);`,
            },
          ],
        },
        {
          id: 's12-task-valuetask',
          name: 'Task<T> と ValueTask<T>',
          level: 'basic',
          keywords: 'Task ValueTask パフォーマンス 非同期 キャッシュ',
          desc: '`Task<T>` はヒープ割り当てを伴う。既にキャッシュされた結果を返す場合など、ほぼ同期的に完了するメソッドには `ValueTask<T>` を使うと高パフォーマンス。',
          code: [
            {
              lang: 'C#',
              code: `static ValueTask<int> GetCachedAsync(bool cached)
{
    if (cached)
        return new ValueTask<int>(42); // 同期的に完了（割り当て不要）

    return new ValueTask<int>(Task.FromResult(99)); // 非同期
}

int v1 = await GetCachedAsync(true);
int v2 = await GetCachedAsync(false);
Console.WriteLine(\`\${v1}, \${v2}\`); // 42, 99`,
            },
          ],
          output: '42, 99',
        },
        {
          id: 's12-whenall',
          name: 'Task.WhenAll / Task.WhenAny',
          level: 'basic',
          keywords: 'WhenAll WhenAny 並列非同期 複数タスク 待機',
          desc: '`Task.WhenAll` は複数タスクを並列実行してすべての完了を待つ。`Task.WhenAny` は最初に完了したタスクを返す。',
          code: [
            {
              lang: 'C#',
              code: `static async Task<int> DelayedValue(int ms, int val)
{
    await Task.Delay(ms);
    return val;
}

// 並列実行
var results = await Task.WhenAll(
    DelayedValue(100, 1),
    DelayedValue(200, 2),
    DelayedValue(50,  3)
);
Console.WriteLine(string.Join(", ", results)); // 1, 2, 3

// 最初に完了したタスク
var first = await Task.WhenAny(
    DelayedValue(300, 10),
    DelayedValue(100, 20)
);
Console.WriteLine(await first); // 20`,
            },
          ],
          output: '1, 2, 3\n20',
        },
        {
          id: 's12-cancellation',
          name: 'キャンセル（CancellationToken）',
          level: 'basic',
          keywords: 'CancellationToken CancellationTokenSource キャンセル OperationCanceledException',
          desc: '`CancellationTokenSource` でトークンを生成し、非同期メソッドに渡す。キャンセル時は `OperationCanceledException` がスローされる。',
          code: [
            {
              lang: 'C#',
              code: `using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(1));

try
{
    await Task.Delay(5000, cts.Token); // 5秒待機するが…
    Console.WriteLine("完了");
}
catch (OperationCanceledException)
{
    Console.WriteLine("キャンセルされました");
}

// 手動キャンセル
using var cts2 = new CancellationTokenSource();
cts2.Cancel();
Console.WriteLine(cts2.Token.IsCancellationRequested); // True`,
            },
          ],
          output: 'キャンセルされました\nTrue',
        },
      ],
    },

    // ─────────────────────────────────────────
    // s13: 並行処理
    // ─────────────────────────────────────────
    {
      id: 's13',
      num: 13,
      title: '並行処理',
      level: 'advanced',
      items: [
        {
          id: 's13-thread',
          name: 'Thread / ThreadPool',
          level: 'advanced',
          keywords: 'Thread ThreadPool QueueUserWorkItem スレッド',
          desc: '`Thread` クラスは OS スレッドを直接扱う。`ThreadPool.QueueUserWorkItem` はスレッドプールにタスクをキューイングする。通常は `Task` の利用を優先する。',
          code: [
            {
              lang: 'C#',
              code: `// Thread
var t = new Thread(() =>
{
    Console.WriteLine(\`Thread id=\${Environment.CurrentManagedThreadId}\`);
});
t.Start();
t.Join();

// ThreadPool
ThreadPool.QueueUserWorkItem(_ =>
{
    Console.WriteLine("ThreadPool worker");
});
Thread.Sleep(100); // 出力を待つ（本番では避ける）`,
            },
          ],
        },
        {
          id: 's13-parallel',
          name: 'Parallel.For / Parallel.ForEach',
          level: 'advanced',
          keywords: 'Parallel.For Parallel.ForEach 並列ループ PLINQ データ並列',
          desc: '`Parallel.For`/`ForEach` は自動的にスレッドプールを使って並列ループを実行する。各イテレーションが独立している場合に有効。',
          code: [
            {
              lang: 'C#',
              code: `int[] results = new int[5];

Parallel.For(0, 5, i =>
{
    results[i] = i * i; // 独立した計算
});
Console.WriteLine(string.Join(", ", results)); // 0, 1, 4, 9, 16

string[] words = ["hello", "world", "csharp"];
Parallel.ForEach(words, w =>
{
    Console.WriteLine(w.ToUpper());
});`,
            },
          ],
          output: '0, 1, 4, 9, 16\nHELLO\nWORLD\nCSHARP（順序不定）',
          warn: 'イテレーション間で共有状態を変更すると競合が発生する。スレッドセーフな操作か `lock` が必要。',
        },
        {
          id: 's13-lock',
          name: 'lock / Monitor / Interlocked',
          level: 'advanced',
          keywords: 'lock Monitor Interlocked 排他制御 競合 スレッドセーフ',
          desc: '`lock` は `Monitor.Enter`/`Exit` のシュガー。`Interlocked` はアトミックな加減算・比較交換を提供し、軽量な数値操作に使う。',
          code: [
            {
              lang: 'C#',
              code: `int counter = 0;
object lockObj = new();

Parallel.For(0, 1000, _ =>
{
    lock (lockObj) { counter++; } // 排他制御
});
Console.WriteLine(counter); // 1000

// Interlocked（ロック不要のアトミック操作）
int atomicCounter = 0;
Parallel.For(0, 1000, _ =>
{
    Interlocked.Increment(ref atomicCounter);
});
Console.WriteLine(atomicCounter); // 1000`,
            },
          ],
          output: '1000\n1000',
        },
        {
          id: 's13-channel',
          name: 'Channel<T>（.NET 5+）',
          level: 'advanced',
          keywords: 'Channel producer consumer 非同期キュー スレッドセーフ .NET5',
          desc: '`Channel<T>` は生産者・消費者パターン向けの非同期スレッドセーフキュー。`ChannelWriter<T>` で書き込み、`ChannelReader<T>` で非同期読み取りできる。',
          code: [
            {
              lang: 'C#',
              code: `using System.Threading.Channels;

var channel = Channel.CreateUnbounded<int>();

// 生産者
async Task Producer()
{
    for (int i = 0; i < 5; i++)
    {
        await channel.Writer.WriteAsync(i);
    }
    channel.Writer.Complete();
}

// 消費者
async Task Consumer()
{
    await foreach (var item in channel.Reader.ReadAllAsync())
        Console.Write(\`\${item} \`);
    Console.WriteLine();
}

await Task.WhenAll(Producer(), Consumer()); // 0 1 2 3 4`,
            },
          ],
          output: '0 1 2 3 4',
        },
      ],
    },

    // ─────────────────────────────────────────
    // s14: パターンマッチ
    // ─────────────────────────────────────────
    {
      id: 's14',
      num: 14,
      title: 'パターンマッチ',
      level: 'advanced',
      items: [
        {
          id: 's14-is-pattern',
          name: 'is パターン',
          level: 'advanced',
          keywords: 'is 型パターン 定数パターン 宣言パターン null チェック',
          desc: '`is` 演算子は型・定数・宣言パターンに対応。`is not null` で null チェックも簡潔に書ける。',
          code: [
            {
              lang: 'C#',
              code: `object[] items = [42, "hello", null, 3.14, true];

foreach (var item in items)
{
    if (item is int n and > 0)
        Console.WriteLine(\`正の整数: \${n}\`);
    else if (item is string { Length: > 3 } s)
        Console.WriteLine(\`長い文字列: \${s}\`);
    else if (item is null)
        Console.WriteLine("null");
    else
        Console.WriteLine(\`その他: \${item}\`);
}`,
            },
          ],
          output: '正の整数: 42\n長い文字列: hello\nnull\nその他: 3.14\nその他: True',
        },
        {
          id: 's14-switch-advanced',
          name: 'switch 式の高度なパターン',
          level: 'advanced',
          keywords: 'property pattern positional pattern list pattern switch式',
          desc: 'C# 8〜11 で property・positional・list パターンが追加。複雑な条件分岐を宣言的に書ける。',
          code: [
            {
              lang: 'C#',
              code: `record Point(int X, int Y);

static string Classify(Point p) => p switch
{
    { X: 0, Y: 0 }          => "原点",
    { X: 0 }                 => "Y軸上",
    { Y: 0 }                 => "X軸上",
    (var x, var y) when x == y => "対角線上",
    _                        => "その他",
};

Console.WriteLine(Classify(new Point(0, 0)));  // 原点
Console.WriteLine(Classify(new Point(3, 3)));  // 対角線上
Console.WriteLine(Classify(new Point(1, 2)));  // その他

// list パターン（C# 11+）
int[] arr = [1, 2, 3];
if (arr is [1, .., 3])
    Console.WriteLine("1 で始まり 3 で終わる");`,
            },
          ],
          output: '原点\n対角線上\nその他\n1 で始まり 3 で終わる',
        },
        {
          id: 's14-when',
          name: 'ガード句（when）',
          level: 'advanced',
          keywords: 'when ガード句 guard switch パターンマッチ',
          desc: '`switch` 式のアームに `when` を追加して追加条件を付けられる。パターンマッチと組み合わせ複雑なロジックを宣言的に表現する。',
          code: [
            {
              lang: 'C#',
              code: `static string FizzBuzz(int n) => n switch
{
    _ when n % 15 == 0 => "FizzBuzz",
    _ when n % 3  == 0 => "Fizz",
    _ when n % 5  == 0 => "Buzz",
    _                  => n.ToString(),
};

for (int i = 1; i <= 15; i++)
    Console.Write(FizzBuzz(i) + " ");
// 1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz`,
            },
          ],
          output: '1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz',
        },
        {
          id: 's14-null-safety',
          name: 'パターンマッチによる null 安全',
          level: 'advanced',
          keywords: 'null安全 パターンマッチ is not null NullReferenceException',
          desc: 'パターンマッチを使うと null チェックをより明示的・安全に書ける。`is not null` や `switch` の `null` アームを活用する。',
          code: [
            {
              lang: 'C#',
              code: `string? GetName(bool flag) => flag ? "Alice" : null;

string? name = GetName(false);

// パターンマッチで null を明示的に処理
if (name is not null)
    Console.WriteLine(\`Hello, \${name}!\`);
else
    Console.WriteLine("名前がありません");

// switch 式での null ハンドリング
string result = name switch
{
    null               => "（未設定）",
    { Length: 0 }      => "（空文字）",
    var n              => \`こんにちは、\${n}！\`,
};
Console.WriteLine(result); // （未設定）`,
            },
          ],
          output: '名前がありません\n（未設定）',
        },
      ],
    },

    // ─────────────────────────────────────────
    // s15: デリゲート・イベント・ラムダ
    // ─────────────────────────────────────────
    {
      id: 's15',
      num: 15,
      title: 'デリゲート・イベント・ラムダ',
      level: 'advanced',
      items: [
        {
          id: 's15-func-action',
          name: 'Func<T> / Action<T> / Predicate<T>',
          level: 'advanced',
          keywords: 'Func Action Predicate デリゲート 関数型 高階関数',
          desc: '`Func<TIn, TOut>` は戻り値あり、`Action<T>` は戻り値なし、`Predicate<T>` は `bool` を返す組み込みデリゲート型。高階関数を簡潔に書ける。',
          code: [
            {
              lang: 'C#',
              code: `Func<int, int, int> add = (a, b) => a + b;
Action<string> print = s => Console.WriteLine(s);
Predicate<int> isEven = n => n % 2 == 0;

Console.WriteLine(add(3, 4));          // 7
print("Hello!");                        // Hello!
Console.WriteLine(isEven(10));         // True

// 高階関数
static List<T> Filter<T>(List<T> list, Predicate<T> pred)
    => list.FindAll(pred);

var evens = Filter([1, 2, 3, 4, 5], isEven);
Console.WriteLine(string.Join(", ", evens)); // 2, 4`,
            },
          ],
          output: '7\nHello!\nTrue\n2, 4',
        },
        {
          id: 's15-multicast',
          name: 'デリゲートのマルチキャスト',
          level: 'advanced',
          keywords: 'マルチキャスト デリゲート += -= 呼び出しリスト',
          desc: 'デリゲートは `+=` で複数のメソッドを登録（マルチキャスト）できる。呼び出すと登録順に全メソッドが実行される。',
          code: [
            {
              lang: 'C#',
              code: `Action<string> log = s => Console.WriteLine(\`[LOG] \${s}\`);
log += s => Console.WriteLine(\`[FILE] \${s}\`);
log += s => Console.WriteLine(\`[NET] \${s}\`);

log("テストメッセージ");
// [LOG] テストメッセージ
// [FILE] テストメッセージ
// [NET] テストメッセージ

// 削除
log -= s => Console.WriteLine(\`[FILE] \${s}\`);`,
            },
          ],
          output: '[LOG] テストメッセージ\n[FILE] テストメッセージ\n[NET] テストメッセージ',
        },
        {
          id: 's15-event',
          name: 'event キーワード',
          level: 'advanced',
          keywords: 'event イベント EventHandler Subscribe 観察者パターン',
          desc: '`event` は特定の `delegate` を外部から直接呼び出せないようにカプセル化する。`+=`/`-=` で購読・解除のみ許可する。',
          code: [
            {
              lang: 'C#',
              code: `class Button
{
    public event Action<string>? Clicked;

    public void Click(string label)
    {
        Console.WriteLine(\`ボタン'\${label}'クリック\`);
        Clicked?.Invoke(label);
    }
}

var btn = new Button();
btn.Clicked += label => Console.WriteLine(\`ハンドラ1: \${label}\`);
btn.Clicked += label => Console.WriteLine(\`ハンドラ2: \${label}\`);

btn.Click("OK");`,
            },
          ],
          output: "ボタン'OK'クリック\nハンドラ1: OK\nハンドラ2: OK",
        },
        {
          id: 's15-lambda',
          name: 'ラムダ式（C# 10+ natural type）',
          level: 'advanced',
          keywords: 'ラムダ式 natural type C#10 static lambda クロージャ',
          desc: 'C# 10 でラムダ式に自然型（natural type）が付き、`var` で受けられるようになった。`static` ラムダはクロージャ変数をキャプチャしない。',
          code: [
            {
              lang: 'C#',
              code: `// C# 10: var でラムダを受ける（natural type）
var square = (int x) => x * x;
Console.WriteLine(square(5)); // 25

// 戻り値型の明示（C# 10+）
var divide = int (int a, int b) => a / b;
Console.WriteLine(divide(10, 3)); // 3

// static ラムダ（クロージャ禁止）
int multiplier = 3;
// static な場合は multiplier を使うとコンパイルエラー
var triple = static (int x) => x * 3;
Console.WriteLine(triple(4)); // 12`,
            },
          ],
          output: '25\n3\n12',
        },
      ],
    },

    // ─────────────────────────────────────────
    // s16: 最新機能（C# 10-12）
    // ─────────────────────────────────────────
    {
      id: 's16',
      num: 16,
      title: '最新機能（C# 10-12）',
      level: 'advanced',
      items: [
        {
          id: 's16-global-using',
          name: 'グローバル using / implicit using',
          level: 'advanced',
          keywords: 'global using implicit using C#10 名前空間 using ディレクティブ',
          desc: '`global using` はプロジェクト全体に using を適用する（C# 10+）。SDK スタイルプロジェクトでは `<ImplicitUsings>enable</ImplicitUsings>` で一般的な名前空間が自動 import される。',
          code: [
            {
              lang: 'C#',
              code: `// GlobalUsings.cs に書くと全ファイルで有効
global using System;
global using System.Collections.Generic;
global using System.Linq;
global using System.Threading.Tasks;

// .csproj
// <ImplicitUsings>enable</ImplicitUsings>
// → System, System.Linq, System.IO などが自動 import

// これ以降のファイルで using 不要
var list = new List<int> { 1, 2, 3 };
Console.WriteLine(list.Sum()); // 6`,
            },
          ],
          output: '6',
        },
        {
          id: 's16-required',
          name: 'required メンバ（C# 11+）',
          level: 'advanced',
          keywords: 'required メンバ C#11 必須プロパティ オブジェクト初期化子',
          desc: '`required` を付けたプロパティ/フィールドは、オブジェクト初期化子で必ず指定しないとコンパイルエラーになる。コンストラクタなしで必須初期化を強制できる。',
          code: [
            {
              lang: 'C#',
              code: `class User
{
    public required string Name { get; init; }
    public required string Email { get; init; }
    public int Age { get; init; }
}

// OK: required メンバをすべて指定
var user = new User { Name = "Alice", Email = "alice@example.com" };

// NG: Name が未指定 → CS9035 コンパイルエラー
// var bad = new User { Email = "bob@example.com" };

Console.WriteLine(\`\${user.Name} <\${user.Email}>\`);`,
            },
          ],
          output: 'Alice <alice@example.com>',
        },
        {
          id: 's16-primary-constructor',
          name: 'primary constructor（C# 12+）',
          level: 'advanced',
          keywords: 'primary constructor プライマリコンストラクタ C#12 class struct',
          desc: 'C# 12 で `class` と `struct` にもプライマリコンストラクタが使えるようになった（`record` のみだった制限を解除）。パラメータはクラス全体で参照できる。',
          code: [
            {
              lang: 'C#',
              code: `class Logger(string prefix)
{
    // prefix はクラス全体のスコープで利用可能
    public void Log(string message) =>
        Console.WriteLine(\`[\${prefix}] \${message}\`);

    public void Error(string message) =>
        Console.WriteLine(\`[\${prefix}][ERROR] \${message}\`);
}

var logger = new Logger("App");
logger.Log("起動しました");        // [App] 起動しました
logger.Error("接続に失敗");        // [App][ERROR] 接続に失敗`,
            },
          ],
          output: '[App] 起動しました\n[App][ERROR] 接続に失敗',
        },
        {
          id: 's16-file-scope',
          name: 'file スコープ型（C# 11+）・インターセプター',
          level: 'advanced',
          keywords: 'file スコープ型 C#11 インターセプター interceptor ソースジェネレータ',
          desc: '`file` 修飾子を付けた型はそのファイル内のみで可視。ソースジェネレータが生成する補助型の名前衝突を避けるために使われる。インターセプターはメソッド呼び出しをコンパイル時に差し替える実験的機能（C# 12 preview）。',
          code: [
            {
              lang: 'C#',
              code: `// このファイルだけで使える型
file class InternalHelper
{
    public static string Format(int n) => \`[\${n}]\`;
}

Console.WriteLine(InternalHelper.Format(42)); // [42]

// 別ファイルから InternalHelper は見えない（コンパイルエラー）

// インターセプター（実験的 / C# 12 preview）
// [System.Runtime.CompilerServices.InterceptsLocation(...)]
// static void MyInterceptor(...) { ... }`,
            },
          ],
          output: '[42]',
          warn: 'インターセプターは C# 12 時点でプレビュー機能であり、将来的に変更される可能性がある。',
        },
      ],
    },
  ],
};

export default data;
