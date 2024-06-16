import React, { useEffect, useState, useRef } from "react";
import { Accordion, AccordionHeader, AccordionBody, Button, Spinner, Typography, Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { MUI_ERROR } from "../components/MultiStepForm";
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
    content: string;
    hints: [string, string];
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

const FinalWithUuid: React.FC<{}> = () => {
    const [loading, setLoading] = useState(true);
    const [taskSetId, setTaskSetId] = useState(-1);
    const [data, setData] = useState<Task[]>([]);
    const [open, setOpen] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
    const [editedTask, setEditedTask] = useState<{ [key: string]: string }>({});
    const textAreaRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({});

    const navigate = useNavigate();
    const { uuid } = useParams<{ uuid: string }>();

    useEffect(() => {
      const fetchData = async () => {
        await axios.get(`http://localhost:8080/api/v1/task/${uuid}`)
        .then( response => {
          const fetchedTasks = response.data.generatedTasks.map((task: any) => ({
            id: task.id,
            content: task.content,
            hints: task.hints,
            answer: task.answer
          }));

          setData(fetchedTasks);
          setTaskSetId(response.data.id);
        }).catch(error => {
          console.error(error.message);
          navigate('/');
        }).finally(() => {
          setLoading(false);
        });
      };

      fetchData();
    }, [uuid]);

    const handleOpen = (index: number) => {
        setOpen(open === index ? null : index);
    };

    const handleEditClick = async (key: string) => {
        const [index, field] = key.split('-');
        const taskIndex = parseInt(index);
        const fieldName = field as keyof Task;

        setIsEditing({ ...isEditing, [key]: !isEditing[key] });

        if (isEditing[key]) {
            const newData = [...data];

            if (fieldName.startsWith("hint_")) {
                const hintIndex = parseInt(field.split('_')[1]);
                newData[taskIndex].hints[hintIndex] = editedTask[key];
            } else if (fieldName === "answer") {
                newData[taskIndex].answer = editedTask[key];
            }
            else if (fieldName === "content") {
                newData[taskIndex].content = editedTask[key];
            }

            setData(newData);

            await axios.put('http://localhost:8080/api/v1/task', newData, 
                {
                    params: { uuid: taskSetId }
                }).then(response => {
                    
                    const updatedTasks = response.data.generatedTasks.map((task: any) => ({
                        id: task.id,
                        content: task.content,
                        hints: task.hints,
                        answer: task.answer
                    }));

                    setData(updatedTasks);
                    setTaskSetId(response.data.id);
                }).catch(error => {
                    console.log(error);
                });
        } else {
            if (field.startsWith("hint_")) {
                const hintIndex = parseInt(field.split('_')[1]);
                setEditedTask({ ...editedTask, [key]: data[taskIndex].hints[hintIndex] });
            } else if (fieldName === "answer") {
                setEditedTask({ ...editedTask, [key]: data[taskIndex].answer });
            }
            else if (fieldName === "content") {
                setEditedTask({ ...editedTask, [key]: data[taskIndex].content });
            }
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
                    responseType: 'blob',
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

                    {loading ? (
                        <div>
                            <Typography variant="h3" {...MUI_ERROR}>
                                Ładujemy zadania dla Ciebie!
                            </Typography>
                        </div>
                    ) : (
                        <div>
                            <Typography variant="h3" {...MUI_ERROR}>
                                Wygenerowane zadania wraz z podpowiedziami
                            </Typography>
                        </div>
                    )}

                    {loading && (
                        <div className="overflow-hidden p-0 flex items-center justify-center">
                            <Spinner className="h-12 w-12" {...MUI_ERROR} />
                        </div>
                    )}

                    {!loading &&
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
                                                ref={(el) => (textAreaRefs.current[`${index}-hint_0`] = el)}
                                                className={clsx(
                                                    "w-full p-2 border rounded resize-none focus:outline-none focus:border-blue-500",
                                                    {
                                                        "border-gray-400": !isEditing[`${index}-hint_0`],
                                                        "border-blue-500": isEditing[`${index}-hint_0`]
                                                    }
                                                )}
                                                rows={3}
                                                value={isEditing[`${index}-hint_0`] ? editedTask[`${index}-hint_0`] : task.hints[0]}
                                                onChange={(e) => handleTaskChange(`${index}-hint_0`, e.target.value)}
                                                disabled={!isEditing[`${index}-hint_0`]}
                                                style={{ color: 'black', height: 'auto' }}
                                            />
                                            <div className="flex space-x-4 mt-2">
                                                <Button size="sm" onClick={() => handleEditClick(`${index}-hint_0`)} {...MUI_ERROR}>
                                                    {isEditing[`${index}-hint_0`] ? 'Zapisz' : 'Edytuj pierwszą podpowiedź'}
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
                                                ref={(el) => (textAreaRefs.current[`${index}-hint_1`] = el)}
                                                className={clsx(
                                                    "w-full p-2 border rounded resize-none focus:outline-none focus:border-blue-500",
                                                    {
                                                        "border-gray-400": !isEditing[`${index}-hint_1`],
                                                        "border-blue-500": isEditing[`${index}-hint_1`]
                                                    }
                                                )}
                                                rows={3}
                                                value={isEditing[`${index}-hint_1`] ? editedTask[`${index}-hint_1`] : task.hints[1]}
                                                onChange={(e) => handleTaskChange(`${index}-hint_1`, e.target.value)}
                                                disabled={!isEditing[`${index}-hint_1`]}
                                                style={{ color: 'black', height: 'auto' }}
                                            />
                                            <div className="flex space-x-4 mt-2">
                                                <Button size="sm" onClick={() => handleEditClick(`${index}-hint_1`)} {...MUI_ERROR}>
                                                    {isEditing[`${index}-hint_1`] ? 'Zapisz' : 'Edytuj drugą podpowiedź'}
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
                        ))}

                    <div className="flex justify-between mb-24">

                        {!loading && (
                            <Button onClick={() => navigate('/prepare_prompt')} {...MUI_ERROR}>
                                Zacznij od nowa!
                            </Button>
                        )}

                        {taskSetId !== -1 && !loading && (
                            <Popover placement="bottom" {...MUI_ERROR}>
                                <PopoverHandler {...MUI_ERROR}>
                                    <Button {...MUI_ERROR}>Eksportuj do PDF</Button>
                                </PopoverHandler>

                                <PopoverContent className="flex justify-center items-center p-4 gap-4" {...MUI_ERROR}>
                                    <Button variant="gradient" className="flex-shrink-0" onClick={() => exportPDF(true)} {...MUI_ERROR}>
                                        Zadania
                                    </Button>

                                    <Button variant="gradient" className="flex-shrink-0" onClick={() => exportPDF(false)} {...MUI_ERROR}>
                                        Odpowiedzi
                                    </Button>
                                </PopoverContent>
                            </Popover>
                        )}

                    </div>

                </div>

            </div>
            
        </div>
    );
};

export default FinalWithUuid;
