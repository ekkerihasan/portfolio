'use client';

interface TypewriterProps {
  text: string;
}

export default function Typewriter({ text }: TypewriterProps) {
  return (
    <span className="inline-block">
      {text}
    </span>
  );
}
