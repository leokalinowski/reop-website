import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, FileText, Users, Target, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  
  // Experience
  experienceLevel: string;
  currentBrokerage: string;
  annualTransactions: number;
  
  // Goals
  targetIncome: number;
  preferredMarkets: string[];
  businessObjectives: string;
  
  // Timeline
  startTimeline: string;
  communicationPreferences: string[];
}

interface LeadCaptureFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const totalSteps = 4;

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    experienceLevel: '',
    currentBrokerage: '',
    annualTransactions: 0,
    targetIncome: 0,
    preferredMarkets: [],
    businessObjectives: '',
    startTimeline: '',
    communicationPreferences: ['email']
  });

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Submit to Supabase
      const { error } = await supabase.from('leads').insert({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        experience_level: formData.experienceLevel,
        current_brokerage: formData.currentBrokerage,
        annual_transactions: formData.annualTransactions,
        target_income: formData.targetIncome,
        preferred_markets: formData.preferredMarkets,
        business_objectives: formData.businessObjectives,
        start_timeline: formData.startTimeline,
        communication_preferences: formData.communicationPreferences
      });

      if (error) throw error;

      // Generate and send PDF
      const pdfResponse = await supabase.functions.invoke('generate-success-analysis', {
        body: formData
      });

      if (pdfResponse.error) {
        console.error('PDF generation error:', pdfResponse.error);
      }

      toast({
        title: "Success!",
        description: "Your personalized success analysis has been sent to your email!",
      });

      onClose();
      // Reset form
      setCurrentStep(1);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        experienceLevel: '',
        currentBrokerage: '',
        annualTransactions: 0,
        targetIncome: 0,
        preferredMarkets: [],
        businessObjectives: '',
        startTimeline: '',
        communicationPreferences: ['email']
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was an issue processing your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return <Users className="w-5 h-5" />;
      case 2: return <FileText className="w-5 h-5" />;
      case 3: return <Target className="w-5 h-5" />;
      case 4: return <Calendar className="w-5 h-5" />;
      default: return null;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Let's Get to Know You</h3>
              <p className="text-muted-foreground">Start with your basic information</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                placeholder="john@example.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="location">Location (City, State)</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => updateFormData('location', e.target.value)}
                placeholder="Austin, TX"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Your Real Estate Experience</h3>
              <p className="text-muted-foreground">Help us understand your current situation</p>
            </div>
            <div>
              <Label htmlFor="experienceLevel">Experience Level</Label>
              <Select value={formData.experienceLevel} onValueChange={(value) => updateFormData('experienceLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New to Real Estate</SelectItem>
                  <SelectItem value="experienced">Experienced Agent</SelectItem>
                  <SelectItem value="veteran">Veteran Agent (5+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="currentBrokerage">Current Brokerage (if any)</Label>
              <Input
                id="currentBrokerage"
                value={formData.currentBrokerage}
                onChange={(e) => updateFormData('currentBrokerage', e.target.value)}
                placeholder="e.g., Keller Williams, RE/MAX, Independent"
              />
            </div>
            <div>
              <Label htmlFor="annualTransactions">Annual Transactions (Last 12 Months)</Label>
              <Input
                id="annualTransactions"
                type="number"
                value={formData.annualTransactions}
                onChange={(e) => updateFormData('annualTransactions', parseInt(e.target.value) || 0)}
                placeholder="0"
                min="0"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Your Goals & Aspirations</h3>
              <p className="text-muted-foreground">What do you want to achieve?</p>
            </div>
            <div>
              <Label htmlFor="targetIncome">Target Annual Income</Label>
              <Input
                id="targetIncome"
                type="number"
                value={formData.targetIncome}
                onChange={(e) => updateFormData('targetIncome', parseInt(e.target.value) || 0)}
                placeholder="100000"
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="preferredMarkets">Preferred Market Areas (separate with commas)</Label>
              <Input
                id="preferredMarkets"
                value={formData.preferredMarkets.join(', ')}
                onChange={(e) => updateFormData('preferredMarkets', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
                placeholder="Downtown, Westlake, Cedar Park"
              />
            </div>
            <div>
              <Label htmlFor="businessObjectives">Business Objectives & Challenges</Label>
              <Textarea
                id="businessObjectives"
                value={formData.businessObjectives}
                onChange={(e) => updateFormData('businessObjectives', e.target.value)}
                placeholder="What are your main goals and what challenges do you face in reaching them?"
                rows={4}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Timeline & Preferences</h3>
              <p className="text-muted-foreground">When are you ready to make a change?</p>
            </div>
            <div>
              <Label htmlFor="startTimeline">When would you like to start?</Label>
              <Select value={formData.startTimeline} onValueChange={(value) => updateFormData('startTimeline', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediately">Immediately</SelectItem>
                  <SelectItem value="within_month">Within a month</SelectItem>
                  <SelectItem value="within_quarter">Within 3 months</SelectItem>
                  <SelectItem value="within_year">Within a year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>How would you like us to contact you? (Select all that apply)</Label>
              <div className="flex flex-col space-y-2 mt-2">
                {['email', 'phone', 'text'].map((method) => (
                  <div key={method} className="flex items-center space-x-2">
                    <Checkbox
                      id={method}
                      checked={formData.communicationPreferences.includes(method)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFormData('communicationPreferences', [...formData.communicationPreferences, method]);
                        } else {
                          updateFormData('communicationPreferences', formData.communicationPreferences.filter(pref => pref !== method));
                        }
                      }}
                    />
                    <Label htmlFor={method} className="capitalize">{method}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Get Your Free Success Analysis
          </DialogTitle>
        </DialogHeader>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-muted-foreground">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="w-full" />
        </div>

        {/* Step Icons */}
        <div className="flex justify-center space-x-4 py-4">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                step <= currentStep
                  ? 'bg-primary border-primary text-primary-foreground'
                  : 'border-muted-foreground text-muted-foreground'
              }`}
            >
              {getStepIcon(step)}
            </div>
          ))}
        </div>

        {/* Form Content */}
        <div className="py-4">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          {currentStep === totalSteps ? (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Generating Analysis...</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  <span>Get My Success Analysis</span>
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              className="flex items-center space-x-2"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureForm;