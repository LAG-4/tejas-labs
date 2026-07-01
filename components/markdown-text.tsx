type Props = {
  content: string;
};

function renderInline(text: string, keyPrefix: string) {
  const nodes: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  const patterns: Array<{
    re: RegExp;
    render: (m: RegExpMatchArray) => React.ReactNode;
  }> = [
    {
      re: /\*\*([^*]+)\*\*/,
      render: (m) => <strong key={`${keyPrefix}-${key++}`}>{m[1]}</strong>,
    },
    {
      re: /`([^`]+)`/,
      render: (m) => <code key={`${keyPrefix}-${key++}`}>{m[1]}</code>,
    },
    {
      re: /\[([^\]]+)\]\(([^)\s]+)\)/,
      render: (m) => (
        <a key={`${keyPrefix}-${key++}`} href={m[2]} target="_blank" rel="noreferrer noopener">
          {m[1]}
        </a>
      ),
    },
  ];

  while (remaining.length > 0) {
    let earliest: { index: number; matcher: typeof patterns[number]; match: RegExpMatchArray } | null =
      null;

    for (const matcher of patterns) {
      const match = remaining.match(matcher.re);
      if (match && (earliest === null || (match.index ?? 0) < earliest.index)) {
        earliest = { index: match.index ?? 0, matcher, match };
      }
    }

    if (!earliest) {
      nodes.push(<span key={`${keyPrefix}-${key++}`}>{remaining}</span>);
      break;
    }

    if (earliest.index > 0) {
      nodes.push(<span key={`${keyPrefix}-${key++}`}>{remaining.slice(0, earliest.index)}</span>);
    }

    nodes.push(earliest.matcher.render(earliest.match));
    remaining = remaining.slice(earliest.index + earliest.match[0].length);
  }

  return nodes;
}

function isTableRow(line: string) {
  return line.trim().startsWith("|") && line.trim().endsWith("|");
}

function isTableDelimiter(line: string) {
  return /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)+\|?\s*$/.test(line.trim());
}

function parseTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

export function MarkdownText({ content }: Props) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: React.ReactNode[] = [];
  let listItems: string[] = [];
  let tableRows: string[][] = [];
  let key = 0;

  const flushList = () => {
    if (listItems.length === 0) return;
    blocks.push(
      <ul key={`ul-${key++}`} className="chatbot-md-list">
        {listItems.map((item, i) => (
          <li key={`li-${key++}-${i}`}>{renderInline(item, `li-${key++}-${i}`)}</li>
        ))}
      </ul>,
    );
    listItems = [];
  };

  const flushTable = () => {
    if (tableRows.length === 0) return;
    const [header, ...rest] = tableRows;
    blocks.push(
      <div key={`table-wrap-${key++}`} className="chatbot-md-table-wrap">
        <table key={`table-${key++}`} className="chatbot-md-table">
          <thead>
            <tr>
              {header.map((cell, i) => (
                <th key={`th-${key++}-${i}`}>{renderInline(cell, `th-${key++}-${i}`)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rest.map((row, r) => (
              <tr key={`tr-${key++}-${r}`}>
                {row.map((cell, i) => (
                  <td key={`td-${key++}-${r}-${i}`}>{renderInline(cell, `td-${key++}-${r}-${i}`)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>,
    );
    tableRows = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (isTableDelimiter(line)) {
      continue;
    }

    if (isTableRow(line)) {
      flushList();
      tableRows.push(parseTableRow(line));
      continue;
    }

    flushTable();

    if (/^\s*[-*]\s+/.test(line)) {
      listItems.push(line.replace(/^\s*[-*]\s+/, ""));
      continue;
    }

    flushList();

    if (line.trim() === "") continue;

    blocks.push(
      <p key={`p-${key++}`} className="chatbot-md-p">
        {renderInline(line, `p-${key++}`)}
      </p>,
    );
  }

  flushList();
  flushTable();

  return <div className="chatbot-md">{blocks}</div>;
}