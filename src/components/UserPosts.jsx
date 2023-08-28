'use client'

import { auth, db } from '@/utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore'
import UserPostCard from '@/components/UserPostCard'
import { SvgDelete } from '@/components/assets/SvgPostCard'
import { Toaster, toast } from 'sonner'

export default function UserPosts () {
  const route = useRouter()
  const [user, loading] = useAuthState(auth)
  const [posts, setPosts] = useState([])

  const getUserData = async () => {
    if (loading) return
    if (!user) return route.push('/')

    const collectionRef = collection(db, 'posts')
    const q = query(collectionRef, where('user', '==', user.uid))
    const unsubscribe = onSnapshot(q, snapshot => {
      setPosts(snapshot.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      })))
      return unsubscribe
    })
  }

  const deleteUserPost = async (id) => {
    toast.success('Se ha eliminado el post')
    const collectionRef = doc(db, 'posts', id)
    await deleteDoc(collectionRef)
  }

  useEffect(() => {
    getUserData()
  }, [user, loading])

  return (
    <div>
      {posts.map((post) => {
        return (
          <UserPostCard key={post.id} {...post}>

            <div className='flex items-center text-neutral-200 gap-x-1.5'>
              <button onClick={() => deleteUserPost(post.id)}>
                <SvgDelete className='w-5 h-5' />
              </button>

              {/* <button onClick={() => route.push('/post/edit/' + post.id)}>
                <SvgEdit className='w-5 h-5' />
              </button> */}

              <Toaster position='top-right' />
            </div>
          </UserPostCard>
        )
      })}
    </div>
  )
}
