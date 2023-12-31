"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import checkAuth from "@/hooks/checkAuth";
import getWorkOut from "@/hooks/getWorkOut";
import { Loading, GeneralDisplay } from "@/components/GeneralComponents";
import Link from "next/link";
import { secondsToHMS } from "@/lib/utils";

import { useRouter } from "next/navigation";

import { doc, collection, addDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseSetup";

export default function Home() {
  const { user } = checkAuth();
  const { toast } = useToast();
  const router = useRouter();
  const {
    thisWorkOut,
    loading,
    currentWorkoutTemplate,
    userDoc,
    previousWorkOut,
  } = getWorkOut(user);

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [workStartTime, setWorkStartTime] = useState(null);

  const startWorkOut = () => {
    setIsRunning(true);
    setWorkStartTime(Date.now());
  };

  const stopAndSubmit = async () => {
    setIsRunning(false);

    if (time < 10) {
      alert("Workout time too short");
      return;
    }

    const workoutData = {
      user: user.uid,
      timeStarted: workStartTime,
      timeEnded: Date.now(),
      timeTakenInSeconds: time,
      date: new Date().toISOString(),
      dayIndex: userDoc.currentWorkoutTemplateIndex,
      workOutTemplate: currentWorkoutTemplate,
      exercises:
        thisWorkOut.data.programData[userDoc.currentWorkoutTemplateIndex],
    };

    const nextWorkOutIndex =
      thisWorkOut.data.programData.length - 1 ===
      userDoc.currentWorkoutTemplateIndex
        ? 0
        : userDoc.currentWorkoutTemplateIndex + 1;

    try {
      const resRef = await addDoc(collection(db, "workoutLogs"), workoutData);
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        currentWorkoutTemplateIndex: nextWorkOutIndex,
        lastLoggedWorkout: resRef.id,
      });
      toast({
        title: "Success",
        description: "Workout Done!",
      });
      setTime(0);
      setTimeout(() => {
        router.push(`/workout-success?time=${time}`);
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to submit workout",
      });
      console.log(error);
    }
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
        <div className="w-full flex flex-col items-center gap-6">
          <span className="text-2xl font-semibold text-gray-800">
            No workout program found
          </span>
          <Link
            href="/create-program"
            className="px-6 py-3 rounded-full bg-blue-500 text-white font-bold text-center hover:bg-blue-600 transition duration-300 shadow-md"
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
            {previousWorkOut && (
              <div className="mb-4">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full border-2 px-2 rounded"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      Previous workout - {previousWorkOut.exercises.dayName}
                    </AccordionTrigger>
                    <AccordionContent className="p-3">
                      {previousWorkOut.exercises.exercises.map(
                        (exercise, index) => {
                          return (
                            <div
                              className="w-full flex flex-col gap-3 mb-3"
                              key={index}
                            >
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
                        }
                      )}
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
                    <Button
                      className={`bg-green-500 hover:bg-green-600 text-white`}
                      onClick={startWorkOut}
                    >
                      Start workout
                    </Button>
                  ) : (
                    <Button
                      className={`bg-red-500 hover:bg-red-600 text-white`}
                      onClick={stopAndSubmit}
                    >
                      Stop workout
                    </Button>
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
