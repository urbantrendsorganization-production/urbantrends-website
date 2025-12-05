import React from 'react'
import { Button } from './ui/button'
import { Download, Filter } from 'lucide-react'

function AdminProducts() {
    return (
        <div className='space-y-6'>
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <h2 className="text-silver">Product Management</h2>
                <Button className="bg-silver text-black hover:bg-silver/90">Create New Project</Button>
            </div>

            
        </div>
    )
}

export default AdminProducts