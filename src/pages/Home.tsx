import { Link } from "react-router-dom";

import ImageBG from "../assets/HomeBG.png";

const Home = () => {
  return (
    <div className="w-[calc(100dvh)] md:w-screen flex flex-col items-center bg-black">
      
      <div className="max-h-[1280px] min-h-[500px] w-full bg-black flex justify-center">

        <div className="relative w-full max-w-[1920px] flex items-center justify-center">

          <img src={ImageBG} className="absolute left-0 top-0 h-full w-full object-cover" />
          
          <div className="absolute inset-0 bg-black opacity-50 h-full" />

          <div className="flex flex-col justify-center items-center z-10 text-center">

            <h1 className="md:text-[200px] text-[96px] font-black text-white">
              NAZWA
            </h1>

            <Link
            to="/generate" 
            className="mt-8 px-8 py-4 bg-orange-500 text-white text-xl font-bold rounded-full">
              START
            </Link>

          </div>

        </div>

      </div>

      <div className="bg-[#EDDCD2] w-[calc(100dvh)] md:w-screen flex justify-center">

        <div className="flex items-center w-full h-[500px] max-w-[1000px]">
          <div className="text-start text-black max-w-[600px]">
            <p className="text-md font-medium">
              Revolutionize
            </p>
            <h1 className="text-5xl font-bold pt-10">
              Vanish into a world where task creation becomes too easy—it’s unsettling.
            </h1>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Home;