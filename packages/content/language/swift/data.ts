import type { LanguageGuide } from '../../types';

const data: LanguageGuide = {
  lang: 'Swift',
  langSlug: 'swift',
  version: 'Swift 5.10',
  lead: `他言語の経験者が 2〜3 時間でざっと読み通せるリファレンスです。Optional・プロトコル指向・メモリ安全・Swift Concurrency など Swift 固有の概念を重点的に解説します。`,
  accent: '#b03420',
  accent2: '#fdeee8',
  bgGradientTop: '#fdf2ee',
  bgRadialLeft: 'rgba(176,52,32,0.12)',
  bgRadialRight: 'rgba(240,80,56,0.08)',
  badgeGradient: 'linear-gradient(135deg, #6e1e10, #b03420)',
  heroEmoji: '🦅',
  navGroups: [
    { label: '基礎', sections: ['s1', 's2', 's3', 's4', 's5', 's6'] },
    { label: '型・プロトコル', sections: ['s7', 's8', 's9', 's10'] },
    { label: 'エラー・メモリ', sections: ['s11', 's12'] },
    { label: '並行処理', sections: ['s13', 's14'] },
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
          id: 's1-let-var',
          name: 'let / var（定数・変数）',
          level: 'basic',
          keywords: 'let var 定数 変数 型推論',
          desc: '`let` は再代入不可の定数、`var` は変更可能な変数。コンパイラが右辺から型を推論するため、型注釈は省略できる。',
          code: [
            {
              lang: 'Swift',
              code: `let pi = 3.14159        // Double と推論
var counter: Int = 0   // 明示的な型注釈
counter += 1
// pi = 3.0            // コンパイルエラー（定数への再代入）`,
            },
          ],
        },
        {
          id: 's1-basic-types',
          name: '基本型',
          level: 'basic',
          keywords: 'Int Double Float Bool String Character 型',
          desc: 'Swift の数値型は `Int`・`Double`・`Float`、論理値は `Bool`、テキストは `String`・`Character`。すべて構造体として実装されている。',
          code: [
            {
              lang: 'Swift',
              code: `let age: Int = 25
let height: Double = 175.5
let isStudent: Bool = true
let greeting: String = "Hello, Swift!"
let initial: Character = "S"

// 型変換は明示的に行う
let doubled = Double(age) * 2.0`,
            },
          ],
        },
        {
          id: 's1-tuple',
          name: 'タプル',
          level: 'basic',
          keywords: 'tuple タプル 複数戻り値 ラベル',
          desc: '複数の値を一つにまとめる軽量な型。ラベルを付けることで名前付きアクセスが可能。関数の複数戻り値によく使われる。',
          code: [
            {
              lang: 'Swift',
              code: `// ラベルなし
let point = (3, 4)
print(point.0, point.1)   // 3 4

// ラベルあり
let status = (code: 200, message: "OK")
print(status.code)         // 200
print(status.message)      // OK

// 分割代入
let (x, y) = point
print(x, y)                // 3 4`,
            },
          ],
        },
        {
          id: 's1-typealias',
          name: 'typealias（型エイリアス）',
          level: 'basic',
          keywords: 'typealias 型エイリアス 型名 別名',
          desc: '既存の型に別名を付ける。複雑な型を短い名前で扱えるようになり、ドメイン語彙をコードに反映できる。',
          code: [
            {
              lang: 'Swift',
              code: `typealias UserID = Int
typealias Completion = (Result<String, Error>) -> Void

func fetchUser(id: UserID, completion: Completion) {
    // ...
}

// タプルにもエイリアスを付けられる
typealias Vector2D = (x: Double, y: Double)
let velocity: Vector2D = (x: 1.0, y: -0.5)`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // s2: Optional
    // ─────────────────────────────────────────────
    {
      id: 's2',
      num: 2,
      title: 'Optional',
      level: 'basic',
      items: [
        {
          id: 's2-optional-basics',
          name: 'Optional<T> / T? の意味',
          level: 'basic',
          keywords: 'Optional T? nil 値なし',
          desc: '`T?` は `Optional<T>` の糖衣構文。値が存在しない状態（`nil`）を型システムで表現する。非 Optional 型には `nil` を代入できない。',
          code: [
            {
              lang: 'Swift',
              code: `var name: String? = "Alice"
name = nil            // OK：Optional 型なので nil 代入可能

var id: Int = 42
// id = nil           // コンパイルエラー：非 Optional 型

// Optional の内部表現
let opt: Optional<Int> = .some(10)
let none: Optional<Int> = .none`,
            },
          ],
        },
        {
          id: 's2-optional-binding',
          name: 'if let / guard let / while let',
          level: 'basic',
          keywords: 'if let guard let while let オプショナルバインディング アンラップ',
          desc: 'オプショナルバインディングで安全に値を取り出す。`guard let` は早期リターンパターンに適し、以降のスコープで値を使い続けられる。',
          code: [
            {
              lang: 'Swift',
              code: `let input: String? = "42"

// if let
if let value = input {
    print("値: \(value)")
} else {
    print("nil でした")
}

// guard let（早期リターン）
func parse(_ s: String?) -> Int {
    guard let s = s, let n = Int(s) else { return 0 }
    return n   // s・n をここで使える
}

// Swift 5.7+ の省略記法
if let input {
    print(input)   // 同名変数でバインド
}`,
            },
          ],
        },
        {
          id: 's2-nil-coalescing',
          name: '?? nil 合体・! 強制アンラップ',
          level: 'basic',
          keywords: '?? nil合体 ! 強制アンラップ デフォルト値',
          desc: '`??` は Optional が `nil` のときデフォルト値を返す。`!` は強制アンラップで、`nil` のとき実行時クラッシュするため慎重に使う。',
          code: [
            {
              lang: 'Swift',
              code: `let username: String? = nil
let display = username ?? "ゲスト"   // "ゲスト"

// チェーン
let a: Int? = nil
let b: Int? = 5
let result = a ?? b ?? 0    // 5

// 強制アンラップ（nil でないことが確実な場合のみ）
let forced = username!      // nil なら実行時エラー`,
            },
          ],
          warn: '`!` による強制アンラップは nil が確実に存在しない場面に限定すること。防御的コードには `if let` や `??` を使う。',
        },
        {
          id: 's2-optional-chaining',
          name: 'Optional チェーン（?.）',
          level: 'basic',
          keywords: 'Optional チェーン ?. nil安全 プロパティアクセス',
          desc: '`?.` でプロパティ・メソッド・添字アクセスを連鎖させる。チェーン中に `nil` があれば即 `nil` を返すため、ネストした `if let` を省ける。',
          code: [
            {
              lang: 'Swift',
              code: `struct Address { var city: String }
struct User { var address: Address? }

let user: User? = User(address: Address(city: "Tokyo"))

// Optional チェーン
let city = user?.address?.city   // Optional<String>
print(city ?? "不明")            // Tokyo

// メソッド呼び出し
let upper = user?.address?.city.uppercased()
// user が nil なら upper == nil`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // s3: 制御フロー
    // ─────────────────────────────────────────────
    {
      id: 's3',
      num: 3,
      title: '制御フロー',
      level: 'basic',
      items: [
        {
          id: 's3-if-switch',
          name: 'if / switch（網羅性チェック）',
          level: 'basic',
          keywords: 'if switch 網羅性 fallthrough case',
          desc: 'Swift の `switch` はデフォルトで `fallthrough` しない。`enum` を対象にすると全 `case` を網羅しないとコンパイルエラーになる。',
          code: [
            {
              lang: 'Swift',
              code: `enum Direction { case north, south, east, west }
let dir = Direction.north

switch dir {
case .north: print("北")
case .south: print("南")
case .east:  print("東")
case .west:  print("西")
// default 不要：全 case 網羅済み
}

// 式として使える（Swift 5.9+）
let label = switch dir {
    case .north: "N"
    case .south: "S"
    case .east:  "E"
    case .west:  "W"
}`,
            },
          ],
        },
        {
          id: 's3-loops',
          name: 'for-in / while / repeat-while',
          level: 'basic',
          keywords: 'for-in while repeat-while ループ 範囲',
          desc: '`for-in` は範囲・配列・辞書などシーケンスを反復する。`repeat-while` は C の `do-while` に相当し、少なくとも一度ループ本体を実行する。',
          code: [
            {
              lang: 'Swift',
              code: `// 範囲（半開区間・閉区間）
for i in 0..<5 { print(i) }   // 0,1,2,3,4
for i in 1...3 { print(i) }   // 1,2,3

// 辞書
let scores = ["Alice": 90, "Bob": 75]
for (name, score) in scores {
    print("\(name): \(score)")
}

// repeat-while
var x = 0
repeat { x += 1 } while x < 3`,
            },
          ],
        },
        {
          id: 's3-where',
          name: 'where 句',
          level: 'basic',
          keywords: 'where 条件付き for-in フィルタ',
          desc: '`for-in` や `switch` の `case` に `where` 句を追加してフィルタ条件を記述できる。ループ内の `if` を外に出してコードを平坦にできる。',
          code: [
            {
              lang: 'Swift',
              code: `let numbers = [1, -2, 3, -4, 5]

// for-in + where
for n in numbers where n > 0 {
    print(n)   // 1, 3, 5
}

// switch + where
let pair = (2, 3)
switch pair {
case let (a, b) where a + b > 4:
    print("合計 > 4")   // ここに来る
default:
    print("それ以外")
}`,
            },
          ],
        },
        {
          id: 's3-pattern-matching',
          name: 'パターンマッチング',
          level: 'basic',
          keywords: 'パターンマッチ case let 範囲 タプル 列挙値',
          desc: 'Swift の `switch` は値・型・範囲・タプル・`enum` の associated values など多彩なパターンに対応する。`case let` で値を変数に束縛できる。',
          code: [
            {
              lang: 'Swift',
              code: `enum Shape {
    case circle(radius: Double)
    case rect(width: Double, height: Double)
}

let s = Shape.circle(radius: 5.0)

switch s {
case .circle(let r) where r > 3:
    print("大きい円: \(r)")
case .circle(let r):
    print("小さい円: \(r)")
case let .rect(w, h):
    print("長方形 \(w)x\(h)")
}

// 範囲パターン
let score = 85
switch score {
case 90...100: print("A")
case 80..<90:  print("B")
default:       print("C以下")
}`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // s4: 関数
    // ─────────────────────────────────────────────
    {
      id: 's4',
      num: 4,
      title: '関数',
      level: 'basic',
      items: [
        {
          id: 's4-argument-labels',
          name: '引数ラベルと引数名',
          level: 'basic',
          keywords: '引数ラベル 引数名 外部名 内部名 func',
          desc: '呼び出し側に見える「引数ラベル（外部名）」と関数内で使う「引数名（内部名）」を別々に指定できる。`_` でラベルを省略可能。',
          code: [
            {
              lang: 'Swift',
              code: `func greet(to name: String) -> String {
    return "Hello, \(name)!"
}
print(greet(to: "Alice"))   // Hello, Alice!

// ラベル省略
func add(_ a: Int, _ b: Int) -> Int { a + b }
print(add(1, 2))   // 3

// デフォルト引数
func log(_ msg: String, level: String = "INFO") {
    print("[\(level)] \(msg)")
}
log("起動完了")              // [INFO] 起動完了
log("エラー", level: "ERROR")`,
            },
          ],
        },
        {
          id: 's4-variadic',
          name: '可変長引数・@discardableResult',
          level: 'basic',
          keywords: '可変長引数 variadic ... @discardableResult',
          desc: '`...` で可変長引数を宣言すると、引数はその型の配列として関数内で扱える。`@discardableResult` を付けると戻り値を無視してもコンパイル警告が出ない。',
          code: [
            {
              lang: 'Swift',
              code: `func sum(_ nums: Int...) -> Int {
    nums.reduce(0, +)
}
print(sum(1, 2, 3, 4))   // 10

@discardableResult
func save(_ data: String) -> Bool {
    // 保存処理
    return true
}
save("data")   // 戻り値を無視しても警告なし`,
            },
          ],
        },
        {
          id: 's4-function-type',
          name: '関数型・クロージャ',
          level: 'basic',
          keywords: '関数型 クロージャ closure 高階関数 trailing closure',
          desc: '関数は第一級市民。関数型 `(A, B) -> C` として変数に代入・引数として渡せる。末尾クロージャ構文（trailing closure）でコールバックを簡潔に書ける。',
          code: [
            {
              lang: 'Swift',
              code: `// 関数型を変数に代入
let double: (Int) -> Int = { $0 * 2 }
print(double(5))   // 10

// 高階関数
let nums = [1, 2, 3, 4]
let doubled = nums.map { $0 * 2 }   // [2, 4, 6, 8]

// trailing closure
func doAsync(work: () -> Void) { work() }
doAsync {
    print("非同期っぽい処理")
}

// クロージャの省略記法（引数名 → $0 $1）
let sorted = nums.sorted { $0 > $1 }   // [4, 3, 2, 1]`,
            },
          ],
        },
        {
          id: 's4-inout',
          name: 'inout パラメータ',
          level: 'basic',
          keywords: 'inout 参照渡し 値型 変更',
          desc: '`inout` を付けると値型（struct 等）を参照渡しできる。呼び出し時に `&` を付ける。コピーではなく元の変数を変更したい場合に使う。',
          code: [
            {
              lang: 'Swift',
              code: `func increment(_ n: inout Int, by step: Int = 1) {
    n += step
}

var count = 10
increment(&count)        // count == 11
increment(&count, by: 5) // count == 16
print(count)             // 16`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // s5: コレクション
    // ─────────────────────────────────────────────
    {
      id: 's5',
      num: 5,
      title: 'コレクション',
      level: 'basic',
      items: [
        {
          id: 's5-array-dict-set',
          name: 'Array / Dictionary / Set',
          level: 'basic',
          keywords: 'Array Dictionary Set コレクション 配列 辞書 集合',
          desc: '3 つの基本コレクション型。いずれも `var` で変更可能、`let` で不変。`Array` は順序付き、`Set` は順序なし重複なし、`Dictionary` はキーと値のマッピング。',
          code: [
            {
              lang: 'Swift',
              code: `// Array
var fruits = ["apple", "banana", "cherry"]
fruits.append("date")
fruits.remove(at: 1)   // ["apple", "cherry", "date"]

// Dictionary
var scores: [String: Int] = ["Alice": 90, "Bob": 75]
scores["Charlie"] = 85
let bScore = scores["Bob"] ?? 0   // 75

// Set
var tags: Set = ["swift", "ios", "apple"]
tags.insert("macos")
print(tags.contains("swift"))   // true`,
            },
          ],
        },
        {
          id: 's5-higher-order',
          name: 'map / filter / reduce / compactMap / flatMap',
          level: 'basic',
          keywords: 'map filter reduce compactMap flatMap 高階関数',
          desc: 'Swift コレクションは豊富な高階関数を持つ。`compactMap` は Optional を変換して nil を除去、`flatMap` はネストした配列を平坦化する。',
          code: [
            {
              lang: 'Swift',
              code: `let nums = [1, 2, 3, 4, 5]

let squared = nums.map { $0 * $0 }           // [1,4,9,16,25]
let evens   = nums.filter { $0 % 2 == 0 }   // [2,4]
let total   = nums.reduce(0, +)              // 15

// compactMap: Optional 変換 + nil 除去
let strs = ["1", "two", "3"]
let ints = strs.compactMap { Int($0) }       // [1, 3]

// flatMap: ネスト配列を平坦化
let nested = [[1,2],[3,4],[5]]
let flat = nested.flatMap { $0 }             // [1,2,3,4,5]`,
            },
          ],
        },
        {
          id: 's5-destructuring',
          name: '分割代入・enumerated・zip',
          level: 'basic',
          keywords: '分割代入 enumerated zip インデックス 並列反復',
          desc: '`enumerated()` でインデックスと値を同時に取得。`zip` で 2 つのシーケンスを対にして反復できる。タプルの分割代入と組み合わせると表現力が高い。',
          code: [
            {
              lang: 'Swift',
              code: `let letters = ["a", "b", "c"]

// enumerated でインデックス付き反復
for (i, ch) in letters.enumerated() {
    print("\(i): \(ch)")
}

// zip
let nums = [1, 2, 3]
for (letter, num) in zip(letters, nums) {
    print("\(letter)-\(num)")   // a-1, b-2, c-3
}`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // s6: 文字列
    // ─────────────────────────────────────────────
    {
      id: 's6',
      num: 6,
      title: '文字列',
      level: 'basic',
      items: [
        {
          id: 's6-interpolation',
          name: '文字列補間',
          level: 'basic',
          keywords: '文字列補間 \\ インターポレーション',
          desc: '`"\\(式)"` 構文で文字列の中に任意の式を埋め込める。`CustomStringConvertible` を採用した型も直接埋め込める。',
          code: [
            {
              lang: 'Swift',
              code: `let name = "Swift"
let version = 5.10
print("言語: \\(name), バージョン: \\(version)")
// 言語: Swift, バージョン: 5.1

// 式も直接書ける
let a = 3, b = 4
print("斜辺: \\((a*a + b*b).squareRoot())")   // 5.0`,
            },
          ],
        },
        {
          id: 's6-multiline',
          name: 'マルチライン文字列リテラル',
          level: 'basic',
          keywords: '三連クォート マルチライン 複数行 インデント',
          desc: '`"""..."""` で複数行の文字列を書ける。終端の `"""` のインデント位置が各行の基準となり、共通インデントは除去される。',
          code: [
            {
              lang: 'Swift',
              code: `let html = """
    <html>
        <body>Hello</body>
    </html>
    """
// インデントは終端 """ の位置が基準
print(html)`,
            },
          ],
        },
        {
          id: 's6-string-index',
          name: 'String.Index（ランダムアクセス不可）',
          level: 'basic',
          keywords: 'String.Index Index ランダムアクセス 文字 Unicode',
          desc: 'Swift の `String` は Unicode 対応のため、整数インデックスで文字にアクセスできない。`String.Index` を使って位置を表現する必要がある。',
          code: [
            {
              lang: 'Swift',
              code: `let s = "Hello, 世界"
let start = s.startIndex
let end   = s.endIndex

// インデックス操作
let idx = s.index(start, offsetBy: 7)
print(s[idx])   // 世

// 文字数
print(s.count)  // 9（絵文字なども 1 文字）

// String.Index を Int に直接変換する API はない`,
            },
          ],
          warn: '`s[2]` のような整数インデックスはコンパイルエラー。`index(_:offsetBy:)` を使う。',
        },
        {
          id: 's6-string-ops',
          name: '文字列の比較・検索',
          level: 'basic',
          keywords: '文字列比較 contains hasPrefix hasSuffix range',
          desc: '`==` は内容比較。`hasPrefix`・`hasSuffix`・`contains` でパターン検索。`range(of:)` でサブ文字列の位置を取得できる。',
          code: [
            {
              lang: 'Swift',
              code: `let str = "Swift is awesome"

print(str.hasPrefix("Swift"))    // true
print(str.hasSuffix("awesome"))  // true
print(str.contains("is"))        // true

// 大文字・小文字無視の比較
let eq = str.lowercased() == "swift is awesome"
print(eq)   // true

// サブ文字列の位置
if let range = str.range(of: "is") {
    print(str[range])   // is
}`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // s7: 構造体・クラス・列挙型
    // ─────────────────────────────────────────────
    {
      id: 's7',
      num: 7,
      title: '構造体・クラス・列挙型',
      level: 'basic',
      items: [
        {
          id: 's7-struct-class',
          name: 'struct vs class（値型・参照型）',
          level: 'basic',
          keywords: 'struct class 値型 参照型 コピー 継承',
          desc: '`struct` は値型（代入・引数渡しでコピー）、`class` は参照型（同一インスタンスを共有）。Swift は `struct` 優先を推奨し、継承が必要な場合のみ `class` を使う。',
          code: [
            {
              lang: 'Swift',
              code: `struct PointS { var x: Int; var y: Int }
class  PointC { var x: Int; var y: Int
    init(_ x: Int, _ y: Int) { self.x = x; self.y = y }
}

var s1 = PointS(x: 1, y: 2)
var s2 = s1       // コピー
s2.x = 99
print(s1.x)       // 1（変わらない）

var c1 = PointC(1, 2)
var c2 = c1       // 同じ参照
c2.x = 99
print(c1.x)       // 99（変わる）`,
            },
          ],
        },
        {
          id: 's7-enum',
          name: 'enum（associated values）',
          level: 'basic',
          keywords: 'enum associated values 列挙型 関連値 switch',
          desc: '`enum` のケースに値を付加する associated values（関連値）が Swift の強力な機能。`switch` で分解して型安全に扱える。',
          code: [
            {
              lang: 'Swift',
              code: `enum NetworkResult {
    case success(data: Data)
    case failure(code: Int, message: String)
}

let result = NetworkResult.failure(code: 404, message: "Not Found")

switch result {
case .success(let data):
    print("データ: \\(data)")
case .failure(let code, let msg):
    print("エラー \\(code): \\(msg)")
}`,
            },
          ],
        },
        {
          id: 's7-mutating',
          name: 'mutating メソッド',
          level: 'basic',
          keywords: 'mutating 値型 self 変更 struct',
          desc: '値型（`struct`・`enum`）のメソッドが `self` を変更するには `mutating` を明示する必要がある。`let` 変数に格納されたインスタンスでは `mutating` メソッドを呼べない。',
          code: [
            {
              lang: 'Swift',
              code: `struct Counter {
    var count = 0
    mutating func increment() { count += 1 }
    mutating func reset()     { count = 0 }
}

var c = Counter()
c.increment()   // OK：var なので mutating 可
c.increment()
print(c.count)  // 2

let fixed = Counter()
// fixed.increment()  // コンパイルエラー`,
            },
          ],
        },
        {
          id: 's7-caseiterable',
          name: 'CaseIterable / RawRepresentable',
          level: 'basic',
          keywords: 'CaseIterable allCases RawRepresentable rawValue',
          desc: '`CaseIterable` を採用すると `allCases` で全ケースを配列として取得できる。`RawRepresentable`（`Int` や `String` 等）を採用するとケースに生の値を付けられる。',
          code: [
            {
              lang: 'Swift',
              code: `enum Season: String, CaseIterable {
    case spring = "春"
    case summer = "夏"
    case autumn = "秋"
    case winter = "冬"
}

// allCases
for s in Season.allCases { print(s.rawValue) }

// rawValue → enum
if let s = Season(rawValue: "夏") {
    print(s)   // summer
}`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // s8: プロトコル
    // ─────────────────────────────────────────────
    {
      id: 's8',
      num: 8,
      title: 'プロトコル',
      level: 'basic',
      items: [
        {
          id: 's8-protocol-basics',
          name: 'protocol の定義と採用',
          level: 'basic',
          keywords: 'protocol 定義 採用 準拠 conform',
          desc: 'プロトコルはメソッド・プロパティの要件を定義する「インターフェース」。`struct`・`class`・`enum` がコロン（`:`）で採用し、要件を実装する。',
          code: [
            {
              lang: 'Swift',
              code: `protocol Drawable {
    var color: String { get }
    func draw()
}

struct Circle: Drawable {
    var color: String
    func draw() { print("○ \\(color)") }
}

struct Square: Drawable {
    var color: String
    func draw() { print("□ \\(color)") }
}

let shapes: [Drawable] = [Circle(color: "赤"), Square(color: "青")]
shapes.forEach { $0.draw() }`,
            },
          ],
        },
        {
          id: 's8-extension-default',
          name: 'extension によるデフォルト実装',
          level: 'basic',
          keywords: 'extension デフォルト実装 プロトコル拡張',
          desc: '`extension` でプロトコルのデフォルト実装を提供できる。採用型はオーバーライドしなければデフォルト実装が使われ、Mix-in のような再利用が可能。',
          code: [
            {
              lang: 'Swift',
              code: `protocol Greetable {
    var name: String { get }
    func greet() -> String
}

extension Greetable {
    // デフォルト実装
    func greet() -> String { "こんにちは、\\(name)!" }
}

struct User: Greetable { var name: String }
struct Bot:  Greetable {
    var name: String
    // オーバーライド
    func greet() -> String { "Bot:\\(name) です" }
}

print(User(name: "Alice").greet())  // こんにちは、Alice!
print(Bot(name: "HAL").greet())     // Bot:HAL です`,
            },
          ],
        },
        {
          id: 's8-composition',
          name: 'プロトコル合成（& ）',
          level: 'basic',
          keywords: 'プロトコル合成 & 複数プロトコル 型制約',
          desc: '`Protocol1 & Protocol2` で複数プロトコルを同時に要求する型を表現できる。型エイリアスや関数引数の型注釈として使える。',
          code: [
            {
              lang: 'Swift',
              code: `protocol Named  { var name: String { get } }
protocol Aged   { var age: Int { get } }

typealias Person = Named & Aged

func introduce(_ p: Person) {
    print("\\(p.name), \\(p.age)歳")
}

struct Student: Named, Aged {
    var name: String
    var age: Int
}
introduce(Student(name: "Bob", age: 20))`,
            },
          ],
        },
        {
          id: 's8-pop',
          name: 'プロトコル指向プログラミング（POP）',
          level: 'basic',
          keywords: 'POP プロトコル指向 継承不要 合成 再利用',
          desc: 'クラス継承の代わりにプロトコルと extension の合成で機能を組み立てるパラダイム。多重継承の問題なく横断的な機能追加が可能で、値型にも適用できる。',
          code: [
            {
              lang: 'Swift',
              code: `protocol Serializable {
    func toJSON() -> String
}
protocol Loggable {
    func log()
}

// Serializable を採用したすべての型に Loggable デフォルト実装を付与
extension Loggable where Self: Serializable {
    func log() { print("[LOG] \\(toJSON())") }
}

struct Config: Serializable, Loggable {
    var key: String
    func toJSON() -> String { "{\"key\":\\\"\\(key)\\\"}" }
}

Config(key: "debug").log()`,
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
          id: 's9-generics-basics',
          name: '型パラメータと制約',
          level: 'basic',
          keywords: 'ジェネリクス 型パラメータ 制約 Equatable Comparable',
          desc: '`<T>` で型パラメータを宣言し、`T: Equatable` のように制約を付けると特定のプロトコルを要求できる。型安全なコードの再利用を実現する。',
          code: [
            {
              lang: 'Swift',
              code: `func findIndex<T: Equatable>(of value: T, in array: [T]) -> Int? {
    for (i, v) in array.enumerated() {
        if v == value { return i }
    }
    return nil
}

print(findIndex(of: 3, in: [1,2,3,4]))    // Optional(2)
print(findIndex(of: "b", in: ["a","b"]))  // Optional(1)`,
            },
          ],
        },
        {
          id: 's9-generic-type',
          name: 'ジェネリック型（Stack の例）',
          level: 'basic',
          keywords: 'ジェネリック型 Stack push pop',
          desc: 'ジェネリック型パラメータを持つ `struct`・`class`・`enum` を定義できる。標準ライブラリの `Array`・`Dictionary` もジェネリック型として実装されている。',
          code: [
            {
              lang: 'Swift',
              code: `struct Stack<Element> {
    private var storage: [Element] = []
    mutating func push(_ item: Element) { storage.append(item) }
    mutating func pop() -> Element?     { storage.popLast() }
    var top: Element?                   { storage.last }
}

var stack = Stack<Int>()
stack.push(1)
stack.push(2)
print(stack.pop()!)   // 2
print(stack.top!)     // 1`,
            },
          ],
        },
        {
          id: 's9-associatedtype',
          name: 'associatedtype',
          level: 'basic',
          keywords: 'associatedtype プロトコル ジェネリクス 関連型',
          desc: 'プロトコルで `associatedtype` を宣言すると、採用型が具体的な型を提供する「プロトコルのジェネリクス」を実現できる。`Sequence` や `Collection` も内部でこれを使用。',
          code: [
            {
              lang: 'Swift',
              code: `protocol Container {
    associatedtype Item
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}

struct IntBox: Container {
    private var items: [Int] = []
    mutating func append(_ item: Int) { items.append(item) }
    var count: Int { items.count }
    subscript(i: Int) -> Int { items[i] }
}`,
            },
          ],
        },
        {
          id: 's9-some-any',
          name: 'some（opaque type）と any（existential）',
          level: 'basic',
          keywords: 'some opaque any existential Swift 5.7',
          desc: '`some Protocol` は「このプロトコルを採用するある一つの具体型」（opaque type）。`any Protocol` は型消去された existential。`some` の方が型情報を保持し高効率。',
          code: [
            {
              lang: 'Swift',
              code: `protocol Animal { func sound() -> String }

struct Dog: Animal { func sound() -> String { "ワン" } }
struct Cat: Animal { func sound() -> String { "ニャー" } }

// some: 戻り値は常に同じ具体型（コンパイラが推論）
func makeDog() -> some Animal { Dog() }

// any: 異なる具体型を混在させたい場合
func makeAnimal(_ isCat: Bool) -> any Animal {
    isCat ? Cat() : Dog()
}

print(makeDog().sound())         // ワン
print(makeAnimal(true).sound())  // ニャー`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // s10: 拡張・演算子・サブスクリプト
    // ─────────────────────────────────────────────
    {
      id: 's10',
      num: 10,
      title: '拡張・演算子・サブスクリプト',
      level: 'basic',
      items: [
        {
          id: 's10-extension',
          name: 'extension（既存型への機能追加）',
          level: 'basic',
          keywords: 'extension 拡張 既存型 メソッド追加',
          desc: '`extension` で既存の型（自作・標準ライブラリ・サードパーティ）にメソッド・プロパティ・イニシャライザを追加できる。継承せずに機能を拡張できる。',
          code: [
            {
              lang: 'Swift',
              code: `extension Int {
    var isEven: Bool { self % 2 == 0 }
    func times(_ block: () -> Void) {
        for _ in 0..<self { block() }
    }
}

print(4.isEven)   // true
3.times { print("Hello") }   // 3回出力

extension String {
    var trimmed: String { trimmingCharacters(in: .whitespaces) }
}
print("  hello  ".trimmed)   // "hello"`,
            },
          ],
        },
        {
          id: 's10-custom-operator',
          name: 'カスタム演算子',
          level: 'basic',
          keywords: 'カスタム演算子 operator infix prefix postfix',
          desc: '`operator` キーワードで独自の演算子を定義できる。`infix`（二項）・`prefix`（前置）・`postfix`（後置）を指定する。DSL 構築などに使われる。',
          code: [
            {
              lang: 'Swift',
              code: `infix operator **: MultiplicationPrecedence

func ** (base: Double, exp: Double) -> Double {
    pow(base, exp)
}

print(2.0 ** 10.0)   // 1024.0

// prefix 演算子
prefix operator √
prefix func √(_ n: Double) -> Double { n.squareRoot() }
print(√16.0)   // 4.0`,
            },
          ],
        },
        {
          id: 's10-subscript',
          name: 'サブスクリプト',
          level: 'basic',
          keywords: 'subscript サブスクリプト 添字アクセス カスタム',
          desc: '`subscript` で `obj[key]` スタイルのアクセスを自作型に定義できる。複数の引数を取るオーバーロードも可能。',
          code: [
            {
              lang: 'Swift',
              code: `struct Matrix {
    private var grid: [Double]
    let rows: Int, cols: Int
    init(rows: Int, cols: Int) {
        self.rows = rows; self.cols = cols
        grid = Array(repeating: 0, count: rows * cols)
    }
    subscript(row: Int, col: Int) -> Double {
        get { grid[row * cols + col] }
        set { grid[row * cols + col] = newValue }
    }
}

var m = Matrix(rows: 2, cols: 2)
m[0, 1] = 3.5
print(m[0, 1])   // 3.5`,
            },
          ],
        },
        {
          id: 's10-property-wrapper',
          name: '@propertyWrapper',
          level: 'basic',
          keywords: 'propertyWrapper プロパティラッパー @Clamped SwiftUI',
          desc: '`@propertyWrapper` でプロパティの読み書きに共通ロジックを注入できる。SwiftUI の `@State`・`@Binding` もこれを使って実装されている。',
          code: [
            {
              lang: 'Swift',
              code: `@propertyWrapper
struct Clamped<T: Comparable> {
    private var value: T
    let range: ClosedRange<T>
    init(wrappedValue: T, _ range: ClosedRange<T>) {
        self.range = range
        self.value = min(max(wrappedValue, range.lowerBound), range.upperBound)
    }
    var wrappedValue: T {
        get { value }
        set { value = min(max(newValue, range.lowerBound), range.upperBound) }
    }
}

struct Config {
    @Clamped(0...100) var volume: Int = 50
}

var cfg = Config()
cfg.volume = 150
print(cfg.volume)   // 100（クランプされる）`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // s11: エラーハンドリング
    // ─────────────────────────────────────────────
    {
      id: 's11',
      num: 11,
      title: 'エラーハンドリング',
      level: 'basic',
      items: [
        {
          id: 's11-throw-try-catch',
          name: 'throw / try / catch / Error',
          level: 'basic',
          keywords: 'throw try catch Error プロトコル エラー処理',
          desc: '`Error` プロトコルに準拠した値を `throw` して通知し、`try` で呼び出し、`catch` でハンドリング。Swift のエラーは型付きで、`enum` との相性が良い。',
          code: [
            {
              lang: 'Swift',
              code: `enum ParseError: Error {
    case emptyInput
    case invalidFormat(String)
}

func parseAge(_ s: String) throws -> Int {
    guard !s.isEmpty else { throw ParseError.emptyInput }
    guard let n = Int(s) else { throw ParseError.invalidFormat(s) }
    return n
}

do {
    let age = try parseAge("abc")
    print(age)
} catch ParseError.emptyInput {
    print("入力が空です")
} catch ParseError.invalidFormat(let v) {
    print("不正な値: \\(v)")
} catch {
    print("不明なエラー: \\(error)")
}`,
            },
          ],
        },
        {
          id: 's11-try-optional-force',
          name: 'try? / try!',
          level: 'basic',
          keywords: 'try? try! Optional 強制 エラー変換',
          desc: '`try?` は失敗時に `nil` を返す Optional に変換。`try!` はエラー時に実行時クラッシュ。失敗しないことが確実な場合か、プロトタイプで `try!` を使う。',
          code: [
            {
              lang: 'Swift',
              code: `// try?
let age1 = try? parseAge("25")   // Optional(25)
let age2 = try? parseAge("abc")  // nil

// ?? と組み合わせ
let display = (try? parseAge("30")) ?? -1   // 30

// try!（失敗しないことが確実な場合のみ）
let regex = try! NSRegularExpression(pattern: "\\\\d+")`,
            },
          ],
        },
        {
          id: 's11-defer',
          name: 'defer',
          level: 'basic',
          keywords: 'defer スコープ終了 クリーンアップ finally',
          desc: '`defer` ブロックはスコープを抜けるときに必ず実行される（return・throw・fall-through に関わらず）。ファイルクローズやロック解除などのクリーンアップに使う。',
          code: [
            {
              lang: 'Swift',
              code: `func readFile(_ path: String) throws -> String {
    let file = openFile(path)  // 仮の関数
    defer { closeFile(file) }  // 必ず実行
    if file == nil { throw ParseError.emptyInput }
    return readContents(file!)
}

// 複数 defer はLIFO順（後入れ先出し）
func demo() {
    defer { print("3") }
    defer { print("2") }
    defer { print("1") }
    print("実行中")
}
// 出力: 実行中 → 1 → 2 → 3`,
            },
          ],
        },
        {
          id: 's11-result',
          name: 'Result<T, E> 型',
          level: 'basic',
          keywords: 'Result success failure 非同期 コールバック',
          desc: '`Result<Success, Failure>` は成功値か失敗値のどちらかを保持する enum。コールバックベースの非同期 API で `throws` の代わりに使われることが多い。',
          code: [
            {
              lang: 'Swift',
              code: `func divide(_ a: Double, by b: Double) -> Result<Double, Error> {
    guard b != 0 else {
        return .failure(ParseError.invalidFormat("除数が0"))
    }
    return .success(a / b)
}

let result = divide(10, by: 2)
switch result {
case .success(let v): print("結果: \\(v)")      // 5.0
case .failure(let e): print("エラー: \\(e)")
}

// get() で throws に変換
let value = try? result.get()   // Optional(5.0)`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // s12: ARC・メモリ管理
    // ─────────────────────────────────────────────
    {
      id: 's12',
      num: 12,
      title: 'ARC・メモリ管理',
      level: 'advanced',
      items: [
        {
          id: 's12-arc',
          name: 'Automatic Reference Counting (ARC)',
          level: 'advanced',
          keywords: 'ARC 参照カウント メモリ管理 自動',
          desc: 'Swift はコンパイル時に参照カウント操作を挿入し、参照数が 0 になったオブジェクトを自動解放する。GC（ガベージコレクタ）と異なり停止時間がない。',
          code: [
            {
              lang: 'Swift',
              code: `class Person {
    let name: String
    init(name: String) { self.name = name; print("\\(name) 生成") }
    deinit { print("\\(name) 解放") }
}

do {
    let a = Person(name: "Alice")   // 参照カウント: 1
    let b = a                       // 参照カウント: 2
    _ = b
}   // スコープを抜けると参照カウント: 0 → deinit 呼ばれる
// 出力: Alice 生成 → Alice 解放`,
            },
          ],
        },
        {
          id: 's12-weak-unowned',
          name: '強参照・weak・unowned',
          level: 'advanced',
          keywords: 'weak unowned 弱参照 非所有参照 循環参照防止',
          desc: '`weak var` は Optional で参照先が解放されると自動的に `nil` になる。`unowned` は非 Optional で参照先の生存を前提とする。どちらも参照カウントを増やさない。',
          code: [
            {
              lang: 'Swift',
              code: `class Owner {
    var pet: Pet?
}
class Pet {
    weak var owner: Owner?   // 循環参照を防ぐ
}

var o: Owner? = Owner()
var p: Pet?   = Pet()
o?.pet = p
p?.owner = o

o = nil   // Owner の参照カウントが 0 に
// p?.owner は nil になる（weak なので）
print(p?.owner == nil)   // true`,
            },
          ],
        },
        {
          id: 's12-capture-list',
          name: '循環参照とキャプチャリスト',
          level: 'advanced',
          keywords: 'キャプチャリスト [weak self] クロージャ 循環参照',
          desc: 'クロージャが `self` を強参照するとクラスとの間で循環参照が生まれる。`[weak self]` または `[unowned self]` でキャプチャリストを指定して防ぐ。',
          code: [
            {
              lang: 'Swift',
              code: `class Timer {
    var callback: (() -> Void)?
    func start() {
        // [weak self] でキャプチャ
        callback = { [weak self] in
            guard let self = self else { return }
            print("tick: \\(self)")
        }
    }
    deinit { print("Timer 解放") }
}

var t: Timer? = Timer()
t?.start()
t?.callback?()
t = nil   // "Timer 解放" が出力される`,
            },
          ],
          warn: '`[unowned self]` は参照先が必ず生存している確信がある場合のみ使う。`nil` になり得る場合は必ず `[weak self]` を選ぶ。',
        },
        {
          id: 's12-exclusive-access',
          name: 'メモリ排他制御',
          level: 'advanced',
          keywords: 'メモリ排他制御 Exclusive Access inout 競合',
          desc: 'Swift は実行時にメモリへの排他アクセスを強制する。同じ変数を `inout` で渡しながら同時に別途アクセスすることはコンパイルエラーまたは実行時エラーになる。',
          code: [
            {
              lang: 'Swift',
              code: `func increment(_ n: inout Int) { n += 1 }

var value = 10
increment(&value)   // OK

// 競合例（コンパイルエラー）
// increment(&value)  ← 同時に value を別途参照するコードと組み合わせると不可

// struct のプロパティへの inout も排他制御される
struct Buffer {
    var data: [Int] = [1,2,3]
    mutating func process() {
        data.sort()   // OK: self 全体を mutating で保護
    }
}`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // s13: Swift Concurrency
    // ─────────────────────────────────────────────
    {
      id: 's13',
      num: 13,
      title: 'Swift Concurrency',
      level: 'advanced',
      items: [
        {
          id: 's13-async-await',
          name: 'async / await の基本',
          level: 'advanced',
          keywords: 'async await 非同期 コルーチン suspend',
          desc: '`async` 関数は中断（suspend）可能な非同期関数。`await` で一時停止し、再開後に結果を受け取る。コールバック地獄を排除してシーケンシャルなコードが書ける。',
          code: [
            {
              lang: 'Swift',
              code: `import Foundation

func fetchUsername(for id: Int) async throws -> String {
    let url = URL(string: "https://example.com/users/\\(id)")!
    let (data, _) = try await URLSession.shared.data(from: url)
    let user = try JSONDecoder().decode(User.self, from: data)
    return user.name
}

// 呼び出し側（async コンテキスト内）
Task {
    do {
        let name = try await fetchUsername(for: 1)
        print("ユーザー: \\(name)")
    } catch {
        print("エラー: \\(error)")
    }
}`,
            },
          ],
        },
        {
          id: 's13-task-taskgroup',
          name: 'Task / TaskGroup',
          level: 'advanced',
          keywords: 'Task TaskGroup 並列 タスク グループ',
          desc: '`Task` で async コンテキスト外から非同期処理を起動。`withTaskGroup` で動的な数のタスクを並列実行し、結果を収集できる。',
          code: [
            {
              lang: 'Swift',
              code: `// Task: 単独タスクの起動
let task = Task {
    try await fetchUsername(for: 42)
}
let name = try await task.value

// withTaskGroup: 並列実行して結果を収集
let ids = [1, 2, 3, 4, 5]
let names = try await withTaskGroup(of: String.self) { group in
    for id in ids {
        group.addTask { try await fetchUsername(for: id) }
    }
    var result: [String] = []
    for try await n in group { result.append(n) }
    return result
}`,
            },
          ],
        },
        {
          id: 's13-actor',
          name: 'actor（データ競合の防止）',
          level: 'advanced',
          keywords: 'actor データ競合 共有状態 スレッドセーフ',
          desc: '`actor` は参照型のうちプロパティへのアクセスを直列化（serialized）するもの。複数タスクからの同時アクセスによるデータ競合をコンパイラが防止する。',
          code: [
            {
              lang: 'Swift',
              code: `actor Counter {
    private(set) var value = 0
    func increment() { value += 1 }
    func reset()     { value = 0 }
}

let counter = Counter()

await withTaskGroup(of: Void.self) { group in
    for _ in 0..<1000 {
        group.addTask { await counter.increment() }
    }
}
// actor が直列化するのでデータ競合なし
print(await counter.value)   // 1000`,
            },
          ],
        },
        {
          id: 's13-main-actor',
          name: '@MainActor',
          level: 'advanced',
          keywords: '@MainActor メインスレッド UI更新 アノテーション',
          desc: '`@MainActor` を付けたクラス・関数はメインスレッドで実行が保証される。UIKit/SwiftUI の更新はメインスレッドで行う必要があり、コンパイラが強制できる。',
          code: [
            {
              lang: 'Swift',
              code: `@MainActor
class ViewModel: ObservableObject {
    @Published var title = "読み込み中..."

    func load() async {
        let result = await fetchData()      // バックグラウンドで実行
        title = result                      // @MainActor なのでメインスレッド
    }
}

// 関数単位で指定
@MainActor func updateUI(with text: String) {
    label.text = text
}`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // s14: Structured Concurrency・AsyncSequence
    // ─────────────────────────────────────────────
    {
      id: 's14',
      num: 14,
      title: 'Structured Concurrency・AsyncSequence',
      level: 'advanced',
      items: [
        {
          id: 's14-async-let',
          name: 'async let（構造化並行処理）',
          level: 'advanced',
          keywords: 'async let 構造化並行 並列実行 await',
          desc: '`async let` で複数の非同期処理を同時に開始し、後で `await` で結果を受け取る。`withTaskGroup` より少数の並列タスクを静的に記述する場合に簡潔。',
          code: [
            {
              lang: 'Swift',
              code: `func loadDashboard() async throws -> (String, [Int]) {
    // username と scores を並列で取得
    async let username = fetchUsername(for: 1)
    async let scores   = fetchScores(for: 1)

    // ここで両方を await（どちらか遅い方を待つ）
    return try await (username, scores)
}

let (name, scores) = try await loadDashboard()
print(name, scores)`,
            },
          ],
        },
        {
          id: 's14-async-sequence',
          name: 'AsyncSequence / AsyncStream',
          level: 'advanced',
          keywords: 'AsyncSequence AsyncStream for await 非同期シーケンス',
          desc: '`AsyncSequence` は非同期に値を生成するシーケンス。`for await` で消費する。`AsyncStream` は手動でコールバックベース API を `AsyncSequence` に変換するラッパー。',
          code: [
            {
              lang: 'Swift',
              code: `// AsyncStream でイベントを非同期シーケンスにラップ
let ticks = AsyncStream<Int> { cont in
    Task {
        for i in 0..<5 {
            try? await Task.sleep(nanoseconds: 100_000_000)
            cont.yield(i)
        }
        cont.finish()
    }
}

// for await で消費
for await tick in ticks {
    print("tick: \\(tick)")
}`,
            },
          ],
        },
        {
          id: 's14-task-cancellation',
          name: 'TaskLocal / withTaskCancellationHandler',
          level: 'advanced',
          keywords: 'TaskLocal TaskCancellationHandler キャンセル タスクローカル',
          desc: '`TaskLocal` はタスクスコープで値を引き継ぐスレッドローカル的な仕組み。`withTaskCancellationHandler` でキャンセル時のクリーンアップをコールバックで登録できる。',
          code: [
            {
              lang: 'Swift',
              code: `// TaskLocal
enum RequestID {
    @TaskLocal static var current: String = "none"
}

Task {
    await RequestID.$current.withValue("req-123") {
        print(RequestID.current)   // req-123
        await someWork()
    }
}

// withTaskCancellationHandler
func fetchWithCancel() async throws -> Data {
    let (data, _) = try await withTaskCancellationHandler {
        try await URLSession.shared.data(from: someURL)
    } onCancel: {
        // キャンセル時のクリーンアップ
    }
    return data
}`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // s15: マクロ・Result Builders
    // ─────────────────────────────────────────────
    {
      id: 's15',
      num: 15,
      title: 'マクロ・Result Builders',
      level: 'advanced',
      items: [
        {
          id: 's15-result-builder',
          name: '@resultBuilder',
          level: 'advanced',
          keywords: 'resultBuilder SwiftUI DSL some View ビルダー',
          desc: '`@resultBuilder` はブロック内の式を一つの値に変換する DSL 構築機能。SwiftUI の `@ViewBuilder` や `some View` の仕組みもこれで実装されている。',
          code: [
            {
              lang: 'Swift',
              code: `@resultBuilder
struct HTMLBuilder {
    static func buildBlock(_ parts: String...) -> String {
        parts.joined(separator: "\\n")
    }
    static func buildIf(_ part: String?) -> String { part ?? "" }
}

func html(@HTMLBuilder content: () -> String) -> String {
    "<html>\\n\\(content())\\n</html>"
}

let page = html {
    "<head><title>Test</title></head>"
    "<body>Hello</body>"
}
print(page)`,
            },
          ],
        },
        {
          id: 's15-swift-macros',
          name: 'Swift マクロ（Swift 5.9+）',
          level: 'advanced',
          keywords: 'macro マクロ @attached @freestanding コード生成 Swift 5.9',
          desc: 'Swift マクロはコンパイル時にコードを変換・生成する仕組み。`@freestanding` は式・宣言を生成し、`@attached` は既存の宣言にコードを追加する。',
          code: [
            {
              lang: 'Swift',
              code: `// @freestanding(expression) マクロの使用例
// （標準ライブラリの #stringify マクロ相当）
let (value, str) = #stringify(2 + 3)
// value = 5, str = "2 + 3"

// @attached(member) マクロの使用例
// Observation フレームワーク（Swift 5.9+）
import Observation

@Observable
class Store {
    var count = 0      // @Observable が監視コードを自動生成
    var name = ""
}`,
            },
          ],
        },
        {
          id: 's15-freestanding-macro',
          name: '@freestanding マクロの定義',
          level: 'advanced',
          keywords: '@freestanding macro 定義 SwiftSyntax コード変換',
          desc: '`@freestanding(expression)` マクロはコンパイラプラグインとして実装する。`SwiftSyntax` で AST を操作し、新しいコードを生成して呼び出し箇所に展開する。',
          code: [
            {
              lang: 'Swift',
              code: `// マクロの宣言（パッケージ側）
@freestanding(expression)
public macro stringify<T>(_ value: T) -> (T, String) =
    #externalMacro(module: "MyMacros", type: "StringifyMacro")

// マクロ実装（コンパイラプラグイン側）
// import SwiftSyntaxMacros
// public struct StringifyMacro: ExpressionMacro {
//     public static func expansion(...) throws -> ExprSyntax {
//         return "(\(node.arguments), \\"\(node.arguments)\\")"
//     }
// }`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // s16: Swift Package Manager・モジュール
    // ─────────────────────────────────────────────
    {
      id: 's16',
      num: 16,
      title: 'Swift Package Manager・モジュール',
      level: 'advanced',
      items: [
        {
          id: 's16-package-swift',
          name: 'Package.swift の構造',
          level: 'advanced',
          keywords: 'Package.swift SPM Swift Package Manager パッケージ',
          desc: 'Swift Package Manager (SPM) のマニフェストファイル。ターゲット・プロダクト・外部依存をコードで宣言する。`swift build`・`swift test` で操作する。',
          code: [
            {
              lang: 'Swift',
              code: `// Package.swift
import PackageDescription

let package = Package(
    name: "MyLib",
    platforms: [.macOS(.v13), .iOS(.v16)],
    products: [
        .library(name: "MyLib", targets: ["MyLib"]),
    ],
    dependencies: [
        .package(url: "https://github.com/apple/swift-algorithms", from: "1.0.0"),
    ],
    targets: [
        .target(
            name: "MyLib",
            dependencies: [.product(name: "Algorithms", package: "swift-algorithms")]
        ),
        .testTarget(name: "MyLibTests", dependencies: ["MyLib"]),
    ]
)`,
            },
          ],
        },
        {
          id: 's16-target-product',
          name: 'target / product / dependency',
          level: 'advanced',
          keywords: 'target product dependency ライブラリ 実行ファイル',
          desc: '`target` はビルドの単位（ソースファイルの集合）。`product` は外部に公開する成果物（ライブラリや実行ファイル）。`dependency` で外部パッケージを取得する。',
          code: [
            {
              lang: 'Swift',
              code: `// 複数ターゲットの構成例
targets: [
    // ライブラリターゲット
    .target(name: "Core", path: "Sources/Core"),
    // 実行ファイルターゲット（@main が必要）
    .executableTarget(
        name: "CLI",
        dependencies: ["Core"],
        path: "Sources/CLI"
    ),
    // テストターゲット
    .testTarget(
        name: "CoreTests",
        dependencies: ["Core"],
        path: "Tests/CoreTests"
    ),
]`,
            },
          ],
        },
        {
          id: 's16-access-control',
          name: 'アクセス制御',
          level: 'advanced',
          keywords: 'open public internal fileprivate private アクセス制御',
          desc: 'Swift には 5 段階のアクセス制御がある。モジュール（フレームワーク/ライブラリ）の外に公開するには `public`、サブクラス化も許可するには `open` を使う。',
          code: [
            {
              lang: 'Swift',
              code: `// open:      モジュール外からサブクラス化・オーバーライド可
// public:    モジュール外からアクセス可（サブクラス化不可）
// internal:  同一モジュール内（デフォルト）
// fileprivate: 同一ファイル内
// private:   同一宣言スコープ内

open class Animal {
    open    func speak() { print("...") }     // 外部でオーバーライド可
    public  func breathe() { print("呼吸") } // 外部からアクセス可
    internal var energy = 100                 // 同モジュール内
    private  var dna: String = "ATCG"        // クラス内のみ
}`,
            },
          ],
        },
        {
          id: 's16-testable-import',
          name: '@testable import',
          level: 'advanced',
          keywords: '@testable import テスト internal アクセス XCTest',
          desc: '`@testable import ModuleName` でテストターゲットからモジュールの `internal` メンバにアクセスできる。テスト用に公開レベルを上げる必要がなくなる。',
          code: [
            {
              lang: 'Swift',
              code: `// Tests/MyLibTests/MyLibTests.swift
import XCTest
@testable import MyLib   // internal メンバにアクセス可能

final class MyLibTests: XCTestCase {
    func testInternalLogic() throws {
        // internal 関数を直接テストできる
        let result = internalHelper(42)
        XCTAssertEqual(result, 84)
    }
}`,
            },
          ],
        },
      ],
    },
  ],
};

export default data;
