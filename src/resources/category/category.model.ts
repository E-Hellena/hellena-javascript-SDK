import type { HellenaConnect } from "../../core/HellenaConnect";
import { CategoryFeature } from "./category.feature";
import { CategoryService } from "./service/category.ser";

export function CategoryModel(connect: HellenaConnect) {
  return new CategoryFeature(new CategoryService(connect));
}
