import type { LanguageGuide } from '../../types';

const data: LanguageGuide = {
  lang: 'Haskell',
  langSlug: 'haskell',
  version: 'GHC 9.x / Haskell 2010',
  lead: `他言語の経験者が 2〜3 時間でざっと読み通せるリファレンスです。純粋関数型・遅延評価・型クラス・モナドなど Haskell 固有の概念を重点的に解説します。`,
  accent: '#3e2e7e',
  accent2: '#ddd5ff',
  bgGradientTop: '#f0ecff',
  bgRadialLeft: 'rgba(62,46,126,0.10)',
  bgRadialRight: 'rgba(100,80,180,0.07)',
  badgeGradient: 'linear-gradient(135deg, #220e5a, #3e2e7e)',
  heroEmoji: 'λ',
  navGroups: [
    { label: '基礎', sections: ['s1','s2','s3','s4','s5','s6'] },
    { label: '型システム', sections: ['s7','s8','s9'] },
    { label: 'モナド', sections: ['s10','s11'] },
    { label: '実用', sections: ['s12','s13','s14'] },
    { label: '応用', sections: ['s15','s16'] },
  ],
  sections: [
    {
      id: 's1', num: 1, title: '値・式・不変性', level: 'basic',
      items: [
        {
          id: 's1-binding', name: '定義とバインディング', level: 'basic',
          keywords: 'let where binding expression immutable',
          desc: 'Haskell に変数はなく、すべては「定義」。一度バインドされた値は変わらない。`let ... in` と `where` でローカル定義。',
          code: [{ lang: 'Haskell', code: `x :: Int
x = 42

-- ローカル定義
result :: Double
result = let r = 5.0
             pi = 3.14159
         in pi * r * r

-- where 節
circleArea r = pi * r * r
  where pi = 3.14159` }],
        },
        {
          id: 's1-types', name: '基本型', level: 'basic',
          keywords: 'Int Integer Double Bool Char String',
          desc: '`Int`（固定長整数）・`Integer`（任意精度整数）・`Double`・`Bool`・`Char`・`String`（= `[Char]`）。型注釈は `::` で記述。',
          code: [{ lang: 'Haskell', code: `x :: Int
x = 42
y :: Integer
y = 2 ^ 100           -- 任意精度
z :: Double
z = 3.14
b :: Bool
b = True
c :: Char
c = 'A'
s :: String
s = "hello"           -- [Char] と同じ` }],
        },
        {
          id: 's1-lazy', name: '遅延評価', level: 'basic',
          keywords: 'lazy evaluation thunk infinite WHNF',
          desc: 'Haskell はデフォルトで遅延評価（非正格）。式は必要になるまで評価されない（thunk）。無限リストも定義できる。',
          code: [{ lang: 'Haskell', code: `nats :: [Int]
nats = [1..]          -- 無限リスト（遅延）

take 5 nats           -- [1,2,3,4,5]

ones :: [Int]
ones = 1 : ones       -- 無限の 1 のリスト` }],
        },
        {
          id: 's1-operators', name: '演算子と優先順位', level: 'basic',
          keywords: 'operator precedence infixl infixr backtick',
          desc: '演算子は関数。バッククォートで関数を中置演算子として使える（`x \`div\` y`）。`infixl`・`infixr` で優先順位を定義可能。',
          code: [{ lang: 'Haskell', code: `div 10 3         -- 3（前置）
10 \`div\` 3      -- 3（中置）
(+) 1 2          -- 3（演算子を前置）
1 + 2 * 3        -- 7（* が高優先）
\$                -- 最低優先度の関数適用
print \$ 1 + 2   -- print (1+2)` }],
        },
      ],
    },
    {
      id: 's2', num: 2, title: '制御フロー・パターンマッチ', level: 'basic',
      items: [
        {
          id: 's2-pattern', name: 'パターンマッチ', level: 'basic',
          keywords: 'pattern match case of constructor wildcard',
          desc: 'Haskell のパターンマッチは関数定義に直接書ける（複数節）。`case ... of` で式としても使える。',
          code: [{ lang: 'Haskell', code: `factorial :: Integer -> Integer
factorial 0 = 1
factorial n = n * factorial (n - 1)

describe :: Int -> String
describe x = case x of
    0 -> "zero"
    1 -> "one"
    _ -> "other"` }],
        },
        {
          id: 's2-guard', name: 'ガード節', level: 'basic',
          keywords: 'guard | otherwise when condition',
          desc: '`|` でガード節を書く。`otherwise` は常に真の条件（`True` と同じ）。パターンマッチとガードを組み合わせられる。',
          code: [{ lang: 'Haskell', code: `bmi :: Double -> String
bmi b
    | b <= 18.5 = "Underweight"
    | b <= 25.0 = "Normal"
    | b <= 30.0 = "Overweight"
    | otherwise = "Obese"` }],
        },
        {
          id: 's2-if', name: 'if 式', level: 'basic',
          keywords: 'if then else expression',
          desc: 'Haskell の `if` は式であり `else` 節は必須（両分岐の型が一致する必要がある）。',
          code: [{ lang: 'Haskell', code: `abs' :: Int -> Int
abs' n = if n < 0 then -n else n

-- 多段は guard の方が読みやすい
max' a b = if a > b then a else b` }],
        },
        {
          id: 's2-where-let', name: 'where と let...in', level: 'basic',
          keywords: 'where let in local binding scope',
          desc: '`where` は定義の後に書くローカル定義節（関数全体のスコープ）。`let...in` は式の中で使うローカル定義。',
          code: [{ lang: 'Haskell', code: `hypotenuse :: Double -> Double -> Double
hypotenuse a b = sqrt (sq a + sq b)
  where sq x = x * x

-- let in
compute :: Int -> Int
compute n = let x = n * 2
                y = x + 1
            in x * y` }],
        },
      ],
    },
    {
      id: 's3', num: 3, title: '関数・高階関数', level: 'basic',
      items: [
        {
          id: 's3-currying', name: 'カリー化と部分適用', level: 'basic',
          keywords: 'currying partial application function arrow ->',
          desc: 'Haskell のすべての関数は自動でカリー化。`f a b` は `(f a) b`。引数を一部渡して部分適用した関数を作れる。',
          code: [{ lang: 'Haskell', code: `add :: Int -> Int -> Int
add x y = x + y

add5 :: Int -> Int
add5 = add 5        -- 部分適用

map (* 2) [1,2,3]  -- [2,4,6]
filter (> 3) [1..5] -- [4,5]` }],
        },
        {
          id: 's3-lambda', name: 'ラムダ式', level: 'basic',
          keywords: 'lambda \\x -> anonymous function',
          desc: '`\\x -> expr` でラムダ式（無名関数）を定義。バックスラッシュが λ の代替。',
          code: [{ lang: 'Haskell', code: `double :: [Int] -> [Int]
double = map (\\ x -> x * 2)

-- セクション（演算子の部分適用）
map (* 2) [1,2,3]       -- [2,4,6]
map (subtract 1) [1,2,3] -- [0,1,2]（1を引く）` }],
        },
        {
          id: 's3-composition', name: '関数合成 (.)', level: 'basic',
          keywords: 'composition . pipe function apply $',
          desc: '`.`（ドット）で関数を合成。`(f . g) x = f (g x)`。`$` は最低優先度の関数適用で括弧を省略できる。',
          code: [{ lang: 'Haskell', code: `import Data.Char (toUpper)
import Data.List (intercalate)

titleCase :: String -> String
titleCase = intercalate " "
          . map (\\(h:t) -> toUpper h : t)
          . words

-- $の使用
print \$ map (* 2) [1..5]   -- print (map (* 2) [1..5])` }],
        },
        {
          id: 's3-higher-order', name: 'map・filter・fold', level: 'basic',
          keywords: 'map filter foldl foldr scan',
          desc: 'Haskell の中核的な高階関数。`foldr` は右結合で遅延評価と相性が良い。`foldl\'`（正格版）が大きなリストに推奨。',
          code: [{ lang: 'Haskell', code: `map    (+ 1)   [1,2,3]   -- [2,3,4]
filter even    [1..10]   -- [2,4,6,8,10]
foldl  (+) 0   [1..5]    -- 15
foldr  (:) []  [1,2,3]   -- [1,2,3]（リストの再構成）
scanl  (+) 0   [1..5]    -- [0,1,3,6,10,15]` }],
        },
      ],
    },
    {
      id: 's4', num: 4, title: 'リスト・タプル', level: 'basic',
      items: [
        {
          id: 's4-list', name: 'リスト', level: 'basic',
          keywords: 'list [] : ++ head tail cons nil',
          desc: '連結リスト。`[]` が空リスト、`:` が先頭追加（cons）。パターンマッチで `(x:xs)` と分割できる。',
          code: [{ lang: 'Haskell', code: `[1, 2, 3]         -- リストリテラル
1 : [2, 3]         -- 先頭追加 → [1,2,3]
[1,2] ++ [3,4]     -- 結合 → [1,2,3,4]
head [1,2,3]       -- 1
tail [1,2,3]       -- [2,3]
null []            -- True（空判定）
length [1,2,3]     -- 3` }],
        },
        {
          id: 's4-comprehension', name: 'リスト内包表記', level: 'basic',
          keywords: 'list comprehension generator guard',
          desc: '`[ expr | x <- list, condition ]` の形式でリストを生成。SQL の SELECT に相当。',
          code: [{ lang: 'Haskell', code: `[ x^2 | x <- [1..10] ]
-- [1,4,9,16,25,36,49,64,81,100]

[ (x,y) | x <- [1..3], y <- [1..3], x /= y ]
-- [(1,2),(1,3),(2,1),(2,3),(3,1),(3,2)]

evens = [ x | x <- [1..20], even x ]` }],
        },
        {
          id: 's4-tuple', name: 'タプル', level: 'basic',
          keywords: 'tuple (,) fst snd pair',
          desc: '固定長・異種型のデータ構造。`fst`・`snd` でペアの要素を取得。パターンマッチで分割。',
          code: [{ lang: 'Haskell', code: `(1, "hello", True) :: (Int, String, Bool)
fst (1, 2)           -- 1
snd (1, 2)           -- 2
let (x, y) = (3, 4)  -- パターン分割
zip [1,2,3] "abc"    -- [(1,'a'),(2,'b'),(3,'c')]` }],
        },
        {
          id: 's4-string', name: '文字列処理', level: 'basic',
          keywords: 'String Text ByteString words unwords',
          desc: '`String = [Char]` は便利だが遅い。本番では `Data.Text`（テキスト）・`Data.ByteString`（バイナリ）を使う。',
          code: [{ lang: 'Haskell', code: `words "hello world"          -- ["hello","world"]
unwords ["hello","world"]    -- "hello world"
lines "a\\nb\\nc"             -- ["a","b","c"]
unlines ["a","b"]            -- "a\\nb\\n"

import Data.Char (toUpper)
map toUpper "hello"          -- "HELLO"` }],
        },
      ],
    },
    {
      id: 's5', num: 5, title: '型定義', level: 'basic',
      items: [
        {
          id: 's5-data', name: 'data 型（代数的データ型）', level: 'basic',
          keywords: 'data ADT constructor Sum Product record',
          desc: '`data` で代数的データ型を定義。直和型（sum type）と直積型（product type）の組み合わせ。',
          code: [{ lang: 'Haskell', code: `-- 直和型（判別共用体）
data Color = Red | Green | Blue

-- 直積型（レコード）
data Point = Point { x :: Double, y :: Double }

-- 組み合わせ
data Shape
    = Circle { radius :: Double }
    | Rect   { width :: Double, height :: Double }

area :: Shape -> Double
area (Circle r)     = pi * r * r
area (Rect w h)     = w * h` }],
        },
        {
          id: 's5-newtype', name: 'newtype', level: 'basic',
          keywords: 'newtype wrapper zero cost type safety',
          desc: '`newtype` は単一フィールドを持つラッパー型。実行時コストはゼロ（コンパイル後は内部型と同一）。型安全な区別が目的。',
          code: [{ lang: 'Haskell', code: `newtype Name  = Name  String
newtype Email = Email String

createUser :: Name -> Email -> String
createUser (Name n) (Email e) = n ++ " <" ++ e ++ ">"

-- createUser (Email "x@y") (Name "Bob")  -- 型エラー` }],
        },
        {
          id: 's5-type', name: 'type エイリアス', level: 'basic',
          keywords: 'type alias synonym String',
          desc: '`type` は型の別名。`String = [Char]` が代表例。新しい型ではなく、同じ型を別の名前で呼ぶだけ。',
          code: [{ lang: 'Haskell', code: `type Name   = String
type Age    = Int
type Person = (Name, Age)

greet :: Person -> String
greet (n, a) = n ++ " is " ++ show a ++ " years old"` }],
        },
        {
          id: 's5-maybe', name: 'Maybe と Either', level: 'basic',
          keywords: 'Maybe Just Nothing Either Left Right null',
          desc: '`Maybe a` は `Just a` または `Nothing`（null の型安全な代替）。`Either e a` は `Left e`（エラー）または `Right a`（成功）。',
          code: [{ lang: 'Haskell', code: `safeDiv :: Int -> Int -> Maybe Int
safeDiv _ 0 = Nothing
safeDiv a b = Just (a \`div\` b)

safeDiv 10 2   -- Just 5
safeDiv 10 0   -- Nothing

-- Either でエラー情報を持つ
safeSqrt :: Double -> Either String Double
safeSqrt x
    | x < 0    = Left "Negative input"
    | otherwise = Right (sqrt x)` }],
        },
      ],
    },
    {
      id: 's6', num: 6, title: '例外・IO', level: 'basic',
      items: [
        {
          id: 's6-io', name: 'IO 型と do 記法', level: 'basic',
          keywords: 'IO do <- return putStrLn getLine',
          desc: '副作用は `IO a` 型で管理する。`do` 記法で手続き的に書ける。`<-` で IO から値を取り出す。`return` は値を IO にラップ（Haskell の `return` は C の `return` とは違う）。',
          code: [{ lang: 'Haskell', code: `main :: IO ()
main = do
    putStr "Name: "
    name <- getLine
    putStrLn ("Hello, " ++ name ++ "!")
    let greeting = "Welcome, " ++ name
    putStrLn greeting` }],
        },
        {
          id: 's6-exception', name: '例外処理', level: 'basic',
          keywords: 'catch try throw SomeException IOException',
          desc: '`Control.Exception` で例外を扱う。`catch`・`try`・`throwIO`。`IOException` はファイル I/O エラーに使う。',
          code: [{ lang: 'Haskell', code: `import Control.Exception

main :: IO ()
main = do
    result <- try (readFile "missing.txt") :: IO (Either IOException String)
    case result of
        Right content -> putStrLn content
        Left e        -> putStrLn ("Error: " ++ show e)` }],
        },
        {
          id: 's6-interact', name: 'interact と getContents', level: 'basic',
          keywords: 'interact getContents stdin stdout pipe',
          desc: '`interact` は stdin 全体を受け取って変換する簡便関数。`getContents` で遅延読み込み可能。',
          code: [{ lang: 'Haskell', code: `-- 行を逆順にするプログラム
main :: IO ()
main = interact (unlines . reverse . lines)` }],
        },
      ],
    },
    {
      id: 's7', num: 7, title: '型クラス', level: 'basic',
      items: [
        {
          id: 's7-typeclass', name: '型クラスの定義と実装', level: 'basic',
          keywords: 'class instance method typeclass polymorphism',
          desc: '型クラスは「ある型が持つべきインターフェース」を定義する。`class` で定義し、`instance` で実装。',
          code: [{ lang: 'Haskell', code: `class Describable a where
    describe :: a -> String

data Color = Red | Green | Blue

instance Describable Color where
    describe Red   = "red color"
    describe Green = "green color"
    describe Blue  = "blue color"

describe Red   -- "red color"` }],
        },
        {
          id: 's7-standard', name: '主要な標準型クラス', level: 'basic',
          keywords: 'Eq Ord Show Read Num Functor Foldable',
          desc: '`Eq`（等値）・`Ord`（順序）・`Show`（文字列化）・`Read`（解析）・`Num`（数値演算）・`Functor`（fmap）など。`deriving` で自動導出。',
          code: [{ lang: 'Haskell', code: `data Point = Point Double Double
    deriving (Show, Eq, Ord)

p = Point 1.0 2.0
show p           -- "Point 1.0 2.0"
p == Point 1.0 2.0  -- True

-- Functor の instance
instance Functor ((,) a) where
    fmap f (x, y) = (x, f y)` }],
        },
        {
          id: 's7-functor', name: 'Functor と fmap', level: 'basic',
          keywords: 'Functor fmap <$> lift map',
          desc: '`Functor` はコンテキストの中の値を変換する型クラス。`fmap` が核心メソッド。`<\$>` は中置版の `fmap`。',
          code: [{ lang: 'Haskell', code: `fmap (+1) (Just 5)      -- Just 6
fmap (+1) Nothing       -- Nothing
fmap (*2) [1,2,3]       -- [2,4,6]（map と同じ）
fmap length (Just "hi") -- Just 2

(+1) <\$> Just 5        -- Just 6（中置）` }],
        },
        {
          id: 's7-derivng', name: 'deriving と Generic', level: 'advanced',
          keywords: 'deriving Generic DeriveGeneric Show Eq',
          desc: '`deriving` で `Show`・`Eq`・`Ord`・`Generic` を自動導出。`GHC.Generics` と組み合わせてシリアライズ（aeson など）を自動化できる。',
          code: [{ lang: 'Haskell', code: `{-# LANGUAGE DeriveGeneric #-}
import GHC.Generics (Generic)
import Data.Aeson   (ToJSON, FromJSON)

data User = User { name :: String, age :: Int }
    deriving (Show, Eq, Generic)

instance ToJSON  User
instance FromJSON User` }],
        },
      ],
    },
    {
      id: 's8', num: 8, title: 'Applicative・Monad', level: 'advanced',
      items: [
        {
          id: 's8-applicative', name: 'Applicative', level: 'advanced',
          keywords: 'Applicative <*> pure ap',
          desc: '`Applicative` は文脈の中の関数を文脈の中の値に適用する。`<*>` と `pure`（値をコンテキストに入れる）が核心。',
          code: [{ lang: 'Haskell', code: `pure (+3) <*> Just 5       -- Just 8
Just (+3) <*> Just 5       -- Just 8
Nothing   <*> Just 5       -- Nothing
[(+1),(* 2)] <*> [10,20]   -- [11,21,20,40]` }],
        },
        {
          id: 's8-monad', name: 'Monad と >>= ', level: 'advanced',
          keywords: 'Monad bind >>= return do notation chain',
          desc: '`Monad` はコンテキストの計算をチェーンする。`>>=`（bind）は左辺のコンテキストから値を取り出して関数に渡す。`do` 記法はシンタックスシュガー。',
          code: [{ lang: 'Haskell', code: `-- Maybe モナド
safeDiv :: Int -> Int -> Maybe Int
safeDiv _ 0 = Nothing
safeDiv a b = Just (a \`div\` b)

compute :: Maybe Int
compute = do
    x <- safeDiv 10 2   -- Just 5
    y <- safeDiv x  0   -- Nothing
    return (x + y)      -- Nothing（途中で失敗）` }],
        },
        {
          id: 's8-list-monad', name: 'List モナド', level: 'advanced',
          keywords: 'list monad nondeterminism guard concatMap',
          desc: 'リストはモナドとして非決定性計算を表す。`>>=` が `concatMap` に相当。`guard` で条件フィルタリング。',
          code: [{ lang: 'Haskell', code: `import Control.Monad (guard)

pythagorean :: Int -> [(Int,Int,Int)]
pythagorean n = do
    a <- [1..n]
    b <- [a..n]
    c <- [b..n]
    guard (a^2 + b^2 == c^2)
    return (a, b, c)

pythagorean 20  -- [(3,4,5),(5,12,13),(6,8,10),(8,15,17)]` }],
        },
        {
          id: 's8-state', name: 'State モナド', level: 'advanced',
          keywords: 'State get put modify runState execState',
          desc: '`State s a` は状態を引き回す計算をカプセル化。`get`・`put`・`modify` で状態を操作。純粋関数型で可変状態をシミュレート。',
          code: [{ lang: 'Haskell', code: `import Control.Monad.State

counter :: State Int Int
counter = do
    n <- get
    put (n + 1)
    return n

runState (do { counter; counter; counter }) 0
-- (2, 3)  ← 最後の戻り値=2, 最終状態=3` }],
        },
      ],
    },
    {
      id: 's9', num: 9, title: 'ジェネリクス・型レベルプログラミング', level: 'advanced',
      items: [
        {
          id: 's9-parametric', name: 'パラメトリック多相', level: 'basic',
          keywords: 'parametric polymorphism forall a type variable',
          desc: '型変数（`a`・`b`）で任意の型に対して動作するジェネリック関数を定義。',
          code: [{ lang: 'Haskell', code: `id :: a -> a
id x = x

const :: a -> b -> a
const x _ = x

flip :: (a -> b -> c) -> b -> a -> c
flip f y x = f x y` }],
        },
        {
          id: 's9-kind', name: 'Kind（型の型）', level: 'advanced',
          keywords: 'kind * Type -> Constraint',
          desc: '型の型を「kind」と呼ぶ。`Int` の kind は `*`（= `Type`）、`Maybe` の kind は `* -> *`（型を受け取って型を返す）。',
          code: [{ lang: 'Haskell', code: `-- :kind コマンドで確認（GHCi）
-- :k Int     → Type
-- :k Maybe   → Type -> Type
-- :k Either  → Type -> Type -> Type
-- :k Functor → (Type -> Type) -> Constraint` }],
        },
        {
          id: 's9-gadt', name: 'GADT', level: 'advanced',
          keywords: 'GADT generalized algebraic data type where',
          desc: '一般化代数データ型。コンストラクタごとに異なる型索引を付けられる。型安全な AST の表現などに使う。',
          code: [{ lang: 'Haskell', code: `{-# LANGUAGE GADTs #-}
data Expr a where
    Lit  :: Int          -> Expr Int
    Bool :: Bool         -> Expr Bool
    Add  :: Expr Int -> Expr Int -> Expr Int
    If   :: Expr Bool -> Expr a -> Expr a -> Expr a

eval :: Expr a -> a
eval (Lit n)    = n
eval (Bool b)   = b
eval (Add x y)  = eval x + eval y
eval (If p t f) = if eval p then eval t else eval f` }],
        },
      ],
    },
    {
      id: 's10', num: 10, title: 'よく使うモナドとトランスフォーマー', level: 'advanced',
      items: [
        {
          id: 's10-reader', name: 'Reader モナド', level: 'advanced',
          keywords: 'Reader ask asks environment configuration',
          desc: '`Reader r a` は読み取り専用の環境 `r` を引き回す計算。依存注入や設定の受け渡しに使う。',
          code: [{ lang: 'Haskell', code: `import Control.Monad.Reader

data Config = Config { host :: String, port :: Int }

getUrl :: Reader Config String
getUrl = do
    h <- asks host
    p <- asks port
    return \$ h ++ ":" ++ show p

runReader getUrl (Config "localhost" 8080)
-- "localhost:8080"` }],
        },
        {
          id: 's10-writer', name: 'Writer モナド', level: 'advanced',
          keywords: 'Writer tell log accumulate',
          desc: '`Writer w a` はログなどの出力を蓄積しながら計算を進める。`tell` でログを追記する。',
          code: [{ lang: 'Haskell', code: `import Control.Monad.Writer

loggedAdd :: Int -> Int -> Writer [String] Int
loggedAdd x y = do
    tell ["Adding " ++ show x ++ " and " ++ show y]
    return (x + y)

runWriter (loggedAdd 3 4)
-- (7, ["Adding 3 and 4"])` }],
        },
        {
          id: 's10-mtl', name: 'モナドトランスフォーマー（mtl）', level: 'advanced',
          keywords: 'transformer mtl StateT ReaderT ExceptT lift',
          desc: '`StateT`・`ReaderT`・`ExceptT` でモナドをスタックし、複数の効果を組み合わせる。`lift` で下位のモナドの操作を持ち上げる。',
          code: [{ lang: 'Haskell', code: `import Control.Monad.State
import Control.Monad.Except

type App a = ExceptT String (State Int) a

increment :: App ()
increment = do
    n <- lift get
    if n >= 10 then throwError "Limit reached"
    else lift \$ put (n + 1)

runState (runExceptT increment) 0
-- (Right (), 1)` }],
        },
      ],
    },
    {
      id: 's11', num: 11, title: 'IO と副作用の管理', level: 'basic',
      items: [
        {
          id: 's11-stref', name: 'IORef・STRef（ミュータブル参照）', level: 'basic',
          keywords: 'IORef STRef mutable newIORef readIORef writeIORef modifyIORef',
          desc: '`IORef a` は IO の中で使えるミュータブル参照。`ST` モナドは純粋計算内でのみ使えるミュータブル状態。',
          code: [{ lang: 'Haskell', code: `import Data.IORef

main :: IO ()
main = do
    ref <- newIORef (0 :: Int)
    modifyIORef ref (+1)
    modifyIORef ref (+1)
    val <- readIORef ref
    print val   -- 2` }],
        },
        {
          id: 's11-concurrency', name: '並行処理（STM・async）', level: 'advanced',
          keywords: 'STM TVar async concurrently forkIO',
          desc: 'STM（Software Transactional Memory）は `TVar` を使ったデッドロックフリーの並行状態管理。`async` ライブラリで並行タスクを管理。',
          code: [{ lang: 'Haskell', code: `import Control.Concurrent.STM
import Control.Concurrent.Async

main :: IO ()
main = do
    counter <- newTVarIO (0 :: Int)
    let increment = atomically \$ modifyTVar' counter (+1)
    (a, b) <- concurrently (mapM_ (\\_ -> increment) [1..1000])
                            (mapM_ (\\_ -> increment) [1..1000])
    final <- readTVarIO counter
    print final  -- 2000` }],
        },
        {
          id: 's11-unsafeio', name: 'unsafePerformIO の危険性', level: 'advanced',
          keywords: 'unsafePerformIO unsafe IO escape hatch',
          desc: '`unsafePerformIO` は IO を純粋関数として実行する「脱出ハッチ」。型システムを破るため、誤用するとバグの原因になる。使用は極めて限定的にする。',
          warn: '`unsafePerformIO` は参照透過性を破壊する。FFI やグローバルな IORef の初期化など、安全性が保証できる場合のみ使用すること。',
          code: [{ lang: 'Haskell', code: `import System.IO.Unsafe
-- 注意: これは例示。基本的に使うべきではない
globalRef :: IORef Int
globalRef = unsafePerformIO (newIORef 0)
{-# NOINLINE globalRef #-}` }],
        },
      ],
    },
    {
      id: 's12', num: 12, title: 'ファイル・テキスト処理', level: 'basic',
      items: [
        {
          id: 's12-file', name: 'ファイル操作', level: 'basic',
          keywords: 'readFile writeFile appendFile hSetEncoding',
          desc: '`readFile`・`writeFile`・`appendFile` で基本的なファイル操作。`System.IO` の `Handle` で詳細制御。',
          code: [{ lang: 'Haskell', code: `import System.IO

main :: IO ()
main = do
    content <- readFile "input.txt"
    let processed = map toUpper content
    writeFile "output.txt" processed
    appendFile "log.txt" "done\\n"` }],
        },
        {
          id: 's12-text', name: 'Data.Text と Data.ByteString', level: 'basic',
          keywords: 'Text ByteString pack unpack encodeUtf8',
          desc: '`Data.Text` は Unicode テキスト処理に最適化。`Data.ByteString` はバイナリデータ用。本番コードでは `String` より推奨。',
          code: [{ lang: 'Haskell', code: `import qualified Data.Text    as T
import qualified Data.Text.IO as TIO

main :: IO ()
main = do
    content <- TIO.readFile "input.txt"
    let upper = T.toUpper content
    TIO.putStrLn upper` }],
        },
        {
          id: 's12-aeson', name: 'JSON（aeson）', level: 'basic',
          keywords: 'aeson JSON encode decode ToJSON FromJSON',
          desc: '`aeson` は Haskell の標準 JSON ライブラリ。`Generic` と組み合わせてボイラープレートなしで JSON 変換できる。',
          code: [{ lang: 'Haskell', code: `{-# LANGUAGE DeriveGeneric #-}
import GHC.Generics
import Data.Aeson

data User = User { name :: String, age :: Int }
    deriving (Show, Generic)
instance ToJSON  User
instance FromJSON User

-- encode (User "Alice" 30) → "{\"name\":\"Alice\",\"age\":30}"` }],
        },
      ],
    },
    {
      id: 's13', num: 13, title: 'ビルドツール・エコシステム', level: 'basic',
      items: [
        {
          id: 's13-cabal-stack', name: 'cabal と Stack', level: 'basic',
          keywords: 'cabal stack GHC build project setup',
          desc: '`cabal`（Haskell の標準ビルドツール）と `stack`（再現性を重視したビルドツール）の2つが主流。初学者には `cabal` が推奨（GHCup で GHC 管理）。',
          code: [{ lang: 'Haskell', code: `# cabal
cabal init --non-interactive
cabal build
cabal run
cabal test

# stack
stack new my-project
stack build
stack run` }],
        },
        {
          id: 's13-hls', name: 'HLS・GHCi', level: 'basic',
          keywords: 'HLS Haskell Language Server GHCi REPL IDE',
          desc: 'HLS（Haskell Language Server）がほぼすべての IDE の LSP バックエンド。GHCi で対話的に試せる。`:type`・`:kind`・`:info` が特に便利。',
          code: [{ lang: 'Haskell', code: `-- GHCi コマンド
ghci
> :type map          -- map :: (a -> b) -> [a] -> [b]
> :kind Maybe        -- Maybe :: Type -> Type
> :info Functor      -- 型クラスの定義と全 instance
> :set +s            -- 実行時間とメモリを表示` }],
        },
        {
          id: 's13-hackage', name: 'Hackage・Stackage', level: 'basic',
          keywords: 'Hackage Stackage package repository',
          desc: 'Hackage は Haskell のパッケージリポジトリ。Stackage は検証済みのスナップショット（LTS・Nightly）を提供し、依存関係の整合性を保証。',
          code: [{ lang: 'Haskell', code: `# cabal.project で依存追加
# build-depends: aeson >= 2.0, text, containers

# cabal で最新版を取得
cabal update
cabal install aeson` }],
        },
      ],
    },
    {
      id: 's14', num: 14, title: 'テスト・QuickCheck', level: 'basic',
      items: [
        {
          id: 's14-hunit', name: 'HUnit', level: 'basic',
          keywords: 'HUnit test assertion assertEqual @?=',
          desc: '`HUnit` は Haskell の xUnit スタイルテストフレームワーク。`@?=` で等値アサーション。',
          code: [{ lang: 'Haskell', code: `import Test.HUnit

testAdd :: Test
testAdd = TestCase \$ do
    assertEqual "1+1" 2 (1+1)
    assertEqual "head" 1 (head [1,2,3])

main :: IO ()
main = runTestTT testAdd >>= print` }],
        },
        {
          id: 's14-quickcheck', name: 'QuickCheck（プロパティテスト）', level: 'basic',
          keywords: 'QuickCheck property Arbitrary Gen forAll',
          desc: 'プロパティ（性質）を定義し、ランダムな入力で自動テスト。Haskell 発祥で他言語にも移植された。反例が見つかると最小化して報告する。',
          code: [{ lang: 'Haskell', code: `import Test.QuickCheck

prop_revRev :: [Int] -> Bool
prop_revRev xs = reverse (reverse xs) == xs

prop_sortOrdered :: [Int] -> Bool
prop_sortOrdered xs = isSorted (sort xs)
  where isSorted ys = all (uncurry (<=)) (zip ys (tail ys))

main :: IO ()
main = do
    quickCheck prop_revRev
    quickCheck prop_sortOrdered` }],
        },
        {
          id: 's14-hspec', name: 'Hspec', level: 'basic',
          keywords: 'Hspec describe it BDD shouldBe',
          desc: '`Hspec` は BDD スタイルのテストフレームワーク。`describe`・`it`・`shouldBe` で読みやすいテスト記述ができる。QuickCheck と統合可能。',
          code: [{ lang: 'Haskell', code: `import Test.Hspec

spec :: Spec
spec = do
    describe "reverse" \$ do
        it "reverses a list" \$
            reverse [1,2,3] \`shouldBe\` [3,2,1]
        it "is involutory" \$ property \$
            \\xs -> reverse (reverse xs) == (xs :: [Int])` }],
        },
      ],
    },
    {
      id: 's15', num: 15, title: '高度な型システム機能', level: 'advanced',
      items: [
        {
          id: 's15-typeapp', name: 'TypeApplications', level: 'advanced',
          keywords: 'TypeApplications @ type application explicit',
          desc: '`@Type` で型変数に明示的に型を渡せる。型推論が曖昧な場合に型を明確に指定できる。',
          code: [{ lang: 'Haskell', code: `{-# LANGUAGE TypeApplications #-}
read @Int "42"      -- 42 :: Int
show @Double 3.14   -- "3.14"
pure @Maybe 42      -- Just 42` }],
        },
        {
          id: 's15-datakinds', name: 'DataKinds・型レベルプログラミング', level: 'advanced',
          keywords: 'DataKinds KindSignatures TypeFamilies Nat',
          desc: '`DataKinds` で値コンストラクタを型レベルに昇格。型レベルの自然数（`Nat`）やリスト（`\'[]`）が使える。型安全な長さ付きベクターなどを実装できる。',
          code: [{ lang: 'Haskell', code: `{-# LANGUAGE DataKinds, KindSignatures #-}
import GHC.TypeLits

data Vec (n :: Nat) a where
    VNil  :: Vec 0 a
    VCons :: a -> Vec n a -> Vec (n + 1) a

-- vHead :: Vec (n+1) a -> a（空ベクターは型エラー）
vHead :: Vec (1 + n) a -> a
vHead (VCons x _) = x` }],
        },
        {
          id: 's15-profunctors', name: 'Profunctor・Lens', level: 'advanced',
          keywords: 'lens optics Getter Setter profunctor view over',
          desc: '`lens` ライブラリでネストしたデータ構造の getter/setter を型安全に合成できる。`view`・`over`・`set` で操作。',
          code: [{ lang: 'Haskell', code: `import Control.Lens

data Address = Address { _city :: String }
data Person  = Person  { _name :: String, _address :: Address }

makeLenses ''Address
makeLenses ''Person

alice = Person "Alice" (Address "Tokyo")
view (address . city) alice    -- "Tokyo"
over (address . city) (++ "!") alice  -- Address "Tokyo!"` }],
        },
      ],
    },
    {
      id: 's16', num: 16, title: 'パフォーマンス・実践', level: 'advanced',
      items: [
        {
          id: 's16-bangs', name: '正格評価（BangPatterns・seq）', level: 'advanced',
          keywords: 'strict lazy bang ! seq deepseq performance',
          desc: '遅延評価はサンクの蓄積でメモリを消費することがある。`!`（BangPatterns）・`seq`・`deepseq`・`foldl\'` で正格評価を強制できる。',
          code: [{ lang: 'Haskell', code: `{-# LANGUAGE BangPatterns #-}
import Control.DeepSeq

-- 正格な foldl'（サンク蓄積を防ぐ）
import Data.List (foldl')
sum' :: [Int] -> Int
sum' = foldl' (+) 0

-- BangPatterns で引数を正格評価
loop :: !Int -> Int -> Int
loop acc 0 = acc
loop acc n = loop (acc + n) (n - 1)` }],
        },
        {
          id: 's16-criterion', name: 'Criterion ベンチマーク', level: 'advanced',
          keywords: 'criterion benchmark whnf nf performance measurement',
          desc: '`criterion` は統計的に精密な Haskell のベンチマークライブラリ。WHNF（弱頭部正規形）と NF（正規形）の評価を区別して計測できる。',
          code: [{ lang: 'Haskell', code: `import Criterion.Main

main :: IO ()
main = defaultMain
    [ bench "foldl'" \$ whnf (foldl' (+) 0) [1..10000 :: Int]
    , bench "sum"    \$ nf    sum             [1..10000 :: Int]
    ]` }],
        },
        {
          id: 's16-profiling', name: 'プロファイリング', level: 'advanced',
          keywords: 'profiling +RTS -p heap time GHC',
          desc: 'GHC のプロファイリングフラグでメモリ・時間のコストを計測。`+RTS -p -h` でコスト集計とヒープグラフを生成。',
          code: [{ lang: 'Haskell', code: `# プロファイリングビルド
cabal build --enable-profiling

# 実行時にプロファイリング
./my-program +RTS -p -h -RTS

# 生成ファイル
# my-program.prof  → コスト集計
# my-program.hp    → ヒープグラフ（hp2ps で可視化）` }],
        },
        {
          id: 's16-ghc-extensions', name: 'よく使う GHC 拡張', level: 'advanced',
          keywords: 'extension OverloadedStrings LambdaCase ScopedTypeVariables',
          desc: 'GHC 拡張で Haskell 標準の機能を拡張できる。`OverloadedStrings`・`LambdaCase`・`RecordWildCards` は特に使用頻度が高い。',
          code: [{ lang: 'Haskell', code: `{-# LANGUAGE OverloadedStrings  #-}  -- 文字列リテラルを多相的に
{-# LANGUAGE LambdaCase         #-}  -- \\case で無名パターンマッチ
{-# LANGUAGE RecordWildCards    #-}  -- let {..} = record でフィールド展開
{-# LANGUAGE TupleSections      #-}  -- (,3) = \\x -> (x,3)
{-# LANGUAGE ScopedTypeVariables #-} -- 型変数をスコープに持ち込む` }],
        },
      ],
    },
  ],
};

export default data;
