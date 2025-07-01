import { Module } from '@nestjs/common';
import { RedicService } from './redic.service';

@Module({
    
    providers:[RedicService],
    exports:[RedicService]
})
export class RedicModule {}
