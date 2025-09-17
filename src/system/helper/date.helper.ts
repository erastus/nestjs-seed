import { format } from 'date-fns';

export const date = (dateFormat: string): string => {
  return format(new Date(), dateFormat);
};
