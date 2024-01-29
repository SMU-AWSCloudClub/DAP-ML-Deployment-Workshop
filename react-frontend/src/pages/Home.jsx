import Three from "../components/Three";

const Home = () => {
  const modelPath = "/apartment.glb";
  
  return (
    <>
      <div className="flex items-center justify-between h-screen bg-blue-400">
        <div className="flex justify-center items-center">
          <span className="text-9xl uppercase font-black text-center">Home Page</span>
        </div>
        <div className="flex w-4/5 h-4/5 justify-center">
          <Three />
        </div>
      </div>
    </>
  );
};

export default Home;
