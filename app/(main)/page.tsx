import AppBarChart from "@/components/AppBarChart";
import AppAreaChart from "@/components/AppAreaChart";
import AppPieChart from "@/components/AppPieChart";
import CardList from "@/components/CartList";

const Page = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppBarChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <CardList />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppPieChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">test4</div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppAreaChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">test6</div>
      <div className="bg-primary-foreground p-4 rounded-lg">test7</div>
      <div className="bg-primary-foreground p-4 rounded-lg">test8</div>
      <div className="bg-primary-foreground p-4 rounded-lg">test9</div>
      <div className="bg-primary-foreground p-4 rounded-lg">test10</div>
      <div className="bg-primary-foreground p-4 rounded-lg">test11</div>
    </div>
  );
};

export default Page;
