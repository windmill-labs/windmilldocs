import React from 'react';

const TestimonialCard = ({ testimonialText, authorName, sourceLink }) => {
  return (
    <div className="testimonial-card">
      <p className="testimonial-text">{testimonialText}</p>
      <p className="author-name">{authorName}</p>
      <a href={sourceLink} className="source-link">Source</a>
    </div>
  );
};

export default TestimonialCard;
