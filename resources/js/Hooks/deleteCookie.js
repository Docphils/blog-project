import { useEffect } from 'react';
import setCookie from '@/Hooks/setCookie';
function deleteCookie(name) {
    setCookie(name, "", {
      'max-age': -1
    })
  }