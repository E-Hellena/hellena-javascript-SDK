import type { HellenaConnect } from "../../core/HellenaConnect";
import { RatingFeature } from "./rating.feature";
import { RatingService } from "./service/rating.ser";
export function RatingModel(connect: HellenaConnect) { return new RatingFeature(new RatingService(connect)); }
