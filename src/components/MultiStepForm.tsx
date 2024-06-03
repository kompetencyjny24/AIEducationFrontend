import React, { useState } from 'react';
import GenerateValue from './StepFinal';
import Step from './Step';

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [grade, setGrade] = useState('');
  const [hobby, setHobby] = useState('');

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const subjects: string[] = [
    "Math",
    "Physic",
    "Biology"
  ];

  const topics: string[] = [
    "Math",
    "Physic",
    "Biology"
  ];

  const grades: string[] = [
    "Math",
    "Physic",
    "Biology"
  ];

  const hobbies: string[] = [
    "Sport",
    "Cookking",
    "Games",
    "Art",
    "Reading"
  ];

  return (
    <div className="max-w-md mx-auto my-10">
      {step === 1 && <Step step={step} nextStep={nextStep} prevStep={prevStep} setParam={setSubject} stepTitle='Pick your subject' options={subjects} />}
      {step === 2 && <Step step={step} nextStep={nextStep} prevStep={prevStep} setParam={setTopic} stepTitle='Pick your topic' options={topics} />}
      {step === 3 && <Step step={step} nextStep={nextStep} prevStep={prevStep} setParam={setGrade} stepTitle='Choose your school grade' options={grades} />}
      {step === 4 && <Step step={step} nextStep={nextStep} prevStep={prevStep} setParam={setHobby} stepTitle='Pick your hobby' options={hobbies} />}
      {step === 5 && <GenerateValue subject={subject} topic={topic} grade={grade} hobby={hobby}/>}
    </div>
  );
};

export default MultiStepForm;
