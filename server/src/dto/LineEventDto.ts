import { DeletedLineEvent, LineEvent, UpdatedLineEvent } from "@Entities/LineEvent";
import { Type } from "class-transformer";
import { IsDate, IsIn, IsString } from "class-validator";

class LineEventDto implements LineEvent {
    @IsString()
    readonly id: string;

    @IsString()
    readonly userId: string;

    readonly status: "CURRENT" | "EXPIRED" | "DELETED";

    @IsString()
    readonly pikud: string;

    @Type(() => Date)
    @IsDate()
    readonly date: Date;
}

export class UpdatedLineEventDto extends LineEventDto implements UpdatedLineEvent {
    @IsIn(['CURRENT', 'EXPIRED'])
    readonly status: "CURRENT" | "EXPIRED";
}

export class DeletedLineEventDto extends LineEventDto implements DeletedLineEvent {
    @IsIn(['DELETED'])
    readonly status: "DELETED";
}