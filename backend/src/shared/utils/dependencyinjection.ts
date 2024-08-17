import LoggerInstance from "./logger"
import Container from "typedi"

export default async ({models}) => {
    for(let [key, value] of Object.entries(models)) {
        Container.set(key, value)
    }

    Container.set("logger", LoggerInstance)
}