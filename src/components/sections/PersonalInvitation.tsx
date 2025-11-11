import { Button } from '@/components/ui/button';

const PersonalInvitation = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Photo */}
          <div className="relative max-w-md mx-auto lg:mx-0">
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-300 to-gray-400 aspect-[3/4]">
              <img 
                src="/images/pamobryant.png" 
                alt="Pam O'Bryant" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            
            {/* Handwritten Signature Overlay */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-xl border border-border">
              <p className="font-serif text-2xl text-primary italic">
                — Pam O'Bryant
              </p>
              <p className="text-sm text-muted-foreground mt-1">Founder, REOP</p>
            </div>
          </div>
          
          {/* Right: Content */}
          <div className="space-y-6 lg:pl-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Hey, I'm Pam — and I Built REOP for Agents Like You.
            </h2>
            
            <div className="space-y-4 text-lg text-foreground leading-relaxed">
              <p>
                After nearly three decades in real estate — from building teams to teaching across the country — I saw too many talented agents burning out.
              </p>
              <p>
                They didn't need more motivation. They needed clarity, accountability, and a little help implementing what they already knew worked.
              </p>
              <p>
                That's why I built REOP: a modern, human-centered platform where agents can focus on what they do best — building relationships — while we handle the rest.
              </p>
              <p className="font-semibold text-primary">
                Ready to get your time, energy, and joy back? I'd love to talk.
              </p>
            </div>
            
            <Button 
              className="bg-accent text-accent-foreground hover:bg-accent/90 h-14 px-8 text-base font-semibold"
            >
              💬 Book a Discovery Call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalInvitation;
