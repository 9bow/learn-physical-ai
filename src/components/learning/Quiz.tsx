import { useEffect, useMemo, useState } from 'react';

interface QuizItem {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
}

interface QuizProps {
  section: string;
}

/**
 * 매우 단순한 인라인 마크다운 렌더러.
 * 코드 블록(```), 인라인 코드(`), 굵게(**), 줄바꿈을 지원한다.
 * 퀴즈 텍스트에 코드가 들어가도 깨지지 않게 한다.
 */
function renderMarkdown(text: string): React.ReactNode {
  const blocks = text.split(/```/);
  return blocks.map((block, i) => {
    // 홀수 인덱스는 코드 블록
    if (i % 2 === 1) {
      const cleaned = block.replace(/^[a-zA-Z]*\n/, '');
      return (
        <pre key={i} style={{ margin: '0.5rem 0', padding: '0.6rem', borderRadius: '0.3rem' }}>
          <code>{cleaned}</code>
        </pre>
      );
    }
    // 인라인: 줄바꿈 + 인라인 코드 + 굵게
    const lines = block.split('\n');
    return (
      <span key={i}>
        {lines.map((line, li) => (
          <span key={li}>
            {renderInline(line)}
            {li < lines.length - 1 ? <br /> : null}
          </span>
        ))}
      </span>
    );
  });
}

function renderInline(line: string): React.ReactNode {
  // 인라인 코드 `...` 를 우선 처리
  const parts = line.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 1) {
      return <code key={i}>{part.slice(1, -1)}</code>;
    }
    // 굵게 **...**
    const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
    return boldParts.map((bp, bi) => {
      if (bp.startsWith('**') && bp.endsWith('**') && bp.length > 2) {
        return <strong key={`${i}-${bi}`}>{bp.slice(2, -2)}</strong>;
      }
      return <span key={`${i}-${bi}`}>{bp}</span>;
    });
  });
}

export default function Quiz({ section }: QuizProps) {
  const [items, setItems] = useState<QuizItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const base = import.meta.env.BASE_URL.replace(/\/$/, '');

  useEffect(() => {
    fetch(`${base}/data/quiz/${section}.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`퀴즈 데이터를 찾을 수 없습니다 (${r.status})`);
        return r.json();
      })
      .then((data: QuizItem[]) => setItems(data))
      .catch((e) => setError(e.message));
  }, [section, base]);

  const total = items?.length ?? 0;
  const item = items?.[current];

  const choose = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (item && idx === item.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (current + 1 >= total) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  const percent = useMemo(
    () => (total > 0 ? Math.round((score / total) * 100) : 0),
    [score, total]
  );

  if (error) {
    return <div className="quiz-root">⚠️ {error}</div>;
  }
  if (!items) {
    return <div className="quiz-root">퀴즈 로딩 중…</div>;
  }
  if (finished) {
    return (
      <div className="quiz-root">
        <p className="quiz-result">
          결과: {total}문제 중 {score}문제 정답 ({percent}%)
        </p>
        <div className="quiz-controls">
          <button className="quiz-btn" onClick={restart}>
            다시 풀기
          </button>
        </div>
      </div>
    );
  }
  if (!item) return null;

  return (
    <div className="quiz-root">
      <div className="quiz-progress">
        문제 {current + 1} / {total} · 현재 점수 {score}
      </div>
      <div className="quiz-question">{renderMarkdown(item.question)}</div>
      <div>
        {item.options.map((opt, idx) => {
          let cls = 'quiz-option';
          if (selected !== null) {
            if (idx === item.answer) cls += ' correct';
            else if (idx === selected) cls += ' incorrect';
          }
          return (
            <button
              key={idx}
              className={cls}
              disabled={selected !== null}
              onClick={() => choose(idx)}
            >
              {renderMarkdown(opt)}
            </button>
          );
        })}
      </div>
      {selected !== null && item.explanation && (
        <div className="quiz-explanation">{renderMarkdown(item.explanation)}</div>
      )}
      {selected !== null && (
        <div className="quiz-controls">
          <button className="quiz-btn" onClick={next}>
            {current + 1 >= total ? '결과 보기' : '다음 문제'}
          </button>
        </div>
      )}
    </div>
  );
}
