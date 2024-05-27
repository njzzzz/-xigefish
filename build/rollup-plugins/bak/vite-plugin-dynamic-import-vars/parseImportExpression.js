export class VariableDynamicImportError extends Error {}

function sanitizeString(str) {
  if (str.includes('*'))
    throw new VariableDynamicImportError(
      'A dynamic import cannot contain * characters.'
    )

  return str
}

function templateLiteralToGlob(node) {
  let glob = ''

  for (let i = 0; i < node.quasis.length; i += 1) {
    glob += sanitizeString(node.quasis[i].value.raw)
    if (node.expressions[i]) glob += expressionToGlob(node.expressions[i])
  }

  return glob
}

function callExpressionToGlob(node) {
  const { callee } = node
  if (
    callee.type === 'MemberExpression' &&
    callee.property.type === 'Identifier' &&
    callee.property.name === 'concat'
  )
    return `${expressionToGlob(callee.object)}${node.arguments
      .map(expressionToGlob)
      .join('')}`

  return '*'
}

function binaryExpressionToGlob(node) {
  if (node.operator !== '+')
    throw new VariableDynamicImportError(
      `${node.operator} operator is not supported.`
    )

  return `${expressionToGlob(node.left)}${expressionToGlob(node.right)}`
}

function expressionToGlob(node) {
  switch (node.type) {
    case 'TemplateLiteral':
      return templateLiteralToGlob(node)
    case 'CallExpression':
      return callExpressionToGlob(node)
    case 'BinaryExpression':
      return binaryExpressionToGlob(node)
    case 'Literal': {
      return sanitizeString(node.value)
    }
    default:
      return '*'
  }
}

export function parseImportExpression(node) {
  let glob = expressionToGlob(node)
  if (!glob.includes('*') || glob.startsWith('data:')) return null

  glob = glob.replace(/\*\*/g, '*')

  return glob
}
