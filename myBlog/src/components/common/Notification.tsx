import { notification } from "antd";

interface IProps {
  message: string;
  duration?: number;
  description?: string;
}

const defaultProps = { duration: 2 };

type TNotification = (props: IProps) => void;

const Notification: TNotification = props => {
  notification["open"]({ ...defaultProps, ...props });
};

export const NotificationError: TNotification = props => {
  notification["error"]({ ...defaultProps, ...props });
};

export const NotificationSuccess: TNotification = props => {
  notification["success"]({ ...defaultProps, ...props });
};

/* export const NotificationWarn: TNotification = props => {
  notification["warn"]({ ...defaultProps, ...props });
};
 */
export default Notification;
