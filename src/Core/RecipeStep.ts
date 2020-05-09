import Joi from "@hapi/joi";
import { v4 as uuidv4 } from "uuid";

const detailsSchema = Joi.string().allow("").label("Step details");
const idSchema = Joi.string();
const titleSchema = Joi.string().min(1).label("Step title");

const RecipeStepSchema = Joi.object({
  details: detailsSchema,
  id: idSchema,
  _title: titleSchema,
});

export default class RecipeStep {
  details: string;
  readonly id: string;
  private _title: string;
  constructor(title: string, details = "") {
    this.details = details;
    this.id = uuidv4();
    this._title = title;
    Joi.assert(this, RecipeStepSchema);
  }

  public get title(): string {
    return this._title;
  }

  public set title(v: string) {
    Joi.assert(v, titleSchema);
    this._title = v;
  }
}
