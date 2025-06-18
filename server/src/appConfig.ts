import { configDotenv } from "dotenv";

configDotenv()

export const appConfig = {
    KAFKA_BROKERS: process.env.KAFKA_BROKERS || "localhost:9092"
}