export type AlertType = 'error' | 'warning' | 'information' | 'success' | 'neutral';
export interface AlertProps {
  type?: AlertType;
  expandable?: boolean;
  expanded?: boolean;
  title?: string;
}
