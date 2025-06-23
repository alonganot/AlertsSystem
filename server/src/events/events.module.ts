import { Module } from "@nestjs/common";
import { EventsController } from "./events.controller";
import { EventsService } from "./events.service";
import { ProducerService } from "src/producer/producer.service";

@Module({
    controllers: [EventsController],
    providers: [EventsService, ProducerService]
})
export class EventsModule {}
