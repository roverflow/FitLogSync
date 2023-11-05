"use client";
import { useState } from "react";
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

export default function Home() {
  const { user } = checkAuth();
  const { thisWorkOut, loading, currentWorkoutTemplate, userDoc } =
    getWorkOut(user);
  const [prevWorkout, setPrevWorkout] = useState(null);
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
                <div className="flex flex-col gap-4">
                  {thisWorkOut.data.programData[
                    userDoc.currentWorkoutTemplateIndex
                  ].exercises.map((exercise, index) => {
                    return (
                      <Card className="w-full" key={index}>
                        <CardHeader>
                          <CardTitle>{exercise.exerciseName}</CardTitle>
                        </CardHeader>
                        <CardContent>
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
                        </CardContent>
                      </Card>
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
