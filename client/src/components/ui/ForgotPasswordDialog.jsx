import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, PenSquare } from 'lucide-react';
import { useAuth } from '../../../hooks';

const ForgotPasswordDialog = () => {
  const { forgotPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [emailData, setEmailData] = useState({
    email: ''
  });

  
  const handleEmailData = (e) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    const { email } = emailData;

    // Validation
    if (email.trim() === '') {
      setLoading(false);
      return toast.error("Email Can't be empty");
    }
   
    try {

      const emailDetails = {
        email: emailData.email
      };

      const res = await forgotPassword(emailDetails);
      if (res.success) {
        setLoading(false);
        toast.success(res.message);
        setIsOpen(false);
        setEmailData({
          email: ''
        });
      }
      if(!res.success){
        setLoading(false);
        return toast.error(res.error);
      }
      setLoading(false);
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTrigger asChild>
        <Link className="text-red underline" onClick={() => setIsOpen(true)}>
            Forgot Your Password ?
        </Link>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-scroll">
        <div className='mt-3 mb-2'>
            <h2 className='text-2xl text-primary font-semibold text-center'>Reset Your password</h2>
        </div>

        {/* Update form */}
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              value={emailData.email}
              className="col-span-3"
              type="email"
              onChange={handleEmailData}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={loading}
            type="submit"
            className="w-full"
            onClick={handleSaveChanges}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send Reset Password Email
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
