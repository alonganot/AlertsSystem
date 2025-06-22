import { Injectable } from "@nestjs/common";
import { LineEvent } from "./types";
import { ProducerService } from "src/producer/producer.service";
import { appConfig } from "src/appConfig";

@Injectable()
export class EventsService {
    constructor(private readonly producerService: ProducerService) {}

    async updateLine (line: LineEvent) {
        this.producerService.sendMessage(appConfig.KAFKA_TOPICS, line)
    }

    async deleteLine (line: LineEvent) {
        this.producerService.sendMessage(appConfig.KAFKA_TOPICS, line)
    }
}