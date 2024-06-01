import BG from "../assets/BG";

const Home = () => {
  return (
    <div className="w-screen">
      
      <div className="static flex items-center justify-center h-full bg-black max-w-[1920px]">
        <div className="absolute">
          <BG />
        </div>
        <div className="absolute inset-0 bg-black opacity-50 h-full"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold text-white">INNOVATE</h1>
          <button className="mt-8 px-8 py-4 bg-orange-500 text-white text-xl font-bold rounded-full">START</button>
        </div>
      </div>

    </div>
  );
};

export default Home;