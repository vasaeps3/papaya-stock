import { Module } from "@nestjs/common";

import { CounterService } from "./counter.service";
import { CounterController } from "./counter.controller";



@Module({
    controllers: [CounterController],
    components: [CounterService]
})
export class CounterModule { }

