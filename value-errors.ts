/**
 * Source: https://github.com/sinclairzx81/typebox/blob/master/src/errors/errors.ts
 *
 * MIT License (MIT)
 * Copyright (c) 2017-2023 Haydn Paterson (sinclair) <haydn.developer@gmail.com>
 */
export enum ValueErrorType {
  Array,
  ArrayMinItems,
  ArrayMaxItems,
  ArrayUniqueItems,
  BigInt,
  BigIntMultipleOf,
  BigIntExclusiveMinimum,
  BigIntExclusiveMaximum,
  BigIntMinimum,
  BigIntMaximum,
  Boolean,
  Date,
  DateExclusiveMinimumTimestamp,
  DateExclusiveMaximumTimestamp,
  DateMinimumTimestamp,
  DateMaximumTimestamp,
  Function,
  Integer,
  IntegerMultipleOf,
  IntegerExclusiveMinimum,
  IntegerExclusiveMaximum,
  IntegerMinimum,
  IntegerMaximum,
  Intersect,
  IntersectUnevaluatedProperties,
  Literal,
  Never,
  Not,
  Null,
  Number,
  NumberMultipleOf,
  NumberExclusiveMinimum,
  NumberExclusiveMaximum,
  NumberMinumum,
  NumberMaximum,
  Object,
  ObjectMinProperties,
  ObjectMaxProperties,
  ObjectAdditionalProperties,
  ObjectRequiredProperties,
  Promise,
  RecordKeyNumeric,
  RecordKeyString,
  String,
  StringMinLength,
  StringMaxLength,
  StringPattern,
  StringFormatUnknown,
  StringFormat,
  Symbol,
  TupleZeroLength,
  TupleLength,
  Undefined,
  Union,
  Uint8Array,
  Uint8ArrayMinByteLength,
  Uint8ArrayMaxByteLength,
  Void,
  Custom,
}

export interface ValueError {
  type: ValueErrorType;
  schema: Record<string, unknown>;
  path: string;
  value: unknown;
  message: string;
}
