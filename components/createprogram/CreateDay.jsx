import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectGroup,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CardTitle, Card } from "@/components/ui/card";

const CreateDay = ({ dayNum }) => {
  return (
    <div className="gap-2">
      <Card className="p-2 w-full flex flex-col gap-2 border-2 border-blue-500">
        <CardTitle>
          <Input className="bg-transparent" defaultValue={`Day ${dayNum}`} />
        </CardTitle>
        <div>
          <Label className="px-1 text-gray-600 font-bold text-xl">
            Exercise details
          </Label>
          <CreateExercise exeNum={1} />
        </div>
        <div>
          <button className="flex p-2 bg-green-500 text-white rounded">
            Add Exercise
          </button>
        </div>
        <button className="bg-red-500 hover:bg-red-600 rounded flex items-center justify-center h-full text-white font-bold py-2 mt-5">
          Delete
        </button>
      </Card>
    </div>
  );
};

const CreateExercise = ({ exeNum }) => {
  return (
    <Card className="p-2 border-2 border-slate-500 my-3">
      <Label className="px-1">Exercise {exeNum}</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select exercise" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="run">Run</SelectItem>
            <SelectItem value="swim">Swim</SelectItem>
            <SelectItem value="lift">Lift</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="p-2">
        <div className="flex items-center">
          <Label className="px-1">Set-1:</Label>
          <Label className="px-1">Kgs:</Label>
          <Input className="bg-transparent" />
          <Label className="px-1">Reps:</Label>
          <Input className="bg-transparent" />
        </div>
        <div className="mt-2">
          <button className="p-2 bg-slate-100 rounded hover:bg-slate-200">
            Add set
          </button>
        </div>
      </div>
    </Card>
  );
};

export default CreateDay;
