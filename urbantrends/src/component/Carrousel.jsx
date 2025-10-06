import React from 'react'
import development from '../assets/develop.jpeg'
import Cybersecurity from '../assets/cyber sec.jpeg'
import aipowered from '../assets/ai powered.jpeg'
import enterprise from '../assets/enterprise.jpeg'

function Carrousel() {
  return (
    <div className='mt-3 md:flex justify-center gap-3 p-2 items-center bg-[rgba(166,166,166,0.6)] rounded-lg space-y-3'>
        {/* image 1 */}
        <div className='w-[120] h-90'>
          <img src={development} alt="development" className='w-full h-full object-cover rounded-lg'/>


        </div>
        {/* image 2 */}
        <div className='w-[120] h-90'>
          <img src={Cybersecurity} alt="cyber security" className='w-full h-full object-cover rounded-lg'/>


        </div>
        {/* image 3 */}
        <div className='w-90 h-90'>
          <img src={aipowered} alt="" className='w-full h-full object-cover rounded-lg'/>


        </div>
        {/* image 4 */}
        <div className='w-[120] h-90'>
          <img src={enterprise} alt="" className='w-full h-full object-cover rounded-lg'/>


        </div>
    </div>
  )
}

export default Carrousel