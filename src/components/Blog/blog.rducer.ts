import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import BlogData from 'src/blog.constant'
import { Post } from 'src/type/post'

type initialStateType = {
  posts: Post[]
  editingPost: Post | null
}
const initialState: initialStateType = {
  posts: BlogData,
  editingPost: null
}

// export const addPost = createAction('add/post', (post: Omit<Post, 'id'>) => ({
//   payload: {
//     ...post,
//     id: nanoid()
//   }
// }))
// export const deletePost = createAction<string>('blog/deletePost')
// export const startEditingPost = createAction<string>('blog/startEditingPost')
// export const cancelEditingPost = createAction('blog/cancelEditingPost')
// export const updatePost = createAction<Post>('blog/updatePost')

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action: PayloadAction<Post>) => {
        state.posts.push(action.payload)
      },
      prepare: (post: Omit<Post, 'id'>) => ({
        payload: {
          ...post,
          id: nanoid()
        }
      })
    },
    deletePost: (state, action: PayloadAction<string>) => {
      const foundPostIdex = state.posts.findIndex((post) => post.id === action.payload)
      if (foundPostIdex !== -1) {
        state.posts.splice(foundPostIdex, 1)
      }
    },
    startEditingPost: (state, action: PayloadAction<string>) => {
      const foundPost = state.posts.find((post) => post.id === action.payload) || null
      if (foundPost) {
        state.editingPost = foundPost
      }
    },
    cancelEditingPost: (state) => {
      state.editingPost = null
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const foundPostIdex = state.posts.findIndex((post) => post.id === action.payload.id)
      if (foundPostIdex !== -1) {
        state.posts[foundPostIdex] = action.payload
      }
      state.editingPost = null
    }
  },
  extraReducers(builder) {
    builder
      .addMatcher(
        (action) => action.type.includes('cancel'),
        (state, action) => {
          console.log('cancel', state, action)
        }
      )
      .addDefaultCase((state, action) => {
        console.log('default', state, action)
      })
  }
})

export const { addPost, deletePost, startEditingPost, cancelEditingPost, updatePost } = blogSlice.actions
export default blogSlice.reducer

// const blogReducer = createReducer(initialState, (buider) => {
//   buider
//     .addCase(addPost, (state, action) => {
//       state.posts.push(action.payload)
//     })
//     .addCase(deletePost, (state, action) => {
//       const foundPostIdex = state.posts.findIndex((post) => post.id === action.payload)
//       if (foundPostIdex !== -1) {
//         state.posts.splice(foundPostIdex, 1)
//       }
//     })
//     .addCase(startEditingPost, (state, action) => {
//       const foundPost = state.posts.find((post) => post.id === action.payload) || null
//       if (foundPost) {
//         state.editingPost = foundPost
//       }
//     })
//     .addCase(cancelEditingPost, (state) => {
//       state.editingPost = null
//     })
//     .addCase(updatePost, (state, action) => {
//       const foundPostIdex = state.posts.findIndex((post) => post.id === action.payload.id)
//       if (foundPostIdex !== -1) {
//         state.posts[foundPostIdex] = action.payload
//       }
//       state.editingPost = null
//     })
// })

//export default blogReducer
