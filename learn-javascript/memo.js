console.time('memo')
const cache = {}
let StringifyCache = ''

const useMemo = async (callback, dependencies) => {
  const StringifyDependencies = JSON.stringify(dependencies)
  const dependenciesNotExist = !dependencies
  const isDependenciesChanged = StringifyCache !== StringifyDependencies
  if (dependenciesNotExist || isDependenciesChanged) {
    const callbackResult = await callback()
    cache[StringifyDependencies] = callbackResult
    StringifyCache = StringifyDependencies
  }
  return cache[StringifyCache];
}

const eCall = () => {
  return new Promise((resolve) => setTimeout(resolve, 500))
}



const main = async () => {
  await useMemo(() => eCall(), [])
  await useMemo(eCall, [5])
  await useMemo(eCall, [])
  console.timeEnd('memo')
}

main()

