import type { LanguageGuide } from '../../types';

const data: LanguageGuide = {
  lang: 'Python',
  langSlug: 'python',
  version: 'Python 3.12',
  lead: `他言語の経験者が 2〜3 時間でざっと読み通せるリファレンスです。Python 固有の注意点は「要注意」ボックスで強調しています。`,
  accent: '#306998',
  accent2: '#ffd43b',
  bgGradientTop: '#f0f6fc',
  bgRadialLeft: 'rgba(48,105,152,0.15)',
  bgRadialRight: 'rgba(255,212,59,0.18)',
  badgeGradient: 'linear-gradient(135deg, #306998, #ffd43b)',
  heroEmoji: '🐍',
  navGroups: [
    { label: '基礎', sections: ['s1', 's2', 's3', 's4', 's5', 's6'] },
    { label: 'オブジェクト指向', sections: ['s7', 's8'] },
    { label: '実用', sections: ['s9', 's10', 's11'] },
    { label: '応用', sections: ['s12', 's13', 's14', 's15', 's16'] },
  ],
  sections: [
    {
      id: 's1',
      num: 1,
      title: '変数とデータ型',
      level: 'basic',
      items: [
        {
          id: 's1-変数の宣言と基本型',
          name: '変数の宣言と基本型',
          level: 'basic',
          keywords: '変数 宣言 代入 int str float bool none 型',
          desc: `型宣言は不要。\`=\` で代入するだけで変数が作られ、型は代入値から自動決定される（動的型付け）。\`type()\` で型を確認できる。`,
          code: [
          { lang: 'PYTHON', code: `name    = "Alice"    # str
age     = 30         # int
height  = 1.68       # float
is_admin = True      # bool（True / False は大文字始まり）
nothing  = None      # NoneType

print(type(age))     # 
print(type(nothing)) #` },
          ],
          output: `<class 'int'>
<class 'NoneType'>`,
        },
        {
          id: 's1-none-の扱い',
          name: 'None の扱い',
          level: 'basic',
          keywords: 'none null 空値 is',
          desc: `他言語の \`null\` / \`nil\` に相当。\`None\` は言語全体で唯一のオブジェクトであるため、等値比較ではなく同一性比較 \`is None\` を使うのが慣習。`,
          warn: `\`x == None\` は動作するが非推奨。\`x is None\` / \`x is not None\` を使う。\`__eq__\` をオーバーライドしたオブジェクトでは \`==\` が意図しない結果を返す可能性があるため。`,
        },
        {
          id: 's1-型変換-キャスト',
          name: '型変換（キャスト）',
          level: 'basic',
          keywords: '型変換 キャスト int str float bool',
          desc: `組み込み関数で型を相互変換する。文字列→数値の変換が失敗すると \`ValueError\` が発生する。`,
          code: [
          { lang: 'PYTHON', code: `int("42")        # → 42
float("3.14")    # → 3.14
str(100)         # → "100"
bool(0)          # → False  ← 0, "", None, [], {} は False
bool("hello")    # → True   ← 上記以外はほぼ True` },
          ],
        },
        {
          id: 's1-f-string-文字列補間',
          name: 'f-string（文字列補間）',
          level: 'basic',
          keywords: 'fstring f文字列 フォーマット 文字列補間 書式',
          desc: `Python 3.6+ の推奨フォーマット方法。\`f"...{式}..."\` の形式で変数や式をそのまま埋め込める。\`:\` で書式指定も可能。`,
          code: [
          { lang: 'PYTHON', code: `name  = "Bob"
score = 87.456

print(f"名前: {name}")
print(f"スコア: {score:.2f}")    # 小数2桁
print(f"合否: {'合格' if score >= 60 else '不合格'}")
print(f"{score = }")             # Python 3.8+: デバッグ用（変数名も表示）` },
          ],
          output: `名前: Bob
スコア: 87.46
合否: 合格
score = 87.456`,
        },
        {
          id: 's1-主要な文字列メソッド',
          name: '主要な文字列メソッド',
          level: 'basic',
          keywords: '文字列 メソッド split join strip replace upper lower',
          desc: `文字列はイミュータブル（変更不可）。メソッドはすべて新しい文字列を返す。`,
          code: [
          { lang: 'PYTHON', code: `s = "  Hello, World!  "

s.strip()               # "Hello, World!"（両端の空白除去）
s.lower()               # "  hello, world!  "
"hello".upper()         # "HELLO"
"a,b,c".split(",")      # ["a", "b", "c"]
"-".join(["a","b","c"]) # "a-b-c"
"hello".replace("l","L")# "heLLo"
"hello".startswith("he")# True
"hello".find("ll")      # 2（見つからない場合 -1）` },
          ],
        },
        {
          id: 's1-数値リテラルと複素数',
          name: '数値リテラルと複素数',
          level: 'basic',
          keywords: '数値 リテラル 2進数 16進数 アンダースコア 複素数',
          desc: `整数は任意精度（桁あふれなし）。アンダースコアで桁区切りができる。複素数は \`j\` サフィックスで表現。`,
          code: [
          { lang: 'PYTHON', code: `1_000_000     # 1000000（可読性のための区切り）
0b1010        # 10（2進数）
0o17          # 15（8進数）
0xFF          # 255（16進数）
3 + 4j        # 複素数  → (3+4j)
(3+4j).real   # 3.0
(3+4j).imag   # 4.0` },
          ],
        },
        {
          id: 's1-定数の慣習',
          name: '定数の慣習',
          level: 'basic',
          keywords: '定数 大文字 スネークケース 慣習',
          desc: `Python に定数構文はない。慣習として大文字スネークケースで記述し、変更しないことを表す。`,
          code: [
          { lang: 'PYTHON', code: `MAX_RETRY  = 3
BASE_URL   = "https://example.com"
PI         = 3.14159265358979` },
          ],
        },
      ],
    },
    {
      id: 's2',
      num: 2,
      title: '演算子',
      level: 'basic',
      items: [
        {
          id: 's2-算術演算子',
          name: '算術演算子',
          level: 'basic',
          keywords: '算術 演算子 足し算 掛け算 割り算 余り 累乗 整数除算',
          desc: `\`/\` は常に float を返す点に注意。整数除算は \`//\`、余りは \`%\`、累乗は \`**\`。`,
          code: [
          { lang: 'PYTHON', code: `10 / 3    # 3.3333...（float）
10 // 3   # 3        （切り捨て除算）
10 % 3    # 1        （余り）
2 ** 10   # 1024     （累乗）
-7 // 2   # -4       ← 負数は「小さい方向」に切り捨て（注意）
-7 % 2    # 1        ← 符号は除数に合わせる（C/Java と異なる）` },
          ],
          warn: `負数の \`//\` と \`%\` はゼロ方向でなく負の無限大方向に切り捨てる。\`-7 // 2\` は \`-4\`（C/Java の \`-3\` とは異なる）。`,
        },
        {
          id: 's2-比較演算子・連鎖比較',
          name: '比較演算子・連鎖比較',
          level: 'basic',
          keywords: '比較 演算子 等値 不等 連鎖',
          desc: `比較演算子は連鎖して書ける（多くの言語にない Python の特徴）。`,
          code: [
          { lang: 'PYTHON', code: `x = 5
1 < x < 10      # True（連鎖比較）
1 < x and x < 10 # 上と同じ意味だが冗長

"abc" == "abc"  # True
"abc" != "ABC"  # True` },
          ],
        },
        {
          id: 's2-論理演算子',
          name: '論理演算子',
          level: 'basic',
          keywords: '論理演算子 and or not 短絡評価',
          desc: `\`&&\` / \`||\` ではなく \`and\` / \`or\` / \`not\` キーワードを使う。短絡評価（ショートサーキット）が適用される。`,
          code: [
          { lang: 'PYTHON', code: `True and False  # False
True or False   # True
not True        # False

# 短絡評価 → 値を返す（bool に変換しない）
0 or "default"   # "default"（0 は falsy なので右辺を返す）
"hi" or "default"# "hi"    （"hi" は truthy なので左辺を返す）
None and do_something()  # do_something() は呼ばれない` },
          ],
          warn: `\`or\` / \`and\` は \`True\`/\`False\` ではなく「短絡した側のオペランド自体」を返す。\`x = value or default\` というパターンはよく使われるが、\`value\` が \`0\` や \`""\` のときも \`default\` に置き換わるため注意。`,
        },
        {
          id: 's2-is-vs-同一性と等値性',
          name: 'is vs ==（同一性と等値性）',
          level: 'basic',
          keywords: 'is == 同一性 等値性 id',
          desc: `\`==\` は値が等しいか（\`__eq__\`）、\`is\` はメモリ上の同一オブジェクトかを比較する。`,
          code: [
          { lang: 'PYTHON', code: `a = [1, 2, 3]
b = [1, 2, 3]
c = a

a == b   # True  （値が同じ）
a is b   # False （別オブジェクト）
a is c   # True  （同じオブジェクトを参照）

# 小さい整数（-5〜256）はキャッシュされるため is が True になることがある
# → 数値・文字列の比較に is を使うのは NG` },
          ],
          warn: `\`is\` を使っていい場面は \`None\`・\`True\`・\`False\` との比較のみ。数値や文字列の比較に \`is\` を使うと、実装依存のキャッシュ挙動に頼ることになり信頼性がない。`,
        },
        {
          id: 's2-in-not-in-帰属演算子',
          name: 'in / not in（帰属演算子）',
          level: 'basic',
          keywords: 'in not in 帰属 含む',
          desc: `リスト・文字列・辞書などに要素が含まれるかを確認する。辞書では「キー」を検索する。`,
          code: [
          { lang: 'PYTHON', code: `"py" in "python"         # True
3 in [1, 2, 3, 4]        # True
"key" in {"key": 1}      # True（辞書はキーを検索）
"key" not in {"x": 1}    # True` },
          ],
        },
        {
          id: 's2-条件式-三項演算子',
          name: '条件式（三項演算子）',
          level: 'basic',
          keywords: '三項演算子 条件式 三項',
          desc: `他言語の \`条件 ? 真 : 偽\` に相当。Python では \`真の値 if 条件 else 偽の値\` の語順になる。`,
          code: [
          { lang: 'PYTHON', code: `x = 10
label = "正" if x > 0 else "非正"
print(label)  # "正"` },
          ],
        },
        {
          id: 's2-ウォルラス演算子-python-3-8',
          name: 'ウォルラス演算子:=（Python 3.8+）',
          level: 'advanced',
          keywords: 'ウォルラス := 代入式 3.8',
          desc: `式の中で変数へ代入しつつ値を返す「代入式」。\`while\` の条件や内包表記で中間値を再利用するときに便利。`,
          code: [
          { lang: 'PYTHON', code: `import re

# 通常の書き方
m = re.search(r"\\d+", "abc123")
if m:
    print(m.group())

# ウォルラス演算子で1行に
if m := re.search(r"\\d+", "abc123"):
    print(m.group())   # "123"` },
          ],
        },
        {
          id: 's2-ビット演算子',
          name: 'ビット演算子',
          level: 'advanced',
          keywords: 'ビット演算子 & | ^ ~ << >>',
          desc: `整数のビット操作。他言語と同様だが、Python の整数は任意精度なので符号付き固定幅ビットの概念はない。`,
          code: [
          { lang: 'PYTHON', code: `0b1100 & 0b1010  # 0b1000 = 8  （AND）
0b1100 | 0b1010  # 0b1110 = 14 （OR）
0b1100 ^ 0b1010  # 0b0110 = 6  （XOR）
~0b1100          # -13         （NOT：-(n+1)）
1 << 4           # 16          （左シフト）
16 >> 2          # 4           （右シフト）` },
          ],
        },
      ],
    },
    {
      id: 's3',
      num: 3,
      title: '制御フロー',
      level: 'basic',
      items: [
        {
          id: 's3-if-elif-else',
          name: 'if / elif / else',
          level: 'basic',
          keywords: 'if elif else 条件分岐 インデント',
          desc: `ブロックは \`{}\` ではなくインデント（スペース4つが慣習）で表現する。\`else if\` ではなく \`elif\`。`,
          code: [
          { lang: 'PYTHON', code: `score = 72

if score >= 90:
    grade = "優"
elif score >= 70:
    grade = "良"
elif score >= 50:
    grade = "可"
else:
    grade = "不可"

print(grade)  # 良` },
          ],
          output: `良`,
          warn: `インデントの深さがブロックを決定する。タブとスペースを混在させると \`TabError\` になる。プロジェクト全体でスペース4つに統一するのが標準（PEP 8）。`,
        },
        {
          id: 's3-for-ループ・range・enumerate',
          name: 'for ループ・range・enumerate',
          level: 'basic',
          keywords: 'for ループ range enumerate イテラブル',
          desc: `任意のイテラブルを反復する。C 系のインデックスループより \`for x in collection\` が基本スタイル。インデックスが必要なら \`enumerate()\` を使う。`,
          code: [
          { lang: 'PYTHON', code: `fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(fruit)

# インデックス付き（start で開始番号を変更可）
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}: {fruit}")

# 数値ループ：range(start, stop, step)
for n in range(0, 10, 2):
    print(n, end=" ")  # 0 2 4 6 8` },
          ],
          output: `apple
banana
cherry
1: apple
2: banana
3: cherry
0 2 4 6 8`,
        },
        {
          id: 's3-while-break-continue',
          name: 'while / break / continue',
          level: 'basic',
          keywords: 'while break continue ループ',
          desc: `条件が \`True\` の間ループを続ける。\`break\` で即時終了、\`continue\` で次の反復へスキップ。`,
          code: [
          { lang: 'PYTHON', code: `n = 0
while n < 10:
    n += 1
    if n % 2 == 0:
        continue    # 偶数はスキップ
    if n > 7:
        break       # 7 を超えたら終了
    print(n, end=" ")  # 1 3 5 7` },
          ],
          output: `1 3 5 7`,
        },
        {
          id: 's3-for-while-の-else-節',
          name: 'for / while の else 節',
          level: 'basic',
          keywords: 'for else while else ループ else 節',
          desc: `Python 固有の構文。ループが \`break\` されずに正常終了したときだけ \`else\` ブロックが実行される。「検索して見つからなかった場合」の処理に使える。`,
          code: [
          { lang: 'PYTHON', code: `target = 7
for n in [1, 3, 5, 9]:
    if n == target:
        print("見つかった")
        break
else:
    print("見つからなかった")  # break されなかったので実行される` },
          ],
          output: `見つからなかった`,
        },
        {
          id: 's3-pass-文',
          name: 'pass 文',
          level: 'basic',
          keywords: 'pass 空 プレースホルダ',
          desc: `何もしないプレースホルダ。Python ではブロックを空にできないため、スタブや一時的な空実装に使う。`,
          code: [
          { lang: 'PYTHON', code: `def todo_later():
    pass   # あとで実装する

class EmptyClass:
    pass` },
          ],
        },
        {
          id: 's3-match-case-python-3-10',
          name: 'match / case（Python 3.10+）',
          level: 'advanced',
          keywords: 'match case パターンマッチ switch 3.10',
          desc: `構造的パターンマッチング。値だけでなくオブジェクトの構造・型にも対応できる点が他言語の \`switch\` と異なる。`,
          code: [
          { lang: 'PYTHON', code: `point = (0, 5)

match point:
    case (0, 0):
        print("原点")
    case (0, y):              # y に値をキャプチャ
        print(f"Y軸上: y={y}")
    case (x, 0):
        print(f"X軸上: x={x}")
    case (x, y):
        print(f"一般点: ({x}, {y})")
    case _:
        print("不明")` },
          ],
          output: `Y軸上: y=5`,
        },
      ],
    },
    {
      id: 's4',
      num: 4,
      title: '関数',
      level: 'basic',
      items: [
        {
          id: 's4-def・引数・return',
          name: 'def・引数・return',
          level: 'basic',
          keywords: 'def 関数 引数 return デフォルト引数 キーワード引数',
          desc: `\`def\` で関数を定義。デフォルト引数・キーワード引数が使える。\`return\` を省略すると \`None\` が返る。複数値は tuple で返す。`,
          code: [
          { lang: 'PYTHON', code: `def greet(name, greeting="こんにちは"):
    return f"{greeting}、{name}さん！"

print(greet("Alice"))
print(greet("Bob", greeting="おはよう"))

# 複数値を返す（実体は tuple）
def minmax(nums):
    return min(nums), max(nums)

lo, hi = minmax([3, 1, 4, 1, 5, 9])
print(lo, hi)  # 1 9` },
          ],
          output: `こんにちは、Aliceさん！
おはよう、Bobさん！
1 9`,
          warn: `デフォルト引数にリスト・辞書などのミュータブルな値を使うと、呼び出し間で共有されてしまう。


\`def f(lst=[]): # NG — 全呼び出しで同じリストを使い回す\`

\`def f(lst=None): lst = lst if lst is not None else [] # OK\``,
        },
        {
          id: 's4-args-kwargs',
          name: '*args / **kwargs',
          level: 'basic',
          keywords: 'args kwargs 可変長引数 *args **kwargs',
          desc: `\`*args\` は任意個の位置引数を \`tuple\` で、\`**kwargs\` は任意個のキーワード引数を \`dict\` で受け取る。呼び出し側では \`*\` / \`**\` でコレクションを展開できる。`,
          code: [
          { lang: 'PYTHON', code: `def total(*nums):
    return sum(nums)

print(total(1, 2, 3, 4))   # 10

nums = [10, 20, 30]
print(total(*nums))         # 60（リストを展開して渡す）

def show(**info):
    for k, v in info.items():
        print(f"  {k}: {v}")

show(name="Carol", age=28)
d = {"city": "Tokyo", "lang": "Python"}
show(**d)                   # 辞書を展開して渡す` },
          ],
          output: `10
60
  name: Carol
  age: 28
  city: Tokyo
  lang: Python`,
        },
        {
          id: 's4-位置専用-キーワード専用引数',
          name: '位置専用 / キーワード専用引数',
          level: 'basic',
          keywords: '位置専用引数 キーワード専用引数 / * 引数区切り',
          desc: `\`/\` より前は位置引数専用（キーワード指定不可）、\`*\` より後はキーワード引数専用（位置指定不可）。標準ライブラリでよく使われるパターン。`,
          code: [
          { lang: 'PYTHON', code: `def process(x, y, /, *, verbose=False):
    # x, y は位置専用、verbose はキーワード専用
    if verbose:
        print(f"x={x}, y={y}")
    return x + y

process(1, 2, verbose=True)   # OK
# process(x=1, y=2)           # NG: x は位置専用
# process(1, 2, True)          # NG: verbose はキーワード専用` },
          ],
          output: `x=1, y=2`,
        },
        {
          id: 's4-スコープ-global-nonlocal',
          name: 'スコープ：global / nonlocal',
          level: 'basic',
          keywords: 'スコープ global nonlocal LEGB',
          desc: `変数は LEGB 順（Local → Enclosing → Global → Built-in）で解決される。関数内から外側の変数を再代入したい場合は \`global\` / \`nonlocal\` が必要。`,
          code: [
          { lang: 'PYTHON', code: `count = 0

def increment():
    global count   # グローバル変数を再代入する宣言
    count += 1

increment()
increment()
print(count)  # 2

# nonlocal: クロージャ内で外側（enclosing）の変数を再代入
def make_counter():
    n = 0
    def counter():
        nonlocal n
        n += 1
        return n
    return counter

c = make_counter()
print(c(), c(), c())  # 1 2 3` },
          ],
          output: `2
1 2 3`,
          warn: `関数内で変数を参照するだけなら宣言不要。ただし同一スコープ内で代入が一度でもあると「ローカル変数」とみなされ、代入前に参照すると \`UnboundLocalError\` になる。`,
        },
        {
          id: 's4-再帰関数',
          name: '再帰関数',
          level: 'basic',
          keywords: '再帰 再帰関数 factorial fibonacci',
          desc: `Python のデフォルト再帰上限は 1000 回。\`sys.setrecursionlimit()\` で変更できるが、深い再帰はスタックオーバーフローになりやすいため、ループや \`functools.lru_cache\` との組み合わせを検討する。`,
          code: [
          { lang: 'PYTHON', code: `def factorial(n: int) -> int:
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(10))  # 3628800` },
          ],
          output: `3628800`,
        },
        {
          id: 's4-lambda-無名関数',
          name: 'lambda（無名関数）',
          level: 'advanced',
          keywords: 'lambda 無名関数 高階関数 sorted map filter',
          desc: `1式のみ書ける簡易関数。\`sorted()\` / \`map()\` / \`filter()\` のキー関数として使うことが多い。複雑な処理は通常の \`def\` で書くのが可読性上望ましい。`,
          code: [
          { lang: 'PYTHON', code: `double = lambda x: x * 2
print(double(7))   # 14

words = ["banana", "fig", "apple", "date"]
print(sorted(words, key=lambda w: len(w)))
# ['fig', 'date', 'apple', 'banana']

nums = [1, -2, 3, -4, 5]
print(list(filter(lambda x: x > 0, nums)))  # [1, 3, 5]
print(list(map(lambda x: x ** 2, nums)))    # [1, 4, 9, 16, 25]` },
          ],
          output: `14
['fig', 'date', 'apple', 'banana']
[1, 3, 5]
[1, 4, 9, 16, 25]`,
        },
        {
          id: 's4-クロージャ',
          name: 'クロージャ',
          level: 'advanced',
          keywords: 'クロージャ closure 関数ファクトリ',
          desc: `関数が定義された時点の外側スコープの変数を「閉じ込めて」持ち続ける関数。状態を持つ軽量なオブジェクトの代替として使える。`,
          code: [
          { lang: 'PYTHON', code: `def make_multiplier(factor):
    def multiply(x):
        return x * factor   # factor を閉じ込めている
    return multiply

double = make_multiplier(2)
triple = make_multiplier(3)

print(double(5))  # 10
print(triple(5))  # 15` },
          ],
          output: `10
15`,
        },
        {
          id: 's4-型ヒント-type-hints',
          name: '型ヒント（Type Hints）',
          level: 'advanced',
          keywords: '型ヒント アノテーション type hints mypy',
          desc: `Python 3.5+ で利用可能。実行時には無視されるが、IDE 補完・mypy などの静的解析に活用される。Python 3.9+ では \`list[str]\` など組み込み型を直接使える。`,
          code: [
          { lang: 'PYTHON', code: `def add(a: int, b: int) -> int:
    return a + b

def greet_all(names: list[str]) -> None:
    for name in names:
        print(f"Hello, {name}")

# None を返す可能性がある場合
def find(items: list[int], val: int) -> int | None:
    for i, x in enumerate(items):
        if x == val:
            return i
    return None` },
          ],
        },
        {
          id: 's4-functools-lru_cache-メモ化',
          name: 'functools.lru_cache（メモ化）',
          level: 'advanced',
          keywords: 'lru_cache メモ化 functools cache 再帰',
          desc: `同じ引数での計算結果をキャッシュし、再計算をスキップする。再帰アルゴリズムの高速化に効果的。Python 3.9+ の \`@cache\` は無制限キャッシュの簡略版。`,
          code: [
          { lang: 'PYTHON', code: `from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n: int) -> int:
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(50))   # キャッシュなしでは指数時間かかる
print(fib.cache_info())  # キャッシュの状態を確認` },
          ],
          output: `12586269025
CacheInfo(hits=48, misses=51, maxsize=None, currsize=51)`,
        },
      ],
    },
    {
      id: 's5',
      num: 5,
      title: 'コレクション',
      level: 'basic',
      items: [
        {
          id: 's5-list-リスト',
          name: 'list（リスト）',
          level: 'basic',
          keywords: 'list リスト append pop sort スライス 参照 コピー',
          desc: `順序付き・変更可能なコレクション。任意の型を混在できる。インデックスは 0 始まりで、負のインデックスは末尾から数える。`,
          code: [
          { lang: 'PYTHON', code: `nums = [3, 1, 4, 1, 5, 9]

nums.append(2)          # 末尾に追加
nums.insert(0, 0)       # 先頭に挿入
nums.pop()              # 末尾を削除して返す
nums.pop(0)             # インデックス0を削除して返す
nums.remove(1)          # 値が 1 の最初の要素を削除
nums.sort()             # 破壊的ソート（元のリストを変更）
sorted(nums)            # 非破壊的ソート（新しいリストを返す）
len(nums)               # 要素数
nums.count(1)           # 値 1 の個数

# スライス [start:stop:step]（stop は含まない）
a = [0, 1, 2, 3, 4, 5]
a[1:4]    # [1, 2, 3]
a[::2]    # [0, 2, 4]（1つおき）
a[::-1]   # [5, 4, 3, 2, 1, 0]（逆順）` },
          ],
          warn: `スライス \`a[:]\` はシャローコピーを返す（新しいリストだが、要素はオリジナルと同じオブジェクトを参照）。ネストしたリストを完全にコピーするには \`copy.deepcopy()\` を使う。

また、リストの代入 \`b = a\` はコピーではなく同じオブジェクトへの参照の共有。\`b.append(x)\` すると \`a\` も変わる。`,
        },
        {
          id: 's5-dict-辞書',
          name: 'dict（辞書）',
          level: 'basic',
          keywords: 'dict 辞書 キー バリュー get items keys values setdefault',
          desc: `キーと値のペア。Python 3.7+ では挿入順が保証される。キーはイミュータブルな型（str・int・tuple など）に限定される。`,
          code: [
          { lang: 'PYTHON', code: `person = {"name": "Dave", "age": 25}

person["city"] = "Osaka"         # 追加・更新
del person["age"]                # 削除

person.get("email")              # None（存在しないキーでも安全）
person.get("email", "未設定")    # "未設定"（デフォルト値）
person.setdefault("lang", "Python")  # なければ追加、あれば何もしない

for key, val in person.items():  # キーと値を同時取得
    print(f"{key}: {val}")

# dict のマージ（Python 3.9+）
d1 = {"a": 1}
d2 = {"b": 2}
merged = d1 | d2                 # {"a": 1, "b": 2}
d1 |= d2                         # d1 を上書き更新` },
          ],
        },
        {
          id: 's5-tuple-タプル',
          name: 'tuple（タプル）',
          level: 'basic',
          keywords: 'tuple タプル イミュータブル アンパック 名前付きタプル',
          desc: `順序付き・変更不可（イミュータブル）なコレクション。辞書のキーや関数の複数戻り値に使われる。要素が1つの場合はカンマが必須。`,
          code: [
          { lang: 'PYTHON', code: `point = (3, 5)
x, y = point              # アンパック
print(x, y)               # 3 5

single = (42,)            # 要素1つの tuple はカンマ必須
not_tuple = (42)          # これは int

# ネストしたアンパック
(a, b), c = (1, 2), 3
print(a, b, c)            # 1 2 3

# *rest でスプラット
first, *rest = (1, 2, 3, 4, 5)
print(first, rest)        # 1 [2, 3, 4, 5]` },
          ],
          output: `3 5
1 2 3
1 [2, 3, 4, 5]`,
        },
        {
          id: 's5-set-frozenset-集合',
          name: 'set / frozenset（集合）',
          level: 'basic',
          keywords: 'set 集合 frozenset 和集合 積集合 差集合 重複',
          desc: `重複なし・順序なしのコレクション。\`in\` による検索が O(1) と高速。\`frozenset\` はイミュータブルなセット（辞書キーにも使える）。`,
          code: [
          { lang: 'PYTHON', code: `tags_a = {"python", "web", "ai"}
tags_b = {"python", "data", "ai"}

tags_a | tags_b    # 和集合：{"python","web","ai","data"}
tags_a & tags_b    # 積集合：{"python","ai"}
tags_a - tags_b    # 差集合：{"web"}（a にだけある）
tags_a ^ tags_b    # 対称差：{"web","data"}（どちらか一方にだけある）

# 重複除去
nums = [1, 2, 2, 3, 3, 3]
unique = list(set(nums))   # [1, 2, 3]（順序は不定）` },
          ],
        },
        {
          id: 's5-zip-zip_longest',
          name: 'zip / zip_longest',
          level: 'basic',
          keywords: 'zip zip_longest アンパック 並列イテレーション',
          desc: `複数のイテラブルを並列に反復する。\`zip\` は短い方に合わせて終了。長い方に合わせたい場合は \`itertools.zip_longest\` を使う。`,
          code: [
          { lang: 'PYTHON', code: `names  = ["Alice", "Bob", "Carol"]
scores = [85, 92, 78]

for name, score in zip(names, scores):
    print(f"{name}: {score}")

# dict に変換
mapping = dict(zip(names, scores))
# {"Alice": 85, "Bob": 92, "Carol": 78}

# アンパックで転置
pairs = [(1, "a"), (2, "b"), (3, "c")]
nums, letters = zip(*pairs)
print(nums)     # (1, 2, 3)
print(letters)  # ('a', 'b', 'c')` },
          ],
          output: `Alice: 85
Bob: 92
Carol: 78`,
        },
        {
          id: 's5-collections-モジュール',
          name: 'collections モジュール',
          level: 'advanced',
          keywords: 'collections Counter defaultdict deque namedtuple',
          desc: `標準ライブラリの特殊コレクション。よく使うパターンを簡潔に書ける。`,
          code: [
          { lang: 'PYTHON', code: `from collections import Counter, defaultdict, deque, namedtuple

# Counter: 頻度カウント
c = Counter("mississippi")
print(c.most_common(3))   # [('s', 4), ('i', 4), ('p', 2)]

# defaultdict: キーがなくてもデフォルト値を返す
dd = defaultdict(list)
dd["fruits"].append("apple")   # KeyError が起きない

# deque: 両端キュー（appendleft / popleft が O(1)）
dq = deque([1, 2, 3])
dq.appendleft(0)   # [0, 1, 2, 3]
dq.popleft()       # 0

# namedtuple: フィールド名付き tuple
Point = namedtuple("Point", ["x", "y"])
p = Point(3, 5)
print(p.x, p.y)    # 3 5` },
          ],
          output: `[('s', 4), ('i', 4), ('p', 2)]
3 5`,
        },
      ],
    },
    {
      id: 's6',
      num: 6,
      title: '内包表記',
      level: 'basic',
      items: [
        {
          id: 's6-リスト内包表記',
          name: 'リスト内包表記',
          level: 'basic',
          keywords: 'リスト内包表記 list comprehension フィルタ 変換',
          desc: `\`[式 for 変数 in イテラブル if 条件]\` の形でリストを生成する。\`map()\` + \`filter()\` の組み合わせより可読性が高い。`,
          code: [
          { lang: 'PYTHON', code: `# 基本
squares = [x**2 for x in range(1, 6)]
# [1, 4, 9, 16, 25]

# フィルタ付き
evens = [x for x in range(10) if x % 2 == 0]
# [0, 2, 4, 6, 8]

# ネストループ（行列の平坦化）
matrix = [[1, 2], [3, 4], [5, 6]]
flat = [x for row in matrix for x in row]
# [1, 2, 3, 4, 5, 6]

# 条件分岐を含む式（三項演算子）
labels = ["偶数" if x % 2 == 0 else "奇数" for x in range(5)]
# ['偶数', '奇数', '偶数', '奇数', '偶数']` },
          ],
        },
        {
          id: 's6-辞書・集合の内包表記',
          name: '辞書・集合の内包表記',
          level: 'basic',
          keywords: '辞書内包表記 dict comprehension 集合内包表記 set',
          desc: `辞書は \`{キー: 値 for ...}\`、集合は \`{式 for ...}\`。どちらも \`[]\` ではなく \`{}\` を使う点に注意。`,
          code: [
          { lang: 'PYTHON', code: `# 辞書内包表記
words = ["apple", "fig", "mango"]
word_len = {w: len(w) for w in words}
# {"apple": 5, "fig": 3, "mango": 5}

# 辞書の反転（値→キー）
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
# {1: "a", 2: "b", 3: "c"}

# 集合内包表記
unique_lens = {len(w) for w in words}
# {3, 5}（重複なし）` },
          ],
        },
        {
          id: 's6-ジェネレータ式',
          name: 'ジェネレータ式',
          level: 'advanced',
          keywords: 'ジェネレータ式 generator メモリ 遅延評価',
          desc: `\`(式 for ...)\` の形で、値を一度にすべてメモリに展開せず必要なときに1つずつ生成する。\`sum()\` / \`max()\` など集約関数に直接渡せるため、大きなデータで特に有効。`,
          code: [
          { lang: 'PYTHON', code: `# リスト内包表記：全件をメモリに展開
total_list = sum([x**2 for x in range(1_000_000)])

# ジェネレータ式：メモリ使用量が大幅に少ない
total_gen  = sum(x**2 for x in range(1_000_000))

print(total_gen)  # 333332833333500000` },
          ],
          output: `333332833333500000`,
          warn: `ジェネレータは一度しか消費できない。2回目にイテレートしても空になる。複数回使いたい場合はリストに変換するか、毎回ジェネレータを作り直す。`,
        },
        {
          id: 's6-ネストした内包表記の読み方',
          name: 'ネストした内包表記の読み方',
          level: 'advanced',
          keywords: 'ネスト 多重ループ 内包表記 行列',
          desc: `複数の \`for\` を並べると多重ループになる。左から右の順で外側→内側のループに対応する。`,
          code: [
          { lang: 'PYTHON', code: `# デカルト積（全組み合わせ）
colors = ["red", "blue"]
sizes  = ["S", "M", "L"]
items  = [(c, s) for c in colors for s in sizes]
# [('red','S'),('red','M'),('red','L'),('blue','S'),...]

# 等価な for ループ
items2 = []
for c in colors:
    for s in sizes:        # ← 右の for が内側のループ
        items2.append((c, s))` },
          ],
        },
      ],
    },
    {
      id: 's7',
      num: 7,
      title: 'クラスと継承',
      level: 'advanced',
      items: [
        {
          id: 's7-class-__init__-self',
          name: 'class / __init__ / self',
          level: 'advanced',
          keywords: 'class クラス init self インスタンス変数 クラス変数',
          desc: `\`class\` でクラスを定義し、\`__init__\` がコンストラクタ。インスタンスメソッドの第1引数には慣習的に \`self\` を使う（言語仕様ではなく慣習）。`,
          code: [
          { lang: 'PYTHON', code: `class Animal:
    # クラス変数（全インスタンスで共有）
    kingdom = "Animalia"

    def __init__(self, name: str, sound: str):
        # インスタンス変数（インスタンスごとに独立）
        self.name  = name
        self.sound = sound

    def speak(self) -> str:
        return f"{self.name} が「{self.sound}」と鳴く"

    def __repr__(self) -> str:          # print / repr() で使われる
        return f"Animal({self.name!r})"

    def __str__(self) -> str:           # str() / f-string で使われる
        return self.name

dog = Animal("Pochi", "ワン")
print(dog.speak())
print(repr(dog))
print(Animal.kingdom)    # クラス変数にはクラス名でアクセス` },
          ],
          output: `Pochi が「ワン」と鳴く
Animal('Pochi')
Animalia`,
          warn: `クラス変数はすべてのインスタンスで共有される。インスタンス側で同名変数に代入すると「インスタンス変数」として隠蔽されるが、リスト・辞書などのミュータブルなクラス変数に \`.append()\` 等を呼ぶと全インスタンスに影響する。


\`class Foo:    items = [] # ← NG: 全インスタンスで共有されてしまう    def __init__(self):        self.items = [] # ← OK: インスタンス変数として定義\``,
        },
        {
          id: 's7-継承と-super',
          name: '継承と super()',
          level: 'advanced',
          keywords: '継承 super サブクラス オーバーライド is-a',
          desc: `クラス定義の \`()\` に親クラスを指定して継承する。\`super()\` で親クラスのメソッドを呼び出せる。\`isinstance()\` で継承関係を確認できる。`,
          code: [
          { lang: 'PYTHON', code: `class Dog(Animal):
    def __init__(self, name: str, breed: str):
        super().__init__(name, "ワン")   # 親の __init__ を呼ぶ
        self.breed = breed

    def speak(self) -> str:             # オーバーライド
        base = super().speak()          # 親メソッドを呼びつつ拡張
        return f"{base}（{self.breed}）"

shiba = Dog("Hachi", "柴犬")
print(shiba.speak())
print(isinstance(shiba, Dog))     # True
print(isinstance(shiba, Animal))  # True（継承関係も True）
print(type(shiba) is Animal)      # False（厳密な型比較）` },
          ],
          output: `Hachi が「ワン」と鳴く（柴犬）
True
True
False`,
        },
        {
          id: 's7-property-setter',
          name: '@property / setter',
          level: 'advanced',
          keywords: 'property setter getter プロパティ',
          desc: `属性アクセスの形式を保ちながら、取得・設定時にロジックを挟める。Java の getter/setter より簡潔に書ける。`,
          code: [
          { lang: 'PYTHON', code: `class Temperature:
    def __init__(self, celsius: float):
        self._celsius = celsius

    @property
    def celsius(self) -> float:
        return self._celsius

    @celsius.setter
    def celsius(self, value: float):
        if value < -273.15:
            raise ValueError("絶対零度を下回れません")
        self._celsius = value

    @property
    def fahrenheit(self) -> float:       # 読み取り専用プロパティ
        return self._celsius * 9/5 + 32

t = Temperature(100)
print(t.fahrenheit)   # 212.0
t.celsius = 0
print(t.fahrenheit)   # 32.0` },
          ],
          output: `212.0
32.0`,
        },
        {
          id: 's7-staticmethod-classmethod',
          name: '@staticmethod / @classmethod',
          level: 'advanced',
          keywords: 'staticmethod classmethod 静的メソッド クラスメソッド',
          desc: `\`@staticmethod\` は \`self\`/\`cls\` を受け取らない純粋な関数。\`@classmethod\` はクラス自体（\`cls\`）を受け取り、代替コンストラクタとして使われることが多い。`,
          code: [
          { lang: 'PYTHON', code: `class Circle:
    PI = 3.14159

    def __init__(self, radius: float):
        self.radius = radius

    @staticmethod
    def is_valid_radius(r) -> bool:     # クラス・インスタンス不要な処理
        return r > 0

    @classmethod
    def unit(cls) -> "Circle":          # 代替コンストラクタ
        return cls(1.0)

    def area(self) -> float:
        return self.PI * self.radius ** 2

print(Circle.is_valid_radius(-1))  # False
c = Circle.unit()
print(c.area())                    # 3.14159` },
          ],
          output: `False
3.14159`,
        },
        {
          id: 's7-dataclass-python-3-7',
          name: '@dataclass（Python 3.7+）',
          level: 'advanced',
          keywords: 'dataclass データクラス frozen field',
          desc: `\`__init__\` / \`__repr__\` / \`__eq__\` を自動生成する。\`frozen=True\` で変更不可（イミュータブル）にもできる。`,
          code: [
          { lang: 'PYTHON', code: `from dataclasses import dataclass, field

@dataclass
class Point:
    x: float
    y: float
    label: str = "point"   # デフォルト値

@dataclass(frozen=True)    # イミュータブル・hashable になる
class Color:
    r: int
    g: int
    b: int

p = Point(1.0, 2.5)
print(p)                    # Point(x=1.0, y=2.5, label='point')
print(p == Point(1.0, 2.5)) # True（__eq__ 自動生成）

# ミュータブルなデフォルト値は field(default_factory=...) を使う
@dataclass
class Bag:
    items: list = field(default_factory=list)` },
          ],
          output: `Point(x=1.0, y=2.5, label='point')
True`,
        },
        {
          id: 's7-抽象クラス-abc',
          name: '抽象クラス（ABC）',
          level: 'advanced',
          keywords: '抽象クラス abstract ABC abstractmethod インターフェース',
          desc: `他言語の interface / abstract class に相当。\`@abstractmethod\` を持つクラスは直接インスタンス化できず、サブクラスでの実装を強制する。`,
          code: [
          { lang: 'PYTHON', code: `from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float: ...

    @abstractmethod
    def perimeter(self) -> float: ...

class Rectangle(Shape):
    def __init__(self, w: float, h: float):
        self.w, self.h = w, h

    def area(self)      -> float: return self.w * self.h
    def perimeter(self) -> float: return 2 * (self.w + self.h)

# Shape()  # → TypeError: 抽象クラスはインスタンス化できない
r = Rectangle(3, 4)
print(r.area(), r.perimeter())   # 12  14` },
          ],
          output: `12 14.0`,
        },
        {
          id: 's7-主要なダンダーメソッド',
          name: '主要なダンダーメソッド',
          level: 'advanced',
          keywords: 'ダンダーメソッド dunder 魔法メソッド __len__ __eq__ __add__ __contains__',
          desc: `\`__xxx__\` という名前の特殊メソッド。演算子や組み込み関数の振る舞いをカスタマイズできる。`,
          code: [
          { lang: 'PYTHON', code: `class Vector:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

    def __add__(self, other):           # v1 + v2
        return Vector(self.x + other.x, self.y + other.y)

    def __mul__(self, scalar):          # v * 3
        return Vector(self.x * scalar, self.y * scalar)

    def __len__(self):                  # len(v)
        return 2

    def __eq__(self, other):            # v1 == v2
        return self.x == other.x and self.y == other.y

v1 = Vector(1, 2)
v2 = Vector(3, 4)
print(v1 + v2)    # Vector(4, 6)
print(v1 * 3)     # Vector(3, 6)
print(len(v1))    # 2` },
          ],
          output: `Vector(4, 6)
Vector(3, 6)
2`,
        },
      ],
    },
    {
      id: 's8',
      num: 8,
      title: '例外処理',
      level: 'advanced',
      items: [
        {
          id: 's8-try-except-else-finally',
          name: 'try / except / else / finally',
          level: 'advanced',
          keywords: 'try except else finally 例外 エラー',
          desc: `\`else\` 節は例外が発生しなかった場合のみ実行される（Python 固有）。\`finally\` は例外の有無に関わらず必ず実行される。`,
          code: [
          { lang: 'PYTHON', code: `def safe_divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("ゼロ除算エラー")
        return None
    except TypeError as e:
        print(f"型エラー: {e}")
        return None
    else:
        print("計算成功")   # 例外がなかった場合のみ実行
        return result
    finally:
        print("--- 終了 ---")  # 常に実行

safe_divide(10, 2)
print("---")
safe_divide(10, 0)` },
          ],
          output: `計算成功
--- 終了 ---
---
ゼロ除算エラー
--- 終了 ---`,
          warn: `\`except Exception\` で広く捕捉するのは一般的に避けるべき。\`KeyboardInterrupt\` や \`SystemExit\` など、プログラム終了に関わる例外まで飲み込んでしまうことがある。捕捉する例外は具体的な型を指定する。`,
        },
        {
          id: 's8-主要な組み込み例外',
          name: '主要な組み込み例外',
          level: 'advanced',
          keywords: '組み込み例外 ValueError TypeError KeyError IndexError AttributeError',
          desc: `よく遭遇する組み込み例外の一覧。継承関係は \`BaseException → Exception → より具体的な例外\` の順。`,
          code: [
          { lang: 'PYTHON', code: `int("abc")        # ValueError:    値が不正
1 + "a"           # TypeError:     型が不適切
{}["x"]           # KeyError:      辞書キーが存在しない
[][0]             # IndexError:    リストの範囲外
None.upper()      # AttributeError: 属性が存在しない
open("no.txt")    # FileNotFoundError
1 / 0             # ZeroDivisionError
int("1" * 1000)   # OverflowError（float のみ。int は無制限）` },
          ],
        },
        {
          id: 's8-raise・カスタム例外・raise-from',
          name: 'raise・カスタム例外・raise from',
          level: 'advanced',
          keywords: 'raise カスタム例外 独自エラー raise from',
          desc: `\`Exception\` を継承して独自の例外クラスを作れる。\`raise ... from\` で元の例外を連鎖させると、デバッグ時にコンテキストが保たれる。`,
          code: [
          { lang: 'PYTHON', code: `class ValidationError(ValueError):
    def __init__(self, field: str, message: str):
        super().__init__(f"{field}: {message}")
        self.field = field

def set_age(age: int) -> None:
    if not isinstance(age, int):
        raise TypeError(f"int が必要です: {type(age)}")
    if age < 0 or age > 150:
        raise ValidationError("age", f"範囲外の値: {age}")

try:
    set_age(-1)
except ValidationError as e:
    print(f"バリデーションエラー: {e}")
    print(f"フィールド: {e.field}")

# raise from: 例外を変換しつつ元の例外を保持
try:
    int("abc")
except ValueError as e:
    raise RuntimeError("設定ファイルの読み込みに失敗") from e` },
          ],
          output: `バリデーションエラー: age: 範囲外の値: -1
フィールド: age`,
        },
        {
          id: 's8-with-文・コンテキストマネージャ',
          name: 'with 文・コンテキストマネージャ',
          level: 'advanced',
          keywords: 'with コンテキストマネージャ open ファイル リソース管理',
          desc: `ブロックの開始・終了に処理を自動実行する仕組み。ファイルのクローズ・ロックの解放など、リソースの後処理を確実に行うために使う。\`finally\` を書かなくて済む。`,
          code: [
          { lang: 'PYTHON', code: `# ファイル操作（with を抜けると自動でクローズ）
with open("data.txt", "w", encoding="utf-8") as f:
    f.write("Hello\\n")
    f.write("World\\n")
# ここで f は閉じられている

# 複数リソースを同時に管理
with open("src.txt") as src, open("dst.txt", "w") as dst:
    dst.write(src.read())

# contextlib で独自コンテキストマネージャを作る
from contextlib import contextmanager

@contextmanager
def timer(label: str):
    import time
    start = time.perf_counter()
    yield                              # with ブロックの本体がここで実行
    elapsed = time.perf_counter() - start
    print(f"{label}: {elapsed:.4f}s")

with timer("処理"):
    sum(range(1_000_000))` },
          ],
        },
      ],
    },
    {
      id: 's9',
      num: 9,
      title: 'ファイル・入出力',
      level: 'basic',
      items: [
        {
          id: 's9-open-でファイルを読み書きする',
          name: 'open() でファイルを読み書きする',
          level: 'basic',
          keywords: 'open ファイル 読み書き encoding with テキスト バイナリ',
          desc: `\`open(path, mode, encoding)\` でファイルを開く。必ず \`with\` 文を使うとクローズ忘れを防げる。テキストモードのデフォルトエンコーディングはOSに依存するため、明示的に \`encoding="utf-8"\` を指定するのが安全。`,
          code: [
          { lang: 'PYTHON', code: `# 書き込み（上書き）
with open("sample.txt", "w", encoding="utf-8") as f:
    f.write("1行目\\n")
    f.writelines(["2行目\\n", "3行目\\n"])

# 読み込み（全体）
with open("sample.txt", "r", encoding="utf-8") as f:
    content = f.read()          # 全テキストを文字列で返す

# 行ごとに読む
with open("sample.txt", encoding="utf-8") as f:
    for line in f:              # イテレータで1行ずつ（メモリ効率が良い）
        print(line.rstrip())

# 追記モード
with open("sample.txt", "a", encoding="utf-8") as f:
    f.write("4行目\\n")

# バイナリ読み込み
with open("image.png", "rb") as f:
    data = f.read()             # bytes オブジェクト` },
          ],
          warn: `Windowsのデフォルトエンコーディングは \`cp932\`（Shift-JIS系）。\`encoding\` を省略すると環境によってファイルが文字化けする。クロスプラットフォームのコードでは常に \`encoding="utf-8"\` を明示する。`,
        },
        {
          id: 's9-pathlib-path-python-3-4',
          name: 'pathlib.Path（Python 3.4+）',
          level: 'advanced',
          keywords: 'pathlib Path ファイルパス ディレクトリ 存在確認',
          desc: `ファイルパスをオブジェクトとして扱う。OS差を吸収し、文字列の手動結合（\`os.path.join\`）より直感的に書ける。`,
          code: [
          { lang: 'PYTHON', code: `from pathlib import Path

p = Path("data") / "subdir" / "file.txt"   # / 演算子でパス結合
print(p)              # data/subdir/file.txt
print(p.stem)         # "file"（拡張子なし名前）
print(p.suffix)       # ".txt"
print(p.parent)       # data/subdir

p.parent.mkdir(parents=True, exist_ok=True)  # ディレクトリ作成
p.write_text("hello", encoding="utf-8")      # テキスト書き込み
print(p.read_text(encoding="utf-8"))         # テキスト読み込み
p.exists()            # True / False
p.is_file()           # True / False

# glob でファイル一覧
for py_file in Path(".").glob("**/*.py"):    # 再帰的に .py を列挙
    print(py_file)` },
          ],
        },
        {
          id: 's9-json-モジュール',
          name: 'json モジュール',
          level: 'basic',
          keywords: 'json JSON dump load 読み込み 書き込み シリアライズ',
          desc: `Python オブジェクト ↔ JSON 文字列の変換。\`json.dumps\` / \`json.loads\` は文字列、\`json.dump\` / \`json.load\` はファイルオブジェクトを扱う。`,
          code: [
          { lang: 'PYTHON', code: `import json

data = {"name": "Alice", "scores": [85, 92, 78], "active": True}

# Python → JSON 文字列
s = json.dumps(data, ensure_ascii=False, indent=2)
print(s)

# JSON 文字列 → Python
obj = json.loads(s)
print(obj["name"])    # "Alice"

# ファイルに保存 / ファイルから読む
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

with open("data.json", encoding="utf-8") as f:
    loaded = json.load(f)` },
          ],
        },
        {
          id: 's9-csv-モジュール',
          name: 'csv モジュール',
          level: 'basic',
          keywords: 'csv CSV DictReader DictWriter 読み書き',
          desc: `\`csv.DictReader\` / \`DictWriter\` を使うとヘッダー行を辞書のキーとして扱えるため可読性が高い。`,
          code: [
          { lang: 'PYTHON', code: `import csv

# CSV 書き込み
rows = [{"name": "Alice", "score": 85}, {"name": "Bob", "score": 92}]
with open("scores.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["name", "score"])
    writer.writeheader()
    writer.writerows(rows)

# CSV 読み込み
with open("scores.csv", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["name"], row["score"])` },
          ],
          output: `Alice 85
Bob 92`,
        },
      ],
    },
    {
      id: 's10',
      num: 10,
      title: 'モジュール・パッケージ',
      level: 'basic',
      items: [
        {
          id: 's10-import-from-import-as',
          name: 'import / from ... import / as',
          level: 'basic',
          keywords: 'import from as モジュール 名前空間',
          desc: `モジュール全体を読み込む \`import\`、特定の名前だけ取り込む \`from ... import\`、エイリアスを付ける \`as\` の3パターン。`,
          code: [
          { lang: 'PYTHON', code: `import math                       # モジュール全体
print(math.sqrt(16))              # 4.0

from math import sqrt, pi         # 特定の名前だけ
print(sqrt(16), pi)               # 4.0  3.141...

import numpy as np                # エイリアス（慣習的な短縮名）
import pandas as pd

from os.path import join, exists  # サブモジュールから取り込み

# ワイルドカードインポートは避ける（名前衝突の原因になる）
# from math import *  ← NG` },
          ],
        },
        {
          id: 's10-__name__-__main__',
          name: '__name__ == "__main__"',
          level: 'basic',
          keywords: '__name__ main スクリプト モジュール 実行',
          desc: `ファイルが直接実行された場合のみ \`__name__\` が \`"__main__"\` になる。モジュールとしてインポートされた際はモジュール名になる。スクリプトのエントリポイントとして使う定番パターン。`,
          code: [
          { lang: 'PYTHON', code: `# mymodule.py
def greet(name: str) -> str:
    return f"Hello, {name}!"

if __name__ == "__main__":
    # python mymodule.py で直接実行した場合のみ動く
    print(greet("World"))
    # import mymodule した場合はここは実行されない` },
          ],
        },
        {
          id: 's10-パッケージと-__init__-py',
          name: 'パッケージと __init__.py',
          level: 'advanced',
          keywords: 'パッケージ __init__ ディレクトリ 構造 namespace',
          desc: `複数のモジュールをディレクトリでまとめたものがパッケージ。Python 3.3+ では \`__init__.py\` がなくても（namespace package として）動くが、明示的に置くのが一般的。`,
          code: [
          { lang: 'PYTHON', code: `# ディレクトリ構造
# myapp/
# ├── __init__.py      ← パッケージであることを示す
# ├── utils.py
# └── models/
#     ├── __init__.py
#     └── user.py

# myapp/__init__.py でよく使う名前を再エクスポート
from .utils import helper        # 相対インポート（.= 同じパッケージ）
from .models.user import User

# 使う側
from myapp import User           # __init__.py で公開した名前を直接使える
from myapp.utils import helper   # 完全パスでのインポートも常に OK` },
          ],
        },
        {
          id: 's10-よく使う標準ライブラリ',
          name: 'よく使う標準ライブラリ',
          level: 'basic',
          keywords: '標準ライブラリ os sys datetime random re itertools functools',
          desc: `インストール不要で使えるバッテリー同梱ライブラリの主要どころ。`,
          code: [
          { lang: 'PYTHON', code: `import os, sys, re, random, datetime, itertools, functools

# os / sys
os.getcwd()                     # カレントディレクトリ
os.environ.get("HOME")          # 環境変数
sys.argv                        # コマンドライン引数リスト
sys.exit(0)                     # プロセス終了

# datetime
from datetime import datetime, timedelta
now = datetime.now()
print(now.strftime("%Y-%m-%d %H:%M"))
tomorrow = now + timedelta(days=1)

# re（正規表現）
m = re.search(r"\\d+", "order-42-A")
print(m.group())                # "42"
words = re.findall(r"\\w+", "hello world")

# itertools
from itertools import chain, islice, product
list(chain([1,2], [3,4]))       # [1,2,3,4]
list(product("AB", "12"))       # [('A','1'),('A','2'),('B','1'),('B','2')]

# functools
from functools import reduce
reduce(lambda a, b: a + b, [1,2,3,4])  # 10` },
          ],
        },
      ],
    },
    {
      id: 's11',
      num: 11,
      title: 'デコレータ',
      level: 'advanced',
      items: [
        {
          id: 's11-デコレータの基本-functools-wraps',
          name: 'デコレータの基本 / functools.wraps',
          level: 'advanced',
          keywords: 'デコレータ decorator functools wraps ラッパー',
          desc: `関数を引数として受け取り、新しい関数を返す「関数を加工する関数」。\`@functools.wraps(func)\` を使うと元の関数名・docstring が保たれる。`,
          code: [
          { lang: 'PYTHON', code: `import functools, time

def timer(func):
    @functools.wraps(func)              # __name__ 等を元の関数から引き継ぐ
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__}: {elapsed:.4f}s")
        return result
    return wrapper

@timer
def slow_sum(n: int) -> int:
    return sum(range(n))

slow_sum(1_000_000)    # slow_sum: 0.0xxx s
print(slow_sum.__name__)  # "slow_sum"（wraps がなければ "wrapper" になる）` },
          ],
          warn: `\`@functools.wraps(func)\` を省略すると、ラップされた関数の \`__name__\` や \`__doc__\` が失われ、デバッグやドキュメント生成ツールで元の関数名が表示されなくなる。デコレータを書く際は常に付ける習慣を持つ。`,
        },
        {
          id: 's11-引数付きデコレータ-デコレータファクトリ',
          name: '引数付きデコレータ（デコレータファクトリ）',
          level: 'advanced',
          keywords: '引数付きデコレータ デコレータファクトリ パラメータ',
          desc: `デコレータ自体に引数を渡したい場合は、「デコレータを返す関数」として1段ネストさせる（3層構造になる）。`,
          code: [
          { lang: 'PYTHON', code: `import functools

def retry(times: int = 3):
    """times 回まで再試行するデコレータ"""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, times + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    print(f"試行 {attempt}/{times} 失敗: {e}")
            raise RuntimeError(f"{func.__name__} が {times} 回失敗しました")
        return wrapper
    return decorator          # ← デコレータを返す

@retry(times=3)
def flaky_request(url: str) -> str:
    import random
    if random.random() < 0.7:
        raise ConnectionError("接続失敗")
    return "OK"` },
          ],
        },
        {
          id: 's11-cache-lru_cache-functools',
          name: '@cache / @lru_cache（functools）',
          level: 'advanced',
          keywords: 'cache lru_cache functools メモ化 キャッシュ 再帰',
          desc: `関数の戻り値を引数をキーとしてキャッシュするメモ化デコレータ。再帰関数の高速化に特に効果的。\`@cache\`（Python 3.9+）は上限なし、\`@lru_cache(maxsize=N)\` はサイズ制限付き。`,
          code: [
          { lang: 'PYTHON', code: `from functools import cache, lru_cache

# @cache なしでは指数オーダーの計算量になる
@cache
def fib(n: int) -> int:
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(50))          # 一瞬で計算できる
print(fib.cache_info()) # hits / misses / size を確認できる

# lru_cache: maxsize でキャッシュ上限を設定
@lru_cache(maxsize=128)
def expensive(x: int) -> int:
    return x ** 3` },
          ],
          output: `12586269025
CacheInfo(hits=48, misses=51, maxsize=None, currsize=51)`,
        },
        {
          id: 's11-複数デコレータの適用順',
          name: '複数デコレータの適用順',
          level: 'advanced',
          keywords: 'クラスデコレータ 複数デコレータ スタック 適用順',
          desc: `デコレータを複数重ねると下から上に向かって適用される（最も関数に近いものが最初に実行される）。`,
          code: [
          { lang: 'PYTHON', code: `def bold(func):
    @functools.wraps(func)
    def wrapper(*a, **kw): return f"{func(*a, **kw)}"
    return wrapper

def italic(func):
    @functools.wraps(func)
    def wrapper(*a, **kw): return f"{func(*a, **kw)}"
    return wrapper

@bold
@italic        # italic が先に適用され、その結果に bold が適用される
def greet(name):
    return f"Hello, {name}"

# 等価な式: bold(italic(greet))("World")
print(greet("World"))   # Hello, World` },
          ],
          output: `<b><i>Hello, World</i></b>`,
        },
      ],
    },
    {
      id: 's12',
      num: 12,
      title: '型システム',
      level: 'advanced',
      items: [
        {
          id: 's12-型ヒントの基本-optional-union',
          name: '型ヒントの基本 / Optional / Union',
          level: 'advanced',
          keywords: '型ヒント type hints Optional Union 型注釈 mypy',
          desc: `Python の型ヒントは実行時に強制されない（静的解析ツール \`mypy\` / \`pyright\` が検証する）。\`Optional[X]\` は \`X | None\` の短縮。Python 3.10+ では \`X | Y\` 構文が使える。`,
          code: [
          { lang: 'PYTHON', code: `from typing import Optional, Union

# Python 3.9 以前のスタイル
def greet(name: str, times: Optional[int] = None) -> str:
    n = times or 1
    return ("Hello, " + name + "! ") * n

# Python 3.10+ のスタイル（| 構文）
def parse(value: str | int | None) -> float | None:
    if value is None:
        return None
    return float(value)

# コレクションの型ヒント（Python 3.9+ は組み込み型をそのまま使える）
def process(items: list[int]) -> dict[str, int]:
    return {"total": sum(items), "count": len(items)}

# Python 3.8 以前は typing.List / typing.Dict を使う
from typing import List, Dict
def old_style(items: List[int]) -> Dict[str, int]: ...` },
          ],
        },
        {
          id: 's12-typevar・ジェネリクス',
          name: 'TypeVar・ジェネリクス',
          level: 'advanced',
          keywords: 'TypeVar ジェネリック Generic 型変数',
          desc: `\`TypeVar\` で型変数を定義し、入力と出力の型を関連付けられる。Python 3.12+ では \`type T = ...\` 構文が使える。`,
          code: [
          { lang: 'PYTHON', code: `from typing import TypeVar

T = TypeVar("T")

def first(items: list[T]) -> T:    # 入力と出力が同じ型であることを示す
    return items[0]

x: int = first([1, 2, 3])          # int と推論される
s: str = first(["a", "b"])         # str と推論される

# 境界付き TypeVar（bound）
from typing import TypeVar
Numeric = TypeVar("Numeric", int, float)  # int か float に限定

def double(x: Numeric) -> Numeric:
    return x * 2` },
          ],
        },
        {
          id: 's12-literal-typeddict',
          name: 'Literal / TypedDict',
          level: 'advanced',
          keywords: 'Literal TypedDict 型 固定値 辞書型',
          desc: `\`Literal\` は特定の値のみを許可する型。\`TypedDict\` は辞書のキーと値の型を定義する（\`dataclass\` より軽量で JSON との親和性が高い）。`,
          code: [
          { lang: 'PYTHON', code: `from typing import Literal, TypedDict

# Literal: 受け入れる値を列挙
Direction = Literal["north", "south", "east", "west"]

def move(direction: Direction) -> None:
    print(f"{direction} へ移動")

move("north")   # OK
# move("up")   # mypy エラー

# TypedDict: 辞書の構造を型で表現
class User(TypedDict):
    id: int
    name: str
    email: str

class PartialUser(TypedDict, total=False):   # total=False で全キーを省略可能に
    id: int
    name: str

user: User = {"id": 1, "name": "Alice", "email": "a@example.com"}` },
          ],
        },
        {
          id: 's12-protocol-構造的部分型',
          name: 'Protocol（構造的部分型）',
          level: 'advanced',
          keywords: 'Protocol 構造的部分型 ダックタイピング typing',
          desc: `明示的に継承しなくても、必要なメソッドを持っていれば型チェックが通る（ダックタイピングを型安全に表現できる）。Go の interface に近い概念。`,
          code: [
          { lang: 'PYTHON', code: `from typing import Protocol

class Drawable(Protocol):
    def draw(self) -> None: ...   # このメソッドを持っていれば OK

class Circle:
    def draw(self) -> None:       # Drawable を継承していなくてもOK
        print("○")

class Square:
    def draw(self) -> None:
        print("□")

def render(shape: Drawable) -> None:
    shape.draw()

render(Circle())  # OK
render(Square())  # OK` },
          ],
        },
      ],
    },
    {
      id: 's13',
      num: 13,
      title: '非同期プログラミング',
      level: 'advanced',
      items: [
        {
          id: 's13-async-await-コルーチン',
          name: 'async / await / コルーチン',
          level: 'advanced',
          keywords: 'async await コルーチン 非同期 asyncio',
          desc: `\`async def\` で定義した関数はコルーチン。\`await\` で他の非同期処理の完了を待つ間、イベントループは他のタスクを実行できる。I/Oバウンドな処理の並行実行に適する。`,
          code: [
          { lang: 'PYTHON', code: `import asyncio

async def fetch(url: str) -> str:
    print(f"取得開始: {url}")
    await asyncio.sleep(1)          # I/O 待機をシミュレート（この間に他のタスクが動く）
    return f"data from {url}"

async def main():
    result = await fetch("https://example.com")
    print(result)

# Python 3.7+
asyncio.run(main())   # イベントループを起動してコルーチンを実行` },
          ],
          output: `取得開始: https://example.com
data from https://example.com`,
        },
        {
          id: 's13-asyncio-gather-create_task',
          name: 'asyncio.gather / create_task',
          level: 'advanced',
          keywords: 'gather タスク create_task 並行 asyncio',
          desc: `複数のコルーチンを並行実行するには \`asyncio.gather()\` か \`asyncio.create_task()\` を使う。\`gather\` は全完了を待ち結果をリストで返す。`,
          code: [
          { lang: 'PYTHON', code: `import asyncio, time

async def fetch(name: str, delay: float) -> str:
    await asyncio.sleep(delay)
    return f"{name} 完了"

async def main():
    start = time.perf_counter()

    # gather: 3つを並行実行 → 最も遅い 1.5s で全部終わる
    results = await asyncio.gather(
        fetch("A", 1.0),
        fetch("B", 1.5),
        fetch("C", 0.5),
    )
    print(results)
    print(f"経過: {time.perf_counter() - start:.2f}s")   # ≈ 1.5s

asyncio.run(main())` },
          ],
          output: `['A 完了', 'B 完了', 'C 完了']
経過: 1.51s`,
        },
        {
          id: 's13-async-with-async-for',
          name: 'async with / async for',
          level: 'advanced',
          keywords: 'async with async for 非同期コンテキストマネージャ 非同期イテレータ',
          desc: `非同期コンテキストマネージャ（\`async with\`）と非同期イテレータ（\`async for\`）は、I/O を伴うリソース管理やストリーミングに使う。`,
          code: [
          { lang: 'PYTHON', code: `import asyncio

# async with: HTTP クライアント (aiohttp) の典型的な使い方
# import aiohttp
# async with aiohttp.ClientSession() as session:
#     async with session.get(url) as resp:
#         data = await resp.json()

# async for: 非同期ジェネレータからストリーム処理
async def stream_lines(n: int):
    for i in range(n):
        await asyncio.sleep(0.01)
        yield f"行 {i}"

async def main():
    async for line in stream_lines(3):
        print(line)

asyncio.run(main())` },
          ],
          output: `行 0
行 1
行 2`,
        },
      ],
    },
    {
      id: 's14',
      num: 14,
      title: '並列処理',
      level: 'advanced',
      items: [
        {
          id: 's14-gil-グローバルインタープリタロック',
          name: 'GIL（グローバルインタープリタロック）',
          level: 'advanced',
          keywords: 'GIL グローバルインタープリタロック スレッド CPU バウンド',
          desc: `CPython には GIL があり、同時に実行できる Python バイトコードは1スレッドのみ。スレッドは I/O 待機中に解放されるが、CPU 演算は並列化されない。`,
          code: [
          { lang: 'PYTHON', code: `# 処理の種類と適切な並列化手段
#
# I/O バウンド（ファイル・ネットワーク待機が主）
#   → threading または asyncio が有効（GIL は I/O 待機中に解放される）
#
# CPU バウンド（計算が主）
#   → multiprocessing が有効（別プロセス = 別GIL）
#   → threading では並列化されない（GIL がボトルネック）
#
# ※ Python 3.13 で "free-threaded" モード（--disable-gil）が試験的に導入。
#   通常ビルドでは依然として GIL が存在する。` },
          ],
          warn: `スレッドで CPU バウンドの処理を並列化しようとしても GIL のせいで高速化されず、むしろコンテキストスイッチのオーバーヘッドで遅くなることがある。CPU バウンドな並列化には \`multiprocessing\` または \`concurrent.futures.ProcessPoolExecutor\` を使う。`,
        },
        {
          id: 's14-threading-lock',
          name: 'threading / Lock',
          level: 'advanced',
          keywords: 'threading Thread Lock スレッド 排他制御',
          desc: `I/O バウンドなタスクの並行実行に適する。共有リソースへの競合アクセスは \`threading.Lock\` で防ぐ。`,
          code: [
          { lang: 'PYTHON', code: `import threading, time

counter = 0
lock = threading.Lock()

def increment(n: int):
    global counter
    for _ in range(n):
        with lock:              # ロックで排他制御
            counter += 1

threads = [threading.Thread(target=increment, args=(100_000,)) for _ in range(5)]
for t in threads: t.start()
for t in threads: t.join()     # 全スレッドの完了を待つ

print(counter)   # 500000` },
          ],
          output: `500000`,
        },
        {
          id: 's14-multiprocessing',
          name: 'multiprocessing',
          level: 'advanced',
          keywords: 'multiprocessing プロセス Pool CPU 並列',
          desc: `各プロセスが独立した Python インタープリタを持つため GIL の制約を受けない。CPU バウンドな処理の真の並列化に使う。プロセス間のデータ共有はコストがかかる点に注意。`,
          code: [
          { lang: 'PYTHON', code: `from multiprocessing import Pool

def square(n: int) -> int:
    return n ** 2

if __name__ == "__main__":        # Windows では必須（フォーク時の再実行を防ぐ）
    with Pool(processes=4) as pool:
        results = pool.map(square, range(10))
    print(results)
    # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]` },
          ],
        },
        {
          id: 's14-concurrent-futures-高レベルapi',
          name: 'concurrent.futures（高レベルAPI）',
          level: 'advanced',
          keywords: 'concurrent.futures ThreadPoolExecutor ProcessPoolExecutor Future',
          desc: `\`ThreadPoolExecutor\`（I/Oバウンド）と \`ProcessPoolExecutor\`（CPUバウンド）を統一インターフェースで使える。\`submit()\` で非同期にタスクを投入し、\`Future\` で結果を取得する。`,
          code: [
          { lang: 'PYTHON', code: `from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor, as_completed
import time

def fetch_fake(url: str) -> str:
    time.sleep(0.5)
    return f"OK: {url}"

urls = ["https://example.com/1", "https://example.com/2", "https://example.com/3"]

# I/O バウンド → ThreadPoolExecutor
with ThreadPoolExecutor(max_workers=3) as executor:
    futures = {executor.submit(fetch_fake, url): url for url in urls}
    for future in as_completed(futures):
        print(future.result())

# CPU バウンド → ProcessPoolExecutor（__main__ ガード必要）
# with ProcessPoolExecutor() as executor:
#     results = list(executor.map(heavy_calc, data))` },
          ],
        },
      ],
    },
    {
      id: 's15',
      num: 15,
      title: 'イテレータ・ジェネレータ',
      level: 'advanced',
      items: [
        {
          id: 's15-イテレータプロトコル',
          name: 'イテレータプロトコル',
          level: 'advanced',
          keywords: 'イテレータ __iter__ __next__ iter next プロトコル',
          desc: `\`__iter__()\` と \`__next__()\` を実装したオブジェクトがイテレータ。\`for\` ループは内部でこのプロトコルを呼び出している。`,
          code: [
          { lang: 'PYTHON', code: `class Countdown:
    def __init__(self, start: int):
        self.current = start

    def __iter__(self):
        return self             # イテレータ自身を返す

    def __next__(self):
        if self.current <= 0:
            raise StopIteration # イテレーション終了
        val = self.current
        self.current -= 1
        return val

for n in Countdown(3):
    print(n)   # 3, 2, 1

# 組み込み関数との連携
it = iter([10, 20, 30])
print(next(it))   # 10
print(next(it))   # 20` },
          ],
          output: `3
2
1
10
20`,
        },
        {
          id: 's15-yield・ジェネレータ関数',
          name: 'yield・ジェネレータ関数',
          level: 'advanced',
          keywords: 'yield ジェネレータ関数 generator 遅延評価 メモリ',
          desc: `\`yield\` を含む関数はジェネレータ関数。呼び出すとジェネレータオブジェクトを返し、\`next()\` のたびに \`yield\` まで実行して値を返す。大量データをメモリに展開せずに処理できる。`,
          code: [
          { lang: 'PYTHON', code: `def integers_from(start: int):
    """無限の整数列を生成するジェネレータ"""
    n = start
    while True:
        yield n
        n += 1

gen = integers_from(1)
print(next(gen))   # 1
print(next(gen))   # 2

# islice で先頭 N 件だけ取得
from itertools import islice
first5 = list(islice(integers_from(0), 5))
print(first5)      # [0, 1, 2, 3, 4]

# ファイルの遅延読み込み（巨大ファイルでもメモリを節約）
def read_chunks(path: str, size: int = 4096):
    with open(path, "rb") as f:
        while chunk := f.read(size):
            yield chunk` },
          ],
          output: `1
2
[0, 1, 2, 3, 4]`,
        },
        {
          id: 's15-yield-from',
          name: 'yield from',
          level: 'advanced',
          keywords: 'yield from ジェネレータ委譲 サブジェネレータ',
          desc: `別のイテラブルやジェネレータに処理を委譲する。ネストしたループを書かずに済み、サブジェネレータの \`return\` 値も受け取れる。`,
          code: [
          { lang: 'PYTHON', code: `def flatten(nested):
    """ネストしたリストを再帰的に平坦化"""
    for item in nested:
        if isinstance(item, list):
            yield from flatten(item)   # 再帰的に委譲
        else:
            yield item

data = [1, [2, [3, 4]], [5, 6]]
print(list(flatten(data)))   # [1, 2, 3, 4, 5, 6]

# yield from でチェーン
def chain_gen(*iterables):
    for it in iterables:
        yield from it

print(list(chain_gen([1,2], [3,4], [5])))  # [1, 2, 3, 4, 5]` },
          ],
          output: `[1, 2, 3, 4, 5, 6]
[1, 2, 3, 4, 5]`,
        },
        {
          id: 's15-itertools-主要関数',
          name: 'itertools 主要関数',
          level: 'advanced',
          keywords: 'itertools chain islice product combinations permutations groupby',
          desc: `標準ライブラリ \`itertools\` は遅延評価のイテレータを返す関数群。リストを事前に全展開せず処理できる。`,
          code: [
          { lang: 'PYTHON', code: `from itertools import (
    chain, islice, product, combinations,
    permutations, groupby, accumulate, cycle, repeat
)

list(chain([1,2], [3,4], [5]))       # [1, 2, 3, 4, 5]
list(islice(range(100), 5))          # [0, 1, 2, 3, 4]
list(product("AB", "12"))            # [('A','1'),('A','2'),('B','1'),('B','2')]
list(combinations("ABCD", 2))        # [('A','B'),('A','C'),...]
list(permutations("ABC", 2))         # [('A','B'),('A','C'),...]
list(accumulate([1,2,3,4]))          # [1, 3, 6, 10]（累積和）

# groupby: ソート済みデータをキーでグループ化
data = [("fruit","apple"),("fruit","mango"),("veggie","carrot")]
for key, group in groupby(data, key=lambda x: x[0]):
    print(key, [g[1] for g in group])` },
          ],
          output: `fruit ['apple', 'mango']
veggie ['carrot']`,
        },
      ],
    },
    {
      id: 's16',
      num: 16,
      title: 'メモリとスコープ',
      level: 'advanced',
      items: [
        {
          id: 's16-legb-スコープ規則',
          name: 'LEGB スコープ規則',
          level: 'advanced',
          keywords: 'LEGB スコープ Local Enclosing Global Builtin',
          desc: `変数名の解決順序: Local（関数内）→ Enclosing（外側の関数）→ Global（モジュールトップ）→ Builtin（組み込み）。`,
          code: [
          { lang: 'PYTHON', code: `x = "global"

def outer():
    x = "enclosing"

    def inner():
        x = "local"
        print(x)    # "local"（L で解決）
    inner()
    print(x)        # "enclosing"（E で解決）

outer()
print(x)            # "global"（G で解決）

# global / nonlocal で上位スコープに書き込む
count = 0
def increment():
    global count
    count += 1

def make_counter():
    n = 0
    def inc():
        nonlocal n   # 外側の関数変数に書き込む
        n += 1
        return n
    return inc` },
          ],
          output: `local
enclosing
global`,
        },
        {
          id: 's16-参照の共有-ミュータブルとイミュータブル',
          name: '参照の共有（ミュータブルとイミュータブル）',
          level: 'advanced',
          keywords: '参照渡し 値渡し ミュータブル イミュータブル 共有 副作用',
          desc: `Python の変数はすべてオブジェクトへの参照。代入は参照のコピーであり、ミュータブルなオブジェクト（list・dict等）は複数の変数から同一オブジェクトを参照することになる。`,
          code: [
          { lang: 'PYTHON', code: `# イミュータブル（int・str・tuple）：実質的に「値渡し」のように振る舞う
a = 10
b = a
b = 20
print(a)  # 10（a は変わらない）

# ミュータブル（list・dict）：同じオブジェクトへの参照を共有
x = [1, 2, 3]
y = x               # 同じリストを参照
y.append(4)
print(x)            # [1, 2, 3, 4]（x も変わる！）

# 関数に渡した場合も同様
def append_zero(lst: list) -> None:
    lst.append(0)   # 呼び出し元のリストを変更する

nums = [1, 2, 3]
append_zero(nums)
print(nums)         # [1, 2, 3, 0]` },
          ],
          output: `10
[1, 2, 3, 4]
[1, 2, 3, 0]`,
          warn: `ミュータブルなオブジェクトを関数内で変更すると呼び出し元に影響する（意図しない副作用の原因になる）。変更したくない場合は関数内でコピーを作る: \`lst = lst[:]\` または \`lst = lst.copy()\`。`,
        },
        {
          id: 's16-シャローコピーとディープコピー',
          name: 'シャローコピーとディープコピー',
          level: 'advanced',
          keywords: 'シャローコピー ディープコピー shallow deep copy copy deepcopy',
          desc: `シャローコピーは新しいコンテナを作るが内部要素は同じオブジェクトを参照する。ディープコピーはオブジェクトグラフ全体を再帰的に複製する。`,
          code: [
          { lang: 'PYTHON', code: `import copy

original = [[1, 2], [3, 4]]

# シャローコピー（新しいリストだが要素は同じオブジェクト）
shallow = copy.copy(original)     # または original[:]
shallow[0].append(99)             # 内側のリストを変更
print(original)   # [[1, 2, 99], [3, 4]] ← original も変わる！

original2 = [[1, 2], [3, 4]]

# ディープコピー（全体を再帰的に複製）
deep = copy.deepcopy(original2)
deep[0].append(99)
print(original2)  # [[1, 2], [3, 4]] ← original2 は変わらない` },
          ],
          output: `[[1, 2, 99], [3, 4]]
[[1, 2], [3, 4]]`,
        },
        {
          id: 's16-__slots__-でメモリを節約',
          name: '__slots__ でメモリを節約',
          level: 'advanced',
          keywords: '__slots__ メモリ 最適化 属性 辞書',
          desc: `通常のクラスはインスタンスごとに \`__dict__\`（辞書）を持つ。\`__slots__\` で属性名を宣言すると辞書の代わりに固定配列が使われ、メモリ消費を削減できる。大量インスタンスを生成する場合に効果的。`,
          code: [
          { lang: 'PYTHON', code: `class PointNormal:
    def __init__(self, x, y):
        self.x, self.y = x, y

class PointSlotted:
    __slots__ = ("x", "y")        # 許可する属性名を宣言
    def __init__(self, x, y):
        self.x, self.y = x, y

import sys
p1 = PointNormal(1, 2)
p2 = PointSlotted(1, 2)

print(sys.getsizeof(p1.__dict__)) # 通常: 辞書のサイズ分余分にかかる
# PointSlotted は __dict__ を持たない
# hasattr(p2, "__dict__")  → False

# 動的属性の追加は不可
# p2.z = 3   # AttributeError: __slots__ にない属性は追加できない` },
          ],
        },
      ],
    },
  ],
};

export default data;
