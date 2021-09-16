import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configFastifyAdaptor } from './shared/helpers/configFastifyAdaptor';

async function bootstrap() {
  const nodeEnv = process.env.NODE_ENV;
  const serverPort = Number(process.env.HTTP_SERVER_PORT);
  const serverHost = process.env.SERVER_HOST;
  const fastifyAdaptor = new FastifyAdapter();

  console.log('app env:');
  console.log(nodeEnv);

  configFastifyAdaptor(fastifyAdaptor);

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdaptor,
  );

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const options = new DocumentBuilder()
    .setTitle('discount module api')
    .setDescription('discount module api')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('doc', app, document);
  await app.listen(serverPort, serverHost, (err, address) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`app run in ${address}`);
    }
  });
}
bootstrap();
