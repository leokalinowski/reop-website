import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, FileText, Users, Target, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  sphereSize: number;
  annualTransactions: number;
  weeklyHours: number;
  sphereContactFrequency: string;
  budgetManagementStyle: string;
  businessStressLevel: string;
  biggestChallenge: string;
  targetIncome: number;
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
    sphereSize: 0,
    annualTransactions: 0,
    weeklyHours: 0,
    sphereContactFrequency: '',
    budgetManagementStyle: '',
    businessStressLevel: '',
    biggestChallenge: '',
    targetIncome: 0,
    startTimeline: '',
    communicationPreferences: ['email'],
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
      const { data, error } = await supabase.from('leads').insert({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        sphere_size: formData.sphereSize,
        annual_transactions: formData.annualTransactions,
        weekly_hours: formData.weeklyHours,
        sphere_contact_frequency: formData.sphereContactFrequency,
        budget_management_style: formData.budgetManagementStyle,
        business_stress_level: formData.businessStressLevel,
        biggest_challenge: formData.biggestChallenge,
        target_income: formData.targetIncome,
        start_timeline: formData.startTimeline,
        communication_preferences: formData.communicationPreferences,
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
        sphereSize: 0,
        annualTransactions: 0,
        weeklyHours: 0,
        sphereContactFrequency: '',
        budgetManagementStyle: '',
        businessStressLevel: '',
        biggestChallenge: '',
        targetIncome: 0,
        startTimeline: '',
        communicationPreferences: ['email'],
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
              <h3 className="text-xl font-semibold text-foreground mb-2">Personal Information</h3>
              <p className="text-muted-foreground">Let's start with your contact details</p>
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
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Business Metrics</h3>
              <p className="text-muted-foreground">Help us understand your current performance</p>
            </div>
            <div>
              <Label htmlFor="sphereSize">What's your Sphere Size (database)?</Label>
              <Input
                id="sphereSize"
                type="number"
                value={formData.sphereSize}
                onChange={(e) => updateFormData('sphereSize', parseInt(e.target.value) || 0)}
                placeholder="Number of contacts in your database"
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="annualTransactions">How many deals did you close last year?</Label>
              <Input
                id="annualTransactions"
                type="number"
                value={formData.annualTransactions}
                onChange={(e) => updateFormData('annualTransactions', parseInt(e.target.value) || 0)}
                placeholder="Number of transactions closed"
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="weeklyHours">How many hours have you been working weekly?</Label>
              <Input
                id="weeklyHours"
                type="number"
                value={formData.weeklyHours}
                onChange={(e) => updateFormData('weeklyHours', parseInt(e.target.value) || 0)}
                placeholder="Hours per week"
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="sphereContactFrequency">How often do you get in touch with your Sphere?</Label>
              <Select value={formData.sphereContactFrequency} onValueChange={(value) => updateFormData('sphereContactFrequency', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select contact frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="biannually">Twice a year</SelectItem>
                  <SelectItem value="annually">Once a year</SelectItem>
                  <SelectItem value="rarely">Rarely or never</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Business Management</h3>
              <p className="text-muted-foreground">Let's understand your current challenges</p>
            </div>
            <div>
              <Label htmlFor="budgetManagementStyle">How do you manage your Budget/P&L?</Label>
              <Select value={formData.budgetManagementStyle} onValueChange={(value) => updateFormData('budgetManagementStyle', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your approach" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="detailed-tracking">Detailed tracking with software</SelectItem>
                  <SelectItem value="basic-spreadsheet">Basic spreadsheet</SelectItem>
                  <SelectItem value="rough-estimates">Rough estimates in my head</SelectItem>
                  <SelectItem value="accountant-handles">My accountant handles it</SelectItem>
                  <SelectItem value="dont-track">I don't track it</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="businessStressLevel">What's your business stress level?</Label>
              <Select value={formData.businessStressLevel} onValueChange={(value) => updateFormData('businessStressLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select stress level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - I feel in control</SelectItem>
                  <SelectItem value="moderate">Moderate - Some challenging days</SelectItem>
                  <SelectItem value="high">High - Often overwhelmed</SelectItem>
                  <SelectItem value="severe">Severe - Constantly stressed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="biggestChallenge">What's your biggest challenge?</Label>
              <Select value={formData.biggestChallenge} onValueChange={(value) => updateFormData('biggestChallenge', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your biggest challenge" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lead-generation">Lead generation</SelectItem>
                  <SelectItem value="time-management">Time management</SelectItem>
                  <SelectItem value="marketing">Marketing and branding</SelectItem>
                  <SelectItem value="client-management">Client management</SelectItem>
                  <SelectItem value="admin-tasks">Administrative tasks</SelectItem>
                  <SelectItem value="transaction-coordination">Transaction coordination</SelectItem>
                  <SelectItem value="technology">Technology and systems</SelectItem>
                  <SelectItem value="work-life-balance">Work-life balance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Goals & Timeline</h3>
              <p className="text-muted-foreground">What are you looking to achieve?</p>
            </div>
            <div>
              <Label htmlFor="targetIncome">Target Annual Income</Label>
              <Input
                id="targetIncome"
                type="number"
                value={formData.targetIncome}
                onChange={(e) => updateFormData('targetIncome', parseInt(e.target.value) || 0)}
                placeholder="Your income goal"
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="startTimeline">When would you like to start?</Label>
              <Select value={formData.startTimeline} onValueChange={(value) => updateFormData('startTimeline', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your preferred timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediately">Immediately</SelectItem>
                  <SelectItem value="within_month">Within 1-3 months</SelectItem>
                  <SelectItem value="within_quarter">Within 3-6 months</SelectItem>
                  <SelectItem value="within_year">6+ months</SelectItem>
                  <SelectItem value="within_year">Just exploring options</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Communication Preferences</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {['Email', 'Phone', 'Text', 'Video Call'].map((method) => (
                  <div key={method} className="flex items-center space-x-2">
                    <Checkbox
                      id={method}
                      checked={formData.communicationPreferences.includes(method.toLowerCase())}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFormData('communicationPreferences', [...formData.communicationPreferences, method.toLowerCase()]);
                        } else {
                          updateFormData('communicationPreferences', formData.communicationPreferences.filter(m => m !== method.toLowerCase()));
                        }
                      }}
                    />
                    <Label htmlFor={method} className="text-sm">{method}</Label>
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