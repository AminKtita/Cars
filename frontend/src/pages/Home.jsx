import React from 'react'
import { RecentlyAdded } from '../components/RecentlyAdded'
import { RecommandedForYou } from '../components/RecommandedForYou'
import { isTokenExpired } from '../services/api'
import {Banner} from '../components/Banner' 
import {BrowseByBrand} from '../components/BrowseByBrand'
import {BrowseByBody} from '../components/BrowseByBody'
import {PopularByBrand} from '../components/PopularByBrand'
import {TopViewedCar} from '../components/TopViewedCar'
import {ContactUsBanner} from '../components/ContactUsBanner'
import {CounterBanner} from '../components/CounterBanner'
import {ReviewsBanner} from '../components/ReviewsBanner'
import {FaqBanner} from '../components/FaqBanner'









export const Home = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  const isLoggedIn = token ? !isTokenExpired(token) : false

  return (<div className="flex flex-col">
    
      <Banner />
      <BrowseByBrand />
      <BrowseByBody />
      <PopularByBrand />
      <ContactUsBanner />
      <TopViewedCar />
      <CounterBanner />
      <ReviewsBanner />
      <FaqBanner />
      {isLoggedIn && <RecommandedForYou />}
      <RecentlyAdded />
  </div>
   
  )
}
