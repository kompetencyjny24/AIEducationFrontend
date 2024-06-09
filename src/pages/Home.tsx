import { Link } from "react-router-dom";

import { Button, Chip } from "@material-tailwind/react";

import Header from "../components/Header";

import Teacher from "../assets/main_page_teacher.jpg"

export const MUI_ERROR = {
  placeholder: undefined,
  onPointerEnterCapture: undefined,
  onPointerLeaveCapture: undefined
};

const Home = () => {
  return (
    <div className="w-screen h-fit flex justify-center">

      <div className="w-full max-w-[1200px]">

        <Header />

        <div className="w-full h-fit mt-8">

          <div className="relative h-fit w-full bg-[#131650] rounded-3xl">

            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_2px,transparent_2px),linear-gradient(to_bottom,#4f4f4f2e_2px,transparent_2px)] bg-[size:24px_24px] rounded-3xl"/>

            <div className="relative w-full h-fit p-16 flex text-white">

              <div className="flex-1 flex flex-col justify-center gap-2">

                <div className="flex">

                  <Chip size="lg" variant="outlined" value="24/7 AI" color="yellow" 
                  className="w-fit py-4 px-6 rounded-full border-2 text-md" />

                </div>
                
                <div className="mt-3 text-5xl font-medium max-w-[480px]">
                  Masz już dość układania zadań samodzielnie na każdą klasówkę?
                </div>

                <div className="text-lg">
                  Wygenerujemy je za Ciebie, dla Ciebie!
                </div>

                <Link
                to="/generate"
                className="mt-6">
                  
                  <Button variant="filled" size="lg" color="teal" {...MUI_ERROR}>
                    Generuj zadanie
                  </Button>

                </Link>

              </div>

              <div className="flex-1 flex justify-center relative my-8">

                <div className="absolute top-0 left-1/5 transform translate-x-4 -translate-y-4 rotate-3 bg-pink-300 w-4/5 h-full rounded-2xl z-0" />
                
                <img 
                src={Teacher}
                className="rounded-2xl w-4/5 relative z-10"/>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Home;