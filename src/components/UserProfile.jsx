'use client'

import { auth } from '@/utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SvgLogOut } from '@/components/assets/SvgSession'
import { SvgProfile } from './assets/SvgOptions'
import Image from 'next/image'
import Banner from '@/components/assets/img/banner-profile.png'

export default function UserProfile () {
  const route = useRouter()
  const [user, loading] = useAuthState(auth)
  const [providerId, setProviderId] = useState(null)
  const [emailGH, setEmailGH] = useState(null)
  const [emailG, setEmailG] = useState(null)

  const getUserProfile = async () => {
    if (loading) return
    if (!user) return route.push('/')
  }

  useEffect(() => {
    getUserProfile()
  }, [user, loading])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        user.providerData.forEach((profile) => {
          // console.log('User provider:', profile.providerId)
          // Guarda el providerId e email en tu base de datos
          setProviderId(profile.providerId)
          setEmailGH(profile.email)
        })
      }
      if (user) {
        setEmailG(user.email)
      }
    })
    return () => unsubscribe()
  }, [])

  return (
    <div className='mt-8 mx-4 md:mx-0 rounded-lg text-neutral-200 bg-[#303030] h-[calc(100vh-130px)]'>
      <div className='flex flex-col justify-center'>
        <div className='relative flex flex-col items-center'>
          <div className='relative flex h-36 w-full justify-center rounded-lg bg-cover'>
            <Image
              className='flex w-full justify-center rounded-tl-lg rounded-tr-lg bg-cover'
              src={Banner}
              alt='banner-profile'
              priority
            />
            <div className='absolute -bottom-10 flex h-20 w-20 items-center justify-center rounded-full'>
              {user
                ? (
                  <Image
                    className='rounded-full bg-cover'
                    width={80}
                    height={80}
                    src={user.photoURL}
                    alt='user-avatar'
                    priority
                  />
                  )
                : (
                  <SvgProfile className='text-neutral-600 p-3 rounded-full bg-neutral-300' />
                  )}
            </div>
          </div>

          <div className='mt-12 flex flex-col items-center gap-y-2.5'>

            <p className='text-lg font-medium'>
              {user?.displayName}
            </p>

            <div className='text-sm font-medium'>
              {emailG
                ? (
                  <p>{emailG}</p>
                  )
                : (
                  <p>{emailGH}</p>
                  )}
            </div>

            <p className='text-sm font-medium'>
              23 Agosto, 2023
            </p>
          </div>

          <div className='w-full px-5 md:px-44'>
            <div className='mt-8 justify-center py-4 rounded-lg flex gap-x-12 bg-violet-800 bg-opacity-20'>
              <div className='flex flex-col items-center justify-center'>
                <p className='text-2xl font-bold text-red-700 '>17</p>
                <p className='text-sm font-normal'>Posts</p>
              </div>
              <div className='flex flex-col items-center justify-center'>
                <p className='text-2xl font-bold text-red-700 '>
                  9.7K
                </p>
                <p className='text-sm font-normal'>Followers</p>
              </div>
              <div className='flex flex-col items-center justify-center'>
                <p className='text-2xl font-bold text-red-700 '>
                  434
                </p>
                <p className='text-sm font-normal'>Following</p>
              </div>
            </div>
          </div>

          <p className='mt-4 text-sm font-medium'>Cuenta proveniente de {providerId}</p>
        </div>
      </div>

      <div className='mt-8 flex justify-start ml-5'>
        <button onClick={() => auth.signOut()} className='px-3 py-1.5 rounded-md bg-[#242424] text-center text-sm font-medium flex items-center gap-x-1.5'>
          <SvgLogOut className='w-4 h-4' />
          Cerrar sesión
        </button>
      </div>

      {/* <button onClick={() => auth.signOut()} className='px-3 py-1.5 rounded-md my-4 bg-[#303030] text-center text-sm font-medium flex items-center gap-x-1.5'>
        <SvgLogOut className='w-5 h-5 text-indigo-600' />
        Eliminar cuenta
      </button> */}
    </div>
  )
}
