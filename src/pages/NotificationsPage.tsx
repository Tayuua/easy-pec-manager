
import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  useNotifications, 
  useMarkAllAsRead,
  useCreateNotification 
} from "@/services/notificationService";
import { Check, Bell, Search, AlertCircle, Clock, RefreshCw } from "lucide-react";
import { NotificationList } from "@/components/notification/NotificationList";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const NotificationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const { data: notifications = [], isLoading, refetch } = useNotifications();
  const markAllAsReadMutation = useMarkAllAsRead();
  const createNotification = useCreateNotification();
  
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    if (filter === "unread") return matchesSearch && !notification.read;
    if (filter === "read") return matchesSearch && notification.read;
    
    return matchesSearch && notification.category === filter;
  });
  
  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };
  
  const handleTestNotification = () => {
    createNotification.mutate({
      title: "Notification test",
      message: "Ceci est une notification de test pour vérifier le système",
      type: "info",
      category: "system",
      actionUrl: "/notifications"
    });
  };
  
  return (
    <PageContainer
      title="Centre de notifications"
      subtitle="Suivez en temps réel toutes les informations importantes concernant vos demandes"
    >
      <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Carte statistiques notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Aperçu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
                <div className="text-3xl font-bold mb-1">
                  {notifications.filter(n => !n.read).length}
                </div>
                <div className="text-sm text-muted-foreground">Non lues</div>
              </div>
              <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
                <div className="text-3xl font-bold mb-1">
                  {notifications.length}
                </div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
              <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
                <div className="text-3xl font-bold mb-1 text-amber-500">
                  {notifications.filter(n => n.category === "expiration").length}
                </div>
                <div className="text-sm text-muted-foreground">Expirations</div>
              </div>
              <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
                <div className="text-3xl font-bold mb-1 text-red-500">
                  {notifications.filter(n => n.category === "anomaly").length}
                </div>
                <div className="text-sm text-muted-foreground">Anomalies</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Actions rapides */}
        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button 
              onClick={handleMarkAllAsRead} 
              disabled={markAllAsReadMutation.isPending || notifications.every(n => n.read)}
              className="w-full justify-start"
            >
              <Check className="mr-2 h-4 w-4" />
              Marquer tout comme lu
            </Button>
            <Button 
              variant="outline" 
              onClick={handleTestNotification} 
              className="w-full justify-start"
            >
              <Bell className="mr-2 h-4 w-4" />
              Tester une notification
            </Button>
            <Button 
              variant="outline" 
              onClick={() => refetch()} 
              className="w-full justify-start"
              disabled={isLoading}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Actualiser
            </Button>
          </CardContent>
        </Card>
        
        {/* Options de filtrage */}
        <Card>
          <CardHeader>
            <CardTitle>Filtres</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex space-x-2">
              <div className="flex-1">
                <Input 
                  placeholder="Rechercher..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                  prefix={<Search className="h-4 w-4" />}
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Filtrer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="unread">Non lues</SelectItem>
                  <SelectItem value="read">Lues</SelectItem>
                  <SelectItem value="request_status">Statuts</SelectItem>
                  <SelectItem value="expiration">Expirations</SelectItem>
                  <SelectItem value="anomaly">Anomalies</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Liste principale des notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications ({filteredNotifications.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">
                <Bell className="mr-2 h-4 w-4" />
                Toutes
              </TabsTrigger>
              <TabsTrigger value="status">
                <Check className="mr-2 h-4 w-4" />
                Statuts
              </TabsTrigger>
              <TabsTrigger value="expiration">
                <Clock className="mr-2 h-4 w-4" />
                Expirations
              </TabsTrigger>
              <TabsTrigger value="anomaly">
                <AlertCircle className="mr-2 h-4 w-4" />
                Anomalies
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <NotificationList notifications={filteredNotifications} />
            </TabsContent>
            <TabsContent value="status" className="mt-0">
              <NotificationList notifications={filteredNotifications.filter(n => n.category === "request_status")} />
            </TabsContent>
            <TabsContent value="expiration" className="mt-0">
              <NotificationList notifications={filteredNotifications.filter(n => n.category === "expiration")} />
            </TabsContent>
            <TabsContent value="anomaly" className="mt-0">
              <NotificationList notifications={filteredNotifications.filter(n => n.category === "anomaly")} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default NotificationsPage;
