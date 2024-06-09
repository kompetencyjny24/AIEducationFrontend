import { Link } from "react-router-dom";

import { Button } from "@material-tailwind/react";

export const MUI_ERROR = {
  placeholder: undefined,
  onPointerEnterCapture: undefined,
  onPointerLeaveCapture: undefined
};

const Header = () => {
  return (
    <div className="w-full flex justify-between items-center py-8">

      <div className="text-3xl text-cyan-600 font-medium leading-6">
        simple
        <br/>
        <span className="text-indigo-600">test</span>
      </div>

      <Link
      to="/generate">
        <Button variant="outlined" {...MUI_ERROR}>
          Generuj
        </Button>
      </Link>

    </div>
  )
}

export default Header;