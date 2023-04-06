declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Your enviroment variables
      PORT?: string;
      HOSTNAME: number;
    }
  }
}
  
export {}