import type { LanguageGuide } from '../../types';

const data: LanguageGuide = {
  lang: 'C',
  langSlug: 'c',
  version: 'C11/C17',
  lead: `他言語の経験者が 2〜3 時間でざっと読み通せるリファレンスです。C 固有の落とし穴（ポインタ・未定義動作・メモリ管理）は「要注意」ボックスで強調しています。`,
  accent: '#4a6fa5',
  accent2: '#e8f0fb',
  badgeGradient: 'linear-gradient(135deg, #1e3a5f, #4a6fa5)',
  heroEmoji: '⚙️',
  navGroups: [
    { label: '基礎', sections: ['s1', 's2', 's3', 's4', 's5', 's6', 's7'] },
    { label: '実用', sections: ['s8', 's9', 's10', 's11'] },
    { label: '応用', sections: ['s12', 's13', 's14'] },
  ],
  sections: [
    {
      id: 's1',
      num: 1,
      title: '変数と基本型',
      level: 'basic',
      items: [
        {
          id: 's1-基本データ型',
          name: '基本データ型',
          level: 'basic',
          keywords: '変数 型 int char float double void 宣言 サイズ stdint',
          desc: `C の型サイズは処理系依存。\`int\` は「少なくとも 16bit」の保証しかない。移植性が必要な場合は \`<stdint.h>\` の固定幅型（\`int32_t\` 等）を使う。`,
          code: [
          { lang: 'C', code: `char      c = 'A';     // 1バイト（文字 or 小整数）
short     s = 32767;   // 少なくとも 16bit
int       i = -42;     // 少なくとも 16bit（多くの環境で 32bit）
long      l = 100000L; // 少なくとも 32bit
long long ll = 9LL;    // 少なくとも 64bit（C99 以降）
float     f = 3.14f;   // 32bit 単精度
double    d = 3.14159; // 64bit 倍精度
void     *p;           // 型なしポインタ

// 移植性重視なら <stdint.h>
#include <stdint.h>
int32_t  a = 0;        // 必ず 32bit 符号付き
uint8_t  b = 255;      // 必ず 8bit 符号なし` },
          ],
          warn: `\`long\` は LP64 環境（Linux 64bit）では 64bit、Windows 64bit（LLP64）では 32bit と環境によって異なる。固定幅が必要な場合は必ず \`<stdint.h>\` を使う。`,
        },
        {
          id: 's1-signed-unsigned',
          name: 'signed / unsigned',
          level: 'basic',
          keywords: 'signed unsigned 符号 オーバーフロー 整数 混在比較',
          desc: `\`char\` の符号性は処理系依存。\`unsigned\` 演算のラップアラウンドは定義済み動作だが、\`signed\` のオーバーフローは未定義動作（UB）。`,
          code: [
          { lang: 'C', code: `unsigned int u = 0;
u - 1;           // UINT_MAX（ラップアラウンド、合法）

int i = INT_MAX;
i + 1;           // 未定義動作！（符号付きオーバーフロー）

// 混在比較の罠
int     neg = -1;
unsigned int pos = 1;
if (neg < pos) { }  // 偽！neg が unsigned に昇格して大きな値になる` },
          ],
          warn: `符号付き整数のオーバーフローは未定義動作。コンパイラは「オーバーフローしない前提」で最適化するため、期待した動作にならないことがある。\`signed\` と \`unsigned\` の混在比較にも注意。`,
        },
        {
          id: 's1-変数の初期化',
          name: '変数の初期化',
          level: 'basic',
          keywords: '初期化 未初期化 ゴミ値 自動変数 static グローバル',
          desc: `自動変数（ローカル変数）は初期化しないとゴミ値になる。グローバル変数と \`static\` 変数はゼロ初期化される。`,
          code: [
          { lang: 'C', code: `int g;            // グローバル → 0 に初期化
static int s;     // static    → 0 に初期化

void f(void) {
    int local;    // 自動変数  → 不定（ゴミ値）
    int x = 0;   // 明示的な初期化が安全

    // C99 以降：宣言は先頭以外にも書ける
    for (int i = 0; i < 10; i++) { }
}` },
          ],
          warn: `未初期化の自動変数を読み取ると未定義動作。\`-Wuninitialized\`（GCC/Clang）で警告が出るよう \`-Wall\` を常に付けてコンパイルする。`,
        },
        {
          id: 's1-定数-const-と-define',
          name: '定数：const と #define',
          level: 'basic',
          keywords: 'const 定数 #define マクロ 型付き定数',
          desc: `\`const\` は型情報を持ちデバッガで確認できる。\`#define\` はプリプロセッサによる単純テキスト置換で型を持たない。\`const\` ポインタには 2 通りの意味がある。`,
          code: [
          { lang: 'C', code: `#define MAX_BUF 256       // 型なし定数（プリプロセッサ）
const int MAX_RETRY = 3;  // 型付き定数（推奨）

// const ポインタの 2 つの意味
const int *p;   // 「const int へのポインタ」→ *p 変更不可
int * const q;  // 「int への const ポインタ」→ q 自体が変更不可
const int * const r; // 両方不可` },
          ],
        },
        {
          id: 's1-sizeof-演算子',
          name: 'sizeof 演算子',
          level: 'basic',
          keywords: 'sizeof サイズ 配列 ポインタ 要素数',
          desc: `コンパイル時に評価される演算子（関数ではない）。\`size_t\` 型の値を返す。配列の要素数を求める常套句として使われる。`,
          code: [
          { lang: 'C', code: `sizeof(int)     // 4（多くの環境）
sizeof(double)  // 8
sizeof(char)    // 常に 1

int arr[10];
sizeof(arr)                    // 40（配列全体のバイト数）
sizeof(arr) / sizeof(arr[0])   // 10（要素数の常套句）

int *p = arr;
sizeof(p)       // 8（ポインタのサイズ）← 配列サイズではない！` },
          ],
          warn: `関数の引数として配列を渡すと内部ではポインタに成り下がる（decay）。その引数に \`sizeof\` を適用するとポインタのサイズ（通常 8）が返り、配列の全バイト数は取得できない。`,
        },
      ],
    },
    {
      id: 's2',
      num: 2,
      title: '演算子と式',
      level: 'basic',
      items: [
        {
          id: 's2-算術演算子',
          name: '算術演算子',
          level: 'basic',
          keywords: '算術 除算 剰余 整数 切り捨て 負数',
          desc: `整数同士の \`/\` は切り捨て除算（ゼロ方向への丸め、C99 以降で規定）。負数の剰余は割られる数の符号に合わせる。`,
          code: [
          { lang: 'C', code: `10 / 3    // 3（整数切り捨て）
10 % 3    // 1（余り）
-7 / 2    // -3（C99: ゼロ方向切り捨て）
-7 % 2    // -1（割られる数と同符号）
10.0 / 3  // 3.333...（どちらかが浮動小数なら浮動小数演算）` },
          ],
          warn: `C89 では負数の除算の丸め方向が処理系依存だった。C99 以降はゼロ方向への切り捨てと規定されたが、古いコンパイラや組み込み環境では注意が必要。`,
        },
        {
          id: 's2-ビット演算子',
          name: 'ビット演算子',
          level: 'basic',
          keywords: 'ビット演算 AND OR XOR NOT シフト & | ^ ~ << >> フラグ',
          desc: `\`&\`（AND）、\`|\`（OR）、\`^\`（XOR）、\`~\`（NOT）、\`<<\`/\`>>\`（シフト）。フラグ操作などで頻繁に使われる。`,
          code: [
          { lang: 'C', code: `unsigned int flags = 0x0A; // 0b00001010

flags & 0x03   // 0x02（AND: 共通ビット抽出）
flags | 0x05   // 0x0F（OR:  ビット追加）
flags ^ 0x0F   // 0x05（XOR: ビット反転）
~flags         // 0xFFFFFFF5（全ビット反転）
1u << 3        // 8（左シフト = 2^3 倍）
16u >> 2       // 4（右シフト = 4 で割る）` },
          ],
          warn: `符号付き整数の右シフトが算術シフト（符号拡張）か論理シフト（0 埋め）かは処理系依存。\`unsigned\` は常に論理シフト。符号付き整数の負値をシフトすると未定義動作。`,
        },
        {
          id: 's2-と-の罠',
          name: '= と == の罠',
          level: 'basic',
          keywords: '代入 = == 比較 混同 if バグ',
          desc: `\`=\` は代入式で、式として評価すると代入後の値になる。\`if\` 条件内に書いても文法上は正しいためコンパイルエラーにならない。`,
          code: [
          { lang: 'C', code: `int x = 5;
if (x = 0) {       // バグ！x に 0 を代入し評価値が 0（偽）
    printf("zero\\n");  // 実行されない
}

// ヨーダ記法で防ぐ（定数を左辺に）
if (0 == x) { }    // 0 = x はコンパイルエラーになるので安全

// 意図的な代入ループは括弧で明示
int c;
while ((c = getchar()) != EOF) { }` },
          ],
          warn: `\`-Wall\`（または \`-Wparentheses\`）を有効にすると \`if (x = 0)\` に警告が出る。常に \`-Wall -Wextra\` でコンパイルすること。`,
        },
        {
          id: 's2-インクリメント-デクリメントと副作用',
          name: 'インクリメント/デクリメントと副作用',
          level: 'basic',
          keywords: 'インクリメント デクリメント ++ -- 前置 後置 副作用 シーケンスポイント',
          desc: `前置 \`++i\` はインクリメント後の値、後置 \`i++\` はインクリメント前の値を返す。1 つの式の中で同一変数を複数回変更するのは未定義動作。`,
          code: [
          { lang: 'C', code: `int i = 3;
int a = ++i;  // a = 4, i = 4（前置）
int b = i++;  // b = 4, i = 5（後置）

// 未定義動作の例
int x = 1;
int y = x++ + x++;  // 未定義動作！
a[i] = i++;         // 未定義動作！` },
          ],
          warn: `1 つの式でシーケンスポイントをまたいで同一変数を複数回更新するのは未定義動作。コンパイラの最適化によって結果が変わる。式を分割して書くのが安全。`,
        },
        {
          id: 's2-演算子の優先順位',
          name: '演算子の優先順位',
          level: 'basic',
          keywords: '演算子優先順位 括弧 ビット演算 比較 & | ==',
          desc: `C は 15 段階の優先順位を持つ。特に \`&\`/\`|\` はビット演算子で \`==\` より低い優先順位になっている点が罠になりやすい。`,
          code: [
          { lang: 'C', code: `// よくある罠
if (flags & MASK == 0) { }    // (flags & (MASK == 0)) と解釈される！

// 正しい書き方
if ((flags & MASK) == 0) { }  // 括弧で優先順位を明示

// 三項演算子（右結合）
int max = a > b ? a : b;` },
          ],
          warn: `ビット演算（\`&\`/\`|\`/\`^\`）の優先順位は比較演算（\`==\`/\`!=\`/\`<\` 等）より低い。これは C 言語の設計上の歴史的な問題。混在させる場合は必ず括弧を付ける。`,
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
          id: 's3-if-else',
          name: 'if / else',
          level: 'basic',
          keywords: 'if else 条件分岐 truthy falsy ゼロ判定',
          desc: `C に \`bool\` 型はなかった（C99 で \`_Bool\` 追加）。条件式はゼロが偽、非ゼロが真。ポインタの NULL チェックも慣用的に \`if (ptr)\` と書く。`,
          code: [
          { lang: 'C', code: `// C99 以降：<stdbool.h> で bool/true/false が使える
#include <stdbool.h>
bool flag = true;

int *p = get_ptr();
if (p) {           // p != NULL と同じ意味（慣用句）
    *p = 42;
}

if (x > 0) {
    puts("positive");
} else if (x < 0) {
    puts("negative");
} else {
    puts("zero");
}` },
          ],
        },
        {
          id: 's3-switch-case-とフォールスルー',
          name: 'switch / case とフォールスルー',
          level: 'basic',
          keywords: 'switch case フォールスルー break default',
          desc: `\`break\` を書かないと次の \`case\` に処理が落ちる（フォールスルー）。意図的なフォールスルーはコメントで明示する慣習。\`switch\` は整数型と列挙型のみ使用可。`,
          code: [
          { lang: 'C', code: `int code = 2;
switch (code) {
    case 1:
        puts("one");
        break;
    case 2:
    case 3:              // フォールスルーで 2 と 3 を同じ処理に
        puts("two or three");
        break;
    default:
        puts("other");
        break;
}

// 意図しないフォールスルーを防ぐため break を忘れずに` },
          ],
          warn: `\`case\` の末尾に \`break\` を書き忘れると次の \`case\` に処理が流れ込む。\`-Wimplicit-fallthrough\`（GCC 7+）で警告を出せる。意図的なフォールスルーは \`/* fallthrough */\` コメントで示す。`,
        },
        {
          id: 's3-for-while-do-while',
          name: 'for / while / do-while',
          level: 'basic',
          keywords: 'for while do-while ループ break continue',
          desc: `C89 では \`for\` 文の初期化部に変数宣言を書けない（C99 以降は可）。\`do-while\` は最低 1 回実行されることが保証される。`,
          code: [
          { lang: 'C', code: `// C99 以降：for 文内で変数宣言可
for (int i = 0; i < 10; i++) {
    if (i == 5) continue;  // このイテレーションをスキップ
    if (i == 8) break;     // ループを抜ける
    printf("%d ", i);
}

// while
int n = 10;
while (n > 0) { n--; }

// do-while（最低 1 回実行）
int input;
do {
    scanf("%d", &input);
} while (input < 0);  // 正の値が入力されるまで繰り返す` },
          ],
        },
        {
          id: 's3-goto-の正当なユースケース',
          name: 'goto の正当なユースケース',
          level: 'basic',
          keywords: 'goto ラベル ジャンプ クリーンアップ エラー処理',
          desc: `C では \`goto\` は一般的に非推奨だが、複数の資源を確保した後のエラー脱出パターンとして Linux カーネル等で広く使われる。`,
          code: [
          { lang: 'C', code: `int process(void) {
    void *buf1 = malloc(100);
    if (!buf1) goto err0;

    void *buf2 = malloc(200);
    if (!buf2) goto err1;

    // ... 処理 ...
    free(buf2);
    free(buf1);
    return 0;

err1: free(buf1);
err0: return -1;
}` },
          ],
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
          id: 's4-プロトタイプ宣言',
          name: 'プロトタイプ宣言',
          level: 'basic',
          keywords: '宣言 定義 プロトタイプ ヘッダ 前方宣言',
          desc: `使用前に宣言（プロトタイプ）が必要。ヘッダファイルに宣言を書いてソースファイルで定義するのが標準的なスタイル。`,
          code: [
          { lang: 'C', code: `// プロトタイプ宣言（引数名は省略可）
int add(int, int);

// 定義
int add(int a, int b) {
    return a + b;
}

// 引数なしの関数は (void) と明示する
void greet(void) {
    puts("Hello");
}` },
          ],
          warn: `C では引数リストを空 \`()\` にすると「引数の個数・型を指定しない」という意味になる（C89 の名残）。「引数なし」を明示するには \`(void)\` と書く必要がある。`,
        },
        {
          id: 's4-値渡しとポインタ渡し',
          name: '値渡しとポインタ渡し',
          level: 'basic',
          keywords: '値渡し 参照渡し コピー ポインタ渡し 出力パラメータ',
          desc: `C は値渡しのみ。関数内で引数を変更しても呼び出し元に影響しない。呼び出し元の変数を変更するにはポインタを渡す。`,
          code: [
          { lang: 'C', code: `// 値渡し：呼び出し元は変化しない
void double_val(int x) { x *= 2; }

// ポインタ渡し：呼び出し元の変数を変更できる
void double_ptr(int *x) { *x *= 2; }

int n = 5;
double_val(n);   // n はまだ 5
double_ptr(&n);  // n は 10 になる

// 複数の値を返すにもポインタ渡しを使う
void min_max(int *arr, int len, int *min, int *max);` },
          ],
        },
        {
          id: 's4-static-関数と-inline-関数',
          name: 'static 関数と inline 関数',
          level: 'basic',
          keywords: 'static 関数 inline 外部非公開 リンケージ',
          desc: `\`static\` を付けた関数はそのソースファイル内でのみ有効（ファイルスコープ）。他のファイルから参照不可になる。\`inline\`（C99）はコンパイラへの展開ヒント。`,
          code: [
          { lang: 'C', code: `// このファイル内でのみ使える関数
static int helper(int x) { return x * 2; }

// インライン展開のヒント（C99）
static inline int square(int x) { return x * x; }

// 変数に対する static：関数を抜けても値を保持
void counter(void) {
    static int count = 0;  // 初回のみ 0 に初期化
    count++;
    printf("%d\\n", count);
}` },
          ],
        },
        {
          id: 's4-可変長引数-stdarg-h',
          name: '可変長引数（<stdarg.h>）',
          level: 'advanced',
          keywords: '可変長引数 varargs stdarg va_list printf',
          desc: `\`printf\` のような可変引数関数は \`<stdarg.h>\` の \`va_list\`/\`va_start\`/\`va_arg\`/\`va_end\` で実装する。`,
          code: [
          { lang: 'C', code: `#include <stdarg.h>
#include <stdio.h>

// count 個の int の合計を返す
int sum(int count, ...) {
    va_list ap;
    va_start(ap, count);  // count の後ろから可変引数が始まる
    int total = 0;
    for (int i = 0; i < count; i++) {
        total += va_arg(ap, int);
    }
    va_end(ap);
    return total;
}

sum(3, 10, 20, 30); // → 60` },
          ],
          warn: `\`va_arg\` で指定する型は実際の引数の型と一致していなければならない。型が合わない場合は未定義動作。\`va_end\` を呼ばないと移植性の問題が起きる。`,
        },
        {
          id: 's4-再帰',
          name: '再帰',
          level: 'basic',
          keywords: '再帰 スタックオーバーフロー 末尾再帰',
          desc: `C は再帰をサポートするが、呼び出しごとにスタックフレームを消費する。深い再帰はスタックオーバーフローを引き起こす。多くのコンパイラは末尾再帰を最適化しない。`,
          code: [
          { lang: 'C', code: `// 階乗（再帰）
long long factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// 深い再帰が必要な場合はループに書き直す
long long factorial_iter(int n) {
    long long result = 1;
    for (int i = 2; i <= n; i++) result *= i;
    return result;
}` },
          ],
        },
      ],
    },
    {
      id: 's5',
      num: 5,
      title: '配列と文字列',
      level: 'basic',
      items: [
        {
          id: 's5-配列の宣言と初期化',
          name: '配列の宣言と初期化',
          level: 'basic',
          keywords: '配列 宣言 初期化 インデックス サイズ 固定長',
          desc: `配列サイズはコンパイル時定数で指定（C99 以降は VLA で実行時指定も可）。初期化子が要素数より少ない場合は残りがゼロ埋めされる。`,
          code: [
          { lang: 'C', code: `int a[5];                    // 未初期化（ゴミ値）
int b[5] = {1, 2, 3, 4, 5};
int c[5] = {0};              // 全要素を 0 に初期化
int d[] = {10, 20, 30};      // サイズ省略（3 と推論）

// 指定初期化子（C99）
int e[5] = {[0]=1, [4]=5};   // 中間はゼロ

printf("%d\\n", b[0]);        // 1
printf("%zu\\n", sizeof(b) / sizeof(b[0]));  // 5` },
          ],
        },
        {
          id: 's5-境界外アクセス',
          name: '境界外アクセス',
          level: 'basic',
          keywords: '配列 境界外アクセス バッファオーバーラン 未定義動作',
          desc: `C は配列の境界チェックをしない。範囲外アクセスは未定義動作でクラッシュや脆弱性の原因になる。`,
          code: [
          { lang: 'C', code: `int arr[5] = {0, 1, 2, 3, 4};
arr[5] = 99;   // 未定義動作！インデックスは 0〜4 のみ有効
arr[-1] = 0;   // 未定義動作！

// 安全に使うには常に範囲チェック
int idx = get_index();
if (idx >= 0 && idx < 5) {
    arr[idx] = 99;
}` },
          ],
          warn: `境界外書き込みはスタックやヒープを破壊し、バッファオーバーフロー攻撃の原因になる。\`-fsanitize=address\`（AddressSanitizer）でデバッグ中に検出できる。`,
        },
        {
          id: 's5-文字列と-nul-終端',
          name: '文字列と NUL 終端',
          level: 'basic',
          keywords: '文字列 char 配列 NUL終端 NULL文字 \'\\0\'',
          desc: `C 文字列は \`char\` 配列で、末尾に \`'\\0'\`（NUL 文字）が置かれる。文字列リテラルは自動で \`'\\0'\` を付加する。`,
          code: [
          { lang: 'C', code: `char s1[] = "hello";    // {'h','e','l','l','o','\\0'} と等価（6要素）
char s2[6] = "hello";   // 同上
char s3[5] = "hello";   // '\\0' が入らない → 文字列として危険！

const char *p = "hello"; // 文字列リテラルへのポインタ（読み取り専用）

strlen(s1);  // 5（NUL を含まない長さ）
sizeof(s1);  // 6（NUL を含むバイト数）` },
          ],
          warn: `文字列バッファを確保するときは NUL 終端分の +1 を忘れずに。\`char buf[5] = "hello"\` は NUL が入らず、後続の文字列操作が不正メモリを読み続ける（バッファオーバーラン）。`,
        },
        {
          id: 's5-主要な文字列関数',
          name: '主要な文字列関数',
          level: 'basic',
          keywords: 'strcpy strncpy strcat strcmp strlen memcpy 文字列関数',
          desc: `\`<string.h>\` の文字列関数は境界チェックをしないものが多い。\`n\` 付きの関数（\`strncpy\` 等）を使う際も挙動に注意が必要。`,
          code: [
          { lang: 'C', code: `#include <string.h>
char dst[20];
char src[] = "hello";

strcpy(dst, src);            // コピー（dst が小さいと溢れる）
strncpy(dst, src, sizeof(dst) - 1);  // 長さ制限付き
dst[sizeof(dst) - 1] = '\\0'; // NUL 終端を保証（strncpy はしない場合がある）

strcat(dst, " world");       // 末尾に連結
strlen(dst);                 // 文字数（NUL 除く）
strcmp("abc", "abd");        // 負値（"abc" < "abd"）
strncmp("abc", "abX", 2);    // 0（最初の 2 文字が等しい）` },
          ],
          warn: `\`strcpy\`/\`strcat\` は宛先バッファが十分か確認しない。\`strlcpy\`/\`strlcat\`（BSD/macOS 標準、Linux は非標準）または \`snprintf\` を代替として使う。`,
        },
        {
          id: 's5-多次元配列',
          name: '多次元配列',
          level: 'basic',
          keywords: '多次元配列 2次元 行列 メモリレイアウト 行優先',
          desc: `C の多次元配列は行優先（row-major）でメモリに連続配置される。関数に渡すときは列数を明示する必要がある。`,
          code: [
          { lang: 'C', code: `int mat[3][4];           // 3行4列（12要素が連続配置）
mat[1][2] = 42;          // 行 1、列 2

// 関数に渡す場合、最初の次元は省略可だが後続は必須
void print_matrix(int m[][4], int rows);

// C99 VLA（可変長配列）
int rows = 3, cols = 4;
int vla[rows][cols];     // スタック上に確保（サイズ大きいと危険）` },
          ],
        },
      ],
    },
    {
      id: 's6',
      num: 6,
      title: 'ポインタ',
      level: 'basic',
      items: [
        {
          id: 's6-ポインタの基本',
          name: 'ポインタの基本',
          level: 'basic',
          keywords: 'ポインタ 宣言 アドレス & 逆参照 * 間接参照',
          desc: `ポインタはアドレスを格納する変数。\`&\` でアドレスを取得（参照）、\`*\` でポインタが指す値を読み書き（逆参照）。`,
          code: [
          { lang: 'C', code: `int x = 42;
int *p = &x;  // p に x のアドレスを格納

printf("%p\\n", (void *)p);  // アドレスを表示
printf("%d\\n", *p);         // 42（逆参照）

*p = 100;    // x の値を 100 に変更
printf("%d\\n", x);  // 100

// ポインタ自体のアドレス（ポインタへのポインタ）
int **pp = &p;` },
          ],
        },
        {
          id: 's6-null-ポインタとダングリングポインタ',
          name: 'NULL ポインタとダングリングポインタ',
          level: 'basic',
          keywords: 'NULL ポインタ ダングリング 未初期化 nullptr NULLチェック',
          desc: `NULL ポインタは「有効なアドレスを指していない」ことを示す値。ダングリングポインタは解放済みまたはスコープ外の変数を指すポインタで、逆参照すると未定義動作。`,
          code: [
          { lang: 'C', code: `int *p = NULL;
if (p != NULL) { *p = 1; }  // NULL チェック必須

// ダングリングポインタ（関数からローカル変数のアドレスを返す）
int *bad(void) {
    int local = 42;
    return &local;   // 危険！local はスコープを抜けると無効
}

// free 後もポインタは古いアドレスを保持（ダングリング）
int *q = malloc(sizeof(int));
free(q);
q = NULL;   // free 後は必ず NULL を代入する慣習` },
          ],
          warn: `関数のローカル変数のアドレスを返すのは未定義動作。スタック上の変数は関数リターン後に無効になる。ヒープや static 変数のアドレスは返せる。`,
        },
        {
          id: 's6-ポインタ演算',
          name: 'ポインタ演算',
          level: 'basic',
          keywords: 'ポインタ演算 加算 減算 配列 インデックス',
          desc: `ポインタへの整数加算は「型のサイズ × n バイト」進む。配列の走査に使われる。ポインタ同士の減算で要素間の距離を求められる。`,
          code: [
          { lang: 'C', code: `int arr[5] = {10, 20, 30, 40, 50};
int *p = arr;  // arr は &arr[0] に等しい

*(p + 1)      // 20（p から 1 要素分進んだ先）
p[2]          // 30（*(p+2) と同じ）

// ポインタ走査
for (int *it = arr; it < arr + 5; it++) {
    printf("%d ", *it);
}

// ポインタの差（ptrdiff_t 型）
int *end = arr + 5;
ptrdiff_t len = end - arr;  // 5` },
          ],
          warn: `ポインタ演算は同じ配列（または 1 要素分だけ末尾の外側）の範囲内でのみ有効。異なるオブジェクト間のポインタ比較・演算は未定義動作。`,
        },
        {
          id: 's6-配列とポインタの関係',
          name: '配列とポインタの関係',
          level: 'basic',
          keywords: '配列名 ポインタ decay 先頭要素 違い',
          desc: `配列名は多くの文脈でその先頭要素へのポインタに「成り下がる」（decay）。ただし \`sizeof\` と \`&\` 演算子では成り下がらない。`,
          code: [
          { lang: 'C', code: `int arr[5] = {1,2,3,4,5};
int *p = arr;        // arr → &arr[0] に decay

sizeof(arr)  // 20（配列全体）← decay しない
sizeof(p)    // 8（ポインタサイズ）

&arr         // int (*)[5]（配列全体へのポインタ）
&arr[0]      // int *（先頭要素へのポインタ）

// 関数引数では必ず decay する
void f(int a[5]) { }   // int *a と同じ宣言` },
          ],
        },
        {
          id: 's6-関数ポインタ',
          name: '関数ポインタ',
          level: 'advanced',
          keywords: '関数ポインタ コールバック 高階関数 typedef',
          desc: `関数のアドレスをポインタとして格納し、コールバックや戦略パターンを実装できる。宣言構文が複雑なため \`typedef\` で簡略化するのが一般的。`,
          code: [
          { lang: 'C', code: `int add(int a, int b) { return a + b; }
int mul(int a, int b) { return a * b; }

// 関数ポインタの宣言：int (*名前)(int, int)
int (*op)(int, int) = add;
op(3, 4);   // 7

// typedef で読みやすく
typedef int (*BinOp)(int, int);
BinOp ops[] = {add, mul};
ops[1](3, 4);  // 12

// qsort のコールバック
#include <stdlib.h>
int cmp(const void *a, const void *b) {
    return *(int*)a - *(int*)b;
}
int arr[5] = {3,1,4,1,5};
qsort(arr, 5, sizeof(int), cmp);` },
          ],
        },
      ],
    },
    {
      id: 's7',
      num: 7,
      title: '構造体・共用体・列挙型',
      level: 'basic',
      items: [
        {
          id: 's7-struct-の宣言と-typedef',
          name: 'struct の宣言と typedef',
          level: 'basic',
          keywords: 'struct 構造体 宣言 初期化 メンバ アクセス . ->',
          desc: `C の構造体は型名の前に \`struct\` キーワードが必要。\`typedef\` で別名を付けると使いやすくなる。メンバへのアクセスは \`.\`（値）と \`->\`（ポインタ）。`,
          code: [
          { lang: 'C', code: `// 宣言と typedef を同時に
typedef struct {
    char name[64];
    int  age;
    double score;
} Person;

// 初期化
Person p1 = {"Alice", 30, 98.5};
Person p2 = {.name = "Bob", .age = 25};  // 指定初期化子（C99）

// メンバアクセス
printf("%s\\n", p1.name);   // 値へのアクセス

// ポインタ経由
Person *ptr = &p1;
printf("%d\\n", ptr->age);  // (*ptr).age と同じ` },
          ],
        },
        {
          id: 's7-構造体のコピーと浅いコピーの罠',
          name: '構造体のコピーと浅いコピーの罠',
          level: 'basic',
          keywords: '構造体 コピー 代入 浅いコピー シャローコピー ポインタメンバ',
          desc: `構造体の代入はメンバのビットをそのままコピーする（浅いコピー）。ポインタメンバがある場合、コピー先とコピー元が同じアドレスを指す。`,
          code: [
          { lang: 'C', code: `typedef struct {
    char *name;   // ポインタメンバ
    int age;
} Node;

Node a = {.name = malloc(64), .age = 20};
strcpy(a.name, "Alice");

Node b = a;     // 浅いコピー：b.name は a.name と同じアドレス
b.age = 25;     // OK（int はコピーされている）
b.name[0] = 'X';// a.name も "Xlice" に変わってしまう！

free(a.name);
// free(b.name); ← 二重 free になる！` },
          ],
          warn: `ポインタメンバを持つ構造体を代入すると、2 つの構造体が同じメモリを指す。片方を \`free\` すると他方がダングリングポインタになる。深いコピーが必要な場合は専用の関数を作る。`,
        },
        {
          id: 's7-構造体のパディングとアライメント',
          name: '構造体のパディングとアライメント',
          level: 'basic',
          keywords: 'struct パディング アライメント offsetof サイズ',
          desc: `コンパイラはメンバのアライメント要求を満たすためにパディングを挿入する。メンバの宣言順によって構造体サイズが変わる。`,
          code: [
          { lang: 'C', code: `// パディングあり：char 後に 3 バイトのパディング
struct Padded { char c; int i; };   // sizeof → 8 (多くの環境)

// パディング削減：大きい型を先に
struct Packed  { int i; char c; };  // sizeof → 8（末尾に 3 バイト）

// メンバ順を整理すると小さくなる場合
struct Optimal { double d; int i; char c; };  // sizeof → 16

#include <stddef.h>
offsetof(struct Padded, i);  // i の先頭からのオフセット（通常 4）` },
          ],
        },
        {
          id: 's7-union-共用体',
          name: 'union（共用体）',
          level: 'basic',
          keywords: 'union 共用体 メモリ共有 型パンニング',
          desc: `全メンバが同じメモリ領域を共有する。サイズは最大のメンバのサイズ。同時に使えるメンバは 1 つのみ（最後に書いたメンバが有効）。`,
          code: [
          { lang: 'C', code: `typedef union {
    int   i;
    float f;
    char  bytes[4];
} Variant;

Variant v;
v.i = 0x3f800000;
printf("%f\\n", v.f);  // IEEE 754 で 1.0 と解釈される

// タグ付き共用体（どのメンバが有効かを struct で管理）
typedef struct {
    enum { TYPE_INT, TYPE_FLOAT } tag;
    union { int i; float f; } val;
} TaggedValue;` },
          ],
          warn: `書いていないメンバを読み取ること（型パンニング）は厳密には未定義動作だが、多くの実装では動作する。移植性を重視する場合は \`memcpy\` 経由で変換する。`,
        },
        {
          id: 's7-enum-列挙型',
          name: 'enum（列挙型）',
          level: 'basic',
          keywords: 'enum 列挙型 定数 スコープ 型チェック',
          desc: `C の \`enum\` は名前付き整数定数の集合。スコープは定義されたブロックに限定されず、列挙子はファイルスコープに飛び出す。型チェックも緩い。`,
          code: [
          { lang: 'C', code: `typedef enum {
    COLOR_RED   = 0,
    COLOR_GREEN = 1,
    COLOR_BLUE  = 2
} Color;

Color c = COLOR_RED;

// 列挙子はグローバルに漏れる（名前衝突に注意）
// RED だと他の定義と衝突しやすいので COLOR_ プレフィックスを使う慣習

// int との代入が通ってしまう（型チェックが緩い）
int n = COLOR_GREEN;  // 警告なしでコンパイルされる` },
          ],
          warn: `C の \`enum\` は実質 \`int\` 定数の別名。異なる \`enum\` 型同士の代入もコンパイルが通る。C++ の \`enum class\` のような強い型チェックはない。`,
        },
      ],
    },
    {
      id: 's8',
      num: 8,
      title: 'メモリ管理',
      level: 'advanced',
      items: [
        {
          id: 's8-malloc-calloc-realloc-free',
          name: 'malloc / calloc / realloc / free',
          level: 'advanced',
          keywords: 'malloc calloc realloc free ヒープ 動的確保',
          desc: `ヒープからメモリを動的に確保する。\`malloc\` は初期化しない。\`calloc\` はゼロ初期化する。\`realloc\` はサイズ変更。必ず \`free\` で解放する。`,
          code: [
          { lang: 'C', code: `#include <stdlib.h>

// malloc：未初期化メモリを確保
int *p = malloc(10 * sizeof(int));
if (!p) { /* 失敗処理 */ }

// calloc：ゼロ初期化（個数 × サイズ）
int *q = calloc(10, sizeof(int));

// realloc：サイズ変更（失敗時は NULL、元のポインタは無効化されない）
int *r = realloc(p, 20 * sizeof(int));
if (!r) { free(p); /* 元のメモリを解放 */ }
else    { p = r; }

free(p);
p = NULL;  // 解放後は NULL を代入` },
          ],
          warn: `\`malloc\` 失敗時の戻り値は \`NULL\`。確認せずに使うとクラッシュ。\`realloc\` が失敗しても元のポインタは有効なので、戻り値を直接元の変数に代入するとメモリリークする。`,
        },
        {
          id: 's8-メモリリークと二重-free',
          name: 'メモリリークと二重 free',
          level: 'advanced',
          keywords: 'メモリリーク 二重free ダングリング 検出 valgrind asan',
          desc: `確保したメモリを解放しないとメモリリーク、同じアドレスを 2 回 \`free\` すると未定義動作（ヒープ破壊）が起きる。`,
          code: [
          { lang: 'C', code: `// メモリリーク例
void leak(void) {
    int *p = malloc(100);
    return;  // free を忘れた → リーク
}

// 二重 free 例
int *p = malloc(4);
free(p);
free(p);   // 未定義動作！ヒープ破壊

// 安全パターン：free 後に NULL
free(p);
p = NULL;
free(p);   // NULL の free は安全（何もしない）

// 検出ツール
// valgrind --leak-check=full ./program
// gcc -fsanitize=address,leak ./program` },
          ],
          warn: `二重 \`free\` はセキュリティ脆弱性（ヒープオーバーフロー攻撃）の原因になる。解放後は必ずポインタを \`NULL\` にする。\`NULL\` の \`free\` は安全（C 標準で何もしないと規定）。`,
        },
        {
          id: 's8-スタックとヒープの違い',
          name: 'スタックとヒープの違い',
          level: 'advanced',
          keywords: 'スタック ヒープ 違い 自動変数 ライフタイム',
          desc: `スタックは高速・自動管理だがサイズ制限あり。ヒープは大きなデータや生存期間が可変なデータに使う。`,
          code: [
          { lang: 'C', code: `// スタック：関数終了時に自動解放、高速
void f(void) {
    int arr[1000];       // スタック上（~4KB）
    char buf[1024*1024]; // 1MB → スタックオーバーフローの危険
}

// ヒープ：明示的に malloc/free が必要、低速だが大きく確保可能
void g(void) {
    char *buf = malloc(1024 * 1024);  // 1MB ヒープに確保
    // ... 使う ...
    free(buf);
}

// static/グローバル：プログラム全期間で有効
static char persistent[4096];` },
          ],
        },
        {
          id: 's8-安全な-free-パターン',
          name: '安全な free パターン',
          level: 'advanced',
          keywords: '安全パターン free NULL マクロ SAFE_FREE',
          desc: `二重 \`free\` を防ぐ慣用パターン。マクロを使って \`free\` と \`NULL\` 代入を一体化するとコードが簡潔になる。`,
          code: [
          { lang: 'C', code: `// 安全 free マクロ
#define SAFE_FREE(p) do { free(p); (p) = NULL; } while (0)

int *buf = malloc(64);
// ... 処理 ...
SAFE_FREE(buf);   // free して NULL に
SAFE_FREE(buf);   // 2回目は NULL の free（安全）

// do { } while(0) は複文マクロの標準イディオム
// if 文のぶら下がりを防ぐ` },
          ],
        },
      ],
    },
    {
      id: 's9',
      num: 9,
      title: 'ファイルI/O',
      level: 'basic',
      items: [
        {
          id: 's9-fopen-fclose',
          name: 'fopen / fclose',
          level: 'basic',
          keywords: 'fopen fclose FILE ファイル 開く 閉じる モード',
          desc: `\`fopen\` は \`FILE *\` を返す。失敗時は \`NULL\` を返すので必ずチェックする。\`fclose\` を忘れるとファイルが正しく書き込まれない場合がある。`,
          code: [
          { lang: 'C', code: `#include <stdio.h>

FILE *fp = fopen("data.txt", "r");  // "r"=読み取り, "w"=書き込み, "a"=追記
if (!fp) {
    perror("fopen");   // エラーメッセージを stderr に出力
    return -1;
}

// ファイル処理...

if (fclose(fp) != 0) {
    perror("fclose");
}

// モード一覧
// "r"  読み取り専用      "rb" バイナリ読み取り
// "w"  書き込み（上書き） "wb" バイナリ書き込み
// "a"  追記              "r+" 読み書き両用` },
          ],
        },
        {
          id: 's9-テキスト読み書き',
          name: 'テキスト読み書き',
          level: 'basic',
          keywords: 'fgets fputs fprintf fscanf テキスト 行読み込み',
          desc: `行単位の読み込みには \`fgets\`（\`gets\` は使用禁止）。\`fprintf\` は \`printf\` のファイル版。`,
          code: [
          { lang: 'C', code: `char line[256];

// 行読み込み（改行 '\\n' も含む）
while (fgets(line, sizeof(line), fp) != NULL) {
    printf("%s", line);
}

// テキスト書き込み
fprintf(fp, "Name: %s, Age: %d\\n", "Alice", 30);
fputs("Hello\\n", fp);  // 文字列書き込み

// 書式読み込み（scanf のファイル版）
int n;
fscanf(fp, "%d", &n);` },
          ],
          warn: `\`gets()\` は使用禁止（C11 で削除）。バッファサイズを指定できないため必ずオーバーフローの危険がある。常に \`fgets(buf, sizeof(buf), fp)\` を使う。`,
        },
        {
          id: 's9-バイナリ読み書き-fread-fwrite',
          name: 'バイナリ読み書き（fread / fwrite）',
          level: 'basic',
          keywords: 'fread fwrite バイナリ 読み込み 書き込み',
          desc: `構造体やバイト列をそのままファイルに読み書きする。\`fread\`/\`fwrite\` は読み書きした「要素数」を返す。`,
          code: [
          { lang: 'C', code: `typedef struct { int x, y; } Point;
Point pts[3] = {{1,2},{3,4},{5,6}};

// バイナリ書き込み
FILE *fp = fopen("pts.bin", "wb");
size_t written = fwrite(pts, sizeof(Point), 3, fp);  // 3要素書き込み
fclose(fp);

// バイナリ読み込み
Point in_pts[3];
fp = fopen("pts.bin", "rb");
size_t read = fread(in_pts, sizeof(Point), 3, fp);
fclose(fp);` },
          ],
        },
        {
          id: 's9-fseek-ftell-rewind',
          name: 'fseek / ftell / rewind',
          level: 'basic',
          keywords: 'fseek ftell rewind シーク ランダムアクセス',
          desc: `ファイル位置指示子（カーソル）の操作。\`SEEK_SET\`（先頭から）、\`SEEK_CUR\`（現在位置から）、\`SEEK_END\`（末尾から）。`,
          code: [
          { lang: 'C', code: `FILE *fp = fopen("data.bin", "rb");

// ファイルサイズを取得する常套句
fseek(fp, 0, SEEK_END);   // 末尾へ移動
long size = ftell(fp);     // 現在位置 = ファイルサイズ
rewind(fp);                // 先頭に戻す（= fseek(fp, 0, SEEK_SET)）

// 特定位置へジャンプ
fseek(fp, 100, SEEK_SET);  // 先頭から 100 バイト目
fseek(fp, -4, SEEK_CUR);   // 現在位置から 4 バイト戻る` },
          ],
        },
      ],
    },
    {
      id: 's10',
      num: 10,
      title: 'プリプロセッサとマクロ',
      level: 'basic',
      items: [
        {
          id: 's10-define-と関数マクロ',
          name: '#define と関数マクロ',
          level: 'basic',
          keywords: '#define #undef マクロ 定数 関数マクロ',
          desc: `マクロはテキスト置換。引数付きマクロは型チェックなしで使え、インライン展開されるが副作用に注意。全体を括弧で囲む習慣が重要。`,
          code: [
          { lang: 'C', code: `#define PI 3.14159265358979
#define SQ(x)    ((x) * (x))   // 全体と引数を括弧で囲む
#define MAX(a,b) ((a) > (b) ? (a) : (b))

int r = 5;
double area = PI * SQ(r);    // OK

int i = 3;
int m = MAX(i++, 2);  // (i++ > 2 ? i++ : 2) → i が 2 回インクリメントされる！

#undef PI   // マクロの取り消し` },
          ],
          warn: `関数マクロの引数に副作用のある式（\`i++\` 等）を渡すと複数回評価される。C99 以降の \`static inline\` 関数で代替するのが安全。`,
        },
        {
          id: 's10-条件コンパイル',
          name: '条件コンパイル',
          level: 'basic',
          keywords: '#ifdef #ifndef #if #else #endif 条件コンパイル',
          desc: `プラットフォーム差異の吸収やデバッグコードの切り替えに使う。\`#ifdef\` は「マクロが定義されているか」、\`#if\` は「値の条件」を評価する。`,
          code: [
          { lang: 'C', code: `#ifdef _WIN32
    #define PATH_SEP '\\\\'
#else
    #define PATH_SEP '/'
#endif

#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 199901L
    // C99 以降のコード
#endif

// デバッグ出力
#ifdef DEBUG
    #define LOG(fmt, ...) fprintf(stderr, fmt, ##__VA_ARGS__)
#else
    #define LOG(fmt, ...) /* 何もしない */
#endif` },
          ],
        },
        {
          id: 's10-インクルードガード-pragma-once',
          name: 'インクルードガード / #pragma once',
          level: 'basic',
          keywords: 'インクルードガード #pragma once 多重インクルード ヘッダ',
          desc: `ヘッダファイルが複数回インクルードされると型・変数の二重定義エラーが起きる。インクルードガードまたは \`#pragma once\` で防ぐ。`,
          code: [
          { lang: 'C', code: `// mylib.h — 古典的インクルードガード（C 標準）
#ifndef MYLIB_H
#define MYLIB_H

// ヘッダ内容

#endif /* MYLIB_H */

// または #pragma once（非標準だが主要コンパイラで使用可）
#pragma once

// ヘッダ内容` },
          ],
        },
        {
          id: 's10-文字列化-とトークン結合',
          name: '文字列化（#）とトークン結合（##）',
          level: 'advanced',
          keywords: '# ## 文字列化 トークン結合 マクロ 高度',
          desc: `\`#\` は引数を文字列リテラルに変換、\`##\` は 2 つのトークンを結合する。デバッグマクロや汎用コード生成に使われる。`,
          code: [
          { lang: 'C', code: `// # 文字列化：変数名と値を一緒に表示
#define SHOW(x) printf(#x " = %d\\n", (x))
int answer = 42;
SHOW(answer);  // "answer = 42" と出力

// ## トークン結合：識別子を組み立て
#define MAKE_VAR(name) int var_##name
MAKE_VAR(x);   // int var_x; に展開される` },
          ],
        },
      ],
    },
    {
      id: 's11',
      num: 11,
      title: '標準ライブラリ',
      level: 'basic',
      items: [
        {
          id: 's11-printf-scanf-のフォーマット指定子',
          name: 'printf / scanf のフォーマット指定子',
          level: 'basic',
          keywords: 'printf scanf フォーマット指定子 %d %s %f %p 書式',
          desc: `フォーマット指定子と引数の型が一致しないと未定義動作。\`scanf\` でのバッファサイズ制限も重要。`,
          code: [
          { lang: 'C', code: `// printf フォーマット指定子
printf("%d\\n",   42);          // int
printf("%u\\n",   42u);         // unsigned int
printf("%ld\\n",  42L);         // long
printf("%lld\\n", 42LL);        // long long
printf("%f\\n",   3.14);        // double（float も double に昇格）
printf("%s\\n",   "hello");     // 文字列
printf("%p\\n",   (void*)ptr);  // ポインタ（キャストが必要）
printf("%zu\\n",  sizeof(int)); // size_t

// scanf：必ずアドレスを渡す
int n;
char buf[64];
scanf("%d", &n);
scanf("%63s", buf);  // サイズ制限 63（NUL 分を引く）` },
          ],
          warn: `型不一致は未定義動作。\`int\` を \`%ld\` で出力するなどすると結果が不定。\`-Wformat\`（\`-Wall\` に含まれる）でコンパイル時に検出できる。\`scanf("%s", buf)\` はサイズ制限がないためバッファオーバーフローの原因になる。`,
        },
        {
          id: 's11-stdlib-h-の主要関数',
          name: '<stdlib.h> の主要関数',
          level: 'basic',
          keywords: 'stdlib.h atoi strtol strtod exit qsort bsearch',
          desc: `文字列→数値変換、プロセス終了、ソート・探索などを提供。\`atoi\` はエラー検出できないので \`strtol\` を推奨。`,
          code: [
          { lang: 'C', code: `#include <stdlib.h>

// 文字列 → 数値（エラー検出できない古い関数）
int n = atoi("123");

// エラー検出可能な変換（推奨）
char *end;
long l = strtol("123abc", &end, 10);  // end は変換できなかった先頭を指す
if (*end != '\\0') { /* 変換失敗 */ }

// プロセス終了
exit(0);         // 正常終了（atexit 登録関数を実行）
abort();         // 異常終了（SIGABRT を発生）

// ソート・二分探索
int arr[5] = {3,1,4,1,5};
qsort(arr, 5, sizeof(int), compare_func);
int *found = bsearch(&key, arr, 5, sizeof(int), compare_func);` },
          ],
        },
        {
          id: 's11-math-h',
          name: '<math.h>',
          level: 'basic',
          keywords: 'math.h 数学 sqrt pow sin cos log ceil floor',
          desc: `数学関数は \`<math.h>\` をインクルードしリンク時に \`-lm\` フラグが必要（Linux/GCC）。引数と戻り値は \`double\`。`,
          code: [
          { lang: 'C', code: `#include <math.h>
// コンパイル: gcc prog.c -lm

sqrt(9.0)        // 3.0
pow(2.0, 10.0)   // 1024.0
fabs(-3.5)       // 3.5（絶対値）
ceil(1.2)        // 2.0（切り上げ）
floor(1.8)       // 1.0（切り捨て）
round(1.5)       // 2.0（四捨五入）
log(M_E)         // 1.0（自然対数）
log2(8.0)        // 3.0
sin(M_PI / 2.0)  // 1.0（引数はラジアン）` },
          ],
        },
        {
          id: 's11-time-h-と乱数',
          name: '<time.h> と乱数',
          level: 'basic',
          keywords: 'time.h time clock 時間計測 乱数 rand srand',
          desc: `時刻取得は \`time()\`、経過時間の計測は \`clock()\`。乱数は \`rand()\`（範囲は 0〜\`RAND_MAX\`）。`,
          code: [
          { lang: 'C', code: `#include <time.h>
#include <stdlib.h>

// 現在時刻
time_t now = time(NULL);
printf("%s", ctime(&now));  // 人間可読な文字列

// 経過時間計測
clock_t start = clock();
// ... 処理 ...
double sec = (double)(clock() - start) / CLOCKS_PER_SEC;

// 乱数（シードを設定して使う）
srand((unsigned)time(NULL));
int r = rand() % 100;       // 0〜99 の乱数` },
          ],
          warn: `\`rand()\` は品質が低く暗号用途には使えない。統計・シミュレーションには Mersenne Twister 等の外部ライブラリ、セキュリティ用途には OS 提供の \`/dev/urandom\` や \`arc4random()\` を使う。`,
        },
      ],
    },
    {
      id: 's12',
      num: 12,
      title: 'コンパイルとリンク',
      level: 'advanced',
      items: [
        {
          id: 's12-コンパイルの-4-段階',
          name: 'コンパイルの 4 段階',
          level: 'advanced',
          keywords: 'コンパイル リンク 前処理 アセンブル 流れ gcc',
          desc: `C のビルドは「前処理 → コンパイル → アセンブル → リンク」の 4 段階。各段階を個別に実行することもできる。`,
          code: [
          { lang: 'C', code: `// 1. 前処理：#include / #define を展開（.i ファイル）
gcc -E main.c -o main.i

// 2. コンパイル：C → アセンブリ（.s ファイル）
gcc -S main.i -o main.s

// 3. アセンブル：アセンブリ → オブジェクト（.o ファイル）
gcc -c main.c -o main.o

// 4. リンク：複数の .o + ライブラリ → 実行可能ファイル
gcc main.o util.o -o program -lm

// 一括ビルド（最終的にこれで OK）
gcc main.c util.c -o program -lm` },
          ],
        },
        {
          id: 's12-gcc-clang-の主要オプション',
          name: 'GCC/Clang の主要オプション',
          level: 'advanced',
          keywords: 'gcc オプション -Wall -O2 -g -std 最適化 デバッグ',
          desc: `開発時は \`-Wall -Wextra -g\`、リリース時は \`-O2\` または \`-O3\` を使う。`,
          code: [
          { lang: 'C', code: `// 開発時の推奨設定
gcc -Wall -Wextra -g -std=c17 main.c -o program

// -Wall    : 一般的な警告を有効化
// -Wextra  : 追加の警告
// -g       : デバッグシンボル（GDB 等で使用）
// -std=c17 : C17 準拠モード
// -O0      : 最適化なし（デフォルト）
// -O2      : 一般的な最適化
// -O3      : 積極的最適化
// -Os      : コードサイズ最小化（組み込み向け）

// サニタイザー（デバッグに有効）
gcc -fsanitize=address,undefined main.c -o program` },
          ],
        },
        {
          id: 's12-static-extern-リンケージ',
          name: 'static / extern リンケージ',
          level: 'advanced',
          keywords: 'static extern リンケージ 内部 外部 グローバル',
          desc: `\`static\`（ファイルスコープで使用）は内部リンケージ。\`extern\` は他のファイルで定義された変数・関数の宣言。`,
          code: [
          { lang: 'C', code: `// config.c
int g_count = 0;           // 外部リンケージ（他ファイルから参照可）
static int s_private = 1;  // 内部リンケージ（このファイルのみ）

// config.h
extern int g_count;   // 他ファイルへの宣言（定義は config.c）

// main.c
#include "config.h"
g_count++;  // OK、config.c の変数を参照` },
          ],
        },
        {
          id: 's12-makefile-の基本',
          name: 'Makefile の基本',
          level: 'advanced',
          keywords: 'Makefile make ビルド 依存関係 ルール',
          desc: `\`make\` は依存関係を解析して変更されたファイルのみ再コンパイルする。\`Makefile\` のレシピ行は必ずタブ文字でインデントする。`,
          code: [
          { lang: 'C', code: `// Makefile
CC      = gcc
CFLAGS  = -Wall -Wextra -g -std=c17
LDFLAGS = -lm

TARGET  = program
SRCS    = main.c util.c
OBJS    = $(SRCS:.c=.o)

$(TARGET): $(OBJS)
	$(CC) $(OBJS) -o $@ $(LDFLAGS)

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -f $(OBJS) $(TARGET)

.PHONY: clean` },
          ],
          warn: `Makefile のレシピ行はスペースではなく「タブ文字」でインデントする必要がある。エディタがタブをスペースに変換する設定の場合は注意。`,
        },
      ],
    },
    {
      id: 's13',
      num: 13,
      title: '未定義動作と移植性',
      level: 'advanced',
      items: [
        {
          id: 's13-未定義動作-ub-とは',
          name: '未定義動作（UB）とは',
          level: 'advanced',
          keywords: '未定義動作 UB undefined behavior 危険 最適化',
          desc: `C 標準が「動作を規定しない」と明示した操作。コンパイラは UB が起きないと仮定して最適化するため、期待と真逆の動作や無音のデータ破壊が起きる。`,
          code: [
          { lang: 'C', code: `// よくある UB パターン
int x = INT_MAX;
x + 1;                 // 符号付き整数オーバーフロー
int arr[3];
arr[3] = 0;            // 境界外アクセス
int *p = NULL;
*p = 1;                // NULL 逆参照
char *s = "hello";
s[0] = 'H';            // 文字列リテラルへの書き込み
int n;
printf("%d", n);       // 未初期化変数の読み取り` },
          ],
          warn: `UB は「たまたま動く」ことがある。デバッグビルドでは問題なく、リリースビルド（最適化有効）で突然クラッシュするケースが多い。常に \`-fsanitize=address,undefined\` でテストする。`,
        },
        {
          id: 's13-エンディアンと移植性',
          name: 'エンディアンと移植性',
          level: 'advanced',
          keywords: 'エンディアン バイトオーダー big-endian little-endian 移植性',
          desc: `x86/ARM はリトルエンディアン（下位バイトが低アドレス）、ネットワークバイトオーダーはビッグエンディアン。バイナリファイルやネットワーク通信で問題になる。`,
          code: [
          { lang: 'C', code: `#include <stdint.h>

// エンディアン検出
int is_little_endian(void) {
    uint16_t n = 1;
    return *(uint8_t *)&n == 1;
}

// ネットワークバイトオーダー変換（<arpa/inet.h> / <winsock2.h>）
// htonl: host → network (32bit)
// ntohl: network → host (32bit)
#include <arpa/inet.h>
uint32_t net = htonl(0x12345678);

// 移植性のある整数読み書き（バイト単位で処理）
uint32_t read_le32(const uint8_t *p) {
    return p[0] | (p[1] << 8) | (p[2] << 16) | (p[3] << 24);
}` },
          ],
        },
        {
          id: 's13-アライメントとパッキング',
          name: 'アライメントとパッキング',
          level: 'advanced',
          keywords: 'アライメント align パディング __attribute__ packed',
          desc: `CPU はデータのアライメント要求を持つ。ミスアラインドアクセスはバスエラー（一部の ARM 等）や性能低下を招く。`,
          code: [
          { lang: 'C', code: `#include <stddef.h>

// C11 のアライメント指定
#include <stdalign.h>
alignas(16) float vec[4];  // 16 バイト境界にアラインされた配列

// GCC 拡張：構造体のパディングを強制的に除去（バイナリ互換性のため）
struct __attribute__((packed)) NetworkHeader {
    uint8_t  version;
    uint16_t length;   // パディングなし（アライメント違反の可能性）
    uint32_t checksum;
};

// アライメント確認
_Alignof(double);  // 通常 8（C11）` },
          ],
          warn: `\`__attribute__((packed))\` はアライメント違反を引き起こし、一部アーキテクチャではクラッシュや性能低下を招く。ネットワークプロトコルのパース等、必要最小限の場面のみで使う。`,
        },
      ],
    },
    {
      id: 's14',
      num: 14,
      title: 'モダンC（C99/C11/C17）',
      level: 'advanced',
      items: [
        {
          id: 's14-c99-の主な追加',
          name: 'C99 の主な追加',
          level: 'advanced',
          keywords: 'C99 変数宣言 for文 bool stdbool VLA 可変長配列 複合リテラル',
          desc: `C99 は C の大型アップデート。\`bool\` 型・\`for\` 文内変数宣言・VLA・指定初期化子・\`//\` コメント・複合リテラルなどが追加された。`,
          code: [
          { lang: 'C', code: `// for 文内の変数宣言
for (int i = 0; i < 10; i++) { }

// bool 型（<stdbool.h>）
#include <stdbool.h>
bool flag = true;

// 可変長配列 VLA（スタック上で実行時サイズの配列）
int n = 10;
int vla[n];    // C99 以降。C11 でオプション化（VLA が不要な場合も）

// 指定初期化子
int arr[5] = {[2]=20, [4]=40};

// 複合リテラル（その場で構造体や配列を生成）
int *p = (int[]){1, 2, 3, 4};
typedef struct { int x, y; } Point;
Point pt = (Point){.x=3, .y=4};` },
          ],
          warn: `VLA はスタック上に確保されるため、サイズが大きいとスタックオーバーフローを引き起こす。C11 でオプション機能になり、\`__STDC_NO_VLA__\` が定義された処理系では使えない。組み込みや MSVC では使えない場合が多い。`,
        },
        {
          id: 's14-c11-の主な追加',
          name: 'C11 の主な追加',
          level: 'advanced',
          keywords: 'C11 _Generic _Static_assert _Atomic 型選択 静的アサート',
          desc: `C11 はアトミック操作・ジェネリック選択・静的アサート・マルチスレッドが追加された。`,
          code: [
          { lang: 'C', code: `// _Generic：型に応じて式を選択（型安全な汎用関数マクロ）
#define abs_val(x) _Generic((x), \\
    int:    abs(x),              \\
    long:   labs(x),             \\
    double: fabs(x),             \\
    default: abs(x))

// _Static_assert：コンパイル時アサート
_Static_assert(sizeof(int) == 4, "int must be 4 bytes");

// _Atomic：アトミック操作（<stdatomic.h>）
#include <stdatomic.h>
atomic_int counter = 0;
atomic_fetch_add(&counter, 1);  // スレッドセーフなインクリメント

// noreturn 属性（<stdnoreturn.h>）
#include <stdnoreturn.h>
_Noreturn void fatal(const char *msg) {
    fputs(msg, stderr);
    exit(1);
}` },
          ],
        },
        {
          id: 's14-c23-の新機能-最新標準',
          name: 'C23 の新機能（最新標準）',
          level: 'advanced',
          keywords: 'C23 typeof nullptr #embed auto 新機能',
          desc: `C23（ISO/IEC 9899:2024）はモダン化が進んだ最新標準。GCC 13+/Clang 16+ で部分的にサポートされている。`,
          code: [
          { lang: 'C', code: `// typeof：型を取り出す（GCC 拡張が標準化）
int x = 5;
typeof(x) y = 10;  // int y = 10;

// nullptr：NULL ポインタ定数（型安全）
int *p = nullptr;  // NULL より型安全

// auto：型推論（初期化式から型を推論）
auto n = 42;       // int n = 42;

// #embed：バイナリファイルのインライン埋め込み
const unsigned char icon[] = {
    #embed "icon.png"
};

// 属性構文の統一（[[nodiscard]] 等が C でも使える）
[[nodiscard]] int compute(void);` },
          ],
        },
        {
          id: 's14-モダン-c-のベストプラクティス',
          name: 'モダン C のベストプラクティス',
          level: 'advanced',
          keywords: 'モダン スタイル 推奨 ベストプラクティス 安全',
          desc: `現代の C 開発での推奨スタイルとツール活用の指針。`,
          code: [
          { lang: 'C', code: `// 1. 固定幅型を積極的に使う
#include <stdint.h>
uint32_t flags;  // int より意図が明確

// 2. const を積極的に付ける
const char *process(const char *input, size_t len);

// 3. サイズは size_t（符号なし）で扱う
size_t count = sizeof(arr) / sizeof(arr[0]);

// 4. 戻り値は必ず確認する
if (fclose(fp) != 0) { perror("fclose"); }

// 5. コンパイル時チェックの活用
_Static_assert(sizeof(off_t) >= 8, "Large file support required");

// 6. ツール活用
// clang-format でコード整形
// clang-tidy で静的解析
// valgrind / ASan でメモリエラー検出` },
          ],
        },
      ],
    },
  ],
};

export default data;
