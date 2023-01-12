import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService
  ) {}
  
  getHello(): string {
    return 'Hello World!';
  }

  validations(formData){
    if(
      formData["first-name"].lenght < 4 ||
      formData["last-name"].length < 4 ||
      formData["company"].length < 3 ||
      !formData["email"].match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) ||
      //!formData["phone"].match(/^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/) ||
      formData["message"].length < 5
    ) return false;

    return true;
  }

  async submitForm(formData) {
    let jwtSign = await this.jwtService.sign(formData);
    console.log({jwtSign});
    return await this.httpService.post('https://idmtest.proxy.beeceptor.com', {
      jwtSign
    });
  }

}
