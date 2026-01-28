-- Add 'candidato' role to app_role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'candidato';

-- Add user_id column to applications table to link applications to registered users
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Update RLS policy to allow authenticated candidates to view their own applications
CREATE POLICY "Candidates can view their own applications" 
ON public.applications 
FOR SELECT 
USING (user_id = auth.uid());

-- Update RLS policy to allow authenticated candidates to insert their applications
DROP POLICY IF EXISTS "Anyone can submit applications" ON public.applications;

CREATE POLICY "Authenticated users can submit applications" 
ON public.applications 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());

-- Allow admins to view all profiles
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'));

-- Allow admins to view all roles
CREATE POLICY "Admins can view all roles" 
ON public.user_roles 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'));

-- Allow admins to manage roles
CREATE POLICY "Admins can insert roles" 
ON public.user_roles 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles" 
ON public.user_roles 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles" 
ON public.user_roles 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'));

-- Create function to auto-assign candidato role on signup
CREATE OR REPLACE FUNCTION public.handle_new_candidate()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'candidato')
    ON CONFLICT (user_id, role) DO NOTHING;
    RETURN NEW;
END;
$$;

-- Create trigger for auto-assigning candidato role
DROP TRIGGER IF EXISTS on_auth_user_created_candidate ON auth.users;
CREATE TRIGGER on_auth_user_created_candidate
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_candidate();