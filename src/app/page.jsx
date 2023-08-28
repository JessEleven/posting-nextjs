'use client'

import { db } from '@/utils/firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import UserPostCard from '@/components/UserPostCard'

export default function IndexPage () {
  const [allPost, setAllPost] = useState([])

  const getAllPost = async () => {
    const collectionRef = collection(db, 'posts')
    const q = query(collectionRef, orderBy('timestamp', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPost(snapshot.docs.map(doc => ({
        ...doc.data(), id: doc.id
      })))
    })
    return unsubscribe
  }

  useEffect(() => {
    getAllPost()
  }, [])

  return (
    <div className=''>
      <p className='my-4 text-neutral-200 text-center font-bold text-lg'>Inicio</p>

      {allPost.map((post) => (
        <UserPostCard key={post.id} {...post} />
      ))}
    </div>
  )
}
