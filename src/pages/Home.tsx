import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Input, Button, Chip } from "@material-tailwind/react";
import publiAxios from "../hooks/publiAxios";

import Header from "../components/Header";

import Teacher from "../assets/main_page_teacher.jpg"

export const MUI_ERROR = {
  placeholder: undefined,
  onPointerEnterCapture: undefined,
  onPointerLeaveCapture: undefined
};

const Home = () => {
  const navigate = useNavigate();

  const [taskCount, setTaskCount] = useState(0);

  const [taskId, setTaskId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
        publiAxios.get('/task/generated-amount')
        .then(response => {
            setTaskCount(response.data)
        }).catch(error => {
            console.log(error);
        });
    };

    fetchData();
  }, []);

  return (
    <div className="w-screen h-fit flex justify-center">

      <div className="w-full max-w-[1200px]">

        <Header generate={ true } />

        <div className="w-full h-fit mt-8">

          <div className="relative h-fit w-full bg-[#131650] rounded-3xl">

            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_2px,transparent_2px),linear-gradient(to_bottom,#4f4f4f2e_2px,transparent_2px)] bg-[size:24px_24px] rounded-3xl"/>

            <div className="relative w-full h-fit px-16 py-8 flex text-white">

              <div className="flex-1 flex flex-col justify-center gap-2">

                <div className="flex">

                  <Chip size="lg" variant="outlined" value="24/7 AI" color="yellow" 
                  className="w-fit py-4 px-6 rounded-full border-2 text-md" />

                </div>
                
                <div className="mt-3 text-5xl font-medium max-w-[480px]">
                  Masz już dość układania zadań samodzielnie na każdą klasówkę?
                </div>

                <div className="text-lg">
                  Wygenerujemy je dla Ciebie!
                </div>

                <Link
                to="/prepare_prompt"
                className="mt-6">
                  
                  <Button variant="filled" size="lg" color="teal" {...MUI_ERROR}
                  className="py-4 px-6 text-md">
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

        <div className="w-full flex flex-col justify-center items-center mt-12">

          <div className="font-medium text-5xl">

            Tyle zadań już wygenerowaliśmy

          </div>

          <Chip size="lg" value={taskCount} color="amber" 
          className="w-fit py-4 px-8 rounded-full border-2 text-4xl mt-7" />

        </div>

        <div className="relative flex w-full max-w-[24rem]">
          <Input
            label="ID Zestawu Zadań"
            value={taskId}
            onChange={({ target }) => setTaskId(target.value)}
            className="pr-20"
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

      </div>

    </div>
  );
};

export default Home;