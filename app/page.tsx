import connectDB from '@/config/database'
import Hero from '../components/Hero'
import HomeProperties from '../components/HomeProperties'
import InfoBoxes from '../components/InfoBoxes'
import FeaturedProperties from '@/components/FeaturedProperties'

const page = async () => {
  
  return (
    <>
     <Hero/>
     <InfoBoxes/>
     <FeaturedProperties/>
     <HomeProperties/>
    </>
  )
}

export default page
 