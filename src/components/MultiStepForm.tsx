import React, { useEffect, useState } from 'react';
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import {
  PencilIcon,
  BookOpenIcon,
  AcademicCapIcon,
  PuzzlePieceIcon
} from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import Final from '../pages/Final';

export const MUI_ERROR = {
  placeholder: undefined,
  onPointerEnterCapture: undefined,
  onPointerLeaveCapture: undefined
}

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [grade, setGrade] = useState('');
  const [hobby, setHobby] = useState('');
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [isFinalStep, setIsFinalStep] = useState(false);

  // const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  // const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  useEffect(() => {
    setIsLastStep(activeStep === steps.length - 1);
    setIsFirstStep(activeStep === 0);
  }, [activeStep]);

  const handleNext = () => {
    if (steps[activeStep].value) {
      setActiveStep((cur) => Math.min(cur + 1, steps.length - 1));
    } else {
      alert(`Please select a ${steps[activeStep].label.toLowerCase()} before proceeding.`);
    }
  };

  const handlePrev = () => setActiveStep((cur) => Math.max(cur - 1, 0));

  const handleGenerate = () => {
    setIsFinalStep(true);
  };

  if (isFinalStep) {
    return <Final subject={subject} topic={topic} grade={grade} hobby={hobby} />;
  }

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
    "None",
    "Sport",
    "Cooking",
    "Games",
    "Art",
    "Reading"
  ];

  const steps = [
    { label: "Subject", icon: PencilIcon, description: "Select Subject", options: subjects, value: subject, setValue: setSubject },
    { label: "Topic", icon: BookOpenIcon, description: "Select Topic", options: topics, value: topic, setValue: setTopic },
    { label: "Grade", icon: AcademicCapIcon, description: "Select Grade", options: grades, value: grade, setValue: setGrade },
    { label: "Hobby", icon: PuzzlePieceIcon, description: "Select Hobby", options: hobbies, value: hobby, setValue: setHobby },
  ];

  return (
    <div className="w-full px-24 py-4">
      <Stepper activeStep={activeStep} {...MUI_ERROR}>
        {steps.map((step, index) => (
          <Step key={index} onClick={() => { }} {...MUI_ERROR}>
            <step.icon className="h-5 w-5" />
            <div className="absolute -bottom-[4.5rem] w-max text-center">
              <Typography variant="h6" color={activeStep === index ? "blue-gray" : "gray"} {...MUI_ERROR}>
                {step.label}
              </Typography>
              <Typography color={activeStep === index ? "blue-gray" : "gray"} className="font-normal" {...MUI_ERROR}>
                {step.description}
              </Typography>
            </div>
          </Step>
        ))}
      </Stepper>


      <div className="mt-28">
        <select
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          value={steps[activeStep].value}
          onChange={(e) => steps[activeStep].setValue(e.target.value)}
        >
          <option value="">Select {steps[activeStep].label.toLowerCase()}</option>
          {steps[activeStep].options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>


      <div className="mt-32 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep} {...MUI_ERROR}>
          Prev
        </Button>
        {isLastStep ? (
          <Button onClick={handleGenerate} disabled={steps[activeStep].value === ''} {...MUI_ERROR}>
            Generate
          </Button>
        ) : (
          <Button onClick={handleNext} disabled={steps[activeStep].value === ''} {...MUI_ERROR}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
