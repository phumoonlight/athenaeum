import { Box, Button, Paper, SxProps } from '@mui/material'

type Props = {
  children?: React.ReactNode
  sx?: SxProps
  onSubmit?: (record: Record<string, any>) => void
}

export const ContentDynamicForm = (props: Props) => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const formDataEntries = Object.fromEntries(formData.entries())
    props.onSubmit?.(formDataEntries)
  }
  return (
    <Box component="form" sx={props.sx} onSubmit={onSubmit}>
      <Paper sx={{ padding: 2, marginBottom: 4, bgcolor: '#f5f5f5', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {props.children}
      </Paper>
      <Box display="flex" justifyContent="flex-end">
        <Button type="submit" variant="contained">submit</Button>
      </Box>
    </Box>
  )
}