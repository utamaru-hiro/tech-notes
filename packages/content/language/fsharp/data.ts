import type { LanguageGuide } from '../../types';

const data: LanguageGuide = {
  lang: 'F#',
  langSlug: 'fsharp',
  version: 'F# 8.x / .NET 8',
  lead: `他言語の経験者が 2〜3 時間でざっと読み通せるリファレンスです。型推論・判別共用体・コンピュテーション式など F# 固有の関数型機能を重点的に解説します。`,
  accent: '#2a5f9e',
  accent2: '#d5e8ff',
  bgGradientTop: '#eef5ff',
  bgRadialLeft: 'rgba(42,95,158,0.10)',
  bgRadialRight: 'rgba(80,130,200,0.07)',
  badgeGradient: 'linear-gradient(135deg, #1a3a6e, #2a5f9e)',
  heroEmoji: '🔮',
  navGroups: [
    { label: '基礎', sections: ['s1','s2','s3','s4','s5','s6'] },
    { label: '型システム', sections: ['s7','s8','s9'] },
    { label: '関数型', sections: ['s10','s11'] },
    { label: '実用', sections: ['s12','s13','s14'] },
    { label: '応用', sections: ['s15','s16'] },
  ],
  sections: [
    {
      id: 's1', num: 1, title: '値・型・バインディング', level: 'basic',
      items: [
        {
          id: 's1-let', name: 'let バインディング', level: 'basic',
          keywords: 'let binding immutable mutable val',
          desc: '`let` で値をバインド（デフォルトは不変）。`mutable` キーワードを付けると変更可能。`<-` で再代入する。',
          code: [{ lang: 'FSharp', code: `let x = 42              // 不変バインディング
let mutable count = 0   // ミュータブル
count <- count + 1      // 再代入（<- を使う）
let pi: float = 3.14    // 型注釈` }],
        },
        {
          id: 's1-types', name: '基本型', level: 'basic',
          keywords: 'int float bool string unit char',
          desc: 'F# の基本型: `int`・`float`・`bool`・`string`・`char`・`unit`（`()`）。.NET の型と互換（`int` は `System.Int32`）。数値リテラルには型サフィックスがある。',
          code: [{ lang: 'FSharp', code: `let i: int    = 42
let f: float  = 3.14
let b: bool   = true
let s: string = "F#"
let u: unit   = ()    // void 相当
let c: char   = 'A'
let l: int64  = 100L  // サフィックスで型指定` }],
        },
        {
          id: 's1-inference', name: '型推論（Hindley–Milner）', level: 'basic',
          keywords: 'type inference Hindley-Milner automatic',
          desc: 'F# は Hindley–Milner 型推論を採用しており、ほぼすべての型を自動推論できる。型注釈は省略可能で、ジェネリック型も自動で推論される。',
          code: [{ lang: 'FSharp', code: `let add a b = a + b        // a, b: int と推論
let addF (a: float) b = a + b  // float と明示
let len xs = List.length xs    // 'a list -> int` }],
        },
        {
          id: 's1-unit', name: 'unit と副作用', level: 'basic',
          keywords: 'unit () void side effect printfn',
          desc: '`unit` は副作用のみを持つ処理の戻り値型。`printfn` は `unit` を返す。F# では副作用を型で明示的に扱う。',
          code: [{ lang: 'FSharp', code: `printfn "Hello, %s!" "F#"   // unit を返す
let greet name: unit = printfn "Hi, %s" name
ignore (1 + 1)  // 値を捨てて unit にする` }],
        },
      ],
    },
    {
      id: 's2', num: 2, title: '制御フロー', level: 'basic',
      items: [
        {
          id: 's2-if', name: 'if 式', level: 'basic',
          keywords: 'if elif else expression',
          desc: 'F# の `if` は式であり値を返す。両分岐の型が一致する必要がある。',
          code: [{ lang: 'FSharp', code: `let max a b = if a > b then a else b

let label =
    if score >= 90 then "A"
    elif score >= 70 then "B"
    else "C"` }],
        },
        {
          id: 's2-match', name: 'match 式', level: 'basic',
          keywords: 'match with pattern case guard',
          desc: 'F# のパターンマッチ。型・値・タプル・リスト・レコード・判別共用体などあらゆる構造でマッチできる。',
          code: [{ lang: 'FSharp', code: `let describe x =
    match x with
    | 0            -> "zero"
    | n when n < 0 -> sprintf "negative %d" n
    | n            -> sprintf "positive %d" n` }],
        },
        {
          id: 's2-for-while', name: 'for / while', level: 'basic',
          keywords: 'for in to downto while do',
          desc: '命令型のループ構文。関数型スタイルでは `List.map`/`List.iter` などを優先するが、`for` は手続き的なコードに使う。',
          code: [{ lang: 'FSharp', code: `for i in 1..10 do
    printfn "%d" i

for i in 10 .. -1 .. 1 do   // downto
    printfn "%d" i

let mutable i = 0
while i < 5 do
    printfn "%d" i
    i <- i + 1` }],
        },
        {
          id: 's2-seq-do', name: 'セミコロンと do', level: 'basic',
          keywords: 'do semicolon begin end sequence',
          desc: '`do` ブロック内では複数の式を改行（またはセミコロン）で区切って順次実行できる。',
          code: [{ lang: 'FSharp', code: `let processFile path =
    let content = System.IO.File.ReadAllText(path)
    printfn "Read %d chars" content.Length
    content.ToUpper()` }],
        },
      ],
    },
    {
      id: 's3', num: 3, title: '関数', level: 'basic',
      items: [
        {
          id: 's3-definition', name: '関数定義とカリー化', level: 'basic',
          keywords: 'let fun currying partial application arrow',
          desc: 'F# の関数は自動でカリー化される。複数引数の関数は実際には「引数を1つとって関数を返す関数」の連鎖。',
          code: [{ lang: 'FSharp', code: `let add a b = a + b       // int -> int -> int
let add5 = add 5          // 部分適用 → int -> int
add5 3                    // 8

// 無名関数
let double = fun x -> x * 2
let triple = (*) 3        // 演算子も部分適用可` }],
        },
        {
          id: 's3-pipe', name: 'パイプ演算子 |>', level: 'basic',
          keywords: 'pipe |> forward composition <<',
          desc: '`|>` で左辺の値を右辺の関数の最後の引数に渡す。関数合成 `>>` で関数を連結できる。',
          code: [{ lang: 'FSharp', code: `"hello world"
|> String.split ' '
|> List.map (fun s -> s.[0..0].ToUpper() + s.[1..])
|> String.concat " "
// "Hello World"

let processText = String.trim >> String.toLower >> String.length` }],
        },
        {
          id: 's3-recursion', name: '再帰関数（rec）', level: 'basic',
          keywords: 'rec recursive tail recursion let rec',
          desc: '再帰関数には `let rec` を使う。末尾再帰は `acc` 引数パターンで書くとコンパイラが最適化する。',
          code: [{ lang: 'FSharp', code: `let rec factorial n =
    if n <= 1 then 1 else n * factorial (n - 1)

// 末尾再帰版
let factorial' n =
    let rec loop acc = function
        | 0 | 1 -> acc
        | n     -> loop (acc * n) (n - 1)
    loop 1 n` }],
        },
        {
          id: 's3-lambda', name: '高階関数・lambda', level: 'basic',
          keywords: 'higher order fun lambda map filter fold',
          desc: '`fun` キーワードで無名関数（ラムダ）を定義。`List.map`・`List.filter`・`List.fold` などに渡して使う。',
          code: [{ lang: 'FSharp', code: `[1..5] |> List.map (fun x -> x * x)   // [1;4;9;16;25]
[1..10] |> List.filter (fun x -> x % 2 = 0)  // [2;4;6;8;10]
[1..5] |> List.fold (+) 0               // 15` }],
        },
      ],
    },
    {
      id: 's4', num: 4, title: 'リスト・配列・シーケンス', level: 'basic',
      items: [
        {
          id: 's4-list', name: 'リスト', level: 'basic',
          keywords: 'list [] :: @ head tail immutable',
          desc: 'F# リストは不変の連結リスト。`[1;2;3]` または `1 :: [2;3]`。`@` で連結。`List` モジュールで操作。',
          code: [{ lang: 'FSharp', code: `let xs = [1; 2; 3]         // セミコロン区切り
let ys = 0 :: xs           // [0;1;2;3]（先頭追加）
let zs = xs @ [4; 5]       // [1;2;3;4;5]（結合）
let h, t = List.head xs, List.tail xs` }],
        },
        {
          id: 's4-array', name: '配列', level: 'basic',
          keywords: 'array [||] mutable index Array',
          desc: '`[|1;2;3|]` でミュータブルな配列を定義。インデックスアクセスは `arr.[i]`（または `arr[i]`）。`Array` モジュールで操作。',
          code: [{ lang: 'FSharp', code: `let arr = [| 1; 2; 3 |]
arr.[0]                    // 1
arr.[1] <- 99              // 変更可能
Array.map ((*) 2) arr      // [|2;198;6|]` }],
        },
        {
          id: 's4-seq', name: 'Seq（シーケンス）', level: 'basic',
          keywords: 'seq IEnumerable lazy infinite generator',
          desc: '`seq { ... }` で遅延評価シーケンス。`IEnumerable<T>` と互換。無限シーケンスも表現できる。',
          code: [{ lang: 'FSharp', code: `let nats = Seq.initInfinite id   // 0,1,2,...
nats |> Seq.take 5 |> Seq.toList  // [0;1;2;3;4]

let evens = seq { for i in 0..2..100 -> i }` }],
        },
        {
          id: 's4-comprehension', name: 'リスト内包表記', level: 'basic',
          keywords: 'list comprehension seq for yield',
          desc: '`[ for x in ... -> expr ]` で内包表記によるリスト生成。`if` でフィルタリング。',
          code: [{ lang: 'FSharp', code: `let squares = [ for i in 1..10 -> i * i ]
// [1;4;9;16;25;36;49;64;81;100]

let evens = [ for i in 1..20 do if i % 2 = 0 then yield i ]` }],
        },
      ],
    },
    {
      id: 's5', num: 5, title: '文字列・フォーマット', level: 'basic',
      items: [
        {
          id: 's5-string', name: '文字列操作', level: 'basic',
          keywords: 'string sprintf printf String.split',
          desc: 'F# の文字列は .NET の `System.String`。`sprintf` で型安全なフォーマット。`String` モジュールで操作。',
          code: [{ lang: 'FSharp', code: `let s = "Hello, F#!"
s.Length                         // 10
s.ToUpper()                      // "HELLO, F#!"
String.concat ", " ["a";"b";"c"] // "a, b, c"
sprintf "Pi is %.4f" System.Math.PI  // "Pi is 3.1416"` }],
        },
        {
          id: 's5-interpolation', name: '文字列補間（F# 5+）', level: 'basic',
          keywords: 'interpolation $"..." sprintf format',
          desc: 'F# 5 以降は `$"..."` で文字列補間が使える。型安全でコンパイル時チェックが働く。',
          code: [{ lang: 'FSharp', code: `let name = "World"
let greeting = \$"Hello, {name}!"     // "Hello, World!"
let info = \$"Pi = {System.Math.PI:.4f}"  // "Pi = 3.1416"` }],
        },
        {
          id: 's5-printf', name: 'printf ファミリー', level: 'basic',
          keywords: 'printf printfn sprintf fprintf %d %s %f',
          desc: '型安全なフォーマット関数群。コンパイル時に書式文字列の型をチェックする。`%d`（整数）`%s`（文字列）`%f`（浮動小数点）`%A`（任意型）。',
          code: [{ lang: 'FSharp', code: `printf "%s is %d years old\n" "Alice" 30
printfn "%A" [1; 2; 3]   // [1; 2; 3]（デバッグ表示）
let msg = sprintf "score: %d" 95` }],
        },
      ],
    },
    {
      id: 's6', num: 6, title: '例外処理', level: 'basic',
      items: [
        {
          id: 's6-try', name: 'try/with と try/finally', level: 'basic',
          keywords: 'try with finally raise exception',
          desc: '`try...with` で例外を捕捉、`try...finally` でクリーンアップ。パターンマッチで例外の種類を区別できる。',
          code: [{ lang: 'FSharp', code: `try
    let n = int "abc"
    n
with
| :? System.FormatException as e -> printfn "Format error: %s" e.Message; 0
| ex -> printfn "Unknown: %s" ex.Message; -1` }],
        },
        {
          id: 's6-result', name: 'Result<T, E>（F# 4.1+）', level: 'basic',
          keywords: 'Result Ok Error option functional error handling',
          desc: '`Result<\'T,\'TError>` で成功（`Ok`）か失敗（`Error`）を表す。`Option<\'T>` は `Some`/`None`。パターンマッチで処理する関数型スタイル。',
          code: [{ lang: 'FSharp', code: `let divide a b =
    if b = 0 then Error "Division by zero"
    else Ok (a / b)

match divide 10 2 with
| Ok result -> printfn "Result: %d" result
| Error msg -> printfn "Error: %s" msg` }],
        },
        {
          id: 's6-failwith', name: 'failwith / invalidArg', level: 'basic',
          keywords: 'failwith invalidArg raise SystemException',
          desc: '`failwith` は `System.Exception` を発生させる便利関数。`invalidArg` は引数エラー用。F# では `Result` を使うのが推奨スタイル。',
          code: [{ lang: 'FSharp', code: `let head = function
    | []    -> failwith "Empty list"
    | x :: _ -> x

let checkAge age =
    if age < 0 then invalidArg "age" "Must be non-negative"
    age` }],
        },
      ],
    },
    {
      id: 's7', num: 7, title: 'レコードと判別共用体', level: 'basic',
      items: [
        {
          id: 's7-record', name: 'レコード型', level: 'basic',
          keywords: 'record type with copy immutable struct',
          desc: 'レコードは名前付きフィールドを持つ不変データ構造。`with` キーワードでコピー生成（構造的等値性も自動）。',
          code: [{ lang: 'FSharp', code: `type Person = {
    Name: string
    Age:  int
}

let alice = { Name = "Alice"; Age = 30 }
let older = { alice with Age = 31 }    // コピー
alice = { Name = "Alice"; Age = 30 }   // true（構造的等値）` }],
        },
        {
          id: 's7-du', name: '判別共用体（DU）', level: 'basic',
          keywords: 'discriminated union DU ADT sealed',
          desc: '代数的データ型（ADT）。`type Shape = Circle of float | Rectangle of float * float` のように定義し、パターンマッチで処理する。型安全な条件分岐。',
          code: [{ lang: 'FSharp', code: `type Shape =
    | Circle    of radius: float
    | Rectangle of width: float * height: float
    | Triangle  of base: float * height: float

let area = function
    | Circle r        -> System.Math.PI * r * r
    | Rectangle(w, h) -> w * h
    | Triangle(b, h)  -> b * h / 2.0` }],
        },
        {
          id: 's7-option', name: 'Option 型', level: 'basic',
          keywords: 'Option Some None nullable',
          desc: '`Option<\'T>` は `Some value` または `None`。null の代替。`Option.map`・`Option.bind`・`Option.defaultValue` で関数型スタイルの操作。',
          code: [{ lang: 'FSharp', code: `let safeDiv a b =
    if b = 0 then None else Some (a / b)

safeDiv 10 2  |> Option.map ((*) 3)   // Some 15
safeDiv 10 0  |> Option.defaultValue -1 // -1` }],
        },
        {
          id: 's7-single-case', name: 'シングルケース DU（newtype）', level: 'advanced',
          keywords: 'single case DU newtype wrapper type safety',
          desc: 'ケースが1つの判別共用体で型安全なラッパーを定義。`UserId` と `OrderId` を `int` で区別できる。',
          code: [{ lang: 'FSharp', code: `type UserId  = UserId  of int
type OrderId = OrderId of int

let uid = UserId 42
let (UserId rawId) = uid   // アンラップ

// let wrong: OrderId = uid  // コンパイルエラー` }],
        },
      ],
    },
    {
      id: 's8', num: 8, title: 'クラスとインターフェース', level: 'basic',
      items: [
        {
          id: 's8-class', name: 'クラス定義', level: 'basic',
          keywords: 'class new member val interface .NET OOP',
          desc: '.NET との互換のためクラスも定義できる。`type ClassName(args) =` が基本構文。`member this.Method` でインスタンスメソッドを定義。',
          code: [{ lang: 'FSharp', code: `type Counter(initial: int) =
    let mutable count = initial

    member _.Value = count
    member _.Increment() = count <- count + 1
    member _.Reset()    = count <- 0

let c = Counter(10)
c.Increment()
printfn "%d" c.Value   // 11` }],
        },
        {
          id: 's8-interface', name: 'インターフェース', level: 'basic',
          keywords: 'interface implement abstract member',
          desc: '.NET インターフェースを実装できる。`interface IFoo with` で明示的実装。',
          code: [{ lang: 'FSharp', code: `type IShape =
    abstract Area: float

type Circle(r) =
    interface IShape with
        member _.Area = System.Math.PI * r * r

let s: IShape = Circle(5.0)
printfn "%.2f" s.Area` }],
        },
        {
          id: 's8-struct', name: '構造体型', level: 'advanced',
          keywords: 'struct value type stack allocation performance',
          desc: '`[<Struct>]` アトリビュートでスタック割り当ての値型を定義。ヒープ割り当てを避けてパフォーマンスを改善できる。',
          code: [{ lang: 'FSharp', code: `[<Struct>]
type Vector2D = { X: float; Y: float }

let v1 = { X = 1.0; Y = 2.0 }
let v2 = { X = 3.0; Y = 4.0 }
let sum = { X = v1.X + v2.X; Y = v1.Y + v2.Y }` }],
        },
      ],
    },
    {
      id: 's9', num: 9, title: 'ジェネリクス・型制約', level: 'advanced',
      items: [
        {
          id: 's9-generic', name: 'ジェネリック関数・型', level: 'basic',
          keywords: "generic 'a 'T type parameter automatic generalization",
          desc: "型変数は `'a`・`'T` で表記。F# は自動汎化により関数が自動的にジェネリックになる場合がある。",
          code: [{ lang: 'FSharp', code: `let identity (x: 'a): 'a = x
let swap (a, b) = (b, a)   // 'a * 'b -> 'b * 'a

type Tree<'a> =
    | Leaf
    | Node of 'a * Tree<'a> * Tree<'a>` }],
        },
        {
          id: 's9-constraints', name: '型制約', level: 'advanced',
          keywords: 'constraint when comparison equality member',
          desc: '`when \'T : comparison` などで型制約を付けられる。比較・等値・演算子の存在を要求できる。',
          code: [{ lang: 'FSharp', code: `let maximum (xs: 'a list when 'a : comparison) =
    List.reduce max xs

let inline addAny (a: ^T) (b: ^T) : ^T =
    a + b   // + 演算子を持つ型ならすべて OK` }],
        },
        {
          id: 's9-srtp', name: 'SRTP（静的解決型パラメータ）', level: 'advanced',
          keywords: 'SRTP statically resolved type inline member constraint',
          desc: '`^T` と `inline` を使うことで、コンパイル時に型を解決し演算子を要求できる（C++ テンプレートに近い）。ゼロコスト抽象。',
          code: [{ lang: 'FSharp', code: `let inline sumList (lst: ^T list) : ^T =
    List.fold (+) LanguagePrimitives.GenericZero lst

sumList [1; 2; 3]       // 6（int）
sumList [1.0; 2.0; 3.0] // 6.0（float）` }],
        },
      ],
    },
    {
      id: 's10', num: 10, title: 'コンピュテーション式', level: 'advanced',
      items: [
        {
          id: 's10-ce', name: 'コンピュテーション式とは', level: 'advanced',
          keywords: 'computation expression builder async seq task',
          desc: 'コンピュテーション式はモナドを読みやすい構文で書くための仕組み。`async { ... }`・`seq { ... }`・`task { ... }` などが代表例。',
          code: [{ lang: 'FSharp', code: `// seq CE
let evens = seq {
    for i in 0..100 do
        if i % 2 = 0 then yield i
}

// option CE（カスタム例）
let result = option {
    let! x = Some 10
    let! y = Some 20
    return x + y
}` }],
        },
        {
          id: 's10-async', name: 'async ワークフロー', level: 'basic',
          keywords: 'async let! do! Async.RunSynchronously await',
          desc: 'F# の `async { }` は非同期ワークフロー。`let!` で非同期値をアンラップ、`do!` で副作用を実行。`Async.RunSynchronously` または `|> Async.Start` で実行。',
          code: [{ lang: 'FSharp', code: `let fetchAsync url = async {
    use client = new System.Net.Http.HttpClient()
    let! response = client.GetStringAsync(url) |> Async.AwaitTask
    return response.Length
}

fetchAsync "https://example.com"
|> Async.RunSynchronously
|> printfn "Length: %d"` }],
        },
        {
          id: 's10-task', name: 'task ワークフロー（F# 6+）', level: 'basic',
          keywords: 'task Task async await .NET TPL',
          desc: 'F# 6 以降は `task { }` で .NET の `Task<T>` を直接扱える。C# の `async/await` と完全互換。',
          code: [{ lang: 'FSharp', code: `open System.Threading.Tasks

let fetchTask url : Task<int> = task {
    use client = new System.Net.Http.HttpClient()
    let! content = client.GetStringAsync(url)
    return content.Length
}

fetchTask "https://example.com" |> _.Result |> printfn "%d"` }],
        },
      ],
    },
    {
      id: 's11', num: 11, title: '型プロバイダー', level: 'advanced',
      items: [
        {
          id: 's11-tp', name: '型プロバイダーとは', level: 'advanced',
          keywords: 'type provider compile-time JSON CSV SQL FSharp.Data',
          desc: '型プロバイダーは外部データソース（JSON・CSV・SQL・XML）から型をコンパイル時に自動生成する F# 固有の機能。型安全なデータアクセスを実現。',
          code: [{ lang: 'FSharp', code: `// FSharp.Data の JSON 型プロバイダー
#r "nuget: FSharp.Data"
open FSharp.Data

type Weather = JsonProvider<"https://api.example.com/weather">
let data = Weather.Load("https://api.example.com/weather")
printfn "Temp: %.1f" data.Temperature  // 型安全にアクセス` }],
        },
        {
          id: 's11-csv', name: 'CSV 型プロバイダー', level: 'advanced',
          keywords: 'CSV CsvProvider FSharp.Data schema',
          desc: 'CSV ファイルのスキーマを自動推論してコンパイル時に型を生成。列名がプロパティとして型安全に使える。',
          code: [{ lang: 'FSharp', code: `type Stocks = CsvProvider<"stocks.csv">
let stocks = Stocks.Load("stocks.csv")
for row in stocks.Rows do
    printfn "%s: %.2f" row.Symbol row.Price
// Symbol, Price は CSV ヘッダーから自動生成された型` }],
        },
        {
          id: 's11-sql', name: 'SQL 型プロバイダー', level: 'advanced',
          keywords: 'SqlProvider database compile-time type safety',
          desc: 'データベースのスキーマからコンパイル時に型を生成。クエリの型安全性がコンパイル時に保証される。',
          code: [{ lang: 'FSharp', code: `// SQLProvider 例（概念）
type Sql = SqlDataProvider<"Data Source=mydb.sqlite">
let ctx = Sql.GetDataContext()
query {
    for user in ctx.Users do
    where (user.Age > 18)
    select user.Name
}` }],
        },
      ],
    },
    {
      id: 's12', num: 12, title: '.NET 連携', level: 'basic',
      items: [
        {
          id: 's12-interop', name: '.NET ライブラリの利用', level: 'basic',
          keywords: '.NET BCL interop open namespace System',
          desc: 'F# は .NET の全ライブラリを利用できる。`open System` で名前空間を開き、`System.IO.File` などを直接使用可能。',
          code: [{ lang: 'FSharp', code: `open System
open System.IO

let files = Directory.GetFiles(".", "*.fs")
let content = File.ReadAllText(files[0])
printfn "%s" (DateTime.Now.ToString("yyyy-MM-dd"))` }],
        },
        {
          id: 's12-linq', name: 'LINQ クエリ式', level: 'basic',
          keywords: 'query LINQ select where groupBy IQueryable',
          desc: 'F# の `query { }` コンピュテーション式で SQL ライクな LINQ クエリを書ける。`IEnumerable`・`IQueryable` の両方に対応。',
          code: [{ lang: 'FSharp', code: `let numbers = [1..20]
let result =
    query {
        for n in numbers do
        where (n % 2 = 0)
        select (n * n)
        take 5
    }
// [4; 16; 36; 64; 100]` }],
        },
        {
          id: 's12-nuget', name: 'NuGet と paket', level: 'basic',
          keywords: 'NuGet paket .fsproj dependencies',
          desc: '`.fsproj` ファイルで NuGet パッケージを管理。`dotnet add package` でパッケージを追加。`paket` は代替の依存管理ツール。',
          code: [{ lang: 'FSharp', code: `# CLI でパッケージ追加
dotnet add package Newtonsoft.Json
dotnet add package FSharp.Data

# .fsproj に追記される
# <PackageReference Include="Newtonsoft.Json" Version="13.0.3" />` }],
        },
      ],
    },
    {
      id: 's13', num: 13, title: 'テスト', level: 'basic',
      items: [
        {
          id: 's13-xunit', name: 'xUnit / NUnit', level: 'basic',
          keywords: 'xUnit NUnit test Assert attribute',
          desc: '.NET 標準のテストフレームワーク。`[<Fact>]`・`[<Theory>]` アトリビュートでテストを定義。`dotnet test` で実行。',
          code: [{ lang: 'FSharp', code: `open Xunit

[<Fact>]
let \`\`add returns correct sum\`\` () =
    let result = 1 + 1
    Assert.Equal(2, result)

[<Theory>]
[<InlineData(1, 2, 3)>]
[<InlineData(0, 0, 0)>]
let \`\`add is commutative\`\` a b expected =
    Assert.Equal(expected, a + b)` }],
        },
        {
          id: 's13-expecto', name: 'Expecto', level: 'basic',
          keywords: 'Expecto test expect BDD performance',
          desc: 'F# 向けの軽量テストフレームワーク。関数型スタイルのテスト定義。パフォーマンステストや BDD スタイルもサポート。',
          code: [{ lang: 'FSharp', code: `open Expecto

let tests = testList "Math" [
    test "addition" {
        Expect.equal (1 + 1) 2 "should be 2"
    }
    test "float" {
        Expect.floatClose Accuracy.high 3.14 3.14 "should be equal"
    }
]

[<EntryPoint>]
let main args = runTestsWithCLIArgs [] args tests` }],
        },
        {
          id: 's13-fscheck', name: 'FsCheck（プロパティテスト）', level: 'advanced',
          keywords: 'FsCheck property based testing QuickCheck',
          desc: 'FsCheck は Haskell の QuickCheck の F# 版。ランダムな入力を自動生成して性質（プロパティ）を検証する。',
          code: [{ lang: 'FSharp', code: `open FsCheck

let revRevIsOriginal (xs: int list) =
    List.rev (List.rev xs) = xs

Check.Quick revRevIsOriginal
// Ok, passed 100 tests.` }],
        },
      ],
    },
    {
      id: 's14', num: 14, title: 'ビルドツール・エコシステム', level: 'basic',
      items: [
        {
          id: 's14-dotnet', name: 'dotnet CLI', level: 'basic',
          keywords: 'dotnet new build run test publish',
          desc: '`dotnet` CLI で F# プロジェクトを管理。`dotnet new console -lang F#` で新規プロジェクト。',
          code: [{ lang: 'FSharp', code: `dotnet new console -lang F# -o MyApp
dotnet build
dotnet run
dotnet test
dotnet publish -c Release` }],
        },
        {
          id: 's14-fsproj', name: '.fsproj 構成', level: 'basic',
          keywords: '.fsproj project file order compile',
          desc: 'F# は`.fsproj` でソースファイルの順序が重要（上から順にコンパイル）。前方参照ができないため、依存される型は先に宣言する。',
          code: [{ lang: 'FSharp', code: `<!-- .fsproj の例 -->
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
  </PropertyGroup>
  <ItemGroup>
    <Compile Include="Types.fs" />
    <Compile Include="Logic.fs" />
    <Compile Include="Program.fs" />
  </ItemGroup>
</Project>` }],
        },
        {
          id: 's14-ionide', name: 'Ionide / REPL', level: 'basic',
          keywords: 'Ionide VS Code FSI REPL interactive',
          desc: 'VS Code の Ionide 拡張が F# の主要 IDE。`dotnet fsi` で F# Interactive（REPL）を起動できる。スクリプトファイル（`.fsx`）もサポート。',
          code: [{ lang: 'FSharp', code: `# FSI 起動
dotnet fsi

# スクリプト実行（.fsx ファイル）
dotnet fsi my_script.fsx

# nuget パッケージを FSI で使う
#r "nuget: FSharp.Data"
open FSharp.Data` }],
        },
      ],
    },
    {
      id: 's15', num: 15, title: '関数型パターン・設計', level: 'advanced',
      items: [
        {
          id: 's15-railway', name: 'Railway Oriented Programming', level: 'advanced',
          keywords: 'railway oriented Result bind map two-track',
          desc: '`Result` 型を `bind`（`>>=`）でチェーンするエラーハンドリングパターン。成功パスと失敗パスを「レール」に例えた設計手法。',
          code: [{ lang: 'FSharp', code: `let (>>=) result f =
    match result with
    | Ok v    -> f v
    | Error e -> Error e

let validateAge age =
    if age >= 0 then Ok age else Error "Negative age"

let validateName name =
    if name <> "" then Ok name else Error "Empty name"

let result =
    Ok { Name = ""; Age = -1 }
    >>= (fun p -> validateName p.Name |> Result.map (fun n -> { p with Name = n }))
    >>= (fun p -> validateAge p.Age  |> Result.map (fun a -> { p with Age = a }))` }],
        },
        {
          id: 's15-ddd', name: 'F# と DDD', level: 'advanced',
          keywords: 'DDD domain driven design value object entity type',
          desc: '判別共用体とレコードで Value Object・Entity・集約を表現できる。型システムで不正な状態を表現不可能にする「make illegal states unrepresentable」パターン。',
          code: [{ lang: 'FSharp', code: `// 不正状態を型で排除
type Email = private Email of string
module Email =
    let create s =
        if s.Contains("@") then Ok (Email s)
        else Error "Invalid email"
    let value (Email s) = s

// OrderStatus が型で保証される
type Order =
    | Pending  of items: string list
    | Shipped  of trackingNo: string
    | Delivered` }],
        },
        {
          id: 's15-active-pattern', name: 'アクティブパターン', level: 'advanced',
          keywords: 'active pattern (||) partial complete',
          desc: '`(| Name |)` でカスタムパターンを定義。既存の型に対して読みやすい分解ルールを追加できる。',
          code: [{ lang: 'FSharp', code: `let (|Even|Odd|) n = if n % 2 = 0 then Even else Odd
let (|Positive|Negative|Zero|) n =
    if n > 0 then Positive
    elif n < 0 then Negative
    else Zero

match 42 with
| Even & Positive -> "even positive"
| Odd             -> "odd"
| _               -> "other"` }],
        },
      ],
    },
    {
      id: 's16', num: 16, title: 'パフォーマンス・Native AOT', level: 'advanced',
      items: [
        {
          id: 's16-span', name: 'Span<T> と Memory<T>', level: 'advanced',
          keywords: 'Span Memory stack allocation zero copy performance',
          desc: '.NET の `Span<T>` はスタック割り当てのスライスビュー。`ReadOnlySpan<char>` で文字列のゼロコピー処理が可能。',
          code: [{ lang: 'FSharp', code: `open System

let countChars (s: ReadOnlySpan<char>) (target: char) =
    let mutable count = 0
    for c in s do
        if c = target then count <- count + 1
    count

let text: ReadOnlySpan<char> = "hello world".AsSpan()
countChars text 'l'   // 3` }],
        },
        {
          id: 's16-aot', name: 'Native AOT 発行', level: 'advanced',
          keywords: 'AOT ahead of time compile native publish self-contained',
          desc: '.NET 8 の Native AOT で F# コードをネイティブバイナリに事前コンパイル。起動時間とメモリ使用量を大幅削減できる（リフレクション制限あり）。',
          code: [{ lang: 'FSharp', code: `<!-- .fsproj -->
<PublishAot>true</PublishAot>

# ビルド
dotnet publish -r linux-x64 -c Release
# 自己完結シングルバイナリが生成される` }],
        },
        {
          id: 's16-profiling', name: 'プロファイリング・ベンチマーク', level: 'advanced',
          keywords: 'BenchmarkDotNet profiling dotTrace performance',
          desc: '`BenchmarkDotNet` は .NET の標準ベンチマークライブラリ。`[<Benchmark>]` アトリビューターで計測対象を指定。JIT ウォームアップを考慮した正確な計測ができる。',
          code: [{ lang: 'FSharp', code: `open BenchmarkDotNet.Attributes
open BenchmarkDotNet.Running

[<MemoryDiagnoser>]
type MyBench() =
    [<Benchmark>]
    member _.ListMap() = [1..1000] |> List.map ((*) 2)
    [<Benchmark>]
    member _.ArrayMap() = [|1..1000|] |> Array.map ((*) 2)

BenchmarkRunner.Run<MyBench>() |> ignore` }],
        },
      ],
    },
  ],
};

export default data;
