import React from 'react'
import ContactIntro from '../component/ContactIntro'
import ContactForm from '../component/ContactForm'
import ContactCTA from '../component/ContactCTA'

function Contact() {
  return (
    <div className='mt-22'>

      <div>
        <ContactIntro />
      </div>

      <div>
        <ContactForm />
      </div>

      <div>
        <ContactCTA />
      </div>
    </div>
  )
}

export default Contact