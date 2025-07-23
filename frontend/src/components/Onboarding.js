import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';


const Onboarding = () => {

  const onboardingSteps = [
    {
      title: "Diversity of Vehicles",
      description: "Rent cars, bikes, scooters, heavy machinery, and much more, quickly and easily.",
      image: "/images/OnboardingBg/variedades.png",
    },
    {
      title: "Find the Perfect Vehicle",
      description: "Browse various categories and filter by location, dates, and vehicle type.",
      image: "/images/OnboardingBg/mapa.png",
    },
    {
      title: "Rent with Confidence",
      description: "Secure and transparent booking process, with flexible payment options.",
      image: "/images/OnboardingBg/segurança.png",
    },
    {
      title: "Start Your Journey!",
      description: "Ready to rent? Log in or create your account to begin.",
      image: "/images/OnboardingBg/jornada.png",
    },
  ];
  
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const totalSteps = onboardingSteps.length;
  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;


  const handleNext = () => {
    if (isLastStep) {
      navigate('/login');
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    navigate('/login');
  };

  const currentContent = onboardingSteps[currentStep];




  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-xl w-full max-w-2xl text-center relative z-10 mx-2 my-12 sm:my-16 md:my-20 lg:my-24">
      <img
        src={currentContent.image}
        alt="Onboarding Illustration"
        className="w-full h-48 object-cover rounded-lg mb-6 shadow-md"
      />

      <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        {currentContent.title}
      </h1>
      <p className="text-lg text-gray-700 max-w-xl mx-auto h-24 overflow-hidden">
        {currentContent.description}
      </p>

      <div className="flex gap-2 mb-4">
        {onboardingSteps.map((_, index) => (
          <span
            key={index}
            className={`block w-3 h-3 rounded-full transition-all duration-300 ${currentStep === index ? 'bg-blue-600 w-5' : 'bg-gray-300'}`}
          ></span>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row-reverse gap-4 w-full justify-center">
        {isLastStep ? (
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow hover:bg-blue-700 flex items-center justify-center gap-2 transition"
          >
            Get Started <FaArrowRight />
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow hover:bg-blue-700 flex items-center justify-center gap-2 transition"
          >
            Next <FaArrowRight />
          </button>
        )}

        {!isFirstStep && (
          <button
            onClick={handleBack}
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-bold text-lg shadow hover:bg-gray-300 flex items-center justify-center gap-2 transition"
          >
            <FaArrowLeft /> Back
          </button>
        )}
      </div>

      {!isLastStep && (
        <button
          onClick={handleSkip}
          className="mt-6 text-blue-600 font-semibold hover:underline transition"
        >
          Skip
        </button>
      )}
    </div>

  );

}
export default Onboarding;