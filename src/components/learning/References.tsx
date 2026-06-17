type ReferenceObject = {
  title: string;
  url: string;
  accessed?: string;
};
type Reference = string | ReferenceObject;

interface ReferencesProps {
  items: Reference[];
}

export default function References({ items }: ReferencesProps) {
  if (!items || items.length === 0) return null;
  return (
    <section>
      <h2>참고 자료</h2>
      <ul className="references-list">
        {items.map((ref, i) => {
          if (typeof ref === 'string') {
            return (
              <li key={i}>
                <a href={ref} target="_blank" rel="noopener noreferrer">
                  {ref}
                </a>
              </li>
            );
          }
          return (
            <li key={i}>
              <a href={ref.url} target="_blank" rel="noopener noreferrer">
                {ref.title}
              </a>
              {ref.accessed ? ` (접속: ${ref.accessed})` : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
