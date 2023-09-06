import { isAxiosError } from 'axios';
const logError = (error: any, origin?: string) => {
  if (isAxiosError(error) || error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(`${origin ? origin + ' -> ' : ''}Unknown Error: `, error);
  }
};

export default logError;
