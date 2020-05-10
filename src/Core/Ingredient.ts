import Joi from "@hapi/joi";

const nameSchema = Joi.string().min(1).label("Ingredient name");
const notesSchema = Joi.string().allow("").label("Ingredient notes");
const quantitySchema = Joi.string().allow("").label("Ingredient quantity");

const IngredientSchema = Joi.object({
  _name: nameSchema,
  notes: notesSchema,
  _quantity: quantitySchema,
});

export const IngredientFieldSchemas = {
  name: nameSchema,
  notes: notesSchema,
  quantity: quantitySchema,
};

export default class Ingredient {
  private _name: string;
  notes: string;
  private _quantity: string;

  constructor(name: string, quantity = "", notes = "") {
    this._name = name;
    this._quantity = quantity;
    this.notes = notes;
    Joi.assert(this, IngredientSchema);
  }

  public get name(): string {
    return this._name;
  }

  public set name(v: string) {
    Joi.assert(v, nameSchema);
    this._name = v;
  }

  public get quantity(): string {
    return this._quantity;
  }

  public set quantity(v: string) {
    Joi.assert(v, quantitySchema);
    this._quantity = v;
  }
}
