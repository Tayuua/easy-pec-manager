
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

  // Calcul du délai moyen de traitement par mutuelle
  const processingTimeData = requests?.reduce((acc, request) => {
    if (request.validatedAt && request.createdAt && (request.status === 'validated' || request.status === 'rejected')) {
      const mutuelle = request.mutuelle || 'Non spécifiée';
      const processingTime = (new Date(request.validatedAt).getTime() - new Date(request.createdAt).getTime()) / (1000 * 3600); // en heures
      
      if (!acc[mutuelle]) {
        acc[mutuelle] = { total: 0, count: 0 };
      }
      acc[mutuelle].total += processingTime;
      acc[mutuelle].count += 1;
    }
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  const averageProcessingTimeData = Object.entries(processingTimeData || {}).map(([mutuelle, data]) => ({
    name: mutuelle,
    heures: Math.round(data.total / data.count)
  }));

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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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

        {/* Délai moyen de traitement */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Délai moyen de traitement</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="w-full aspect-[4/3]" config={{}}>
              <BarChart data={averageProcessingTimeData}>
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Heures', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="heures" fill="#8884d8" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default StatsPage;
