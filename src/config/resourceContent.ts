import { TrendingUp, Clock, Target, Users, Calendar, Heart, Gift, MessageSquare, RefreshCw, Database, UserCheck, Repeat } from "lucide-react";
import { ReactNode } from "react";

interface Benefit {
  icon: ReactNode;
  title: string;
  description: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface ResourceContent {
  painPoints: string[];
  benefits: Benefit[];
  whatsIncluded: string[];
  faqs: FaqItem[];
}

// SphereSync Method - Database & Follow-up focused
const sphereSyncContent: ResourceContent = {
  painPoints: [
    "Your database is collecting dust while leads slip through the cracks",
    "You forget to follow up and lose clients to agents who stay in touch",
    "No consistent system for touching base with your sphere",
    "Past clients forget about you when they're ready to refer",
    "You know you should be nurturing relationships but never find the time",
    "Your CRM is a mess and you dread even looking at it"
  ],
  benefits: [
    {
      icon: null, // Will be rendered with icon component
      title: "Never Miss a Follow-Up",
      description: "A foolproof system that ensures every contact gets touched at the right time"
    },
    {
      icon: null,
      title: "Organized Database",
      description: "Finally get your contacts sorted, categorized, and ready to work for you"
    },
    {
      icon: null,
      title: "Stay Top of Mind",
      description: "Be the first agent they think of when it's time to buy, sell, or refer"
    },
    {
      icon: null,
      title: "Referral Machine",
      description: "Turn your existing sphere into a consistent source of new business"
    }
  ],
  whatsIncluded: [
    "The complete SphereSync rotation calendar with exact timing",
    "Done-for-you follow-up scripts and templates",
    "Contact categorization system (A, B, C, D method)",
    "Weekly touch tracking spreadsheet",
    "Pop-by gift ideas for every season",
    "Automated reminder system setup guide"
  ],
  faqs: [
    {
      question: "Is this really free?",
      answer: "Yes, 100% free. No credit card required. We believe in providing value upfront. All we ask is for your email so we can send you more helpful resources."
    },
    {
      question: "How big does my database need to be?",
      answer: "The SphereSync Method works whether you have 50 contacts or 5,000. The system scales with you and helps you work your database effectively regardless of size."
    },
    {
      question: "I've tried database systems before and failed. How is this different?",
      answer: "Unlike complicated CRM training, SphereSync is designed to be simple and sustainable. It's based on real-world testing with hundreds of agents who were in your exact situation."
    },
    {
      question: "What if I'm terrible at staying in touch?",
      answer: "That's exactly who this is for! The SphereSync Method includes scripts, templates, and a rotation system so you never have to wonder what to say or when to reach out."
    },
    {
      question: "Will I be spammed after downloading?",
      answer: "Absolutely not. We respect your inbox. You'll receive valuable content that helps your business, and you can unsubscribe at any time with one click."
    }
  ]
};

// Client Events Guide - Event planning focused
const clientEventsContent: ResourceContent = {
  painPoints: [
    "Client events feel overwhelming to plan and you keep putting them off",
    "You don't know what kind of events your clients would actually attend",
    "Missing referral opportunities because clients forget about you between transactions",
    "Other agents are hosting events and getting all the attention",
    "You've tried events before but the turnout was embarrassing",
    "The thought of organizing an event makes you want to hide under your desk"
  ],
  benefits: [
    {
      icon: null,
      title: "40+ Referrals Per Year",
      description: "Events are the #1 way top producers generate consistent referrals"
    },
    {
      icon: null,
      title: "Memorable Experiences",
      description: "Create moments your clients will talk about for years"
    },
    {
      icon: null,
      title: "Build Community",
      description: "Position yourself as the connector and go-to agent in your area"
    },
    {
      icon: null,
      title: "Year-Round Visibility",
      description: "Stay top-of-mind with strategic events throughout the year"
    }
  ],
  whatsIncluded: [
    "Full 12-month client event calendar with proven themes",
    "8-week event planning timeline so nothing falls through the cracks",
    "Event theme ideas for every budget (from $0 to $5000+)",
    "Invitation templates and RSVP tracking system",
    "Post-event follow-up sequence to maximize referrals",
    "Vendor negotiation scripts to save money on every event"
  ],
  faqs: [
    {
      question: "Is this really free?",
      answer: "Yes, 100% free. No credit card required. We believe in providing value upfront. All we ask is for your email so we can send you more helpful resources."
    },
    {
      question: "I don't have a big budget for events. Will this still work?",
      answer: "Absolutely! The guide includes event ideas ranging from $0 (park picnics, coffee meetups) to larger productions. Your first event doesn't need to be expensive to be effective."
    },
    {
      question: "What if nobody shows up to my event?",
      answer: "The guide includes proven invitation strategies and RSVP follow-up sequences that dramatically increase attendance. We also cover how to set realistic expectations and grow your events over time."
    },
    {
      question: "How much time do I need to plan an event?",
      answer: "Our 8-week timeline breaks it down into small, manageable tasks. Most agents spend just 2-3 hours per week leading up to the event. It's easier than you think!"
    },
    {
      question: "Will I be spammed after downloading?",
      answer: "Absolutely not. We respect your inbox. You'll receive valuable content that helps your business, and you can unsubscribe at any time with one click."
    }
  ]
};

// Default/fallback content for new resources
const defaultContent: ResourceContent = {
  painPoints: [
    "Working 60+ hours a week but still struggling to hit your income goals",
    "Feeling overwhelmed by the endless to-do list that never gets done",
    "Watching other agents succeed while you're spinning your wheels",
    "Knowing you should be doing more marketing but never finding the time",
    "Missing family events because you're always 'on call'",
    "Tired of the feast-or-famine cycle in your business"
  ],
  benefits: [
    {
      icon: null,
      title: "Increase Your Income",
      description: "Proven strategies that help agents close more deals and earn more"
    },
    {
      icon: null,
      title: "Save Valuable Time",
      description: "Stop working 60+ hour weeks and reclaim your personal life"
    },
    {
      icon: null,
      title: "Work Smarter",
      description: "Systems and processes that top producers use every day"
    },
    {
      icon: null,
      title: "Build Lasting Relationships",
      description: "Turn your sphere into a referral-generating machine"
    }
  ],
  whatsIncluded: [
    "Step-by-step implementation guide you can follow today",
    "Ready-to-use templates and scripts that actually work",
    "Proven strategies from top 1% producing agents",
    "Time-saving systems to automate your follow-up",
    "Checklists to keep you organized and on track",
    "Bonus tips for maximizing your sphere of influence"
  ],
  faqs: [
    {
      question: "Is this really free?",
      answer: "Yes, 100% free. No credit card required. We believe in providing value upfront. All we ask is for your email so we can send you more helpful resources."
    },
    {
      question: "Who is this for?",
      answer: "This resource is designed specifically for real estate agents who want to grow their business, save time, and reduce stress. Whether you're a new agent or a seasoned pro, you'll find actionable insights."
    },
    {
      question: "How is this different from other resources?",
      answer: "This isn't theory—it's based on real strategies that have helped hundreds of agents transform their businesses. Pam O'Bryant has over 25 years of experience and has coached agents to achieve remarkable results."
    },
    {
      question: "What happens after I download?",
      answer: "You'll get instant access to download the resource. We'll also send you a copy via email, along with some bonus tips to help you implement what you learn."
    },
    {
      question: "Will I be spammed?",
      answer: "Absolutely not. We respect your inbox. You'll receive valuable content that helps your business, and you can unsubscribe at any time with one click."
    }
  ]
};

// Map slugs to content
const resourceContentMap: Record<string, ResourceContent> = {
  "spheresync-method": sphereSyncContent,
  "the-spheresync-method": sphereSyncContent,
  "the-complete-client-events-strategy-guide": clientEventsContent
};

// Fallback thumbnail images for each resource
const resourceThumbnails: Record<string, string> = {
  "spheresync-method": "/images/resources/spheresync-method-cover.jpg",
  "the-spheresync-method": "/images/resources/spheresync-method-cover.jpg",
  "the-complete-client-events-strategy-guide": "/images/resources/client-events-guide-cover.jpg"
};

export function getThumbnailForSlug(slug: string): string | null {
  return resourceThumbnails[slug] || null;
}

export function getResourceContent(slug: string): ResourceContent {
  return resourceContentMap[slug] || defaultContent;
}

// Icon mapping for benefits (to be applied in component)
export const benefitIcons = {
  sphereSync: [RefreshCw, Database, UserCheck, Repeat],
  clientEvents: [TrendingUp, Heart, Users, Calendar],
  default: [TrendingUp, Clock, Target, Users]
};

export function getBenefitIconsForSlug(slug: string) {
  if (slug === "spheresync-method" || slug === "the-spheresync-method") return benefitIcons.sphereSync;
  if (slug === "the-complete-client-events-strategy-guide") return benefitIcons.clientEvents;
  return benefitIcons.default;
}
