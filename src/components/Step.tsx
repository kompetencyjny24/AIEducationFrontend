import React from 'react';
import { Link } from 'react-router-dom';

interface StepProps {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  setParam: (param: string) => void;
  stepTitle: string;
  options: string[];
}

const Step: React.FC<StepProps> = ({ step, nextStep, prevStep, setParam, stepTitle, options}) => {

  return (
    <div className="p-4">
        <h2 className="text-xl mb-4">{stepTitle}</h2>
        <div>
            {
                options.map( (option) => {
                    return (
                        <button
                            onClick={() => { setParam(option); nextStep(); }}
                            className="bg-gray-700 text-white py-2 px-4 mb-2 block w-full"
                        >
                            {option}
                        </button>
                    )
                })
            }
        </div>
        {
            step > 1 ? 
            <button
                onClick={() => { prevStep(); }}
                className="bg-orange-500 text-white py-2 px-4 mt-4"
            >
                Go Back
            </button> :
            <Link
                to={"/"}
                className="bg-orange-500 text-white py-2 px-4 mt-4"
            >
                Go To Main Page
            </Link>

        }
        
    </div>
  );
};

export default Step;
