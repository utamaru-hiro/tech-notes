import type { LanguageGuide } from '../../types';

const data: LanguageGuide = {
  lang: 'Java',
  langSlug: 'java',
  version: 'Java 21',
  lead: `他言語の経験者が 2〜3 時間でざっと読み通せるリファレンスです。Java 固有の型システム・コレクション・Stream API・並行処理を重点的に解説します。`,
  accent: '#b85c00',
  accent2: '#fff0e0',
  bgGradientTop: '#fdf5ee',
  bgRadialLeft: 'rgba(184,92,0,0.12)',
  bgRadialRight: 'rgba(250,160,0,0.10)',
  badgeGradient: 'linear-gradient(135deg, #7a3a00, #b85c00)',
  heroEmoji: '☕',
  navGroups: [
    { label: '基礎', sections: ['s1', 's2', 's3', 's4', 's5', 's6'] },
    { label: 'OOP', sections: ['s7', 's8', 's9'] },
    { label: 'コレクション・Stream', sections: ['s10', 's11', 's12'] },
    { label: '実用', sections: ['s13', 's14'] },
    { label: '応用', sections: ['s15', 's16'] },
  ],
  sections: [
    // ─────────────────────────────────────────────
    // s1: 変数・型・リテラル
    // ─────────────────────────────────────────────
    {
      id: 's1',
      num: 1,
      title: '変数・型・リテラル',
      level: 'basic',
      items: [
        {
          id: 's1-primitive-ref',
          name: 'プリミティブ型と参照型（boxing/unboxing）',
          level: 'basic',
          keywords: 'int long double boolean char byte short float Integer Long Double Boolean boxing unboxing プリミティブ 参照型',
          desc: 'Java は `int`, `long`, `double`, `boolean` などの**プリミティブ型**と、それをラップした**参照型**（`Integer`, `Long`, `Double`, `Boolean`）を区別します。コレクションはオブジェクトしか受け取れないため、プリミティブは自動的にラッパーへ変換（**オートボクシング**）され、その逆（**アンボクシング**）も自動です。null をアンボクシングすると `NullPointerException` が発生します。',
          code: [
            {
              lang: 'Java',
              code: `int a = 42;           // プリミティブ
Integer b = 42;       // オートボクシング（int → Integer）
int c = b;            // アンボクシング（Integer → int）

// コレクションにはラッパー型が必要
List<Integer> list = new ArrayList<>();
list.add(10);         // int → Integer に自動変換
int val = list.get(0); // Integer → int に自動変換

// 罠: null のアンボクシング
Integer n = null;
// int x = n; // NullPointerException!`,
            },
          ],
          warn: 'オートボクシングはパフォーマンスコストを伴います。ループ内で大量のボクシングが発生する場合は `int[]` や `IntStream` を使いましょう。',
        },
        {
          id: 's1-var',
          name: 'var（ローカル型推論）',
          level: 'basic',
          keywords: 'var ローカル型推論 型推論 Java10',
          desc: 'Java 10 以降、ローカル変数に `var` を使うと型推論が働き、初期化式から型が決まります。メソッド引数・フィールド・戻り値には使えません。可読性が下がる場所では避け、型が明確なときのみ使うのが慣習です。',
          code: [
            {
              lang: 'Java',
              code: `var message = "Hello, Java!";    // String と推論
var count   = 100;               // int と推論
var items   = new ArrayList<String>(); // ArrayList<String>

// for-each でも使える
for (var item : items) {
    System.out.println(item);
}

// NG: var はローカル変数のみ
// public var field = "NG"; // コンパイルエラー`,
            },
          ],
        },
        {
          id: 's1-literals',
          name: 'リテラル（数値区切り・進数・サフィックス）',
          level: 'basic',
          keywords: 'リテラル 数値 16進 2進 long サフィックス アンダースコア 区切り',
          desc: 'Java 7 以降、数値リテラルに `_` を区切り文字として挿入できます。長整数は `L` サフィックス、16 進は `0x`、2 進は `0b` で記述します。',
          code: [
            {
              lang: 'Java',
              code: `int million  = 1_000_000;          // 読みやすく区切る
long bigNum  = 9_223_372_036L;    // long サフィックス
int hex      = 0xFF_EC_D1_12;     // 16 進（RGBA カラーなど）
int binary   = 0b1010_0001;       // 2 進
double pi    = 3.141_592_653;

System.out.println(million);  // 1000000
System.out.println(hex);      // 4293165330`,
            },
          ],
          output: `1000000
4293165330`,
        },
        {
          id: 's1-cast',
          name: '型変換（widening / narrowing・キャスト）',
          level: 'basic',
          keywords: '型変換 キャスト widening narrowing 暗黙変換 明示キャスト',
          desc: '小さい型から大きい型への変換（**widening**）は自動で行われます。逆方向（**narrowing**）は明示的なキャストが必要で、データが失われる可能性があります。`String` ↔ 数値の変換は `Integer.parseInt()` / `String.valueOf()` を使います。',
          code: [
            {
              lang: 'Java',
              code: `// widening: 暗黙変換（安全）
int i = 100;
long l = i;      // int → long
double d = l;    // long → double

// narrowing: 明示キャスト（精度損失あり）
double x = 9.99;
int  y = (int) x;  // 9 （小数切り捨て）
byte b = (byte) 200; // -56 （オーバーフロー）

// String 変換
String s  = String.valueOf(42);   // "42"
int    n  = Integer.parseInt("42"); // 42
double dv = Double.parseDouble("3.14");`,
            },
          ],
          warn: 'narrowing キャストは実行時チェックが行われないため、オーバーフローやデータ欠損が**無音で**起きます。境界値を事前に確認してください。',
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
          id: 's2-switch-expr',
          name: 'switch 式（Java 14+）',
          level: 'basic',
          keywords: 'switch 式 arrow yield Java14 パターン マッチ',
          desc: 'Java 14 で `switch` が**式**として使えるようになり、`->` 構文でフォールスルーなしの簡潔な分岐が書けます。複数ステートメントが必要なブロックでは `yield` で値を返します。',
          code: [
            {
              lang: 'Java',
              code: `// switch 式（arrow 構文）
String day = "MON";
int numLetters = switch (day) {
    case "MON", "FRI", "SUN" -> 6;
    case "TUE"               -> 7;
    case "THU", "SAT"        -> 8;
    case "WED"               -> 9;
    default                  -> throw new IllegalArgumentException(day);
};

// yield を使うブロック形式
int result = switch (day) {
    case "MON" -> {
        System.out.println("Monday");
        yield 1;
    }
    default -> 0;
};`,
            },
          ],
        },
        {
          id: 's2-loops',
          name: 'for / while / 拡張 for',
          level: 'basic',
          keywords: 'for while do-while 拡張for foreach ループ 繰り返し',
          desc: '基本的な 3 種のループを押さえます。拡張 for（for-each）は `Iterable` を実装するあらゆるオブジェクトに使えます。インデックスが不要なら拡張 for が最も読みやすいです。',
          code: [
            {
              lang: 'Java',
              code: `// 基本 for
for (int i = 0; i < 5; i++) {
    System.out.print(i + " "); // 0 1 2 3 4
}

// while
int n = 10;
while (n > 0) { n -= 3; }

// 拡張 for（for-each）
List<String> fruits = List.of("Apple", "Banana", "Cherry");
for (String fruit : fruits) {
    System.out.println(fruit);
}`,
            },
          ],
          output: `0 1 2 3 4 
Apple
Banana
Cherry`,
        },
        {
          id: 's2-labeled-break',
          name: 'ラベル付き break / continue',
          level: 'basic',
          keywords: 'break continue label ラベル 多重ループ 脱出',
          desc: '多重ループを外側から脱出したい場合、Java ではラベルを付けた `break`/`continue` が使えます。`goto` はなく、ラベルはループや `switch` にのみ付けられます。',
          code: [
            {
              lang: 'Java',
              code: `outer:
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (j == 1) continue outer; // 外側ループの次の反復へ
        if (i == 2) break outer;    // 外側ループを完全に抜ける
        System.out.println(i + "," + j);
    }
}
// 出力:
// 0,0
// 1,0`,
            },
          ],
          output: `0,0
1,0`,
        },
        {
          id: 's2-instanceof-pattern',
          name: 'instanceof パターンマッチ（Java 16+）',
          level: 'basic',
          keywords: 'instanceof パターンマッチ 型チェック キャスト Java16',
          desc: 'Java 16 以降、`instanceof` でパターン変数を宣言すると、型チェックとキャストを一度に行えます。冗長なキャストが不要になりコードが簡潔になります。',
          code: [
            {
              lang: 'Java',
              code: `Object obj = "Hello, Pattern!";

// 旧来のスタイル
if (obj instanceof String) {
    String s = (String) obj; // 冗長
    System.out.println(s.length());
}

// Java 16+ パターンマッチ
if (obj instanceof String s) {
    System.out.println(s.length()); // キャスト不要
}

// switch でも使える（Java 21+）
Object val = 42;
String desc = switch (val) {
    case Integer i -> "int: " + i;
    case String  s -> "str: " + s;
    default        -> "other";
};`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s3: 関数・メソッド
    // ─────────────────────────────────────────────
    {
      id: 's3',
      num: 3,
      title: '関数・メソッド',
      level: 'basic',
      items: [
        {
          id: 's3-overload',
          name: 'メソッドオーバーロード',
          level: 'basic',
          keywords: 'オーバーロード overload シグネチャ 多重定義',
          desc: '同じ名前で引数の型・数が異なるメソッドを複数定義できます（**オーバーロード**）。戻り値の型だけが異なる場合はオーバーロードになりません。コンパイル時に静的に解決されます。',
          code: [
            {
              lang: 'Java',
              code: `class Printer {
    void print(String s)         { System.out.println("str: " + s); }
    void print(int n)            { System.out.println("int: " + n); }
    void print(String s, int n)  { System.out.println(s + " x" + n); }
}

Printer p = new Printer();
p.print("hello");    // str: hello
p.print(42);         // int: 42
p.print("hi", 3);    // hi x3`,
            },
          ],
        },
        {
          id: 's3-varargs',
          name: '可変長引数（varargs）',
          level: 'basic',
          keywords: 'varargs 可変長引数 ... 配列',
          desc: '`型... 変数名` で可変長引数を宣言すると、0 個以上の値を受け取れます。メソッド内では配列として扱われます。varargs はパラメータリストの最後にのみ置けます。',
          code: [
            {
              lang: 'Java',
              code: `int sum(int... nums) {
    int total = 0;
    for (int n : nums) total += n;
    return total;
}

System.out.println(sum());        // 0
System.out.println(sum(1, 2));    // 3
System.out.println(sum(1,2,3,4)); // 10

// 配列をそのまま渡しても OK
int[] arr = {5, 6, 7};
System.out.println(sum(arr));     // 18`,
            },
          ],
          output: `0
3
10
18`,
        },
        {
          id: 's3-method-ref',
          name: 'メソッド参照（Class::method）',
          level: 'basic',
          keywords: 'メソッド参照 method reference :: ラムダ 関数型',
          desc: 'メソッドをラムダの代わりに `::` 演算子で参照できます。4 種類あり、それぞれラムダ式と等価です。',
          code: [
            {
              lang: 'Java',
              code: `import java.util.*;
import java.util.stream.*;

List<String> words = List.of("banana", "apple", "cherry");

// 1. static メソッド参照
words.stream().map(Integer::parseInt); // Integer.parseInt(s)

// 2. インスタンスメソッド参照（任意のインスタンス）
words.stream().map(String::toUpperCase).forEach(System.out::println);

// 3. インスタンスメソッド参照（特定インスタンス）
String prefix = "fruit:";
words.stream().map(prefix::concat).forEach(System.out::println);

// 4. コンストラクタ参照
words.stream().map(StringBuilder::new).collect(Collectors.toList());`,
            },
          ],
        },
        {
          id: 's3-static-this',
          name: 'static メソッドと this',
          level: 'basic',
          keywords: 'static this インスタンス クラスメソッド',
          desc: '`static` メソッドはインスタンスなしで呼び出せますが、`this` にアクセスできません。`this` はコンストラクタの委譲（`this(...)`）やフィールドの曖昧さ解消に使います。',
          code: [
            {
              lang: 'Java',
              code: `class Counter {
    private int count;

    Counter()         { this(0); }       // コンストラクタ委譲
    Counter(int init) { this.count = init; }

    void increment()  { this.count++; }  // this で曖昧さ解消
    int  getCount()   { return count; }

    static Counter zero() { return new Counter(0); } // static ファクトリ
}

Counter c = Counter.zero();
c.increment();
System.out.println(c.getCount()); // 1`,
            },
          ],
          output: `1`,
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s4: 配列
    // ─────────────────────────────────────────────
    {
      id: 's4',
      num: 4,
      title: '配列',
      level: 'basic',
      items: [
        {
          id: 's4-basic-array',
          name: '1 次元・多次元配列',
          level: 'basic',
          keywords: '配列 array 1次元 2次元 多次元 初期化 length',
          desc: '配列は固定長のオブジェクトです。`new 型[長さ]` で生成し、`length` フィールドでサイズを取得します。多次元配列は「配列の配列」で、各行の長さが異なるジャグ配列も作れます。',
          code: [
            {
              lang: 'Java',
              code: `// 1次元配列
int[] nums = new int[3];          // [0, 0, 0]
int[] init = {10, 20, 30};        // 初期化子
System.out.println(init.length);  // 3

// 2次元配列
int[][] matrix = new int[2][3];
matrix[0][1] = 5;

// ジャグ配列（各行長さ異なる）
int[][] jagged = new int[3][];
jagged[0] = new int[]{1};
jagged[1] = new int[]{2, 3};
jagged[2] = new int[]{4, 5, 6};`,
            },
          ],
          output: `3`,
        },
        {
          id: 's4-arrays-util',
          name: 'Arrays ユーティリティ',
          level: 'basic',
          keywords: 'Arrays sort copyOf fill binarySearch toString ユーティリティ',
          desc: '`java.util.Arrays` にはソート・コピー・充填・2 分探索などが揃っています。`Arrays.toString()` で配列を見やすく表示できます。',
          code: [
            {
              lang: 'Java',
              code: `import java.util.Arrays;

int[] arr = {5, 3, 8, 1, 4};
Arrays.sort(arr);
System.out.println(Arrays.toString(arr)); // [1, 3, 4, 5, 8]

int[] copy = Arrays.copyOf(arr, 3);       // [1, 3, 4]
int[] range = Arrays.copyOfRange(arr, 1, 4); // [3, 4, 5]

int[] filled = new int[5];
Arrays.fill(filled, 7);                   // [7, 7, 7, 7, 7]

int idx = Arrays.binarySearch(arr, 4);   // 2（ソート済みが前提）`,
            },
          ],
          output: `[1, 3, 4, 5, 8]`,
        },
        {
          id: 's4-array-vs-list',
          name: '配列 vs ArrayList の使い分け',
          level: 'basic',
          keywords: 'ArrayList 配列 使い分け 固定長 可変長',
          desc: '配列は固定長で高速、`ArrayList` は可変長で便利なコレクション API が使えます。プリミティブを大量に扱う場合や固定サイズが確定している場合は配列が効率的です。',
          code: [
            {
              lang: 'Java',
              code: `// 配列: 固定長・高速・プリミティブ可
int[] primes = {2, 3, 5, 7, 11};

// ArrayList: 可変長・豊富なメソッド
import java.util.ArrayList;
ArrayList<Integer> list = new ArrayList<>();
list.add(2); list.add(3); list.add(5);
list.remove(Integer.valueOf(3)); // 値で削除
System.out.println(list); // [2, 5]

// 配列 ↔ List の変換
List<String> fromArray = Arrays.asList("a", "b", "c"); // 固定サイズ
List<String> mutable   = new ArrayList<>(fromArray);    // 可変`,
            },
          ],
          output: `[2, 5]`,
        },
        {
          id: 's4-covariant-array',
          name: '配列の落とし穴（共変配列）',
          level: 'basic',
          keywords: '共変 covariant ArrayStoreException 型安全 落とし穴',
          desc: 'Java の配列は**共変**です。`String[]` は `Object[]` に代入できますが、実行時に誤った型を格納しようとすると `ArrayStoreException` がスローされます。ジェネリクスを使えばコンパイル時に検出できます。',
          code: [
            {
              lang: 'Java',
              code: `Object[] objs = new String[3]; // コンパイル OK（共変）
objs[0] = "hello";           // OK
// objs[1] = 42;             // ArrayStoreException（実行時エラー）

// ジェネリクスは非共変（型安全）
// List<Object> list = new ArrayList<String>(); // コンパイルエラー
List<? extends Object> safe = new ArrayList<String>(); // ワイルドカードで解決`,
            },
          ],
          warn: '配列よりもジェネリクスコレクション（`List<T>` など）を優先してください。型安全性がコンパイル時に保証されます。',
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
          id: 's5-immutable',
          name: 'String の不変性とプール',
          level: 'basic',
          keywords: 'String 不変 immutable プール intern equals ==',
          desc: '`String` は不変（immutable）オブジェクトです。同じリテラルは**文字列プール**で共有されるため `==` が `true` になることがありますが、内容比較には必ず `equals()` を使います。',
          code: [
            {
              lang: 'Java',
              code: `String a = "hello";
String b = "hello";
String c = new String("hello"); // 明示的に新オブジェクト生成

System.out.println(a == b);       // true（プール共有）
System.out.println(a == c);       // false（別オブジェクト）
System.out.println(a.equals(c));  // true（内容比較）

// 不変なので連結は新オブジェクト生成
String s = "foo";
s = s + "bar"; // "foo" は変わらず新 String "foobar" が作られる`,
            },
          ],
          output: `true
false
true`,
          warn: '`null.equals(s)` は NPE になります。`Objects.equals(a, b)` または `"literal".equals(var)` の形（リテラルを左辺）にする習慣をつけましょう。',
        },
        {
          id: 's5-stringbuilder',
          name: 'StringBuilder と StringBuffer',
          level: 'basic',
          keywords: 'StringBuilder StringBuffer append 可変 スレッドセーフ パフォーマンス',
          desc: '大量の文字列連結には `StringBuilder`（非スレッドセーフ・高速）を使います。`StringBuffer` はスレッドセーフですが低速で、現代のコードではほぼ不要です。',
          code: [
            {
              lang: 'Java',
              code: `StringBuilder sb = new StringBuilder();
sb.append("Hello");
sb.append(", ");
sb.append("Java!");
sb.insert(5, " World");
sb.delete(5, 11);
System.out.println(sb.toString()); // Hello, Java!

// ループでの連結は StringBuilder が必須
StringBuilder csv = new StringBuilder();
for (int i = 0; i < 5; i++) {
    if (i > 0) csv.append(',');
    csv.append(i);
}
System.out.println(csv); // 0,1,2,3,4`,
            },
          ],
          output: `Hello, Java!
0,1,2,3,4`,
        },
        {
          id: 's5-format',
          name: 'String.format / formatted（Java 15+）',
          level: 'basic',
          keywords: 'format formatted printf %s %d フォーマット 書式',
          desc: '`String.format()` は printf 風のフォーマットを行います。Java 15 以降は `String` インスタンスメソッド `formatted()` も使えます。',
          code: [
            {
              lang: 'Java',
              code: `String s1 = String.format("名前: %s, 年齢: %d", "Alice", 30);
System.out.println(s1); // 名前: Alice, 年齢: 30

// Java 15+ formatted()
String s2 = "座標: (%.2f, %.2f)".formatted(3.14159, 2.71828);
System.out.println(s2); // 座標: (3.14, 2.72)

// %n はプラットフォーム改行（\n より推奨）
String table = "%-10s %5d%n".formatted("items", 42);
System.out.print(table);`,
            },
          ],
          output: `名前: Alice, 年齢: 30
座標: (3.14, 2.72)
items         42`,
        },
        {
          id: 's5-text-block',
          name: 'テキストブロック（Java 15+）',
          level: 'basic',
          keywords: 'テキストブロック text block """ 複数行 JSON SQL HTML インデント',
          desc: 'Java 15 以降、`"""..."""` で複数行のテキストブロックを記述できます。共通インデントは自動的に除去され、JSON や SQL の埋め込みに便利です。',
          code: [
            {
              lang: 'Java',
              code: `String json = """
        {
          "name": "Alice",
          "age": 30
        }
        """;
System.out.println(json);

String query = """
        SELECT *
        FROM users
        WHERE id = %d
        """.formatted(42);
System.out.println(query);`,
            },
          ],
          output: `{
  "name": "Alice",
  "age": 30
}

SELECT *
FROM users
WHERE id = 42`,
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
          id: 's6-checked-unchecked',
          name: 'checked / unchecked 例外の違い',
          level: 'basic',
          keywords: 'checked unchecked RuntimeException Exception throws 検査例外 非検査例外',
          desc: 'Java の例外は**checked**（コンパイラが `throws` 宣言か catch を強制）と**unchecked**（`RuntimeException` のサブクラス、宣言不要）に分かれます。現代の設計では checked 例外を多用せず、unchecked 例外を好む傾向があります。',
          code: [
            {
              lang: 'Java',
              code: `import java.io.*;

// checked 例外: throws 宣言が必要
void readFile(String path) throws IOException {
    Files.readString(Path.of(path));
}

// unchecked 例外: 宣言不要
void divide(int a, int b) {
    if (b == 0) throw new ArithmeticException("zero division");
    System.out.println(a / b);
}

// checked を unchecked に包む（ライブラリ設計でよく使う）
void wrappedRead(String path) {
    try {
        readFile(path);
    } catch (IOException e) {
        throw new RuntimeException("Failed to read: " + path, e);
    }
}`,
            },
          ],
        },
        {
          id: 's6-try-with-resources',
          name: 'try-with-resources（AutoCloseable）',
          level: 'basic',
          keywords: 'try-with-resources AutoCloseable Closeable リソース管理 自動クローズ',
          desc: '`AutoCloseable` を実装したリソースを `try(...)` に宣言すると、ブロック終了時に自動的に `close()` が呼ばれます。複数リソースはセミコロンで区切って宣言できます。',
          code: [
            {
              lang: 'Java',
              code: `import java.io.*;
import java.nio.file.*;

// ファイルを安全に読み書き
try (BufferedReader br = new BufferedReader(new FileReader("input.txt"));
     BufferedWriter bw = new BufferedWriter(new FileWriter("output.txt"))) {

    String line;
    while ((line = br.readLine()) != null) {
        bw.write(line.toUpperCase());
        bw.newLine();
    }
} // br と bw が自動クローズ（close() が逆順に呼ばれる）

// カスタム AutoCloseable
class MyResource implements AutoCloseable {
    @Override public void close() { System.out.println("closed"); }
}
try (var r = new MyResource()) { /* use r */ }`,
            },
          ],
          output: `closed`,
        },
        {
          id: 's6-multi-catch',
          name: 'multi-catch（catch (A | B e)）',
          level: 'basic',
          keywords: 'multi-catch マルチキャッチ 複数例外 | catch',
          desc: 'Java 7 以降、複数の例外を `|` で区切って 1 つの `catch` ブロックで処理できます。コードの重複を減らせますが、キャッチした変数は実質 `final` 扱いになります。',
          code: [
            {
              lang: 'Java',
              code: `import java.io.*;
import java.sql.*;

void process(String path) {
    try {
        // 複数の checked 例外が発生しうる処理
        String content = Files.readString(Path.of(path));
        int    num     = Integer.parseInt(content.trim());
    } catch (IOException | NumberFormatException e) {
        // 共通処理
        System.err.println("処理失敗: " + e.getMessage());
    } finally {
        System.out.println("finally は常に実行される");
    }
}`,
            },
          ],
        },
        {
          id: 's6-custom-exception',
          name: '独自例外クラスの作り方',
          level: 'basic',
          keywords: 'カスタム例外 独自例外 Exception RuntimeException 継承',
          desc: '独自例外は `Exception`（checked）または `RuntimeException`（unchecked）を継承して作ります。コンストラクタは**4 種類**（メッセージのみ・原因のみ・両方・引数なし）を揃えるのが慣習です。',
          code: [
            {
              lang: 'Java',
              code: `// unchecked 独自例外
public class DomainException extends RuntimeException {
    private final String code;

    public DomainException(String code, String message) {
        super(message);
        this.code = code;
    }
    public DomainException(String code, String message, Throwable cause) {
        super(message, cause);
        this.code = code;
    }
    public String getCode() { return code; }
}

// 使用例
throw new DomainException("NOT_FOUND", "ユーザーが見つかりません");`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s7: クラスと継承
    // ─────────────────────────────────────────────
    {
      id: 's7',
      num: 7,
      title: 'クラスと継承',
      level: 'basic',
      items: [
        {
          id: 's7-constructor',
          name: 'コンストラクタ・初期化ブロック',
          level: 'basic',
          keywords: 'コンストラクタ constructor 初期化ブロック static initializer this super',
          desc: 'コンストラクタはクラスと同名でインスタンスを初期化します。`this(...)` で同クラスの別コンストラクタへ委譲でき、`super(...)` で親クラスのコンストラクタを呼びます。static 初期化ブロックはクラスロード時に一度だけ実行されます。',
          code: [
            {
              lang: 'Java',
              code: `class Person {
    private final String name;
    private final int    age;
    private static final String DEFAULT_NAME;

    // static 初期化ブロック（クラスロード時）
    static { DEFAULT_NAME = "Unknown"; }

    // コンストラクタ委譲
    Person()              { this(DEFAULT_NAME, 0); }
    Person(String name)   { this(name, 0); }
    Person(String name, int age) {
        this.name = name;
        this.age  = age;
    }

    @Override public String toString() {
        return name + "(" + age + ")";
    }
}

System.out.println(new Person());         // Unknown(0)
System.out.println(new Person("Alice", 30)); // Alice(30)`,
            },
          ],
          output: `Unknown(0)
Alice(30)`,
        },
        {
          id: 's7-abstract-interface',
          name: 'abstract クラスと interface（default メソッド）',
          level: 'basic',
          keywords: 'abstract interface default implements extends 抽象 インターフェース',
          desc: '`abstract` クラスは部分実装を持ち、単一継承のみ。`interface` は複数実装でき、Java 8 以降は `default` メソッドで実装を持てます。`abstract` クラスはコンストラクタ・フィールドを持てますが、`interface` では `default`/`static` メソッドのみ実装を持てます。',
          code: [
            {
              lang: 'Java',
              code: `// interface with default method
interface Drawable {
    void draw();
    default void drawWithBorder() {
        System.out.println("--- border ---");
        draw();
        System.out.println("--- border ---");
    }
}

abstract class Shape implements Drawable {
    protected String color;
    Shape(String color) { this.color = color; }
    abstract double area();
}

class Circle extends Shape {
    private double radius;
    Circle(String color, double radius) { super(color); this.radius = radius; }
    @Override public void draw()      { System.out.println("Circle(" + color + ")"); }
    @Override public double area()    { return Math.PI * radius * radius; }
}`,
            },
          ],
        },
        {
          id: 's7-final',
          name: 'final クラス・メソッド・フィールド',
          level: 'basic',
          keywords: 'final 定数 不変 継承禁止 オーバーライド禁止',
          desc: '`final` は文脈によって意味が変わります。**フィールド**: 再代入不可の定数。**メソッド**: サブクラスでのオーバーライド禁止。**クラス**: 継承禁止。`String`, `Integer` などの標準ライブラリクラスも `final` です。',
          code: [
            {
              lang: 'Java',
              code: `final class ImmutablePoint {
    final double x;
    final double y;

    ImmutablePoint(double x, double y) {
        this.x = x;
        this.y = y;
    }

    // final メソッド: サブクラスで変更不可
    final double distanceTo(ImmutablePoint other) {
        double dx = this.x - other.x;
        double dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
// class Subclass extends ImmutablePoint {} // コンパイルエラー`,
            },
          ],
        },
        {
          id: 's7-sealed',
          name: 'sealed クラス（Java 17+）',
          level: 'basic',
          keywords: 'sealed permits Java17 代数的データ型 exhaustive switch パターンマッチ',
          desc: 'Java 17 以降の `sealed` クラス/インターフェースは、`permits` で継承できるクラスを限定します。パターンマッチ `switch` と組み合わせることで網羅性チェックが働き、代数的データ型に近い設計ができます。',
          code: [
            {
              lang: 'Java',
              code: `sealed interface Shape permits Circle, Rectangle, Triangle {}

record Circle(double radius)                   implements Shape {}
record Rectangle(double w, double h)           implements Shape {}
record Triangle(double base, double height)    implements Shape {}

double area(Shape s) {
    return switch (s) {
        case Circle    c -> Math.PI * c.radius() * c.radius();
        case Rectangle r -> r.w() * r.h();
        case Triangle  t -> 0.5 * t.base() * t.height();
        // default 不要: sealed により網羅性が保証される
    };
}

System.out.println(area(new Circle(5)));       // 78.53...
System.out.println(area(new Rectangle(3, 4))); // 12.0`,
            },
          ],
          output: `78.53981633974483
12.0`,
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
          id: 's8-interface-evolution',
          name: 'interface の進化（default / static / private メソッド）',
          level: 'basic',
          keywords: 'interface default static private メソッド Java8 Java9',
          desc: 'Java 8 で `default`/`static`、Java 9 で `private` メソッドが追加され、インターフェースで共通実装を持てるようになりました。既存 API を壊さずに機能追加できるのが利点です。',
          code: [
            {
              lang: 'Java',
              code: `interface Logger {
    void log(String msg);

    // default: 実装クラスで任意オーバーライド
    default void info(String msg)  { log("[INFO]  " + msg); }
    default void error(String msg) { log("[ERROR] " + msg); }

    // static: インターフェース名で呼び出す
    static Logger console() { return System.out::println; }

    // private: default メソッドの共通処理
    private String format(String level, String msg) {
        return "[" + level + "] " + msg;
    }
}

Logger logger = Logger.console();
logger.info("started");   // [INFO]  started
logger.error("failed");   // [ERROR] failed`,
            },
          ],
          output: `[INFO]  started
[ERROR] failed`,
        },
        {
          id: 's8-functional-interface',
          name: '関数型インターフェース（@FunctionalInterface）',
          level: 'basic',
          keywords: 'FunctionalInterface 関数型 SAM ラムダ 抽象メソッド 1つ',
          desc: '`@FunctionalInterface` は抽象メソッドが 1 つ（**SAM**: Single Abstract Method）のインターフェースを示すアノテーションです。ラムダ式や메소드참照で実装できます。',
          code: [
            {
              lang: 'Java',
              code: `@FunctionalInterface
interface Validator<T> {
    boolean validate(T value);
    // default メソッドは持てる
    default Validator<T> and(Validator<T> other) {
        return v -> this.validate(v) && other.validate(v);
    }
}

Validator<String> notEmpty  = s -> !s.isEmpty();
Validator<String> maxLen    = s -> s.length() <= 10;
Validator<String> combined  = notEmpty.and(maxLen);

System.out.println(combined.validate("Hello")); // true
System.out.println(combined.validate(""));       // false`,
            },
          ],
          output: `true
false`,
        },
        {
          id: 's8-comparable-comparator',
          name: 'Comparable / Comparator',
          level: 'basic',
          keywords: 'Comparable Comparator compareTo compare ソート 自然順序',
          desc: '`Comparable<T>` を実装すると**自然順序**が定義され `Collections.sort()` などで自動ソートされます。`Comparator<T>` は外部から順序を注入する際に使い、`comparing()` チェーンで簡潔に記述できます。',
          code: [
            {
              lang: 'Java',
              code: `record Person(String name, int age) implements Comparable<Person> {
    @Override
    public int compareTo(Person other) {
        return Integer.compare(this.age, other.age); // 年齢で自然順序
    }
}

List<Person> people = new ArrayList<>(List.of(
    new Person("Charlie", 25),
    new Person("Alice",   30),
    new Person("Bob",     25)
));

Collections.sort(people); // Comparable による自然順序

// Comparator: 名前→年齢の複合ソート
people.sort(Comparator.comparing(Person::name).thenComparingInt(Person::age));
people.forEach(p -> System.out.println(p.name() + ":" + p.age()));`,
            },
          ],
          output: `Alice:30
Bob:25
Charlie:25`,
        },
        {
          id: 's8-interface-vs-abstract',
          name: 'interface vs 抽象クラスの選択基準',
          level: 'basic',
          keywords: 'interface abstract 抽象クラス 選択 状態 多重実装',
          desc: 'インターフェースは**能力（is-able-to）**、抽象クラスは**種類（is-a）**を表します。状態（フィールド）・コンストラクタが必要なら抽象クラス、多重実装が必要なら interface が適切です。',
          code: [
            {
              lang: 'Java',
              code: `// interface: 能力の定義（複数実装可）
interface Flyable   { void fly(); }
interface Swimmable { void swim(); }

// 抽象クラス: 状態を持つ基底実装
abstract class Animal {
    protected final String name;
    Animal(String name) { this.name = name; }
    abstract void speak();
}

// Duck は Animal でもあり Flyable かつ Swimmable
class Duck extends Animal implements Flyable, Swimmable {
    Duck(String name) { super(name); }
    @Override public void speak() { System.out.println(name + ": quack!"); }
    @Override public void fly()   { System.out.println(name + " flies"); }
    @Override public void swim()  { System.out.println(name + " swims"); }
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
          id: 's9-type-param',
          name: '型パラメータの基本（<T>、<T extends Foo>）',
          level: 'basic',
          keywords: 'ジェネリクス 型パラメータ T extends 境界 型安全',
          desc: '型パラメータ `<T>` でクラスやメソッドを汎用化します。`<T extends Comparable<T>>` のように上限境界を付けると特定の型メソッドを使えます。複数の境界は `T extends A & B` で指定します。',
          code: [
            {
              lang: 'Java',
              code: `// 汎用ペアクラス
class Pair<A, B> {
    final A first;
    final B second;
    Pair(A first, B second) { this.first = first; this.second = second; }
    @Override public String toString() { return "(" + first + ", " + second + ")"; }
}

// 上限境界: T は Comparable を実装している必要がある
<T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}

System.out.println(new Pair<>(1, "hello")); // (1, hello)
System.out.println(max(3, 7));              // 7
System.out.println(max("apple", "banana")); // banana`,
            },
          ],
          output: `(1, hello)
7
banana`,
        },
        {
          id: 's9-wildcard',
          name: 'ワイルドカード（<?>、<? extends T>、<? super T>）',
          level: 'basic',
          keywords: 'ワイルドカード wildcard ? extends super PECS 上限 下限',
          desc: 'ワイルドカードは未知の型を表します。**PECS 原則**（Producer Extends, Consumer Super）が判断の目安です。読み取るだけなら `<? extends T>`、書き込むだけなら `<? super T>`、両方なら `<T>` を使います。',
          code: [
            {
              lang: 'Java',
              code: `// Producer Extends: 読み取り専用
double sumList(List<? extends Number> list) {
    double sum = 0;
    for (Number n : list) sum += n.doubleValue();
    return sum;
}

// Consumer Super: 書き込み専用
void addNumbers(List<? super Integer> list) {
    list.add(1); list.add(2); list.add(3);
}

List<Integer> ints = new ArrayList<>(List.of(1, 2, 3));
List<Number>  nums = new ArrayList<>();

System.out.println(sumList(ints)); // 6.0
addNumbers(nums);
System.out.println(nums);          // [1, 2, 3]`,
            },
          ],
          output: `6.0
[1, 2, 3]`,
        },
        {
          id: 's9-type-erasure',
          name: '型消去（type erasure）の影響',
          level: 'basic',
          keywords: '型消去 type erasure 実行時 instanceof ジェネリック配列',
          desc: 'Java のジェネリクスはコンパイル後に型情報が消去されます（**型消去**）。実行時には `List<String>` も `List<Integer>` も同じ `List` です。`instanceof` での型チェックや、ジェネリック配列の生成には制限があります。',
          code: [
            {
              lang: 'Java',
              code: `List<String>  strList = new ArrayList<>();
List<Integer> intList = new ArrayList<>();

// 実行時には型パラメータが消去される
System.out.println(strList.getClass() == intList.getClass()); // true

// NG: 型消去により instanceof チェック不可
// if (strList instanceof List<String>) {} // コンパイルエラー
if (strList instanceof List<?> l) {} // ワイルドカードなら OK

// NG: ジェネリック配列生成不可
// T[] arr = new T[10]; // コンパイルエラー
// 回避策: Object[] に unchecked キャスト or List を使う`,
            },
          ],
          output: `true`,
          warn: '型消去は `ClassCastException` の原因になりえます。`@SuppressWarnings("unchecked")` を使う場合は理由をコメントで明記してください。',
        },
        {
          id: 's9-generic-method',
          name: 'ジェネリックメソッド',
          level: 'basic',
          keywords: 'ジェネリックメソッド 型推論 static T メソッド',
          desc: 'クラスとは独立した型パラメータをメソッドに付けられます。戻り値型の前に `<T>` を置きます。呼び出し側では型引数の明示省略が可能（型推論）です。',
          code: [
            {
              lang: 'Java',
              code: `import java.util.*;

// ジェネリックユーティリティメソッド
static <T> List<T> repeat(T value, int times) {
    List<T> result = new ArrayList<>();
    for (int i = 0; i < times; i++) result.add(value);
    return result;
}

static <T> void swap(T[] arr, int i, int j) {
    T tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
}

List<String> strs = repeat("hello", 3);
System.out.println(strs); // [hello, hello, hello]

String[] words = {"A", "B", "C"};
swap(words, 0, 2);
System.out.println(Arrays.toString(words)); // [C, B, A]`,
            },
          ],
          output: `[hello, hello, hello]
[C, B, A]`,
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s10: コレクションフレームワーク
    // ─────────────────────────────────────────────
    {
      id: 's10',
      num: 10,
      title: 'コレクションフレームワーク',
      level: 'basic',
      items: [
        {
          id: 's10-list-set-map',
          name: 'List / Set / Map インターフェースと主要実装',
          level: 'basic',
          keywords: 'List Set Map ArrayList LinkedList HashSet TreeSet HashMap TreeMap コレクション',
          desc: '主要コレクションの特性を理解して使い分けます。`ArrayList` は高速ランダムアクセス、`LinkedList` は高速挿入削除、`HashSet` は O(1) 存在確認、`TreeSet` はソート順、`HashMap` は O(1) ルックアップです。',
          code: [
            {
              lang: 'Java',
              code: `// List: 順序あり・重複可
List<String> list = new ArrayList<>(List.of("a", "b", "a"));
list.add("c");
System.out.println(list.get(0)); // a

// Set: 順序なし・重複不可
Set<String> set = new HashSet<>(list);
System.out.println(set.contains("a")); // true

// Map: キー→値
Map<String, Integer> map = new HashMap<>();
map.put("apple", 3);
map.put("banana", 1);
map.getOrDefault("cherry", 0); // 0（キーなし時のデフォルト）

// エントリのイテレーション
for (Map.Entry<String, Integer> e : map.entrySet()) {
    System.out.println(e.getKey() + "=" + e.getValue());
}`,
            },
          ],
        },
        {
          id: 's10-collections-util',
          name: 'Collections ユーティリティ',
          level: 'basic',
          keywords: 'Collections sort shuffle reverse min max frequency unmodifiable',
          desc: '`java.util.Collections` クラスにはコレクション操作の便利メソッドが揃っています。`unmodifiableList()` などで変更不可ビューを作れます。',
          code: [
            {
              lang: 'Java',
              code: `import java.util.*;

List<Integer> nums = new ArrayList<>(Arrays.asList(3, 1, 4, 1, 5, 9));

Collections.sort(nums);                 // [1, 1, 3, 4, 5, 9]
Collections.reverse(nums);              // [9, 5, 4, 3, 1, 1]
System.out.println(Collections.max(nums)); // 9
System.out.println(Collections.frequency(nums, 1)); // 2

Collections.shuffle(nums); // ランダムシャッフル

// 変更不可ビュー
List<Integer> readonly = Collections.unmodifiableList(nums);
// readonly.add(0); // UnsupportedOperationException`,
            },
          ],
          output: `9
2`,
        },
        {
          id: 's10-immutable-factory',
          name: 'List.of / Map.of（不変コレクション、Java 9+）',
          level: 'basic',
          keywords: 'List.of Map.of Set.of 不変 immutable Java9 ファクトリ',
          desc: 'Java 9 以降、`List.of()`, `Set.of()`, `Map.of()` で**変更不可**コレクションを簡潔に作れます。`null` 要素・重複キーは許可されず、実行時に例外がスローされます。',
          code: [
            {
              lang: 'Java',
              code: `List<String> immutableList = List.of("a", "b", "c");
Set<Integer> immutableSet  = Set.of(1, 2, 3);
Map<String, Integer> map   = Map.of("one", 1, "two", 2, "three", 3);

// 変更しようとすると UnsupportedOperationException
// immutableList.add("d"); 

// Map.ofEntries: エントリ数が多い場合
Map<String, Integer> bigMap = Map.ofEntries(
    Map.entry("a", 1),
    Map.entry("b", 2),
    Map.entry("c", 3)
);

// 可変コピーを作る場合
List<String> mutable = new ArrayList<>(immutableList);`,
            },
          ],
          warn: '`List.of()` の要素順序は保証されますが、`Set.of()` と `Map.of()` の反復順序は**不定**です。順序依存のコードを書かないように注意してください。',
        },
        {
          id: 's10-arraydeque',
          name: 'ArrayDeque（スタック・キュー代替）',
          level: 'basic',
          keywords: 'ArrayDeque Deque Stack Queue LIFO FIFO スタック キュー',
          desc: '`ArrayDeque` はスタック（LIFO）とキュー（FIFO）の両方として使えます。`Stack` クラスや `LinkedList` より高速で、現代の Java では `ArrayDeque` が推奨されています。',
          code: [
            {
              lang: 'Java',
              code: `import java.util.ArrayDeque;
import java.util.Deque;

// スタック（LIFO）として使う
Deque<String> stack = new ArrayDeque<>();
stack.push("first");
stack.push("second");
stack.push("third");
System.out.println(stack.pop());  // third（後入れ先出し）

// キュー（FIFO）として使う
Deque<String> queue = new ArrayDeque<>();
queue.offer("first");
queue.offer("second");
queue.offer("third");
System.out.println(queue.poll()); // first（先入れ先出し）`,
            },
          ],
          output: `third
first`,
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s11: Stream API
    // ─────────────────────────────────────────────
    {
      id: 's11',
      num: 11,
      title: 'Stream API',
      level: 'basic',
      items: [
        {
          id: 's11-basic-ops',
          name: 'stream() / filter() / map() / collect()',
          level: 'basic',
          keywords: 'stream filter map collect toList 中間操作 終端操作 遅延評価',
          desc: 'Stream は**遅延評価**のパイプラインです。`filter()`, `map()` などの中間操作は終端操作（`collect()`, `forEach()` など）が呼ばれるまで実行されません。一度消費したストリームは再利用できません。',
          code: [
            {
              lang: 'Java',
              code: `import java.util.*;
import java.util.stream.*;

List<String> names = List.of("Alice", "Bob", "Charlie", "Dave", "Eve");

// filter → map → collect
List<String> result = names.stream()
    .filter(n -> n.length() > 3)         // 4文字超
    .map(String::toUpperCase)            // 大文字変換
    .sorted()                            // アルファベット順
    .collect(Collectors.toList());

System.out.println(result); // [ALICE, CHARLIE, DAVE]

// count, findFirst, anyMatch など
long count   = names.stream().filter(n -> n.startsWith("A")).count();
boolean any  = names.stream().anyMatch(n -> n.length() > 5);
Optional<String> first = names.stream().filter(n -> n.startsWith("C")).findFirst();`,
            },
          ],
          output: `[ALICE, CHARLIE, DAVE]`,
        },
        {
          id: 's11-collectors',
          name: 'Collectors.groupingBy / toMap / joining',
          level: 'basic',
          keywords: 'Collectors groupingBy toMap joining 集計 グループ化 結合',
          desc: '`Collectors` クラスには集約操作のファクトリが揃っています。`groupingBy` でグループ化、`toMap` でマップ変換、`joining` で文字列結合ができます。',
          code: [
            {
              lang: 'Java',
              code: `import java.util.stream.*;

List<String> words = List.of("ant", "bee", "cat", "bat", "ape");

// groupingBy: 先頭文字でグループ化
Map<Character, List<String>> grouped =
    words.stream().collect(Collectors.groupingBy(w -> w.charAt(0)));
System.out.println(grouped);
// {a=[ant, ape], b=[bee, bat], c=[cat]}

// joining: CSV 形式
String csv = words.stream().collect(Collectors.joining(", ", "[", "]"));
System.out.println(csv); // [ant, bee, cat, bat, ape]

// toMap: 単語 → 長さ
Map<String, Integer> lenMap =
    words.stream().collect(Collectors.toMap(w -> w, String::length));
System.out.println(lenMap);`,
            },
          ],
          output: `{a=[ant, ape], b=[bee, bat], c=[cat]}
[ant, bee, cat, bat, ape]
{ant=3, bee=3, cat=3, bat=3, ape=3}`,
        },
        {
          id: 's11-flatmap-optional',
          name: 'flatMap と Optional との組み合わせ',
          level: 'basic',
          keywords: 'flatMap Optional flat 入れ子 ネスト 展開',
          desc: '`flatMap` はネストした構造を平坦化します。`Stream<List<T>>` → `Stream<T>` の変換や、`Optional<Optional<T>>` → `Optional<T>` の変換に使います。',
          code: [
            {
              lang: 'Java',
              code: `import java.util.*;
import java.util.stream.*;

List<List<Integer>> nested = List.of(
    List.of(1, 2, 3),
    List.of(4, 5),
    List.of(6, 7, 8, 9)
);

// flatMap でネストを展開
List<Integer> flat = nested.stream()
    .flatMap(Collection::stream)
    .collect(Collectors.toList());
System.out.println(flat); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// Optional との flatMap
Optional<String> name = Optional.of("  Alice  ");
Optional<String> trimmed = name.map(String::trim).filter(s -> !s.isEmpty());
System.out.println(trimmed.orElse("unknown")); // Alice`,
            },
          ],
          output: `[1, 2, 3, 4, 5, 6, 7, 8, 9]
Alice`,
        },
        {
          id: 's11-parallel-stream',
          name: '並列ストリーム（parallelStream()）の注意点',
          level: 'basic',
          keywords: 'parallelStream 並列 並行 Fork/Join スレッド順序 副作用',
          desc: '`parallelStream()` は ForkJoinPool を使って並列処理します。大量データへの CPU バウンド処理に効果的ですが、共有状態への書き込み・順序依存処理・I/O バウンド処理では逆効果になります。',
          code: [
            {
              lang: 'Java',
              code: `import java.util.stream.*;

List<Integer> nums = IntStream.rangeClosed(1, 1_000_000)
    .boxed().collect(Collectors.toList());

// 並列ストリームで合計（順不同でも結果は正しい）
long sum = nums.parallelStream()
    .mapToLong(Integer::longValue)
    .sum();
System.out.println(sum); // 500000500000

// NG: 共有リストへの並列 add（スレッドアンセーフ）
List<Integer> badList = new ArrayList<>();
// nums.parallelStream().forEach(badList::add); // 壊れる可能性

// OK: collect で安全に集約
List<Integer> goodList = nums.parallelStream()
    .filter(n -> n % 2 == 0)
    .collect(Collectors.toList());`,
            },
          ],
          output: `500000500000`,
          warn: '並列ストリームは副作用（外部状態の変更）と順序依存コードを避けてください。ベンチマークで有意な改善が見込める場合のみ使用しましょう。',
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s12: Optional
    // ─────────────────────────────────────────────
    {
      id: 's12',
      num: 12,
      title: 'Optional',
      level: 'basic',
      items: [
        {
          id: 's12-creation',
          name: 'Optional.of / ofNullable / empty',
          level: 'basic',
          keywords: 'Optional of ofNullable empty null 安全 生成',
          desc: '`Optional` は値が存在するか不明な場合の型安全なラッパーです。`of()` は非 null 確定値、`ofNullable()` は null の可能性がある値、`empty()` は空の Optional を生成します。',
          code: [
            {
              lang: 'Java',
              code: `import java.util.Optional;

Optional<String> present = Optional.of("Hello");
Optional<String> maybe   = Optional.ofNullable(null); // 空
Optional<String> empty   = Optional.empty();

System.out.println(present.isPresent()); // true
System.out.println(maybe.isPresent());   // false
System.out.println(empty.isEmpty());     // true（Java 11+）

// of に null を渡すと即 NullPointerException
// Optional.of(null); // NPE!`,
            },
          ],
          output: `true
false
true`,
        },
        {
          id: 's12-transform',
          name: 'map / flatMap / orElse / orElseGet / orElseThrow',
          level: 'basic',
          keywords: 'map flatMap orElse orElseGet orElseThrow 変換 取得',
          desc: '`map()` で値を変換し、`orElse()` でデフォルト値を返します。`orElseGet()` はデフォルト生成が高コストな場合にラムダで遅延評価します。`orElseThrow()` は値がない場合に例外をスローします。',
          code: [
            {
              lang: 'Java',
              code: `Optional<String> name = Optional.of("  alice  ");

// map: 変換（空なら空のまま）
Optional<String> upper = name.map(String::trim).map(String::toUpperCase);
System.out.println(upper.orElse("UNKNOWN")); // ALICE

// orElseGet: 遅延評価（デフォルト生成が高コストな場合に有効）
String val = Optional.<String>empty()
    .orElseGet(() -> computeDefault());

// orElseThrow
String required = name.orElseThrow(() -> new IllegalStateException("名前が必要"));

// flatMap: Optional<Optional<T>> を平坦化
Optional<Optional<String>> nested = Optional.of(Optional.of("value"));
Optional<String> flat = nested.flatMap(o -> o);
System.out.println(flat.get()); // value`,
            },
          ],
          output: `ALICE
value`,
        },
        {
          id: 's12-ifpresent',
          name: 'ifPresent / ifPresentOrElse',
          level: 'basic',
          keywords: 'ifPresent ifPresentOrElse 消費 Consumer 副作用',
          desc: '`ifPresent()` は値がある場合のみ `Consumer` を実行します。Java 9 以降の `ifPresentOrElse()` は値がない場合の処理も同時に指定できます。',
          code: [
            {
              lang: 'Java',
              code: `Optional<String> opt = Optional.of("Alice");
Optional<String> none = Optional.empty();

// ifPresent: 値があるときだけ実行
opt.ifPresent(s -> System.out.println("Hello, " + s)); // Hello, Alice

// ifPresentOrElse（Java 9+）
opt.ifPresentOrElse(
    s    -> System.out.println("Found: " + s),
    ()   -> System.out.println("Not found")
); // Found: Alice

none.ifPresentOrElse(
    s    -> System.out.println("Found: " + s),
    ()   -> System.out.println("Not found")
); // Not found`,
            },
          ],
          output: `Hello, Alice
Found: Alice
Not found`,
        },
        {
          id: 's12-when-to-use',
          name: 'Optional を使うべき場面・避けるべき場面',
          level: 'basic',
          keywords: 'Optional 使い所 アンチパターン フィールド 引数 コレクション',
          desc: 'Optional はメソッドの**戻り値**として「値がない可能性を型で表現する」用途に適しています。フィールド・メソッド引数・コレクション要素への使用はアンチパターンです。',
          code: [
            {
              lang: 'Java',
              code: `// OK: 戻り値で「見つからない可能性」を表現
Optional<User> findById(long id) {
    return userRepository.findById(id); // 存在しない場合は empty
}

// NG: フィールドに Optional（シリアライズ等の問題）
class User {
    // private Optional<String> nickname; // アンチパターン
    private String nickname; // null を許容して @Nullable アノテーション推奨
}

// NG: メソッド引数に Optional
// void process(Optional<String> name) {} // 呼び出し側が面倒

// NG: コレクション要素
// List<Optional<String>> list; // List<String> + null フィルタで代替`,
            },
          ],
          warn: '`Optional.get()` は値がない場合に `NoSuchElementException` をスローします。`isPresent()` での確認より `orElse`/`orElseThrow` 系メソッドを使うほうが安全です。',
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s13: ラムダ・関数型
    // ─────────────────────────────────────────────
    {
      id: 's13',
      num: 13,
      title: 'ラムダ・関数型',
      level: 'basic',
      items: [
        {
          id: 's13-lambda-syntax',
          name: 'ラムダ式の構文とスコープ（effectively final）',
          level: 'basic',
          keywords: 'ラムダ lambda effectively final スコープ クロージャ 外部変数',
          desc: 'ラムダ式は関数型インターフェースの簡潔な実装です。外部変数をキャプチャできますが、その変数は **effectively final**（実質的 final）でなければなりません。',
          code: [
            {
              lang: 'Java',
              code: `import java.util.function.*;

// 各種ラムダ構文
Runnable   r   = () -> System.out.println("run");
Consumer<String> c  = s -> System.out.println(s);
Function<Integer, Integer> sq = x -> x * x;
BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;

// effectively final のキャプチャ
String prefix = "Hello";
// prefix = "Hi"; // これを書くとコンパイルエラーになる
Consumer<String> greet = name -> System.out.println(prefix + ", " + name);
greet.accept("Alice"); // Hello, Alice

// ブロックラムダ
Function<Integer, String> describe = n -> {
    if (n > 0) return "positive";
    if (n < 0) return "negative";
    return "zero";
};`,
            },
          ],
          output: `Hello, Alice`,
        },
        {
          id: 's13-builtin-func',
          name: 'Function / Predicate / Consumer / Supplier',
          level: 'basic',
          keywords: 'Function Predicate Consumer Supplier BiFunction 関数型インターフェース java.util.function',
          desc: '`java.util.function` パッケージには標準的な関数型インターフェースが揃っています。主要な 4 種を覚えておけばほとんどの場面をカバーできます。',
          code: [
            {
              lang: 'Java',
              code: `import java.util.function.*;

// Function<T, R>: T を受け取り R を返す
Function<String, Integer> len = String::length;
System.out.println(len.apply("hello")); // 5

// Predicate<T>: T を受け取り boolean を返す
Predicate<String> notEmpty = s -> !s.isEmpty();
Predicate<String> shortStr  = s -> s.length() < 5;
Predicate<String> combined  = notEmpty.and(shortStr);
System.out.println(combined.test("hi"));    // true
System.out.println(combined.test("hello world")); // false

// Consumer<T>: T を受け取り void
Consumer<String> printer = System.out::println;
printer.accept("printed!"); // printed!

// Supplier<T>: 引数なしで T を返す
Supplier<List<String>> listFactory = ArrayList::new;
List<String> newList = listFactory.get();`,
            },
          ],
          output: `5
true
false
printed!`,
        },
        {
          id: 's13-method-ref-4kinds',
          name: 'メソッド参照の 4 種類',
          level: 'basic',
          keywords: 'メソッド参照 静的 インスタンス コンストラクタ 任意 特定',
          desc: 'メソッド参照はラムダの省略記法で 4 種類あります：①静的メソッド、②特定インスタンスのメソッド、③任意インスタンスのメソッド、④コンストラクタ参照。',
          code: [
            {
              lang: 'Java',
              code: `import java.util.function.*;

// 1. 静的メソッド参照: ClassName::staticMethod
Function<String, Integer> parse = Integer::parseInt;

// 2. 特定インスタンスのメソッド参照: instance::method
String separator = ", ";
Function<List<String>, String> join = list ->
    String.join(separator, list);
// 等価: separator::join  ← これは特定インスタンス参照

// 3. 任意インスタンスのメソッド参照: ClassName::instanceMethod
Function<String, String> upper = String::toUpperCase;
System.out.println(upper.apply("hello")); // HELLO

// 4. コンストラクタ参照: ClassName::new
Supplier<ArrayList<String>> newList = ArrayList::new;
Function<String, StringBuilder> newSb = StringBuilder::new;

ArrayList<String> l = newList.get();
StringBuilder sb = newSb.apply("initial");
System.out.println(sb.toString()); // initial`,
            },
          ],
          output: `HELLO
initial`,
        },
        {
          id: 's13-comparator-chain',
          name: 'Comparator.comparing のチェーン',
          level: 'basic',
          keywords: 'Comparator comparing thenComparing reversed naturalOrder nullsFirst ソート',
          desc: '`Comparator.comparing()` は任意のキーで比較する `Comparator` を簡単に作れます。`thenComparing()` で複合ソート、`reversed()` で逆順、`nullsFirst()`/`nullsLast()` で null 値の扱いを指定できます。',
          code: [
            {
              lang: 'Java',
              code: `import java.util.*;

record Employee(String dept, String name, int salary) {}

List<Employee> employees = new ArrayList<>(List.of(
    new Employee("HR",  "Bob",    50000),
    new Employee("IT",  "Alice",  80000),
    new Employee("HR",  "Carol",  55000),
    new Employee("IT",  "Dave",   75000)
));

// 部署昇順 → 給与降順 → 名前昇順
employees.sort(
    Comparator.comparing(Employee::dept)
              .thenComparingInt(Employee::salary).reversed()
              .thenComparing(Employee::name)
);

employees.forEach(e -> System.out.println(e.dept() + " " + e.name() + " " + e.salary()));`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s14: 入出力・ファイル操作
    // ─────────────────────────────────────────────
    {
      id: 's14',
      num: 14,
      title: '入出力・ファイル操作',
      level: 'basic',
      items: [
        {
          id: 's14-files-nio',
          name: 'java.nio.file.Files（readString / writeString）',
          level: 'basic',
          keywords: 'Files readString writeString readAllLines Java11 nio 簡易ファイル操作',
          desc: 'Java 11 以降、`Files.readString()` / `Files.writeString()` でファイルを 1 行で読み書きできます。UTF-8 がデフォルトで、明示的なストリーム管理が不要です。',
          code: [
            {
              lang: 'Java',
              code: `import java.nio.file.*;
import java.nio.charset.StandardCharsets;

Path path = Path.of("output.txt");

// 書き込み（Java 11+）
Files.writeString(path, "Hello, NIO!\\n", StandardCharsets.UTF_8);

// 追記
Files.writeString(path, "Line 2\\n",
    StandardCharsets.UTF_8, StandardOpenOption.APPEND);

// 読み込み（Java 11+）
String content = Files.readString(path, StandardCharsets.UTF_8);
System.out.println(content);

// 行単位
List<String> lines = Files.readAllLines(path);
lines.forEach(System.out::println);`,
            },
          ],
        },
        {
          id: 's14-path',
          name: 'Path と Paths',
          level: 'basic',
          keywords: 'Path Paths resolve relativize normalize toAbsolutePath ファイルパス',
          desc: '`Path` はファイルシステムパスを表すインターフェースです。`Path.of()`（Java 11+）または `Paths.get()`（旧来）で生成します。`resolve()`, `relativize()`, `normalize()` でパス操作を行います。',
          code: [
            {
              lang: 'Java',
              code: `import java.nio.file.*;

Path base = Path.of("/home/user/projects");
Path file = base.resolve("myapp/src/Main.java");
System.out.println(file);
// /home/user/projects/myapp/src/Main.java

// 相対パスの取得
Path rel = base.relativize(file);
System.out.println(rel); // myapp/src/Main.java

// パス情報
System.out.println(file.getFileName()); // Main.java
System.out.println(file.getParent());   // .../myapp/src
System.out.println(file.getRoot());     // /

// 存在確認
System.out.println(Files.exists(Path.of(".")));  // true
System.out.println(Files.isDirectory(Path.of("."))); // true`,
            },
          ],
          output: `/home/user/projects/myapp/src/Main.java
myapp/src/Main.java
Main.java
/home/user/projects/myapp/src
/
true
true`,
        },
        {
          id: 's14-try-with-resources-io',
          name: 'try-with-resources によるリソース管理',
          level: 'basic',
          keywords: 'try-with-resources AutoCloseable InputStream OutputStream リソースリーク',
          desc: 'I/O リソースは必ず `try-with-resources` で管理してください。例外が発生しても `close()` が確実に呼ばれ、リソースリークを防げます。',
          code: [
            {
              lang: 'Java',
              code: `import java.io.*;
import java.net.*;

// HTTP 接続のリソース管理例
void fetchUrl(String urlStr) throws IOException {
    URL url = new URL(urlStr);
    try (InputStream is = url.openStream();
         InputStreamReader isr = new InputStreamReader(is);
         BufferedReader br = new BufferedReader(isr)) {

        String line;
        while ((line = br.readLine()) != null) {
            System.out.println(line);
        }
    } // is, isr, br が逆順にクローズされる
}

// ファイルコピー
void copyFile(Path src, Path dst) throws IOException {
    try (InputStream  in  = Files.newInputStream(src);
         OutputStream out = Files.newOutputStream(dst)) {
        in.transferTo(out); // Java 9+
    }
}`,
            },
          ],
        },
        {
          id: 's14-buffered-rw',
          name: 'BufferedReader / BufferedWriter',
          level: 'basic',
          keywords: 'BufferedReader BufferedWriter readLine newLine バッファ 行単位 テキスト',
          desc: 'バイトストリームをラップした `BufferedReader`/`BufferedWriter` は行単位の処理に便利です。文字コードの指定には `InputStreamReader` / `OutputStreamWriter` で橋渡しします。',
          code: [
            {
              lang: 'Java',
              code: `import java.io.*;
import java.nio.charset.StandardCharsets;

// 読み込み: 文字コード指定
try (BufferedReader br = new BufferedReader(
        new InputStreamReader(
            new FileInputStream("input.txt"),
            StandardCharsets.UTF_8))) {

    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
}

// 書き込み
try (BufferedWriter bw = new BufferedWriter(
        new OutputStreamWriter(
            new FileOutputStream("output.txt"),
            StandardCharsets.UTF_8))) {

    bw.write("Hello, World!");
    bw.newLine();
    bw.write("Line 2");
}`,
            },
          ],
          warn: 'Java 11 以降は `Files.readString()` / `Files.writeString()` で文字コードを指定するほうが簡潔です。`BufferedReader`/`BufferedWriter` は大きなファイルをストリーム処理するときに使いましょう。',
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s15: 並行処理（advanced）
    // ─────────────────────────────────────────────
    {
      id: 's15',
      num: 15,
      title: '並行処理',
      level: 'advanced',
      items: [
        {
          id: 's15-thread-runnable-callable',
          name: 'Thread / Runnable / Callable',
          level: 'advanced',
          keywords: 'Thread Runnable Callable start run call スレッド 並行',
          desc: '`Runnable` は戻り値なし・例外宣言なしのスレッドタスク。`Callable<V>` は戻り値と checked 例外を持ちます。`Thread` クラスで直接スレッドを生成・起動できますが、現代では `ExecutorService` が推奨です。',
          code: [
            {
              lang: 'Java',
              code: `import java.util.concurrent.*;

// Runnable（戻り値なし）
Runnable task = () -> System.out.println("Thread: " + Thread.currentThread().getName());
Thread t = new Thread(task, "my-thread");
t.start();
t.join(); // 完了を待つ

// Callable（戻り値あり・例外可）
Callable<Integer> computation = () -> {
    Thread.sleep(100);
    return 42;
};

// ExecutorService で実行
ExecutorService exec = Executors.newSingleThreadExecutor();
Future<Integer> future = exec.submit(computation);
System.out.println(future.get()); // 42（ブロッキング）
exec.shutdown();`,
            },
          ],
          output: `Thread: my-thread
42`,
        },
        {
          id: 's15-executor-future-completable',
          name: 'ExecutorService / Future / CompletableFuture',
          level: 'advanced',
          keywords: 'ExecutorService Future CompletableFuture thenApply thenCompose async 非同期',
          desc: '`ExecutorService` はスレッドプールを管理します。`Future` は非同期結果の取得（ブロッキング）、`CompletableFuture`（Java 8+）はノンブロッキングなチェーン処理が可能です。',
          code: [
            {
              lang: 'Java',
              code: `import java.util.concurrent.*;

ExecutorService pool = Executors.newFixedThreadPool(4);

// CompletableFuture チェーン
CompletableFuture<String> cf = CompletableFuture
    .supplyAsync(() -> fetchData(), pool)         // 非同期取得
    .thenApply(data -> parse(data))               // 変換
    .thenApply(result -> "Result: " + result)
    .exceptionally(ex -> "Error: " + ex.getMessage()); // エラーハンドリング

// 複数タスクの並列実行
CompletableFuture<String> f1 = CompletableFuture.supplyAsync(() -> "Hello");
CompletableFuture<String> f2 = CompletableFuture.supplyAsync(() -> "World");

CompletableFuture<String> combined = f1.thenCombine(f2, (a, b) -> a + " " + b);
System.out.println(combined.get()); // Hello World

pool.shutdown();`,
            },
          ],
          output: `Hello World`,
        },
        {
          id: 's15-synchronized-volatile',
          name: 'synchronized / volatile',
          level: 'advanced',
          keywords: 'synchronized volatile モニター ロック 可視性 happens-before メモリモデル',
          desc: '`synchronized` はメソッドやブロックを排他的に実行します。`volatile` はフィールドへのアクセスをメインメモリから直接行い、可視性を保証しますが原子性は保証しません。',
          code: [
            {
              lang: 'Java',
              code: `import java.util.concurrent.atomic.AtomicInteger;

class SafeCounter {
    private int count = 0;
    private volatile boolean running = true; // 可視性のみ保証

    // synchronized でメソッド全体を排他
    synchronized void increment() { count++; }
    synchronized int  getCount()  { return count; }

    // synchronized ブロック（ロック対象を細かく指定）
    private final Object lock = new Object();
    void conditionalIncrement(int max) {
        synchronized (lock) {
            if (count < max) count++;
        }
    }

    void stop() { running = false; }
}

// より良い方法: AtomicInteger
AtomicInteger atomicCount = new AtomicInteger(0);
atomicCount.incrementAndGet(); // スレッドセーフな +1`,
            },
          ],
          warn: '`volatile` は単純な読み書きの可視性のみ保証します。インクリメント (`count++`) のような複合操作には `synchronized` か `AtomicInteger` を使ってください。',
        },
        {
          id: 's15-concurrent-utils',
          name: 'java.util.concurrent の主要クラス',
          level: 'advanced',
          keywords: 'ConcurrentHashMap CountDownLatch Semaphore BlockingQueue ReentrantLock 並行コレクション',
          desc: '`java.util.concurrent` にはスレッドセーフなコレクションと同期プリミティブが揃っています。`ConcurrentHashMap` は `HashMap` のスレッドセーフ版、`CountDownLatch` はスレッド間の待ち合わせに使います。',
          code: [
            {
              lang: 'Java',
              code: `import java.util.concurrent.*;

// ConcurrentHashMap: スレッドセーフな HashMap
ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
map.put("a", 1);
map.computeIfAbsent("b", k -> k.length()); // スレッドセーフな計算

// CountDownLatch: N 個のタスク完了を待つ
int N = 3;
CountDownLatch latch = new CountDownLatch(N);
ExecutorService exec = Executors.newFixedThreadPool(N);

for (int i = 0; i < N; i++) {
    final int taskId = i;
    exec.submit(() -> {
        System.out.println("Task " + taskId + " done");
        latch.countDown();
    });
}
latch.await(); // 全タスク完了まで待機
System.out.println("All tasks done");
exec.shutdown();`,
            },
          ],
          output: `Task 0 done
Task 1 done
Task 2 done
All tasks done`,
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s16: レコード・パターンマッチ・最新機能（advanced）
    // ─────────────────────────────────────────────
    {
      id: 's16',
      num: 16,
      title: 'レコード・パターンマッチ・最新機能',
      level: 'advanced',
      items: [
        {
          id: 's16-record',
          name: 'record（Java 16+）',
          level: 'advanced',
          keywords: 'record Java16 不変データ DTO equals hashCode toString コンパクトコンストラクタ',
          desc: '`record` はフィールド・コンストラクタ・`equals()`/`hashCode()`/`toString()` を自動生成する不変データクラスです。DTO・値オブジェクト・タプル的な用途に最適です。',
          code: [
            {
              lang: 'Java',
              code: `// 宣言だけで equals/hashCode/toString/accessor が自動生成
record Point(double x, double y) {
    // コンパクトコンストラクタ（バリデーション）
    Point {
        if (Double.isNaN(x) || Double.isNaN(y)) {
            throw new IllegalArgumentException("NaN は不可");
        }
    }

    // カスタムメソッドも追加可能
    double distanceTo(Point other) {
        double dx = this.x - other.x;
        double dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

Point p1 = new Point(0, 0);
Point p2 = new Point(3, 4);
System.out.println(p1);               // Point[x=0.0, y=0.0]
System.out.println(p1.equals(new Point(0, 0))); // true
System.out.println(p1.distanceTo(p2)); // 5.0`,
            },
          ],
          output: `Point[x=0.0, y=0.0]
true
5.0`,
        },
        {
          id: 's16-pattern-switch',
          name: 'パターンマッチ switch（Java 21+）',
          level: 'advanced',
          keywords: 'パターンマッチ switch Java21 guard when 型パターン 網羅性',
          desc: 'Java 21 で `switch` がパターンマッチに対応しました。型パターン・ガード条件（`when`）・`null` ケースが書けます。sealed クラスと組み合わせると網羅性チェックが働きます。',
          code: [
            {
              lang: 'Java',
              code: `sealed interface Expr permits Num, Add, Mul {}
record Num(int value)        implements Expr {}
record Add(Expr l, Expr r)   implements Expr {}
record Mul(Expr l, Expr r)   implements Expr {}

int eval(Expr expr) {
    return switch (expr) {
        case Num(int v)        -> v;
        case Add(var l, var r) -> eval(l) + eval(r);
        case Mul(var l, var r) -> eval(l) * eval(r);
    };
}

// ガード条件（when）
String classify(Object obj) {
    return switch (obj) {
        case Integer i when i < 0  -> "負の整数";
        case Integer i when i == 0 -> "ゼロ";
        case Integer i             -> "正の整数";
        case String s when s.isEmpty() -> "空文字";
        case String  s             -> "文字列: " + s;
        case null                  -> "null";
        default                    -> "その他";
    };
}

System.out.println(eval(new Add(new Num(3), new Mul(new Num(4), new Num(5))))); // 23
System.out.println(classify(-5));   // 負の整数
System.out.println(classify(null)); // null`,
            },
          ],
          output: `23
負の整数
null`,
        },
        {
          id: 's16-sealed-permits',
          name: 'sealed + permits の設計',
          level: 'advanced',
          keywords: 'sealed permits non-sealed final 継承制限 ADT 代数的データ型',
          desc: '`sealed` クラスは `permits` で継承を許可するクラスを列挙します。許可されたクラスは `final`（継承禁止）、`sealed`（さらに継承を制限）、`non-sealed`（制限解除）のいずれかを宣言する必要があります。',
          code: [
            {
              lang: 'Java',
              code: `// sealed interface: 許可クラスを明示
sealed interface Result<T> permits Success, Failure {}

// final: これ以上継承不可
final class Success<T> implements Result<T> {
    private final T value;
    Success(T value) { this.value = value; }
    T value() { return value; }
}

// final: これ以上継承不可
final class Failure<T> implements Result<T> {
    private final String error;
    Failure(String error) { this.error = error; }
    String error() { return error; }
}

// 使用例
Result<Integer> res = new Success<>(42);
String msg = switch (res) {
    case Success<Integer> s -> "成功: " + s.value();
    case Failure<Integer> f -> "失敗: " + f.error();
};
System.out.println(msg); // 成功: 42`,
            },
          ],
          output: `成功: 42`,
        },
        {
          id: 's16-sequenced-collection',
          name: 'SequencedCollection（Java 21+）',
          level: 'advanced',
          keywords: 'SequencedCollection SequencedMap Java21 getFirst getLast addFirst reversed',
          desc: 'Java 21 で `SequencedCollection` インターフェースが追加され、順序付きコレクションに `getFirst()`/`getLast()`/`addFirst()`/`addLast()`/`reversed()` が統一されました。`List`, `Deque`, `LinkedHashSet` などが実装しています。',
          code: [
            {
              lang: 'Java',
              code: `import java.util.*;

// SequencedCollection の統一 API（Java 21+）
SequencedCollection<String> list = new ArrayList<>(List.of("a", "b", "c"));

System.out.println(list.getFirst()); // a
System.out.println(list.getLast());  // c

list.addFirst("z");
list.addLast("d");
System.out.println(list); // [z, a, b, c, d]

// reversed() でビューを反転
SequencedCollection<String> rev = list.reversed();
System.out.println(rev.getFirst()); // d（元リストの最後）

// SequencedMap（LinkedHashMap）
SequencedMap<String, Integer> map = new LinkedHashMap<>(Map.of("a", 1, "b", 2, "c", 3));
System.out.println(map.firstEntry()); // a=1`,
            },
          ],
          output: `a
c
[z, a, b, c, d]
d
a=1`,
        },
      ],
    },
  ],
};

export default data;
