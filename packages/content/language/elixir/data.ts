import type { LanguageGuide } from '../../types';

const data: LanguageGuide = {
  lang: 'Elixir',
  langSlug: 'elixir',
  version: 'Elixir 1.17.x',
  lead: `他言語の経験者が 2〜3 時間でざっと読み通せるリファレンスです。アクターモデル・OTP・関数型設計など Elixir 固有の概念を重点的に解説します。`,
  accent: '#4b0082',
  accent2: '#ecdeff',
  bgGradientTop: '#f5eeff',
  bgRadialLeft: 'rgba(75,0,130,0.10)',
  bgRadialRight: 'rgba(120,50,200,0.07)',
  badgeGradient: 'linear-gradient(135deg, #2d0060, #4b0082)',
  heroEmoji: '💧',
  navGroups: [
    { label: '基礎', sections: ['s1','s2','s3','s4','s5','s6'] },
    { label: 'OTP', sections: ['s7','s8','s9'] },
    { label: '関数型', sections: ['s10','s11'] },
    { label: '実用', sections: ['s12','s13','s14'] },
    { label: '応用', sections: ['s15','s16'] },
  ],
  sections: [
    {
      id: 's1', num: 1, title: '変数・型・不変性', level: 'basic',
      items: [
        {
          id: 's1-immutable', name: '不変バインディング', level: 'basic',
          keywords: '不変 immutable rebind = match',
          desc: 'Elixir の変数は再代入できない（バインディング）。ただし同名変数へのリバインドは許可される。`=` は代入ではなく「パターンマッチ演算子」である。',
          code: [{ lang: 'Elixir', code: `x = 42
x = 100      # OK: リバインド（新しいバインディング）
{a, b} = {1, 2}  # パターンマッチで分割代入
^x = 100     # ピン演算子: 値を固定して照合` }],
        },
        {
          id: 's1-types', name: '基本型', level: 'basic',
          keywords: 'integer float boolean atom string list tuple map',
          desc: 'Elixir の主な型: 整数・浮動小数点・論理値（`true`/`false` はアトム）・アトム（`:name`）・文字列（バイナリ）・リスト・タプル・マップ。',
          code: [{ lang: 'Elixir', code: `42           # integer
3.14         # float
true         # atom（== :true）
:ok          # atom
"hello"      # binary string（UTF-8）
[1, 2, 3]   # list（linked list）
{:ok, 42}   # tuple
%{a: 1}     # map` }],
        },
        {
          id: 's1-atom', name: 'アトム', level: 'basic',
          keywords: 'atom symbol :ok :error nil',
          desc: 'アトムは名前そのものが値であるリテラル。`nil`・`true`・`false` もアトム。関数の戻り値パターン（`{:ok, val}`・`{:error, reason}`）に多用される。',
          code: [{ lang: 'Elixir', code: `:ok
:error
:hello
nil == false  # false（nil と false は別のアトム）
is_atom(:ok)  # true
is_nil(nil)   # true` }],
        },
        {
          id: 's1-pin', name: 'ピン演算子 ^', level: 'basic',
          keywords: 'pin operator ^ pattern match rebind',
          desc: '`^x` とすると変数をリバインドせず、現在の値でパターンマッチを行う。',
          code: [{ lang: 'Elixir', code: `x = 1
^x = 1   # OK
^x = 2   # ** (MatchError) no match of right hand side value: 2` }],
        },
      ],
    },
    {
      id: 's2', num: 2, title: '制御フロー', level: 'basic',
      items: [
        {
          id: 's2-case', name: 'case 式', level: 'basic',
          keywords: 'case when guard pattern',
          desc: '`case` はパターンマッチベースの分岐。`when` ガードで条件を追加できる。',
          code: [{ lang: 'Elixir', code: `result = {:ok, 42}
case result do
  {:ok, value} when value > 0 -> "positive: \#{value}"
  {:ok, value} -> "non-positive: \#{value}"
  {:error, reason} -> "error: \#{reason}"
end` }],
        },
        {
          id: 's2-cond-if', name: 'cond / if / unless', level: 'basic',
          keywords: 'cond if unless else',
          desc: '`cond` は最初の真条件の節を実行する（`elif` の連鎖に相当）。`if`/`unless` は単純な真偽分岐。',
          code: [{ lang: 'Elixir', code: `score = 75
cond do
  score >= 90 -> "A"
  score >= 70 -> "B"
  true -> "C"       # デフォルト節
end

if score >= 60, do: "Pass", else: "Fail"` }],
        },
        {
          id: 's2-with', name: 'with 式', level: 'basic',
          keywords: 'with else pipeline happy path',
          desc: '`with` はパターンマッチのチェーン。全て成功した場合のみ `do` ブロックを実行し、どれかが失敗すると `else` に流れる。ハッピーパスの記述に使う。',
          code: [{ lang: 'Elixir', code: `with {:ok, user}  <- find_user(id),
     {:ok, token} <- generate_token(user) do
  {:ok, token}
else
  {:error, reason} -> {:error, reason}
end` }],
        },
        {
          id: 's2-for', name: 'for 内包表記', level: 'basic',
          keywords: 'for comprehension generator filter into',
          desc: '`for` で生成器・フィルタ・変換を組み合わせたコレクション生成。`into:` で結果のデータ構造を指定できる。',
          code: [{ lang: 'Elixir', code: `evens = for n <- 1..10, rem(n, 2) == 0, do: n * n
# [4, 16, 36, 64, 100]

pairs = for x <- [1,2], y <- [:a,:b], do: {x, y}
# [{1,:a},{1,:b},{2,:a},{2,:b}]` }],
        },
      ],
    },
    {
      id: 's3', num: 3, title: '関数', level: 'basic',
      items: [
        {
          id: 's3-def', name: 'def と defp', level: 'basic',
          keywords: 'def defp public private module function',
          desc: '`def` はパブリック関数、`defp` はプライベート関数（同モジュール内のみ）。関数は必ずモジュール内で定義する。',
          code: [{ lang: 'Elixir', code: `defmodule Math do
  def add(a, b), do: a + b    # パブリック
  defp square(n), do: n * n   # プライベート
  def square_sum(a, b), do: square(a) + square(b)
end

Math.add(3, 4)   # 7` }],
        },
        {
          id: 's3-pattern-clauses', name: '複数節による関数定義', level: 'basic',
          keywords: 'pattern matching multiple clauses guard function head',
          desc: '同名・同アリティの関数を複数定義でき、引数のパターンマッチで節が選択される。再帰と組み合わせて使う。',
          code: [{ lang: 'Elixir', code: `defmodule Fib do
  def calc(0), do: 0
  def calc(1), do: 1
  def calc(n) when n > 1, do: calc(n-1) + calc(n-2)
end

Fib.calc(10)  # 55` }],
        },
        {
          id: 's3-anonymous', name: '無名関数', level: 'basic',
          keywords: 'fn -> & capture anonymous lambda',
          desc: '`fn ... -> ... end` で無名関数を定義。`&` キャプチャ構文で短く書ける。`.(...)` で呼び出す。',
          code: [{ lang: 'Elixir', code: `double = fn x -> x * 2 end
double.(5)      # 10

double2 = &(&1 * 2)    # キャプチャ構文
double2.(5)     # 10

add = &(&1 + &2)
add.(3, 4)      # 7` }],
        },
        {
          id: 's3-pipe', name: 'パイプ演算子 |>', level: 'basic',
          keywords: 'pipe operator |> chain composition',
          desc: '`|>` で関数を左から右へチェーン。左辺の値が次の関数の第一引数になる。読みやすい変換パイプラインを構築できる。',
          code: [{ lang: 'Elixir', code: `"  hello world  "
|> String.trim()
|> String.split(" ")
|> Enum.map(&String.capitalize/1)
|> Enum.join(" ")
# "Hello World"` }],
        },
      ],
    },
    {
      id: 's4', num: 4, title: 'コレクション', level: 'basic',
      items: [
        {
          id: 's4-list', name: 'List', level: 'basic',
          keywords: 'List linked list cons head tail Enum',
          desc: '連結リスト。先頭への追加が O(1)、末尾は O(n)。`|` でパターン分割。`Enum` モジュールで操作。',
          code: [{ lang: 'Elixir', code: `list = [1, 2, 3]
[h | t] = list    # h=1, t=[2,3]
new_list = [0 | list]  # [0,1,2,3]
Enum.map(list, &(&1 * 2))    # [2,4,6]
Enum.filter(list, &(&1 > 1)) # [2,3]
Enum.reduce(list, 0, &+/2)   # 6` }],
        },
        {
          id: 's4-tuple', name: 'Tuple', level: 'basic',
          keywords: 'tuple {} elem put_elem',
          desc: '固定長・高速アクセスのデータ構造。関数の戻り値に `{:ok, val}` パターンで使われる。要素の変更は新しいタプルを生成する。',
          code: [{ lang: 'Elixir', code: `t = {:ok, "hello", 42}
elem(t, 1)              # "hello"
put_elem(t, 2, 99)      # {:ok, "hello", 99}
tuple_size(t)           # 3` }],
        },
        {
          id: 's4-map', name: 'Map', level: 'basic',
          keywords: 'map %{} Map.get put update',
          desc: 'キーバリューストア。アトムキーには `map.key` でアクセス可能。`Map.put`・`Map.update` で変更（新しい Map を返す）。',
          code: [{ lang: 'Elixir', code: `m = %{name: "Alice", age: 30}
m.name                          # "Alice"
Map.get(m, :age, 0)             # 30
m2 = Map.put(m, :age, 31)       # 新しい Map
m3 = %{m | age: 31}             # 更新構文（既存キーのみ）` }],
        },
        {
          id: 's4-keyword', name: 'Keyword List', level: 'basic',
          keywords: 'keyword list options do end DSL',
          desc: '`[key: value]` 形式のタプルリスト。順序を保持し、重複キーも持てる。関数オプションや DSL によく使われる。',
          code: [{ lang: 'Elixir', code: `opts = [timeout: 5000, retry: 3]
Keyword.get(opts, :timeout)   # 5000

# 関数に渡す場合（末尾の [] は省略可）
String.split("a,b,c", ",", trim: true)` }],
        },
      ],
    },
    {
      id: 's5', num: 5, title: '文字列・バイナリ', level: 'basic',
      items: [
        {
          id: 's5-string', name: '文字列（バイナリ）', level: 'basic',
          keywords: 'string binary UTF-8 interpolation heredoc',
          desc: 'Elixir の文字列は UTF-8 エンコードのバイナリ。`"..."` で文字列補間（`\#{expr}`）が使える。`~s` シギルや三重クォート（`"""`）もある。',
          code: [{ lang: 'Elixir', code: `name = "Elixir"
"Hello, \#{name}!"          # 文字列補間
String.length("hello")    # 5
String.upcase("hello")    # "HELLO"
String.split("a,b", ",")  # ["a","b"]` }],
        },
        {
          id: 's5-charlists', name: 'チャーリストとシギル', level: 'basic',
          keywords: "charlist sigil ~c ~w ~r single quote",
          desc: `シングルクォートの \`'...'\` はチャーリスト（コードポイントのリスト）。シギル（\`~r\`・\`~w\`・\`~c\` 等）で特殊なリテラルを表現できる。`,
          code: [{ lang: 'Elixir', code: `'hello'   # チャーリスト（[104,101,108,108,111]）
~w[foo bar baz]   # ["foo","bar","baz"]
~r/elixir/i       # 正規表現
~c[hello]         # チャーリスト（新記法）` }],
        },
        {
          id: 's5-binary-pattern', name: 'バイナリパターンマッチ', level: 'advanced',
          keywords: 'binary pattern bitstring <<>> parse',
          desc: '`<<>>` でバイナリのビット/バイトレベルのパターンマッチが可能。ネットワークプロトコルやファイルパーサーに使われる。',
          code: [{ lang: 'Elixir', code: `<<r::8, g::8, b::8>> = <<255, 128, 0>>
# r=255, g=128, b=0

<<first::binary-size(3), rest::binary>> = "Hello"
# first="Hel", rest="lo"` }],
        },
      ],
    },
    {
      id: 's6', num: 6, title: 'エラー処理', level: 'basic',
      items: [
        {
          id: 's6-ok-error', name: '{:ok, val} / {:error, reason} パターン', level: 'basic',
          keywords: ':ok :error tuple pattern matching idiom',
          desc: 'Elixir の慣習的なエラーハンドリング。関数は `{:ok, value}` または `{:error, reason}` を返し、呼び出し元がパターンマッチで処理する。',
          code: [{ lang: 'Elixir', code: `case File.read("data.txt") do
  {:ok, content}   -> process(content)
  {:error, :enoent} -> IO.puts("File not found")
  {:error, reason} -> IO.puts("Error: \#{reason}")
end` }],
        },
        {
          id: 's6-try-rescue', name: 'try/rescue/catch', level: 'basic',
          keywords: 'try rescue catch raise throw after exception',
          desc: '例外（`Exception`）と `throw` の両方を捕捉できる。`rescue` は例外、`catch` は `throw`/`exit`/`:EXIT`。通常は `{:ok, _}` パターンを優先する。',
          code: [{ lang: 'Elixir', code: `try do
  String.to_integer("abc")
rescue
  e in ArgumentError -> "Invalid: \#{e.message}"
after
  IO.puts("cleanup")  # 必ず実行
end` }],
        },
        {
          id: 's6-bang', name: 'バン関数（!）', level: 'basic',
          keywords: 'bang function ! raise exception unwrap',
          desc: '`func!` の命名規則の関数は失敗時に例外を発生させる。成功値を直接返すため、パターンマッチが不要な場面で使う。',
          code: [{ lang: 'Elixir', code: `# 通常版（{:ok, _} / {:error, _} を返す）
{:ok, content} = File.read("data.txt")

# バン版（成功時は内容を返し、失敗は例外）
content = File.read!("data.txt")` }],
        },
      ],
    },
    {
      id: 's7', num: 7, title: 'プロセスとメッセージパッシング', level: 'basic',
      items: [
        {
          id: 's7-spawn', name: 'spawn とプロセス', level: 'basic',
          keywords: 'spawn process pid lightweight concurrent',
          desc: 'Elixir のプロセスは BEAM VM 上の軽量プロセス（スレッドではない）。数百万個同時に起動できる。`spawn/1` で新プロセスを起動し `PID` で識別。',
          code: [{ lang: 'Elixir', code: `pid = spawn(fn -> IO.puts("Hello from process!") end)
Process.alive?(pid)   # false（すぐ終了）

self()   # 現在のプロセスの PID
Process.info(self(), :memory)` }],
        },
        {
          id: 's7-send-receive', name: 'send / receive', level: 'basic',
          keywords: 'send receive message mailbox async',
          desc: 'プロセス間通信はメッセージパッシングのみ。`send/2` でメッセージ送信、`receive` でメールボックスから取り出す。',
          code: [{ lang: 'Elixir', code: `parent = self()
pid = spawn(fn ->
  receive do
    {:hello, from} -> send(from, {:reply, "Hi!"})
  end
end)

send(pid, {:hello, parent})
receive do
  {:reply, msg} -> IO.puts(msg)  # "Hi!"
end` }],
        },
        {
          id: 's7-link-monitor', name: 'link と monitor', level: 'basic',
          keywords: 'link monitor trap_exit crash propagation',
          desc: '`spawn_link/1` でリンクしたプロセスは一方がクラッシュするともう一方も終了（フォールトトレランス）。`spawn_monitor/1` はクラッシュを通知として受け取れる。',
          code: [{ lang: 'Elixir', code: `# モニター（片方向の監視）
{pid, ref} = spawn_monitor(fn -> raise "oops" end)
receive do
  {:DOWN, ^ref, :process, _pid, reason} ->
    IO.puts("Died: \#{inspect(reason)}")
end` }],
        },
        {
          id: 's7-agent-task', name: 'Agent と Task', level: 'basic',
          keywords: 'Agent Task async await state management',
          desc: '`Agent` は状態を保持するプロセスの抽象。`Task` は非同期タスクの実行と結果取得（`Task.async`・`Task.await`）のための高レベル API。',
          code: [{ lang: 'Elixir', code: `# Task で並行処理
t1 = Task.async(fn -> :timer.sleep(100); 1 end)
t2 = Task.async(fn -> :timer.sleep(100); 2 end)
[Task.await(t1), Task.await(t2)]  # [1, 2]

# Agent で状態管理
{:ok, agent} = Agent.start_link(fn -> 0 end)
Agent.update(agent, &(&1 + 1))
Agent.get(agent, & &1)   # 1` }],
        },
      ],
    },
    {
      id: 's8', num: 8, title: 'GenServer・OTP', level: 'basic',
      items: [
        {
          id: 's8-genserver', name: 'GenServer', level: 'basic',
          keywords: 'GenServer OTP behaviour call cast handle_call handle_cast',
          desc: '`GenServer` は OTP の汎用サーバービヘイビア。`call`（同期）と `cast`（非同期）でメッセージ送受信し、`handle_call`/`handle_cast` でコールバック処理する。',
          code: [{ lang: 'Elixir', code: `defmodule Counter do
  use GenServer

  def start_link(init), do: GenServer.start_link(__MODULE__, init, name: __MODULE__)
  def increment, do: GenServer.cast(__MODULE__, :inc)
  def value, do: GenServer.call(__MODULE__, :get)

  @impl true
  def init(n), do: {:ok, n}
  @impl true
  def handle_cast(:inc, n), do: {:noreply, n + 1}
  @impl true
  def handle_call(:get, _from, n), do: {:reply, n, n}
end` }],
        },
        {
          id: 's8-supervisor', name: 'Supervisor', level: 'basic',
          keywords: 'Supervisor restart strategy children fault tolerant',
          desc: 'Supervisor は子プロセスの起動・再起動を管理。`strategy: :one_for_one`（1つがクラッシュしたら1つ再起動）などで障害耐性を設計する。',
          code: [{ lang: 'Elixir', code: `defmodule MyApp.Supervisor do
  use Supervisor

  def start_link(_), do: Supervisor.start_link(__MODULE__, :ok, name: __MODULE__)

  @impl true
  def init(:ok) do
    children = [
      {Counter, 0},
      {MyWorker, []}
    ]
    Supervisor.init(children, strategy: :one_for_one)
  end
end` }],
        },
        {
          id: 's8-otp-app', name: 'OTP アプリケーション', level: 'advanced',
          keywords: 'Application mix.exs start supervision tree',
          desc: 'OTP アプリケーションは起動時にスーパービジョンツリーを立ち上げる。`mix.exs` でアプリケーション設定し、`Application.start/2` をコールバックに実装する。',
          code: [{ lang: 'Elixir', code: `defmodule MyApp.Application do
  use Application

  @impl true
  def start(_type, _args) do
    children = [MyApp.Supervisor]
    opts = [strategy: :one_for_one, name: MyApp.Supervisor]
    Supervisor.start_link(children, opts)
  end
end` }],
        },
      ],
    },
    {
      id: 's9', num: 9, title: 'Phoenix フレームワーク概要', level: 'advanced',
      items: [
        {
          id: 's9-phoenix', name: 'Phoenix とは', level: 'advanced',
          keywords: 'Phoenix web framework MVC channel LiveView',
          desc: 'Elixir 最大の Web フレームワーク。高並行性・低レイテンシが特徴。MVC + Channel（WebSocket）+ LiveView（リアルタイム UI）を提供。',
          code: [{ lang: 'Elixir', code: `# mix.exs
{:phoenix, "~> 1.7"},
{:phoenix_live_view, "~> 0.20"}

# $ mix phx.new my_app
# $ cd my_app && mix phx.server` }],
        },
        {
          id: 's9-router', name: 'Router・Controller・View', level: 'advanced',
          keywords: 'router controller view template pipeline plug',
          desc: 'Router でパスを定義 → Controller でリクエスト処理 → View でレスポンス生成。Plug はミドルウェアの仕組みで、パイプラインを構成できる。',
          code: [{ lang: 'Elixir', code: `# router.ex
scope "/api", MyAppWeb do
  pipe_through :api
  get "/users", UserController, :index
  post "/users", UserController, :create
end

# user_controller.ex
def index(conn, _params) do
  users = Accounts.list_users()
  json(conn, users)
end` }],
        },
        {
          id: 's9-ecto', name: 'Ecto（DB ライブラリ）', level: 'advanced',
          keywords: 'Ecto schema changeset query Repo database',
          desc: 'Ecto は ORM ではなくデータマッピングとクエリビルダー。`Schema`・`Changeset`（バリデーション）・`Repo`（DB 操作）・クエリ DSL を提供。',
          code: [{ lang: 'Elixir', code: `defmodule User do
  use Ecto.Schema
  schema "users" do
    field :name, :string
    field :email, :string
    timestamps()
  end
  def changeset(user, attrs) do
    user |> cast(attrs, [:name, :email])
         |> validate_required([:name, :email])
  end
end

Repo.all(from u in User, where: u.name == "Alice")` }],
        },
      ],
    },
    {
      id: 's10', num: 10, title: '列挙・Stream', level: 'basic',
      items: [
        {
          id: 's10-enum', name: 'Enum モジュール', level: 'basic',
          keywords: 'Enum map filter reduce sort group_by',
          desc: '`Enum` はコレクション操作の標準ライブラリ。即時評価（全要素処理してから次へ）。',
          code: [{ lang: 'Elixir', code: `Enum.map([1,2,3], &(&1 * 2))         # [2,4,6]
Enum.filter([1,2,3,4], &rem(&1,2)==0) # [2,4]
Enum.reduce([1,2,3], 0, &+/2)         # 6
Enum.sort_by(users, & &1.name)
Enum.group_by(users, & &1.role)` }],
        },
        {
          id: 's10-stream', name: 'Stream（遅延評価）', level: 'basic',
          keywords: 'Stream lazy evaluation infinite range',
          desc: '`Stream` は遅延評価版の Enum。大量データや無限シーケンスの効率的な処理に使う。最終的に `Enum.to_list` などで評価する。',
          code: [{ lang: 'Elixir', code: `1..1_000_000
|> Stream.filter(&rem(&1, 2) == 0)
|> Stream.map(&(&1 * &1))
|> Enum.take(5)
# [4, 16, 36, 64, 100]（必要な分だけ計算）` }],
        },
        {
          id: 's10-comprehension', name: 'for 内包表記（高度）', level: 'basic',
          keywords: 'for comprehension into reduce uniq',
          desc: '`into:` でマップに集約したり、`reduce:` で任意の初期値に畳み込める。',
          code: [{ lang: 'Elixir', code: `# Map を生成
word_lengths = for word <- ~w[hello world], into: %{} do
  {word, String.length(word)}
end
# %{"hello" => 5, "world" => 5}` }],
        },
      ],
    },
    {
      id: 's11', num: 11, title: 'モジュール・メタプログラミング', level: 'advanced',
      items: [
        {
          id: 's11-module', name: 'モジュールとアトリビュート', level: 'basic',
          keywords: 'defmodule @doc @spec @moduledoc module attribute',
          desc: 'モジュールはコードの名前空間。`@moduledoc`・`@doc` でドキュメント、`@spec` で型仕様を記述。`@` アトリビュートはコンパイル時定数としても使える。',
          code: [{ lang: 'Elixir', code: `defmodule MyMath do
  @moduledoc "数学ユーティリティ"
  @pi 3.14159265

  @spec circle_area(number) :: float
  @doc "円の面積を計算"
  def circle_area(r), do: @pi * r * r
end` }],
        },
        {
          id: 's11-macro', name: 'マクロ（defmacro）', level: 'advanced',
          keywords: 'defmacro macro AST quote unquote metaprogramming',
          desc: '`defmacro` でコンパイル時にコードを生成するマクロを定義。`quote`/`unquote` で AST（抽象構文木）を操作する。',
          code: [{ lang: 'Elixir', code: `defmodule MyMacro do
  defmacro unless(condition, do: body) do
    quote do
      if !unquote(condition), do: unquote(body)
    end
  end
end

import MyMacro
unless false, do: IO.puts("executed!")` }],
        },
        {
          id: 's11-behaviour', name: 'behaviour（ビヘイビア）', level: 'advanced',
          keywords: 'behaviour callback @behaviour @impl interface',
          desc: 'ビヘイビアはモジュールが実装すべきコールバック関数の仕様を定義する仕組み（インターフェースに相当）。OTP の `GenServer` もビヘイビア。',
          code: [{ lang: 'Elixir', code: `defmodule Storage do
  @callback save(key :: String.t, value :: term) :: :ok | {:error, term}
  @callback get(key :: String.t) :: {:ok, term} | :error
end

defmodule MemStorage do
  @behaviour Storage
  @impl true
  def save(k, v), do: :ets.insert(:store, {k, v}); :ok
  @impl true
  def get(k), do: case :ets.lookup(:store, k) do
    [{^k, v}] -> {:ok, v}; [] -> :error
  end
end` }],
        },
      ],
    },
    {
      id: 's12', num: 12, title: 'ファイル・IO', level: 'basic',
      items: [
        {
          id: 's12-file', name: 'File モジュール', level: 'basic',
          keywords: 'File.read write stream ls',
          desc: '`File` モジュールでファイルの読み書き。`File.stream!` で大きなファイルを効率的にストリーム処理できる。',
          code: [{ lang: 'Elixir', code: `File.write!("hello.txt", "Hello, World!")
content = File.read!("hello.txt")    # "Hello, World!"

File.stream!("large.csv")
|> Stream.map(&String.trim/1)
|> Enum.each(&process/1)` }],
        },
        {
          id: 's12-io', name: 'IO モジュール', level: 'basic',
          keywords: 'IO.puts IO.gets inspect',
          desc: '標準入出力。`IO.puts`（改行あり出力）・`IO.write`（改行なし）・`IO.gets`（入力）・`IO.inspect`（デバッグ表示）。',
          code: [{ lang: 'Elixir', code: `IO.puts("Hello!")
IO.write("no newline")
name = IO.gets("Name: ") |> String.trim()

# パイプライン内デバッグに便利
[1, 2, 3]
|> IO.inspect(label: "before")
|> Enum.map(&(&1 * 2))
|> IO.inspect(label: "after")` }],
        },
        {
          id: 's12-path', name: 'Path モジュール', level: 'basic',
          keywords: 'Path join expand extname dirname',
          desc: 'ファイルパス操作のユーティリティ。OS を意識せずクロスプラットフォームなパス操作ができる。',
          code: [{ lang: 'Elixir', code: `Path.join(["home", "user", "file.txt"])  # "home/user/file.txt"
Path.expand("~/data")                   # "/Users/user/data"
Path.extname("app.ex")                  # ".ex"
Path.dirname("/home/user/file.txt")     # "/home/user"` }],
        },
      ],
    },
    {
      id: 's13', num: 13, title: '型仕様・Dialyzer', level: 'advanced',
      items: [
        {
          id: 's13-typespec', name: '@spec・@type', level: 'advanced',
          keywords: '@spec @type dialyzer typespec optional',
          desc: '`@spec` で関数の型仕様を記述。Dialyzer（静的解析ツール）が型不整合を検出する。Elixir は動的型付けだが型仕様でドキュメント化と解析が可能。',
          code: [{ lang: 'Elixir', code: `@type user :: %{name: String.t(), age: non_neg_integer()}

@spec greet(String.t()) :: String.t()
def greet(name), do: "Hello, \#{name}!"

@spec divide(number(), number()) :: {:ok, float()} | {:error, :division_by_zero}
def divide(_, 0), do: {:error, :division_by_zero}
def divide(a, b), do: {:ok, a / b}` }],
        },
        {
          id: 's13-dialyzer', name: 'Dialyzer / Dialyxir', level: 'advanced',
          keywords: 'dialyzer dialyxir PLT static analysis',
          desc: '`dialyxir` は Mix プロジェクトで Dialyzer を使いやすくするツール。PLT（Persistent Lookup Table）のビルドに時間がかかるが、型エラーを事前に検出できる。',
          code: [{ lang: 'Elixir', code: `# mix.exs
{:dialyxir, "~> 1.0", only: [:dev], runtime: false}

# $ mix dialyzer   # PLT 構築 + 解析` }],
        },
        {
          id: 's13-guards', name: 'ガード節', level: 'basic',
          keywords: 'guard when is_integer is_list kernel',
          desc: 'ガード節（`when`）で使える式は限定的（副作用なし）。`is_integer`・`is_list`・算術・比較・`and`/`or`/`not` など Kernel モジュールの関数が使える。',
          code: [{ lang: 'Elixir', code: `def classify(x) when is_integer(x) and x > 0, do: :positive
def classify(x) when is_integer(x) and x < 0, do: :negative
def classify(0), do: :zero
def classify(_), do: :not_a_number` }],
        },
      ],
    },
    {
      id: 's14', num: 14, title: 'Mix・エコシステム', level: 'basic',
      items: [
        {
          id: 's14-mix', name: 'Mix ビルドツール', level: 'basic',
          keywords: 'mix new compile test deps format',
          desc: '`mix` は Elixir 標準のビルドツール。プロジェクト作成・コンパイル・テスト・依存管理を一元化。',
          code: [{ lang: 'Elixir', code: `# 新規プロジェクト
mix new my_app
mix new my_app --sup   # スーパービジョンツリー付き

# よく使うコマンド
mix compile     # コンパイル
mix test        # テスト
mix format      # フォーマット
mix deps.get    # 依存解決` }],
        },
        {
          id: 's14-hex', name: 'Hex パッケージマネージャー', level: 'basic',
          keywords: 'hex.pm deps mix.exs package manager',
          desc: '`hex.pm` は Elixir/Erlang のパッケージリポジトリ。`mix.exs` の `deps/0` で依存を宣言し `mix deps.get` で取得。',
          code: [{ lang: 'Elixir', code: `# mix.exs
defp deps do
  [
    {:phoenix, "~> 1.7"},
    {:ecto_sql, "~> 3.10"},
    {:jason, "~> 1.4"},
    {:ex_doc, "~> 0.30", only: :dev}
  ]
end` }],
        },
        {
          id: 's14-exunit', name: 'ExUnit テストフレームワーク', level: 'basic',
          keywords: 'ExUnit test assert refute describe setup',
          desc: '組み込みのテストフレームワーク。`assert`・`refute`・`assert_raise` でアサーション。`describe`・`setup` でテストの構造化。',
          code: [{ lang: 'Elixir', code: `defmodule MathTest do
  use ExUnit.Case, async: true

  describe "add/2" do
    test "adds two numbers" do
      assert Math.add(1, 2) == 3
    end
    test "handles negatives" do
      assert Math.add(-1, 1) == 0
    end
  end
end` }],
        },
      ],
    },
    {
      id: 's15', num: 15, title: '分散処理・クラスタリング', level: 'advanced',
      items: [
        {
          id: 's15-distributed', name: '分散 Erlang ノード', level: 'advanced',
          keywords: 'node distributed erlang cluster connect',
          desc: 'BEAM VM は分散ノード間の透過的なメッセージパッシングをサポート。`Node.connect/1` でノードを接続し、他ノードのプロセスに `send` できる。',
          code: [{ lang: 'Elixir', code: `# ノード起動: iex --sname node1@localhost
Node.connect(:"node2@localhost")
Node.list()   # 接続ノード一覧

# 他ノードにメッセージ送信
send({:my_process, :"node2@localhost"}, {:hello, self()})` }],
        },
        {
          id: 's15-horde-libcluster', name: 'Horde / libcluster', level: 'advanced',
          keywords: 'Horde libcluster distributed supervisor registry',
          desc: '`libcluster` はノード自動検出ライブラリ。`Horde` は分散スーパービジョンとレジストリを提供し、クラスター全体でのプロセス管理を可能にする。',
          code: [{ lang: 'Elixir', code: `# libcluster 設定例
config :libcluster,
  topologies: [
    k8s: [
      strategy: Cluster.Strategy.Kubernetes,
      config: [kubernetes_selector: "app=my_app"]
    ]
  ]` }],
        },
        {
          id: 's15-ets-mnesia', name: 'ETS / Mnesia', level: 'advanced',
          keywords: 'ETS Mnesia in-memory cache distributed database',
          desc: '`ETS`（Erlang Term Storage）は高速なインメモリストレージ（テーブル）。`Mnesia` は分散インメモリデータベース。どちらも Erlang/OTP の標準機能。',
          code: [{ lang: 'Elixir', code: `:ets.new(:cache, [:named_table, :public])
:ets.insert(:cache, {"key", "value"})
:ets.lookup(:cache, "key")   # [{"key","value"}]
:ets.delete(:cache, "key")` }],
        },
      ],
    },
    {
      id: 's16', num: 16, title: 'パフォーマンス・デバッグ', level: 'advanced',
      items: [
        {
          id: 's16-observer', name: 'Observer / iex', level: 'advanced',
          keywords: 'Observer iex REPL debug introspect',
          desc: '`:observer.start()` で BEAM の GUI モニタリングツールを起動。プロセスツリー・メモリ・メッセージキューをリアルタイム観察できる。',
          code: [{ lang: 'Elixir', code: `# iex で起動
:observer.start()

# プロセス情報
Process.info(pid)
Process.list() |> length()   # 全プロセス数

# メッセージキュー確認
Process.info(pid, :message_queue_len)` }],
        },
        {
          id: 's16-benchee', name: 'Benchee ベンチマーク', level: 'advanced',
          keywords: 'Benchee benchmark performance measurement',
          desc: '`benchee` は Elixir のベンチマークライブラリ。複数の実装を比較し、ops/sec・メモリ使用量・分布を計測できる。',
          code: [{ lang: 'Elixir', code: `Benchee.run(%{
  "Enum.map" => fn -> Enum.map(1..1000, &(&1 * 2)) end,
  "for"      => fn -> for n <- 1..1000, do: n * 2 end
})` }],
        },
        {
          id: 's16-recon', name: 'recon / 本番デバッグ', level: 'advanced',
          keywords: 'recon tracing prod debug etop',
          desc: '`recon` は本番環境のデバッグツールセット。`recon_trace` でトレーシング、`recon:proc_count` でプロセスのリソース消費ランキングを確認できる。',
          code: [{ lang: 'Elixir', code: `# 本番での高いメモリ使用プロセス調査
:recon.proc_count(:memory, 10)

# 関数呼び出しトレース
:recon_trace.calls({MyModule, :my_fun, :_}, 100)` }],
        },
        {
          id: 's16-tips', name: 'パフォーマンスのコツ', level: 'advanced',
          keywords: 'performance binary string concat iolist tail recursion',
          desc: '文字列の繰り返し連結には `IO List` を使う。大量のデータは `Stream` で遅延処理。末尾再帰で深い再帰を最適化。',
          code: [{ lang: 'Elixir', code: `# 悪い例: 文字列を都度連結（O(n^2)）
Enum.reduce(list, "", fn s, acc -> acc <> s end)

# 良い例: IO リストで最後に join（O(n)）
IO.iodata_to_binary(Enum.intersperse(list, ""))
# または
Enum.join(list, "")` }],
        },
      ],
    },
  ],
};

export default data;
