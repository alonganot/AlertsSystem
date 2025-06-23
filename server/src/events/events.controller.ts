import { Body, Controller, Delete, Post } from "@nestjs/common";
import { DeletedLineEvent, UpdatedLineEvent } from "@Entities/LineEvent";
import { EventsService } from "./events.service";

@Controller("events")
export class EventsController {
    constructor(private readonly eventsService: EventsService){}

    //for now the body type is set but it lets the client to send unvalid types. i will take care of this
    @Post('update')
    async updateLine (@Body() body: UpdatedLineEvent) {
        await this.eventsService.updateLine(body)
    }

    @Delete('delete')
    async delete (@Body() body: DeletedLineEvent) {
        this.eventsService.deleteLine(body)
    }
}