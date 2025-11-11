import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import { Calendar, CheckCircle } from 'lucide-react';
import eventManagementImage from '@/assets/images/event-management.png';


const EventManagement = () => {
  const features = [
    "We plan and execute your client events from start to finish—speakers, logistics, sponsors, location, everything",
    "We handle invitations, RSVPs, and all the details so your events run flawlessly",
    "You show up, connect with your sphere, and build relationships that lead to referrals",
    "No event planning headaches—just meaningful face time with the people who matter most"
  ];

  return (
    <section id="event-management" className="w-full py-20 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="mb-4">
                <Calendar className="h-4 w-4 mr-2" />
                Event Management
              </Badge>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
                We Plan the Events. You Show Up and Shine.
              </h2>
              <p className="text-lg text-muted-foreground">
                From speakers to logistics to invitations, we handle every detail of your client events—you just connect with your sphere.
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
            <CardBody className="bg-gradient-to-br from-accent/5 to-secondary/5 relative group/card border border-border rounded-xl p-6 h-auto w-auto">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-foreground"
              >
                <div className="relative overflow-hidden rounded-lg shadow-2xl">
                  <CardItem translateZ="100" className="w-full">
                      <img 
                        src={eventManagementImage} 
                        alt="Event Management Dashboard"
                        className="w-full max-h-80 object-contain rounded-lg"
                      />
                  </CardItem>
                  <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent rounded-lg"></div>
                </div>
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
      </div>
    </section>
  );
};

export default EventManagement;