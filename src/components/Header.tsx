import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";

import Logo from "../assets/logo_wo_bg.png"

export const MUI_ERROR = {
  placeholder: undefined,
  onPointerEnterCapture: undefined,
  onPointerLeaveCapture: undefined
};

interface HeaderProps {
  generate?: boolean;
}

const Header: React.FC<HeaderProps> = ({ generate = false }) => {
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

      {generate && (
        <Link to="/prepare_prompt">
          <Button variant="outlined" {...MUI_ERROR}>
            Generuj
          </Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
