import { Box, Paper } from '@mui/material'

// eslint-disable-next-line react/prop-types
const PaperBox = ({ children }) => (
  <Paper>
    <Box sx={{ p: 3 }}>{children}</Box>
  </Paper>
)

export default PaperBox
