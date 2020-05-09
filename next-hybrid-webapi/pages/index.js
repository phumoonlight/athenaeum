import useContent from '../src/useContent'

export default () => {
  const content = useContent()

  return <div>{content.serverStatus}</div>
}