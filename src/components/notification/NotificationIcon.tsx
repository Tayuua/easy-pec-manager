
import { useState } from "react";
import { Bell } from "lucide-react";
import { useNotifications, useUnreadNotificationsCount } from "@/services/notificationService";
import { Button } from "@/components/ui/button";
import NotificationPopover from "./NotificationPopover";

const NotificationIcon = () => {
  const [open, setOpen] = useState(false);
  const unreadCount = useUnreadNotificationsCount();
  
  return (
    <div className="relative">
      <NotificationPopover open={open} onOpenChange={setOpen}>
        <Button 
          variant="ghost" 
          size="icon"
          className="relative"
          aria-label={`${unreadCount} notifications non lues`}
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-easypec-red text-[10px] text-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </NotificationPopover>
    </div>
  );
};

export default NotificationIcon;
