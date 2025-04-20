"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataView from "./data-view";
import AddNew from "./add-new";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const Home = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <Image
          src="/unauthorized.svg"
          height={300}
          width={300}
          alt="unauthorized"
        />
        <div>
          <Link
            href="/"
            className="text-xl font-bold flex justify-center items-center gap-3 hover:underline"
          >
            <span>
              <FaArrowLeft />
            </span>
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Tabs
        defaultValue="account"
        className="w-[400px] bg-white shadow-sm p-4 rounded-lg"
      >
        <TabsList>
          <TabsTrigger value="account">Add new</TabsTrigger>
          <TabsTrigger value="password">View</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <AddNew />
        </TabsContent>
        <TabsContent value="password">
          <DataView />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Home;
