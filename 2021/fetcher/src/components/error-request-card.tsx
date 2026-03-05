interface Props {
  error: any
}

export const ErrorRequestCard: React.FC<Props> = ({ error }) => (
  <div className="text-red-500 bg-red-100 m-4 p-4 rounded-lg font-mono">
    <div className="mb-4 font-bold text-xl">Request Error</div>
    <div className="text-xs break-words overflow-x-auto p-4">
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  </div>
)
