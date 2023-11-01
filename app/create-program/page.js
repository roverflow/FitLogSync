"use client";
import {
  CardTitle,
  CardHeader,
  CardDescription,
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import CreateDay from "@/components/createprogram/CreateDay";

const page = () => {
  return (
    <div className="py-4 w-full">
      <div className="bg-white flex justify-between items-center w-[92%] mx-auto container">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create a Program</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="programName">Program Name</Label>
                  <Input
                    id="programName"
                    placeholder="Enter program name"
                    required
                  />
                </div>
                <CreateDay dayNum={1} />
              </div>
            </form>
            <div className="my-2">
              <button className="p-2 bg-blue-100 rounded hover:bg-blue-200">
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
    </div>
  );
};

export default page;
