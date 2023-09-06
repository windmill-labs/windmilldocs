import React from 'react';
import styles from './TestimonialCard.module.css';

interface TestimonialCardProps {
  text: string;
  source: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ text, source }) => {
  return (
    <div className={styles.card}>
      <p>{text}</p>
      <a href={source} className={styles.source}>Source</a>
    </div>
  );
};

export default TestimonialCard;
