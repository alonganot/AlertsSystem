import { DeletedLineEvent, UpdatedLineEvent } from "@Entities/LineEvent";
import { Type } from "class-transformer";
import { IsDate, IsIn, IsString } from "class-validator";

export class UpdatedLineEventDto implements UpdatedLineEvent {
    @IsString()
    readonly id: string;

    @IsString()
    readonly userId: string;

    @IsIn(['CURRENT', 'EXPIRED'])
    readonly status: "CURRENT" | "EXPIRED";

    @Type(() => Date)
    @IsDate()
    date: Date;
}

export class DeletedLineEventDto implements DeletedLineEvent {
    @IsString()
    readonly id: string;

    @IsString()
    readonly userId: string;

    @IsIn(['DELETED'])
    readonly status: "DELETED";

    @Type(() => Date)
    @IsDate()
    readonly date: Date;
}