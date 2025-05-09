import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import './SuggestionForm.css';

const SuggestionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    suggestion: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY } = import.meta.env;

    try {
      const response = await emailjs.send(
        VITE_EMAILJS_SERVICE_ID,
        VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          suggestion: formData.suggestion,
        },
        VITE_EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        // Use a more user-friendly success message
        const successMessage = `Thank you ${formData.name}! Your suggestion has been received.`;
        alert(successMessage);
        // Reset form
        setFormData({ name: '', email: '', suggestion: '' });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      // More detailed error message
      alert('Unable to send your suggestion. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="suggestion-container">
      <div className="suggestion-header">
        <h2>Help Us Improve</h2>
        <p>Your feedback is valuable to us. Share your suggestions to help make CryptoTrack better!</p>
      </div>

      <form onSubmit={handleSubmit} className="suggestion-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="suggestion">Your Suggestion</label>
          <textarea
            id="suggestion"
            name="suggestion"
            value={formData.suggestion}
            onChange={handleChange}
            required
            placeholder="Share your ideas for improvement..."
            rows={4}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Suggestion'}
        </button>
      </form>

      <div className="github-link-container">
        <a
          href="https://github.com/thegoofy-dev/crpytoTrack"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          <FaGithub className="github-icon" />
          <span>Visit our GitHub Repository</span>
        </a>
      </div>
    </div>
  );
};

export default SuggestionForm;