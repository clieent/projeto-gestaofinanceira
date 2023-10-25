import { Module } from '@nestjs/common';
import { EmailService } from './emails.service';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MailerModule.forRoot({
          transport: {
            host: process.env.HOST_MAIL,
            port: 2525,
            secure: true,
            auth: {
              user: process.env.USER_MAIL,
              pass: process.env.PASSWORD_MAIL,
            },
            ignoreTLS: true,
          },
          template: {
            adapter: new EjsAdapter(),
            options: {
              strict: true,
            },
          },
        }),
      ],
    providers: [
        EmailService
    ],
    exports: [
        EmailService
    ]
})
export class EmailsModule {}
