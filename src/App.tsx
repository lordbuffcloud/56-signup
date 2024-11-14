import React, { useState } from 'react';
import { User, Mail, Building2 } from 'lucide-react';
import { FormInput } from './components/FormInput';
import { SuccessMessage } from './components/SuccessMessage';
import { AdminLogin } from './components/AdminLogin';
import { AdminView } from './components/AdminView';
import { submitApplication } from './services/api';
import type { BoardApplication } from './services/api';

function App() {
  const [formData, setFormData] = useState<BoardApplication>({
    firstName: '',
    lastName: '',
    email: '',
    squadron: '',
    position: 'member',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Za-z0-9._%+-]+@(us\.af\.mil|mail\.mil)$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid military email address';
    }
    if (!formData.squadron) newErrors.squadron = 'Squadron is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitApplication(formData);
      if (result.success) {
        setSubmitted(true);
      } else {
        setSubmitError(result.message);
      }
    } catch (error) {
      setSubmitError('An unexpected error occurred. Please try again.');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAdminLogin = (password: string) => {
    if (password === 'l33t56') {
      setIsAdmin(true);
      setShowAdminLogin(false);
    }
  };

  if (isAdmin) {
    return <AdminView onLogout={() => setIsAdmin(false)} />;
  }

  if (submitted) {
    return <SuccessMessage onReset={() => {
      setSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        squadron: '',
        position: 'member',
      });
    }} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">
        <div className="text-center mb-8">
          <h2 
            className="text-3xl font-bold text-gray-800 cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => setShowAdminLogin(true)}
          >
            Wright Patterson 5/6
          </h2>
          <p className="text-gray-600 mt-2">October Monthly Board Members Solicitation</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            icon={<User />}
            name="firstName"
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
          />
          <FormInput
            icon={<User />}
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
          />
          <FormInput
            icon={<Mail />}
            name="email"
            type="email"
            placeholder="Military Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <FormInput
            icon={<Building2 />}
            name="squadron"
            type="text"
            placeholder="Squadron"
            value={formData.squadron}
            onChange={handleChange}
            error={errors.squadron}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Position
            </label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="member">Board Member (TSgt/SSgt)</option>
              <option value="president">Board President (TSgt)</option>
            </select>
          </div>
          {submitError && (
            <p className="text-sm text-red-600">{submitError}</p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>

      {showAdminLogin && (
        <AdminLogin 
          onLogin={handleAdminLogin}
          onCancel={() => setShowAdminLogin(false)}
        />
      )}
    </div>
  );
}

export default App;