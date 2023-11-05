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
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import CreateDay from "@/components/createprogram/CreateDay";
import { uuidv4 } from "@/lib/utils";

import checkAuth from "@/hooks/checkAuth";
import { db } from "@/firebase/firebaseSetup";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";

import { useObservable, observer } from "@legendapp/state/react";

const CreateProgram = observer(() => {
  const { toast } = useToast();
  const { user } = checkAuth();
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

  const handleDeleteDay = (index) => {
    const Days = programData.get();
    const dayVal = Days.filter((_, i) => i !== index);
    programData.set(dayVal);
  };

  const validateProgram = () => {
    if (programName.trim() === "") {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a program name!",
        action: <ToastAction altText="Retry">Retry</ToastAction>,
      });
      return false;
    }
    if (programData.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please add atleast one day!",
        action: <ToastAction altText="Retry">Retry</ToastAction>,
      });
      return false;
    }
    for (let i = 0; i < programData.length; i++) {
      if (programData[i].exercises.length === 0) {
        toast({
          variant: "destructive",
          title: "Error",
          description: `Please add atleast one exercise to day ${i + 1}!`,
          action: <ToastAction altText="Retry">Retry</ToastAction>,
        });
        return false;
      }
      if (programData[i].dayName.trim() === "") {
        toast({
          variant: "destructive",
          title: "Error",
          description: `Please enter a name for day ${i + 1}!`,
          action: <ToastAction altText="Retry">Retry</ToastAction>,
        });
        return false;
      }
      for (let j = 0; j < programData[i].exercises.length; j++) {
        if (programData[i].exercises[j].exerciseName.trim() === "") {
          toast({
            variant: "destructive",
            title: "Error",
            description: `Please enter a name for exercise ${j + 1} in day ${
              i + 1
            }!`,
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          });
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateProgram()) return;
    const program = {
      programName: programName,
      programData: programData.get(),
      user: user.uid,
      creationDate: new Date().toISOString(),
      modificationDate: new Date().toISOString(),
    };

    try {
      if (!user) throw new Error("User not found!");
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) throw new Error("User not found!");

      const programRef = await addDoc(
        collection(db, "workoutTemplates"),
        program
      );
      if (!userDocSnap.data().currentWorkoutTemplate) {
        await updateDoc(userDocRef, {
          currentWorkoutTemplate: programRef.id,
          currentWorkoutTemplateIndex: 0,
          lastLoggedWorkout: "",
        });
      }
      toast({
        title: "Success",
        description: "Program created successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
        action: <ToastAction altText="Retry">Retry</ToastAction>,
      });
      return;
    }
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
                {programData.map((day, dayIndex) => {
                  return (
                    <CreateDay
                      dayNum={dayIndex + 1}
                      day={day}
                      handleDeleteDay={handleDeleteDay}
                    />
                  );
                })}
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
            <Button className="w-full" onClick={handleSubmit}>
              Create Program
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
});

export default CreateProgram;
