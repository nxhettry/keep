import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataView from "./data-view";
import AddNew from "./add-new";

const Home = async () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Tabs defaultValue="account" className="w-[400px] bg-white shadow-sm p-4 rounded-lg">
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
