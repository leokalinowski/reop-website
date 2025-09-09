import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, CheckCircle } from 'lucide-react';


const TransactionCoordination = () => {
  const features = [
    "Manages all details from contract to close with precision",
    "Ensures smooth, error-free processes from start to finish",
    "Frees you to focus on high-value activities like client acquisition",
    "Enables confident scaling of your business with peace of mind"
  ];

  return (
    <section id="transaction-coordination" className="w-full py-20 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="mb-4">
                <FileText className="h-4 w-4 mr-2" />
                Transaction Coordination
              </Badge>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
                End-to-End Transaction Handling
              </h2>
              <p className="text-lg text-muted-foreground">
                Reclaim your time and peace of mind with our end-to-end transaction handling – we execute everything flawlessly so you can focus on relationship building.
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
          
          <div className="relative">
            <div className="cosmic-glow rounded-xl overflow-hidden">
              <img 
                src="/images/transaction.png" 
                alt="Transaction Coordination Dashboard"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransactionCoordination;