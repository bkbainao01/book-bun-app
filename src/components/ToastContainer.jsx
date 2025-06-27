import { useState } from 'react';
import { Toaster } from "sonner"

function ToastComponent() {
  return (
    <>
    <div>
      <Toaster richColors position="top-right" />
    </div>
    </>
  )
}

export default ToastComponent
