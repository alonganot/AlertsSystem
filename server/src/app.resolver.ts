import { Query, Resolver } from "@nestjs/graphql";
import { AppService } from "./app.service";
import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
class HelloResult {
  @Field()
  message!: string;
}

@Resolver(() => HelloResult)
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => HelloResult)
  hello(): HelloResult {
    return { message: this.appService.getHello() };
  }
}
