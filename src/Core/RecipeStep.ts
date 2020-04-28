import Joi from "@hapi/joi";

const detailsSchema = Joi.string().allow("").label("Step details");
const titleSchema = Joi.string().min(1).label("Step title");

const RecipeStepSchema = Joi.object({
  details: detailsSchema,
  _title: titleSchema,
});

export default class RecipeStep {
  details: string;
  private _title: string;
  constructor(title: string, details = "") {
    this.details = details;
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
