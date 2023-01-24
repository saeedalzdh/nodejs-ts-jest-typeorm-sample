import { config } from './config';
import { createHttpServer } from './server';

async function main(): Promise<void> {
  createHttpServer().listen(config.app.port, () =>
    console.log(`Listening on :${config.app.port}`),
  );
}

main().then().catch(console.error);
