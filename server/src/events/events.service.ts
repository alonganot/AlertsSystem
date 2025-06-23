import { Injectable } from "@nestjs/common";
import { DeletedLineEvent, UpdatedLineEvent } from "./types";
import { ProducerService } from "src/producer/producer.service";
import { appConfig } from "src/appConfig";

@Injectable()
export class EventsService {
    constructor(private readonly producerService: ProducerService) {}

    async updateLine (line: UpdatedLineEvent) {
        this.producerService.sendMessage(appConfig.KAFKA_TOPICS, line)
    }

    async deleteLine (line: DeletedLineEvent) {
        this.producerService.sendMessage(appConfig.KAFKA_TOPICS, line)
    }
}