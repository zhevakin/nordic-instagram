import { Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'

type FormValues = {
  text: string
}

type CommentFormProps = {
  onSubmit: () => void
}

const CommentsForm = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<FormValues>()

  return (
    <form onSubmit={handleSubmit(onSubmit)} role="form">
      <TextField
        multiline
        fullWidth
        rows={3}
        placeholder="Ваш комментарий"
        sx={{ mb: 2 }}
        {...register('text')}
      />
      <Button type="submit" color="primary">
        Отправить
      </Button>
    </form>
  )
}

export default CommentsForm
