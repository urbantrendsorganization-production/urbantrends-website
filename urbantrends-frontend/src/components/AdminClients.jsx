import React from 'react'
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MoreVertical, UserPlus } from 'lucide-react';
import { Card } from './ui/card';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';

function AdminClients() {

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

    const recentClients = [
    {
      id: '1',
      name: 'Acme Corp',
      email: 'contact@acme.com',
      projects: 3,
      spent: '$45,000',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDA2MzY3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '2',
      name: 'TechStart Inc',
      email: 'hello@techstart.io',
      projects: 5,
      spent: '$78,500',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDA2MzY3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '3',
      name: 'Digital Wave',
      email: 'info@digitalwave.com',
      projects: 2,
      spent: '$32,000',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDA2MzY3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '4',
      name: 'Innovation Labs',
      email: 'team@innovationlabs.ai',
      projects: 1,
      spent: '$18,000',
      status: 'Pending',
      image: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDA2MzY3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];
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
              {recentClients.map((client, index) => (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="bg-gunmetal/20 border-dim-grey/30 p-6 hover:border-silver/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <ImageWithFallback
                          src={client.image}
                          alt={client.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gunmetal"
                        />
                        <div>
                          <div className="text-silver mb-1">{client.name}</div>
                          <div className="text-sm text-dim-grey">{client.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center hidden sm:block">
                          <div className="text-sm text-dim-grey mb-1">Projects</div>
                          <div className="text-silver">{client.projects}</div>
                        </div>
                        <div className="text-center hidden md:block">
                          <div className="text-sm text-dim-grey mb-1">Total Spent</div>
                          <div className="text-silver">{client.spent}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(client.status)}>
                            {client.status}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-dim-grey hover:text-silver"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
  )
}

export default AdminClients