import type { LanguageGuide } from '../../types';

const data: LanguageGuide = {
  lang: 'Ruby',
  langSlug: 'ruby',
  version: 'Ruby 3.x',
  lead: `他言語の経験者が 2〜3 時間でざっと読み通せるリファレンスです。ブロック・イテレータ・メタプログラミングなど Ruby 固有の概念を重点的に解説します。`,
  accent: '#9c0000',
  accent2: '#ffe0e0',
  bgGradientTop: '#fff0f0',
  bgRadialLeft: 'rgba(156,0,0,0.10)',
  bgRadialRight: 'rgba(200,50,50,0.07)',
  badgeGradient: 'linear-gradient(135deg, #6b0000, #9c0000)',
  heroEmoji: '💎',
  navGroups: [
    { label: '基礎', sections: ['s1', 's2', 's3', 's4', 's5', 's6'] },
    { label: 'OOP', sections: ['s7', 's8', 's9'] },
    { label: 'ブロック', sections: ['s10', 's11'] },
    { label: '実用', sections: ['s12', 's13', 's14'] },
    { label: '応用', sections: ['s15', 's16'] },
  ],
  sections: [
    // ─────────────────────────────────────────────
    // s1: 変数・定数・データ型
    // ─────────────────────────────────────────────
    {
      id: 's1',
      num: 1,
      title: '変数・定数・データ型',
      level: 'basic',
      items: [
        {
          id: 's1-変数の種類',
          name: '変数の種類',
          level: 'basic',
          keywords: 'ローカル変数 インスタンス変数 クラス変数 グローバル変数 スコープ',
          desc: `Ruby の変数は先頭文字でスコープが決まる。ローカル変数は小文字/アンダースコア始まり、インスタンス変数は \`@\`、クラス変数は \`@@\`、グローバル変数は \`$\` が先頭に付く。`,
          code: [
            {
              lang: 'Ruby',
              code: `local_var = "ローカル"      # ローカル変数

class Counter
  @@count = 0               # クラス変数（全インスタンス共有）

  def initialize(name)
    @name = name            # インスタンス変数
    @@count += 1
  end

  def self.count = @@count  # クラスメソッド（Ruby 3.0+ の短縮形）
end

$debug = true               # グローバル変数（使用は最小限に）

Counter.new("a")
Counter.new("b")
p Counter.count             # => 2`,
            },
          ],
          output: `2`,
          warn: `クラス変数 \`@@\` は継承ツリー全体で共有されるため、サブクラスで意図せず書き換わることがある。インスタンス変数 \`@\` や \`class << self\` 内のインスタンス変数で代替するのが一般的。`,
        },
        {
          id: 's1-定数',
          name: '定数（大文字始まり）',
          level: 'basic',
          keywords: '定数 CONSTANT 再代入 freeze',
          desc: `大文字始まりの識別子は定数。再代入すると警告が出るが実行は止まらない。完全に凍結するには \`freeze\` を呼ぶ。`,
          code: [
            {
              lang: 'Ruby',
              code: `MAX_RETRIES = 3
PI = 3.14159

# MAX_RETRIES = 5  # warning: already initialized constant MAX_RETRIES

FROZEN_LIST = [1, 2, 3].freeze
# FROZEN_LIST << 4  # FrozenError: can't modify frozen Array`,
            },
          ],
          warn: `\`freeze\` はオブジェクト自体を凍結するが、配列・ハッシュの**要素**は凍結しない（浅い凍結）。完全な不変性が必要なら要素ごとに \`freeze\` を呼ぶか \`deep_freeze\` 相当のロジックが必要。`,
        },
        {
          id: 's1-基本型',
          name: '基本型',
          level: 'basic',
          keywords: 'Integer Float String Symbol Boolean nil Array Hash 型',
          desc: `Ruby の主要な組み込み型。\`true\`/\`false\` は TrueClass/FalseClass の唯一のインスタンス。\`nil\` は NilClass のインスタンスで「値なし」を表す。`,
          code: [
            {
              lang: 'Ruby',
              code: `42          # Integer（任意精度）
3.14        # Float
"hello"     # String
:name       # Symbol（不変・内部的にキャッシュ）
true        # TrueClass
false       # FalseClass
nil         # NilClass
[1, 2, 3]   # Array
{ a: 1 }    # Hash`,
            },
          ],
        },
        {
          id: 's1-型チェック',
          name: '型チェック（is_a? / kind_of? / class）',
          level: 'basic',
          keywords: 'is_a? kind_of? class instance_of? 型チェック',
          desc: `\`is_a?\` / \`kind_of?\`（同義語）は継承・モジュール込みで判定する。\`instance_of?\` は厳密な型一致のみ。\`class\` は実際のクラスを返す。`,
          code: [
            {
              lang: 'Ruby',
              code: `n = 42
p n.class          # => Integer
p n.is_a?(Integer) # => true
p n.is_a?(Numeric) # => true  ← 親クラスも true
p n.instance_of?(Numeric) # => false  ← 厳密一致のみ

p "hi".is_a?(Comparable) # => true  ← モジュールも true`,
            },
          ],
          output: `Integer
true
true
false
true`,
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
          id: 's2-if-unless',
          name: 'if / elsif / else / unless',
          level: 'basic',
          keywords: 'if elsif else unless 条件分岐',
          desc: `\`if\` は末尾に \`end\` が必要。\`unless\` は「〜でなければ」を意味する否定形 if。どちらも式であり値を返す。`,
          code: [
            {
              lang: 'Ruby',
              code: `score = 75

result = if score >= 90
  "S"
elsif score >= 70
  "A"
else
  "B"
end
p result   # => "A"

# unless（否定形）
puts "ゲスト" unless score >= 90`,
            },
          ],
          output: `"A"
ゲスト`,
        },
        {
          id: 's2-case-when',
          name: 'case / when（パターンマッチ含む）',
          level: 'basic',
          keywords: 'case when in パターンマッチ ===',
          desc: `\`case/when\` は \`===\` で比較する。Ruby 3.0 以降は \`case/in\` でパターンマッチが使える。`,
          code: [
            {
              lang: 'Ruby',
              code: `# 値による分岐（=== を使用）
val = "hello"
case val
when String  then puts "文字列"
when Integer then puts "整数"
else              puts "その他"
end

# Ruby 3.0+ パターンマッチ
data = { name: "Alice", age: 30 }
case data
in { name: String => name, age: (18..) }
  puts "成人: \#{name}"
end`,
            },
          ],
          output: `文字列
成人: Alice`,
        },
        {
          id: 's2-while-until-loop',
          name: 'while / until / loop',
          level: 'basic',
          keywords: 'while until loop break next redo',
          desc: `\`while\` は条件が真の間繰り返し、\`until\` は偽の間繰り返す。\`loop\` は無限ループで \`break\` で脱出する。`,
          code: [
            {
              lang: 'Ruby',
              code: `i = 0
while i < 3
  print "\#{i} "
  i += 1
end
# => 0 1 2

j = 3
until j == 0
  print "\#{j} "
  j -= 1
end
# => 3 2 1

loop do
  puts "one shot"
  break
end`,
            },
          ],
          output: `0 1 2 3 2 1 one shot`,
        },
        {
          id: 's2-修飾子形式',
          name: '修飾子形式（後置 if / unless）',
          level: 'basic',
          keywords: '後置if 修飾子 one-liner guard clause',
          desc: `\`式 if 条件\` / \`式 unless 条件\` の形式で 1 行に書ける。ガード節としてメソッド冒頭の早期 return に多用する。`,
          code: [
            {
              lang: 'Ruby',
              code: `puts "正" if 1 > 0
puts "偽ではない" unless false

def greet(name)
  return "名前が空です" if name.nil? || name.empty?
  "Hello, \#{name}!"
end

p greet("")      # => "名前が空です"
p greet("Ruby")  # => "Hello, Ruby!"`,
            },
          ],
          output: `正
偽ではない
"名前が空です"
"Hello, Ruby!"`,
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s3: メソッド
    // ─────────────────────────────────────────────
    {
      id: 's3',
      num: 3,
      title: 'メソッド',
      level: 'basic',
      items: [
        {
          id: 's3-def-戻り値',
          name: 'def と暗黙の return',
          level: 'basic',
          keywords: 'def return 暗黙 メソッド定義',
          desc: `\`def\` でメソッドを定義する。Ruby では最後に評価した式の値が自動的に返値になる（暗黙の return）。明示的な \`return\` も使える。`,
          code: [
            {
              lang: 'Ruby',
              code: `def add(a, b)
  a + b          # 最後の式が戻り値
end

def sign(n)
  return "正" if n > 0
  return "負" if n < 0
  "ゼロ"         # ← これが暗黙の return
end

p add(3, 4)   # => 7
p sign(-5)    # => "負"`,
            },
          ],
          output: `7
"負"`,
        },
        {
          id: 's3-引数の種類',
          name: 'デフォルト・キーワード・可変長引数',
          level: 'basic',
          keywords: 'デフォルト引数 キーワード引数 可変長 *args **kwargs splat',
          desc: `Ruby はデフォルト引数・キーワード引数（\`name:\`）・スプラット演算子（\`*args\`/\`**kwargs\`）を組み合わせられる。`,
          code: [
            {
              lang: 'Ruby',
              code: `def greet(name, greeting: "Hello")
  "\#{greeting}, \#{name}!"
end

def sum(*nums)
  nums.sum
end

def show(**opts)
  opts.each { |k, v| puts "\#{k}: \#{v}" }
end

p greet("Alice")                  # => "Hello, Alice!"
p greet("Bob", greeting: "Hi")    # => "Hi, Bob!"
p sum(1, 2, 3, 4)                 # => 10
show(lang: "Ruby", ver: "3.3")`,
            },
          ],
          output: `"Hello, Alice!"
"Hi, Bob!"
10
lang: Ruby
ver: 3.3`,
        },
        {
          id: 's3-可視性',
          name: 'メソッドの可視性（public / private / protected）',
          level: 'basic',
          keywords: 'public private protected 可視性 アクセス制御',
          desc: `\`private\` メソッドはクラス外から呼び出せない。\`protected\` は同クラスおよびサブクラスのインスタンスから呼べる（比較メソッドなどに使用）。`,
          code: [
            {
              lang: 'Ruby',
              code: `class BankAccount
  def initialize(balance)
    @balance = balance
  end

  def >(other)
    balance > other.balance   # protected メソッドを呼べる
  end

  protected

  def balance = @balance

  private

  def secret_pin = "1234"
end

a = BankAccount.new(100)
b = BankAccount.new(200)
p a > b             # => false
# a.balance         # NoMethodError
# a.secret_pin      # NoMethodError`,
            },
          ],
          output: `false`,
        },
        {
          id: 's3-bang-question',
          name: '! メソッドと ? メソッドの慣習',
          level: 'basic',
          keywords: '! bang ? predicate 破壊的メソッド 述語メソッド',
          desc: `\`!\` で終わるメソッドは破壊的（レシーバ自体を変更）または例外を発生させる危険な版。\`?\` で終わるメソッドは真偽値を返す述語メソッド。`,
          code: [
            {
              lang: 'Ruby',
              code: `s = "hello"
p s.upcase   # => "HELLO"（元は変わらない）
p s          # => "hello"
s.upcase!    # 破壊的
p s          # => "HELLO"

p [1, nil, 2, nil].compact          # => [1, 2]（コピー）
p "".empty?   # => true
p nil.nil?    # => true
p 5.between?(1, 10)  # => true`,
            },
          ],
          output: `"HELLO"
"hello"
"HELLO"
[1, 2]
true
true
true`,
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
          id: 's4-リテラル',
          name: '文字列リテラル（ダブルクォートとシングルクォート）',
          level: 'basic',
          keywords: 'ダブルクォート シングルクォート 文字列リテラル エスケープ',
          desc: `\`"..."\` はエスケープシーケンスと文字列補間が有効。\`'...'\` はほぼそのまま（\`\\\\'\` と \`\\\\\\\\\` のみ解釈）。`,
          code: [
            {
              lang: 'Ruby',
              code: `name = "Ruby"
p "Hello, \#{name}!"   # => "Hello, Ruby!"  ← 補間あり
p 'Hello, \#{name}!'   # => "Hello, \#{name}!"  ← 補間なし

p "改行:\n次の行"
p '改行:\n次の行'       # \n はそのまま文字列`,
            },
          ],
          output: `"Hello, Ruby!"
"Hello, \#{name}!"
"改行:\n次の行"
"改行:\\n次の行"`,
        },
        {
          id: 's4-文字列補間',
          name: '文字列補間（#{}）',
          level: 'basic',
          keywords: '文字列補間 #{} 式展開',
          desc: `\`\#{...}\` の中には任意の Ruby 式を書ける。式の評価結果が \`to_s\` で文字列化されて埋め込まれる。`,
          code: [
            {
              lang: 'Ruby',
              code: `x = 7
p "7 の 2 乗は \#{x ** 2}"    # => "7 の 2 乗は 49"
p "現在時刻: \#{Time.now}"
p "配列: \#{[1,2,3].join(", ")}"`,
            },
          ],
        },
        {
          id: 's4-ヒアドキュメント',
          name: 'ヒアドキュメント（<<~HEREDOC）',
          level: 'basic',
          keywords: 'ヒアドキュメント heredoc <<~ インデント',
          desc: `\`<<~HEREDOC\` はインデントを自動的に除去する（Ruby 2.3+）。SQL・HTML などの複数行テキストに便利。`,
          code: [
            {
              lang: 'Ruby',
              code: `sql = <<~SQL
  SELECT *
  FROM users
  WHERE age > \#{18}
SQL
puts sql`,
            },
          ],
          output: `SELECT *
FROM users
WHERE age > 18`,
        },
        {
          id: 's4-主なメソッド',
          name: '主な文字列メソッド',
          level: 'basic',
          keywords: 'upcase split gsub strip % format 文字列メソッド',
          desc: `String クラスには豊富なメソッドが揃っている。\`gsub\` は正規表現対応の全置換、\`%\` は printf 風フォーマット演算子。`,
          code: [
            {
              lang: 'Ruby',
              code: `s = "  Hello, Ruby!  "
p s.strip          # => "Hello, Ruby!"
p s.upcase         # => "  HELLO, RUBY!  "
p s.gsub("Ruby", "World")  # => "  Hello, World!  "
p s.split(", ")    # => ["  Hello", "Ruby!  "]
p "%.2f" % 3.14159 # => "3.14"
p "Name: %s, Age: %d" % ["Alice", 30]`,
            },
          ],
          output: `"Hello, Ruby!"
"  HELLO, RUBY!  "
"  Hello, World!  "
["  Hello", "Ruby!  "]
"3.14"
"Name: Alice, Age: 30"`,
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s5: 配列とハッシュ
    // ─────────────────────────────────────────────
    {
      id: 's5',
      num: 5,
      title: '配列とハッシュ',
      level: 'basic',
      items: [
        {
          id: 's5-配列リテラル',
          name: '配列リテラルと %w[] / %i[]',
          level: 'basic',
          keywords: '配列 Array %w %i リテラル',
          desc: `通常の配列リテラルのほか、\`%w[]\` で文字列配列、\`%i[]\` でシンボル配列を簡潔に作れる。`,
          code: [
            {
              lang: 'Ruby',
              code: `nums   = [1, 2, 3]
words  = %w[apple banana cherry]   # => ["apple", "banana", "cherry"]
syms   = %i[red green blue]        # => [:red, :green, :blue]

p words[0]     # => "apple"
p nums[-1]     # => 3（後ろから）
p nums[1, 2]   # => [2, 3]（start, length）
p nums[0..1]   # => [1, 2]（範囲）`,
            },
          ],
          output: `"apple"
3
[2, 3]
[1, 2]`,
        },
        {
          id: 's5-配列メソッド',
          name: '主な配列メソッド',
          level: 'basic',
          keywords: 'map select reject reduce flatten zip each_with_object',
          desc: `\`map\` は変換、\`select\` は絞り込み、\`reject\` は除外、\`reduce\` は畳み込み。これらは Enumerable モジュールが提供する。`,
          code: [
            {
              lang: 'Ruby',
              code: `nums = [1, 2, 3, 4, 5]

p nums.map    { |n| n * 2 }        # => [2, 4, 6, 8, 10]
p nums.select { |n| n.odd? }       # => [1, 3, 5]
p nums.reject { |n| n.odd? }       # => [2, 4]
p nums.reduce(:+)                  # => 15
p [[1, [2]], [3]].flatten          # => [1, 2, 3]
p [1, 2].zip([3, 4])               # => [[1, 3], [2, 4]]`,
            },
          ],
          output: `[2, 4, 6, 8, 10]
[1, 3, 5]
[2, 4]
15
[1, 2, 3]
[[1, 3], [2, 4]]`,
        },
        {
          id: 's5-ハッシュリテラル',
          name: 'ハッシュリテラルとシンボルキー',
          level: 'basic',
          keywords: 'Hash ハッシュ シンボルキー {} fetch dig',
          desc: `シンボルキーには \`key: value\` の省略記法が使える（Ruby 1.9+）。\`fetch\` はキーが存在しない場合に例外またはデフォルト値を返す。`,
          code: [
            {
              lang: 'Ruby',
              code: `user = { name: "Alice", age: 30, role: :admin }

p user[:name]              # => "Alice"
p user.fetch(:age)         # => 30
p user.fetch(:missing, 0)  # => 0（デフォルト値）

# ネストしたハッシュには dig
config = { db: { host: "localhost", port: 5432 } }
p config.dig(:db, :host)   # => "localhost"
p config.dig(:db, :pass)   # => nil（KeyErrorではない）`,
            },
          ],
          output: `"Alice"
30
0
"localhost"
nil`,
        },
        {
          id: 's5-ハッシュ操作',
          name: 'ハッシュ操作（merge / select / transform_values）',
          level: 'basic',
          keywords: 'merge select transform_values transform_keys filter_map',
          desc: `\`merge\` は 2 つのハッシュを統合（後者が優先）。\`transform_values\` / \`transform_keys\` は値・キーを一括変換する。`,
          code: [
            {
              lang: 'Ruby',
              code: `a = { x: 1, y: 2 }
b = { y: 99, z: 3 }

p a.merge(b)                           # => {x:1, y:99, z:3}
p a.select { |k, v| v > 1 }           # => {y:2}
p a.transform_values { |v| v * 10 }   # => {x:10, y:20}
p a.transform_keys { |k| k.to_s }     # => {"x"=>1, "y"=>2}`,
            },
          ],
          output: `{:x=>1, :y=>99, :z=>3}
{:y=>2}
{:x=>10, :y=>20}
{"x"=>1, "y"=>2}`,
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
          id: 's6-begin-rescue-ensure',
          name: 'begin / rescue / ensure / else',
          level: 'basic',
          keywords: 'begin rescue ensure else 例外処理 exception',
          desc: `\`rescue\` で例外をキャッチ。\`ensure\` は例外の有無に関わらず必ず実行（クリーンアップ用）。\`else\` は例外が発生しなかった場合に実行。`,
          code: [
            {
              lang: 'Ruby',
              code: `begin
  result = 10 / Integer(gets.chomp)
rescue ZeroDivisionError => e
  puts "ゼロ除算: \#{e.message}"
rescue ArgumentError => e
  puts "不正な入力: \#{e.message}"
else
  puts "結果: \#{result}"
ensure
  puts "処理終了（必ず実行）"
end`,
            },
          ],
        },
        {
          id: 's6-raise-retry',
          name: 'raise / retry',
          level: 'basic',
          keywords: 'raise retry 例外発生 再試行',
          desc: `\`raise\` で例外を発生させる。\`rescue\` ブロック内で \`retry\` を呼ぶと \`begin\` から再試行できる。無限ループに注意してカウンタで制限する。`,
          code: [
            {
              lang: 'Ruby',
              code: `attempts = 0
begin
  attempts += 1
  raise "一時的なエラー" if attempts < 3
  puts "成功（\#{attempts} 回目）"
rescue RuntimeError => e
  puts "リトライ \#{attempts}: \#{e.message}"
  retry if attempts < 3
end`,
            },
          ],
          output: `リトライ 1: 一時的なエラー
リトライ 2: 一時的なエラー
成功（3 回目）`,
        },
        {
          id: 's6-独自例外クラス',
          name: '独自例外クラス',
          level: 'basic',
          keywords: '独自例外 カスタム例外 StandardError 継承',
          desc: `\`StandardError\` を継承して独自例外を定義する。\`RuntimeError\` の継承でも良いが、ライブラリでは \`StandardError\` を推奨。`,
          code: [
            {
              lang: 'Ruby',
              code: `class InsufficientFundsError < StandardError
  def initialize(amount, balance)
    super("残高不足: 引き出し額 \#{amount}、残高 \#{balance}")
    @amount  = amount
    @balance = balance
  end

  attr_reader :amount, :balance
end

begin
  raise InsufficientFundsError.new(500, 200)
rescue InsufficientFundsError => e
  puts e.message
  puts "不足額: \#{e.amount - e.balance}"
end`,
            },
          ],
          output: `残高不足: 引き出し額 500、残高 200
不足額: 300`,
        },
        {
          id: 's6-rescue-in-method',
          name: 'メソッドに直接 rescue を書く',
          level: 'basic',
          keywords: 'rescue メソッド インライン begin省略',
          desc: `メソッド全体を例外処理の対象にする場合は \`begin\`/\`end\` を省略して \`def\` 直後に \`rescue\` を書ける。`,
          code: [
            {
              lang: 'Ruby',
              code: `def parse_int(str)
  Integer(str)
rescue ArgumentError
  nil
end

p parse_int("42")    # => 42
p parse_int("abc")   # => nil`,
            },
          ],
          output: `42
nil`,
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s7: クラスとモジュール
    // ─────────────────────────────────────────────
    {
      id: 's7',
      num: 7,
      title: 'クラスとモジュール',
      level: 'basic',
      items: [
        {
          id: 's7-class-initialize-attr',
          name: 'class / initialize / attr_accessor',
          level: 'basic',
          keywords: 'class initialize attr_accessor attr_reader attr_writer',
          desc: `\`initialize\` はコンストラクタ。\`attr_accessor\` は getter/setter を自動生成する。読み取り専用は \`attr_reader\`、書き込み専用は \`attr_writer\`。`,
          code: [
            {
              lang: 'Ruby',
              code: `class Person
  attr_accessor :name, :age
  attr_reader   :id

  @@next_id = 1

  def initialize(name, age)
    @name = name
    @age  = age
    @id   = @@next_id
    @@next_id += 1
  end

  def to_s = "\#{@name}(\#{@age})"
end

alice = Person.new("Alice", 30)
alice.age = 31
p alice.to_s   # => "Alice(31)"
p alice.id     # => 1`,
            },
          ],
          output: `"Alice(31)"
1`,
        },
        {
          id: 's7-継承-super',
          name: '継承（<）と super',
          level: 'basic',
          keywords: '継承 < super サブクラス override オーバーライド',
          desc: `\`class Sub < Parent\` で継承。\`super\` は親クラスの同名メソッドを呼び出す。引数なしの \`super\` は全引数をそのまま転送する。`,
          code: [
            {
              lang: 'Ruby',
              code: `class Animal
  def initialize(name)
    @name = name
  end

  def speak = "\#{@name} が鳴く"
end

class Dog < Animal
  def speak = "\#{super}: ワン！"  # super で親を呼ぶ
end

d = Dog.new("ポチ")
p d.speak          # => "ポチ が鳴く: ワン！"
p d.is_a?(Animal)  # => true`,
            },
          ],
          output: `"ポチ が鳴く: ワン！"
true`,
        },
        {
          id: 's7-module-include',
          name: 'Module と include（Mixin）',
          level: 'basic',
          keywords: 'module include Mixin 多重継承 モジュール',
          desc: `Ruby はクラスの多重継承を持たないが、\`module\` と \`include\` による Mixin で複数の機能を合成できる。モジュールはインスタンス化できない。`,
          code: [
            {
              lang: 'Ruby',
              code: `module Greetable
  def greet = "Hello, I'm \#{name}"
end

module Farewell
  def bye = "Goodbye from \#{name}"
end

class User
  include Greetable
  include Farewell
  attr_reader :name

  def initialize(name)
    @name = name
  end
end

u = User.new("Bob")
p u.greet   # => "Hello, I'm Bob"
p u.bye     # => "Goodbye from Bob"`,
            },
          ],
          output: `"Hello, I'm Bob"
"Goodbye from Bob"`,
        },
        {
          id: 's7-extend',
          name: 'extend（クラスメソッドとして取り込み）',
          level: 'basic',
          keywords: 'extend クラスメソッド module singleton',
          desc: `\`include\` がインスタンスメソッドを追加するのに対し、\`extend\` はクラス（またはオブジェクト）のシングルトンクラスにメソッドを追加する。`,
          code: [
            {
              lang: 'Ruby',
              code: `module ClassLogger
  def log(msg) = puts("[LOG] \#{self}: \#{msg}")
end

class Service
  extend ClassLogger
end

Service.log("起動")   # クラスメソッドとして使える

# 個別オブジェクトへの extend
obj = Object.new
obj.extend(ClassLogger)
obj.log("hello")`,
            },
          ],
          output: `[LOG] Service: 起動
[LOG] #<Object:...>: hello`,
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s8: イテレータとブロック
    // ─────────────────────────────────────────────
    {
      id: 's8',
      num: 8,
      title: 'イテレータとブロック',
      level: 'basic',
      items: [
        {
          id: 's8-each-map-select-times',
          name: 'each / map / select / times',
          level: 'basic',
          keywords: 'each map select times upto downto イテレータ',
          desc: `Ruby では \`for\` ループよりメソッドにブロックを渡す書き方が慣用的。数値には \`times\`・\`upto\`・\`step\` などが使える。`,
          code: [
            {
              lang: 'Ruby',
              code: `[10, 20, 30].each   { |n| print "\#{n} " }   # => 10 20 30
[10, 20, 30].map    { |n| n / 10 }          # => [1, 2, 3]
[1..5].first(5).select { |n| n.even? }      # => [2, 4]

3.times { |i| print "\#{i} " }    # => 0 1 2
1.upto(5) { |i| print "\#{i} " }  # => 1 2 3 4 5
(1..10).step(3) { |i| print "\#{i} " }  # => 1 4 7 10`,
            },
          ],
        },
        {
          id: 's8-ブロック構文',
          name: 'ブロック（do...end と {...}）',
          level: 'basic',
          keywords: 'block ブロック do end {} 優先順位',
          desc: `\`do...end\` と \`{...}\` は同義だが優先順位が異なる。\`{}\` は \`do...end\` より強く束縛される。複数行なら \`do...end\`、1行なら \`{}\` が慣習。`,
          code: [
            {
              lang: 'Ruby',
              code: `# 1 行ブロックは {} が慣習
[1, 2, 3].map { |n| n ** 2 }

# 複数行は do...end が慣習
[1, 2, 3].each do |n|
  squared = n ** 2
  puts "\#{n}^2 = \#{squared}"
end

# 優先順位の違い（注意）
p [1,2].map { |n| n * 2 }  # p([1,2].map{...}) と解釈
# p [1,2].map do |n| n * 2 end  # (p [1,2]).map do...end と解釈されることがある`,
            },
          ],
          output: `1^2 = 1
2^2 = 4
3^2 = 9`,
        },
        {
          id: 's8-yield',
          name: 'yield とブロックの渡し方',
          level: 'basic',
          keywords: 'yield block_given? ブロック渡し &block',
          desc: `\`yield\` で呼び出し側のブロックに制御を渡す。\`block_given?\` でブロックの有無を確認できる。\`&block\` 引数でブロックを Proc として受け取れる。`,
          code: [
            {
              lang: 'Ruby',
              code: `def repeat(n)
  n.times { yield }
end

repeat(3) { print "Ruby! " }
# => Ruby! Ruby! Ruby!

def measure(&block)
  start = Time.now
  block.call
  puts "経過: \#{Time.now - start}s"
end

measure { sleep(0.01) }`,
            },
          ],
        },
        {
          id: 's8-proc-lambda',
          name: 'Proc.new / lambda / -> の違い',
          level: 'basic',
          keywords: 'Proc lambda -> 無名関数 引数チェック return',
          desc: `\`Proc.new\` と \`lambda\`/\`->\` は引数チェックと \`return\` の挙動が異なる。lambda は引数が合わないと \`ArgumentError\`、\`return\` はラムダ内のみで完結する。`,
          code: [
            {
              lang: 'Ruby',
              code: `square   = ->(n) { n ** 2 }         # lambda（短縮形）
cube     = lambda { |n| n ** 3 }    # lambda（明示形）
greeting = Proc.new { |n| "Hi \#{n}" }

p square.call(4)   # => 16
p cube.(3)         # => 27  （.() は .call() の糖衣）
p greeting.("Bob") # => "Hi Bob"

p square.lambda?   # => true
p greeting.lambda? # => false`,
            },
          ],
          output: `16
27
"Hi Bob"
true
false`,
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s9: 比較・等値・宇宙船演算子
    // ─────────────────────────────────────────────
    {
      id: 's9',
      num: 9,
      title: '比較・等値・宇宙船演算子',
      level: 'basic',
      items: [
        {
          id: 's9-等値比較',
          name: '== / equal? / eql?',
          level: 'basic',
          keywords: '== equal? eql? 同一性 等値 同値',
          desc: `\`==\` は値の等値（オーバーライド可能）。\`equal?\` はオブジェクト同一性（object_id の比較）。\`eql?\` はハッシュキー比較に使われる（型も含めた厳密な等値）。`,
          code: [
            {
              lang: 'Ruby',
              code: `a = "hello"
b = "hello"
c = a

p a == b       # => true   値が等しい
p a.equal?(b)  # => false  別オブジェクト
p a.equal?(c)  # => true   同じオブジェクト

p 1 == 1.0     # => true   数値として等しい
p 1.eql?(1.0)  # => false  型が違う`,
            },
          ],
          output: `true
false
true
true
false`,
        },
        {
          id: 's9-宇宙船演算子',
          name: '<=> と sort',
          level: 'basic',
          keywords: '<=> 宇宙船演算子 sort sort_by Comparable',
          desc: `\`<=>\` は -1/0/1 を返す汎用比較演算子。\`sort\` はこれを使って並べ替える。\`sort_by\` は任意のキーでソートする際に便利。`,
          code: [
            {
              lang: 'Ruby',
              code: `p 1 <=> 2    # => -1
p 2 <=> 2    # => 0
p 3 <=> 2    # => 1

words = %w[banana apple cherry]
p words.sort                          # => ["apple", "banana", "cherry"]
p words.sort_by { |w| w.length }      # => ["apple", "banana", "cherry"]

people = [{ name: "Bob", age: 30 }, { name: "Alice", age: 25 }]
p people.sort_by { |p| p[:age] }.map { |p| p[:name] }`,
            },
          ],
          output: `-1
0
1
["apple", "banana", "cherry"]
["apple", "banana", "cherry"]
["Alice", "Bob"]`,
        },
        {
          id: 's9-Comparable',
          name: 'Comparable モジュール',
          level: 'basic',
          keywords: 'Comparable include <=> >, <, between? clamp',
          desc: `\`Comparable\` を \`include\` して \`<=>\` を実装すれば、\`<\`・\`>\`・\`<=\`・\`>=\`・\`between?\`・\`clamp\` が自動で使えるようになる。`,
          code: [
            {
              lang: 'Ruby',
              code: `class Temperature
  include Comparable
  attr_reader :degrees

  def initialize(d) = (@degrees = d)
  def <=>(other) = degrees <=> other.degrees
end

temps = [30, 20, 25].map { |d| Temperature.new(d) }
sorted = temps.sort.map(&:degrees)
p sorted                             # => [20, 25, 30]

t = Temperature.new(22)
p t.between?(Temperature.new(20), Temperature.new(25))  # => true`,
            },
          ],
          output: `[20, 25, 30]
true`,
        },
        {
          id: 's9-三重等号',
          name: '=== と case/when の関係',
          level: 'basic',
          keywords: '=== case when Proc Range Regexp パターン',
          desc: `\`case/when\` の内部では \`===\` が使われる。Range・Regexp・Proc などはそれぞれ意味のある \`===\` を実装している。`,
          code: [
            {
              lang: 'Ruby',
              code: `# Range#=== は include? と同義
p (1..10) === 5       # => true

# Regexp#=== は =~ と同義
p /\\d+/ === "abc123"  # => true

# Proc#=== は call と同義
even = ->(n) { n.even? }
p even === 4           # => true

# case/when で活用
def classify(x)
  case x
  when String   then "文字列"
  when (1..9)   then "1〜9"
  when Integer  then "その他整数"
  end
end

p classify("hi")  # => "文字列"
p classify(5)     # => "1〜9"`,
            },
          ],
          output: `true
true
true
"文字列"
"1〜9"`,
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s10: Enumerable
    // ─────────────────────────────────────────────
    {
      id: 's10',
      num: 10,
      title: 'Enumerable',
      level: 'basic',
      items: [
        {
          id: 's10-概要',
          name: 'Enumerable モジュールの概要',
          level: 'basic',
          keywords: 'Enumerable each include モジュール',
          desc: `\`Enumerable\` は \`each\` を実装したクラスに include するだけで 50 以上のコレクション操作メソッドを提供する。Array・Hash・Range などに組み込み済み。`,
          code: [
            {
              lang: 'Ruby',
              code: `class NumberSet
  include Enumerable

  def initialize(*nums) = (@data = nums)

  def each(&block) = @data.each(&block)
end

ns = NumberSet.new(3, 1, 4, 1, 5, 9)
p ns.sort          # => [1, 1, 3, 4, 5, 9]
p ns.min           # => 1
p ns.max           # => 9
p ns.select(&:odd?) # => [3, 1, 1, 5, 9]`,
            },
          ],
          output: `[1, 1, 3, 4, 5, 9]
1
9
[3, 1, 1, 5, 9]`,
        },
        {
          id: 's10-each系',
          name: 'each_with_object / each_with_index / each_slice / each_cons',
          level: 'basic',
          keywords: 'each_with_object each_with_index each_slice each_cons',
          desc: `\`each_with_object\` は累積オブジェクトを持ち回る、\`each_with_index\` はインデックス付き反復、\`each_slice\` / \`each_cons\` はウィンドウ処理に使う。`,
          code: [
            {
              lang: 'Ruby',
              code: `# each_with_object: 累積オブジェクト
result = [1, 2, 3].each_with_object({}) do |n, h|
  h[n] = n ** 2
end
p result    # => {1=>1, 2=>4, 3=>9}

# each_with_index: インデックス付き
%w[a b c].each_with_index { |v, i| puts "\#{i}: \#{v}" }

# each_slice: n 個ずつ
(1..6).each_slice(2) { |s| p s }    # [1,2] [3,4] [5,6]

# each_cons: スライドウィンドウ
(1..5).each_cons(3) { |c| p c }     # [1,2,3] [2,3,4] [3,4,5]`,
            },
          ],
          output: `{1=>1, 2=>4, 3=>9}
0: a
1: b
2: c
[1, 2]
[3, 4]
[5, 6]
[1, 2, 3]
[2, 3, 4]
[3, 4, 5]`,
        },
        {
          id: 's10-group_by-chunk-tally',
          name: 'group_by / chunk / tally',
          level: 'basic',
          keywords: 'group_by chunk tally 集計 グループ化',
          desc: `\`group_by\` はキーでグルーピング、\`chunk\` は連続する同値要素をまとめる、\`tally\` は Ruby 2.7+ で各要素の出現回数を数える。`,
          code: [
            {
              lang: 'Ruby',
              code: `words = %w[one two three four five six]
p words.group_by { |w| w.length }
# => {3=>["one","two","six"], 4=>["four","five"], 5=>["three"]}

p [1, 1, 2, 2, 1, 3].chunk { |n| n }.map { |k, v| [k, v.size] }
# => [[1,2],[2,2],[1,1],[3,1]]

p %w[a b a a c b].tally
# => {"a"=>3, "b"=>2, "c"=>1}`,
            },
          ],
        },
        {
          id: 's10-lazy',
          name: 'lazy とチェーン',
          level: 'basic',
          keywords: 'lazy 遅延評価 Enumerator::Lazy chain first',
          desc: `\`lazy\` は遅延評価の Enumerator を返す。無限シーケンスに対して \`map\`/\`select\` を適用し、必要な分だけ \`first\` や \`take\` で取り出せる。`,
          code: [
            {
              lang: 'Ruby',
              code: `# 無限の自然数から偶数の先頭 5 つ
result = (1..Float::INFINITY)
           .lazy
           .select { |n| n.even? }
           .map    { |n| n ** 2 }
           .first(5)

p result   # => [4, 16, 36, 64, 100]`,
            },
          ],
          output: `[4, 16, 36, 64, 100]`,
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s11: Proc・lambda・クロージャ
    // ─────────────────────────────────────────────
    {
      id: 's11',
      num: 11,
      title: 'Proc・lambda・クロージャ',
      level: 'basic',
      items: [
        {
          id: 's11-proc-vs-lambda',
          name: 'Proc と lambda の違い',
          level: 'basic',
          keywords: 'Proc lambda return 引数チェック arity lambda?',
          desc: `主な違いは 2 点。(1) 引数の数: lambda は厳密チェック、Proc は余剰・不足を許容。(2) return の挙動: lambda はラムダ内のみ、Proc は呼び出し元メソッドごとリターン。`,
          code: [
            {
              lang: 'Ruby',
              code: `lam = lambda { |x, y| x + y }
prc = Proc.new { |x, y| [x, y].inspect }

p lam.call(1, 2)     # => 3
# lam.call(1)        # ArgumentError

p prc.call(1, 2)     # => "[1, 2]"
p prc.call(1)        # => "[1, nil]"  ← 不足は nil 扱い
p prc.call(1, 2, 3)  # => "[1, 2]"   ← 余剰は無視`,
            },
          ],
          output: `3
"[1, 2]"
"[1, nil]"
"[1, 2]"`,
        },
        {
          id: 's11-アンパサンド',
          name: '& 演算子（ブロック ⇔ Proc / メソッド参照）',
          level: 'basic',
          keywords: '& アンパサンド ブロック Proc method to_proc',
          desc: `\`&\` でブロックを Proc に変換、または Proc/Method をブロックとして渡せる。\`method(:name)\` でメソッドを Method オブジェクトとして取り出せる。`,
          code: [
            {
              lang: 'Ruby',
              code: `# Proc をブロックとして渡す
double = ->(n) { n * 2 }
p [1, 2, 3].map(&double)        # => [2, 4, 6]

# Symbol#to_proc を利用（&:メソッド名）
p ["hello", "world"].map(&:upcase)  # => ["HELLO", "WORLD"]
p [1, 2, 3].select(&:odd?)          # => [1, 3]

# method() でメソッド参照
p [1, -2, 3].map(&method(:puts))`,
            },
          ],
          output: `[2, 4, 6]
["HELLO", "WORLD"]
[1, 3]`,
        },
        {
          id: 's11-curry',
          name: 'カリー化（curry）',
          level: 'basic',
          keywords: 'curry カリー化 部分適用 partial application',
          desc: `\`curry\` で Proc/lambda をカリー化する。引数を 1 つずつ渡して部分適用でき、全引数が揃った時点で評価される。`,
          code: [
            {
              lang: 'Ruby',
              code: `add = ->(a, b) { a + b }
add5 = add.curry.(5)   # 第1引数に 5 を固定

p add5.(3)    # => 8
p add5.(10)   # => 15

multiply = ->(a, b, c) { a * b * c }.curry
double_then = multiply.(2).(3)   # a=2, b=3 で固定
p double_then.(4)   # => 24`,
            },
          ],
          output: `8
15
24`,
        },
        {
          id: 's11-クロージャ',
          name: 'クロージャと変数キャプチャ',
          level: 'basic',
          keywords: 'クロージャ closure キャプチャ 変数 環境',
          desc: `ブロック・Proc・lambda はすべてクロージャ。定義された時点の変数スコープを「キャプチャ」し、後から参照・変更できる。`,
          code: [
            {
              lang: 'Ruby',
              code: `def make_counter(start = 0)
  count = start
  inc   = -> { count += 1; count }
  dec   = -> { count -= 1; count }
  get   = -> { count }
  [inc, dec, get]
end

inc, dec, get = make_counter(10)
inc.()
inc.()
dec.()
p get.()   # => 11  （外の count を共有している）`,
            },
          ],
          output: `11`,
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s12: ファイル・IO
    // ─────────────────────────────────────────────
    {
      id: 's12',
      num: 12,
      title: 'ファイル・IO',
      level: 'basic',
      items: [
        {
          id: 's12-File',
          name: 'File.open / read / write',
          level: 'basic',
          keywords: 'File.open read write ブロック クローズ',
          desc: `\`File.open\` にブロックを渡すとブロック終了時に自動でクローズする（\`ensure\` 不要）。\`File.read\` / \`File.write\` は一括読み書きの短縮形。`,
          code: [
            {
              lang: 'Ruby',
              code: `# 書き込み
File.write("hello.txt", "Hello, Ruby!\\n")

# 読み取り（全体）
content = File.read("hello.txt")
puts content   # => Hello, Ruby!

# 行ごとに読み取り（自動クローズ）
File.open("hello.txt") do |f|
  f.each_line { |line| puts line.chomp }
end

# 追記
File.open("hello.txt", "a") { |f| f.puts "2行目" }`,
            },
          ],
        },
        {
          id: 's12-IO',
          name: 'IO クラスと $stdin / $stdout',
          level: 'basic',
          keywords: 'IO stdin stdout stderr gets puts print STDIN STDOUT',
          desc: `\`$stdin\`・\`$stdout\`・\`$stderr\` はグローバルな IO オブジェクト。テストやリダイレクトで差し替えられる。\`STDIN\` は定数でリダイレクト不可。`,
          code: [
            {
              lang: 'Ruby',
              code: `# 標準出力への書き込み
$stdout.puts "標準出力"
$stderr.puts "エラー出力"

# StringIO でキャプチャ（テスト等）
require 'stringio'
buf = StringIO.new
$stdout = buf
puts "captured"
$stdout = STDOUT
p buf.string   # => "captured\\n"`,
            },
          ],
        },
        {
          id: 's12-CSV-JSON',
          name: 'CSV・JSON ライブラリ',
          level: 'basic',
          keywords: 'CSV JSON 標準ライブラリ require parse',
          desc: `\`csv\`・\`json\` は標準ライブラリ（gem 不要）。\`CSV.foreach\` は大きなファイルを行ごとにストリーム処理できる。`,
          code: [
            {
              lang: 'Ruby',
              code: `require 'csv'
require 'json'

# JSON
data = { name: "Alice", scores: [90, 85] }
json_str = JSON.generate(data)
p JSON.parse(json_str, symbolize_names: true)
# => {name:"Alice", scores:[90,85]}

# CSV（文字列から）
csv_str = "name,age\\nAlice,30\\nBob,25"
CSV.parse(csv_str, headers: true) do |row|
  puts "\#{row['name']}: \#{row['age']}"
end`,
            },
          ],
          output: `{:name=>"Alice", :scores=>[90, 85]}
Alice: 30
Bob: 25`,
        },
        {
          id: 's12-Dir-Pathname',
          name: 'Dir と Pathname',
          level: 'basic',
          keywords: 'Dir Pathname glob mkdir_p join exist?',
          desc: `\`Dir.glob\` でファイルパターン検索、\`Pathname\` はパスを OOP 的に操作できるラッパー。\`FileUtils\` と組み合わせてディレクトリ操作に使う。`,
          code: [
            {
              lang: 'Ruby',
              code: `require 'pathname'

# Dir.glob でファイル列挙
Dir.glob("**/*.rb").first(3).each { |f| puts f }

# Pathname で OOP 的なパス操作
base = Pathname.new("/tmp/myapp")
config = base / "config" / "app.yml"
p config.to_s          # => "/tmp/myapp/config/app.yml"
p config.dirname       # => #<Pathname:/tmp/myapp/config>
p config.extname       # => ".yml"
p config.exist?        # => false（ファイルがなければ）`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s13: 正規表現
    // ─────────────────────────────────────────────
    {
      id: 's13',
      num: 13,
      title: '正規表現',
      level: 'basic',
      items: [
        {
          id: 's13-リテラルとRegexp',
          name: 'リテラル（/pattern/i）と Regexp.new',
          level: 'basic',
          keywords: '正規表現 リテラル Regexp.new フラグ i m x',
          desc: `正規表現は \`/pattern/\` リテラルで書くのが基本。\`i\` で大小文字無視、\`m\` で \`.が改行にもマッチ\`、\`x\` で空白・コメントを無視できる。`,
          code: [
            {
              lang: 'Ruby',
              code: `p /hello/i === "Hello World"   # => true

# Regexp.new（動的パターン）
word = "ruby"
re = Regexp.new(word, Regexp::IGNORECASE)
p re === "I love Ruby"   # => true

# x オプションで可読性向上
tel = /
  \\A        # 先頭
  (\\d{2,4}) # 市外局番
  -
  (\\d{2,4}) # 市内局番
  -
  (\\d{4})   # 番号
  \\z        # 末尾
/x
p tel.match?("03-1234-5678")   # => true`,
            },
          ],
          output: `true
true
true`,
        },
        {
          id: 's13-マッチ操作',
          name: '=~ / match / scan / gsub',
          level: 'basic',
          keywords: '=~ match scan gsub sub 置換 マッチ',
          desc: `\`=~\` はマッチした位置（整数）または \`nil\` を返す。\`match\` は MatchData、\`scan\` は全マッチを配列で返す。\`gsub\` はブロックで動的置換が可能。`,
          code: [
            {
              lang: 'Ruby',
              code: `str = "Ruby 3.3 released in 2024"

p str =~ /\\d+/          # => 5（最初のマッチ位置）
p str.match(/\\d+/)[0]   # => "3"

p str.scan(/\\d+/)        # => ["3", "3", "2024"]

# gsub でブロック置換
p str.gsub(/\\d+/) { |m| "(#{m})" }
# => "Ruby (3).(3) released in (2024)"`,
            },
          ],
          output: `5
"3"
["3", "3", "2024"]
"Ruby (3).(3) released in (2024)"`,
        },
        {
          id: 's13-キャプチャグループ',
          name: 'キャプチャグループと $1, $2',
          level: 'basic',
          keywords: 'キャプチャ グループ $1 $2 MatchData',
          desc: `\`()\` でグループを作りキャプチャする。\`=~\` でマッチ後は \`$1\`・\`$2\` などのグローバル変数でアクセスできる。\`match\` の戻り値からも取得可能。`,
          code: [
            {
              lang: 'Ruby',
              code: `if "2024-05-13" =~ /(\\d{4})-(\\d{2})-(\\d{2})/
  puts "年: \#{$1}, 月: \#{$2}, 日: \#{$3}"
end

m = "John Doe".match(/(\\w+)\\s(\\w+)/)
p m[0]   # => "John Doe"
p m[1]   # => "John"
p m[2]   # => "Doe"`,
            },
          ],
          output: `年: 2024, 月: 05, 日: 13
"John Doe"
"John"
"Doe"`,
        },
        {
          id: 's13-named-capture',
          name: 'named captures（(?<name>...)）',
          level: 'basic',
          keywords: 'named capture 名前付きキャプチャ ?< MatchData',
          desc: `\`(?<name>...)\` で名前付きキャプチャを定義できる。インデックスより意図が明確になる。\`match\` の MatchData から \`m[:name]\` でアクセス。`,
          code: [
            {
              lang: 'Ruby',
              code: `pattern = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/
m = "2024-05-13".match(pattern)

p m[:year]   # => "2024"
p m[:month]  # => "05"
p m[:day]    # => "13"
p m.named_captures
# => {"year"=>"2024", "month"=>"05", "day"=>"13"}`,
            },
          ],
          output: `"2024"
"05"
"13"
{"year"=>"2024", "month"=>"05", "day"=>"13"}`,
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s14: 標準ライブラリ・Gem
    // ─────────────────────────────────────────────
    {
      id: 's14',
      num: 14,
      title: '標準ライブラリ・Gem',
      level: 'basic',
      items: [
        {
          id: 's14-Bundler-Gemfile',
          name: 'Bundler と Gemfile',
          level: 'basic',
          keywords: 'Bundler Gemfile gem install bundle exec Gemfile.lock',
          desc: `\`Bundler\` は gem の依存管理ツール。\`Gemfile\` に依存を記述し \`bundle install\` で \`Gemfile.lock\` を生成する。\`bundle exec\` でロックされたバージョンを使用。`,
          code: [
            {
              lang: 'Ruby',
              code: `# Gemfile
source "https://rubygems.org"

ruby "3.3.0"

gem "rails",   "~> 7.1"
gem "pg",      "~> 1.5"
gem "puma",    "~> 6.0"

group :development, :test do
  gem "rspec-rails"
  gem "factory_bot_rails"
end`,
            },
          ],
        },
        {
          id: 's14-rake',
          name: 'Rake（タスクランナー）',
          level: 'basic',
          keywords: 'Rake task desc namespace Rakefile',
          desc: `Ruby の標準的なタスクランナー。\`Rakefile\` に \`task\` を定義し \`rake タスク名\` で実行する。\`namespace\` でタスクをグループ化できる。`,
          code: [
            {
              lang: 'Ruby',
              code: `# Rakefile
require 'rake'

desc "データベースをリセットする"
task :db_reset do
  puts "DB をリセット中..."
end

namespace :assets do
  desc "アセットをビルドする"
  task :build do
    puts "アセットをビルド中..."
  end
end

# $ rake db_reset
# $ rake assets:build`,
            },
          ],
        },
        {
          id: 's14-Net-HTTP-URI',
          name: 'Net::HTTP と URI',
          level: 'basic',
          keywords: 'Net::HTTP URI HTTP GET POST リクエスト',
          desc: `標準ライブラリの \`Net::HTTP\` で HTTP リクエストを送れる。単純な GET には \`Net::HTTP.get\` が便利。より複雑な用途には \`Faraday\` や \`HTTParty\` gem が一般的。`,
          code: [
            {
              lang: 'Ruby',
              code: `require 'net/http'
require 'uri'
require 'json'

uri = URI("https://api.github.com/users/ruby")
response = Net::HTTP.start(uri.host, uri.port, use_ssl: true) do |http|
  req = Net::HTTP::Get.new(uri)
  req["Accept"] = "application/json"
  http.request(req)
end

p response.code   # => "200"
user = JSON.parse(response.body)
p user["public_repos"]`,
            },
          ],
        },
        {
          id: 's14-pp-benchmark-optparse',
          name: 'pp / benchmark / optparse',
          level: 'basic',
          keywords: 'pp benchmark optparse デバッグ 計測 コマンドライン引数',
          desc: `\`pp\` は構造をわかりやすく出力するデバッグ用メソッド（\`print pretty\`）。\`Benchmark\` は実行時間計測、\`OptionParser\` はコマンドライン引数解析に使う。`,
          code: [
            {
              lang: 'Ruby',
              code: `require 'benchmark'
require 'optparse'

# Benchmark
Benchmark.bm(10) do |x|
  x.report("Array#sum:") { (1..100_000).to_a.sum }
  x.report("inject:   ") { (1..100_000).inject(:+) }
end

# OptionParser
options = {}
OptionParser.new do |opts|
  opts.on("-n NAME", "名前") { |v| options[:name] = v }
  opts.on("-v", "--verbose")  { options[:verbose] = true }
end.parse!(ARGV)
pp options`,
            },
          ],
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s15: メタプログラミング
    // ─────────────────────────────────────────────
    {
      id: 's15',
      num: 15,
      title: 'メタプログラミング',
      level: 'advanced',
      items: [
        {
          id: 's15-method_missing',
          name: 'method_missing と respond_to_missing?',
          level: 'advanced',
          keywords: 'method_missing respond_to_missing? 動的ディスパッチ',
          desc: `\`method_missing\` は存在しないメソッドが呼ばれた際に呼び出される。必ず \`respond_to_missing?\` もオーバーライドして \`respond_to?\` の整合性を保つ。`,
          code: [
            {
              lang: 'Ruby',
              code: `class DynamicProxy
  def initialize(target) = (@target = target)

  def method_missing(name, *args, &block)
    if @target.respond_to?(name)
      puts "[呼び出し] \#{name}(\#{args.join(', ')})"
      @target.send(name, *args, &block)
    else
      super
    end
  end

  def respond_to_missing?(name, include_private = false)
    @target.respond_to?(name) || super
  end
end

proxy = DynamicProxy.new([1, 2, 3])
p proxy.length    # [呼び出し] length => 3
p proxy.respond_to?(:length)   # => true`,
            },
          ],
          output: `[呼び出し] length()
3
true`,
          warn: `\`method_missing\` は NoMethodError をキャッチするため、タイポによるエラーが隠れやすい。可能なら \`define_method\` で明示的に定義する方が安全。`,
        },
        {
          id: 's15-define_method',
          name: 'define_method / class_eval / instance_eval',
          level: 'advanced',
          keywords: 'define_method class_eval instance_eval 動的メソッド定義',
          desc: `\`define_method\` は実行時にメソッドを動的に定義する。\`class_eval\` はクラスのコンテキストでコードを評価、\`instance_eval\` はオブジェクトのコンテキストで評価する。`,
          code: [
            {
              lang: 'Ruby',
              code: `class Report
  %w[pdf csv html].each do |fmt|
    define_method("export_\#{fmt}") do
      "Exporting as \#{fmt.upcase}"
    end
  end
end

r = Report.new
p r.export_pdf   # => "Exporting as PDF"
p r.export_csv   # => "Exporting as CSV"

# class_eval で既存クラスに後付け
String.class_eval do
  def palindrome? = self == self.reverse
end

p "racecar".palindrome?   # => true`,
            },
          ],
          output: `"Exporting as PDF"
"Exporting as CSV"
true`,
        },
        {
          id: 's15-send',
          name: 'send / public_send / tap / then',
          level: 'advanced',
          keywords: 'send public_send tap then yield_self 動的呼び出し',
          desc: `\`send\` は private メソッドも呼べる動的ディスパッチ。\`public_send\` は public のみ。\`tap\` はデバッグや中間処理に、\`then\`（\`yield_self\`）はパイプライン的な変換に使う。`,
          code: [
            {
              lang: 'Ruby',
              code: `"hello".send(:upcase)          # => "HELLO"
"hello".public_send(:upcase)   # => "HELLO"

# tap: 値を変えずに副作用（デバッグ等）
result = [1, 2, 3]
  .tap { |a| p "before: \#{a}" }
  .map { |n| n * 2 }
  .tap { |a| p "after: \#{a}" }

# then（yield_self）: パイプライン変換
"  42  "
  .then { |s| s.strip }
  .then { |s| Integer(s) }
  .then { |n| n * 2 }
  .tap  { |n| p n }   # => 84`,
            },
          ],
          output: `"before: [1, 2, 3]"
"after: [2, 4, 6]"
84`,
        },
        {
          id: 's15-freeze-dup-clone',
          name: 'Object#freeze / dup / clone',
          level: 'advanced',
          keywords: 'freeze dup clone frozen? FrozenError 不変',
          desc: `\`freeze\` でオブジェクトを凍結（変更不可）。\`dup\` は freeze を解除したコピーを作る（シャローコピー）。\`clone\` は freeze 状態を保持したコピーを作る。`,
          code: [
            {
              lang: 'Ruby',
              code: `str = "hello".freeze
p str.frozen?       # => true

# str << " world"   # FrozenError

copy_dup   = str.dup
copy_clone = str.clone

p copy_dup.frozen?    # => false（freeze 解除）
p copy_clone.frozen?  # => true（freeze 保持）

copy_dup << " world"
p copy_dup   # => "hello world"`,
            },
          ],
          output: `true
false
true
"hello world"`,
        },
      ],
    },
    // ─────────────────────────────────────────────
    // s16: Ruby の型とパフォーマンス
    // ─────────────────────────────────────────────
    {
      id: 's16',
      num: 16,
      title: 'Ruby の型とパフォーマンス',
      level: 'advanced',
      items: [
        {
          id: 's16-duck-typing',
          name: 'Duck typing の哲学',
          level: 'advanced',
          keywords: 'duck typing ダックタイピング respond_to? インターフェース',
          desc: `「アヒルのように歩き、アヒルのように鳴くなら、それはアヒルだ」。型ではなくメソッドの存在でオブジェクトを扱う。\`respond_to?\` で能力の確認が可能。`,
          code: [
            {
              lang: 'Ruby',
              code: `def print_length(obj)
  if obj.respond_to?(:length)
    puts "長さ: \#{obj.length}"
  else
    puts "length をサポートしていません"
  end
end

print_length("hello")    # => 長さ: 5
print_length([1, 2, 3])  # => 長さ: 3
print_length({ a: 1 })   # => 長さ: 1
print_length(42)          # => length をサポートしていません`,
            },
          ],
          output: `長さ: 5
長さ: 3
長さ: 1
length をサポートしていません`,
        },
        {
          id: 's16-RBS-steep',
          name: 'RBS（型定義ファイル）と steep',
          level: 'advanced',
          keywords: 'RBS steep 型定義 静的解析 型チェック',
          desc: `Ruby 3.0 以降は RBS（Ruby Signature）で型定義を別ファイルに記述できる。\`steep\` ツールで静的型チェックを実施する。`,
          code: [
            {
              lang: 'Ruby',
              code: `# person.rbs（型定義ファイル）
# class Person
#   attr_reader name: String
#   attr_reader age: Integer
#   def initialize: (name: String, age: Integer) -> void
#   def greet: () -> String
# end

# person.rb（実装）
class Person
  attr_reader :name, :age

  def initialize(name:, age:)
    @name = name
    @age  = age
  end

  def greet = "Hello, I'm \#{name}!"
end

# $ steep check  で型エラーを検出`,
            },
          ],
        },
        {
          id: 's16-frozen-string-literal',
          name: 'Frozen string literal',
          level: 'advanced',
          keywords: 'frozen_string_literal freeze 文字列 メモリ最適化',
          desc: `ファイル先頭に \`# frozen_string_literal: true\` を付けると全文字列リテラルが自動 freeze される。文字列オブジェクトの生成が減りメモリ効率が向上する。`,
          code: [
            {
              lang: 'Ruby',
              code: `# frozen_string_literal: true

s = "hello"
p s.frozen?   # => true

# s << " world"  # FrozenError

# ミュータブルな文字列が必要なら String.new か +""
mutable = +"hello"
mutable << " world"
p mutable   # => "hello world"`,
            },
          ],
          output: `true
"hello world"`,
          warn: `既存コードベースに後から付けると文字列への代入箇所が FrozenError になる可能性がある。新規ファイルに付けるのが安全。Rails 7 以降はデフォルトで有効。`,
        },
        {
          id: 's16-GC',
          name: 'ガベージコレクション（Incremental GC / Major・Minor GC）',
          level: 'advanced',
          keywords: 'GC ガベージコレクション Incremental Major Minor ObjectSpace',
          desc: `Ruby の GC は世代別 GC（Minor: 若い世代、Major: 全世代）と Incremental GC（Ruby 2.2+）を採用。長いポーズを分割して STW（Stop-The-World）を最小化する。`,
          code: [
            {
              lang: 'Ruby',
              code: `# GC の統計情報
p GC.stat.slice(:count, :major_gc_count, :minor_gc_count)

# 手動 GC（通常は不要）
GC.start

# ObjectSpace で生きているオブジェクト数を確認
require 'objspace'
p ObjectSpace.count_objects.slice(:T_STRING, :T_ARRAY, :T_HASH)

# GC.compact（Ruby 3.0+）でヒープをコンパクション
GC.compact`,
            },
          ],
          warn: `\`GC.compact\` はオブジェクトのアドレスが変わるため、C 拡張が Raw ポインタを保持していると問題が起きる場合がある。本番投入前に十分なテストを行うこと。`,
        },
      ],
    },
  ],
};

export default data;
