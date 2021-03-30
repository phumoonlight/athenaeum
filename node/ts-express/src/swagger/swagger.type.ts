export interface MethodDefinition {
  summary?: string
  tags?: string[]
  parameters?: {}
  responses: {
    [status: string]: {
      description: string
    }
  }
}

export interface SwaggerPath {
  [path: string]: {
    get?: MethodDefinition
    post?: MethodDefinition
    put?: MethodDefinition
    patch?: MethodDefinition
    delete?: MethodDefinition
  }
}

export interface SwaggerTag {
  name: string
  description?: string
}

export interface SwaggerDefinition {
  [name: string]: {
    type: string
    properties: {
      [name: string]: {
        type: string
        format?: string
        $ref?: string
      }
    }
  }
}

export interface SwaggerMainConfig {
  openapi: string
  info: {
    version: string
    title: string
    description?: string
  }
  tags?: SwaggerTag[]
  paths: SwaggerPath
  definitions: SwaggerDefinition
}
