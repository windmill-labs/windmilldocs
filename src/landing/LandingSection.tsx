import React from 'react';
import EnterpriseFeatures from './EnterpriseFeatures';
import TestimonialCard from '../components/TestimonialCard';
import testimonials from '../data/testimonials.json';

export default function LandingSection() {
  return (
    <div>
      <EnterpriseFeatures />
      <section>
        <h2>Testimonials</h2>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            text={testimonial.text}
            source={testimonial.source}
          />
        ))}
      </section>
    </div>
  );
}
