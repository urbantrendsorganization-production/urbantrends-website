import React from 'react'
import PortfolioIntro from '../component/PortfolioIntro'
import PortfolioSkeleton from '../component/PortfolioSkeleton'

function Portfolio() {
  return (
    <div className='mt-22'>
      <div>
        <PortfolioIntro />
      </div>
      <div>
        <PortfolioSkeleton />
      </div>
    </div>
  )
}

export default Portfolio