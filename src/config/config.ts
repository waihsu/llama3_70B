interface Config {
  AUTH_GOOGLE_ID: string;
  AUTH_GOOGLE_SECRET: string;
  AUTH_GITHUB_ID: string;
  AUTH_GITHUB_SECRET: string;
}

export const config: Config = {
  AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID || "",
  AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET!,
  AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID!,
  AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET!,
};
