import React from 'react';

const ValueProposition = () => {
  const benefits = [
    {
      title: "Automated Outreach",
      description: "PO2 Tasks generate weekly call/text lists from your database, ensuring consistent lead nurturing."
    },
    {
      title: "Lead Management", 
      description: "Secure database with CSV uploads, inline editing, and DNC highlighting for organized, compliant contact tracking."
    },
    {
      title: "Pipeline Visualization",
      description: "Drag-and-drop stages from Lead to Closed, with real-time metrics like win rate, average close time, and total value."
    },
    {
      title: "Event & Newsletter Tools",
      description: "Plan events, track attendance, and send newsletters with open/click analytics to boost engagement."
    },
    {
      title: "Social Media Scheduler",
      description: "Schedule posts across platforms, upload via CSV, and compare performance metrics like reach, likes, and comments."
    },
    {
      title: "Coaching & Coordination",
      description: "Built-in tools for transaction tracking and coaching sessions to level up your skills."
    },
    {
      title: "Admin Insights",
      description: "For team leaders, compare agent performance, aggregate data, and visualize business growth."
    }
  ];

  return (
    <section className="w-full py-20 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
            Why Choose Real Estate on Purpose?
          </h2>
          <p className="text-muted-foreground text-lg">
            Built for agents like you, our platform turns strategies into results. From automated PO2 tasks to pipeline tracking, we help you perform at a higher level by providing clear visualization of your efforts and outcomes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <div className="h-6 w-6 rounded-sm bg-primary"></div>
                </div>
                <h3 className="text-xl font-medium text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;