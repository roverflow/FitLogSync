"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import checkAuth from "@/hooks/checkAuth";
import getWorkOut from "@/hooks/getWorkOut";
import { Loading, GeneralDisplay } from "@/components/GeneralComponents";
import Link from "next/link";
import { secondsToHMS } from "@/lib/utils";

export default function Home() {
  const { user } = checkAuth();
  const { thisWorkOut, loading, currentWorkoutTemplate, userDoc } =
    getWorkOut(user);
  const [prevWorkout, setPrevWorkout] = useState(null);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [workStartTime, setWorkStartTime] = useState(null);
  const [workEndTime, setWorkEndTime] = useState(null);

  const startWorkOut = () => {
    setIsRunning(true);
    setWorkStartTime(Date.now());
  };

  const stopAndSubmit = () => {
    setIsRunning(false);
    setWorkEndTime(Date.now());
  };

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(time + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  // return
  if (loading) return <Loading />;
  if (thisWorkOut === null || currentWorkoutTemplate === null) {
    return (
      <GeneralDisplay>
        <div className="w-full flex flex-col gap-4">
          <span>No workout program found</span>
          <Link
            href={`/create-program`}
            className="p-2 rounded bg-blue-500 text-white font-bold text-center"
          >
            Create a program
          </Link>
        </div>
      </GeneralDisplay>
    );
  }

  return (
    <div className="py-4 w-full">
      <div className="flex justify-between items-center mx-auto container">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Workout Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className="text-2xl py-2 w-full text-center">
              Current program: {thisWorkOut.data.programName}
            </h1>
            {prevWorkout && (
              <div>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full border-2 px-2 rounded"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Previous workout</AccordionTrigger>
                    <AccordionContent>
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}
            <Card>
              <CardHeader className="w-full">
                <div className="text-xl">
                  <span className="font-bold">Todays workout:</span>{" "}
                  {
                    thisWorkOut.data.programData[
                      userDoc.currentWorkoutTemplateIndex
                    ].dayName
                  }
                </div>
              </CardHeader>
              <CardContent>
                <div className="w-full flex justify-between my-5">
                  <div className="font-bold border-2 p-1 px-3 rounded">
                    {secondsToHMS(time)}
                  </div>
                  {!isRunning ? (
                    <button
                      className={`bg-green-500 text-white font-bold p-2 rounded`}
                      onClick={startWorkOut}
                    >
                      Start workout
                    </button>
                  ) : (
                    <button
                      className={`bg-red-500 text-white font-bold p-2 rounded`}
                      onClick={stopAndSubmit}
                    >
                      Stop workout
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  {thisWorkOut.data.programData[
                    userDoc.currentWorkoutTemplateIndex
                  ].exercises.map((exercise, index) => {
                    return (
                      <div className="w-full flex flex-col gap-3" key={index}>
                        <div>
                          <CardTitle>{exercise.exerciseName}</CardTitle>
                        </div>
                        <div className="border-2 px-2 py-1 rounded">
                          {exercise.sets.map((set, index) => {
                            return (
                              <div className="flex gap-2">
                                <span>set-{index + 1}:</span>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
