import { fetchUser } from "@/app/lib/data";
import { UserFetch } from "@/app/lib/definitions";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icon } from "@iconify/react";
export default async function Account() {
  const user: UserFetch = await fetchUser();
  return (
    <div className="w-full flex gap-7 mt-6  lg:flex-row  flex-col items-center lg:items-stretch">
      <Card className="w-full max-w-[700px] overflow-hidden ">
        <div className=" relative">
          <img
            src="/background-profile.png"
            alt="Profile Background"
            className="w-full max-h-[300px] "
          />
        </div>
        <CardHeader className="relative flex items-center justify-center ">
          <div className="top-[-64px] absolute size-32">
            <img
              className="rounded-full border-4 border-white"
              src="/perfil.png"
              alt="Profile photo"
            />
            <div className="absolute bottom-1 right-1 bg-gray-50 rounded-full p-1 hover:bg-gray-200 hover:cursor-pointer">
              <Icon className="text-gray-500 size-5" icon="bxs:camera" />
            </div>
          </div>
          <CardTitle className="pt-[40px]">{user.role_name}</CardTitle>
          <CardDescription>@{user.user_name}</CardDescription>
        </CardHeader>
      </Card>

      <Tabs
        defaultValue="account"
        className="w-full  max-w-[700px]  flex flex-col"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card className="overflow-x-auto ">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Role</Label>
                <p
                  id="name"
                  className="cursor-default lg:w-full px-3 py-2 border rounded-md shadow-xs text-gray-700
                  bg-gray-50 focus:ring-2 focus:ring-blue-500 min-w-[250px] w-full"
                >
                  {user.role_name}
                </p>
              </div>
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <p
                  className="cursor-default lg:w-full  px-3 py-2 border rounded-md shadow-xs text-gray-700
                bg-gray-50 focus:ring-2 focus:ring-blue-500 min-w-[250px] w-full"
                >
                  {`${user.person_name} ${user.lastname}`}
                </p>
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <p
                  className="cursor-default lg:w-full  px-3 py-2 border rounded-md shadow-xs text-gray-700
                bg-gray-50 focus:ring-2 focus:ring-blue-500 min-w-[250px] w-full"
                >
                  {user.user_name}
                </p>
              </div>
              <div className="space-y-1">
                <Label htmlFor="dni">DNI</Label>
                <p
                  className="cursor-default lg:w-full  px-3 py-2 border rounded-md shadow-xs text-gray-700
                bg-gray-50 focus:ring-2 focus:ring-blue-500 min-w-[250px] w-full"
                >
                  {user.dni}
                </p>
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <div className="relative flex items-center group">
                  <p
                    className="cursor-default lg:w-full px-3 py-2 border rounded-md shadow-xs text-gray-700
                  bg-gray-50 focus:ring-2 focus:ring-blue-500 min-w-[250px] w-full
"
                  >
                    {user.email}
                  </p>
                  <Icon
                    className="absolute right-2 opacity-0 group-hover:opacity-100 group-hover:cursor-pointer transition-opacity duration-200"
                    icon="tabler:edit"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
