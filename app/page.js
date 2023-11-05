"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import checkAuth from "@/hooks/checkAuth";

export default function Home() {
  const { user } = checkAuth();
  return (
    <div className="py-4 w-full">
      <div className="flex justify-between items-center mx-auto container">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Workout Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className="text-2xl py-2 w-full text-center">
              Current program: Gains
            </h1>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
