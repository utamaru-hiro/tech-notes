import type { LanguageGuide } from '../../types';

const data: LanguageGuide = {
  lang: 'Go',
  langSlug: 'go',
  version: 'Go 1.22',
  lead: `他言語の経験者が 2〜3 時間でざっと読み通せるリファレンスです。Go 固有の設計思想（シンプルさ・明示性・並行処理）を重点的に解説します。`,
  accent: '#00ADD8',
  accent2: '#e0f7fd',
  bgGradientTop: '#eef9fc',
  bgRadialLeft: 'rgba(0,173,216,0.15)',
  bgRadialRight: 'rgba(0,100,160,0.12)',
  badgeGradient: 'linear-gradient(135deg, #005f8e, #00ADD8)',
  heroEmoji: '🐹',
  navGroups: [
    { label: '基礎', sections: ['s1', 's2', 's3', 's4', 's5', 's6', 's7'] },
    { label: 'エラー・インターフェース', sections: ['s8', 's9'] },
    { label: '並行処理', sections: ['s10', 's11'] },
    { label: '実用', sections: ['s12', 's13', 's14'] },
    { label: '応用', sections: ['s15', 's16'] },
  ],
  sections: [
    // ─────────────────────────────────────────
    // s1: 変数・型・基本演算
    // ─────────────────────────────────────────
    {
      id: 's1',
      num: 1,
      title: '変数・型・基本演算',
      level: 'basic',
      items: [
        {
          id: 's1-var-declare',
          name: '変数宣言（var と :=）',
          level: 'basic',
          keywords: 'var := 変数 宣言 ゼロ値 zero value スコープ 短縮宣言 初期化',
          desc: '`var` はパッケージスコープでも関数内でも使えるが、`:=` は関数内でのみ有効な短縮宣言。初期化なしで宣言した変数はゼロ値（int なら `0`、string なら `""`、bool なら `false`、ポインタなら `nil`）が自動的に入る。Go に暗黙のゼロ初期化があるので、C のような未初期化変数バグは起きない。',
          code: [
            {
              lang: 'Go',
              code: `package main

import "fmt"

// パッケージレベルの var 宣言
var globalCount int       // ゼロ値 = 0
var appName string = "MyApp"

func main() {
    // 関数内での var 宣言
    var x int             // ゼロ値 = 0
    var y int = 10
    var z = 20            // 型推論

    // 短縮宣言（:= は関数内のみ）
    name := "gopher"
    a, b := 1, 2          // 複数同時代入

    fmt.Println(x, y, z)           // 0 10 20
    fmt.Println(name, a, b)        // gopher 1 2
    fmt.Println(globalCount, appName) // 0 MyApp

    // ブロックスコープ
    {
        inner := "inside"
        fmt.Println(inner) // inside
    }
    // fmt.Println(inner) // コンパイルエラー: undefined
}`,
            },
          ],
          warn: '`:=` で宣言した変数が外側のスコープの同名変数をシャドウイングすることがある。特に `err` の再利用には注意（少なくとも1変数が新規でないと使えない）。',
        },
        {
          id: 's1-basic-types',
          name: '基本型',
          level: 'basic',
          keywords: 'int float64 bool string byte rune 型 基本型 整数 浮動小数点 文字',
          desc: 'Go の数値型はサイズが明示的（`int8`, `int16`, `int32`, `int64`）。`int` はプラットフォーム依存（64bit 環境では 64bit）。文字は `byte`（`uint8` の別名）または `rune`（`int32` の別名、Unicode コードポイント）で扱う。`string` は不変のバイト列。',
          code: [
            {
              lang: 'Go',
              code: `package main

import "fmt"

func main() {
    var i int = 42
    var f float64 = 3.14
    var b bool = true
    var s string = "Hello, 世界"

    // byte と rune
    ch := 'A'           // rune (int32)
    by := byte('Z')     // byte (uint8)

    fmt.Printf("int: %d, float64: %f\\n", i, f)
    fmt.Printf("bool: %t, string: %s\\n", b, s)
    fmt.Printf("rune: %c (%d), byte: %c (%d)\\n", ch, ch, by, by)

    // 文字列の長さ: バイト数 vs ルーン数
    str := "Hello, 世界"
    fmt.Println("バイト数:", len(str))       // 13
    fmt.Println("ルーン数:", len([]rune(str))) // 9
}`,
            },
          ],
        },
        {
          id: 's1-const-iota',
          name: '定数と iota',
          level: 'basic',
          keywords: 'const iota 定数 列挙 enum 列挙型 ビットフラグ',
          desc: '`const` で定数を定義する。`iota` は `const` ブロック内で 0 から始まる連番整数を自動生成する列挙子で、C の `enum` に相当する。ビットフラグや列挙型に多用される。',
          code: [
            {
              lang: 'Go',
              code: `package main

import "fmt"

// 単純な定数
const Pi = 3.14159
const MaxRetry = 3

// iota による列挙
type Weekday int

const (
    Sunday Weekday = iota // 0
    Monday                // 1
    Tuesday               // 2
    Wednesday             // 3
    Thursday              // 4
    Friday                // 5
    Saturday              // 6
)

// ビットフラグへの応用
type Permission uint

const (
    Read    Permission = 1 << iota // 1
    Write                          // 2
    Execute                        // 4
)

func main() {
    fmt.Println(Sunday, Monday, Saturday) // 0 1 6

    perm := Read | Write
    fmt.Printf("perm: %b (=%d)\\n", perm, perm) // 11 (=3)

    if perm&Read != 0 {
        fmt.Println("読み取り可")
    }
}`,
            },
          ],
        },
        {
          id: 's1-type-conversion',
          name: '型変換（明示的変換）',
          level: 'basic',
          keywords: '型変換 キャスト 明示的 暗黙変換 int float64 string rune',
          desc: 'Go に暗黙的な型変換は一切ない。`int` と `float64` の演算もコンパイルエラーになるため、`T(value)` の形で明示変換する。`string` と `[]byte`・`[]rune` の変換も同様。',
          code: [
            {
              lang: 'Go',
              code: `package main

import (
    "fmt"
    "strconv"
)

func main() {
    var i int = 42
    var f float64 = float64(i) // int → float64
    var u uint = uint(f)       // float64 → uint

    fmt.Println(i, f, u) // 42 42 42

    // string <-> []byte <-> []rune
    s := "Hello"
    b := []byte(s)   // string → []byte
    r := []rune(s)   // string → []rune
    s2 := string(b)  // []byte → string
    fmt.Println(s2, len(b), len(r)) // Hello 5 5

    // 数値 ↔ 文字列は strconv を使う（型変換ではNG）
    n := 123
    str := strconv.Itoa(n)         // int → string
    n2, err := strconv.Atoi("456") // string → int
    if err == nil {
        fmt.Println(str, n2) // 123 456
    }
}`,
            },
          ],
          warn: '`string(65)` は `"A"` になる（ルーンとして解釈）。数値を文字列化したい場合は必ず `strconv.Itoa` や `fmt.Sprintf` を使うこと。',
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
          id: 's2-if',
          name: 'if 文（初期化文付き）',
          level: 'basic',
          keywords: 'if else 条件分岐 初期化文 スコープ エラーハンドリング',
          desc: 'Go の `if` は条件式の前に初期化文を書ける。初期化文で宣言した変数のスコープは `if`/`else` ブロック内に限定される。エラーチェックに頻用されるイディオム。',
          code: [
            {
              lang: 'Go',
              code: `package main

import (
    "fmt"
    "strconv"
)

func main() {
    // 初期化文付き if
    if n, err := strconv.Atoi("42"); err != nil {
        fmt.Println("変換エラー:", err)
    } else {
        fmt.Println("変換成功:", n) // 変換成功: 42
    }
    // n と err はここではスコープ外

    // 通常の if-else if-else
    x := 15
    if x < 0 {
        fmt.Println("負")
    } else if x == 0 {
        fmt.Println("ゼロ")
    } else {
        fmt.Println("正:", x) // 正: 15
    }
}`,
            },
          ],
        },
        {
          id: 's2-for',
          name: 'for の3形態',
          level: 'basic',
          keywords: 'for range while ループ イテレーション 繰り返し break continue',
          desc: 'Go のループは `for` のみ（`while` は存在しない）。C スタイル・条件のみ（while 相当）・`range` の3形態がある。`range` はスライス・マップ・チャネル・文字列に使える。',
          code: [
            {
              lang: 'Go',
              code: `package main

import "fmt"

func main() {
    // 1. C スタイル
    for i := 0; i < 3; i++ {
        fmt.Print(i, " ") // 0 1 2
    }
    fmt.Println()

    // 2. while 相当（条件のみ）
    n := 1
    for n < 8 {
        n *= 2
    }
    fmt.Println(n) // 8

    // 3. 無限ループ
    count := 0
    for {
        count++
        if count >= 3 {
            break
        }
    }

    // 4. range（スライス）
    nums := []int{10, 20, 30}
    for i, v := range nums {
        fmt.Printf("nums[%d] = %d\\n", i, v)
    }

    // 5. range（マップ）
    m := map[string]int{"a": 1, "b": 2}
    for k, v := range m {
        fmt.Printf("%s=%d\\n", k, v)
    }
}`,
            },
          ],
        },
        {
          id: 's2-switch',
          name: 'switch（型スイッチ含む）',
          level: 'basic',
          keywords: 'switch case 型スイッチ type switch fallthrough break',
          desc: 'Go の `switch` は各 `case` の末尾に自動的に break が入る（`fallthrough` で通過可能）。条件なし `switch` は `if-else` チェーンの代替として使える。型スイッチは `interface{}` の実際の型で分岐する。',
          code: [
            {
              lang: 'Go',
              code: `package main

import "fmt"

func describe(i interface{}) string {
    // 型スイッチ
    switch v := i.(type) {
    case int:
        return fmt.Sprintf("int: %d", v)
    case string:
        return fmt.Sprintf("string: %q", v)
    case bool:
        return fmt.Sprintf("bool: %t", v)
    default:
        return fmt.Sprintf("unknown: %T", v)
    }
}

func main() {
    // 通常の switch
    day := 3
    switch day {
    case 1, 7:
        fmt.Println("週末")
    case 2, 3, 4, 5, 6:
        fmt.Println("平日") // 平日
    }

    // 条件なし switch（if-else チェーン代替）
    x := 42
    switch {
    case x < 0:
        fmt.Println("負")
    case x == 0:
        fmt.Println("ゼロ")
    default:
        fmt.Println("正") // 正
    }

    fmt.Println(describe(42))      // int: 42
    fmt.Println(describe("hello")) // string: "hello"
}`,
            },
          ],
        },
        {
          id: 's2-defer',
          name: 'defer（遅延実行）',
          level: 'basic',
          keywords: 'defer LIFO 遅延実行 スタック クリーンアップ 引数評価 パニック',
          desc: '`defer` は関数の終了（return または panic）時に実行される遅延コール。複数の `defer` は LIFO 順（後入れ先出し）で実行される。引数は `defer` 文の評価時点で確定する（関数本体の変数変化の影響を受けない）。',
          code: [
            {
              lang: 'Go',
              code: `package main

import "fmt"

func main() {
    // LIFO 順の確認
    fmt.Println("start")
    defer fmt.Println("defer 1") // 最後に実行
    defer fmt.Println("defer 2") // 次に実行
    defer fmt.Println("defer 3") // 最初に実行
    fmt.Println("end")
    // 出力: start, end, defer 3, defer 2, defer 1

    // 引数の評価タイミング
    x := 0
    defer fmt.Println("deferred x =", x) // x=0 が確定済み
    x = 100
    fmt.Println("x =", x) // x = 100
    // defer では x = 0 が出力される
}`,
            },
          ],
          warn: '`defer` の引数はその行が実行された時点で評価される。ループ内での `defer` は関数終了まで溜まり続けるため、ループ内でリソース解放が必要なら即時クローズか別関数に切り出す。',
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
          id: 's3-multi-return',
          name: '複数戻り値と名前付き戻り値',
          level: 'basic',
          keywords: '複数戻り値 名前付き戻り値 named return error タプル',
          desc: 'Go の関数は複数の値を返せる。慣習的に最後の戻り値を `error` にする。名前付き戻り値を使うと `return` だけで現在値を返せる（naked return）が、長い関数では可読性が落ちるので注意。',
          code: [
            {
              lang: 'Go',
              code: `package main

import (
    "errors"
    "fmt"
)

// 複数戻り値
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

// 名前付き戻り値
func minMax(nums []int) (min, max int) {
    min, max = nums[0], nums[0]
    for _, v := range nums[1:] {
        if v < min {
            min = v
        }
        if v > max {
            max = v
        }
    }
    return // naked return: min と max を返す
}

func main() {
    result, err := divide(10, 3)
    if err != nil {
        fmt.Println("エラー:", err)
        return
    }
    fmt.Printf("%.4f\\n", result) // 3.3333

    _, err2 := divide(5, 0)
    fmt.Println(err2) // division by zero

    mn, mx := minMax([]int{3, 1, 4, 1, 5, 9})
    fmt.Println(mn, mx) // 1 9
}`,
            },
          ],
        },
        {
          id: 's3-variadic',
          name: '可変長引数（variadic）',
          level: 'basic',
          keywords: 'variadic 可変長引数 ... スプレッド スライス展開',
          desc: '`...T` 構文で可変長引数を受け取れる。関数内では `[]T` として扱える。スライスを展開して渡すには `slice...` と記述する。',
          code: [
            {
              lang: 'Go',
              code: `package main

import "fmt"

func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}

func main() {
    fmt.Println(sum(1, 2, 3))       // 6
    fmt.Println(sum(1, 2, 3, 4, 5)) // 15

    // スライスを展開して渡す
    nums := []int{10, 20, 30}
    fmt.Println(sum(nums...)) // 60
}`,
            },
          ],
        },
        {
          id: 's3-first-class',
          name: '関数を値として扱う・クロージャ',
          level: 'basic',
          keywords: '高階関数 クロージャ closure 関数型 first-class コールバック 関数値',
          desc: 'Go では関数は第一級の値（first-class）。変数に代入・引数として渡す・戻り値として返すことができる。クロージャは外側の変数（自由変数）をキャプチャする。',
          code: [
            {
              lang: 'Go',
              code: `package main

import "fmt"

// 関数を引数に取る高階関数
func apply(nums []int, fn func(int) int) []int {
    result := make([]int, len(nums))
    for i, v := range nums {
        result[i] = fn(v)
    }
    return result
}

// クロージャを返す関数
func makeCounter(start int) func() int {
    count := start
    return func() int {
        count++
        return count
    }
}

func main() {
    doubled := apply([]int{1, 2, 3}, func(n int) int {
        return n * 2
    })
    fmt.Println(doubled) // [2 4 6]

    counter := makeCounter(0)
    fmt.Println(counter()) // 1
    fmt.Println(counter()) // 2
    fmt.Println(counter()) // 3

    // 別のカウンターは独立
    counter2 := makeCounter(10)
    fmt.Println(counter2()) // 11
}`,
            },
          ],
        },
        {
          id: 's3-defer-cleanup',
          name: 'defer を使ったクリーンアップ',
          level: 'basic',
          keywords: 'defer cleanup クリーンアップ Close ファイル ロック リソース解放',
          desc: 'リソースの取得直後に `defer` でクローズ処理を書くのが Go のイディオム。return 文が複数あっても確実に実行されるため、漏れが防げる。',
          code: [
            {
              lang: 'Go',
              code: `package main

import (
    "fmt"
    "os"
)

func readFile(path string) (string, error) {
    f, err := os.Open(path)
    if err != nil {
        return "", err
    }
    defer f.Close() // 関数終了時に必ずクローズ

    buf := make([]byte, 128)
    n, err := f.Read(buf)
    if err != nil {
        return "", err
    }
    return string(buf[:n]), nil
}

func withLock(mu interface{ Lock(); Unlock() }, fn func()) {
    mu.Lock()
    defer mu.Unlock() // panic 時も確実にアンロック
    fn()
}

func main() {
    content, err := readFile("/etc/hostname")
    if err != nil {
        fmt.Println("エラー:", err)
        return
    }
    fmt.Println("hostname:", content)
}`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────
    // s4: 配列・スライス
    // ─────────────────────────────────────────
    {
      id: 's4',
      num: 4,
      title: '配列・スライス',
      level: 'basic',
      items: [
        {
          id: 's4-array-vs-slice',
          name: '配列とスライスの違い',
          level: 'basic',
          keywords: '配列 array スライス slice 値型 参照型 コピー 長さ 固定長',
          desc: '配列は固定長の値型（代入・渡しでコピーが発生）。スライスは配列を参照する動的なビューで、長さ・容量・ポインタの3フィールドを持つ参照型に近い挙動。実用では配列より**スライスを使う**のが一般的。',
          code: [
            {
              lang: 'Go',
              code: `package main

import "fmt"

func main() {
    // 配列: 固定長、値型
    arr1 := [3]int{1, 2, 3}
    arr2 := arr1        // コピー
    arr2[0] = 99
    fmt.Println(arr1[0], arr2[0]) // 1 99（互いに独立）

    // スライス: 動的長さ、配列を参照
    sl1 := []int{1, 2, 3}
    sl2 := sl1          // 同じ配列を参照
    sl2[0] = 99
    fmt.Println(sl1[0], sl2[0]) // 99 99（共有）

    // スライス操作
    s := []int{0, 1, 2, 3, 4}
    fmt.Println(s[1:3])  // [1 2]
    fmt.Println(s[:2])   // [0 1]
    fmt.Println(s[3:])   // [3 4]
    fmt.Println(len(s), cap(s)) // 5 5
}`,
            },
          ],
          warn: '`var arr [3]int` と `var sl []int` は別物。配列の型には長さが含まれ `[3]int` と `[4]int` は互換性がない。',
        },
        {
          id: 's4-make-append-copy',
          name: 'make・append・copy',
          level: 'basic',
          keywords: 'make append copy スライス 動的配列 成長 拡張',
          desc: '`make([]T, len, cap)` で長さ・容量指定のスライスを生成。`append` は容量不足時に新しい配列を確保して返す。`copy` は2スライス間でバイトコピーを行い、コピー数を返す。',
          code: [
            {
              lang: 'Go',
              code: `package main

import "fmt"

func main() {
    // make: 長さ3・容量5のスライス
    s := make([]int, 3, 5)
    fmt.Println(len(s), cap(s)) // 3 5

    // append: 要素追加
    s = append(s, 10, 20)
    fmt.Println(s, len(s), cap(s)) // [0 0 0 10 20] 5 5

    // 容量超えると新しい配列を確保
    s = append(s, 30)
    fmt.Println(len(s), cap(s)) // 6 10（2倍程度に拡張）

    // スライスの結合
    a := []int{1, 2}
    b := []int{3, 4, 5}
    a = append(a, b...)
    fmt.Println(a) // [1 2 3 4 5]

    // copy
    dst := make([]int, 3)
    n := copy(dst, a)
    fmt.Println(dst, n) // [1 2 3] 3
}`,
            },
          ],
        },
        {
          id: 's4-slice-internals',
          name: 'スライスの内部構造と共有の罠',
          level: 'basic',
          keywords: 'スライスヘッダ ポインタ 長さ 容量 append 共有 落とし穴',
          desc: 'スライスは（配列ポインタ, len, cap）の3フィールドを持つ構造体。サブスライスは元の配列を共有するため、一方の変更が他方に影響する。`append` で容量を超えると新しい配列が割り当てられ共有が切れる。',
          code: [
            {
              lang: 'Go',
              code: `package main

import "fmt"

func main() {
    original := []int{1, 2, 3, 4, 5}

    // サブスライスは元配列を共有
    sub := original[1:3] // [2 3]
    fmt.Println(sub, len(sub), cap(sub)) // [2 3] 2 4

    sub[0] = 99
    fmt.Println(original) // [1 99 3 4 5] ← 元も変わる!

    // append が容量内なら共有継続
    sub2 := original[1:3]
    sub2 = append(sub2, 77)
    fmt.Println(original) // [1 99 3 77 5] ← 元も変わる!

    // 共有を切るには full slice expression か copy を使う
    independent := make([]int, 2)
    copy(independent, original[1:3])
    independent[0] = 0
    fmt.Println(original[1]) // 99（元は変わらない）
}`,
            },
          ],
          warn: 'サブスライスへの `append` が元のスライスの要素を上書きするバグは頻出。共有を避けるには `copy` で独立したスライスを作る。',
        },
      ],
    },

    // ─────────────────────────────────────────
    // s5: マップ
    // ─────────────────────────────────────────
    {
      id: 's5',
      num: 5,
      title: 'マップ',
      level: 'basic',
      items: [
        {
          id: 's5-map-basics',
          name: 'マップの作成と基本操作',
          level: 'basic',
          keywords: 'map マップ make リテラル キー 値 ハッシュマップ 辞書',
          desc: 'マップは `make` またはリテラルで作成する。キーには `==` で比較可能な型（スライスや関数以外）が使える。宣言だけした nil マップへの書き込みはパニックになる。',
          code: [
            {
              lang: 'Go',
              code: `package main

import "fmt"

func main() {
    // make で作成
    m1 := make(map[string]int)
    m1["apple"] = 5
    m1["banana"] = 3

    // リテラルで作成
    m2 := map[string]int{
        "cat": 1,
        "dog": 2,
    }

    fmt.Println(m1["apple"])  // 5
    fmt.Println(m2["cat"])    // 1

    // nil マップへのアクセス（読み取りは OK、書き込みはパニック）
    var nilMap map[string]int
    fmt.Println(nilMap["key"]) // 0（ゼロ値、パニックにならない）
    // nilMap["key"] = 1        // panic: assignment to entry in nil map
}`,
            },
          ],
          warn: '`var m map[string]int` は nil マップ。読み取りは安全だが書き込みは `panic` になる。必ず `make` かリテラルで初期化すること。',
        },
        {
          id: 's5-map-existence',
          name: '存在確認・delete・range',
          level: 'basic',
          keywords: 'ok イディオム 存在確認 delete range マップ走査 ゼロ値',
          desc: 'マップのキー参照は2値形式 `v, ok := m[key]` で存在確認できる。存在しないキーは型のゼロ値を返すため `ok` を確認しないと誤検知になる。`delete` でキーを削除、`range` で全エントリを走査する（順序は不定）。',
          code: [
            {
              lang: 'Go',
              code: `package main

import "fmt"

func main() {
    scores := map[string]int{
        "Alice": 90,
        "Bob":   75,
    }

    // 存在確認（ok イディオム）
    if score, ok := scores["Alice"]; ok {
        fmt.Println("Alice:", score) // Alice: 90
    }

    if _, ok := scores["Charlie"]; !ok {
        fmt.Println("Charlie は存在しない")
    }

    // ゼロ値の罠: ok なしだと存在しないキーでも 0 が返る
    fmt.Println(scores["Charlie"]) // 0

    // delete
    delete(scores, "Bob")
    fmt.Println(len(scores)) // 1

    // range（順序は実行ごとに変わる）
    for name, score := range scores {
        fmt.Printf("%s: %d\\n", name, score)
    }
}`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────
    // s6: 構造体・メソッド
    // ─────────────────────────────────────────
    {
      id: 's6',
      num: 6,
      title: '構造体・メソッド',
      level: 'basic',
      items: [
        {
          id: 's6-struct-basics',
          name: '構造体リテラル・フィールドアクセス',
          level: 'basic',
          keywords: '構造体 struct フィールド リテラル アクセス 値型 初期化 匿名フィールド',
          desc: '`struct` でフィールドをまとめた複合型を定義する。構造体は値型なので代入・関数渡しでコピーが発生する。フィールドへは `.` でアクセスする。',
          code: [
            {
              lang: 'Go',
              code: `package main

import "fmt"

type Point struct {
    X, Y float64
}

type Person struct {
    Name string
    Age  int
}

func main() {
    // フィールド名指定（推奨）
    p1 := Point{X: 1.0, Y: 2.5}

    // 順序指定（フィールド追加に弱いので非推奨）
    p2 := Point{3.0, 4.0}

    fmt.Println(p1.X, p1.Y) // 1 2.5
    fmt.Println(p2)         // {3 4}

    // 構造体はコピー
    p3 := p1
    p3.X = 99
    fmt.Println(p1.X, p3.X) // 1 99（独立）

    // ポインタを介したアクセス
    pp := &p1
    pp.X = 10          // (*pp).X = 10 の糖衣構文
    fmt.Println(p1.X)  // 10

    // 無名構造体
    config := struct {
        Host string
        Port int
    }{Host: "localhost", Port: 8080}
    fmt.Println(config) // {localhost 8080}
    _ = Person{}
}`,
            },
          ],
        },
        {
          id: 's6-methods',
          name: 'ポインタレシーバ vs 値レシーバ',
          level: 'basic',
          keywords: 'メソッド レシーバ ポインタレシーバ 値レシーバ 変更 mutate',
          desc: 'メソッドは関数に**レシーバ**を加えた構文。値レシーバはコピーに対して呼ばれるため元の値を変更できない。ポインタレシーバはアドレスを渡すため変更が反映される。大きな構造体ではコピーコスト削減のためもポインタレシーバが推奨。',
          code: [
            {
              lang: 'Go',
              code: `package main

import (
    "fmt"
    "math"
)

type Circle struct {
    Radius float64
}

// 値レシーバ: c のコピーに対して操作
func (c Circle) Area() float64 {
    return math.Pi * c.Radius * c.Radius
}

// ポインタレシーバ: c 自身を変更できる
func (c *Circle) Scale(factor float64) {
    c.Radius *= factor
}

func main() {
    c := Circle{Radius: 5}
    fmt.Printf("面積: %.2f\\n", c.Area()) // 78.54

    c.Scale(2)
    fmt.Printf("半径: %.1f\\n", c.Radius) // 10.0
    fmt.Printf("面積: %.2f\\n", c.Area()) // 314.16

    // ポインタからも値からも呼べる（自動変換）
    cp := &Circle{Radius: 3}
    fmt.Printf("%.2f\\n", cp.Area()) // 28.27
}`,
            },
          ],
          warn: '同じ型にポインタレシーバと値レシーバを混在させるとインターフェース実装に影響する。インターフェースを実装する場合は一方に統一するのが無難。',
        },
        {
          id: 's6-embedding',
          name: '埋め込みによる構成',
          level: 'basic',
          keywords: '埋め込み embedding 構成 継承 composition 委譲 フィールド昇格',
          desc: 'Go に継承はない。代わりに**埋め込み（embedding）**で構造体のフィールド・メソッドを昇格させて再利用する。`Base` を埋め込んだ型は `Base` のメソッドをそのまま呼べる（委譲）。',
          code: [
            {
              lang: 'Go',
              code: `package main

import "fmt"

type Animal struct {
    Name string
}

func (a Animal) Speak() string {
    return a.Name + " speaks"
}

type Dog struct {
    Animal        // 埋め込み（フィールド名は Animal）
    Breed  string
}

// Dog 独自のメソッドでオーバーライド相当
func (d Dog) Speak() string {
    return d.Name + " says: Woof!"
}

type Cat struct {
    Animal
}

func main() {
    d := Dog{Animal: Animal{Name: "Rex"}, Breed: "Labrador"}
    c := Cat{Animal: Animal{Name: "Mimi"}}

    fmt.Println(d.Speak())        // Rex says: Woof!（Dog のメソッド）
    fmt.Println(d.Animal.Speak()) // Rex speaks（明示的に Animal のメソッド）
    fmt.Println(c.Speak())        // Mimi speaks（Animal のメソッドが昇格）
    fmt.Println(d.Name)           // Rex（フィールドも昇格）
}`,
            },
          ],
        },
        {
          id: 's6-tags',
          name: '構造体タグ',
          level: 'basic',
          keywords: 'タグ tag json yaml reflect フィールドタグ シリアライズ',
          desc: '構造体フィールドに `\`key:"value"\`` 形式でタグを付与できる。`encoding/json` パッケージはタグで JSON キー名を変更したり `omitempty` でゼロ値フィールドを省略できる。',
          code: [
            {
              lang: 'Go',
              code: `package main

import (
    "encoding/json"
    "fmt"
)

type User struct {
    ID        int    \`json:"id"\`
    Name      string \`json:"name"\`
    Email     string \`json:"email,omitempty"\`
    Password  string \`json:"-"\`          // 出力しない
    CreatedAt string \`json:"created_at"\`
}

func main() {
    u := User{
        ID:       1,
        Name:     "Alice",
        Password: "secret",
    }

    data, _ := json.Marshal(u)
    fmt.Println(string(data))
    // {"id":1,"name":"Alice","created_at":""}

    jsonStr := \`{"id":2,"name":"Bob","email":"bob@example.com"}\`
    var u2 User
    json.Unmarshal([]byte(jsonStr), &u2)
    fmt.Printf("%+v\\n", u2)
    // {ID:2 Name:Bob Email:bob@example.com Password: CreatedAt:}
}`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────
    // s7: ポインタ
    // ─────────────────────────────────────────
    {
      id: 's7',
      num: 7,
      title: 'ポインタ',
      level: 'basic',
      items: [
        {
          id: 's7-pointer-basics',
          name: '& と * 演算子',
          level: 'basic',
          keywords: 'ポインタ & * アドレス 参照 逆参照 nil new',
          desc: '`&v` で変数のアドレスを取得し `*p` でポインタを逆参照する。Go のポインタ演算は存在しない（C と違い安全）。ポインタを使うと関数をまたいで値を変更できる。',
          code: [
            {
              lang: 'Go',
              code: `package main

import "fmt"

func increment(n *int) {
    *n++
}

func main() {
    x := 42
    p := &x              // p は int へのポインタ
    fmt.Println(p)       // アドレス（例: 0xc000018088）
    fmt.Println(*p)      // 42（逆参照）

    *p = 100
    fmt.Println(x)       // 100（x も変わる）

    increment(&x)
    fmt.Println(x)       // 101

    // new: ゼロ値で初期化したポインタを返す
    q := new(int)        // *int、ゼロ値は 0
    *q = 7
    fmt.Println(*q)      // 7
}`,
            },
          ],
        },
        {
          id: 's7-nil-pointer',
          name: 'nil ポインタと注意点',
          level: 'basic',
          keywords: 'nil ポインタ null パニック nil チェック ゼロ値',
          desc: 'ポインタのゼロ値は `nil`。nil ポインタを逆参照すると実行時パニックになる。関数からポインタを返す場合は nil チェックが必要。',
          code: [
            {
              lang: 'Go',
              code: `package main

import "fmt"

type Node struct {
    Value int
    Next  *Node
}

func findNode(head *Node, target int) *Node {
    for n := head; n != nil; n = n.Next {
        if n.Value == target {
            return n
        }
    }
    return nil // 見つからない場合
}

func main() {
    list := &Node{1, &Node{2, &Node{3, nil}}}

    if n := findNode(list, 2); n != nil {
        fmt.Println("Found:", n.Value) // Found: 2
    }

    if n := findNode(list, 99); n == nil {
        fmt.Println("Not found")
    }

    // nil ポインタ逆参照 → panic
    var p *int
    fmt.Println(p == nil) // true
    // fmt.Println(*p)     // panic: nil pointer dereference
}`,
            },
          ],
          warn: '`nil` ポインタへのメソッド呼び出しは、そのメソッドがポインタレシーバで nil チェックをしていれば可能。しかし誤用しやすいため基本は nil チェックを徹底する。',
        },
        {
          id: 's7-escape-analysis',
          name: 'スタック vs ヒープ（エスケープ解析）',
          level: 'basic',
          keywords: 'エスケープ解析 escape analysis スタック ヒープ GC メモリ最適化',
          desc: 'Go コンパイラはエスケープ解析により変数をスタックかヒープに自動配置する。関数外で使われる変数（ポインタで返す等）はヒープに逃がされる。開発者はほぼ意識不要だが、`go build -gcflags="-m"` で確認できる。',
          code: [
            {
              lang: 'Go',
              code: `package main

import "fmt"

// ポインタで返す → sum はヒープに逃がされる
func newInt(v int) *int {
    x := v      // コンパイラが "x escapes to heap" と判断
    return &x
}

// 値を返す → sum はスタックに置かれる
func addInts(a, b int) int {
    return a + b
}

func main() {
    p := newInt(42)
    fmt.Println(*p) // 42

    // go build -gcflags="-m" ./... でエスケープを確認できる
    // 例: ./main.go:9:2: moved to heap: x
}`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────
    // s8: インターフェース
    // ─────────────────────────────────────────
    {
      id: 's8',
      num: 8,
      title: 'インターフェース',
      level: 'basic',
      items: [
        {
          id: 's8-implicit',
          name: '暗黙的実装',
          level: 'basic',
          keywords: 'インターフェース 暗黙的実装 implements ダックタイピング 構造的型付け',
          desc: 'Go のインターフェースは「宣言不要の実装」。メソッドシグネチャが一致すれば自動的に実装とみなされる（構造的部分型付け）。`implements` キーワードは存在しない。',
          code: [
            {
              lang: 'Go',
              code: `package main

import (
    "fmt"
    "math"
)

type Shape interface {
    Area() float64
    Perimeter() float64
}

type Circle struct{ Radius float64 }
type Rectangle struct{ Width, Height float64 }

func (c Circle) Area() float64      { return math.Pi * c.Radius * c.Radius }
func (c Circle) Perimeter() float64 { return 2 * math.Pi * c.Radius }

func (r Rectangle) Area() float64      { return r.Width * r.Height }
func (r Rectangle) Perimeter() float64 { return 2 * (r.Width + r.Height) }

func printShape(s Shape) {
    fmt.Printf("面積: %.2f, 周囲: %.2f\\n", s.Area(), s.Perimeter())
}

func main() {
    shapes := []Shape{
        Circle{Radius: 5},
        Rectangle{Width: 4, Height: 6},
    }
    for _, s := range shapes {
        printShape(s)
    }
}`,
            },
          ],
        },
        {
          id: 's8-any',
          name: 'interface{} / any',
          level: 'basic',
          keywords: 'interface{} any 空インターフェース 型なし 動的型付け',
          desc: '`interface{}`（Go 1.18 以降 `any` が別名として追加）はメソッドを持たない空インターフェースで、任意の型の値を保持できる。型情報を失うため、取り出すには型アサーションが必要。',
          code: [
            {
              lang: 'Go',
              code: `package main

import "fmt"

func printAny(v any) {
    fmt.Printf("type: %T, value: %v\\n", v, v)
}

func main() {
    printAny(42)        // type: int, value: 42
    printAny("hello")   // type: string, value: hello
    printAny([]int{1, 2}) // type: []int, value: [1 2]

    // any のスライス
    items := []any{1, "two", true, 3.14}
    for _, item := range items {
        fmt.Printf("%T\\n", item)
    }
}`,
            },
          ],
        },
        {
          id: 's8-type-assertion',
          name: '型アサーションと型スイッチ',
          level: 'basic',
          keywords: '型アサーション type assertion 型スイッチ type switch panic ok',
          desc: '`v.(T)` で interface の実際の型を取り出す（型が一致しないと panic）。安全な形式は `v, ok := i.(T)` で失敗時は ok が false になる。型スイッチ（`switch v := i.(type)`）で複数型に分岐できる。',
          code: [
            {
              lang: 'Go',
              code: `package main

import "fmt"

func process(i interface{}) {
    // 安全な型アサーション
    if s, ok := i.(string); ok {
        fmt.Println("string:", s)
        return
    }

    // 型スイッチ
    switch v := i.(type) {
    case int:
        fmt.Printf("int x2 = %d\\n", v*2)
    case []int:
        fmt.Printf("slice len=%d\\n", len(v))
    case nil:
        fmt.Println("nil")
    default:
        fmt.Printf("unknown: %T\\n", v)
    }
}

func main() {
    process("hello")         // string: hello
    process(21)              // int x2 = 42
    process([]int{1, 2, 3}) // slice len=3
    process(nil)             // nil

    // パニックする型アサーション（使用非推奨）
    var i interface{} = "test"
    // _ = i.(int) // panic: interface conversion
    _ = i
}`,
            },
          ],
          warn: '`i.(T)` の単値形式はパニックする。必ず `v, ok := i.(T)` の2値形式を使うこと。',
        },
        {
          id: 's8-common-interfaces',
          name: '代表的なインターフェース',
          level: 'basic',
          keywords: 'io.Reader io.Writer fmt.Stringer error インターフェース 標準',
          desc: '標準ライブラリで広く使われる小さなインターフェースを実装することで、既存のエコシステムに統合できる。`io.Reader`・`io.Writer`・`fmt.Stringer`・`error` の4つは特に重要。',
          code: [
            {
              lang: 'Go',
              code: `package main

import (
    "fmt"
    "strings"
)

// fmt.Stringer の実装
type Point struct{ X, Y int }

func (p Point) String() string {
    return fmt.Sprintf("(%d, %d)", p.X, p.Y)
}

// error インターフェースの実装
type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("validation error: %s - %s", e.Field, e.Message)
}

// io.Reader を受け取る関数（strings.NewReader が io.Reader を実装）
func countBytes(r interface{ Read([]byte) (int, error) }) int {
    total := 0
    buf := make([]byte, 8)
    for {
        n, err := r.Read(buf)
        total += n
        if err != nil {
            break
        }
    }
    return total
}

func main() {
    p := Point{3, 4}
    fmt.Println(p) // (3, 4) ← Stringer が使われる

    err := &ValidationError{Field: "email", Message: "invalid format"}
    fmt.Println(err) // validation error: email - invalid format

    r := strings.NewReader("Hello, Gopher!")
    fmt.Println("bytes:", countBytes(r)) // bytes: 14
}`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────
    // s9: エラーハンドリング
    // ─────────────────────────────────────────
    {
      id: 's9',
      num: 9,
      title: 'エラーハンドリング',
      level: 'basic',
      items: [
        {
          id: 's9-error-basics',
          name: 'error インターフェースと基本パターン',
          level: 'basic',
          keywords: 'error errors.New fmt.Errorf nil チェック エラー返却 慣習',
          desc: '`error` は `Error() string` メソッドを持つ組み込みインターフェース。関数の最後の戻り値として `error` を返し、呼び出し側で即座にチェックするのが Go の慣習。成功時は `nil` を返す。',
          code: [
            {
              lang: 'Go',
              code: `package main

import (
    "errors"
    "fmt"
)

var ErrNotFound = errors.New("not found") // センチネルエラー

func findUser(id int) (string, error) {
    users := map[int]string{1: "Alice", 2: "Bob"}
    name, ok := users[id]
    if !ok {
        return "", fmt.Errorf("findUser: id=%d: %w", id, ErrNotFound)
    }
    return name, nil
}

func main() {
    name, err := findUser(1)
    if err != nil {
        fmt.Println("エラー:", err)
        return
    }
    fmt.Println("ユーザー:", name) // ユーザー: Alice

    _, err = findUser(99)
    if err != nil {
        fmt.Println(err) // findUser: id=99: not found
    }
}`,
            },
          ],
        },
        {
          id: 's9-wrap-errors',
          name: 'エラーラップと errors.Is / errors.As',
          level: 'basic',
          keywords: 'fmt.Errorf %w ラップ errors.Is errors.As アンラップ wrap unwrap',
          desc: '`fmt.Errorf("...: %w", err)` でエラーをラップしてコンテキストを追加できる。`errors.Is` はラップチェーンを遡って一致確認、`errors.As` は特定型へのアンラップを行う。',
          code: [
            {
              lang: 'Go',
              code: `package main

import (
    "errors"
    "fmt"
)

type DBError struct {
    Code    int
    Message string
}

func (e *DBError) Error() string {
    return fmt.Sprintf("DB error %d: %s", e.Code, e.Message)
}

var ErrNotFound = errors.New("not found")

func queryDB(id int) error {
    if id < 0 {
        return &DBError{Code: 400, Message: "invalid id"}
    }
    if id == 0 {
        return fmt.Errorf("queryDB: %w", ErrNotFound)
    }
    return nil
}

func getUser(id int) error {
    if err := queryDB(id); err != nil {
        return fmt.Errorf("getUser id=%d: %w", id, err)
    }
    return nil
}

func main() {
    // errors.Is: ラップチェーンを遡って確認
    err := getUser(0)
    fmt.Println(errors.Is(err, ErrNotFound)) // true

    // errors.As: 特定型を取り出す
    err2 := getUser(-1)
    var dbErr *DBError
    if errors.As(err2, &dbErr) {
        fmt.Printf("DBエラーコード: %d\\n", dbErr.Code) // DBエラーコード: 400
    }
}`,
            },
          ],
        },
        {
          id: 's9-custom-error',
          name: 'カスタムエラー型',
          level: 'basic',
          keywords: 'カスタムエラー sentinel error 型アサーション エラー型 定義',
          desc: '`error` インターフェースを実装した独自型を定義すると、エラーに追加情報（コード、フィールド名、HTTPステータスなど）を持たせられる。',
          code: [
            {
              lang: 'Go',
              code: `package main

import "fmt"

// カスタムエラー型
type AppError struct {
    Code    string
    Message string
    Err     error // ラップするエラー
}

func (e *AppError) Error() string {
    if e.Err != nil {
        return fmt.Sprintf("[%s] %s: %v", e.Code, e.Message, e.Err)
    }
    return fmt.Sprintf("[%s] %s", e.Code, e.Message)
}

func (e *AppError) Unwrap() error {
    return e.Err
}

func validate(age int) error {
    if age < 0 || age > 150 {
        return &AppError{
            Code:    "INVALID_AGE",
            Message: fmt.Sprintf("age %d is out of range", age),
        }
    }
    return nil
}

func main() {
    if err := validate(-1); err != nil {
        fmt.Println(err) // [INVALID_AGE] age -1 is out of range

        var appErr *AppError
        if ok := false; !ok {
            _ = appErr
        }
        fmt.Printf("Type: %T\\n", err) // *main.AppError
    }
}`,
            },
          ],
        },
        {
          id: 's9-panic-recover',
          name: 'panic と recover',
          level: 'basic',
          keywords: 'panic recover パニック リカバー defer 例外 クラッシュ 回復',
          desc: '`panic` は制御フローを中断しスタックを巻き戻しながら `defer` を実行する。`recover` は `defer` 関数内でのみパニックを捕捉できる。通常のエラー処理には `error` を使い、`panic` は「回復不可能な状態」のみに留める。',
          code: [
            {
              lang: 'Go',
              code: `package main

import "fmt"

func safeDiv(a, b int) (result int, err error) {
    defer func() {
        if r := recover(); r != nil {
            err = fmt.Errorf("recovered panic: %v", r)
        }
    }()
    result = a / b // b=0 の場合 panic が発生
    return
}

func mustPositive(n int) int {
    if n <= 0 {
        panic(fmt.Sprintf("must be positive, got %d", n))
    }
    return n
}

func main() {
    result, err := safeDiv(10, 2)
    fmt.Println(result, err) // 5 <nil>

    result, err = safeDiv(10, 0)
    fmt.Println(result, err) // 0 recovered panic: runtime error: integer divide by zero

    // panic を recover しない場合（プログラムがクラッシュ）
    // mustPositive(-1)
    fmt.Println(mustPositive(5)) // 5
}`,
            },
          ],
          warn: '`recover` は同じ goroutine の `defer` 内でのみ有効。別の goroutine の panic は捕捉できない。過度な `recover` は「エラーを飲み込む」アンチパターンになるため注意。',
        },
      ],
    },

    // ─────────────────────────────────────────
    // s10: ゴルーチン
    // ─────────────────────────────────────────
    {
      id: 's10',
      num: 10,
      title: 'ゴルーチン',
      level: 'advanced',
      items: [
        {
          id: 's10-goroutine-basics',
          name: 'go キーワードとゴルーチン',
          level: 'advanced',
          keywords: 'goroutine ゴルーチン go キーワード 並行処理 軽量スレッド',
          desc: '`go` キーワードで関数を新しいゴルーチンとして非同期実行する。ゴルーチンは OS スレッドより遙かに軽量（初期スタック 2〜8KB）で、Go ランタイムがスケジューリングを担う。',
          code: [
            {
              lang: 'Go',
              code: `package main

import (
    "fmt"
    "time"
)

func worker(id int) {
    fmt.Printf("worker %d: start\\n", id)
    time.Sleep(100 * time.Millisecond)
    fmt.Printf("worker %d: done\\n", id)
}

func main() {
    for i := 1; i <= 3; i++ {
        go worker(i) // 並行実行
    }

    // main が終わるとすべての goroutine が終了する
    // 本番では WaitGroup や channel で同期する
    time.Sleep(200 * time.Millisecond)
    fmt.Println("all done")
}`,
            },
          ],
          warn: '`main` が終了するとすべてのゴルーチンも強制終了する。`time.Sleep` での同期はテスト目的のみ。本番は WaitGroup かチャネルで同期する。',
        },
        {
          id: 's10-waitgroup',
          name: 'WaitGroup による同期',
          level: 'advanced',
          keywords: 'WaitGroup sync 同期 Add Done Wait ゴルーチン 待機',
          desc: '`sync.WaitGroup` を使うとゴルーチンの完了を確実に待てる。`Add(n)` で待機数を増やし、各ゴルーチン内で `Done()` を呼ぶ（defer 推奨）。`Wait()` は全 Done が呼ばれるまでブロック。',
          code: [
            {
              lang: 'Go',
              code: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    results := make([]int, 5)

    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func(idx int) {
            defer wg.Done()
            results[idx] = idx * idx
        }(i)
    }

    wg.Wait() // 全ゴルーチンの完了を待つ
    fmt.Println(results) // [0 1 4 9 16]
}`,
            },
          ],
        },
        {
          id: 's10-data-race',
          name: 'データ競合と sync.Mutex',
          level: 'advanced',
          keywords: 'データ競合 race condition Mutex RWMutex -race フラグ 排他制御',
          desc: '複数のゴルーチンが同じ変数に並行して読み書きするとデータ競合が発生する。`-race` フラグで競合を検出できる。`sync.Mutex` で排他制御し、`sync.RWMutex` で読み取り多数のケースを最適化する。',
          code: [
            {
              lang: 'Go',
              code: `package main

import (
    "fmt"
    "sync"
)

type SafeCounter struct {
    mu sync.Mutex
    v  map[string]int
}

func (c *SafeCounter) Inc(key string) {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.v[key]++
}

func (c *SafeCounter) Value(key string) int {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.v[key]
}

func main() {
    c := SafeCounter{v: make(map[string]int)}
    var wg sync.WaitGroup

    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            c.Inc("key")
        }()
    }

    wg.Wait()
    fmt.Println(c.Value("key")) // 1000（競合なし）
    // go run -race main.go でデータ競合を検出できる
}`,
            },
          ],
          warn: '`go run -race` または `go test -race` でデータ競合を検出できる。本番コードでは必ず実行すること。',
        },
      ],
    },

    // ─────────────────────────────────────────
    // s11: チャネル
    // ─────────────────────────────────────────
    {
      id: 's11',
      num: 11,
      title: 'チャネル',
      level: 'advanced',
      items: [
        {
          id: 's11-channel-basics',
          name: 'unbuffered / buffered チャネル',
          level: 'advanced',
          keywords: 'channel チャネル unbuffered buffered make chan 送受信 ブロック',
          desc: 'チャネルはゴルーチン間でデータを安全に送受信する仕組み。unbuffered は送信と受信が同時に揃うまでブロック。buffered はバッファが満杯（送信）または空（受信）の時にブロック。',
          code: [
            {
              lang: 'Go',
              code: `package main

import "fmt"

func main() {
    // unbuffered チャネル
    ch := make(chan int)
    go func() {
        ch <- 42 // 受信者が来るまでブロック
    }()
    v := <-ch // 送信者が来るまでブロック
    fmt.Println(v) // 42

    // buffered チャネル
    bch := make(chan string, 3)
    bch <- "a" // バッファに入るのでブロックしない
    bch <- "b"
    bch <- "c"
    // bch <- "d" // バッファ満杯でデッドロック

    fmt.Println(<-bch) // a
    fmt.Println(<-bch) // b
    fmt.Println(len(bch), cap(bch)) // 1 3
}`,
            },
          ],
        },
        {
          id: 's11-select',
          name: 'select 文',
          level: 'advanced',
          keywords: 'select 複数チャネル タイムアウト default ノンブロッキング',
          desc: '`select` は複数のチャネル操作を待ち、準備できたものを実行する（複数同時の場合はランダム選択）。`default` ケースを加えるとノンブロッキングになる。タイムアウトは `time.After` チャネルと組み合わせる。',
          code: [
            {
              lang: 'Go',
              code: `package main

import (
    "fmt"
    "time"
)

func main() {
    ch1 := make(chan string)
    ch2 := make(chan string)

    go func() {
        time.Sleep(50 * time.Millisecond)
        ch1 <- "one"
    }()
    go func() {
        time.Sleep(100 * time.Millisecond)
        ch2 <- "two"
    }()

    for i := 0; i < 2; i++ {
        select {
        case msg1 := <-ch1:
            fmt.Println("ch1:", msg1) // ch1: one
        case msg2 := <-ch2:
            fmt.Println("ch2:", msg2) // ch2: two
        case <-time.After(200 * time.Millisecond):
            fmt.Println("timeout")
        }
    }
}`,
            },
          ],
        },
        {
          id: 's11-channel-close',
          name: 'チャネルのクローズと range',
          level: 'advanced',
          keywords: 'close クローズ range チャネル ok 送受信 完了通知',
          desc: 'チャネルを `close` すると受信側は残りの要素をすべて受け取った後 `ok=false`（または range のループ終了）になる。**送信側がクローズする**のが原則。クローズ済みチャネルへの送信はパニックになる。',
          code: [
            {
              lang: 'Go',
              code: `package main

import "fmt"

func generate(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        for _, n := range nums {
            out <- n
        }
        close(out) // 送信完了を通知
    }()
    return out
}

func main() {
    ch := generate(2, 3, 4, 5)

    // range でクローズまで受信
    for v := range ch {
        fmt.Print(v, " ") // 2 3 4 5
    }
    fmt.Println()

    // ok を使う方法
    ch2 := generate(10, 20)
    for {
        v, ok := <-ch2
        if !ok {
            break
        }
        fmt.Print(v, " ") // 10 20
    }
    fmt.Println()
}`,
            },
          ],
          warn: 'クローズ済みチャネルへの送信は `panic: send on closed channel` になる。クローズは送信側のみが行うこと。',
        },
        {
          id: 's11-done-channel',
          name: 'done チャネルパターン（キャンセル）',
          level: 'advanced',
          keywords: 'done チャネル キャンセル context ゴルーチンリーク シャットダウン',
          desc: '`done` チャネルをクローズすることで複数のゴルーチンに一斉キャンセルを通知するパターン。`close` はブロードキャストになる（全受信者が即座に受け取れる）。現代では `context` パッケージの使用が推奨される。',
          code: [
            {
              lang: 'Go',
              code: `package main

import (
    "fmt"
    "sync"
    "time"
)

func worker(id int, done <-chan struct{}, wg *sync.WaitGroup) {
    defer wg.Done()
    for {
        select {
        case <-done:
            fmt.Printf("worker %d: stopped\\n", id)
            return
        default:
            // 実際の処理
            time.Sleep(30 * time.Millisecond)
        }
    }
}

func main() {
    done := make(chan struct{})
    var wg sync.WaitGroup

    for i := 1; i <= 3; i++ {
        wg.Add(1)
        go worker(i, done, &wg)
    }

    time.Sleep(100 * time.Millisecond)
    close(done) // 全ワーカーにキャンセルをブロードキャスト
    wg.Wait()
    fmt.Println("all workers stopped")
}`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────
    // s12: パッケージ・モジュール
    // ─────────────────────────────────────────
    {
      id: 's12',
      num: 12,
      title: 'パッケージ・モジュール',
      level: 'basic',
      items: [
        {
          id: 's12-package-basics',
          name: 'package main と go.mod',
          level: 'basic',
          keywords: 'package main go.mod module モジュール パッケージ import path',
          desc: '`go.mod` でモジュールの import パスとバージョンを管理する。`package main` と `func main()` がエントリポイント。ライブラリパッケージは `package <name>` を使う。',
          code: [
            {
              lang: 'Go',
              code: `// go.mod の例
// module github.com/example/myapp
//
// go 1.22
//
// require (
//     github.com/some/dep v1.2.3
// )

// ── main.go ──
package main

import (
    "fmt"

    // 外部パッケージのインポート
    // "github.com/example/myapp/internal/greet"
)

func main() {
    fmt.Println("Hello, Module!")
}

// ── greet/greet.go ──
// package greet
//
// func Hello(name string) string {
//     return "Hello, " + name + "!"
// }`,
            },
          ],
        },
        {
          id: 's12-visibility',
          name: '公開・非公開（大文字/小文字）',
          level: 'basic',
          keywords: '公開 非公開 エクスポート exported unexported 大文字 小文字 可視性',
          desc: 'パッケージ外に公開する識別子は**大文字**始まり、パッケージ内のみは**小文字**始まり。関数・型・変数・フィールドすべてに適用される。これだけが Go のアクセス制御手段。',
          code: [
            {
              lang: 'Go',
              code: `package mathutil

// Exported（パッケージ外から使える）
func Add(a, b int) int {
    return a + b
}

// unexported（パッケージ内のみ）
func clamp(v, min, max int) int {
    if v < min {
        return min
    }
    if v > max {
        return max
    }
    return v
}

// Exported 型
type Config struct {
    Host    string // Exported フィールド
    Port    int    // Exported フィールド
    timeout int    // unexported フィールド
}

// New 関数パターン（コンストラクタ代替）
func NewConfig(host string, port int) *Config {
    return &Config{
        Host:    host,
        Port:    port,
        timeout: 30,
    }
}`,
            },
          ],
        },
        {
          id: 's12-init',
          name: 'init 関数',
          level: 'basic',
          keywords: 'init 関数 初期化 パッケージ 実行順序 副作用インポート',
          desc: '`init` 関数はパッケージが読み込まれた時に自動実行される。引数も戻り値も持てない。1ファイルに複数書ける。`import _ "pkg"` で副作用のみのインポートを実現する（DB ドライバ登録など）。',
          code: [
            {
              lang: 'Go',
              code: `package main

import "fmt"

var config map[string]string

func init() {
    // パッケージ初期化時に自動実行
    config = map[string]string{
        "env":  "production",
        "port": "8080",
    }
    fmt.Println("init: config loaded")
}

func init() {
    // 同じファイルに複数の init も可
    fmt.Println("init: second init")
}

func main() {
    fmt.Println("main:", config["env"]) // main: production
}
// 出力順:
// init: config loaded
// init: second init
// main: production`,
            },
          ],
          warn: '`init` に複雑なロジックや副作用を入れすぎるとテストが困難になる。設定の読み込みや検証などシンプルな初期化に留める。',
        },
        {
          id: 's12-go-commands',
          name: 'go get / go mod tidy',
          level: 'basic',
          keywords: 'go get go mod tidy 依存管理 モジュール go.sum バージョン',
          desc: '`go get` で依存を追加・更新し、`go mod tidy` で未使用の依存を削除して `go.sum` を整合させる。`go mod download` でキャッシュに取得。`go list -m all` で依存一覧を確認できる。',
          code: [
            {
              lang: 'Go',
              code: `// ターミナルコマンドの例（コードではなくコマンド操作）

// モジュール初期化
// $ go mod init github.com/example/myapp

// 依存の追加（最新バージョン）
// $ go get github.com/gin-gonic/gin

// 特定バージョンを指定
// $ go get github.com/gin-gonic/gin@v1.9.1

// 未使用の依存を削除し go.sum を整合
// $ go mod tidy

// ビルド
// $ go build ./...

// テスト
// $ go test ./...

// go.mod の例
// module github.com/example/myapp
//
// go 1.22
//
// require (
//     github.com/gin-gonic/gin v1.9.1
// )
package main

import "fmt"

func main() {
    fmt.Println("module system demo")
}`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────
    // s13: 標準ライブラリ
    // ─────────────────────────────────────────
    {
      id: 's13',
      num: 13,
      title: '標準ライブラリ',
      level: 'basic',
      items: [
        {
          id: 's13-fmt',
          name: 'fmt パッケージ',
          level: 'basic',
          keywords: 'fmt Print Println Printf Sprintf Fprintf Scan Scanln Sscan フォーマット',
          desc: '`fmt` はフォーマット付き I/O のコアパッケージ。`%v`（デフォルト）、`%T`（型名）、`%d/%f/%s/%q`（数値・文字列）、`%p`（ポインタ）などの動詞を使う。`Errorf` でフォーマット付きエラーも生成できる。',
          code: [
            {
              lang: 'Go',
              code: `package main

import "fmt"

type Point struct{ X, Y int }

func main() {
    p := Point{1, 2}

    // Print 系
    fmt.Println("hello", 42, true)      // hello 42 true
    fmt.Printf("%v\\n", p)               // {1 2}
    fmt.Printf("%+v\\n", p)              // {X:1 Y:2}
    fmt.Printf("%T\\n", p)               // main.Point
    fmt.Printf("%d %05d %x\\n", 42, 42, 255) // 42 00042 ff

    // Sprintf: 文字列として返す
    msg := fmt.Sprintf("Point: (%d, %d)", p.X, p.Y)
    fmt.Println(msg) // Point: (1, 2)

    // Errorf: エラー生成
    err := fmt.Errorf("invalid value: %d", -1)
    fmt.Println(err) // invalid value: -1

    // Scanf 系（標準入力から読み取り）
    var name string
    var age int
    // fmt.Scanf("%s %d", &name, &age)
    name, age = "Alice", 30
    fmt.Printf("名前: %s, 年齢: %d\\n", name, age)
}`,
            },
          ],
        },
        {
          id: 's13-strings-strconv',
          name: 'strings と strconv',
          level: 'basic',
          keywords: 'strings strconv Contains HasPrefix Split Join TrimSpace ToUpper Atoi Itoa',
          desc: '`strings` は文字列操作のユーティリティ。`strconv` は文字列と数値の変換。文字列は UTF-8 バイト列なので日本語処理には `[]rune` に変換するケースもある。',
          code: [
            {
              lang: 'Go',
              code: `package main

import (
    "fmt"
    "strconv"
    "strings"
)

func main() {
    s := "  Hello, Go World!  "

    fmt.Println(strings.TrimSpace(s))              // Hello, Go World!
    fmt.Println(strings.ToUpper("hello"))           // HELLO
    fmt.Println(strings.Contains("gopher", "go"))  // true
    fmt.Println(strings.HasPrefix("golang", "go")) // true
    fmt.Println(strings.Replace("aaa", "a", "b", 2)) // bba

    parts := strings.Split("a,b,c", ",")
    fmt.Println(parts)                    // [a b c]
    fmt.Println(strings.Join(parts, "-")) // a-b-c

    fmt.Println(strings.Count("cheese", "e"))  // 3
    fmt.Println(strings.Index("hello", "ll"))  // 2

    // strconv: 数値 ↔ 文字列
    n, _ := strconv.Atoi("123")
    fmt.Println(n + 1)              // 124
    fmt.Println(strconv.Itoa(456))  // 456

    f, _ := strconv.ParseFloat("3.14", 64)
    fmt.Printf("%.2f\\n", f)        // 3.14

    fmt.Println(strconv.FormatBool(true))  // true
    b, _ := strconv.ParseBool("false")
    fmt.Println(b)                         // false
}`,
            },
          ],
        },
        {
          id: 's13-os-io',
          name: 'os・io・bufio',
          level: 'basic',
          keywords: 'os io bufio ファイル 読み書き Scanner stdin stdout 標準入出力',
          desc: '`os` はファイル操作・環境変数・プロセス制御。`io` は Reader/Writer の基本インターフェース。`bufio` はバッファリングで効率的な行読み取りができる。',
          code: [
            {
              lang: 'Go',
              code: `package main

import (
    "bufio"
    "fmt"
    "os"
    "strings"
)

func main() {
    // ファイル書き込み
    f, err := os.CreateTemp("", "example*.txt")
    if err != nil {
        panic(err)
    }
    defer os.Remove(f.Name())
    defer f.Close()

    fmt.Fprintln(f, "Line 1")
    fmt.Fprintln(f, "Line 2")
    fmt.Fprintln(f, "Line 3")
    f.Seek(0, 0)

    // bufio.Scanner で行単位読み取り
    scanner := bufio.NewScanner(f)
    for scanner.Scan() {
        line := scanner.Text()
        fmt.Println(">", line)
    }

    // strings.NewReader を使った io.Reader 操作
    r := strings.NewReader("hello world")
    buf := make([]byte, 5)
    n, _ := r.Read(buf)
    fmt.Printf("read %d bytes: %s\\n", n, buf[:n]) // read 5 bytes: hello

    // 環境変数
    fmt.Println(os.Getenv("HOME"))
}`,
            },
          ],
        },
        {
          id: 's13-time',
          name: 'time パッケージ',
          level: 'basic',
          keywords: 'time Time Duration Now Format Parse Sleep After ticker',
          desc: '`time.Time` は時刻を表す構造体。`time.Duration` はナノ秒単位の時間差。`time.Now()` で現在時刻、`Format` と `Parse` で文字列変換（基準時刻 `2006-01-02 15:04:05` が Go 固有）。',
          code: [
            {
              lang: 'Go',
              code: `package main

import (
    "fmt"
    "time"
)

func main() {
    now := time.Now()
    fmt.Println(now) // 2024-01-15 12:34:56.789 +0900 JST

    // フォーマット（Go 固有の基準時刻を使う）
    fmt.Println(now.Format("2006-01-02"))          // 2024-01-15
    fmt.Println(now.Format("2006/01/02 15:04:05")) // 2024/01/15 12:34:56

    // パース
    t, _ := time.Parse("2006-01-02", "2024-12-31")
    fmt.Println(t.Year(), t.Month(), t.Day()) // 2024 December 31

    // Duration
    d := 2*time.Hour + 30*time.Minute
    fmt.Println(d)              // 2h30m0s
    fmt.Println(d.Minutes())    // 150

    // 時刻の比較・差分
    past := now.Add(-24 * time.Hour)
    diff := now.Sub(past)
    fmt.Printf("diff: %.0f hours\\n", diff.Hours()) // diff: 24 hours

    // time.Since / time.Until
    fmt.Println(time.Since(past).Round(time.Hour)) // 24h0m0s
}`,
            },
          ],
          warn: 'Go の時刻フォーマットは `2006-01-02 15:04:05` という「基準時刻」を使う。Java の `yyyy-MM-dd` などと異なるため注意。',
        },
      ],
    },

    // ─────────────────────────────────────────
    // s14: テスト
    // ─────────────────────────────────────────
    {
      id: 's14',
      num: 14,
      title: 'テスト',
      level: 'basic',
      items: [
        {
          id: 's14-testing-basics',
          name: 'testing.T と基本的なテスト',
          level: 'basic',
          keywords: 'testing T Error Fatal Errorf Fatalf go test _test.go テスト',
          desc: '`_test.go` ファイルに `Test` プレフィックスの関数を書く。`t.Errorf` はテストを失敗としてログし続行、`t.Fatalf` は即座に停止する。`go test ./...` で実行。',
          code: [
            {
              lang: 'Go',
              code: `// ── add.go ──
package calc

func Add(a, b int) int { return a + b }
func Sub(a, b int) int { return a - b }

// ── add_test.go ──
package calc

import "testing"

func TestAdd(t *testing.T) {
    got := Add(2, 3)
    want := 5
    if got != want {
        t.Errorf("Add(2,3) = %d; want %d", got, want)
    }
}

func TestSub(t *testing.T) {
    if got, want := Sub(10, 4), 6; got != want {
        t.Fatalf("Sub(10,4) = %d; want %d", got, want)
    }
}

// go test -v ./...
// go test -run TestAdd ./...`,
            },
          ],
        },
        {
          id: 's14-table-driven',
          name: 'テーブルドリブンテスト',
          level: 'basic',
          keywords: 'テーブルドリブン table-driven テスト 構造体スライス サブテスト',
          desc: 'テストケースを構造体スライスで定義し、ループで回すパターン。Go の標準的なテスト手法。コードの重複が減り、ケースの追加が容易になる。',
          code: [
            {
              lang: 'Go',
              code: `package calc

import "testing"

func TestAddTableDriven(t *testing.T) {
    tests := []struct {
        name string
        a, b int
        want int
    }{
        {"両方正", 1, 2, 3},
        {"ゼロ含む", 0, 5, 5},
        {"負の数", -3, 7, 4},
        {"両方負", -2, -3, -5},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got := Add(tt.a, tt.b)
            if got != tt.want {
                t.Errorf("Add(%d, %d) = %d; want %d",
                    tt.a, tt.b, got, tt.want)
            }
        })
    }
}

// go test -v -run TestAddTableDriven ./...
// 出力:
// --- PASS: TestAddTableDriven/両方正
// --- PASS: TestAddTableDriven/ゼロ含む
// ...`,
            },
          ],
        },
        {
          id: 's14-benchmark',
          name: 'ベンチマーク（testing.B）',
          level: 'basic',
          keywords: 'benchmark ベンチマーク testing.B b.N パフォーマンス go test -bench',
          desc: '`Benchmark` プレフィックスの関数で性能測定ができる。`b.N` 回ループを回すと `testing` フレームワークが安定した計測になるまで `N` を自動調整する。`go test -bench=. -benchmem` で実行。',
          code: [
            {
              lang: 'Go',
              code: `package calc

import (
    "strings"
    "testing"
)

// ── ベンチマーク関数 ──
func BenchmarkAdd(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Add(100, 200)
    }
}

// strings.Builder vs + 連結の比較
func BenchmarkStringConcat(b *testing.B) {
    for i := 0; i < b.N; i++ {
        s := ""
        for j := 0; j < 100; j++ {
            s += "x"
        }
        _ = s
    }
}

func BenchmarkStringBuilder(b *testing.B) {
    for i := 0; i < b.N; i++ {
        var sb strings.Builder
        for j := 0; j < 100; j++ {
            sb.WriteString("x")
        }
        _ = sb.String()
    }
}

// go test -bench=. -benchmem ./...
// 出力例:
// BenchmarkStringConcat-8    100000   10532 ns/op   5328 B/op  99 allocs/op
// BenchmarkStringBuilder-8  1000000    1102 ns/op    512 B/op   1 allocs/op`,
            },
          ],
        },
        {
          id: 's14-subtest',
          name: 't.Run でサブテスト',
          level: 'basic',
          keywords: 'サブテスト subtest t.Run 並列 t.Parallel フィルタ',
          desc: '`t.Run(name, func)` でサブテストを作成し、`go test -run TestFoo/ケース名` で個別実行できる。`t.Parallel()` を呼ぶとサブテストが並列実行される。',
          code: [
            {
              lang: 'Go',
              code: `package calc

import "testing"

func TestDivide(t *testing.T) {
    t.Run("正常系", func(t *testing.T) {
        t.Parallel() // 並列実行
        got := float64(10) / float64(2)
        if got != 5.0 {
            t.Errorf("10/2 = %f; want 5.0", got)
        }
    })

    t.Run("ゼロ除算チェック", func(t *testing.T) {
        t.Parallel()
        defer func() {
            if r := recover(); r == nil {
                t.Error("expected panic on zero division")
            }
        }()
        _ = 1 / 0 // integer division by zero
    })
}

// go test -v -run TestDivide ./...
// go test -v -run "TestDivide/正常系" ./...`,
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────
    // s15: ジェネリクス
    // ─────────────────────────────────────────
    {
      id: 's15',
      num: 15,
      title: 'ジェネリクス',
      level: 'advanced',
      items: [
        {
          id: 's15-type-params',
          name: '型パラメータ構文',
          level: 'advanced',
          keywords: 'ジェネリクス generics 型パラメータ type parameter Go 1.18 型引数',
          desc: 'Go 1.18 でジェネリクスが導入された。関数・型に `[T constraint]` の形で型パラメータを追加する。型推論により多くの場合型引数の明示は不要。',
          code: [
            {
              lang: 'Go',
              code: `package main

import "fmt"

// ジェネリック関数: 任意の ordered 型に対して Min を返す
func Min[T int | float64 | string](a, b T) T {
    if a < b {
        return a
    }
    return b
}

// ジェネリック型: 任意の型のスタック
type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(v T) { s.items = append(s.items, v) }

func (s *Stack[T]) Pop() (T, bool) {
    var zero T
    if len(s.items) == 0 {
        return zero, false
    }
    last := len(s.items) - 1
    v := s.items[last]
    s.items = s.items[:last]
    return v, true
}

func main() {
    fmt.Println(Min(3, 5))       // 3（型推論: int）
    fmt.Println(Min(1.5, 0.9))   // 0.9（型推論: float64）
    fmt.Println(Min("b", "a"))   // a（型推論: string）

    s := &Stack[string]{}
    s.Push("a")
    s.Push("b")
    v, _ := s.Pop()
    fmt.Println(v) // b
}`,
            },
          ],
        },
        {
          id: 's15-constraints',
          name: '型制約',
          level: 'advanced',
          keywords: '型制約 constraint comparable ~int interface union golang.org/x/exp/constraints',
          desc: '型制約は型パラメータが満たすべきインターフェース。`comparable` は `==` 使用可の型、`~T` は基底型が T である型を含む。`golang.org/x/exp/constraints` パッケージに `Ordered` などの有用な制約がある。',
          code: [
            {
              lang: 'Go',
              code: `package main

import "fmt"

// カスタム制約: ビット演算が使える整数型
type Integer interface {
    ~int | ~int8 | ~int16 | ~int32 | ~int64 |
        ~uint | ~uint8 | ~uint16 | ~uint32 | ~uint64
}

// comparable 制約: == が使える型で Set を実装
type Set[T comparable] struct {
    m map[T]struct{}
}

func NewSet[T comparable]() *Set[T] {
    return &Set[T]{m: make(map[T]struct{})}
}

func (s *Set[T]) Add(v T)      { s.m[v] = struct{}{} }
func (s *Set[T]) Has(v T) bool { _, ok := s.m[v]; return ok }
func (s *Set[T]) Len() int     { return len(s.m) }

// ~int: MyInt のような int 派生型も受け取れる
type MyInt int

func Double[T Integer](v T) T { return v * 2 }

func main() {
    s := NewSet[string]()
    s.Add("go")
    s.Add("rust")
    s.Add("go")
    fmt.Println(s.Has("go"), s.Len()) // true 2

    var m MyInt = 5
    fmt.Println(Double(m))  // 10
    fmt.Println(Double(7))  // 14
}`,
            },
          ],
        },
        {
          id: 's15-when-to-use',
          name: 'いつジェネリクスを使うか',
          level: 'advanced',
          keywords: 'ジェネリクス 使い所 適切な使い方 コレクション filter map reduce',
          desc: 'ジェネリクスが有効なのは「型に依存しない汎用コンテナ・アルゴリズム」。過剰に使うと可読性が落ちる。`interface{}` で十分な場合や具体型が少ない場合はジェネリクスより単純な実装を優先する。',
          code: [
            {
              lang: 'Go',
              code: `package main

import "fmt"

// 適切な使用例: 汎用的な Map/Filter
func Map[T, U any](s []T, fn func(T) U) []U {
    result := make([]U, len(s))
    for i, v := range s {
        result[i] = fn(v)
    }
    return result
}

func Filter[T any](s []T, fn func(T) bool) []T {
    var result []T
    for _, v := range s {
        if fn(v) {
            result = append(result, v)
        }
    }
    return result
}

func Contains[T comparable](s []T, target T) bool {
    for _, v := range s {
        if v == target {
            return true
        }
    }
    return false
}

func main() {
    nums := []int{1, 2, 3, 4, 5}

    doubled := Map(nums, func(n int) int { return n * 2 })
    fmt.Println(doubled) // [2 4 6 8 10]

    evens := Filter(nums, func(n int) bool { return n%2 == 0 })
    fmt.Println(evens) // [2 4]

    words := []string{"go", "rust", "python"}
    fmt.Println(Contains(words, "go")) // true
}`,
            },
          ],
          warn: '「具体的な型が1〜2種類だけ」「interface{} + 型アサーションで十分」「ジェネリクスにするとシグネチャが複雑になる」ケースでは使わない。',
        },
      ],
    },

    // ─────────────────────────────────────────
    // s16: コンテキスト
    // ─────────────────────────────────────────
    {
      id: 's16',
      num: 16,
      title: 'コンテキスト',
      level: 'advanced',
      items: [
        {
          id: 's16-context-basics',
          name: 'context の基礎',
          level: 'advanced',
          keywords: 'context Background TODO キャンセル タイムアウト 伝播 goroutine',
          desc: '`context.Context` はキャンセルシグナル・タイムアウト・リクエストスコープの値を伝播させる仕組み。`context.Background()` がルート、`context.TODO()` は未決定のプレースホルダーとして使う。',
          code: [
            {
              lang: 'Go',
              code: `package main

import (
    "context"
    "fmt"
    "time"
)

func doWork(ctx context.Context, name string) error {
    select {
    case <-time.After(100 * time.Millisecond):
        fmt.Printf("%s: done\\n", name)
        return nil
    case <-ctx.Done():
        fmt.Printf("%s: cancelled: %v\\n", name, ctx.Err())
        return ctx.Err()
    }
}

func main() {
    // WithCancel
    ctx, cancel := context.WithCancel(context.Background())
    go func() {
        time.Sleep(50 * time.Millisecond)
        cancel() // キャンセルを発行
    }()
    doWork(ctx, "task1") // task1: cancelled: context canceled

    // WithTimeout
    ctx2, cancel2 := context.WithTimeout(context.Background(), 200*time.Millisecond)
    defer cancel2()
    doWork(ctx2, "task2") // task2: done（100ms < 200ms）
}`,
            },
          ],
        },
        {
          id: 's16-with-cancel-timeout',
          name: 'WithCancel・WithTimeout・WithDeadline',
          level: 'advanced',
          keywords: 'WithCancel WithTimeout WithDeadline cancel タイムアウト デッドライン 期限',
          desc: '`WithCancel` は手動キャンセル用。`WithTimeout(ctx, d)` は指定時間後に自動キャンセル。`WithDeadline(ctx, t)` は絶対時刻でキャンセル。いずれも `cancel` 関数を `defer` で呼ぶことでリソースリークを防ぐ。',
          code: [
            {
              lang: 'Go',
              code: `package main

import (
    "context"
    "fmt"
    "time"
)

func fetchData(ctx context.Context, url string) (string, error) {
    // 実際の HTTP クライアントの代わりにシミュレート
    done := make(chan string, 1)
    go func() {
        time.Sleep(150 * time.Millisecond) // 模擬的な遅延
        done <- "data from " + url
    }()

    select {
    case result := <-done:
        return result, nil
    case <-ctx.Done():
        return "", ctx.Err()
    }
}

func main() {
    // タイムアウト付きリクエスト
    ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
    defer cancel()

    data, err := fetchData(ctx, "https://api.example.com")
    if err != nil {
        fmt.Println("エラー:", err) // エラー: context deadline exceeded
        return
    }
    fmt.Println(data)

    // 十分な時間があれば成功
    ctx2, cancel2 := context.WithTimeout(context.Background(), 300*time.Millisecond)
    defer cancel2()

    data2, err2 := fetchData(ctx2, "https://api.example.com")
    if err2 == nil {
        fmt.Println(data2) // data from https://api.example.com
    }
}`,
            },
          ],
          warn: '`cancel` を `defer` しないとコンテキストのリソースがリークする。`WithTimeout` や `WithDeadline` でも `cancel` を必ず呼ぶこと。',
        },
        {
          id: 's16-context-value',
          name: 'context.Value による値の伝播',
          level: 'advanced',
          keywords: 'context Value 値伝播 リクエストスコープ キー 型安全 トレースID',
          desc: '`context.WithValue` でリクエストスコープの値（リクエスト ID、認証情報など）を伝播できる。キーに文字列を使うと衝突リスクがあるため、**パッケージローカルの型**をキーにするのが慣習。',
          code: [
            {
              lang: 'Go',
              code: `package main

import (
    "context"
    "fmt"
)

// キーの衝突を防ぐためパッケージ固有の型を使う
type contextKey string

const (
    requestIDKey contextKey = "requestID"
    userIDKey    contextKey = "userID"
)

func withRequestID(ctx context.Context, id string) context.Context {
    return context.WithValue(ctx, requestIDKey, id)
}

func getRequestID(ctx context.Context) (string, bool) {
    id, ok := ctx.Value(requestIDKey).(string)
    return id, ok
}

func handleRequest(ctx context.Context) {
    if id, ok := getRequestID(ctx); ok {
        fmt.Printf("処理中 requestID=%s\\n", id)
    }
}

func main() {
    ctx := context.Background()
    ctx = withRequestID(ctx, "req-12345")
    ctx = context.WithValue(ctx, userIDKey, "user-99")

    handleRequest(ctx) // 処理中 requestID=req-12345

    userID, _ := ctx.Value(userIDKey).(string)
    fmt.Println("userID:", userID) // userID: user-99
}`,
            },
          ],
          warn: '`context.Value` は必須パラメータの受け渡しに使ってはならない。関数シグネチャで明示できる値はそちらを使う。context は横断的関心事（トレース ID、認証トークン）のみに限定する。',
        },
        {
          id: 's16-context-pattern',
          name: '典型的な使用パターン',
          level: 'advanced',
          keywords: 'context HTTP リクエスト DB クエリ グレースフルシャットダウン パターン',
          desc: 'HTTP サーバーでは `r.Context()` でリクエストスコープの context を取得できる。DB クエリやサードパーティ呼び出しでは context を受け取る API が標準化されており、キャンセルが自動的に伝播する。',
          code: [
            {
              lang: 'Go',
              code: `package main

import (
    "context"
    "fmt"
    "net/http"
    "time"
)

// DB クエリを模擬した関数
func queryUser(ctx context.Context, id int) (string, error) {
    // context のキャンセルを伝播できる
    select {
    case <-time.After(50 * time.Millisecond): // DB 応答シミュレート
        return fmt.Sprintf("user-%d", id), nil
    case <-ctx.Done():
        return "", ctx.Err()
    }
}

// HTTP ハンドラー
func userHandler(w http.ResponseWriter, r *http.Request) {
    ctx := r.Context() // リクエストスコープの context

    // クライアントが切断したら ctx がキャンセルされる
    name, err := queryUser(ctx, 42)
    if err != nil {
        http.Error(w, err.Error(), http.StatusServiceUnavailable)
        return
    }
    fmt.Fprintf(w, "Hello, %s!", name)
}

func main() {
    // サーバー起動の例（実際には ListenAndServe）
    ctx, cancel := context.WithTimeout(context.Background(), 200*time.Millisecond)
    defer cancel()

    result, err := queryUser(ctx, 1)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println("Result:", result) // Result: user-1

    // HTTP サーバー登録例
    http.HandleFunc("/user", userHandler)
    fmt.Println("handler registered")
}`,
            },
          ],
        },
      ],
    },
  ],
};

export default data;
