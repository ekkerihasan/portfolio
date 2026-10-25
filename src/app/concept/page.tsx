import type { Metadata } from 'next';
import Concept from './Concept';

export const metadata: Metadata = {
  title: 'Hasan Ekkeri — Creative Frontend Developer',
  description: 'Thoughtful interfaces, expressive interactions, and web products by Hasan Ekkeri.',
  robots: { index: false, follow: false },
};

export default function ConceptPage() {
  return <Concept />;
}
