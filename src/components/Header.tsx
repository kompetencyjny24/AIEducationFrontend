import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";

export const MUI_ERROR = {
  placeholder: undefined,
  onPointerEnterCapture: undefined,
  onPointerLeaveCapture: undefined
};

interface HeaderProps {
  generate?: boolean;
}

const Header: React.FC<HeaderProps> = ({ generate = false }) => {
  const navigate = useNavigate();
  const [taskId, setTaskId] = useState("");

  return (
    <div className="w-full flex justify-between items-center py-12 max-h-10">
      <Link to="/">
    
        <div className="text-4xl text-cyan-600 font-medium leading-6">

          <span className="text-indigo-600 font-bold text-5xl">
            AI
          </span>

          task
        
        </div>

      </Link>

      <div className='flex gap-4 items-center justify-center h-full'>

        <div className="relative flex w-full h-full max-w-[24rem] min-w-[24rem]">
          <Input
            label="Masz kod dostępu do zadań?"
            value={taskId}
            onChange={({ target }) => setTaskId(target.value)}
            className="pr-20 h-full"
            crossOrigin="anonymous"
            {...MUI_ERROR}
          />
          <Button
            size="sm"
            color={taskId ? "gray" : "blue-gray"}
            disabled={!taskId}
            className="!absolute right-1 top-1 rounded"
            {...MUI_ERROR}
            onClick={() => navigate(`/${taskId}`)}
          >
            Przejdź
          </Button>
        </div>

        <Link to="/prepare_prompt">
          <Button variant="outlined" {...MUI_ERROR}>
            Generuj
          </Button>
        </Link>

      </div>

    </div>
  );
}

export default Header;
