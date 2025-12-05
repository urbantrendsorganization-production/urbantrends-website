import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MoreVertical, UserPlus } from 'lucide-react';
import { Card } from './ui/card';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import axios from 'axios';

function AdminClients() {
  const [recentClients, setRecentClients] = useState([])

  const fetchClientRequests = async () => {
    try {
      const response = await axios.get('https://urbantrends-backend-production-fde8.up.railway.app/dev/projects-access/')
      setRecentClients(response.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect( () => {
    fetchClientRequests()
  }, [])

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
            case 'active':
                return 'bg-silver/20 text-silver border-silver/30';
            case 'in progress':
            case 'processing':
                return 'bg-dim-grey/20 text-dim-grey border-dim-grey/30';
            case 'pending':
                return 'bg-gunmetal/20 text-dim-grey border-dim-grey/30';
            default:
                return 'bg-gunmetal/20 text-dim-grey border-dim-grey/30';
        }
    };

    
  return (
    <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-silver">Client Management</h2>
              <Button className="bg-silver text-black hover:bg-silver/90">
                <UserPlus className="w-4 h-4 mr-2" />
                Add New Client
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {recentClients.map((item, index) => {
  const project = item.projectId;
  const userEmail = project?.email; // owner of uploaded project

  return (
    <motion.div
      key={item._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="bg-gunmetal/20 border-dim-grey/30 p-6 hover:border-silver/30 transition-colors">
        <div className="flex items-center justify-between">
          
          {/* Left */}
          <div className="flex items-center gap-4">
            <ImageWithFallback
              src={project?.imageUrl}
              alt={project?.title}
              className="w-12 h-12 rounded-full object-cover border-2 border-gunmetal"
            />
            <div>
              <div className="text-silver mb-1">{project?.title}</div>
              <div className="text-sm text-dim-grey">{userEmail}</div>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-6">
            <div className="text-center hidden sm:block">
              <div className="text-sm text-dim-grey mb-1">Category</div>
              <div className="text-silver">{project?.category}</div>
            </div>
            <div className="text-center hidden md:block">
              <div className="text-sm text-dim-grey mb-1">Tags</div>
              <div className="text-silver">{project?.tags?.length}</div>
            </div>

            <div className="flex items-center gap-2">
              <Badge className={getStatusColor("pending")}>
                Pending
              </Badge>
              <Button variant="ghost" size="icon" className="text-dim-grey hover:text-silver">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>

        </div>
      </Card>
    </motion.div>
  );
})}

            </div>
          </div>
  )
}

export default AdminClients