import { Configuration, LISWebAPIApiFactory } from "../api_client";

export default LISWebAPIApiFactory(
  new Configuration({ basePath: process.env.NEXT_PUBLIC_API_BASE_URL })
);
