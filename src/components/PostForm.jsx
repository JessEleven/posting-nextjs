'use client'

import { auth, db } from '@/utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { Toaster, toast } from 'sonner'

export default function PostForm () {
  const [post, setPost] = useState({ description: '' })
  const [user, loading] = useAuthState(auth)
  const route = useRouter()
  const params = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (post.description.length > 300) {
      return (
        toast.error('El limite de caracteres es 300')
      )
    }

    if (!post.description) {
      return (
        toast.error('No se puede postear')
      )
    }

    const createCollection = collection(db, 'posts')
    await addDoc(createCollection, {
      ...post,
      timestamp: serverTimestamp(),
      user: user.uid,
      username: user.displayName,
      avatar: user.photoURL
    })

    toast.success('Se ha enviando el post')
    setPost({ description: '' })
    return (
      route.refresh(),
      route.push('/')
    )
  }

  const checkUser = async () => {
    if (loading) return
    if (!user) return route.push('/login')
  }

  console.log(params)

  useEffect(() => {
    checkUser()
  }, [user, loading])

  return (

    <div className='w-full md:w-[390px] mt-8 mx-auto rounded-lg bg-[#303030] block'>
      <form onSubmit={handleSubmit} className='flex-row px-5 py-5 text-neutral-200'>
        <p className='mb-2.5 text-lg font-semibold'>Crear un nuevo post</p>
        <p className='text-sm font-medium mb-2.5'>Descripción</p>

        <textarea
          className='py-1.5 2xl:py-2 px-3 w-full max-h-48 h-48 bg-[#242424] outline-none rounded-md text-white text-sm font-medium'
          onChange={(e) => setPost({ ...post, description: e.target.value })}
          value={post.description}
          autoFocus
        />

        <button className='w-full bg-indigo-600 py-2 mt-2.5 mb-2.5 rounded-md text-sm font-medium'>
          Postear
        </button>
      </form>

      <Toaster position='top-right' />
    </div>

  )
}
