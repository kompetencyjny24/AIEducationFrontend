import React, { useEffect, useState, useRef } from "react";
import { Accordion, AccordionHeader, AccordionBody, Button, Spinner, Typography, Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MUI_ERROR } from "../components/MultiStepForm";
import publiAxios from "../hooks/publiAxios";
import axios from 'axios';
import clsx from 'clsx';

export interface TaskProps {
    subject: string;
    topic: string;
    grade: string;
    hobby: string;
    taskAmount: number;
}

export interface TaskWithRedefinedPrompt {
    taskParams: TaskProps;
    wasPromptEdited: boolean;
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
    const [taskSetId, setTaskSetId] = useState(-1);
    const [data, setData] = useState<Task[]>([]);
    const [open, setOpen] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
    const [editedTask, setEditedTask] = useState<{ [key: string]: string }>({});
    const textAreaRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({});

    const navigate = useNavigate();
    const location = useLocation();
    const params: TaskWithRedefinedPrompt = location.state;

    console.log(params);

    useEffect(() => {
        setLoading(true);
        if (params.taskParams.subject === '' || params.taskParams.topic === '' || params.taskParams.grade === '' || params.taskParams.hobby === '' || params.redefinedPrompt === '') {
            setLoading(false);
            return;
        }
        const fetchData = async () => {
            publiAxios.post('/task', {
                "subject": !params.wasPromptEdited ? params.taskParams.subject : "",
                "predefinedPrompt": params.wasPromptEdited ? params.redefinedPrompt : "",
                "subjectSection": !params.wasPromptEdited ? params.taskParams.topic : "",
                "hobby": !params.wasPromptEdited ? params.taskParams.hobby === "Brak" ? "" : params.taskParams.hobby : "",
                "taskAmount": !params.wasPromptEdited ? params.taskParams.taskAmount : "",
                "grade": !params.wasPromptEdited ? params.taskParams.grade : "",
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
                setTaskSetId(response.data.id);
            }).catch(error => {
                console.log(error.message);
                fetchData();
            }).finally(() => {
                setLoading(false);
            });
        };
        fetchData();
    }, []);

    const handleOpen = (index: number) => {
        setOpen(open === index ? null : index);
    };

    const handleEditClick = (key: string) => {
        setIsEditing({ ...isEditing, [key]: !isEditing[key] });
        if (!isEditing[key]) {
            const [index, field] = key.split('-');
            setEditedTask({ ...editedTask, [key]: data[parseInt(index)][field as keyof Task] });
        } else {
            const newData = [...data];
            const [index, field] = key.split('-');
            newData[parseInt(index)][field as keyof Task] = editedTask[key];
            setData(newData);
        }
    };

    const handleTaskChange = (key: string, value: string) => {
        setEditedTask({ ...editedTask, [key]: value });
        updateTextFieldRows(key);
    };

