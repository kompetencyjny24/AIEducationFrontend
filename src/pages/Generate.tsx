import { useState } from "react";
import MultiStepForm from "../components/MultiStepForm";

const Generate = () => {

  const [step, setStep] = useState<number>(1);
  const [subject, setSubject] = useState<string>('');
  const [topic, setTopic] = useState<string>('');
  const [grade, setGrade] = useState<string>('');
  const [hobby, setHobby] = useState<string>('');

  const nextStep = () => setStep(prev => prev + 1);
  const submitForm = () => {
    alert(`Subject: ${subject}, Topic: ${topic}, Grade: ${grade}`);
  };

  return (
    <div className="overflow-hidden p-0 min-h-dvh">
      <div className="max-w-4xl mx-auto">
        <MultiStepForm/>
      </div>
    </div>
  );
};

export default Generate;
