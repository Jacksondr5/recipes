// // Ripped from https://levelup.gitconnected.com/elegant-typescript-data-validation-with-decorators-68ec7506fd87
// // and slightly modified

// Keeping it around in case decorators make it to the big screen
// below is necessary to make TSC happy
export default true;

// import { Schema } from "@hapi/joi";
// import "reflect-metadata";

// export function schema(schema: Schema, validateParams: boolean = false) {
//   return function validateArgs(target: any) {
//     // save a reference to the original constructor
//     var original = target;
//     // wrap orginal constructor with validation behaviour
//     var f: any = function (...args: any[]) {
//       // When parameter validation is enabled...
//       if (validateParams) {
//         validateConstructorParams(target, args); // validate the parameters
//       }
//       const instance = new original(...args);
//       const { error } = schema.validate(instance);
//       if (error instanceof Error) {
//         throw error;
//       }

//       return instance;
//     };
//     // set f's prototype to orginal's prototype so f keeps original's type
//     f.prototype = original.prototype;
//     return f;
//   };
// }

// function validateConstructorParams(target: any, args: any[]) {
//   // Retrieve all constructor parameters metadata
//   let existingConstrainedParameters: ConstrainedParameterMap = Reflect.getOwnMetadata(
//     parameterSchemaMetadataKey,
//     target,
//     "constructor"
//   );
//   // For each retrieved metadata,...
//   if (existingConstrainedParameters) {
//     const parameterIndexes = Object.keys(existingConstrainedParameters);
//     for (let parameterIndex of parameterIndexes) {
//       // Validate the argument at a given index against the relevant schema
//       const { error } = existingConstrainedParameters[parameterIndex].validate(
//         args[Number.parseInt(parameterIndex)]
//       );
//       // Bail out with an error if validation fails
//       if (error instanceof Error) {
//         throw error;
//       }
//     }
//   }
// }

// export const parameterSchemaMetadataKey = Symbol("parameterSchema");
// export type ConstrainedParameterMap = { [id: string]: Schema };

// export function paramSchema(schema: Schema) {
//   return function setParamSchemaMetadata(
//     target: Object,
//     propertyKey: string | symbol,
//     parameterIndex: number
//   ) {
//     // If no property is given, we assume that we are trying to annotate a constructor parameter
//     propertyKey =
//       typeof propertyKey === "undefined" ? "constructor" : propertyKey;
//     // Collect metadata entries that mark parameters as constrained by a schema
//     let existingConstrainedParameters: { [id: string]: Schema } =
//       Reflect.getOwnMetadata(parameterSchemaMetadataKey, target, propertyKey) ||
//       [];
//     // Add a metadata entry that marks the current parameter as constrained by the given schema
//     existingConstrainedParameters[parameterIndex] = schema;
//     Reflect.defineMetadata(
//       parameterSchemaMetadataKey,
//       existingConstrainedParameters,
//       target,
//       propertyKey
//     );
//   };
// }

// export function propertySchema(schema: Schema) {
//   return function (target: Object, key: string | symbol): void {
//     // The property
//     let val = target[key];
//     let propertyName = String(key);

//     // Generate getter and setter
//     const getter = () => {
//       return val;
//     };
//     const setter = (value: any) => {
//       // Validate
//       const { error } = schema.validate(value);
//       // Throw an error if validation fails
//       if (error instanceof Error) {
//         // A descriptive error message
//         error.message = error.message.replace('"value"', `"${propertyName}"`);
//         throw error;
//       }
//       // Else, set value
//       val = value;
//     };
//     // Append getter and setter to the target
//     Object.defineProperty(target, key, {
//       get: getter,
//       set: setter,
//       enumerable: true,
//       configurable: true,
//     });
//   };
// }
