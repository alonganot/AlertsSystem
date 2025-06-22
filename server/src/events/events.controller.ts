import { Body, Controller, Delete, Post } from "@nestjs/common";
import { LineEvent } from "./types";
import { EventsService } from "./events,service";

@Controller("events")
export class EventsController {
    constructor(private readonly eventsService: EventsService){}

    @Post('update')
    async updateLine (@Body() body: LineEvent) {
        await this.eventsService.updateLine(body)
    }

    @Delete('delete')
    async delete (@Body() body: LineEvent) {
        this.eventsService.deleteLine(body)
    }
}