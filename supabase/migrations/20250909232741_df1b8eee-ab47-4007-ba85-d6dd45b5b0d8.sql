-- Fix security issue: Implement proper role-based access control for leads
-- Replace overly permissive authenticated user policies with admin-only access

-- Create user_roles table and role enum for proper authorization
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check if user has admin role
-- This prevents recursive RLS issues
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = 'admin'
  )
$$;

-- Drop the current overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can view leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated users can update leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated users can delete leads" ON public.leads;

-- Create new admin-only policies for leads
CREATE POLICY "Only admins can view leads" 
ON public.leads 
FOR SELECT 
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can update leads" 
ON public.leads 
FOR UPDATE 
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can delete leads" 
ON public.leads 
FOR DELETE 
TO authenticated
USING (public.is_admin());

-- Keep the anonymous lead creation policy (needed for lead capture form)
-- The "Anyone can create leads" policy remains unchanged

-- Create policies for user_roles table
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Only admins can manage user roles" 
ON public.user_roles 
FOR ALL 
TO authenticated
USING (public.is_admin());