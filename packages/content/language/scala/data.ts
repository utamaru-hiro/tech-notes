import type { LanguageGuide } from '../../types';

const data: LanguageGuide = {
  lang: 'Scala',
  langSlug: 'scala',
  version: 'Scala 3.x',
  lead: `他言語の経験者が 2〜3 時間でざっと読み通せるリファレンスです。関数型×OOP・型システム・並行処理など Scala 固有の概念を重点的に解説します。`,
  accent: '#8b1a1a',
  accent2: '#ffe0e0',
  bgGradientTop: '#fff0f0',
  bgRadialLeft: 'rgba(139,26,26,0.10)',
  bgRadialRight: 'rgba(180,60,60,0.07)',
  badgeGradient: 'linear-gradient(135deg, #5c0000, #8b1a1a)',
  heroEmoji: '⚡',
  navGroups: [
    { label: '基礎', sections: ['s1','s2','s3','s4','s5','s6'] },
    { label: '型システム', sections: ['s7','s8','s9'] },
    { label: '関数型', sections: ['s10','s11'] },
    { label: '実用', sections: ['s12','s13','s14'] },
    { label: '応用', sections: ['s15','s16'] },
  ],
  sections: [
    {
      id: 's1', num: 1, title: '変数・型・リテラル', level: 'basic',
      items: [
        {
          id: 's1-val-var', name: 'val と var', level: 'basic',
          keywords: 'val var 不変 可変 型推論',
          desc: '`val` はイミュータブル（再代入不可）、`var` はミュータブル（再代入可）。Scala では `val` を優先し、副作用を最小化するスタイルを推奨する。',
          code: [{ lang: 'Scala', code: `val x: Int = 42       // 明示的型宣言
val y = "hello"       // 型推論 → String
var count = 0
count += 1            // OK
// x = 99             // コンパイルエラー` }],
        },
        {
          id: 's1-types', name: '基本型', level: 'basic',
          keywords: 'Int Double Boolean String Unit Any Nothing',
          desc: 'Scala の型はすべてオブジェクト。`Any` が最上位で `AnyVal`（値型）と `AnyRef`（参照型）に分かれる。`Nothing` はすべての型のサブタイプで、例外を返す式の型に使われる。',
          code: [{ lang: 'Scala', code: `val i: Int     = 42
val d: Double  = 3.14
val b: Boolean = true
val s: String  = "Scala"
val u: Unit    = ()      // void 相当
val n: Nothing = throw new Exception("!")` }],
        },
        {
          id: 's1-inference', name: '型推論', level: 'basic',
          keywords: '型推論 type inference',
          desc: 'Scala の型推論はローカル変数だけでなくメソッドの戻り値や高階関数の引数にも働く。ただし `public` なメソッドでは可読性のため明示的型宣言を推奨。',
          code: [{ lang: 'Scala', code: `val list = List(1, 2, 3)   // List[Int]
val map  = Map("a" -> 1)   // Map[String, Int]
def double(n: Int) = n * 2 // 戻り値型: Int（推論）` }],
        },
        {
          id: 's1-tuples', name: 'タプル', level: 'basic',
          keywords: 'Tuple _1 _2 (a, b)',
          desc: '複数の値をまとめる軽量なデータ型。最大22要素まで。Scala 3 では `(Int, String)` のように書き、要素には `._1`・`._2` でアクセスするか分割代入を使う。',
          code: [{ lang: 'Scala', code: `val t = (42, "hello", true)
println(t._1)          // 42
val (n, s, b) = t      // 分割代入
println(s)             // hello` }],
        },
      ],
    },
    {
      id: 's2', num: 2, title: '制御フロー', level: 'basic',
      items: [
        {
          id: 's2-if', name: 'if 式', level: 'basic',
          keywords: 'if else 式 三項演算子',
          desc: 'Scala の `if` は文ではなく式であり、値を返す。三項演算子の代わりに `if/else` 式を使う。',
          code: [{ lang: 'Scala', code: `val max = if a > b then a else b   // Scala 3 構文
val label = if score >= 60 then "Pass" else "Fail"` }],
        },
        {
          id: 's2-match', name: 'match 式', level: 'basic',
          keywords: 'match case パターンマッチ switch',
          desc: '`match` は Scala 最強の制御フロー構文。値・型・ガード・分割代入など多様なパターンに対応する。`sealed` との組み合わせで網羅性チェックが働く。',
          code: [{ lang: 'Scala', code: `val result = x match
  case 0       => "zero"
  case n if n < 0 => s"negative: \${n}"
  case n       => s"positive: \${n}"` }],
        },
        {
          id: 's2-for', name: 'for 式 / for内包表記', level: 'basic',
          keywords: 'for yield generator guard',
          desc: '`for ... yield` で新しいコレクションを生成するモナド的内包表記。`yield` がない場合は副作用のループ。`if` ガードでフィルタリング可能。',
          code: [{ lang: 'Scala', code: `val evens = for
  i <- 1 to 10
  if i % 2 == 0
yield i * i
// evens: Vector(4, 16, 36, 64, 100)` }],
        },
        {
          id: 's2-while', name: 'while / do-while', level: 'basic',
          keywords: 'while do-while ループ',
          desc: '命令型のループ。関数型スタイルでは `while` より再帰や `Iterator` を使う場面が多い。',
          code: [{ lang: 'Scala', code: `var i = 0
while i < 5 do
  println(i)
  i += 1` }],
        },
      ],
    },
    {
      id: 's3', num: 3, title: '関数とメソッド', level: 'basic',
      items: [
        {
          id: 's3-def', name: 'def によるメソッド定義', level: 'basic',
          keywords: 'def method 戻り値型 引数',
          desc: '`def` でメソッドを定義。単一式なら `=` の後に直接書ける。再帰の場合は戻り値型の明示が必要。',
          code: [{ lang: 'Scala', code: `def greet(name: String): String =
  s"Hello, \${name}!"

def factorial(n: Int): Int =
  if n <= 1 then 1 else n * factorial(n - 1)` }],
        },
        {
          id: 's3-default-named', name: 'デフォルト引数・名前付き引数', level: 'basic',
          keywords: 'default argument named argument',
          desc: 'デフォルト値を持つ引数を定義でき、呼び出し時に省略可能。名前付き引数で順序を変えて渡せる。',
          code: [{ lang: 'Scala', code: `def connect(host: String, port: Int = 8080, ssl: Boolean = false): String =
  s"\${if ssl then "https" else "http"}://\${host}:\${port}"

connect("example.com")                    // http://example.com:8080
connect("example.com", ssl = true)        // https://example.com:8080` }],
        },
        {
          id: 's3-higher-order', name: '高階関数', level: 'basic',
          keywords: '高階関数 Function1 => lambda',
          desc: '関数を引数や戻り値として扱える。`A => B` は `Function1[A, B]` の糖衣構文。',
          code: [{ lang: 'Scala', code: `def applyTwice(f: Int => Int, x: Int): Int = f(f(x))
val double: Int => Int = _ * 2
println(applyTwice(double, 3))  // 12` }],
        },
        {
          id: 's3-currying', name: 'カリー化・部分適用', level: 'basic',
          keywords: 'currying partial application multiple parameter lists',
          desc: '複数の引数リストを持つメソッドを定義し、部分適用でカリー化された関数を作れる。',
          code: [{ lang: 'Scala', code: `def add(a: Int)(b: Int): Int = a + b
val add5 = add(5)    // 部分適用 → Int => Int
println(add5(3))     // 8` }],
        },
      ],
    },
    {
      id: 's4', num: 4, title: 'コレクション', level: 'basic',
      items: [
        {
          id: 's4-list-vector', name: 'List と Vector', level: 'basic',
          keywords: 'List Vector Seq immutable',
          desc: '`List` は連結リスト（先頭追加が O(1)）。`Vector` はランダムアクセスが O(log n) の不変シーケンス。`Seq` は両方の親。',
          code: [{ lang: 'Scala', code: `val list = List(1, 2, 3)
val vec  = Vector(1, 2, 3)
val prepended = 0 :: list        // List(0,1,2,3)
val appended  = vec :+ 4         // Vector(1,2,3,4)` }],
        },
        {
          id: 's4-map-set', name: 'Map と Set', level: 'basic',
          keywords: 'Map Set HashMap immutable',
          desc: '標準のコレクションはすべて不変（`scala.collection.immutable`）。変更時は新しいオブジェクトが返る。',
          code: [{ lang: 'Scala', code: `val m = Map("a" -> 1, "b" -> 2)
val m2 = m + ("c" -> 3)   // 新しい Map
val s  = Set(1, 2, 3)
println(m.get("a"))        // Some(1)
println(m.getOrElse("x", 0)) // 0` }],
        },
        {
          id: 's4-transform', name: 'map・filter・fold', level: 'basic',
          keywords: 'map filter foldLeft reduce flatMap',
          desc: '関数型スタイルでコレクションを変換する中核メソッド群。`flatMap` はネストを一段平坦化する。',
          code: [{ lang: 'Scala', code: `val nums = List(1, 2, 3, 4, 5)
val doubled = nums.map(_ * 2)          // List(2,4,6,8,10)
val evens   = nums.filter(_ % 2 == 0) // List(2,4)
val sum     = nums.foldLeft(0)(_ + _) // 15
val flat    = List(List(1,2), List(3)).flatten // List(1,2,3)` }],
        },
        {
          id: 's4-lazy', name: 'LazyList と遅延評価', level: 'basic',
          keywords: 'LazyList Stream lazy infinite',
          desc: '`LazyList` は必要になるまで要素を評価しない遅延シーケンス。無限リストを表現できる。',
          code: [{ lang: 'Scala', code: `val nats: LazyList[Int] = LazyList.from(1)
val first5 = nats.take(5).toList   // List(1,2,3,4,5)
val fibs: LazyList[BigInt] =
  BigInt(0) #:: BigInt(1) #:: fibs.zip(fibs.tail).map(_ + _)` }],
        },
      ],
    },
    {
      id: 's5', num: 5, title: '文字列', level: 'basic',
      items: [
        {
          id: 's5-interpolation', name: '文字列補間', level: 'basic',
          keywords: 's"..." f"..." raw"..." 文字列補間',
          desc: '`s"..."` で変数/式を埋め込み、`f"..."` で printf スタイルのフォーマット、`raw"..."` でエスケープなし文字列を使う。',
          code: [{ lang: 'Scala', code: `val name = "Scala"
val ver  = 3
println(s"Hello, \${name} \${ver}!")     // Hello, Scala 3!
println(f"Pi is \${math.Pi}%.4f")       // Pi is 3.1416
val path = raw"C:\Users\hiro"          // バックスラッシュそのまま` }],
        },
        {
          id: 's5-multiline', name: 'マルチライン文字列', level: 'basic',
          keywords: 'triple quote """ multiline stripMargin',
          desc: `三重クォート \`"\"\"...\"\"\"\` でマルチライン文字列を定義。\`stripMargin\` で先頭の \`|\` を取り除ける。`,
          code: [{ lang: 'Scala', code: `val sql =
  """SELECT *
    |FROM users
    |WHERE active = true""".stripMargin` }],
        },
        {
          id: 's5-methods', name: '文字列操作', level: 'basic',
          keywords: 'split replace toInt trim contains startsWith',
          desc: 'Scala の `String` は Java の `String` と互換。Java のメソッドをそのまま呼べる他、Scala 独自の暗黙的拡張メソッドも使用できる。',
          code: [{ lang: 'Scala', code: `val s = "  Hello, World!  "
println(s.trim.toLowerCase)       // hello, world!
println(s.contains("World"))      // true
val parts = "a,b,c".split(",")    // Array[String]
println("42".toInt + 1)           // 43` }],
        },
      ],
    },
    {
      id: 's6', num: 6, title: '例外処理・Option・Either', level: 'basic',
      items: [
        {
          id: 's6-try-catch', name: 'try/catch/finally', level: 'basic',
          keywords: 'try catch finally throw exception',
          desc: 'Java 互換の例外処理。ただし Scala では `Option`・`Either`・`Try` を使った純粋関数型スタイルを推奨。',
          code: [{ lang: 'Scala', code: `try
  val n = "abc".toInt
catch
  case e: NumberFormatException => println(s"Error: \${e.getMessage}")
finally
  println("done")` }],
        },
        {
          id: 's6-option', name: 'Option[T]', level: 'basic',
          keywords: 'Option Some None getOrElse map flatMap',
          desc: '`None` または `Some(value)` を返す。null の代替として使い、`getOrElse`・`map`・`flatMap` でチェーン処理できる。',
          code: [{ lang: 'Scala', code: `val m = Map("a" -> 1)
val v: Option[Int] = m.get("a")   // Some(1)
val w = m.get("z")                // None
println(v.getOrElse(0))           // 1
val doubled = v.map(_ * 2)        // Some(2)` }],
        },
        {
          id: 's6-either', name: 'Either[L, R]', level: 'basic',
          keywords: 'Either Left Right for-comprehension',
          desc: '成功（`Right`）か失敗（`Left`）のどちらかを表す。エラーメッセージ付きで失敗を扱いたい場合に `Option` より適する。',
          code: [{ lang: 'Scala', code: `def parse(s: String): Either[String, Int] =
  s.toIntOption.toRight(s"'\${s}' is not a number")

val result = for
  a <- parse("42")
  b <- parse("8")
yield a + b
// result: Right(50)` }],
        },
        {
          id: 's6-try', name: 'Try[T]', level: 'basic',
          keywords: 'Try Success Failure scala.util',
          desc: '例外を `Success(value)` または `Failure(exception)` としてラップ。`try/catch` を関数型スタイルで扱える。',
          code: [{ lang: 'Scala', code: `import scala.util.{Try, Success, Failure}
val t = Try("123".toInt)
t match
  case Success(n) => println(s"Got \${n}")
  case Failure(e) => println(s"Error: \${e.getMessage}")` }],
        },
      ],
    },
    {
      id: 's7', num: 7, title: 'クラス・オブジェクト・case class', level: 'basic',
      items: [
        {
          id: 's7-class', name: 'class', level: 'basic',
          keywords: 'class constructor new インスタンス',
          desc: '`class` 定義でコンストラクタ引数を直接書ける。`val`/`var` を付けるとフィールドになる。',
          code: [{ lang: 'Scala', code: `class Person(val name: String, var age: Int):
  def greet(): String = s"Hi, I'm \${name}, \${age} years old."

val p = Person("Alice", 30)
println(p.greet())
p.age = 31` }],
        },
        {
          id: 's7-case-class', name: 'case class', level: 'basic',
          keywords: 'case class copy equals hashCode toString',
          desc: '`case class` は `equals`・`hashCode`・`toString`・`copy` が自動生成される不変データクラス。パターンマッチと相性が良い。',
          code: [{ lang: 'Scala', code: `case class Point(x: Double, y: Double)
val p1 = Point(1.0, 2.0)
val p2 = p1.copy(y = 5.0)   // Point(1.0, 5.0)
println(p1 == Point(1.0, 2.0)) // true（値比較）` }],
        },
        {
          id: 's7-object', name: 'object（シングルトン）', level: 'basic',
          keywords: 'object singleton companion apply',
          desc: '`object` はシングルトンインスタンス。`companion object`（同名の object）にファクトリメソッドや定数を置く慣習がある。',
          code: [{ lang: 'Scala', code: `object MathUtils:
  val Pi = 3.14159265
  def square(n: Double): Double = n * n

// companion object
class Circle(val r: Double)
object Circle:
  def apply(r: Double): Circle = new Circle(r)
val c = Circle(5.0)  // new 不要` }],
        },
        {
          id: 's7-enum', name: 'enum（Scala 3）', level: 'basic',
          keywords: 'enum sealed Scala3 ADT',
          desc: 'Scala 3 の `enum` は Java の enum より強力で、パラメータ付きの代数的データ型（ADT）を定義できる。',
          code: [{ lang: 'Scala', code: `enum Color:
  case Red, Green, Blue

enum Shape:
  case Circle(radius: Double)
  case Rectangle(width: Double, height: Double)

val s: Shape = Shape.Circle(5.0)
s match
  case Shape.Circle(r)      => println(s"circle r=\${r}")
  case Shape.Rectangle(w,h) => println(s"rect \${w}x\${h}")` }],
        },
      ],
    },
    {
      id: 's8', num: 8, title: 'トレイト・継承', level: 'basic',
      items: [
        {
          id: 's8-trait', name: 'trait', level: 'basic',
          keywords: 'trait mixin with interface abstract',
          desc: '`trait` はインターフェースと抽象クラスの中間。デフォルト実装を持てる。複数の trait を `with` でミックスイン（多重継承）できる。',
          code: [{ lang: 'Scala', code: `trait Greetable:
  def name: String
  def greet(): String = s"Hello, I'm \${name}"

trait Farewell:
  def bye(): String = "Goodbye!"

class Employee(val name: String) extends Greetable with Farewell

val e = Employee("Bob")
println(e.greet())   // Hello, I'm Bob
println(e.bye())     // Goodbye!` }],
        },
        {
          id: 's8-extends', name: '継承と override', level: 'basic',
          keywords: 'extends override super abstract',
          desc: '`extends` で継承し、`override` キーワードでメソッドをオーバーライド。`super` で親の実装を呼べる。',
          code: [{ lang: 'Scala', code: `abstract class Animal:
  def sound(): String
  def describe(): String = s"I say \${sound()}"

class Dog extends Animal:
  override def sound(): String = "Woof"
  override def describe(): String = super.describe() + "!"

println(Dog().describe())  // I say Woof!` }],
        },
        {
          id: 's8-sealed', name: 'sealed trait / sealed class', level: 'basic',
          keywords: 'sealed trait sealed class exhaustive pattern match',
          desc: '`sealed` を付けると同一ファイル内でしか継承できない。コンパイラがパターンマッチの網羅性を検証できる。',
          code: [{ lang: 'Scala', code: `sealed trait Expr
case class Num(n: Int)           extends Expr
case class Add(l: Expr, r: Expr) extends Expr

def eval(e: Expr): Int = e match
  case Num(n)    => n
  case Add(l, r) => eval(l) + eval(r)
// 網羅チェック: ケースを追加するとコンパイル警告` }],
        },
      ],
    },
    {
      id: 's9', num: 9, title: 'ジェネリクス・型パラメータ', level: 'advanced',
      items: [
        {
          id: 's9-generic', name: '型パラメータ', level: 'basic',
          keywords: 'type parameter generic [T] bound',
          desc: '`[T]` で型パラメータを宣言。`<:` で上限境界（T は A のサブタイプ）、`>:` で下限境界を指定できる。',
          code: [{ lang: 'Scala', code: `def first[T](list: List[T]): Option[T] =
  if list.isEmpty then None else Some(list.head)

def max[T <: Comparable[T]](a: T, b: T): T =
  if a.compareTo(b) >= 0 then a else b` }],
        },
        {
          id: 's9-variance', name: '変位指定（Variance）', level: 'advanced',
          keywords: 'covariant contravariant invariant +T -T',
          desc: '`+T`（共変）は `F[Sub]` を `F[Super]` として使える。`-T`（反変）は逆。`T` のみは不変。`List[+A]` は共変なので `List[Int]` を `List[Any]` に代入できる。',
          code: [{ lang: 'Scala', code: `// List は共変（+A）
val ints: List[Int]  = List(1, 2, 3)
val anys: List[Any]  = ints  // OK

// Function1 は引数が反変(-T1)・戻り値が共変(+R)
val f: Int => Any    = (x: Int) => x.toString` }],
        },
        {
          id: 's9-given-using', name: 'given / using（Scala 3）', level: 'advanced',
          keywords: 'given using implicit Scala3 context parameter',
          desc: 'Scala 3 の `given`/`using` は Scala 2 の `implicit` の後継。型クラスや依存注入のパターンで使う。',
          code: [{ lang: 'Scala', code: `trait Show[A]:
  def show(a: A): String

given Show[Int] with
  def show(n: Int): String = n.toString

def print[A](a: A)(using s: Show[A]): Unit =
  println(s.show(a))

print(42)  // 42` }],
        },
        {
          id: 's9-opaque', name: 'opaque type（Scala 3）', level: 'advanced',
          keywords: 'opaque type alias newtypes',
          desc: 'コンパイル時は別の型として扱われるが、実行時はラッパーオブジェクトが生成されない型エイリアス。型安全なドメイン型を zero-cost で作れる。',
          code: [{ lang: 'Scala', code: `opaque type UserId = Int
object UserId:
  def apply(n: Int): UserId = n
  extension (id: UserId) def value: Int = id

val id = UserId(42)
// val n: Int = id  // コンパイルエラー（型安全）
println(id.value)   // 42` }],
        },
      ],
    },
    {
      id: 's10', num: 10, title: 'パターンマッチング', level: 'basic',
      items: [
        {
          id: 's10-basic', name: '基本パターン', level: 'basic',
          keywords: 'case wildcard literal type guard',
          desc: 'リテラル・型・ワイルドカード（`_`）・ガード（`if`）などのパターンを組み合わせられる。',
          code: [{ lang: 'Scala', code: `def describe(x: Any): String = x match
  case 0           => "zero"
  case n: Int      => s"int: \${n}"
  case s: String   => s"str: \${s}"
  case (a, b)      => s"pair: \${a}, \${b}"
  case _           => "other"` }],
        },
        {
          id: 's10-case-class', name: 'case class の分割代入', level: 'basic',
          keywords: 'case class unapply extractor',
          desc: '`case class` は `unapply` が自動生成されるため、パターンマッチで直接フィールドを取り出せる。',
          code: [{ lang: 'Scala', code: `case class Point(x: Int, y: Int)
val p = Point(3, 7)
p match
  case Point(0, 0) => println("origin")
  case Point(x, 0) => println(s"on x-axis at \${x}")
  case Point(x, y) => println(s"(\${x}, \${y})")` }],
        },
        {
          id: 's10-list-pattern', name: 'リストパターン', level: 'basic',
          keywords: ':: Nil head tail list pattern',
          desc: '`::` で先頭と残りを分割する。再帰処理と組み合わせて使われる。',
          code: [{ lang: 'Scala', code: `def sum(list: List[Int]): Int = list match
  case Nil     => 0
  case h :: t  => h + sum(t)

println(sum(List(1, 2, 3, 4)))  // 10` }],
        },
      ],
    },
    {
      id: 's11', num: 11, title: '関数型プログラミング', level: 'basic',
      items: [
        {
          id: 's11-pure', name: '純粋関数・参照透過性', level: 'basic',
          keywords: '純粋関数 参照透過 副作用 immutable',
          desc: '副作用（IO・変数書き換えなど）を持たず、同じ引数に対して常に同じ結果を返す関数。テストやリファクタリングが容易になる。',
          code: [{ lang: 'Scala', code: `// 純粋関数（副作用なし）
def add(a: Int, b: Int): Int = a + b

// 非純粋（副作用あり）
var total = 0
def addImpure(n: Int): Int = { total += n; total }` }],
        },
        {
          id: 's11-functor', name: 'Functor・Monad の概念', level: 'advanced',
          keywords: 'functor monad map flatMap Option List Future',
          desc: '`map` で「文脈の中の値を変換」するのが Functor、`flatMap` でネストを避けながらチェーンするのが Monad。Scala の `Option`・`List`・`Future` はすべて Monad。',
          code: [{ lang: 'Scala', code: `// Option Monad
val result = for
  x <- Some(10)
  y <- Some(20)
  z <- Some(x + y)
yield z * 2
// result: Some(60)` }],
        },
        {
          id: 's11-fp-style', name: '副作用の分離・IOの扱い', level: 'advanced',
          keywords: 'IO effect cats-effect ZIO pure functional',
          desc: 'Cats Effect や ZIO では IO を値として扱い、副作用を型で表現することで純粋関数型プログラムを構成する。',
          code: [{ lang: 'Scala', code: `// cats-effect の例（概念的）
import cats.effect.IO
val readLine: IO[String] = IO(scala.io.StdIn.readLine())
val printHello: IO[Unit] = IO(println("Hello!"))
val program: IO[Unit] = printHello >> readLine.flatMap(name => IO(println(s"Hi \${name}")))` }],
        },
        {
          id: 's11-tail-rec', name: '末尾再帰 @tailrec', level: 'basic',
          keywords: 'tailrec tail recursion stack overflow',
          desc: '`@tailrec` アノテーションを付けると末尾再帰をループに最適化。スタックオーバーフローを防ぐ。末尾位置にない場合はコンパイルエラーになる。',
          code: [{ lang: 'Scala', code: `import scala.annotation.tailrec
@tailrec
def factorial(n: Int, acc: Int = 1): Int =
  if n <= 1 then acc else factorial(n - 1, n * acc)

println(factorial(10))  // 3628800` }],
        },
      ],
    },
    {
      id: 's12', num: 12, title: '並行処理・Future', level: 'basic',
      items: [
        {
          id: 's12-future', name: 'Future[T]', level: 'basic',
          keywords: 'Future async concurrent ExecutionContext',
          desc: '`Future[T]` は非同期計算を表す。`ExecutionContext` 上で実行され、`map`・`flatMap` でコンビネーションできる。',
          code: [{ lang: 'Scala', code: `import scala.concurrent.{Future, Await}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration.*

val f = Future { Thread.sleep(100); 42 }
val doubled = f.map(_ * 2)
println(Await.result(doubled, 1.second))  // 84` }],
        },
        {
          id: 's12-future-combinators', name: 'Future の結合', level: 'basic',
          keywords: 'Future.sequence zip flatMap recover',
          desc: '`Future.sequence` で `List[Future[A]]` を `Future[List[A]]` に変換。`recover` で失敗時のフォールバックを指定できる。',
          code: [{ lang: 'Scala', code: `val f1 = Future(1)
val f2 = Future(2)
val both = for
  a <- f1
  b <- f2
yield a + b
// または
val all = Future.sequence(List(f1, f2))` }],
        },
        {
          id: 's12-promise', name: 'Promise と Await', level: 'basic',
          keywords: 'Promise complete Await.result',
          desc: '`Promise` は `Future` を手動で完了させるためのコンテナ。`Await.result` はブロッキング待機（本番では避ける）。',
          code: [{ lang: 'Scala', code: `import scala.concurrent.Promise
val p = Promise[Int]()
val f = p.future
p.success(42)
println(Await.result(f, 1.second))  // 42` }],
        },
      ],
    },
    {
      id: 's13', num: 13, title: '型クラス・Extension Methods', level: 'advanced',
      items: [
        {
          id: 's13-typeclass', name: '型クラスパターン', level: 'advanced',
          keywords: 'typeclass given using Show Eq Ordering',
          desc: '型クラスは「特定の型に対して特定の操作を定義する」パターン。`given` で実装を提供し、`using` で受け取る。',
          code: [{ lang: 'Scala', code: `trait Printable[A]:
  def format(a: A): String

given Printable[Int] with
  def format(n: Int): String = s"Int(\${n})"

given Printable[String] with
  def format(s: String): String = s"Str(\${s})"

def print[A: Printable](a: A): Unit =
  println(summon[Printable[A]].format(a))

print(42)        // Int(42)
print("hello")   // Str(hello)` }],
        },
        {
          id: 's13-extension', name: 'Extension Methods（Scala 3）', level: 'advanced',
          keywords: 'extension method implicit class Scala3',
          desc: '`extension` キーワードで既存の型にメソッドを追加できる。Scala 2 の `implicit class` の後継。',
          code: [{ lang: 'Scala', code: `extension (s: String)
  def shout: String = s.toUpperCase + "!"
  def whisper: String = s.toLowerCase + "..."

println("hello".shout)    // HELLO!
println("HELLO".whisper)  // hello...` }],
        },
        {
          id: 's13-given-imports', name: 'given のインポート', level: 'advanced',
          keywords: 'import given using implicit import',
          desc: '`given` の実装は通常のインポートでは取り込めず、`import Foo.given` または `import Foo.{given TypeClass}` で明示的にインポートする。',
          code: [{ lang: 'Scala', code: `// object MyGivens { given Ordering[String] = ... }
import MyGivens.given           // 全 given をインポート
import MyGivens.{given Ordering[?]} // 特定型の given のみ` }],
        },
      ],
    },
    {
      id: 's14', num: 14, title: 'ビルドツール・エコシステム', level: 'basic',
      items: [
        {
          id: 's14-sbt', name: 'sbt', level: 'basic',
          keywords: 'sbt build.sbt libraryDependencies compile run',
          desc: 'Scala 標準のビルドツール。`build.sbt` でプロジェクト設定を記述。`sbt compile`・`sbt run`・`sbt test` でビルド・実行・テスト。',
          code: [{ lang: 'Scala', code: `// build.sbt
scalaVersion := "3.4.0"
name := "my-project"

libraryDependencies ++= Seq(
  "org.typelevel" %% "cats-core" % "2.10.0",
  "org.scalatest" %% "scalatest" % "3.2.17" % Test
)` }],
        },
        {
          id: 's14-cats-zio', name: 'Cats / ZIO', level: 'advanced',
          keywords: 'cats cats-effect ZIO typelevel functional ecosystem',
          desc: '`cats` は関数型の型クラス（Functor, Monad 等）を提供。`cats-effect` は IO モナドとランタイム。`ZIO` は型安全な副作用管理ライブラリ。',
          code: [{ lang: 'Scala', code: `// ZIO の例（概念）
import zio.*
val program: ZIO[Any, Nothing, Unit] =
  ZIO.attempt(println("Hello ZIO")).orDie

// @main def run = ZIO.unsafe.run(program)` }],
        },
        {
          id: 's14-testing', name: 'ScalaTest / MUnit', level: 'basic',
          keywords: 'scalatest munit test spec assertion',
          desc: '`ScalaTest` は多様なスタイル（FlatSpec, FunSpec 等）のテストフレームワーク。`MUnit` は軽量でシンプルなテストライブラリ。',
          code: [{ lang: 'Scala', code: `import org.scalatest.funsuite.AnyFunSuite
class MathSuite extends AnyFunSuite:
  test("addition"):
    assert(1 + 1 == 2)
  test("string"):
    assert("hello".length == 5)` }],
        },
      ],
    },
    {
      id: 's15', num: 15, title: 'Scala 3 の新機能', level: 'advanced',
      items: [
        {
          id: 's15-union-intersection', name: 'Union 型 / Intersection 型', level: 'advanced',
          keywords: 'union type A|B intersection A&B Scala3',
          desc: '`A | B` は A または B のどちらかの型（Union 型）。`A & B` は A と B の両方を満たす型（Intersection 型）。Scala 3 の新機能。',
          code: [{ lang: 'Scala', code: `def stringify(x: Int | String): String = x match
  case n: Int    => n.toString
  case s: String => s

// Intersection 型
trait Named { def name: String }
trait Aged  { def age: Int }
def greet(p: Named & Aged): String = s"\${p.name} (\${p.age})"` }],
        },
        {
          id: 's15-metaprogramming', name: 'inline / マクロ', level: 'advanced',
          keywords: 'inline macro quotes splices compile-time',
          desc: '`inline` でコンパイル時に展開されるメソッドを定義できる。`quotes`/`splices` によるマクロ API でコード生成も可能。',
          code: [{ lang: 'Scala', code: `inline def debug[A](expr: A): A =
  println(s"debug: \${expr}")
  expr

val x = debug(1 + 2)  // コンパイル時: println("debug: 3")` }],
        },
        {
          id: 's15-match-types', name: 'Match Types', level: 'advanced',
          keywords: 'match types dependent type computation',
          desc: '型レベルのパターンマッチ。型引数によって戻り値型を変えられる。',
          code: [{ lang: 'Scala', code: `type Elem[X] = X match
  case String      => Char
  case Array[t]    => t
  case Iterable[t] => t

val c: Elem[String]    = 'a'
val n: Elem[Array[Int]] = 42` }],
        },
      ],
    },
    {
      id: 's16', num: 16, title: 'Java 互換・エコシステム', level: 'advanced',
      items: [
        {
          id: 's16-java-interop', name: 'Java との相互運用', level: 'advanced',
          keywords: 'Java interop import JVM class library',
          desc: 'Scala は JVM 上で動作し、Java ライブラリをそのまま利用できる。Java の `null` に注意しつつ `Option` でラップするのが安全。',
          code: [{ lang: 'Scala', code: `import java.util.{ArrayList, HashMap}
val list = new ArrayList[String]()
list.add("hello")
list.add("world")
println(list.size())  // 2

// Scala ↔ Java コレクション変換
import scala.jdk.CollectionConverters.*
val scalaList = list.asScala.toList` }],
        },
        {
          id: 's16-scala-js', name: 'Scala.js / Scala Native', level: 'advanced',
          keywords: 'ScalaJS ScalaNative JavaScript WebAssembly LLVM',
          desc: 'Scala.js は Scala コードを JavaScript にコンパイル。Scala Native は LLVM を使ってネイティブバイナリを生成。GC や JVM 不要で動作する。',
          code: [{ lang: 'Scala', code: `// Scala.js: DOM 操作
import org.scalajs.dom
dom.document.getElementById("app").innerHTML = "<h1>Hello Scala.js!</h1>"` }],
        },
        {
          id: 's16-spark', name: 'Apache Spark', level: 'advanced',
          keywords: 'Spark RDD DataFrame distributed computing big data',
          desc: 'Apache Spark の主要言語。Scala API は最もネイティブで高性能。大規模分散データ処理の標準的選択肢。',
          code: [{ lang: 'Scala', code: `// Spark の例（概念）
val sc: SparkContext = ...
val rdd = sc.textFile("data.txt")
val words = rdd.flatMap(_.split(" "))
val counts = words.map(w => (w, 1)).reduceByKey(_ + _)
counts.saveAsTextFile("output")` }],
        },
        {
          id: 's16-toolchain', name: 'ツールチェーン', level: 'basic',
          keywords: 'sbt mill Scala CLI REPL metals',
          desc: '`sbt` が標準ビルドツール。`Scala CLI` はスクリプト実行に便利。REPL（`scala` コマンド）で対話的に試せる。Metals は主要な LSP サーバー。',
          code: [{ lang: 'Scala', code: `// Scala CLI でスクリプト
// hello.sc
@main def hello() = println("Hello from Scala CLI!")
// $ scala-cli hello.sc` }],
        },
      ],
    },
  ],
};

export default data;
