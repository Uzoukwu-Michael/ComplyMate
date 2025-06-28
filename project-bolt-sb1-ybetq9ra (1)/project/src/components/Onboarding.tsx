import React, { useState } from 'react';
import { ChevronRight, Check, Briefcase, User, Target } from 'lucide-react';
import { User as UserType } from '../types';
import { industries } from '../data/mockData';

interface OnboardingProps {
  onComplete: (userData: Partial<UserType>) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    industry: '',
    businessName: '',
    clientTypes: [] as string[]
  });

  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete({
        name: userData.name,
        email: userData.email,
        industry: userData.industry,
        id: '1',
        createdAt: new Date().toISOString(),
        subscription: 'free',
        trialEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return userData.name && userData.email;
      case 2:
        return userData.industry;
      case 3:
        return userData.clientTypes.length > 0;
      default:
        return false;
    }
  };

  const clientTypeOptions = [
    'Small businesses',
    'Startups',
    'Large corporations',
    'International clients',
    'Government agencies',
    'Non-profits',
    'Other freelancers'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm font-medium text-blue-600">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">CM</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to ComplyMate</h1>
          <p className="text-gray-600">Let's set up your compliance dashboard</p>
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <User className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Tell us about yourself</h2>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Name (Optional)</label>
                <input
                  type="text"
                  value={userData.businessName}
                  onChange={(e) => setUserData({ ...userData, businessName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Your business or freelance name"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">What's your industry?</h2>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                This helps us provide relevant contract templates and compliance requirements.
              </p>
              
              <div className="grid grid-cols-1 gap-3">
                {industries.map((industry) => (
                  <button
                    key={industry.id}
                    onClick={() => setUserData({ ...userData, industry: industry.id })}
                    className={`p-4 border rounded-lg text-left transition-all hover:border-blue-300 ${
                      userData.industry === industry.id
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{industry.name}</span>
                      {userData.industry === industry.id && (
                        <Check className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Who are your typical clients?</h2>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Select all that apply. This helps us customize your compliance requirements.
              </p>
              
              <div className="grid grid-cols-1 gap-3">
                {clientTypeOptions.map((clientType) => (
                  <button
                    key={clientType}
                    onClick={() => {
                      const isSelected = userData.clientTypes.includes(clientType);
                      if (isSelected) {
                        setUserData({
                          ...userData,
                          clientTypes: userData.clientTypes.filter(t => t !== clientType)
                        });
                      } else {
                        setUserData({
                          ...userData,
                          clientTypes: [...userData.clientTypes, clientType]
                        });
                      }
                    }}
                    className={`p-4 border rounded-lg text-left transition-all hover:border-blue-300 ${
                      userData.clientTypes.includes(clientType)
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{clientType}</span>
                      {userData.clientTypes.includes(clientType) && (
                        <Check className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
              isStepValid()
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>{currentStep === totalSteps ? 'Get Started' : 'Next'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}