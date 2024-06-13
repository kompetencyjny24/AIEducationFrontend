import { useLocation, useNavigate } from "react-router-dom";
import { FINAL_PARAM } from "./MultiStepForm";
import { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import Header, { MUI_ERROR } from "./Header";
import { TextField } from "@mui/material";
import { TaskWithRedefinedPrompt } from "../pages/Final";

const ReviewPrompt: React.FC<{}> = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const params: FINAL_PARAM = location.state;
    const [values, setValues] = useState<FINAL_PARAM>(params);
    console.log(values);
    const [text, setText] = useState(`Wygeneruj mi treść ${values.taskAmount} ${values.taskAmount === 1 ? "zadania otwartego" : "zadań otwartych"} z przedmiotu ${values.subject} z działu "${values.topic}". ${values.hobby === "Brak" ? "" : `Nawiąż treścią zadania do hobby o tematyce ${values.hobby}.`} Weź pod uwagę że uczeń jest w ${values.grade} klasie podstawowej.`);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    return (
        <div className="overflow-hidden p-0 min-h-dvh">
            <div className="max-w-4xl mx-auto my-10">

                <Header />

                <Typography variant="h4" className="mb-4" {...MUI_ERROR}>
                    Wygenerowany Prompt ...
                </Typography>

                <div className="p-4">
                    <TextField
                        fullWidth
                        multiline
                        rows={10}
                        value={text}
                        onChange={handleTextChange}
                        disabled={!isEditing}
                        variant="outlined"
                        className="mb-4"
                    />
                    <div className="flex space-x-4 mt-2">
                        <Button onClick={handleEditClick} {...MUI_ERROR}>
                            {isEditing ? 'Zapisz' : 'Edytuj'}
                        </Button>
                        <Button disabled={isEditing} {...MUI_ERROR} onClick={() => {
                            //przekierowujemy z całym tekstem do generuj i wysyłamy zapytanie do api
                            const params: TaskWithRedefinedPrompt = {
                                taskParams: values,
                                redefinedPrompt: text
                            }
                              navigate('/generated_tasks', { state: params });
                        }}>
                            Generuj
                        </Button>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default ReviewPrompt;