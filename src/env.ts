import env from 'dotenv';

env.config();

interface Env {
    PORT?: string;
    REPOS_DIR: string;
}

const { PORT, REPOS_DIR } = (process.env as unknown) as Env;

if (!REPOS_DIR) {
    throw new Error('Please set REPOS_DIR in .env file');
}

export { PORT, REPOS_DIR };
