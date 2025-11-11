import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import { FileText, CheckCircle } from 'lucide-react';
import transactionImage from '@/assets/images/transaction.png';


const TransactionCoordination = () => {
  const features = [
    "We manage every detail from contract to close—deadlines, documents, compliance, all of it",
    "Surprise & Delight campaigns woven throughout the process drive 5-star reviews and referrals",
    "Your clients feel cared for at every step, turning transactions into raving fans",
    "You stay focused on generating new business while we ensure flawless execution"
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
                We Run Your Transactions. You Collect Referrals.
              </h2>
              <p className="text-lg text-muted-foreground">
                From contract to close, we handle every detail and deploy Surprise & Delight campaigns that turn clients into raving fans.
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
          
          <CardContainer className="inter-var">
            <CardBody className="bg-gradient-to-br from-primary/5 to-secondary/5 relative group/card border border-border rounded-xl p-6 h-auto w-auto">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-foreground"
              >
                <div className="relative overflow-hidden rounded-lg shadow-2xl">
                  <CardItem translateZ="100" className="w-full">
                      <img 
                        src={transactionImage} 
                        alt="Transaction Coordination Dashboard"
                        className="w-full max-h-80 object-contain rounded-lg"
                      />
                  </CardItem>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent rounded-lg"></div>
                </div>
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
      </div>
    </section>
  );
};

export default TransactionCoordination;