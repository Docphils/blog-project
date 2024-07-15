import { useEffect, useState } from 'react';
export default function getCookie(name) {
    const [thename, setThename] = useState();
    useEffect(() => {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
          ));
        setThename(matches ? decodeURIComponent(matches[1]) : undefined);
    }, []);
    return {name: thename}
  }