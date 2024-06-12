import React, { useEffect, useState } from "react";
import { Accordion, AccordionHeader, AccordionBody, Button, Spinner, Typography } from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MultiStepForm, { FINAL_PARAM, MUI_ERROR } from "../components/MultiStepForm";
import publiAxios from "../hooks/publiAxios";
import { generateKey } from "crypto";

export interface TaskProps {
    subject: string;
    topic: string;
    grade: string;
    hobby: string;
}

export interface TaskWithRedefinedPrompt {
    taskParams: TaskProps;
    redefinedPrompt: string;
}

interface Task {
    id: string;
    prompt: string;
    content: string;
    hint_1: string;
    hint_2: string;
    answer: string;
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
    const params: TaskWithRedefinedPrompt = location.state;
    // console.log(params);

    useEffect(() => {
        setLoading(true);
        if (params.taskParams.subject === '' || params.taskParams.topic === '' || params.taskParams.grade === '' || params.taskParams.hobby === '' || params.redefinedPrompt === '') {
            setLoading(false);
            return;
        }
        const fetchData = async () => {
            publiAxios.post('/task', {
                "subject": "",
                "predefinedPrompt": params.redefinedPrompt,
                "subjectSection": "",
                "hobby": "",
                "grade": "",
                "taskAmount": "5"
            }).then(response => {
                console.log(response);
                const generatedTasks = response.data.generatedTasks.map((task: any) => ({
                    id: task.id,
                    prompt: response.data.prompt,
                    content: task.content,
                    hint_1: task.hints[0],
                    hint_2: task.hints[1],
                    answer: task.answer
                }));
                setData(generatedTasks);
            }).catch(error => {
                setError('Failed to fetch tasks' + error);
            }).finally(() => {
                setLoading(false);
            });
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
                                <Spinner className="h-12 w-12"  {...MUI_ERROR}/>
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
                        (!loading) && (error === '') &&
                        data.map((task, index) => (
                            <div key={index} className="mb-4 p-4 border rounded-lg bg-white shadow-md">
                                <Typography variant="h6" {...MUI_ERROR}>{task.content}</Typography>
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
                                        <Typography className="text-gray-700" {...MUI_ERROR}>{task.answer}</Typography>
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
