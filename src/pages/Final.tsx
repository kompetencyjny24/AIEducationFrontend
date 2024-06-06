import React, { useEffect, useState } from "react";
import { Accordion, AccordionHeader, AccordionBody, Button, Spinner, Typography } from "@material-tailwind/react";
import MultiStepForm, { FINAL_PARAM, MUI_ERROR } from "../components/MultiStepForm";
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface FinalProps {
    subject: string;
    topic: string;
    grade: string;
    hobby: string;
}

interface Task {
    taskQuestion: string;
    hint_1: string;
    hint_2: string;
    result: string;
}

interface IconProps {
    id: number;
    open: number | null;
}

const Icon: React.FC<IconProps> = ({ id, open }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    );
};

const Final: React.FC<{}> = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState<Task[]>([]);
    const [open, setOpen] = useState<number | null>(null);

    const navigate = useNavigate();
    const location = useLocation();
    const params: FINAL_PARAM = location.state;
    console.log(params);


    useEffect(() => {
        setLoading(true);
        if (params.subject === '' || params.topic === '' || params.grade === '' || params.hobby === '') {
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

    const handleOpen = (index: number) => {
        setOpen(open === index ? null : index);
    };

    return (

        <div className="bg-[#EDDCD2] overflow-hidden p-0 min-h-dvh">
            <div className="max-w-4xl mx-auto my-10">
                <div className="text-center w-full max-w-xlg p-4 justify-center">
                    <Typography variant="h3" {...MUI_ERROR}>
                        Wygenerowane zadania wraz z podpowiedziami
                    </Typography>
                    <Button className="mb-2" onClick={() => { console.log('download') }} {...MUI_ERROR}>
                        Export to PDF
                    </Button>

                    {
                        loading && <div className="bg-[#EDDCD2] overflow-hidden p-0 min-h-dvh flex items-center justify-center">
                            <div className="text-center">
                                <Spinner className="h-12 w-12" {...MUI_ERROR} />
                                <Typography variant="h6" {...MUI_ERROR}>
                                    Generating
                                </Typography>
                            </div>
                        </div>
                    }
                    {
                        error !== '' &&
                        <Typography variant="h6" color="red" {...MUI_ERROR}>
                            {error}
                        </Typography>
                    }
                    {
                        (!loading && error === '') &&
                        data.map((task, index) => (
                            <div key={index} className="mb-4 p-4 border rounded-lg bg-white shadow-md">
                                <Typography variant="h6" {...MUI_ERROR}>{task.taskQuestion}</Typography>
                                <Accordion open={open === index} icon={<Icon id={index} open={open} />} {...MUI_ERROR}>
                                    <AccordionHeader onClick={() => handleOpen(index)} {...MUI_ERROR}>Show Hint 1</AccordionHeader>
                                    <AccordionBody>
                                        <Typography className="text-gray-700" {...MUI_ERROR}>{task.hint_1}</Typography>
                                    </AccordionBody>
                                </Accordion>
                                <Accordion open={open === index + 100} icon={<Icon id={index + 100} open={open} />} {...MUI_ERROR}>
                                    <AccordionHeader onClick={() => handleOpen(index + 100)} {...MUI_ERROR}>Show Hint 2</AccordionHeader>
                                    <AccordionBody>
                                        <Typography className="text-gray-700" {...MUI_ERROR}>{task.hint_2}</Typography>
                                    </AccordionBody>
                                </Accordion>
                                <Accordion open={open === index + 200} icon={<Icon id={index + 200} open={open} />} {...MUI_ERROR}>
                                    <AccordionHeader onClick={() => handleOpen(index + 200)} {...MUI_ERROR}>Show Result</AccordionHeader>
                                    <AccordionBody>
                                        <Typography className="text-gray-700" {...MUI_ERROR}>{task.result}</Typography>
                                    </AccordionBody>
                                </Accordion>
                            </div>
                        ))
                    }
                    <Button className="mb-2" onClick={() => navigate('/generate')} {...MUI_ERROR}>
                        Generate another Tasks
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Final;
