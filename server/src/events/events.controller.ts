import { Body, Controller, Delete, Post } from "@nestjs/common";
import { EventsService } from "./events.service";
import { DeletedLineEventDto, UpdatedLineEventDto } from "src/dto/LineEventDto";

@Controller("events")
export class EventsController {
    constructor(private readonly eventsService: EventsService){}

    @Post('update')
    async updateLine (@Body() body: UpdatedLineEventDto) {
        await this.eventsService.updateLine(body)
    }

    @Delete('delete')
    async delete (@Body() body: DeletedLineEventDto) {
        this.eventsService.deleteLine(body)
    }
}