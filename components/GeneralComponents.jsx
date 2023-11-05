import { Card } from "./ui/card";

const GeneralDisplay = ({ children }) => {
  return (
    <div className="py-4 w-full">
      <div className="bg-white flex justify-between items-center  mx-auto container">
        <Card className="w-full p-2">{children}</Card>
      </div>
    </div>
  );
};

const Loading = () => {
  return (
    <div className="py-4 w-full">
      <div className="bg-white flex justify-between items-center  mx-auto container">
        <Card className="w-full p-2">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export { GeneralDisplay, Loading };
