import Blob from './blob'

export type BlobStore = {
  getString(hash: string): Promise<string>
  putString(content: string): Promise<Blob>
}

type Range = {
  pos: number
  length: number
}

export type CommentRawData = {
  ranges: Range[]
  resolved?: boolean
}

export type TrackedChangeRawData = {
  range: Range
  tracking: TrackingPropsRawData
}

export type TrackingPropsRawData = {
  type: 'insert' | 'delete' | 'none'
  userId: string
  ts: string
}

export type CommentsListRawData = Array<{ id: string } & CommentRawData>

export type StringFileRawData = {
  content: string
  comments?: CommentsListRawData
  trackedChanges?: TrackedChangeRawData[]
}

export type RawV2DocVersions = Record<string, { pathname: string; v: number }>

export type RawInsertOp =
  | {
      i: string
      commentIds?: string[]
      tracking?: TrackingPropsRawData
    }
  | string

export type RawRemoveOp = number
export type RawRetainOp =
  | {
      r: number
      commentIds?: string[]
      tracking?: TrackingPropsRawData
    }
  | number

export type RawScanOp = RawInsertOp | RawRemoveOp | RawRetainOp

export type RawTextOperation = {
  textOperation: RawScanOp[]
}

export type RawAddCommentOperation = CommentRawData & { commentId: string }

export type RawDeleteCommentOperation = { deleteComment: string }

export type RawEditOperation =
  | RawTextOperation
  | RawAddCommentOperation
  | RawDeleteCommentOperation