    const updateTextFieldRows = (key: string) => {
        const textarea = textAreaRefs.current[key];
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    const exportPDF = (onlyContent: boolean) => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/task/${taskSetId}/pdf`, {
                    responseType: 'blob', // Important to set the response type to blob
                    params: {
                        onlyContent: onlyContent
                    }
                });

                const blob = new Blob([response.data], { type: 'application/pdf' });

                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'Generated_Task.pdf';
                link.click();

                window.URL.revokeObjectURL(link.href);
            } catch (error) {
                console.error('Error downloading the PDF', error);
            }
        };

        fetchData();
    };

    if (!loading && !data) {
        navigate('/generate');
    }

    return (
        <div className="overflow-hidden p-0 min-h-dvh">

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

            <div className="max-w-4xl mx-auto">

                <div className="text-center w-full max-w-xlg p-4 justify-center">

                    {loading ? 
                    <div>

                        <Typography variant="h3" {...MUI_ERROR}>

                            Generujemy zadania dla Ciebie!

                        </Typography>

                    </div>
                    : 
                    <div>
                        <Typography variant="h3" {...MUI_ERROR}>

                            Wygenerowane zadania wraz z podpowiedziami

                        </Typography>
                    </div>
                    }

                    {loading && 
                        <div className="overflow-hidden p-0 flex items-center justify-center">
                            <Spinner className="h-12 w-12"  {...MUI_ERROR}/>
                        </div>
                    }

                    {(!loading) &&
                        data.map((task, index) => (
                            <div key={index} className="mb-4 p-4 border rounded-lg bg-white shadow-md">

                                <div className="p-4 flex flex-col items-end">

                                    <textarea
                                        ref={(el) => (textAreaRefs.current[`${index}-content`] = el)}
                                        className={clsx(
                                            "w-full p-2 border rounded resize-none focus:outline-none focus:border-blue-500",
                                            {
                                                "border-gray-400": !isEditing[`${index}-content`],
                                                "border-blue-500": isEditing[`${index}-content`]
                                            }
                                        )}
                                        rows={3}
                                        value={isEditing[`${index}-content`] ? editedTask[`${index}-content`] : task.content}
                                        onChange={(e) => handleTaskChange(`${index}-content`, e.target.value)}
                                        disabled={!isEditing[`${index}-content`]}
                                        style={{ color: 'black', height: 'auto' }}
                                    />

                                    <div className="flex space-x-4 mt-2">

                                        <Button size="sm" onClick={() => handleEditClick(`${index}-content`)} {...MUI_ERROR}>
                                            {isEditing[`${index}-content`] ? 'Zapisz' : 'Edytuj treść zadania'}
                                        </Button>

                                    </div>

                                </div>

                                <Accordion open={open === index} icon={<Icon id={index} open={open} />} {...MUI_ERROR}>

                                    <AccordionHeader onClick={() => handleOpen(index)} {...MUI_ERROR}>
                                        Pierwsza podpowiedź
                                    </AccordionHeader>

                                    <AccordionBody>
                                        <div className="p-4 flex flex-col items-end">
                                            <textarea
                                                ref={(el) => (textAreaRefs.current[`${index}-hint_1`] = el)}
                                                className={clsx(
                                                    "w-full p-2 border rounded resize-none focus:outline-none focus:border-blue-500",
                                                    {
                                                        "border-gray-400": !isEditing[`${index}-hint_1`],
                                                        "border-blue-500": isEditing[`${index}-hint_1`]
                                                    }
                                                )}
                                                rows={3}
                                                value={isEditing[`${index}-hint_1`] ? editedTask[`${index}-hint_1`] : task.hint_1}
                                                onChange={(e) => handleTaskChange(`${index}-hint_1`, e.target.value)}
                                                disabled={!isEditing[`${index}-hint_1`]}
                                                style={{ color: 'black', height: 'auto' }}
                                            />
                                            <div className="flex space-x-4 mt-2">
                                                <Button size="sm" onClick={() => handleEditClick(`${index}-hint_1`)} {...MUI_ERROR}>
                                                    {isEditing[`${index}-hint_1`] ? 'Zapisz' : 'Edytuj pierwszą podpowiedź'}
                                                </Button>
                                            </div>
                                        </div>
                                    </AccordionBody>

                                </Accordion>

                                <Accordion open={open === index + 100} icon={<Icon id={index + 100} open={open} />} {...MUI_ERROR}>

                                    <AccordionHeader onClick={() => handleOpen(index + 100)} {...MUI_ERROR}>
                                        Druga podpowiedź
                                    </AccordionHeader>

                                    <AccordionBody>
                                        <div className="p-4 flex flex-col items-end">
                                            <textarea
                                                ref={(el) => (textAreaRefs.current[`${index}-hint_2`] = el)}
                                                className={clsx(
                                                    "w-full p-2 border rounded resize-none focus:outline-none focus:border-blue-500",
                                                    {
                                                        "border-gray-400": !isEditing[`${index}-hint_2`],
                                                        "border-blue-500": isEditing[`${index}-hint_2`]
                                                    }
                                                )}
                                                rows={3}
                                                value={isEditing[`${index}-hint_2`] ? editedTask[`${index}-hint_2`] : task.hint_2}
                                                onChange={(e) => handleTaskChange(`${index}-hint_2`, e.target.value)}
                                                disabled={!isEditing[`${index}-hint_2`]}
                                                style={{ color: 'black', height: 'auto' }}
                                            />
                                            <div className="flex space-x-4 mt-2">
                                                <Button size="sm" onClick={() => handleEditClick(`${index}-hint_2`)} {...MUI_ERROR}>
                                                    {isEditing[`${index}-hint_2`] ? 'Zapisz' : 'Edytuj drugą podpowiedź'}
                                                </Button>
                                            </div>
                                        </div>
                                    </AccordionBody>

                                </Accordion>

                                <Accordion open={open === index + 200} icon={<Icon id={index + 200} open={open} />} {...MUI_ERROR}>

                                    <AccordionHeader onClick={() => handleOpen(index + 200)} {...MUI_ERROR}>
                                        Odpowiedź
                                    </AccordionHeader>

                                    <AccordionBody>
                                        <div className="p-4 flex flex-col items-end">
                                            <textarea
                                                ref={(el) => (textAreaRefs.current[`${index}-answer`] = el)}
                                                className={clsx(
                                                    "w-full p-2 border rounded resize-none focus:outline-none focus:border-blue-500",
                                                    {
                                                        "border-gray-400": !isEditing[`${index}-answer`],
                                                        "border-blue-500": isEditing[`${index}-answer`]
                                                    }
                                                )}
                                                rows={3}
                                                value={isEditing[`${index}-answer`] ? editedTask[`${index}-answer`] : task.answer}
                                                onChange={(e) => handleTaskChange(`${index}-answer`, e.target.value)}
                                                disabled={!isEditing[`${index}-answer`]}
                                                style={{ color: 'black', height: 'auto' }}
                                            />
                                            <div className="flex space-x-4 mt-2">
                                                <Button size="sm" onClick={() => handleEditClick(`${index}-answer`)} {...MUI_ERROR}>
                                                    {isEditing[`${index}-answer`] ? 'Zapisz' : 'Edytuj odpowiedź'}
                                                </Button>
                                            </div>
                                        </div>
                                    </AccordionBody>

                                </Accordion>

                            </div>
                        ))
                    }

                    <div className="flex justify-between mb-24">

                        {!loading && 
                            <Button onClick={() => navigate('/prepare_prompt')} {...MUI_ERROR}>

                                Zacznij od nowa!

                            </Button>
                        }

                        {taskSetId !== -1 && !loading && 
                            <Popover placement="bottom" {...MUI_ERROR}>

                                <PopoverHandler {...MUI_ERROR}>

                                    <Button {...MUI_ERROR}>
                                        Eksportuj do PDF
                                    </Button>

                                </PopoverHandler>

                                <PopoverContent className="flex justify-center items-center p-4 gap-4" {...MUI_ERROR}>

                                    <Button variant="gradient" className="flex-shrink-0" onClick={() => exportPDF(true)} {...MUI_ERROR}>
                                        Bez podpowiedzi
                                    </Button>

                                    <Button variant="gradient" className="flex-shrink-0" onClick={() => exportPDF(false)} {...MUI_ERROR}>
                                        Z podpowiedziami
                                    </Button>

                                </PopoverContent>

                            </Popover>
                        }

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Final;
