
import { Notification, NotificationType, NotificationCategory } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Sample notifications for testing
const sampleNotifications: Notification[] = [
  {
    id: "1",
    title: "Demande validée",
    message: "La demande de Jean Dupont a été validée par Harmonie Mutuelle",
    type: "success",
    category: "request_status",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    read: false,
    requestId: "1",
    actionUrl: "/requests"
  },
  {
    id: "2",
    title: "Demande refusée",
    message: "La demande de Marie Martin a été refusée par MGEN",
    type: "error",
    category: "request_status",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    read: true,
    requestId: "2",
    actionUrl: "/requests"
  },
  {
    id: "3",
    title: "Expiration imminente",
    message: "La demande de Pierre Durant expire dans 24h",
    type: "warning",
    category: "expiration",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    read: false,
    requestId: "3",
    actionUrl: "/requests"
  },
  {
    id: "4",
    title: "Anomalie détectée",
    message: "Fichier illisible dans la demande de Sophie Bernard",
    type: "warning",
    category: "anomaly",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 24 hours ago
    read: false,
    requestId: "4",
    actionUrl: "/requests"
  },
  {
    id: "5",
    title: "Refus sans motif",
    message: "La demande de Luc Petit a été refusée sans motif précisé",
    type: "error",
    category: "anomaly",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 36 hours ago
    read: false,
    requestId: "5",
    actionUrl: "/requests"
  }
];

// Get all notifications
export const getAllNotifications = async (): Promise<Notification[]> => {
  // This would be an API call in production
  return sampleNotifications.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

// Mark notification as read
export const markAsRead = async (id: string): Promise<Notification | null> => {
  // This would be an API call in production
  const notification = sampleNotifications.find(n => n.id === id);
  if (notification) {
    notification.read = true;
    return notification;
  }
  return null;
};

// Mark all notifications as read
export const markAllAsRead = async (): Promise<boolean> => {
  // This would be an API call in production
  sampleNotifications.forEach(n => n.read = true);
  return true;
};

// Create a new notification
export const createNotification = async (
  title: string,
  message: string,
  type: NotificationType,
  category: NotificationCategory,
  requestId?: string,
  actionUrl?: string
): Promise<Notification> => {
  const newNotification: Notification = {
    id: crypto.randomUUID(),
    title,
    message,
    type,
    category,
    createdAt: new Date().toISOString(),
    read: false,
    requestId,
    actionUrl
  };
  
  // In production, this would be an API call
  sampleNotifications.unshift(newNotification);
  
  // Show toast for new notifications
  toast(title, {
    description: message,
    action: {
      label: "Voir",
      onClick: () => {
        if (actionUrl) {
          window.location.href = actionUrl;
        }
      }
    }
  });
  
  return newNotification;
};

// Delete notification
export const deleteNotification = async (id: string): Promise<boolean> => {
  // This would be an API call in production
  const index = sampleNotifications.findIndex(n => n.id === id);
  if (index !== -1) {
    sampleNotifications.splice(index, 1);
    return true;
  }
  return false;
};

// React Query hooks
export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getAllNotifications,
    refetchInterval: 30000 // Refetch every 30 seconds
  });
};

export const useUnreadNotificationsCount = () => {
  const { data: notifications = [] } = useNotifications();
  return notifications.filter(n => !n.read).length;
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    }
  });
};

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    }
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => deleteNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    }
  });
};

// Utility function to create a notification and update the cache
export const useCreateNotification = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (params: {
      title: string,
      message: string,
      type: NotificationType,
      category: NotificationCategory,
      requestId?: string,
      actionUrl?: string
    }) => createNotification(
      params.title,
      params.message,
      params.type,
      params.category,
      params.requestId,
      params.actionUrl
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    }
  });
};
