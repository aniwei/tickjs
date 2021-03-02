// typedef struct JSParseState {
//   JSContext *ctx;
//   int last_line_num;  /* line number of last token */
//   int line_num;       /* line number of current offset */
//   const char *filename;
//   JSToken token;
//   BOOL got_lf; /* true if got line feed before the current token */
//   const uint8_t *last_ptr;
//   const uint8_t *buf_ptr;
//   const uint8_t *buf_end;

//   /* current function code */
//   JSFunctionDef *cur_func;
//   BOOL is_module; /* parsing a module */
//   BOOL allow_html_comments;
//   BOOL ext_json; /* true if accepting JSON superset */
// } JSParseState;


class JSContext {

}

class JSFunction {

}

class JSParse {
  public context;   // 上下文
  public lastLineNumber: number = 0; // 最后一行
  public lineNumber: number; // 行数
  public filename: string;
  public token: JSToken;
  public input: Buffer;
  public currentFunction;

  constructor (
    context,
    filename,
    input,
  ) {
    this.context = context;
    this.lineNumber = 1;
    this.filename = filename;
    this.input = input;

    this.token = {
      value: '',
      lineNumber: 1
    }
  }

  nextToken (c) {
    switch (c) {
      case 0:
        break;

      case '`':
        // 解析字符串模版
        break;

      case '\'':
      case '\"':
        // 解析字符串
        break;

      case '\r':
        // 回车换行
        break;

      case '\n':
        // 换行
        break;

      case '\f':
      case '\v':
      case ' ':
      case '\t':
        break;

      case '/':
        // 正则 or 注释
        break;

      case '\\':
        // unicode
        break;

      case 'a':
      case 'b':
      case '_':
        // 标识解析
        break;

      case '#':
        // 类似 nodejs #! ?
        break;

      case '.':
        // 数值 or 解构 or .操作
        break;

      case '0':
        // 各种数值
        break;

      case '1':
        // 数值
        break;

      case '*':
        break;
      case '%':
        break;
      case '+':
        break;
      case '-':
        break;
      case '<':
        break;
      case '>':
        break;

      case '=':
        break;

      case '!':
        break;

      case '&':
        break;

      case '^':
        break;

      case '?':
        break;

      default:
        break;
    }
  }

  program () {
    while (this.token.value !== TOKEN_EOF) {

    }

    const func = this.currentFunction;
    let index;

    for (;;) {
      if (c < 128) {
        buffer[i] = c;
      }
    }

  }
}

const TOKEN_EOF = 'eof'