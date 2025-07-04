/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { database } from 'src/database/client'

export type ColumnMetaItem = {
  target: Function
  key: string
  editable: boolean
}

const metas: ColumnMetaItem[] = []

export const ColumnMeta = (args: {
  editable?: boolean
}): PropertyDecorator => {
  return (target, key) => {
    metas.push({
      target: target.constructor,
      key: String(key),
      editable: args.editable ?? true,
    })
  }
}

export const getDatabaseSimpleMetadatas = () => {
  return database.entityMetadatas.map((entity) => ({
    name: entity.name,
    tableName: entity.tableName,
    columns: entity.columns.map((column) => ({
      name: column.propertyName,
      type: column.type instanceof Function ? column.type.name.toLowerCase() : column.type,
      isPrimary: column.isPrimary,
      isNullable: column.isNullable,
      isGenerated: column.isGenerated,
      default: column.default,
      enum: column.enum,
    })),
  }))
}
