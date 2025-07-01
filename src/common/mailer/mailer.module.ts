import { Global, Module } from '@nestjs/common';
import { MailerModule as NestMalierModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter"
import { MailerService } from './mailer.service';
@Global()
@Module({
  imports:[
    NestMalierModule.forRoot({
      transport:{
        service:'gmail',
        auth:{
          user:'nematjonovmuhammadyahyo1@gmail.com',
          pass:"rphs snnx xvkj gznt"
        }
      },

      defaults:{
        from:"DarkNet<nematjonovmuhammadyahyo1@gmail.com>"
      },

      template:{
        dir:join(process.cwd(),'src','templates'),
        adapter:new HandlebarsAdapter(),
        options:{
          strict:true
        }
      }
    })
  ],
providers:[MailerService],
exports:[MailerService]

})
export class MailerModule {}
