import React, { useEffect, useState } from "react";
import MultiStepForm, { MUI_ERROR } from "../components/MultiStepForm";
import { Button, Spinner, Typography } from "@material-tailwind/react";

interface FinalProps {
    subject: string,
    topic: string,
    grade: string,
    hobby: string,
}

interface Task {
    taskQuestion: string,
    hint_1: string,
    hint_2: string,
    result: string,
}

const Final: React.FC<FinalProps> = ({ subject, topic, grade, hobby }) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState<Task[]>([]);
    const [showHint1, setShowHint1] = useState<number | null>(null);
    const [showHint2, setShowHint2] = useState<number | null>(null);
    const [showResult, setShowResult] = useState<number | null>(null);

    useEffect(() => {
        setLoading(true);
        if (subject === '' || topic === '' || grade === '' || hobby === '') {
            //error
            setLoading(false);
            return;
        }
        const fetchData = async () => {
            try {
                // Simulate API call
                const response = await new Promise<Task[]>(resolve => {
                    setTimeout(() => {
                        resolve([
                            { taskQuestion: 'What is 2+2?', hint_1: 'It is more than 3', hint_2: 'It is less than 5', result: '4' },
                            { taskQuestion: 'What is the capital of France?', hint_1: 'It starts with P', hint_2: 'It is known for the Eiffel Tower', result: 'Paris' },
                        ]);
                    }, 1000);
                });
                setData(response);
            } catch (err) {
                setError('Failed to fetch tasks');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="bg-[#EDDCD2] overflow-hidden p-0 min-h-dvh flex items-center justify-center">
                <div className="text-center">
                    <Spinner className="h-12 w-12" {...MUI_ERROR} />
                    <Typography variant="h6" {...MUI_ERROR}>
                        Generating
                    </Typography>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-[#EDDCD2] overflow-hidden p-0 min-h-dvh flex items-center justify-center">
                <Typography variant="h6" color="red" {...MUI_ERROR}>
                    {error}
                </Typography>
            </div>
        );
    }

    return (
        <div className="bg-[#EDDCD2] overflow-hidden p-0 min-h-dvh flex flex-col items-center justify-center">
            <div className="text-center w-full max-w-lg p-4">
                {data.map((task, index) => (
                    <div key={index} className="mb-4 p-4 border rounded-lg bg-white shadow-md">
                        <Typography variant="h6" {...MUI_ERROR}>{task.taskQuestion}</Typography>
                        <div className="mt-4">
                            {showHint1 === index && <Typography className="text-gray-700" {...MUI_ERROR}>{task.hint_1}</Typography>}
                            <Button className="mt-2" onClick={() => setShowHint1(index)} {...MUI_ERROR}>Show Hint 1</Button>
                        </div>
                        <div className="mt-4">
                            {showHint2 === index && <Typography className="text-gray-700" {...MUI_ERROR}>{task.hint_2}</Typography>}
                            <Button className="mt-2" onClick={() => setShowHint2(index)} {...MUI_ERROR}>Show Hint 2</Button>
                        </div>
                        <div className="mt-4">
                            {showResult === index && <Typography className="text-gray-700" {...MUI_ERROR}>{task.result}</Typography>}
                            <Button className="mt-2" onClick={() => setShowResult(index)} {...MUI_ERROR}>Show Result</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Final;
