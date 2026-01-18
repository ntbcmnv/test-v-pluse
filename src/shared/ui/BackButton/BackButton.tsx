import {Button} from '@/components/ui/button.tsx';
import {useNavigate} from 'react-router-dom';
import {ArrowLeft} from 'lucide-react';
import * as React from 'react';

export const BackButton: React.FC<{ type: string }> = ({type}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(`/${type}`, {replace: true});
    }
  };

  return (
    <Button
      type="button"
      onClick={handleBack}
      className="cursor-pointer mb-4 px-4 py-2 bg-transparent text-white border border-green-500 rounded-lg hover:bg-green-500 hover:text-white transition-colors"
    >
      <ArrowLeft className="h-4 w-4"/>
      Back
    </Button>
  );
};
