
import { useEffect, useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useRequests } from "@/services/pecRequestService";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const StatsPage = () => {
  const { data: requests } = useRequests();
  const [selectedShop, setSelectedShop] = useState<string>("all");
  const [period, setPeriod] = useState<string>("all");

  const statusData = [
    { name: "En attente", value: requests?.filter(r => r.status === "pending").length || 0 },
    { name: "Validée", value: requests?.filter(r => r.status === "validated").length || 0 },
    { name: "Refusée", value: requests?.filter(r => r.status === "rejected").length || 0 },
  ];

  const acceptanceRateData = [
    { 
      name: "Global", 
      acceptés: (requests?.filter(r => r.status === "validated").length || 0), 
      refusés: (requests?.filter(r => r.status === "rejected").length || 0)
    }
  ];

  return (
    <PageContainer 
      title="Statistiques" 
      subtitle="Tableau de bord analytique des demandes de PEC"
    >
      <div className="mb-6 flex flex-wrap gap-4">
        <Select value={selectedShop} onValueChange={setSelectedShop}>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Sélectionner un laboratoire" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les laboratoires</SelectItem>
            <SelectItem value="lab1">Laboratoire 1</SelectItem>
            <SelectItem value="lab2">Laboratoire 2</SelectItem>
          </SelectContent>
        </Select>

        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toute la période</SelectItem>
            <SelectItem value="week">Cette semaine</SelectItem>
            <SelectItem value="month">Ce mois</SelectItem>
            <SelectItem value="year">Cette année</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Statuts des demandes */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Statuts des demandes</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="w-full aspect-[4/3]" config={{}}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Taux d'acceptation */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Taux d'acceptation</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="w-full aspect-[4/3]" config={{}}>
              <BarChart data={acceptanceRateData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="acceptés" fill="#4ade80" />
                <Bar dataKey="refusés" fill="#f87171" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default StatsPage;
