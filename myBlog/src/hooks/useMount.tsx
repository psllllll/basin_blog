import { useEffect } from "react";

// eslint-disable-next-line react-hooks/exhaustive-deps
const useMount = (callback: () => void) => useEffect(callback, []);

export default useMount;
