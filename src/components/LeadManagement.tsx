import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, CheckCircle } from 'lucide-react';
import leadManagementImg from '@/assets/images/lead-management.jpg';

const LeadManagement = () => {
  const features = [
    "Cross-references real-time data with DNC Lists for secure, compliant visibility",
    "Eliminates guesswork and risks with clear guidance on who to contact",
    "Provides unparalleled clarity to focus efforts on high-potential leads",
    "Boosts conversion rates and business growth through compliance-first approach"
  ];

  return (
    <section id="lead-management" className="w-full py-20 px-6 md:px-12 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="cosmic-glow rounded-xl overflow-hidden">
              <img 
                src={leadManagementImg} 
                alt="Lead Management Dashboard"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
          
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <Badge variant="outline" className="mb-4">
                <Users className="h-4 w-4 mr-2" />
                Lead Management
              </Badge>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
                Track and Nurture Every Lead
              </h2>
              <p className="text-lg text-muted-foreground">
                Gain crystal-clear insights into your leads with advanced tracking and nurturing capabilities that prioritize compliance and efficiency.
              </p>
            </div>
            
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadManagement;