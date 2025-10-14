import { useState, useEffect } from 'react';
import { X, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AnnouncementBar = () => {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('announcement-bar-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const hoursPassed = (Date.now() - dismissedTime) / (1000 * 60 * 60);
      if (hoursPassed < 24) {
        setIsDismissed(true);
      } else {
        localStorage.removeItem('announcement-bar-dismissed');
      }
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('announcement-bar-dismissed', Date.now().toString());
    setIsDismissed(true);
  };

  if (isDismissed) return null;

  return (
    <div className="sticky top-0 z-50 w-full bg-primary text-primary-foreground shadow-md animate-slide-in-down">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 justify-center md:justify-start">
          <Calendar className="h-5 w-5 flex-shrink-0" />
          <span className="text-sm md:text-base font-medium">
            Schedule Your Strategy Session with Founder Pam O'Bryant
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="whitespace-nowrap"
          >
            <a
              href="https://lp.realestateonpurpose.com/appointmentwithreop"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a strategy session"
            >
              Book Now
            </a>
          </Button>
          
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-primary-foreground/10 rounded transition-colors"
            aria-label="Dismiss announcement"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
