import { Link } from "react-router-dom";

import ImageBG from "../assets/HomeBG.png";

const Home = () => {
  return (
    <div className="w-screen">
      
      <div className="static flex items-center justify-center h-full bg-black max-w-[1920px]">

        <img src={ImageBG} className="absolute w-full h-full object-cover" />
        
        <div className="absolute inset-0 bg-black opacity-50 h-full" />

        <div className="relative z-10 text-center">

          <h1 className="text-[200px] font-black text-white">
            INNOVATE
          </h1>

          <Link
          to="/generate" 
          className="mt-8 px-8 py-4 bg-orange-500 text-white text-xl font-bold rounded-full">
            START
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Home;