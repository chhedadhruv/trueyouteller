import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { buildMeta } from '../utils/seo';
import '../styles/FeedbackPage.css';

export const meta = () =>
  buildMeta({
    title: "Feedback - TrueYouTeller",
    description: "Share your feedback about TrueYouTeller. Help us improve and make our free personality test and quizzes even better!",
    path: '/feedback',
  });

const FeedbackPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_FEEDBACK_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className="feedback-container container section">
      <div className="feedback-content">
        <h1 className="page-title">We'd Love Your Feedback!</h1>
        <p>
          Your opinion matters to us! Please share your thoughts about TrueYouTeller and how we can make it even better.
        </p>
        <form ref={form} className="feedback-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters"
                }
              })}
              placeholder="Your name"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="error-message">{errors.name.message}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address"
                }
              })}
              placeholder="your@email.com"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="rating">Overall Rating</label>
            <select 
              id="rating" 
              name="rating" 
              {...register("rating", {
                required: "Please select a rating"
              })}
              disabled={isSubmitting}
            >
              <option value="">Select a rating</option>
              <option value="5">⭐⭐⭐⭐⭐ Excellent (5/5)</option>
              <option value="4">⭐⭐⭐⭐☆ Very Good (4/5)</option>
              <option value="3">⭐⭐⭐☆☆ Good (3/5)</option>
              <option value="2">⭐⭐☆☆☆ Fair (2/5)</option>
              <option value="1">⭐☆☆☆☆ Poor (1/5)</option>
            </select>
            {errors.rating && (
              <p className="error-message">{errors.rating.message}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="feedback">Your Feedback</label>
            <textarea 
              id="feedback" 
              name="feedback" 
              rows="6" 
              {...register("feedback", {
                required: "Feedback is required",
                minLength: {
                  value: 10,
                  message: "Feedback must be at least 10 characters"
                }
              })}
              placeholder="Tell us what you loved, what we could improve, or any suggestions you have..."
              disabled={isSubmitting}
            ></textarea>
            {errors.feedback && (
              <p className="error-message">{errors.feedback.message}</p>
            )}
          </div>
          
          {submitStatus === 'success' && (
            <div className="status-message success">
              Thank you for your feedback! Your input helps us improve TrueYouTeller.
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="status-message error">
              Sorry, there was an error submitting your feedback. Please try again.
            </div>
          )}
          
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage; 