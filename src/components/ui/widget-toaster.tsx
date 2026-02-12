import {memo} from "react";
import {Toaster} from "react-hot-toast";
import {CheckCircleIcon} from "@/assets";


interface IProps {
  toasterId?: string,
  className?: string
}
const WToaster = ({ toasterId = 'default', className }: IProps) => {


  return (
    <Toaster
      toasterId={ toasterId }
      position={ "top-center" }
      reverseOrder={false}
      gutter={8}
      containerClassName={ className }
      containerStyle={{
        position: 'absolute',
        inset: '5px',
      }}
      toastOptions={{
        // Define default options
        className: 'react-hot-toast',
        duration: 3000,
        removeDelay: 1000,
        style: {
          background: '#363636',
          color: '#fff'
        },

        // Default options for specific types
        success: {
          icon: <CheckCircleIcon />,
          style: { color: '#fff', backgroundColor: '#01A781' }
        },
        error: {
          style: { color: '#fff', backgroundColor: '#cc0000' },
          iconTheme: { primary: '#fff', secondary: '#cc0000' }
        }
      }}
    />
  )
}

export const WidgetToaster = memo(WToaster);