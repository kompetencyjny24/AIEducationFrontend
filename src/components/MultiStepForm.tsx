import React, { useState, useEffect } from 'react';
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import {
  PencilIcon,
  BookOpenIcon,
  AcademicCapIcon,
  PuzzlePieceIcon,
  CalculatorIcon
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
    "4": [
      "Arytmetyka: Liczby naturalne, całkowite, ułamki",
      "Arytmetyka: Działania arytmetyczne: dodawanie, odejmowanie, mnożenie, dzielenie",
      "Arytmetyka: Procenty, proporcje",
      "Geometria: Figury płaskie: kwadraty, prostokąty, trójkąty, koła",
      "Geometria: Obwody i pola figur",
      "Geometria: Podstawy brył: sześciany, prostopadłościany",
      "Podstawy algebry: Wyrażenia algebraiczne",
      "Podstawy algebry: Proste równania i nierówności"
    ],
    "5": [
      "Arytmetyka: Liczby naturalne, całkowite, ułamki",
      "Arytmetyka: Działania arytmetyczne: dodawanie, odejmowanie, mnożenie, dzielenie",
      "Arytmetyka: Procenty, proporcje",
      "Geometria: Figury płaskie: kwadraty, prostokąty, trójkąty, koła",
      "Geometria: Obwody i pola figur",
      "Geometria: Podstawy brył: sześciany, prostopadłościany",
      "Podstawy algebry: Wyrażenia algebraiczne",
      "Podstawy algebry: Proste równania i nierówności"
    ],
    "6": [
      "Arytmetyka: Liczby naturalne, całkowite, ułamki",
      "Arytmetyka: Działania arytmetyczne: dodawanie, odejmowanie, mnożenie, dzielenie",
      "Arytmetyka: Procenty, proporcje",
      "Geometria: Figury płaskie: kwadraty, prostokąty, trójkąty, koła",
      "Geometria: Obwody i pola figur",
      "Geometria: Podstawy brył: sześciany, prostopadłościany",
      "Podstawy algebry: Wyrażenia algebraiczne",
      "Podstawy algebry: Proste równania i nierówności"
    ],
    "7": [
      "Algebra: Równania i nierówności liniowe",
      "Algebra: Układy równań",
      "Algebra: Funkcje: definicje, wykresy, własności funkcji liniowych i kwadratowych",
      "Geometria: Twierdzenie Pitagorasa",
      "Geometria: Kąty i ich miary",
      "Geometria: Konstrukcje geometryczne",
      "Geometria: Figury przestrzenne: objętości i pola powierzchni brył",
      "Statystyka i prawdopodobieństwo: Podstawowe pojęcia statystyczne",
      "Statystyka i prawdopodobieństwo: Prawdopodobieństwo zdarzeń",
      "Trygonometria: Podstawy trygonometrii: kąty, sinus, cosinus, tangens"
    ],
    "8": [
      "Algebra: Równania i nierówności liniowe",
      "Algebra: Układy równań",
      "Algebra: Funkcje: definicje, wykresy, własności funkcji liniowych i kwadratowych",
      "Geometria: Twierdzenie Pitagorasa",
      "Geometria: Kąty i ich miary",
      "Geometria: Konstrukcje geometryczne",
      "Geometria: Figury przestrzenne: objętości i pola powierzchni brył",
      "Statystyka i prawdopodobieństwo: Podstawowe pojęcia statystyczne",
      "Statystyka i prawdopodobieństwo: Prawdopodobieństwo zdarzeń",
      "Trygonometria: Podstawy trygonometrii: kąty, sinus, cosinus, tangens"
    ]
  },
  "Fizyka": {
    "7": [
      "Kinematyka: Ruch prostoliniowy",
      "Kinematyka: Prędkość, przyspieszenie",
      "Dynamika: Siły i ich oddziaływania",
      "Dynamika: Zasady dynamiki Newtona",
      "Energia mechaniczna: Praca, moc, energia kinetyczna i potencjalna",
      "Grawitacja: Prawa Keplera",
      "Grawitacja: Prawo powszechnego ciążenia"
    ],
    "8": [
      "Termodynamika: Ciepło i temperatura",
      "Termodynamika: Przemiany stanów skupienia",
      "Termodynamika: Pierwsza zasada termodynamiki",
      "Elektryczność i magnetyzm: Prąd elektryczny, napięcie, opór",
      "Elektryczność i magnetyzm: Obwody elektryczne",
      "Elektryczność i magnetyzm: Pole magnetyczne",
      "Fale i optyka: Fale mechaniczne i elektromagnetyczne",
      "Fale i optyka: Odbicie, załamanie, soczewki",
      "Atom i jądro atomowe: Budowa atomu",
      "Atom i jądro atomowe: Reakcje jądrowe, promieniotwórczość"
    ]
  },
};

const gradesOptions: { [key: string]: string[] } = {
  "Matematyka": ["4", "5", "6", "7", "8"],
  "Fizyka": ["7", "8"]
};

const hobbies: string[] = [
  "Brak",
  "Sport",
  "Gotowanie",
  "Gry",
  "Sztuka",
  "Czytanie"
];

const amounts: number[] = [
  1, 
  2,
  3,
  4,
  5,
]

const stepsData = [
  { label: "Przedmiot", icon: PencilIcon, description: "Wybierz Przedmiot", options: subjects },
  { label: "Klasa", icon: AcademicCapIcon, description: "Wybierz Klasę", options: [] }, // Options to be updated dynamically
  { label: "Temat", icon: BookOpenIcon, description: "Wybierz Temat", options: [] }, // Options to be updated dynamically
  { label: "Hobby", icon: PuzzlePieceIcon, description: "Wybierz Hobby", options: hobbies },
  { label: "Liczba Zadań", icon: CalculatorIcon, description: "Wybierz liczbę zadań", options: amounts }
];

export type FINAL_PARAM = {
  subject: string,
  topic: string,
  grade: string,
  hobby: string,
  taskAmount: number,
}

const MultiStepForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [grade, setGrade] = useState('');
  const [hobby, setHobby] = useState('Brak');
  const [taskAmount, setTaskAmount] = useState('3');

  const navigate = useNavigate();

  useEffect(() => {
    if (activeStep === 2) {
      setTopic('');
    }
  }, [subject, grade, activeStep]);

  const steps = stepsData.map(step => ({
    ...step,
    options: step.label === "Klasa" ? (subject ? gradesOptions[subject] : []) : step.label === "Temat" ? (subject && grade ? topics[subject][grade] : []) : step.options,
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
      case "Liczba Zadań":
        return taskAmount;
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
      case "Liczba Zadań":
        return setTaskAmount;
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
      taskAmount: Number.parseInt(taskAmount),
    }
    navigate('/review_prompt', { state: params });
  };

  return (
    <div className="w-full">

      <div className="w-full flex justify-center items-center py-8">
        <Link to="/">
          <div className="text-4xl text-cyan-600 font-medium leading-6">

            <span className="text-indigo-600 font-bold text-5xl">
              AI
            </span>

            task

          </div>
        </Link>
      </div>

      <div className='mt-10'>

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

        <div className="mt-32 px-24 py-4">
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

        <div className="mt-16 flex justify-between">
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

    </div>
  );
};

export default MultiStepForm;
