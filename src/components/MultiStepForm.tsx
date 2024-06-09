import React, { useState, useEffect } from 'react';
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
  "Matematyka",
  "Fizyka",
];

const topics: { [key: string]: { [key: string]: string[] } } = {
  "Matematyka": {
    "6 klasa podstawówki": ["Algebra 6", "Geometria 6"],
    "7 klasa podstawówki": ["Algebra 7", "Geometria 7"],
    "8 klasa podstawówki": ["Algebra 8", "Geometria 8"]
  },
  "Fizyka": {
    "6 klasa podstawówki": ["Termodynamika 6", "Optyka 6"],
    "7 klasa podstawówki": ["Termodynamika 7", "Optyka 7"],
    "8 klasa podstawówki": ["Termodynamika 8", "Optyka 8"]
  },
};

const grades: string[] = [
  "6 klasa podstawówki",
  "7 klasa podstawówki",
  "8 klasa podstawówki"
];

const hobbies: string[] = [
  "Brak",
  "Sport",
  "Gotowanie",
  "Gry",
  "Sztuka",
  "Czytanie"
];

const stepsData = [
  { label: "Przedmiot", icon: PencilIcon, description: "Wybierz Przedmiot", options: subjects },
  { label: "Klasa", icon: AcademicCapIcon, description: "Wybierz Klasę", options: grades },
  { label: "Temat", icon: BookOpenIcon, description: "Wybierz Temat", options: [] }, // Options to be updated dynamically
  { label: "Hobby", icon: PuzzlePieceIcon, description: "Wybierz Hobby", options: hobbies }
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
  const [hobby, setHobby] = useState('Brak'); // Default value set to "Brak"

  const navigate = useNavigate();

  useEffect(() => {
    // Reset topic if subject or grade changes
    if (activeStep === 2) {
      setTopic('');
    }
  }, [subject, grade, activeStep]);

  const steps = stepsData.map(step => ({
    ...step,
    options: step.label === "Temat" ? (subject && grade ? topics[subject][grade] : []) : step.options,
    value: getValue(step.label),
    setValue: getSetValueFunction(step.label)
  }));

  function getValue(label: string) {
    switch (label) {
      case "Przedmiot":
        return subject;
      case "Temat":
        return topic;
      case "Klasa":
        return grade;
      case "Hobby":
        return hobby;
      default:
        return '';
    }
  }

  function getSetValueFunction(label: string) {
    switch (label) {
      case "Przedmiot":
        return setSubject;
      case "Temat":
        return setTopic;
      case "Klasa":
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
      alert(`Wybierz ${steps[activeStep].label.toLowerCase()} żeby kontynuować`);
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
          <option value="">Wybierz {steps[activeStep].label.toLowerCase()}</option>
          {steps[activeStep].options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="mt-32 flex justify-between">
        <Button onClick={handlePrev} disabled={activeStep === 0} {...MUI_ERROR}>
          Poprzedni
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button onClick={handleGenerate} disabled={!steps[activeStep].value} {...MUI_ERROR}>
            Generuj
          </Button>
        ) : (
          <Button onClick={handleNext} disabled={!steps[activeStep].value} {...MUI_ERROR}>
            Następny
          </Button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
