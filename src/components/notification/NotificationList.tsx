
import { useMarkAsRead, useDeleteNotification } from "@/services/notificationService";
import { Notification } from "@/types";
import { format, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Check, Trash2, Bell, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NotificationListProps {
  notifications: Notification[];
}

export const NotificationList = ({ notifications }: NotificationListProps) => {
  const markAsReadMutation = useMarkAsRead();
  const deleteMutation = useDeleteNotification();
  const navigate = useNavigate();
  
  const handleMarkAsRead = (id: string) => {
    markAsReadMutation.mutate(id);
  };
  
  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };
  
  const handleNavigate = (notification: Notification) => {
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
      handleMarkAsRead(notification.id);
    }
  };

  const getNotificationIcon = (notification: Notification) => {
    switch (notification.type) {
      case "success":
        return <Check className="h-5 w-5 text-green-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "info":
      default:
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  if (notifications.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        <Bell className="mx-auto h-8 w-8 opacity-20 mb-2" />
        <p>Aucune notification</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 py-2">
      {notifications.map((notification) => (
        <div 
          key={notification.id}
          onClick={() => handleNavigate(notification)}
          className={cn(
            "flex items-start gap-2 p-2 rounded-md transition-colors",
            !notification.read && "bg-muted",
            notification.actionUrl && "cursor-pointer hover:bg-muted/80"
          )}
        >
          <div className="mt-1">
            {getNotificationIcon(notification)}
          </div>
          <div className="flex-1 min-w-0">
            <p className={cn(
              "text-sm font-medium mb-0.5",
              !notification.read && "font-semibold"
            )}>
              {notification.title}
            </p>
            <p className="text-xs text-muted-foreground mb-1 line-clamp-2">
              {notification.message}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(notification.createdAt), {
                addSuffix: true,
                locale: fr
              })}
            </p>
          </div>
          <div className="flex flex-col gap-1" onClick={(e) => e.stopPropagation()}>
            {!notification.read && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => handleMarkAsRead(notification.id)}
                disabled={markAsReadMutation.isPending}
              >
                <Check className="h-3 w-3" />
                <span className="sr-only">Marquer comme lu</span>
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => handleDelete(notification.id)}
              disabled={deleteMutation.isPending}
            >
              <Trash2 className="h-3 w-3" />
              <span className="sr-only">Supprimer</span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
