"use client";

import checkAuth from "@/hooks/checkAuth";

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { CardContent, Card } from "@/components/ui/card";

const page = () => {
  const { user } = checkAuth();

  return (
    <>
      <div className="flex justify-center dark:bg-gray-800">
        <div className="mt-24">
          <Card className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
            <CardContent className="p-6 space-y-4">
              <Avatar className="mx-auto h-24 w-24">
                <AvatarImage alt="User avatar" src={user.photoURL} />
                <AvatarFallback>NA</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {user.displayName}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default page;
