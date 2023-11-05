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
    <div className="gap-2">
      <Card className="p-2 w-full flex flex-col gap-2 border-2 border-blue-500">
        <CardTitle>
          <Input
            className="bg-transparent"
            defaultValue={`Day ${dayNum}`}
            onChange={(e) => {
              day.dayName.set(e.target.value);
            }}
          />
        </CardTitle>
        <div>
          <Label className="px-1 text-gray-600 font-bold text-xl">
            Exercise details
          </Label>
          {day.exercises.map((exercise, index) => {
            return (
              <CreateExercise
                exeNum={index + 1}
                exercise={exercise}
                handleDeleteExercise={handleDeleteExercise}
              />
            );
          })}
        </div>
        <div className="flex">
          <div
            className="flex p-2 bg-green-500 text-white rounded cursor-pointer"
            onClick={handleAddExercise}
          >
            Add Exercise
          </div>
        </div>
        {dayNum > 1 && (
          <button
            className="bg-red-500 hover:bg-red-600 rounded flex items-center justify-center h-full text-white font-bold py-2 mt-5"
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
      <Card className="p-2 border-2 border-slate-500 my-3">
        <div className="flex w-full flex-col">
          <Label className="px-1">Exercise {exeNum}</Label>
          <select
            className="p-2 rounded m-1 ring-1 bg-white"
            value={exercise.exerciseName.get()}
            onChange={(e) => exercise.exerciseName.set(e.target.value)}
          >
            {exerciseList.map((exe) => {
              return <option value={exe.data.name}>{exe.data.name}</option>;
            })}
          </select>
        </div>
        <div className="p-2">
          {exercise.sets.get().map((setVal, index) => {
            return (
              <>
                <div className="flex items-center py-1">
                  <Label className="px-1">Set-{index + 1}:</Label>
                  <Label className="px-1">Kg:</Label>
                  <Input
                    type="number"
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    className="bg-transparent"
                    defaultValue={setVal.weight}
                    value={setVal.weight}
                    onChange={(e) =>
                      exercise.sets[index].weight.set(Number(e.target.value))
                    }
                  />
                  <Label className="px-1">Rep:</Label>
                  <Input
                    className="bg-transparent"
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    type="number"
                    defaultValue={setVal.reps}
                    value={setVal.reps}
                    onChange={(e) =>
                      exercise.sets[index].reps.set(Number(e.target.value))
                    }
                  />
                  {index !== 0 && (
                    <button
                      className="px-2 ml-1 bg-red-500 rounded text-white"
                      onClick={() => handleDeleteSet(index)}
                    >
                      x
                    </button>
                  )}
                </div>
              </>
            );
          })}

          <div className="mt-2 flex gap-1">
            <button
              className="p-2 bg-slate-100 rounded hover:bg-slate-200 ring-1 ring-slate-300"
              onClick={handleAddSet}
            >
              Add set
            </button>
            <button
              className="p-2 bg-red-500 rounded text-white"
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
