import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response, Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  index(@Res() res: Response) {
    return res.render(
      'index.hbs'
    );
  }

  @Post()
  async submitForm(@Res() res: Response, @Req() req: Request) {
    console.log(req.body)

    if(!this.appService.validations(req.body)){
      return res.render(
        'index.hbs',
        {
          error: "revisa todos los campos, hay un error"
        }
      );
    }

    return await this.appService.submitForm(req.body);
    // return res.render(
    //   'index.hbs',
    //   {
    //     submitResponse
    //   }
    // );
  }
}
