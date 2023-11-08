import axios, { AxiosError } from 'axios';
import { toast } from '../components/ui/use-toast';

export const checkChatLimit = async () => {
  try {
    const res = await axios.get('/api/limit-check');
    if (res.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    /* except 2xx, any other return status will be consider as error in axios request
        Here is a typical specifc error handle for axios,
        if you would like more simpler handler for thoses intentional error status in try block,
        user fetch instead.    
    */
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError;
      if (serverError && serverError.response) {
        if (serverError.response.status === 403) {
          toast({
            variant: 'destructive',
            title: 'Upload failed',
            description:
              'You have reached the maximum number of chats. Please delete one before creating a new chat.',
          });
          return false;
        }
      }
    }
    toast({
      variant: 'destructive',
      title: 'Upload failed',
      description: 'Fail to check user current chat number',
    });
    return false;
  }
};
