"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
  const { thisWorkOut, loading, currentWorkoutTemplate } = getWorkOut(user);
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
