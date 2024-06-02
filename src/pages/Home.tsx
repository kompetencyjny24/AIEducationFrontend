import { Link } from "react-router-dom";

import ImageBG from "../assets/HomeBG.png";

const Home = () => {
  return (
    <div className="content-center items-center bg-[#EDDCD2] flex flex-col gap-0 justify-start overflow-hidden p-0">

      <div className="content-center items-center bg-black flex flex-none flex-col flex-no-wrap gap-0 h-screen justify-center overflow-hidden p-24 relative w-full">

        <img src={ImageBG} className="grid flex-none h-full justify-center overflow-hidden p-0 absolute w-full object-cover z-0" />

        <div className="content-center items-center bg-black flex flex-none flex-col flex-no-wrap justify-center overflow-hidden relative w-fit px-10 z-2 rounded-3xl">

          <h1 className="md:text-[200px] text-[96px] font-black text-white">
              NAZWA
            </h1>

        </div>

        <div className="flex flex-col justify-center items-center z-10 text-center">

          <Link
          to="/generate" 
          className="mt-8 px-8 py-4 bg-orange-500 text-white md:text-3xl text-xl font-bold rounded-full">
            START
          </Link>

        </div>

      </div>

      <div className="flex justify-center w-screen py-16 px-5">

        <div className="flex items-start w-full max-w-[1000px]">

          <div className="flex flex-col gap-10 text-start text-black">

            <p className="text-lg font-medium">
              Kolejna klasówka do wymyślenia?
            </p>

            <h1 className="md:text-4xl text-3xl font-bold max-w-[600px]">
              Zamiast wymyślać wszystkie zadania na kolejną klasówkę od zera, lub korzystać z gotowców - daj nam wygenerować je dla Ciebie, za Ciebie!
            </h1>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Home;