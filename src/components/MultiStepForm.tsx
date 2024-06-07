import React, { useState } from 'react';
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import {
  PencilIcon,
  BookOpenIcon,
  AcademicCapIcon,
  PuzzlePieceIcon
} from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';

export const MUI_ERROR = {
  placeholder: undefined,
  onPointerEnterCapture: undefined,
  onPointerLeaveCapture: undefined
};

const subjects: string[] = [
  "Math",
  "Physic",
];

const topics: { [key: string]: string[] } = {
  "Math": ["Algebra", "Calculus", "Geometry"],
  "Physic": ["Mechanics", "Thermodynamics", "Optics"],
};

const grades: string[] = [
  "6 primary school", 
  "7 primary school",
  "8 primary school"
];

const hobbies: string[] = [
  "Sport",
  "Cooking",
  "Games",
  "Art",
  "Reading"
];

const stepsData = [
  { label: "Subject", icon: PencilIcon, description: "Select Subject", options: subjects },
  { label: "Topic", icon: BookOpenIcon, description: "Select Topic", options: [] }, // Options to be updated dynamically
  { label: "Grade", icon: AcademicCapIcon, description: "Select Grade", options: grades },
  { label: "Hobby", icon: PuzzlePieceIcon, description: "Select Hobby", options: hobbies }
];

export type FINAL_PARAM = {
  subject: string,
  topic: string,
  grade: string,
  hobby: string,
}

const MultiStepForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [grade, setGrade] = useState('');
  const [hobby, setHobby] = useState('');

  const navigate = useNavigate();

  const steps = stepsData.map(step => ({
    ...step,
    options: step.label === "Topic" ? (subject ? topics[subject] : []) : step.options,
    value: getValue(step.label),
    setValue: getSetValueFunction(step.label)
  }));

  function getValue(label: string) {
    switch (label) {
      case "Subject":
        return subject;
      case "Topic":
        return topic;
      case "Grade":
        return grade;
      case "Hobby":
        return hobby;
      default:
        return '';
    }
  }

  function getSetValueFunction(label: string) {
    switch (label) {
      case "Subject":
        return setSubject;
      case "Topic":
        return setTopic;
      case "Grade":
        return setGrade;
      case "Hobby":
        return setHobby;
      default:
        return () => { };
    }
  }

  const handleNext = () => {
    if (steps[activeStep].value) {
      setActiveStep(cur => Math.min(cur + 1, steps.length - 1));
    } else {
      alert(`Please select a ${steps[activeStep].label.toLowerCase()} before proceeding.`);
    }
  };

  const handlePrev = () => setActiveStep(cur => Math.max(cur - 1, 0));

  const handleGenerate = () => {
    const params: FINAL_PARAM = {
      subject: subject,
      topic: topic,
      grade: grade,
      hobby: hobby,
    }
    navigate('/final', { state: params });
  };

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
        <Button onClick={handlePrev} disabled={activeStep === 0} {...MUI_ERROR}>
          Prev
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button onClick={handleGenerate} disabled={!steps[activeStep].value} {...MUI_ERROR}>
            Generate
          </Button>
        ) : (
          <Button onClick={handleNext} disabled={!steps[activeStep].value} {...MUI_ERROR}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
