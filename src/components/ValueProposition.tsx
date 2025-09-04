import React from 'react';

const ValueProposition = () => {
  const benefits = [
    {
      title: "SphereSync: Automate Your Client Connections",
      description: "Revolutionize your database management with automated connections without sending any emails, texts, or communications on your behalf, ensuring you remain in full control."
    },
    {
      title: "Track and Nurture Every Lead", 
      description: "Gain crystal-clear insights into your leads with advanced tracking that cross-references real-time data with DNC Lists for secure, compliant visibility."
    },
    {
      title: "Event Management",
      description: "Leave the heavy lifting to us – we handle every detail of your client events so you can shine in building relationships and creating memorable experiences."
    },
    {
      title: "Newsletter Tools",
      description: "Elevate your client engagement with seamless newsletter creation and distribution using intuitive tools for designing and sending professional content."
    },
    {
      title: "Fully Automated Social Presence",
      description: "Dominate social media effortlessly with our hands-on content creation and management service – no AI involved, just expert human touch with professional editing."
    },
    {
      title: "Weekly Coaching Sessions",
      description: "Accelerate your growth with personalized, expert guidance in dynamic weekly sessions led by industry pros to sharpen skills and overcome obstacles."
    },
    {
      title: "Transaction Coordination",
      description: "Reclaim your time and peace of mind with our end-to-end transaction handling – we execute everything flawlessly from contract to close."
    }
  ];

  return (
    <section className="w-full py-20 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
            Why Choose Real Estate on Purpose Team?
          </h2>
          <p className="text-muted-foreground text-lg">
            Experience a unique team approach that provides comprehensive support, proven systems, and tools without any financial burden. We help you perform at a higher level by providing the resources and guidance to focus on what matters most – building meaningful client relationships.
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