import { NotificationType } from "../enum/notification-type.enum";

export interface Notification{
    msg: string,
    type: NotificationType
}