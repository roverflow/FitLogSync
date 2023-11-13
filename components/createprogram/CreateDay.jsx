import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CardTitle, Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

import { observer } from "@legendapp/state/react";

import { exerciseList } from "@/constants/exerciseList";

const CreateDay = observer(({ dayNum, day, handleDeleteDay }) => {
  const { toast } = useToast();

  const handleAddExercise = () => {
    const exerciseLen = day.exercises.get().length;
    const lastExercise = day.exercises[exerciseLen - 1].get();

    if (
      !lastExercise ||
      (lastExercise &&
        lastExercise.exerciseName &&
        lastExercise.sets.length > 0)
    ) {
      day.exercises.set((prev) => [
        ...prev,
        {
          exerciseName: "Sqauts",
          sets: [
            {
              weight: 10,
              reps: 10,
            },
          ],
        },
      ]);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please add a preivous exercise first!",
      });
      return;
    }
  };

  const handleDeleteExercise = (index) => {
    const newExercises = day.exercises.get();
    const newExercise = newExercises.filter((_, i) => i !== index);
    day.exercises.set(newExercise);
  };

  return (
    <div className="gap-4">
      <Card className="p-4 w-full flex flex-col gap-4 border-2 border-blue-300 rounded-lg shadow-md bg-white">
        <CardTitle>
          <Input
            className="bg-transparent text-2xl font-extrabold focus:outline-none text-blue-500"
            defaultValue={`Day ${dayNum}`}
            onChange={(e) => {
              day.dayName.set(e.target.value);
            }}
          />
        </CardTitle>
        <div>
          <Label className="text-gray-600 font-bold text-lg">
            Exercise Details
          </Label>
          {day.exercises.map((exercise, index) => (
            <CreateExercise
              key={index}
              exeNum={index + 1}
              exercise={exercise}
              handleDeleteExercise={handleDeleteExercise}
            />
          ))}
        </div>
        <div className="flex">
          <button
            className="flex items-center p-3 bg-green-500 text-white rounded-md cursor-pointer hover:bg-green-600 transition duration-300"
            onClick={handleAddExercise}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-5 w-5 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Exercise
          </button>
        </div>
        {dayNum > 1 && (
          <button
            className="bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center h-10 text-white font-bold mt-5 transition duration-300"
            onClick={() => handleDeleteDay(dayNum - 1)}
          >
            Delete
          </button>
        )}
      </Card>
    </div>
  );
});

const CreateExercise = observer(
  ({ exeNum, exercise, handleDeleteExercise }) => {
    const handleAddSet = () => {
      exercise.sets.set((prev) => [
        ...prev,
        {
          weight: 10,
          reps: 10,
        },
      ]);
    };

    const handleDeleteSet = (index) => {
      const newSets = exercise.sets.get();
      const newSet = newSets.filter((_, i) => i !== index);
      exercise.sets.set(newSet);
    };

    return (
      <Card className="p-4 border-2 border-slate-500 my-3">
        <div className="flex flex-col w-full">
          <Label className="mb-2 text-lg font-semibold">
            Exercise {exeNum}
          </Label>
          <select
            className="p-2 rounded m-1 ring-1 bg-white"
            value={exercise.exerciseName.get()}
            onChange={(e) => exercise.exerciseName.set(e.target.value)}
          >
            {exerciseList.map((exe) => (
              <option key={exe.data.name} value={exe.data.name}>
                {exe.data.name}
              </option>
            ))}
          </select>
        </div>
        <div className="p-4">
          {exercise.sets.get().map((setVal, index) => (
            <div
              key={index}
              className="flex items-center py-2 border-b border-slate-300"
            >
              <Label className="whitespace-nowrap mr-2">Set-{index + 1}:</Label>
              <div className="flex items-center space-x-2">
                <Label className="whitespace-nowrap">Kg:</Label>
                <Input
                  type="number"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  className="bg-transparent border-b-2 focus:outline-none focus:border-blue-500"
                  placeholder={setVal.weight}
                  onChange={(e) =>
                    exercise.sets[index].weight.set(Number(e.target.value))
                  }
                />
                <Label className="whitespace-nowrap ml-2">Rep:</Label>
                <Input
                  className="bg-transparent border-b-2 focus:outline-none focus:border-blue-500"
                  placeholder={setVal.reps}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  type="number"
                  onChange={(e) =>
                    exercise.sets[index].reps.set(Number(e.target.value))
                  }
                />
                {index !== 0 && (
                  <button
                    className="px-2 ml-2 bg-red-500 rounded text-white"
                    onClick={() => handleDeleteSet(index)}
                  >
                    x
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="mt-4 flex gap-4">
            <button
              className="p-2 bg-slate-100 rounded hover:bg-slate-200 text-slate-800 focus:outline-none"
              onClick={handleAddSet}
            >
              Add Set
            </button>
            <button
              className="p-2 bg-red-500 rounded text-white focus:outline-none"
              onClick={() => handleDeleteExercise(exeNum - 1)}
            >
              Delete Exercise
            </button>
          </div>
        </div>
      </Card>
    );
  }
);

export default CreateDay;
