import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Loader2, PenSquare, Upload } from 'lucide-react';
import { useAuth } from '../../../hooks';

const ChangePasswordDialog = () => {
  const { updatePassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  
  const handlePasswordData = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    const { oldPassword, newPassword, confirmNewPassword } = passwordData;

    // Validation
    if (oldPassword.trim() === '' || newPassword.trim() === '' || confirmNewPassword.trim() ==='') {
      setLoading(false);
      return toast.error("Password fields Can't be empty");
    }
    else if (newPassword !== confirmNewPassword) {
        setLoading(false);
        return toast.error("New Passwords don't match");
    }
    else if (oldPassword === newPassword){
        setLoading(false);
        return toast.error("New Password can't be same as the old Password");
    }
    
    try {

      const passwordDetails = {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
        confirmNewPassword: passwordData.confirmNewPassword
      };

      const res = await updatePassword(passwordDetails);
      if (res.success) {
        setLoading(false);
        toast.success(res.message);
        setIsOpen(false);
        setPasswordData({
          oldPassword: '',
          newPassword: '',
          confirmNewPassword: ''
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
        <Button className="bg-red-500 hover:bg-red-500 " onClick={() => setIsOpen(true)}>
          <PenSquare className="mr-2 h-4 w-4" />
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-scroll">
        {/* Update form */}
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="oldPassword" className="text-right">
              Old Password
            </Label>
            <Input
              id="oldPassword"
              name="oldPassword"
              value={passwordData.oldPassword}
              className="col-span-3"
              type="password"
              onChange={handlePasswordData}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="newPassword" className="text-right">
              New Password
            </Label>
            <Input
              id="newPassword"
              name="newPassword"
              value={passwordData.newPassword}
              className="col-span-3"
              type="password"
              onChange={handlePasswordData}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="confirmNewPassword" className="text-right">
              Confirm New Password
            </Label>
            <Input
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={passwordData.confirmNewPassword}
              className="col-span-3"
              type="password"
              onChange={handlePasswordData}
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
            Change Password
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
