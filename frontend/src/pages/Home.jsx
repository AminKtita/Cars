import React from 'react'
import { RecentlyAdded } from '../components/RecentlyAdded'
import { RecommandedForYou } from '../components/RecommandedForYou'
import { isTokenExpired } from '../services/api'


export const Home = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  const isLoggedIn = token ? !isTokenExpired(token) : false

  return (<div className="flex flex-col gap-2">
      {isLoggedIn && <RecommandedForYou />}
      <RecentlyAdded />
  </div>
   
  )
}
