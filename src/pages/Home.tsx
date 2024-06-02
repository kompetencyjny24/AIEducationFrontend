import { Link } from "react-router-dom";

import ImageBG from "../assets/HomeBG.png";

const Home = () => {
  return (
    <div className="content-center items-center bg-[#EDDCD2] flex flex-col gap-0 justify-start overflow-hidden p-0">

      <div className="content-center items-center bg-black flex flex-none flex-col flex-no-wrap gap-0 h-screen justify-center overflow-hidden p-24 relative w-full">

        <img src={ImageBG} className="grid flex-none h-full justify-center overflow-hidden p-0 absolute w-full object-cover z-0" />

        <div className="content-center items-center bg-black flex flex-none flex-col flex-no-wrap justify-center overflow-hidden relative w-fit px-10 z-2 rounded-3xl">

          <h1 className="md:text-[200px] text-[64px] font-black text-white">
              NAZWA
            </h1>

        </div>

        <div className="flex flex-col justify-center items-center z-10 text-center">

          <Link
          to="/generate" 
          className="mt-8 px-8 py-4 bg-orange-500 text-white text-xl font-bold rounded-full">
            START
          </Link>

        </div>

      </div>

      <div className="flex justify-center">

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