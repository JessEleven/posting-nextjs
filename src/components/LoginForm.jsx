'use client'

import { SvgGitHub, SvgGoogle } from '@/components/assets/SvgSession'
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth'
import { auth } from '@/utils/firebase'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react'
import Image from 'next/image'
import Logo from '../../public/logo-app.png'

export default function LoginForm () {
  const route = useRouter()
  const [user] = useAuthState(auth)
  const googleProvider = new GoogleAuthProvider()
  const githubProvider = new GithubAuthProvider()

  const singInGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      route.push('/home')
    } catch (error) {
      console.log(error)
    }
  }

  const singInGitHub = async () => {
    try {
      await signInWithPopup(auth, githubProvider)
      route.push('/home')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user) {
      route.push('/home')
    } // else {
    //   console.log('Have you login')
    // }
  }, [user])

  return (
    <div className='w-full mt-8 mx-5 md:mx-0 rounded-lg bg-violet-400 bg-opacity-10 block'>

      <div className='flex justify-center mt-10'>
        <Image
          width={50}
          height={50}
          src={Logo}
          alt='logo'
          priority
        />
      </div>

      <div className='font-medium text-center text-neutral-200 my-8'>
        <p className='text-xl'>
          ¡Bienvenido de vuelta!
        </p>
        <p className='text-sm mt-2.5'>
          Iniciar sesión en su cuenta
        </p>
      </div>

      {/* <form className='flex-row px-5'>
        <p className='my-5 text-xl font-semibold'>Join Today :)</p>
        <input type='text' className='py-1.5 2xl:py-2 px-3 w-full rounded-md ring-2 ring-inset ring-indigo-600 outline-none bg-transparent mb-5' />
        <input type='text' className='py-1.5 2xl:py-2 px-3 w-full rounded-md ring-2 ring-inset ring-indigo-600 outline-none bg-transparent' />
        <button className='w-full bg-indigo-600 py-2 mt-5 mb-2.5 rounded-md text-sm font-medium text-white'>
          Sing in
        </button>
      </form> */}

      {/* md:flex md:columns-2 gap-x-2.5 */}

      <div className='mx-5 flex-grow text-neutral-200 text-sm font-medium'>
        <button onClick={singInGoogle} className='w-full flex items-center justify-center gap-x-1.5 bg-neutral-600 py-2 mb-2.5 md:mb-5 rounded-md'>
          <SvgGoogle className='w-5 h-5' />
          Google
        </button>

        <button onClick={singInGitHub} className='w-full flex items-center justify-center gap-x-1.5 bg-neutral-600 py-2 rounded-md mb-10'>
          <SvgGitHub className='w-5 h-5' />
          GitHub
        </button>
      </div>
    </div>
  )
}
