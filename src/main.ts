import { config } from './config';
import { connect } from './dao';
import { createHttpServer } from './server';

async function main(): Promise<void> {
  await connect();

  createHttpServer().listen(config.app.port, () =>
    console.log(`Listening on :${config.app.port}`),
  );
}

main().then().catch(console.error);
