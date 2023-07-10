import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    echo(text: string): string {
       return  `Echo: ${text}`;
    }
}
