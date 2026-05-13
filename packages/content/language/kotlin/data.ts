import type { LanguageGuide } from '../../types';

const data: LanguageGuide = {
  lang: 'Kotlin',
  langSlug: 'kotlin',
  version: 'Kotlin 2.x',
  lead: `Java の経験者が 2〜3 時間でざっと読み通せるリファレンスです。null 安全・拡張関数・データクラス・コルーチンなど Kotlin 固有の機能を重点的に解説します。`,
  accent: '#5b3e9e',
  accent2: '#ede8fa',
  bgGradientTop: '#f4f0fc',
  bgRadialLeft: 'rgba(91,62,158,0.13)',
  bgRadialRight: 'rgba(180,160,240,0.10)',
  badgeGradient: 'linear-gradient(135deg, #3a2070, #5b3e9e)',
  heroEmoji: '🎯',
  navGroups: [
    { label: '基礎', sections: ['s1', 's2', 's3', 's4', 's5'] },
    { label: 'OOP・関数型', sections: ['s6', 's7', 's8', 's9'] },
    { label: '標準ライブラリ', sections: ['s10', 's11', 's12'] },
    { label: 'コルーチン', sections: ['s13', 's14'] },
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
          id: 's1-val-var',
          name: 'val / var と型推論',
          level: 'basic',
          keywords: 'val var 型推論 immutable mutable 変数',
          desc: '`val` は再代入不可（Java の `final` に相当）、`var` は再代入可。型は右辺から推論されるため省略できる。',
          code: [
            {
              lang: 'Kotlin',
              code: `val name: String = "Kotlin"  // 明示的型指定
val version = 2              // 推論 → Int
var count = 0
count = 1                    // OK
// name = "Java"            // コンパイルエラー（val は再代入不可）`,
            },
          ],
        },
        {
          id: 's1-null-safety',
          name: 'null 安全',
          level: 'basic',
          keywords: 'null nullable ? !! ?. ?: Elvis NPE NullPointerException',
          desc: '型に `?` を付けると nullable になる。`?.`（safe call）、`?:`（Elvis 演算子）、`!!`（non-null assertion）を使い null を安全に扱う。',
          code: [
            {
              lang: 'Kotlin',
              code: `var s: String? = null      // nullable
val len  = s?.length         // null → null（NPE 発生せず）
val len2 = s?.length ?: 0   // null → 0
val len3 = s!!.length       // null なら NullPointerException`,
            },
          ],
          warn: '`!!` は null でないことが確実な場合のみ使用すること。乱用すると NPE を招く。',
        },
        {
          id: 's1-smart-cast',
          name: 'スマートキャスト',
          level: 'basic',
          keywords: 'is スマートキャスト smart cast 型チェック',
          desc: '`is` で型チェックした後、コンパイラが自動的にその型へキャストする。明示的な `as` キャストが不要になる。',
          code: [
            {
              lang: 'Kotlin',
              code: `fun describe(obj: Any) {
    if (obj is String) {
        println(obj.length)   // obj は自動的に String にキャスト
    }
    if (obj !is Int) return
    println(obj + 1)          // obj は Int にキャスト済み
}`,
            },
          ],
        },
        {
          id: 's1-basic-types',
          name: '基本型（プリミティブなし）',
          level: 'basic',
          keywords: 'Int Long Double Boolean Char primitive JVM 基本型',
          desc: 'Kotlin に Java のような primitive 型はなく、すべてクラス（`Int`・`Long`・`Double`・`Boolean` 等）として扱う。JVM バイトコードでは可能な限りプリミティブに最適化される。',
          code: [
            {
              lang: 'Kotlin',
              code: `val i: Int     = 42
val l: Long    = 100L
val d: Double  = 3.14
val b: Boolean = true
val c: Char    = 'A'
// 数値リテラルの区切り
val million = 1_000_000`,
            },
          ],
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
          id: 's2-if-expr',
          name: 'if 式',
          level: 'basic',
          keywords: 'if else 式 expression 三項演算子',
          desc: 'Kotlin の `if` は**式**（値を返す）。三項演算子 `? :` の代わりに使える。',
          code: [
            {
              lang: 'Kotlin',
              code: `val max = if (a > b) a else b

val grade = if (score >= 90) "A"
            else if (score >= 70) "B"
            else "C"`,
            },
          ],
        },
        {
          id: 's2-when',
          name: 'when 式',
          level: 'basic',
          keywords: 'when switch 式 パターンマッチ range is',
          desc: '`when` は Java の `switch` の強化版。値だけでなく、型チェック・範囲・条件式などを分岐できる。式として値を返せる。',
          code: [
            {
              lang: 'Kotlin',
              code: `val result = when (x) {
    0        -> "zero"
    in 1..9  -> "single digit"
    is String -> "string"
    else     -> "other"
}

// 引数なし when
when {
    x < 0  -> println("negative")
    x == 0 -> println("zero")
    else   -> println("positive")
}`,
            },
          ],
        },
        {
          id: 's2-for-while',
          name: 'for と while',
          level: 'basic',
          keywords: 'for while do-while range step downTo withIndex',
          desc: '`for` は `in` でコレクションや範囲を反復。`..` で閉区間、`until` で半開区間、`step` でステップ幅を指定できる。',
          code: [
            {
              lang: 'Kotlin',
              code: `for (i in 1..5) print(i)               // 1 2 3 4 5
for (i in 1 until 5) print(i)          // 1 2 3 4
for (i in 5 downTo 1 step 2) print(i) // 5 3 1

val list = listOf("a", "b", "c")
for ((index, value) in list.withIndex()) {
    println("\${index}: \${value}")
}

var n = 3
while (n > 0) n--`,
            },
          ],
        },
        {
          id: 's2-labeled-return',
          name: 'ラベル付き return',
          level: 'basic',
          keywords: 'return label ラベル break continue lambda forEach',
          desc: 'ラムダ内から外側の関数へ return するには `return@ラベル名` を使う。`break`・`continue` も同様にラベルで対象ループを指定できる。',
          code: [
            {
              lang: 'Kotlin',
              code: `fun findFirst(list: List<Int>, target: Int) {
    list.forEach { n ->
        if (n == target) return@forEach  // ラムダから抜ける（次要素へ）
        println(n)
    }
}

outer@ for (i in 1..3) {
    for (j in 1..3) {
        if (j == 2) break@outer  // 外側 for を break
    }
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
          id: 's3-default-named',
          name: 'デフォルト引数・名前付き引数',
          level: 'basic',
          keywords: 'default 引数 named argument デフォルト値 オーバーロード',
          desc: '引数にデフォルト値を設定でき、Java のようなオーバーロードを減らせる。呼び出し時は引数名を指定して渡せる（順序不問）。',
          code: [
            {
              lang: 'Kotlin',
              code: `fun greet(name: String, greeting: String = "Hello") =
    "\${greeting}, \${name}!"

println(greet("Alice"))                          // Hello, Alice!
println(greet("Bob", "Hi"))                      // Hi, Bob!
println(greet(greeting = "Hey", name = "Carol")) // Hey, Carol!`,
            },
          ],
        },
        {
          id: 's3-single-expr',
          name: '単一式関数',
          level: 'basic',
          keywords: '単一式関数 expression body = fun 型推論',
          desc: '関数本体が一つの式の場合、`= 式` の形で書ける。戻り値型も推論される。',
          code: [
            {
              lang: 'Kotlin',
              code: `fun double(x: Int): Int = x * 2

fun max(a: Int, b: Int) = if (a > b) a else b  // 戻り値型を推論

fun isEven(n: Int) = n % 2 == 0`,
            },
          ],
        },
        {
          id: 's3-infix',
          name: 'infix 関数',
          level: 'basic',
          keywords: 'infix 中置記法 to pair',
          desc: '`infix` を付けた単一引数のメンバー関数または拡張関数は、中置記法（スペース区切り）で呼べる。`mapOf` の `to` などが好例。',
          code: [
            {
              lang: 'Kotlin',
              code: `infix fun Int.pow(exp: Int): Int =
    Math.pow(toDouble(), exp.toDouble()).toInt()

val result = 2 pow 10   // 1024（2.pow(10) と同等）

// 標準ライブラリの infix 例
val pair = "key" to "value"  // Pair<String, String>`,
            },
          ],
        },
        {
          id: 's3-tailrec',
          name: 'tailrec 関数',
          level: 'basic',
          keywords: 'tailrec 末尾再帰 再帰 スタックオーバーフロー 最適化',
          desc: '`tailrec` を付けると末尾再帰をループに最適化してくれる。スタックオーバーフローを防ぎつつ再帰的な記述ができる。',
          code: [
            {
              lang: 'Kotlin',
              code: `tailrec fun factorial(n: Long, acc: Long = 1): Long =
    if (n <= 1) acc else factorial(n - 1, acc * n)

println(factorial(100_000))  // スタックオーバーフローなし`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s4: クラスとオブジェクト
    // ─────────────────────────────────────────────
    {
      id: 's4',
      num: 4,
      title: 'クラスとオブジェクト',
      level: 'basic',
      items: [
        {
          id: 's4-data-class',
          name: 'data class',
          level: 'basic',
          keywords: 'data class equals hashCode copy componentN 構造分解',
          desc: '`data class` は `equals`・`hashCode`・`toString`・`copy`・`componentN` を自動生成。イミュータブルな値オブジェクトに最適。',
          code: [
            {
              lang: 'Kotlin',
              code: `data class Point(val x: Int, val y: Int)

val p1 = Point(1, 2)
val p2 = p1.copy(y = 3)  // Point(1, 3)
println(p1 == p2)         // false（値比較）

val (x, y) = p1           // 構造分解宣言`,
            },
          ],
        },
        {
          id: 's4-object',
          name: 'object と companion object',
          level: 'basic',
          keywords: 'object singleton companion object static シングルトン',
          desc: '`object` 宣言でシングルトンを作成。`companion object` はクラス内に定義し、Java の static メンバーに相当する。',
          code: [
            {
              lang: 'Kotlin',
              code: `object AppConfig {
    val version = "1.0"
    fun reset() { /* ... */ }
}

class MyClass {
    companion object {
        const val TAG = "MyClass"
        fun create() = MyClass()
    }
}

AppConfig.version
MyClass.TAG
MyClass.create()`,
            },
          ],
        },
        {
          id: 's4-sealed-class',
          name: 'sealed class',
          level: 'basic',
          keywords: 'sealed class 代数的データ型 when exhaustive 網羅',
          desc: '`sealed class` はサブクラスを同一ファイル（または同一パッケージ）に限定する。`when` と組み合わせると網羅チェックが効いて安全な分岐が書ける。',
          code: [
            {
              lang: 'Kotlin',
              code: `sealed class Result<out T> {
    data class Success<T>(val data: T)       : Result<T>()
    data class Failure(val error: Throwable) : Result<Nothing>()
    object Loading                           : Result<Nothing>()
}

fun handle(r: Result<String>) = when (r) {
    is Result.Success -> println(r.data)
    is Result.Failure -> println(r.error)
    Result.Loading    -> println("loading...")
    // else 不要（網羅済み）
}`,
            },
          ],
        },
        {
          id: 's4-constructors',
          name: 'コンストラクタ（primary / secondary）',
          level: 'basic',
          keywords: 'primary constructor secondary init ブロック コンストラクタ',
          desc: 'クラスヘッダーに書く primary コンストラクタと、本体内に定義する secondary コンストラクタがある。`init` ブロックで初期化ロジックを記述できる。',
          code: [
            {
              lang: 'Kotlin',
              code: `class Person(val name: String, var age: Int) {  // primary
    init {
        require(age >= 0) { "age must be >= 0" }
    }
    constructor(name: String) : this(name, 0)   // secondary
}`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s5: 拡張関数・プロパティ
    // ─────────────────────────────────────────────
    {
      id: 's5',
      num: 5,
      title: '拡張関数・プロパティ',
      level: 'basic',
      items: [
        {
          id: 's5-ext-fun',
          name: '拡張関数',
          level: 'basic',
          keywords: '拡張関数 extension function receiver this',
          desc: '既存クラスのソースを変更せずにメソッドを追加できる。`receiver型.関数名` で定義し、`this` でレシーバーを参照する。',
          code: [
            {
              lang: 'Kotlin',
              code: `fun String.isPalindrome(): Boolean = this == this.reversed()

println("racecar".isPalindrome())  // true
println("kotlin".isPalindrome())   // false

fun Int.isEven() = this % 2 == 0
println(4.isEven())  // true`,
            },
          ],
        },
        {
          id: 's5-ext-prop',
          name: '拡張プロパティ',
          level: 'basic',
          keywords: '拡張プロパティ extension property getter setter',
          desc: '既存クラスにプロパティを追加できる。バッキングフィールドを持てないため `get()` と必要なら `set()` を実装する。',
          code: [
            {
              lang: 'Kotlin',
              code: `val String.wordCount: Int
    get() = trim().split("\\s+".toRegex()).size

println("hello world foo".wordCount)  // 3`,
            },
          ],
        },
        {
          id: 's5-scope-functions',
          name: 'スコープ関数',
          level: 'basic',
          keywords: 'let run apply also with scope function スコープ関数',
          desc: '`let`・`run`・`apply`・`also`・`with` はラムダをレシーバーや引数として渡す高階関数。オブジェクトの設定・変換・null チェックを簡潔に書ける。',
          code: [
            {
              lang: 'Kotlin',
              code: `// let: null チェック＋変換（it でアクセス、返り値=ラムダ結果）
val len = str?.let { it.length }

// apply: レシーバー返却、初期化に便利（this でアクセス）
val sb = StringBuilder().apply {
    append("Hello")
    append(", World")
}

// also: 副作用（ログ等）、オブジェクト自体を返す
val nums = mutableListOf(1, 2, 3).also { println("list: \$it") }

// run: 結果を返す（this でアクセス）
val result = "  kotlin  ".run { trim().uppercase() }

// with: 拡張関数ではない（引数でオブジェクトを渡す）
val s = with(StringBuilder()) { append("a"); append("b"); toString() }`,
            },
          ],
        },
        {
          id: 's5-ext-limit',
          name: '拡張関数の制限',
          level: 'basic',
          keywords: '拡張関数 限界 override 仮想 dispatch 静的',
          desc: '拡張関数はコンパイル時に静的ディスパッチされる。サブクラスで override はできず、メンバー関数と同名の場合はメンバー関数が優先される。',
          code: [
            {
              lang: 'Kotlin',
              code: `open class Animal
class Dog : Animal()

fun Animal.speak() = "..."
fun Dog.speak() = "Woof"

val d: Animal = Dog()
println(d.speak())  // "..."（静的ディスパッチ：宣言型 Animal で解決）`,
            },
          ],
          warn: '拡張関数はポリモーフィズムを持たない。動的ディスパッチが必要な場合はメンバー関数を使うこと。',
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s6: インターフェース・継承
    // ─────────────────────────────────────────────
    {
      id: 's6',
      num: 6,
      title: 'インターフェース・継承',
      level: 'basic',
      items: [
        {
          id: 's6-interface',
          name: 'interface',
          level: 'basic',
          keywords: 'interface default 実装 多重実装 プロパティ',
          desc: 'Kotlin の `interface` はデフォルト実装（メソッド本体）を持てる。プロパティも宣言でき、実装クラスで override する。',
          code: [
            {
              lang: 'Kotlin',
              code: `interface Greeter {
    val greeting: String
    fun greet(name: String) = "\${greeting}, \${name}!"  // デフォルト実装
}

class FormalGreeter : Greeter {
    override val greeting = "Good day"
}

println(FormalGreeter().greet("Alice"))  // Good day, Alice!`,
            },
          ],
        },
        {
          id: 's6-open-override',
          name: 'open クラスと override',
          level: 'basic',
          keywords: 'open override 継承 final クラス',
          desc: 'Kotlin のクラスはデフォルト `final`。継承を許可するには `open` を付ける。メソッドも同様に `open` が必要。`override` したメンバーも暗黙的に `open` になる。',
          code: [
            {
              lang: 'Kotlin',
              code: `open class Shape {
    open fun area(): Double = 0.0
}

class Circle(val radius: Double) : Shape() {
    override fun area() = Math.PI * radius * radius
}

// さらに継承させたくない場合
// final override fun area() = ...`,
            },
          ],
        },
        {
          id: 's6-abstract',
          name: 'abstract クラス',
          level: 'basic',
          keywords: 'abstract 抽象クラス 抽象メソッド',
          desc: '`abstract` クラスはインスタンス化不可。抽象メンバーは実装クラスで必ず override する。インターフェースと異なりフィールドを持てる。',
          code: [
            {
              lang: 'Kotlin',
              code: `abstract class Animal(val name: String) {
    abstract fun sound(): String
    fun describe() = "\${name} says \${sound()}"
}

class Cat(name: String) : Animal(name) {
    override fun sound() = "Meow"
}

println(Cat("Whiskers").describe())  // Whiskers says Meow`,
            },
          ],
        },
        {
          id: 's6-delegation',
          name: '委譲（by キーワード）',
          level: 'basic',
          keywords: 'by 委譲 delegation interface 実装委譲 コンポジション',
          desc: '`by` キーワードでインターフェース実装を別のオブジェクトに委譲できる。コンポジションをボイラープレートなしに記述できる。',
          code: [
            {
              lang: 'Kotlin',
              code: `interface Logger {
    fun log(msg: String)
}

class ConsoleLogger : Logger {
    override fun log(msg: String) = println("[LOG] \${msg}")
}

class Service(logger: Logger) : Logger by logger {
    fun run() { log("service started") }
}

Service(ConsoleLogger()).run()  // [LOG] service started`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s7: ジェネリクス
    // ─────────────────────────────────────────────
    {
      id: 's7',
      num: 7,
      title: 'ジェネリクス',
      level: 'basic',
      items: [
        {
          id: 's7-type-params',
          name: '型パラメータと制約',
          level: 'basic',
          keywords: 'generic 型パラメータ where 制約 upper bound Comparable',
          desc: '`<T : 上限型>` で型パラメータに上限制約を設ける。複数制約は `where` 節で記述する。',
          code: [
            {
              lang: 'Kotlin',
              code: `fun <T : Comparable<T>> max(a: T, b: T): T = if (a > b) a else b

// 複数制約
fun <T> process(item: T) where T : Serializable, T : Comparable<T> {
    // ...
}

println(max(3, 7))             // 7
println(max("apple", "banana")) // banana`,
            },
          ],
        },
        {
          id: 's7-reified',
          name: 'reified 型パラメータ',
          level: 'basic',
          keywords: 'reified inline 型消去 is instanceof T::class',
          desc: '`inline fun` の型パラメータに `reified` を付けると、実行時に型情報を保持できる。`is T` チェックや `T::class` が使えるようになる。',
          code: [
            {
              lang: 'Kotlin',
              code: `inline fun <reified T> filterByType(list: List<Any>): List<T> =
    list.filterIsInstance<T>()

inline fun <reified T> Any.isType() = this is T

val mixed = listOf(1, "a", 2, "b")
println(filterByType<String>(mixed))  // [a, b]
println(42.isType<Int>())             // true`,
            },
          ],
        },
        {
          id: 's7-variance',
          name: '変性（out / in）',
          level: 'basic',
          keywords: 'out in 共変 反変 variance covariant contravariant 宣言サイト',
          desc: 'Kotlin は宣言サイト変性をサポート。`out T`（共変）は読み取り専用、`in T`（反変）は書き込み専用を表す。',
          code: [
            {
              lang: 'Kotlin',
              code: `// out: covariant — Producer<Dog> は Producer<Animal> として使える
interface Producer<out T> { fun produce(): T }

// in: contravariant — Consumer<Animal> は Consumer<Dog> として使える
interface Consumer<in T> { fun consume(item: T) }

// 使用サイト変性（プロジェクション）
fun copy(from: Array<out Any>, to: Array<Any>) {
    from.forEachIndexed { i, v -> to[i] = v }
}`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s8: ラムダ・高階関数
    // ─────────────────────────────────────────────
    {
      id: 's8',
      num: 8,
      title: 'ラムダ・高階関数',
      level: 'basic',
      items: [
        {
          id: 's8-lambda',
          name: 'ラムダ式とクロージャ',
          level: 'basic',
          keywords: 'lambda ラムダ クロージャ closure 関数型 trailing lambda',
          desc: 'ラムダは `{ 引数 -> 本体 }` で記述。外側スコープの変数をキャプチャ（クロージャ）できる。最後の引数がラムダなら括弧の外に出せる（trailing lambda）。',
          code: [
            {
              lang: 'Kotlin',
              code: `val square: (Int) -> Int = { x -> x * x }
println(square(5))  // 25

// trailing lambda
listOf(1, 2, 3).forEach { println(it) }

// クロージャ
var counter = 0
val increment = { counter++ }
increment(); increment()
println(counter)  // 2`,
            },
          ],
        },
        {
          id: 's8-higher-order',
          name: '高階関数',
          level: 'basic',
          keywords: 'filter map reduce fold 高階関数 higher-order',
          desc: '関数を引数や戻り値として扱う高階関数。`filter`・`map`・`reduce`・`fold` などが標準ライブラリに豊富に揃っている。',
          code: [
            {
              lang: 'Kotlin',
              code: `val nums = listOf(1, 2, 3, 4, 5)
val evens   = nums.filter { it % 2 == 0 }       // [2, 4]
val doubled = nums.map { it * 2 }               // [2, 4, 6, 8, 10]
val sum     = nums.reduce { acc, v -> acc + v } // 15
val product = nums.fold(1) { acc, v -> acc * v } // 120`,
            },
          ],
        },
        {
          id: 's8-it',
          name: 'it 省略形',
          level: 'basic',
          keywords: 'it 暗黙引数 implicit parameter',
          desc: '引数が一つのラムダは `it` で参照できる。ネストする場合は名前をつけて明示した方が読みやすい。',
          code: [
            {
              lang: 'Kotlin',
              code: `listOf("a", "bb", "ccc").filter { it.length > 1 }  // [bb, ccc]

// ネスト時は it を使わず名前をつける
listOf(listOf(1, 2), listOf(3, 4)).flatMap { inner ->
    inner.map { num -> num * 2 }
}`,
            },
          ],
        },
        {
          id: 's8-inline',
          name: 'inline 関数',
          level: 'basic',
          keywords: 'inline noinline crossinline ラムダ 最適化 展開',
          desc: '`inline fun` はコンパイル時にラムダを呼び出し元にインライン展開し、関数オブジェクトの生成コストを削減する。',
          code: [
            {
              lang: 'Kotlin',
              code: `inline fun measure(block: () -> Unit): Long {
    val start = System.nanoTime()
    block()
    return System.nanoTime() - start
}

val ns = measure { repeat(1_000_000) { /* work */ } }
println("\${ns}ns")  // ラムダオブジェクト生成なし`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s9: コレクション
    // ─────────────────────────────────────────────
    {
      id: 's9',
      num: 9,
      title: 'コレクション',
      level: 'basic',
      items: [
        {
          id: 's9-mutable-immutable',
          name: 'Mutable vs Immutable コレクション',
          level: 'basic',
          keywords: 'listOf mutableListOf setOf mapOf immutable mutable 読み取り専用',
          desc: 'Kotlin はコレクションを読み取り専用（`listOf`）と変更可能（`mutableListOf`）に分けて扱う。インターフェースレベルで区別されている。',
          code: [
            {
              lang: 'Kotlin',
              code: `val immutable = listOf(1, 2, 3)
// immutable.add(4)  // コンパイルエラー

val mutable = mutableListOf(1, 2, 3)
mutable.add(4)

val map = mapOf("a" to 1, "b" to 2)
val mutableMap = mutableMapOf("a" to 1)
mutableMap["c"] = 3`,
            },
          ],
        },
        {
          id: 's9-sequence',
          name: 'Sequence（遅延評価）',
          level: 'basic',
          keywords: 'Sequence 遅延評価 lazy asSequence 性能 中間コレクション',
          desc: '`Sequence` は中間処理を遅延評価するため、大量データや無限列に効率的。`asSequence()` で変換できる。',
          code: [
            {
              lang: 'Kotlin',
              code: `// List: filter と map がそれぞれ全要素を処理（中間コレクション生成）
(1..1_000_000).toList().filter { it % 2 == 0 }.map { it * 2 }.take(5)

// Sequence: 要素ごとに filter→map→take を通過（中間コレクション不要）
(1..1_000_000).asSequence()
    .filter { it % 2 == 0 }
    .map { it * 2 }
    .take(5)
    .toList()  // terminal: ここで初めて実行`,
            },
          ],
        },
        {
          id: 's9-group-associate',
          name: 'groupBy・associate・partition・zip',
          level: 'basic',
          keywords: 'groupBy associate partition zip コレクション変換',
          desc: 'コレクションをグループ化・マップ変換・分割・結合する標準関数。',
          code: [
            {
              lang: 'Kotlin',
              code: `val words = listOf("apple", "banana", "apricot", "blueberry")

val byFirst = words.groupBy { it[0] }
// {a=[apple, apricot], b=[banana, blueberry]}

val lengths = words.associate { it to it.length }
// {apple=5, banana=6, ...}

val (aWords, bWords) = words.partition { it.startsWith("a") }

val zipped = listOf(1, 2, 3).zip(listOf("a", "b", "c"))
// [(1, a), (2, b), (3, c)]`,
            },
          ],
        },
        {
          id: 's9-destructuring',
          name: '破壊的宣言（構造分解）',
          level: 'basic',
          keywords: 'destructuring 構造分解 componentN Pair Map',
          desc: '`data class` や `Pair`・`Map.Entry` は `componentN()` 関数により変数の構造分解ができる。',
          code: [
            {
              lang: 'Kotlin',
              code: `val (x, y) = Pair(10, 20)
println("\${x}, \${y}")  // 10, 20

data class Color(val r: Int, val g: Int, val b: Int)
val (r, g, b) = Color(255, 128, 0)

// Map エントリーを分解
for ((key, value) in mapOf("a" to 1, "b" to 2)) {
    println("\${key}=\${value}")
}`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s10: 標準ライブラリ・文字列
    // ─────────────────────────────────────────────
    {
      id: 's10',
      num: 10,
      title: '標準ライブラリ・文字列',
      level: 'basic',
      items: [
        {
          id: 's10-string-template',
          name: '文字列テンプレート',
          level: 'basic',
          keywords: '文字列テンプレート interpolation ${} 補間',
          desc: 'バックティック文字列ではなく通常の文字列内で `\${式}` を使って値を埋め込める。単純な変数は `\$変数名` でも書ける。',
          code: [
            {
              lang: 'Kotlin',
              code: `val name = "Kotlin"
val version = 2
println("Hello, \${name} \${version}!")   // Hello, Kotlin 2!
println("Length: \${name.length}")        // Length: 6
println("Is \$name great? \${true}")      // Is Kotlin great? true`,
            },
          ],
        },
        {
          id: 's10-raw-string',
          name: 'raw 文字列',
          level: 'basic',
          keywords: 'raw string triple quote """ trimIndent trimMargin エスケープ不要',
          desc: '`"""..."""` で raw 文字列（エスケープ不要）を書ける。`trimIndent()` や `trimMargin()` で共通インデントを除去できる。',
          code: [
            {
              lang: 'Kotlin',
              code: `val json = """
    {
        "name": "Kotlin",
        "version": 2
    }
""".trimIndent()

val text = """
    |Line 1
    |Line 2
""".trimMargin()  // | をマージンプレフィックスとして除去`,
            },
          ],
        },
        {
          id: 's10-buildstring',
          name: 'buildString と StringBuilder',
          level: 'basic',
          keywords: 'buildString StringBuilder append appendLine 文字列構築',
          desc: '`buildString { }` は `StringBuilder` を用いた文字列構築の DSL。可読性が高く、`+` による文字列連結より効率的。',
          code: [
            {
              lang: 'Kotlin',
              code: `val result = buildString {
    append("Hello")
    append(", ")
    append("World")
    appendLine("!")
    repeat(3) { append("*") }
}
println(result)
// Hello, World!
// ***`,
            },
          ],
        },
        {
          id: 's10-string-ops',
          name: '便利な文字列操作',
          level: 'basic',
          keywords: 'split replace padStart padEnd substringBefore contains repeat trim',
          desc: 'Kotlin は文字列を操作する拡張関数を豊富に提供している。',
          code: [
            {
              lang: 'Kotlin',
              code: `val s = "  Hello, Kotlin!  "
println(s.trim())                         // "Hello, Kotlin!"
println(s.trim().lowercase())             // "hello, kotlin!"
println("abc".padStart(5, '0'))           // "00abc"
println("a,b,c".split(","))               // [a, b, c]
println("Hello".repeat(3))               // HelloHelloHello
println("kotlin".substringBefore("lin")) // "kot"`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s11: ファイル・IO
    // ─────────────────────────────────────────────
    {
      id: 's11',
      num: 11,
      title: 'ファイル・IO',
      level: 'basic',
      items: [
        {
          id: 's11-file-read-write',
          name: 'File.readText / writeText / forEachLine',
          level: 'basic',
          keywords: 'File readText writeText forEachLine readLines kotlin.io',
          desc: '`java.io.File` に対する Kotlin 拡張関数で手軽にファイル I/O ができる。',
          code: [
            {
              lang: 'Kotlin',
              code: `import java.io.File

val content = File("input.txt").readText(Charsets.UTF_8)
File("output.txt").writeText("Hello, Kotlin!")
File("data.txt").forEachLine { line ->
    println(line)
}
val lines: List<String> = File("data.txt").readLines()`,
            },
          ],
        },
        {
          id: 's11-use',
          name: 'use（AutoCloseable）',
          level: 'basic',
          keywords: 'use AutoCloseable try-with-resources close リソース解放',
          desc: '`use { }` は Java の try-with-resources に相当。ブロック終了時（例外発生時も）に `close()` が自動で呼ばれる。',
          code: [
            {
              lang: 'Kotlin',
              code: `import java.io.BufferedReader
import java.io.FileReader

BufferedReader(FileReader("input.txt")).use { reader ->
    reader.lineSequence().forEach { println(it) }
}  // ここで reader.close() が自動呼び出し`,
            },
          ],
        },
        {
          id: 's11-kotlin-io',
          name: 'kotlin.io 拡張関数',
          level: 'basic',
          keywords: 'copyTo walk deleteRecursively createTempFile kotlin.io',
          desc: '`kotlin.io` パッケージはファイル操作の拡張関数を多数提供する。',
          code: [
            {
              lang: 'Kotlin',
              code: `import java.io.File

// ファイルコピー
File("src.txt").copyTo(File("dst.txt"), overwrite = true)

// ディレクトリ再帰削除
File("tmp_dir").deleteRecursively()

// ディレクトリウォーク
File("src").walk()
    .filter { it.extension == "kt" }
    .forEach { println(it.path) }`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s12: 型システム・キャスト
    // ─────────────────────────────────────────────
    {
      id: 's12',
      num: 12,
      title: '型システム・キャスト',
      level: 'basic',
      items: [
        {
          id: 's12-cast',
          name: 'as と as?（キャスト）',
          level: 'basic',
          keywords: 'as as? unsafe safe cast ClassCastException キャスト',
          desc: '`as` は unsafe キャスト（失敗で `ClassCastException`）、`as?` は safe キャスト（失敗で `null`）。',
          code: [
            {
              lang: 'Kotlin',
              code: `val obj: Any = "Hello"
val s1: String  = obj as String          // OK
val n1: Int?    = obj as? Int            // null（ClassCastException なし）
val s2: String  = (obj as? String) ?: "fallback"`,
            },
          ],
        },
        {
          id: 's12-any-nothing-unit',
          name: 'Any・Nothing・Unit',
          level: 'basic',
          keywords: 'Any Nothing Unit トップ型 ボトム型 void',
          desc: '`Any` はすべての型のスーパー型（Java の `Object`）。`Unit` は値を返さない関数の戻り値型（Java の `void`）。`Nothing` は「決して値を返さない」を表す（例外を投げる関数など）。',
          code: [
            {
              lang: 'Kotlin',
              code: `fun log(msg: Any) = println(msg)   // Any は何でも受け取れる

fun fail(msg: String): Nothing =
    throw IllegalStateException(msg)  // Nothing: 値が返らない

fun doWork(): Unit {                  // Unit = void、省略可
    println("working")
    // return Unit は暗黙
}`,
            },
          ],
        },
        {
          id: 's12-typealias',
          name: 'typealias',
          level: 'basic',
          keywords: 'typealias 型エイリアス 別名 関数型',
          desc: '`typealias` で既存の型に別名を付けられる。複雑な関数型やジェネリクスを簡潔に表現するのに便利。',
          code: [
            {
              lang: 'Kotlin',
              code: `typealias StringList   = List<String>
typealias ClickHandler = (x: Int, y: Int) -> Unit

fun processNames(names: StringList) { /* ... */ }
val onClick: ClickHandler = { x, y -> println("clicked \$x, \$y") }`,
            },
          ],
        },
        {
          id: 's12-value-class',
          name: 'value class（inline class）',
          level: 'basic',
          keywords: 'value class inline class JvmInline ボクシング 型安全ラッパー',
          desc: '`@JvmInline value class` は単一プロパティをラップするが、JVM ではボクシングを排除して効率的に動作する。型安全なラッパーに使う。',
          code: [
            {
              lang: 'Kotlin',
              code: `@JvmInline
value class UserId(val id: Long)

@JvmInline
value class Email(val address: String)

fun sendEmail(to: Email, from: Email) { /* ... */ }

// コンパイル後は Long として展開され、オブジェクト生成なし
sendEmail(Email("a@example.com"), Email("b@example.com"))`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s13: コルーチン基礎
    // ─────────────────────────────────────────────
    {
      id: 's13',
      num: 13,
      title: 'コルーチン基礎',
      level: 'advanced',
      items: [
        {
          id: 's13-suspend',
          name: 'suspend 関数',
          level: 'advanced',
          keywords: 'suspend 中断 非同期 coroutine delay runBlocking',
          desc: '`suspend` 関数はコルーチン内でのみ呼び出せる中断可能な関数。スレッドをブロックせず、他のコルーチンに処理を譲れる。',
          code: [
            {
              lang: 'Kotlin',
              code: `import kotlinx.coroutines.*

suspend fun fetchData(): String {
    delay(1000)        // スレッドをブロックせず 1 秒待機
    return "data"
}

fun main() = runBlocking {
    val result = fetchData()
    println(result)    // data
}`,
            },
          ],
        },
        {
          id: 's13-launch-async',
          name: 'launch と async / await',
          level: 'advanced',
          keywords: 'launch async await Deferred CoroutineScope Job',
          desc: '`launch` は結果を返さない（`Job`）、`async` は結果を返す（`Deferred<T>`）コルーチンビルダー。`await()` で結果を取得する。',
          code: [
            {
              lang: 'Kotlin',
              code: `import kotlinx.coroutines.*

fun main() = runBlocking {
    // launch: fire-and-forget
    val job = launch {
        delay(500)
        println("launched!")
    }

    // async: 結果を返す
    val deferred = async {
        delay(300)
        42
    }

    println("result: \${deferred.await()}")  // result: 42
    job.join()
}`,
            },
          ],
        },
        {
          id: 's13-dispatchers',
          name: 'Dispatchers',
          level: 'advanced',
          keywords: 'Dispatchers IO Default Main Unconfined スレッドプール withContext',
          desc: 'Dispatchers はコルーチンが実行されるスレッドプールを指定する。`IO`（I/O 処理）・`Default`（CPU 集中）・`Main`（UI スレッド）などがある。',
          code: [
            {
              lang: 'Kotlin',
              code: `import kotlinx.coroutines.*
import java.io.File

fun main() = runBlocking {
    launch(Dispatchers.IO) {
        val data = File("large.txt").readText()  // I/O スレッドで実行
        withContext(Dispatchers.Default) {
            // CPU 負荷処理（計算用スレッドプール）
            processData(data)
        }
    }
}`,
            },
          ],
        },
        {
          id: 's13-structured-concurrency',
          name: '構造化並行処理',
          level: 'advanced',
          keywords: '構造化並行処理 structured concurrency scope cancel Job leak',
          desc: 'コルーチンは親スコープの生存期間に縛られる。親がキャンセルされると子もキャンセルされる。これによりリークのない並行処理が書ける。',
          code: [
            {
              lang: 'Kotlin',
              code: `import kotlinx.coroutines.*

fun main() = runBlocking {
    val scope = CoroutineScope(Dispatchers.Default)
    val job = scope.launch {
        repeat(10) { i ->
            delay(100)
            println("tick \${i}")
        }
    }
    delay(350)
    scope.cancel()    // scope 内のすべてのコルーチンをキャンセル
    println("cancelled")
}`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s14: Flow
    // ─────────────────────────────────────────────
    {
      id: 's14',
      num: 14,
      title: 'Flow',
      level: 'advanced',
      items: [
        {
          id: 's14-flow-basics',
          name: 'Flow<T> の基本',
          level: 'advanced',
          keywords: 'Flow emit collect 非同期ストリーム flow builder',
          desc: '`Flow<T>` は非同期で複数の値を順次生成するコールドストリーム。`flow { }` ビルダーで定義し、`collect { }` で受け取る。',
          code: [
            {
              lang: 'Kotlin',
              code: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun numberFlow(): Flow<Int> = flow {
    for (i in 1..5) {
        delay(100)
        emit(i)          // 値を下流へ流す
    }
}

fun main() = runBlocking {
    numberFlow()
        .map { it * 2 }
        .filter { it > 4 }
        .collect { value -> println(value) }  // 6 8 10
}`,
            },
          ],
        },
        {
          id: 's14-stateflow-sharedflow',
          name: 'StateFlow と SharedFlow',
          level: 'advanced',
          keywords: 'StateFlow SharedFlow hot stream 状態管理 ViewModel MutableStateFlow',
          desc: '`StateFlow` は最新値を保持するホットストリーム（Android ViewModel 状態管理に最適）。`SharedFlow` は複数コレクターへのブロードキャストに使う。',
          code: [
            {
              lang: 'Kotlin',
              code: `import kotlinx.coroutines.flow.*

// StateFlow: 常に現在値を保持
class CounterViewModel {
    private val _count = MutableStateFlow(0)
    val count: StateFlow<Int> = _count.asStateFlow()

    fun increment() { _count.value++ }
}

// SharedFlow: バッファ付きブロードキャスト
val sharedFlow = MutableSharedFlow<String>(replay = 1)`,
            },
          ],
        },
        {
          id: 's14-callback-flow',
          name: 'callbackFlow',
          level: 'advanced',
          keywords: 'callbackFlow コールバック Flow 変換 trySend awaitClose',
          desc: 'コールバックベースの API を `Flow` に変換するビルダー。`trySend` で値を送出し、`awaitClose` でクリーンアップを行う。',
          code: [
            {
              lang: 'Kotlin',
              code: `import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.*

fun locationFlow(): Flow<Location> = callbackFlow {
    val listener = LocationListener { location ->
        trySend(location)
    }
    locationManager.register(listener)
    awaitClose {
        locationManager.unregister(listener)  // コレクターが離れたら解除
    }
}`,
            },
          ],
        },
        {
          id: 's14-cold-hot',
          name: 'cold stream vs hot stream',
          level: 'advanced',
          keywords: 'cold hot stream Flow StateFlow SharedFlow 違い',
          desc: 'cold stream（`Flow`）はコレクターごとに独立して実行される。hot stream（`StateFlow`/`SharedFlow`）は独立して動作し、複数コレクターで共有される。',
          code: [
            {
              lang: 'Kotlin',
              code: `// cold: collect するたびに flow ブロックが再実行
val cold: Flow<Int> = flow { emit(Random.nextInt()) }
cold.collect { println(it) }  // 毎回異なる値

// hot: StateFlow は共有された最新値を保持
val hot = MutableStateFlow(0)
// 複数コレクターが同じ値 (0) を受け取る`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s15: DSL・演算子オーバーロード
    // ─────────────────────────────────────────────
    {
      id: 's15',
      num: 15,
      title: 'DSL・演算子オーバーロード',
      level: 'advanced',
      items: [
        {
          id: 's15-operator',
          name: '演算子オーバーロード',
          level: 'advanced',
          keywords: 'operator fun オーバーロード plus minus times get set unaryMinus',
          desc: '`operator` 修飾子を付けた関数で演算子をオーバーロードできる。`+`→`plus`、`-`→`minus`、`[]`→`get`/`set` などが対応している。',
          code: [
            {
              lang: 'Kotlin',
              code: `data class Vector(val x: Double, val y: Double) {
    operator fun plus(other: Vector)  = Vector(x + other.x, y + other.y)
    operator fun times(scale: Double) = Vector(x * scale, y * scale)
    operator fun unaryMinus()         = Vector(-x, -y)
}

val v1 = Vector(1.0, 2.0)
val v2 = Vector(3.0, 4.0)
println(v1 + v2)   // Vector(4.0, 6.0)
println(v1 * 2.0)  // Vector(2.0, 4.0)`,
            },
          ],
        },
        {
          id: 's15-dsl-marker',
          name: '型安全 DSL（@DslMarker）',
          level: 'advanced',
          keywords: 'DslMarker DSL 型安全 ビルダー アノテーション HTML',
          desc: '`@DslMarker` アノテーションを使うとネストした DSL スコープで誤った外側スコープの呼び出しをコンパイルエラーにできる。',
          code: [
            {
              lang: 'Kotlin',
              code: `@DslMarker annotation class HtmlDsl

@HtmlDsl class Div {
    private val children = mutableListOf<String>()
    fun p(text: String) { children.add("<p>\${text}</p>") }
    fun build() = "<div>\${children.joinToString("")}</div>"
}

fun div(init: Div.() -> Unit): String = Div().apply(init).build()

val html = div {
    p("Hello")
    p("Kotlin DSL")
}
println(html)  // <div><p>Hello</p><p>Kotlin DSL</p></div>`,
            },
          ],
        },
        {
          id: 's15-build-collection',
          name: 'buildList / buildMap',
          level: 'advanced',
          keywords: 'buildList buildMap buildSet コレクション DSL ビルダー',
          desc: '`buildList { }`・`buildMap { }` はコレクションを DSL スタイルで構築するビルダー。内部は `MutableList`/`MutableMap` を使い、完了後にイミュータブルで返す。',
          code: [
            {
              lang: 'Kotlin',
              code: `val primes = buildList {
    add(2)
    addAll(listOf(3, 5, 7))
    if (true) add(11)
}  // List<Int>: [2, 3, 5, 7, 11]

val config = buildMap<String, Any> {
    put("host", "localhost")
    put("port", 8080)
    putAll(mapOf("debug" to true))
}`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s16: Kotlin Multiplatform・モジュール
    // ─────────────────────────────────────────────
    {
      id: 's16',
      num: 16,
      title: 'Kotlin Multiplatform・モジュール',
      level: 'advanced',
      items: [
        {
          id: 's16-kmp',
          name: 'expect / actual（KMP）',
          level: 'advanced',
          keywords: 'expect actual KMP Kotlin Multiplatform 共通コード プラットフォーム',
          desc: '`expect` で共通モジュールに API 宣言、`actual` でプラットフォーム固有の実装を提供する KMP の仕組み。',
          code: [
            {
              lang: 'Kotlin',
              code: `// commonMain
expect fun platformName(): String

// jvmMain
actual fun platformName(): String =
    "JVM \${System.getProperty("java.version")}"

// jsMain
actual fun platformName(): String =
    "Browser: \${js("navigator.userAgent")}"`,
            },
          ],
        },
        {
          id: 's16-jvm-annotations',
          name: '@JvmStatic / @JvmOverloads / @JvmField',
          level: 'advanced',
          keywords: 'JvmStatic JvmOverloads JvmField Java 相互運用 interop',
          desc: 'Java から Kotlin コードを自然に呼び出せるようにするアノテーション群。',
          code: [
            {
              lang: 'Kotlin',
              code: `class Config {
    companion object {
        @JvmStatic
        fun create() = Config()           // Java: Config.create()

        @JvmField
        val DEFAULT_TIMEOUT = 30_000      // Java: Config.DEFAULT_TIMEOUT（getter なし）
    }

    @JvmOverloads
    fun connect(host: String, port: Int = 8080, ssl: Boolean = false) { /* ... */ }
    // Java 側に connect(host), connect(host,port), connect(host,port,ssl) が生成される
}`,
            },
          ],
        },
        {
          id: 's16-serializable',
          name: '@Serializable（kotlinx.serialization）',
          level: 'advanced',
          keywords: 'Serializable kotlinx.serialization JSON encode decode シリアライズ',
          desc: '`@Serializable` アノテーションで JSON・CBOR などのシリアライズ/デシリアライズを自動生成。`kotlinx.serialization` ライブラリが必要。',
          code: [
            {
              lang: 'Kotlin',
              code: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
data class User(val name: String, val age: Int)

val user    = User("Alice", 30)
val json    = Json.encodeToString(user)          // {"name":"Alice","age":30}
val decoded = Json.decodeFromString<User>(json)
println(decoded.name)  // Alice`,
            },
          ],
        },
        {
          id: 's16-ksp',
          name: 'Kotlin Symbol Processing (KSP)',
          level: 'advanced',
          keywords: 'KSP Symbol Processing アノテーションプロセッサ コード生成 kapt',
          desc: 'KSP はコンパイル時にアノテーションを処理しコードを生成するフレームワーク。kapt より高速で Kotlin を直接サポートしている。',
          code: [
            {
              lang: 'Kotlin',
              code: `// build.gradle.kts（KSP の設定例）
plugins {
    id("com.google.devtools.ksp") version "2.0.0-1.0.21"
}

dependencies {
    ksp("com.example:my-processor:1.0.0")  // KSP プロセッサを追加
}

// 対象コード（プロセッサがアノテーションを処理してコードを生成）
@MyAnnotation
class Repository { /* ... */ }`,
            },
          ],
        },
      ],
    },
  ],
};

export default data;
