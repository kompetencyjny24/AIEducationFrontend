import React, { useEffect } from 'react';

interface StepProps {
  subject: string;
  topic: string;
  grade: string;
  hobby: string
}

const GenerateValue: React.FC<StepProps> = ({subject, topic, grade, hobby}) => {
  
  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Generating exercises...</h2>
      <h2 className="text-xl mb-4">Promt with values: </h2>
      <h3 className="text-xl mb-4">{`- ${subject}`}</h3>
      <h3 className="text-xl mb-4">{`- ${topic}`}</h3>
      <h3 className="text-xl mb-4">{`- ${grade}`}</h3>
      <h3 className="text-xl mb-4">{`- ${hobby}`}</h3>
    </div>
  );
};

export default GenerateValue;
