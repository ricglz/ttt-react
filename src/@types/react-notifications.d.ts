declare module 'react-notifications' {
  import { ReactNode, StatelessComponent } from 'react';
  import { EventEmitter } from 'events';

  enum NotificationType {
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error'
  }

  enum EventType {
    CHANGE = 'change',
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error'
  }

  interface NotificationProps {
    type: NotificationType,
    title?: ReactNode,
    message: ReactNode,
    timeOut?: number,
    onClick: () => any,
    onRequestHide: () => any
  }

  type Notification = StatelessComponent<NotificationProps>;

  interface NotificationsProps {
    notifications: Notification[];
    onRequestHide?: (notification: Notification) => any;
    enterTimeout?: number;
    leaveTimeout?: number;
  }
  type Notifications = StatelessComponent<NotificationsProps>

  interface NotificationContainerProps {
    enterTimeout?: number;
    leaveTimeout?: number;
  }

  type NotificationContainer = StatelessComponent<NotificationContainerProps>;

  interface INotificationManagerCreate {
    type: EventType,
    title?: NotificationProps['title']
    message?: NotificationProps['message']
    timeout?: number,
    onClick?: () => any,
    priority?: boolean
  }

  class NotificationManager extends EventEmitter {
    static create(creation: INotificationManagerCreate) : void

    static info(message?: INotificationManagerCreate['message'], title?: INotificationManagerCreate['title'], timeOut?: INotificationManagerCreate['timeout'], onClick?: INotificationManagerCreate['onClick'], priority?: INotificationManagerCreate['priority']) : void

    static success(message?: INotificationManagerCreate['message'], title?: INotificationManagerCreate['title'], timeOut?: INotificationManagerCreate['timeout'], onClick?: INotificationManagerCreate['onClick'], priority?: INotificationManagerCreate['priority']) : void

    static warning(message?: INotificationManagerCreate['message'], title?: INotificationManagerCreate['title'], timeOut?: INotificationManagerCreate['timeout'], onClick?: INotificationManagerCreate['onClick'], priority?: INotificationManagerCreate['priority']) : void

    static error(message?: INotificationManagerCreate['message'], title?: INotificationManagerCreate['title'], timeOut?: INotificationManagerCreate['timeout'], onClick?: INotificationManagerCreate['onClick'], priority?: INotificationManagerCreate['priority']) : void

    static remove(notification: Notification) : void
  }
}