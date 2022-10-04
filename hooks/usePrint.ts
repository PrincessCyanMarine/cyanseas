import { useEffect } from "react";

export default (state: any) => useEffect(() => console.log(state), [state]);
