export type TimeStamp = {
  seconds: number
  nanoseconds: number
}

export type PostData = {
  id: string
  imageUrl: string
  text: string
  commentsCount: number
  uid: string
  createdAt: TimeStamp
  likes: { [key: string]: boolean }
}
