"use client";
import { useState } from "react";
import {
  CardTitle,
  CardHeader,
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

import CreateDay from "@/components/createprogram/CreateDay";
import { uuidv4 } from "@/lib/utils";

import { useObservable, observer } from "@legendapp/state/react";

const CreateProgram = observer(() => {
  const { toast } = useToast();
  const [programName, setProgramName] = useState("");
  const programData = useObservable([
    {
      id: uuidv4(),
      dayName: `Day 1`,
      exercises: [],
    },
  ]);

  const handleAddDay = () => {
    if (programData[programData.length - 1].exercises.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please add an exercise to the previous day first!",
      });
      return;
    }

    programData.set((prev) => [
      ...prev,
      {
        id: uuidv4(),
        dayName: `Day ${prev.length + 1}`,
        exercises: [],
      },
    ]);
  };

  return (
    <div className="py-4 w-full">
      <div className="bg-white flex justify-between items-center  mx-auto container">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create a Program</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="programName">Program Name</Label>
                  <Input
                    id="programName"
                    onChange={(e) => setProgramName(e.target.value)}
                    placeholder="Enter program name"
                  />
                </div>
                {programData.map((day, dayIndex) => (
                  <CreateDay dayNum={dayIndex + 1} programData={programData} />
                ))}
              </div>
            </div>
            <div className="my-2">
              <button
                className="p-2 bg-blue-100 rounded hover:bg-blue-200"
                onClick={handleAddDay}
              >
                Add day
              </button>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              Create Program
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Toaster />
    </div>
  );
});

export default CreateProgram;
