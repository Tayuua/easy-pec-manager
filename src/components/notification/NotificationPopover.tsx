
import { ReactNode } from "react";
import { useNotifications, useMarkAsRead, useMarkAllAsRead } from "@/services/notificationService";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Check, AlertCircle, Clock, Bell } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { NotificationList } from "./NotificationList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

interface NotificationPopoverProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NotificationPopover = ({ children, open, onOpenChange }: NotificationPopoverProps) => {
  const { data: notifications = [], isLoading } = useNotifications();
  const markAllAsReadMutation = useMarkAllAsRead();
  
  const statusNotifications = notifications.filter(n => n.category === "request_status");
  const expirationNotifications = notifications.filter(n => n.category === "expiration");
  const anomalyNotifications = notifications.filter(n => n.category === "anomaly");
  
  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };
  
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0" align="end">
        <div className="p-4 pb-0">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Notifications</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleMarkAllAsRead}
              disabled={markAllAsReadMutation.isPending || notifications.every(n => n.read)}
            >
              <Check className="mr-2 h-4 w-4" />
              Tout marquer comme lu
            </Button>
          </div>
          <Separator className="my-2" />
        </div>
        
        <Tabs defaultValue="all" className="px-1">
          <div className="px-3">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">
                <Bell className="mr-2 h-4 w-4" />
                Toutes
              </TabsTrigger>
              <TabsTrigger value="status" className="flex-1">
                <Check className="mr-2 h-4 w-4" />
                Statuts
              </TabsTrigger>
              <TabsTrigger value="expiration" className="flex-1">
                <Clock className="mr-2 h-4 w-4" />
                Expirations
              </TabsTrigger>
              <TabsTrigger value="anomaly" className="flex-1">
                <AlertCircle className="mr-2 h-4 w-4" />
                Anomalies
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <ScrollArea className="h-[300px] px-3">
              <NotificationList notifications={notifications} />
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="status" className="mt-0">
            <ScrollArea className="h-[300px] px-3">
              <NotificationList notifications={statusNotifications} />
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="expiration" className="mt-0">
            <ScrollArea className="h-[300px] px-3">
              <NotificationList notifications={expirationNotifications} />
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="anomaly" className="mt-0">
            <ScrollArea className="h-[300px] px-3">
              <NotificationList notifications={anomalyNotifications} />
            </ScrollArea>
          </TabsContent>
        </Tabs>
        
        <div className="p-2 text-center border-t">
          <Link 
            to="/notifications"
            className="text-sm text-muted-foreground hover:text-foreground"
            onClick={() => onOpenChange(false)}
          >
            Voir toutes les notifications
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopover;
