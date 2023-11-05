"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import checkAuth from "@/hooks/checkAuth";
import getWorkOut from "@/hooks/getWorkOut";
import { GeneralDisplay, Loading } from "@/components/GeneralComponents";
import { Label } from "@radix-ui/react-dropdown-menu";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseSetup";
import Link from "next/link";

const YourProgram = () => {
  const { user } = checkAuth();
  const { toast } = useToast();
  const { loading, dataExists, error, allTemplates, currentWorkoutTemplate } =
    getWorkOut(user);
  const [currentTemplate, setCurrentTemplate] = useState("");
  if (loading) return <Loading />;
  if (error)
    return (
      <GeneralDisplay>
        <div className="flex flex-col gap-3">
          {error}
          {error === "No programs found" && (
            <Link
              href={`/create-program`}
              className="p-2 rounded bg-blue-500 text-white font-bold text-center"
            >
              Create a program
            </Link>
          )}
        </div>
      </GeneralDisplay>
    );
  if (!dataExists || allTemplates.length === 0) {
    return <GeneralDisplay>No data</GeneralDisplay>;
  }

  const updateCurrentTemplate = async (id) => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        currentWorkoutTemplate: id,
        currentWorkoutTemplateIndex: 0,
        lastLoggedWorkout: "",
      });
      toast({
        title: "Done!",
        description: "successfully set active program, refreshing page",
      });
      setTimeout(() => {
        window.location.reload(true);
      }, 1000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error setting active program",
      });
      console.log(error);
    }
  };

  return (
    <div className="py-4 w-full">
      <div className="bg-white flex justify-between items-center  mx-auto container">
        <Card
          className={`w-full ${
            currentTemplate === currentWorkoutTemplate
              ? "border-green-500 border-2"
              : ""
          }`}
        >
          <CardHeader>
            <CardTitle>View your programs</CardTitle>
          </CardHeader>
          <CardContent>
            <Label>Program select</Label>
            <select
              className="w-full p-2 rounded bg-white ring-1 ring-black"
              onChange={(e) => setCurrentTemplate(e.target.value)}
              value={currentTemplate}
            >
              {allTemplates.map((template, index) => {
                return (
                  <option key={index} value={template.id}>
                    {template.data.programName}
                    {template.id === currentWorkoutTemplate ? " - Current" : ""}
                  </option>
                );
              })}
            </select>
            <div className="w-full">
              {allTemplates.map((template, index) => {
                if (!currentTemplate)
                  setCurrentTemplate(currentWorkoutTemplate);
                if (template.id === currentTemplate) {
                  return (
                    <div
                      key={index}
                      className="flex flex-col my-5 gap-4 justify-between items-center"
                    >
                      {template.id !== currentWorkoutTemplate && (
                        <button
                          className="bg-green-500 p-2 rounded text-white w-full"
                          onClick={() => updateCurrentTemplate(template.id)}
                        >
                          set current
                        </button>
                      )}
                      {template.data.programData.map((day, index) => {
                        return (
                          <Card className="w-full" key={index}>
                            <CardHeader>
                              <CardTitle>{day.dayName}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex flex-col gap-4">
                                {day.exercises.map((exercise, index) => {
                                  return (
                                    <div
                                      className="flex flex-col gap-2 border-2 border-black p-2 rounded"
                                      key={index}
                                    >
                                      <h2 className="text-xl font-bold">
                                        {exercise.exerciseName}
                                      </h2>
                                      <div>
                                        {exercise.sets.map((set, index) => {
                                          return (
                                            <div className="flex  gap-2">
                                              <Label>set-{index + 1}:</Label>
                                              <div className="flex gap-2">
                                                <h3>Reps:</h3>
                                                <p>{set.reps}</p>
                                              </div>
                                              <div className="flex gap-2">
                                                <h3>Weight:</h3>
                                                <p>{set.weight} kgs</p>
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  );
                }
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default YourProgram;
